import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Frame from "../components/Frame";

export default function Home() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Navbar openSidebarFunction={setVisible}></Navbar>
      <Sidebar visible={visible} callbackClose={setVisible}></Sidebar>
      <div className="flex flex-row justify-center">
        <Frame height="half-screen" width={30}>
          <span className="title">Units</span>
        </Frame>
        <Frame height="half-screen" width={30}>
          <span className="title">Users</span>
        </Frame>
        <Frame height="half-screen" width={30}>
          <span className="title">Assets</span>
        </Frame>
      </div>
      <div className="flex flex-row justify-center">
        <Frame height="half-screen" width={95}>
          <span className="title">News</span>
        </Frame>
      </div>
    </>
  );
}
