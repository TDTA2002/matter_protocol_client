import axios from "axios";

export default {
    create: async function (newDevice: any,id:any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + `device/create/${id}`, newDevice)
    },
    findAll: async function (q:string,s:string) {
        return await axios.get(import.meta.env.VITE_SV_HOST + `device?q=${q}&s=${s}`)
    },
    toggle: async function (id:any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + `device/toggledevive/${id}`)
    },
    realtime:async function (id:string,status:any){
        return await axios.post(import.meta.env.VITE_SV_HOST + `device/realtimes/${id}`, status)
    }
}

