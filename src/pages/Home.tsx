import Frame from "../components/Frame";
import SearchableListUsers from "../components/SearchableListUsers";
import SearchableListUnits from "../components/SearchableListUnits";
import SearchableListAssets from "../components/SearchableListAssets";
import { connect } from "react-redux";
import { Unit } from "../interfaces/models/unit.interface";
import { getUsersData } from "../services/getEntities";
import { User } from "../interfaces/models/user.interface";

interface HomeProps {
  unit: Unit;
  userLogged: User;
}

function Home(props: HomeProps) {
  return (
    <>
      <div className="flex flex-row justify-center">
        <Frame height="half-screen" width={46.5}>
          <>
            <span className="title">Units</span>
            <SearchableListUnits
              editableItems={false}
              buttonFunction={() => {}}
              height={70}
              unitState={props.unit}
            ></SearchableListUnits>
          </>
        </Frame>
        <Frame height="half-screen" width={46.5}>
          <>
            <span className="title">Users</span>
            <SearchableListUsers
              editableItems={false}
              buttonFunction={() => {}}
              height={70}
              unitState={props.unit}
            ></SearchableListUsers>
          </>
        </Frame>
      </div>
      <div className="flex flex-row justify-center">
        <Frame height="half-screen" width={95}>
          <>
            <span className="title">Assets</span>
            <SearchableListAssets
              editableItems={false}
              buttonFunction={() => {}}
              height={70}
              unitState={props.unit}
            ></SearchableListAssets>
          </>
        </Frame>
      </div>
    </>
  );
}

const MapStateToProps = (state: any) => ({
  unit: state.unitState,
  userLogged: state.userLogged,
});

export default connect(MapStateToProps)(Home);
