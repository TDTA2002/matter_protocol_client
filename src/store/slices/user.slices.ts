import { Socket } from "socket.io-client";
import { createSlice } from "@reduxjs/toolkit";


export interface User {
    id: number;
    email: string;
    emailAuthentication: boolean;
    userName: string;
    password: string;
    role: number;
    status: boolean;
    createAt: String;
    updateAt: String;
}

interface UserState {
    data: User | null;
    reload: boolean;
    socket: null | Socket;
    // : null | string;
}

const initialState: UserState = {
    data: null,
    reload: false,
    socket: null,
};
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        setSocket: function (state, action){
            return {
                ...state,
                socket: action.payload,
            };
        },
        
    }
})

export const userAction = {
    ...userSlice.actions,
};

export const userReducer = userSlice.reducer;