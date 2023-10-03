import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "../../types/user/User";
import axios from "axios";
import CreateUserDto from "../../types/user/RegisterUserRequest";

const initialState: User[] = [
    {
        id: 1,
        email: "pete@gmail.com",
        password: "1234",
        name: "Pete",
        role: "admin",
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    },
];

export const registerUserAsync = createAsyncThunk(
    "registerUser",
    async (user: CreateUserDto) => {
        try {
            const response = await axios.post(
                `https://api.escuelajs.co/api/v1/users/`,
                user
            );
            const newUser: User = response.data;
            return newUser;
        } catch (e) {
            const error = e as Error;
            return error;
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUserAsync.fulfilled, (state, action) => {
            if (!(action.payload instanceof Error)) {
                const newUser = action.payload;
                if (
                    state.find((user) => user.email === newUser.email) ===
                    undefined
                ) {
                    return {
                        ...state,
                        newUser,
                    };
                }
            }
        });
    },
});

const usersReducer = usersSlice.reducer;
export default usersReducer;
