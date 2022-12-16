import Frame from "../components/Frame";
import { connect } from "react-redux";
import { Unit } from "../interfaces/models/unit.interface";
import { useState } from "react";
import { Input, Button } from "antd";
import SearchableListUnits from "../components/SearchableListUnits";
import SearchableListAssets from "../components/SearchableListAssets";
import { Company } from "../interfaces/models/company.interface";
import SearchableListCompanies from "../components/SearchableListCompanies";

interface CompanyProps {
  unit: Unit;
}

function Companies(props: CompanyProps) {
  const [company, setCompany] = useState<Company>();

  function renderSelectUser() {
    return (
      <div className="flex m-auto">
        <span className="text-3xl text-black font-bold">Select a company to edit.</span>
      </div>
    );
  }

  function renderEditInputs() {
    return (
      <>
        <div className="py-5 flex flex-row items-center">
          <Input
            value={company?.name}
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
                <SearchableListCompanies
                  buttonFunction={setCompany}
                  changeOption={true}
                  height={90}
                  unitState={props.unit}
                ></SearchableListCompanies>
              </div>
              <div className="w-[70%] h-[95%] px-4 relative">
                <span className="font-bold text-black text-5xl absolute top-0">Edit Company</span>
                <div className="w-full h-full relative flex flex-col mt-10">
                  {company == undefined ? renderSelectUser() : renderEditInputs()}
                  <div style={{ visibility: company != undefined ? "visible" : "hidden" }}>
                    <SearchableListUnits
                      companyFilter={company?.name}
                      buttonFunction={() => {}}
                      changeOption={true}
                      height={90}
                      unitState={props.unit}
                    ></SearchableListUnits>
                  </div>
                </div>
                <Button
                  style={{ visibility: company != undefined ? "visible" : "hidden" }}
                  className="absolute bottom-0
                   right-4 bg-[#20bd5a] text-white font-bold"
                >
                  Save
                </Button>
                <Button
                  style={{ visibility: company != undefined ? "visible" : "hidden" }}
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
});

export default connect(MapStateToProps)(Companies);
