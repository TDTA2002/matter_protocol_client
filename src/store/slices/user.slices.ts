import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

enum UserRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
}

export interface User {
    id: number;
    email: string;
    emailAuthentication: boolean;
    userName: string;
    password: string;
    role: UserRole;
    status: boolean;
    createAt: String;
    updateAt: String;
}

export interface Device{
   id: string;
   name: string;
   user_device_id: string;
   node_id: number; 
   status: boolean;
   power: number;
}

export interface UserState {
    data: User | null;
    reLoad: boolean;
    socket: null | Socket;
    // : null | string;
}

export const initialState: UserState = {
    data: null,
    reLoad: false,
    socket: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setData: function (state, action) {
            return {
                ...state,
                data: action.payload
            }
        },
        setSocket: function (state, action) {
            return {
                ...state,
                socket: action.payload
            }
        },
        reload: function (state) {
            return {
                ...state,
                reLoad: !state.reLoad
            }
        },
        setDevice: function (state, action) {
            return {
                ...state,
                Device: action.payload,
            };
        },
    }
})

export const userAction = {
    ...userSlice.actions
}

export const userReducer = userSlice.reducer