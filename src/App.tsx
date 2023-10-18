import './main.scss';
import { useEffect, useState } from 'react'
import RouteSetup from './routes/RouteSetup'
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from './store';
import { User, userAction } from './store/slices/user.slices';
import { Socket, io } from 'socket.io-client';

function App() {
  const dispatch = useDispatch()
  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })
  console.log("userStore", userStore);
  useEffect(() => {
    if (!userStore.data) {
      console.log("vào rồi 21215511");
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
          console.log("user", user);

        })
        dispatch(userAction.setSocket(socket))
      }
    }
  }, [userStore.reLoad])
  return (
    <>
      <RouteSetup />
    </>
  )
}

export default App
