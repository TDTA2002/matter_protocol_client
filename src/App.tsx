import './main.scss';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RouteSetup from './routes/RouteSetup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouteSetup />
    </>
  )
}

export default App
