// @react-router-dom
import { Routes, Route, Outlet, Link } from "react-router-dom";
// screens
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <>
    <Routes>
      <Route index element={<HomeScreen />} />

      {/* <Route path="*" element={<NoMatch />} /> */}
  </Routes>
  </>
  );
}
