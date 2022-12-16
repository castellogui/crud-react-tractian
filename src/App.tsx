import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Users from "./pages/Users";
import { useState } from "react";
import Navbar from "../src/components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="App">
      <Navbar openSidebarFunction={setVisible}></Navbar>
      <Sidebar visible={visible} callbackClose={setVisible}></Sidebar>
      <Routes>
        <Route path="/home" element={<Home></Home>} />
        <Route path="/companies" element={<Home></Home>} />
        <Route path="/units" element={<Home></Home>} />
        <Route path="/users" element={<Users></Users>} />
        <Route path="/assets" element={<Home></Home>} />
        <Route path="/challenge" element={<Home></Home>} />
        <Route path="/me" element={<Home></Home>} />
      </Routes>
    </div>
  );
}

export default App;
