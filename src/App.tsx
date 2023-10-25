import './main.scss';
import { useEffect, useState } from 'react'
import RouteSetup from './routes/RouteSetup'
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from './store';
import {Device, User, userAction } from './store/slices/user.slices';
import { Socket, io } from 'socket.io-client';

function App() {
  const dispatch = useDispatch()
  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })
  useEffect(() => {
    if (!userStore.data) {
      let token = localStorage.getItem("token");
      if (token) {
        let socket: Socket = io("http://localhost:3001", {
          query: {
            token
          }
        })
        socket.on("connectStatus", (data: { status: boolean, message: string }) => {
          if (data.status) {
            console.log(data.message)
          } else {
            console.log(data.message)
          }
        })
        socket.on("disconnect", () => {
          dispatch(userAction.setData(null))
          console.log("đã out")
        })

        socket.on("receiveUserData", (user: User) => {
          dispatch(userAction.setData(user))
        })
        socket.on("receiveUserDevice", (device: Device) => {
            dispatch(userAction.setDevice(device))
            console.log("device",device);
        })
        dispatch(userAction.setSocket(socket))
      }


    }
  }, [userStore.reLoad])
  useEffect(() => {
    const interval = 1 * 60 * 1000; // 3 phút
    const checkLocalStorageData = () => {
      const localStorageData = localStorage.getItem('decodeData');        
      if (localStorageData != undefined) {
        const dataArray = JSON.parse(localStorageData);
        for (let i in dataArray) {
          const parts = dataArray[i].decode.split('+')
          if (parts.length === 2) {
            const timestamp = parseInt(parts[1], 10);
            if (!isNaN(timestamp)) {
              const currentTime = Math.floor(Date.now());
              const time = ((currentTime - timestamp) / 1000);
              const isWithin10Minutes = time > 270;    
              if (isWithin10Minutes) {
                dataArray.splice(dataArray[i], 1);
              }
            }
          }
        }
        localStorage.setItem('decodeData', JSON.stringify(dataArray));
      }else{
        console.log("1243");     
        clearTimeout(interval)
      }
    };
    const timeoutCallback = async () => {
      while (true) {
        checkLocalStorageData();
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    };
    timeoutCallback();
    return () => {
      console.log("clear");
      clearTimeout(interval)
    };
  }, []);
  return (
    <>
      <RouteSetup />
    </>
  )
}

export default App
