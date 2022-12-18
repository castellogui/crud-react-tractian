import Frame from "../components/Frame";
import { connect } from "react-redux";
import { Unit } from "../interfaces/models/unit.interface";
import { Input, Button } from "antd";
import SearchableListUnits from "../components/SearchableListUnits";
import { Company, UpdatedCompany } from "../interfaces/models/company.interface";
import SearchableListCompanies from "../components/SearchableListCompanies";
import { confirmMessage, showMessage } from "../utils/MessageUtils";
import { editCompanyData, moveUnit, moveUser } from "../services/saveEntities";
import { User } from "../interfaces/models/user.interface";
import SearchableListUsers from "../components/SearchableListUsers";
import { useEffect, useState } from "react";
import handleChange from "../utils/HandlesUtils";

interface CompanyProps {
  userLogged: User;
  unit: Unit;
}

function Companies(props: CompanyProps) {
  const [company, setCompany] = useState<UpdatedCompany>();

  function renderSelectCompany() {
    return (
      <div className="flex m-auto h-full items-center">
        <span className="text-3xl text-black font-bold">Select a company to edit.</span>
      </div>
    );
  }

  function renderEditInputs() {
    return (
      <>
        <div className="py-5 flex flex-row items-center">
          <Input
            name="name"
            value={company?.name}
            onChange={(e) => {
              handleChange(e, company, setCompany);
            }}
            placeholder="Name"
            style={{ width: "30%", margin: "0.5rem" }}
          ></Input>
        </div>
      </>
    );
  }

  const moveUnitFromCompany = async (newCompanyId: String, unitId: String, refatch: any) => {
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
          let data = { unitId, newCompanyId };
          await moveUnit(props.userLogged.token, data, company?._id);
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

  const moveUserFromCompany = async (newCompanyId: String, userId: String, refatch: any) => {
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
          let data = { userId, newCompanyId };
          await moveUser(props.userLogged.token, data, company?._id);
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

  async function updateCompanyInfo() {
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
          let data = { name: company?.name };
          await editCompanyData(props.userLogged.token, data, company?._id);
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
                <SearchableListCompanies
                  editableItems={true}
                  buttonFunction={setCompany}
                  changeOption={true}
                  height={90}
                  unitState={props.unit}
                ></SearchableListCompanies>
              </div>
              <div className="w-[70%] h-[95%] px-4 relative">
                <span className="font-bold text-black text-5xl absolute top-0">Edit Company</span>
                <div className="w-full h-full relative flex flex-col mt-10">
                  {company?.name == undefined ? renderSelectCompany() : renderEditInputs()}
                  <div
                    style={{
                      visibility: company?.name != undefined ? "visible" : "hidden",
                      height: `100%`,
                    }}
                  >
                    <SearchableListUnits
                      triggerMove={moveUnitFromCompany}
                      editableItems={false}
                      buttonFunction={() => {}}
                      changeOption={true}
                      companyFilterName={company?.name}
                      height={25}
                      unitState={props.unit}
                    ></SearchableListUnits>
                    <SearchableListUsers
                      triggerMove={moveUserFromCompany}
                      editableItems={false}
                      companyFilterName={company?.name}
                      buttonFunction={() => {}}
                      changeOption={true}
                      height={20}
                      unitState={props.unit}
                    ></SearchableListUsers>
                  </div>
                </div>
                <Button
                  style={{ visibility: company?.name != undefined ? "visible" : "hidden" }}
                  className="absolute bottom-0
                   right-4 bg-[#20bd5a] text-white font-bold"
                  onClick={() => {
                    updateCompanyInfo();
                  }}
                >
                  Save
                </Button>
                <Button
                  style={{ visibility: company?.name != undefined ? "visible" : "hidden" }}
                  className="absolute bottom-0 left-4 font-bold"
                  onClick={() => {
                    setCompany(undefined);
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

export default connect(MapStateToProps)(Companies);
