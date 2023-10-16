import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lazy from '@util/lazies/lazy';


export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home - Navbar + Footer */}
        <Route path="/" element={Lazy(() => import("@components/Home"))()}>
          <Route path="/" element={Lazy(() => import("@/components/Dashboard"))()}></Route>
          <Route path="/device" element={Lazy(() => import("@components/Devices/Devices"))()}></Route>
        </Route>



      </Routes>
    </BrowserRouter>
  )
}