import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lazy from '@util/lazies/lazy';
import Hommm from "@components/Home"
import Home from "@/components/Dashboard";
import MyChart from "@components/Chart/Chart";
export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home - Navbar + Footer */}
        <Route path="/" element={<Hommm />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/device" element={Lazy(() => import("@components/Devices/Devices"))()}></Route>
          <Route path="/Chart" element={<MyChart/>}></Route>
          <Route path="/binding" element={Lazy(() => import("@components/Binding/Binding"))()}></Route>
        </Route>
        <Route path="/login" element={Lazy(() => import("@components/Users/Formuser"))()}></Route>

      </Routes>
    </BrowserRouter>
  )
}