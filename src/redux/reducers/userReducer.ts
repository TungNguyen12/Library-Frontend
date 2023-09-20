import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../../types/User";

const initialState: User[] = [];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.push(action.payload);
        },
        removeUser: (state, action: PayloadAction<number>) => {
            const foundIndex = state.findIndex(
                (user) => user.id === action.payload
            );
            state.splice(foundIndex, 1);
        },
        //NEED TO CREATE A USER REGISTER AND LOGIN
        registerUser: () => {},
        loginUser: () => {},
    },
});

const userReducer = usersSlice.reducer;
export const { addUser, removeUser, registerUser, loginUser } =
    usersSlice.actions;
export default userReducer;
