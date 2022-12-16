import Frame from "../components/Frame";
import { connect } from "react-redux";
import { Unit } from "../interfaces/models/unit.interface";
import { useState } from "react";
import { Input, Button } from "antd";
import SearchableListUnits from "../components/SearchableListUnits";
import SearchableListAssets from "../components/SearchableListAssets";

interface UnitsProps {
  unit: Unit;
}

function Units(props: UnitsProps) {
  const [unit, setUnit] = useState<Unit>();

  function renderSelectUnit() {
    return (
      <div className="flex m-auto">
        <span className="text-3xl text-black font-bold">Select a unit to edit.</span>
      </div>
    );
  }

  function renderEditInputs() {
    return (
      <>
        <div className="py-5 flex flex-row items-center">
          <Input
            value={unit?.name}
            placeholder="Name"
            style={{ width: "30%", margin: "0.5rem" }}
          ></Input>

          <Input
            value={unit?.zipCode}
            placeholder="Name"
            style={{ width: "30%", margin: "0.5rem" }}
          ></Input>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-center">
        <Frame height="full-screen" width={95}>
          <>
            <div className="flex flex-row h-full justify-between relative mt-4">
              <div className="w-[30%]">
                <SearchableListUnits
                  buttonFunction={setUnit}
                  height={90}
                  unitState={props.unit}
                ></SearchableListUnits>
              </div>
              <div className="w-[70%] h-[95%] px-4 relative">
                <span className="font-bold text-black text-5xl absolute top-0">Edit Unit</span>
                <div className="w-full h-full relative flex flex-col mt-10">
                  {unit == undefined ? renderSelectUnit() : renderEditInputs()}
                  <div style={{ visibility: unit != undefined ? "visible" : "hidden" }}>
                    <SearchableListAssets
                      buttonFunction={() => {}}
                      changeOption={true}
                      height={90}
                      unitState={props.unit}
                    ></SearchableListAssets>
                  </div>
                </div>
                <Button
                  style={{ visibility: unit != undefined ? "visible" : "hidden" }}
                  className="absolute bottom-0
                   right-4 bg-[#20bd5a] text-white font-bold"
                >
                  Save
                </Button>
                <Button
                  style={{ visibility: unit != undefined ? "visible" : "hidden" }}
                  className="absolute bottom-0 left-4 font-bold"
                  onClick={() => {
                    setUnit(undefined);
                  }}
                >
                  Back
                </Button>
              </div>
            </div>
          </>
        </Frame>
      </div>
    </>
  );
}

const MapStateToProps = (state: any) => ({
  unit: state.unitState,
});

export default connect(MapStateToProps)(Units);
