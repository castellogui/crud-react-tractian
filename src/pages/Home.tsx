import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Frame from "../components/Frame";
import SearchableListUsers from "../components/SearchableListUsers";
import SearchableListUnits from "../components/SearchableListUnits";
import SearchableListAssets from "../components/SearchableListAssets";

export default function Home() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Navbar openSidebarFunction={setVisible}></Navbar>
      <Sidebar visible={visible} callbackClose={setVisible}></Sidebar>
      <div className="flex flex-row justify-center">
        <Frame height="half-screen" width={46}>
          <>
            <span className="title">Units</span>
            <SearchableListUnits></SearchableListUnits>
          </>
        </Frame>
        <Frame height="half-screen" width={46}>
          <>
            <span className="title">Users</span>
            <SearchableListUsers></SearchableListUsers>
          </>
        </Frame>
      </div>
      <div className="flex flex-row justify-center">
        <Frame height="half-screen" width={95}>
          <>
            <span className="title">Assets</span>
            <SearchableListAssets></SearchableListAssets>
          </>
        </Frame>
      </div>
    </>
  );
}
