import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Frame from "../components/Frame";
import SearchableListUsers from "../components/SearchableListUsers";
import SearchableListUnits from "../components/SearchableListUnits";
import SearchableListAssets from "../components/SearchableListAssets";
import units from "../assets/units.json";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const unit = units.filter((unit) => {
    return unit._id == "639a04347fda470883d20fd5";
  })[0];

  return (
    <>
      <Navbar openSidebarFunction={setVisible}></Navbar>
      <Sidebar visible={visible} callbackClose={setVisible}></Sidebar>
      <div className="flex flex-row justify-center">
        <Frame height="half-screen" width={46}>
          <>
            <span className="title">Units</span>
            <SearchableListUnits unitState={unit}></SearchableListUnits>
          </>
        </Frame>
        <Frame height="half-screen" width={46}>
          <>
            <span className="title">Users</span>
            <SearchableListUsers unitState={unit}></SearchableListUsers>
          </>
        </Frame>
      </div>
      <div className="flex flex-row justify-center">
        <Frame height="half-screen" width={95}>
          <>
            <span className="title">Assets</span>
            <SearchableListAssets unitState={unit}></SearchableListAssets>
          </>
        </Frame>
      </div>
    </>
  );
}
