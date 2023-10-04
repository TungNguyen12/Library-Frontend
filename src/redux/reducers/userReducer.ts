import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "../../types/user/User";
import axios from "axios";
import CreateUserDto from "../../types/user/RegisterUserRequest";
import UsersReducerState from "../../types/user/UsersReducerState";

const initialState: UsersReducerState = {
    users: [],
};

export const getAllUsersAsync = createAsyncThunk<
    User[],
    void,
    { rejectValue: string }
>("getAllUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `https://api.escuelajs.co/api/v1/users`
        );
        return response.data;
    } catch (e) {
        const error = e as Error;
        return rejectWithValue(error.message);
    }
});

export const registerUserAsync = createAsyncThunk<
    User,
    CreateUserDto,
    { rejectValue: string }
>("registerUser", async (user: CreateUserDto, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `https://api.escuelajs.co/api/v1/users/`,
            user
        );
        const newUser: User = response.data;
        return newUser;
    } catch (e) {
        const error = e as Error;
        return rejectWithValue(error.message);
    }
});

// Should be for ADMIN
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUserAsync.fulfilled, (state, action) => {
                const newUser = action.payload;
                if (!state.users.find((user) => user.email === newUser.email)) {
                    state.users.push(newUser);
                } else {
                    console.log("Email is not available");
                }
            })
            .addCase(registerUserAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getAllUsersAsync.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getAllUsersAsync.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

const usersReducer = usersSlice.reducer;
export default usersReducer;
