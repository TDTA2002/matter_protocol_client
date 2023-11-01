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
    isAdmin: Boolean;
    status: boolean;
    createAt: String;
    updateAt: String;
    user_device: UserDevice;
    userDevice: UserDevice[]
}
export interface UserDevice {
    id: number;
    email: string;
    userId: string;
    role: UserRole;
    device:Device[]|null
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
    // timeCreate: string;
    active: boolean;
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
export interface ListUser {
    id: string;
    email: string;
    role: UserRole;
}
export interface ListU {
    id: string;
    email: string;
    role: UserRole;
}
export interface UserState {
    data: User | null;
    reLoad: boolean;
    socket: null | Socket;
    Device: null | Device[];
    ListBinding: null | ListBinding[];
    Chart: null | ListChart[];
    ListUser: null | ListUser[];
    ListU: null | ListU[]
}

export const initialState: UserState = {
    data: null,
    reLoad: false,
    socket: null,
    Device: null,
    ListBinding: null,
    Chart: null,
    ListUser: null,
    ListU: null

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
            console.log('action.payload',action.payload);
            
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
        setUser: function (state, action) {
            return {
                ...state,
                ListUser: action.payload,
            };
        },
        setListU: function (state, action) {
            return {
                ...state,
                ListU: action.payload
            }
        }
    }
})

export const userAction = {
    ...userSlice.actions
}

export const userReducer = userSlice.reducer