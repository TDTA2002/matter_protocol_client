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

export interface Device {
    id: string;
    name: string;
    user_device_id: string;
    node_id: number;
    status: boolean;
    power: number;
    groupName: string;
    groupId: string;
}
export interface BindingDevice {
    id: string;
    name: string;
    user_device_id: string;
    node_id: number;
    status: boolean;
    power: number;
}
export interface Binding {
    id: string;
    name: string;
    deviceId: string;
}
export interface ListBinding {
    binding: Binding;
    bindingDevice: BindingDevice;
}
export interface ListChart {
    id: string;
    Date: string;
    timestamp: number;
}

export interface UserState {
    data: User | null;
    reLoad: boolean;
    socket: null | Socket;
    Device: null | Device[];
    ListBinding: null | ListBinding[];
    Chart: null | ListChart[]
}

export const initialState: UserState = {
    data: null,
    reLoad: false,
    socket: null,
    Device: null,
    ListBinding: null,
    Chart: null
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
        setListBinding: function (state, action) {
            return {
                ...state,
                ListBinding: action.payload,
            };
        },
        setChart: function (state, action) {
            return {
                ...state,
                Chart: action.payload,
            };
        },
    }
})

export const userAction = {
    ...userSlice.actions
}

export const userReducer = userSlice.reducer