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
          <Route path="/Chart" element={Lazy(() => import("@components/Chart/Chart"))()}></Route>
          <Route path="/binding" element={Lazy(() => import("@components/Binding/Binding"))()}></Route>
        </Route>
        <Route path="/login" element={Lazy(() => import("@components/Users/Formuser"))()}></Route>

      </Routes>
    </BrowserRouter>
  )
}