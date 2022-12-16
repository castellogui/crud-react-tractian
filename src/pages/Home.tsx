import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Frame from "../components/Frame";
import SearchableListUsers from "../components/SearchableListUsers";
import SearchableListUnits from "../components/SearchableListUnits";
import SearchableListAssets from "../components/SearchableListAssets";
import units from "../assets/units.json";
import { connect } from "react-redux";
import { Unit } from "../interfaces/models/unit.interface";

interface HomeProps {
  unit: Unit;
}

function Home(props: HomeProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Navbar openSidebarFunction={setVisible}></Navbar>
      <Sidebar visible={visible} callbackClose={setVisible}></Sidebar>
      <div className="flex flex-row justify-center">
        <Frame height="half-screen" width={46.5}>
          <>
            <span className="title">Units</span>
            <SearchableListUnits unitState={props.unit}></SearchableListUnits>
          </>
        </Frame>
        <Frame height="half-screen" width={46.5}>
          <>
            <span className="title">Users</span>
            <SearchableListUsers unitState={props.unit}></SearchableListUsers>
          </>
        </Frame>
      </div>
      <div className="flex flex-row justify-center">
        <Frame height="half-screen" width={95}>
          <>
            <span className="title">Assets</span>
            <SearchableListAssets unitState={props.unit}></SearchableListAssets>
          </>
        </Frame>
      </div>
    </>
  );
}

const MapStateToProps = (state: any) => ({
  unit: state.unitState,
});

export default connect(MapStateToProps)(Home);
