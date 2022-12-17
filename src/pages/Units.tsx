import Frame from "../components/Frame";
import { connect } from "react-redux";
import { Unit } from "../interfaces/models/unit.interface";
import { useState } from "react";
import { Input, Button } from "antd";
import SearchableListUnits from "../components/SearchableListUnits";
import SearchableListAssets from "../components/SearchableListAssets";
import { confirmMessage, showMessage } from "../utils/MessageUtils";
import { SweetAlertResult } from "sweetalert2";
import { editUnitData, moveAsset } from "../services/saveEntities";
import { User } from "../interfaces/models/user.interface";

interface UnitsProps {
  unit: Unit;
  userLogged: User;
}

function Units(props: UnitsProps) {
  const [unit, setUnit] = useState<any>();
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");

  function renderSelectUnit() {
    return (
      <div className="flex m-auto">
        <span className="text-3xl text-black font-bold">Select a unit to edit.</span>
      </div>
    );
  }

  const moveAssetFromUnit = async (newUnityId: String, assetId: String, refatch: any) => {
    await confirmMessage(
      undefined,
      "Are you sure?",
      "Do you want to save the changes?",
      undefined,
      "Save",
      "Cancel"
    ).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          let data = { assetId, newUnityId };
          await moveAsset(props.userLogged.token, data, unit?._id);
          showMessage("success", undefined, "Changes were updated", "");
          refatch();
        } catch (error: any) {
          showMessage(
            "error",
            undefined,
            "There is an error while trying to update value.",
            `Error detail: ${error.response.data.errorDetail}`
          );
        }
      } else {
        if (result.isDenied) {
          showMessage("info", undefined, "Changes was not updated", "");
        }
      }
    });
  };

  function renderEditInputs() {
    return (
      <>
        <div className="py-5 flex flex-row items-center">
          <Input
            defaultValue={unit?.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
            style={{ width: "30%", margin: "0.5rem" }}
          ></Input>

          {/* <Input
            defaultValue={unit?.zipCode}
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
            placeholder="Name"
            style={{ width: "30%", margin: "0.5rem" }}
          ></Input> */}
        </div>
      </>
    );
  }

  async function saveUpdates() {
    await confirmMessage(
      undefined,
      "Are you sure?",
      "Do you want to save the changes?",
      undefined,
      "Save",
      "Cancel"
    ).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          let data = {
            name: name,
            zipCode: zipCode,
            companyId: unit?.company._id,
          };
          await editUnitData(props.userLogged.token, data, unit?._id);
          showMessage("success", undefined, "Changes were updated", "");
        } catch (error: any) {
          showMessage(
            "error",
            undefined,
            "There is an error while trying to update value.",
            `Error detail: ${error.response.data.errorDetail}`
          );
        }
      } else {
        if (result.isDenied) {
          showMessage("info", undefined, "Changes was not updated", "");
        }
      }
    });
  }

  return (
    <>
      <div className="flex flex-row justify-center">
        <Frame height="full-screen" width={95}>
          <>
            <div className="flex flex-row h-full justify-between relative mt-4">
              <div className="w-[30%]">
                <SearchableListUnits
                  editableItems={true}
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
                      triggerMove={moveAssetFromUnit}
                      editableItems={false}
                      buttonFunction={() => {}}
                      changeOption={true}
                      height={90}
                      unitState={props.unit}
                      unitFilter={unit?.name}
                    ></SearchableListAssets>
                  </div>
                </div>
                <Button
                  style={{ visibility: unit != undefined ? "visible" : "hidden" }}
                  className="absolute bottom-0
                   right-4 bg-[#20bd5a] text-white font-bold"
                  onClick={saveUpdates}
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
  userLogged: state.userLogged,
});

export default connect(MapStateToProps)(Units);
