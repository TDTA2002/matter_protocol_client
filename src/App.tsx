import './main.scss';
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RouteSetup from './routes/RouteSetup'
import { Socket, io } from "socket.io-client"
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from './store';
import { userAction } from './store/slices/user.slices';

function App() {
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })
  useEffect(() => {
    let socket: Socket = io("http://localhost:3001", {
      query: {
        testdecoe: String
      }
    })
    dispatch(userAction.setSocket(socket))
    // console.log("socket", socket);


    // socket.on("decode", () => {
    //   console.log(123);

    // })

    // socket.emit("requireDecoe", {
    //   message: 8,
    //   node_id: 156,
    // });
  }, [userStore.reload])
  return (
    <>
      <RouteSetup />
    </>
  )
}

export default App
