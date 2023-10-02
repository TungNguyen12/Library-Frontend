import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthJwt } from "../../types/user/AuthJWT";
import User from "../../types/user/User";
import { LoginInterface } from "../../types/user/Login";
import axios from "axios";

export type AuthState = {
    user: User | null;
    jwt: AuthJwt | null;
};

export const initialState: AuthState = {
    user: null,
    jwt: null,
};

export const loginAsync = createAsyncThunk(
    "login",
    async ({ email, password }: LoginInterface) => {
        try {
            const response = await axios.post(
                `https://api.escuelajs.co/api/v1/auth/login`,
                { email, password }
            );
            const jwtToken = response.data;
            return jwtToken;
        } catch (e) {
            const error = e as Error;
            return error;
        }
    }
);

export const getUserProfileAsync = createAsyncThunk(
    "getUserProfile",
    async (jwtToken: AuthJwt) => {
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
            return error;
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state: AuthState) => {
            state.user = null;
            state.jwt = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            const jwtToken = action.payload;
            state.jwt = jwtToken;
        });
        builder.addCase(getUserProfileAsync.fulfilled, (state, { payload }) => {
            state.user = payload;
        });
    },
});

export const { logOut } = authSlice.actions;

export const getJwt = (state: AuthState) => state.jwt;
export const getUserProfile = (state: AuthState) => state.user;

const authReducer = authSlice.reducer;
export default authReducer;
