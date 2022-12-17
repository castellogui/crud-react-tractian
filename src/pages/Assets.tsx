import Frame from "../components/Frame";
import { connect } from "react-redux";
import SearchableListAssets from "../components/SearchableListAssets";
import { Unit } from "../interfaces/models/unit.interface";
import { useState } from "react";
import { Asset } from "../interfaces/models/asset.interface";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Input, Dropdown, Button, Space, MenuProps } from "antd";

interface AssetsProps {
  unit: Unit;
}

function Assets(props: AssetsProps) {
  const [asset, setAsset] = useState<any>();

  function renderSelectAsset() {
    return (
      <div className="flex m-auto">
        <span className="text-3xl text-black font-bold">Select a asset to edit.</span>
      </div>
    );
  }

  const items: MenuProps["items"] = [
    {
      label: "Running",
      key: "Running",
    },
    {
      label: "Alerting",
      key: "Alerting",
    },
    {
      label: "Stopped",
      key: "Stopped",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    let status = e.key;
    setAsset({ ...asset, status });
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  function renderEditInputs() {
    return (
      <>
        <div className="py-5 flex flex-row items-center">
          <div>
            <Avatar src={asset?.avatar} style={{ width: "300px", height: "300px" }}></Avatar>
          </div>
          <div className="px-5">
            <Input
              value={asset?.name}
              placeholder="Name"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              value={asset?.description}
              placeholder="Description"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              value={asset?.model}
              placeholder="Model"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              value={asset?.owner.name}
              placeholder="Owner"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Dropdown menu={menuProps} className="m-[0.5rem] w-[30%]">
              <Button>
                <Space>
                  Companies
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Button type="primary" className="bg-[#2562e9] m-[0.5rem] w-[30%]">
              Go to chart
            </Button>
          </div>
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
                <SearchableListAssets
                  editableItems={true}
                  buttonFunction={setAsset}
                  height={90}
                  unitState={props.unit}
                ></SearchableListAssets>
              </div>
              <div className="w-[70%] h-[95%] px-4 relative">
                <span className="font-bold text-black text-5xl absolute top-0">Edit Asset</span>
                <div className="w-full h-full relative flex flex-col justify-center">
                  {asset == undefined ? renderSelectAsset() : renderEditInputs()}
                </div>
                {/* <Button
                  style={{ visibility: asset != undefined ? "visible" : "hidden" }}
                  className="absolute bottom-0
                   right-4 bg-[#20bd5a] text-white font-bold"
                >
                  Save
                </Button> */}
                <Button
                  style={{ visibility: asset != undefined ? "visible" : "hidden" }}
                  className="absolute bottom-0 left-4 font-bold"
                  onClick={() => {
                    setAsset(undefined);
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

export default connect(MapStateToProps)(Assets);
