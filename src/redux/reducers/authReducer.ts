import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthJwt } from "../../types/user/AuthJWT";
import User from "../../types/user/User";
import { LoginInterface } from "../../types/user/Login";
import axios from "axios";
import toast from "react-hot-toast";

export type AuthState = {
    currentUser: User | null;
    error?: string | null;
};

export const initialState: AuthState = {
    currentUser: null,
};

export const loginAsync = createAsyncThunk<
    User,
    LoginInterface,
    { rejectValue: string }
>("loginAsync", async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
        const response = await axios.post(
            `https://api.escuelajs.co/api/v1/auth/login`,
            { email, password }
        );
        const jwtToken = response.data;

        const authenticatedUserProfile = await dispatch(
            getUserProfileAsync(jwtToken)
        );

        if (
            typeof authenticatedUserProfile.payload === "string" ||
            !authenticatedUserProfile.payload
        ) {
            throw Error(authenticatedUserProfile.payload || "Cannot login");
        }
        toast.success(`Login successfully`);
        return authenticatedUserProfile.payload;
    } catch (e) {
        const error = e as Error;
        toast.error(`Incorrect input, please try again`);
        return rejectWithValue(error.message);
    }
});

export const getUserProfileAsync = createAsyncThunk<
    User,
    AuthJwt,
    { rejectValue: string }
>("getUserProfileAsync", async (jwtToken, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `https://api.escuelajs.co/api/v1/auth/profile`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken.access_token}`,
                },
            }
        );
        const userProfile = response.data;
        return userProfile;
    } catch (e) {
        const error = e as Error;
        return rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state: AuthState) => {
            state.currentUser = null;
        },
    },
    extraReducers: (builder) => {
        //LOGIN
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.error = action.payload;
            });

        //GET USER PROFILE
        builder
            .addCase(getUserProfileAsync.fulfilled, (state, { payload }) => {
                state.currentUser = payload;
            })
            .addCase(getUserProfileAsync.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logOut } = authSlice.actions;

export const getUserProfile = (state: AuthState) => state.currentUser;

const authReducer = authSlice.reducer;
export default authReducer;
