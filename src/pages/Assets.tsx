import Frame from "../components/Frame";
import { connect } from "react-redux";
import SearchableListAssets from "../components/SearchableListAssets";
import { Unit } from "../interfaces/models/unit.interface";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Avatar,
  Input,
  Dropdown,
  Button,
  Space,
  MenuProps,
  Row,
  Col,
  Slider,
  InputNumber,
} from "antd";
import { confirmMessage, showMessage } from "../utils/MessageUtils";
import { handleChangeInputElement, handleChange } from "../utils/HandlesUtils";
import { editAssetData } from "../services/saveEntities";
import { UpdatedAsset } from "../interfaces/models/asset.interface";
import { User } from "../interfaces/models/user.interface";

interface AssetsProps {
  userLogged: User;
  unit: Unit;
}

function Assets(props: AssetsProps) {
  const [asset, setAsset] = useState<UpdatedAsset>();
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
    handleChange("status", status, asset, setAsset);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  function renderSelectAsset() {
    return (
      <div className="flex m-auto">
        <span className="text-3xl text-black font-bold">Select a asset to edit.</span>
      </div>
    );
  }

  function renderEditInputs() {
    return (
      <>
        <div className="py-5 flex flex-row items-center">
          <div>
            <Avatar src={asset?.avatar} style={{ width: "300px", height: "300px" }}></Avatar>
          </div>
          <div className="px-5">
            <Input
              name="name"
              value={asset?.name}
              onChange={(e) => {
                handleChangeInputElement(e, asset, setAsset);
              }}
              placeholder="Name"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              name="description"
              value={asset?.description}
              onChange={(e) => {
                handleChangeInputElement(e, asset, setAsset);
              }}
              placeholder="Description"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              name="model"
              value={asset?.model}
              onChange={(e) => {
                handleChangeInputElement(e, asset, setAsset);
              }}
              placeholder="Model"
              style={{ width: "15%", margin: "0.5rem" }}
            ></Input>
            <Input
              name="status"
              value={asset?.status}
              readOnly
              placeholder="Model"
              style={{ width: "15%", margin: "0.5rem", cursor: "not-allowed" }}
            ></Input>

            {/* <Input
              name="name"
              value={asset?.owner.name}
              placeholder="Owner"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input> */}
            <Dropdown menu={menuProps} className="m-[0.5rem] w-[30%]" trigger={["click"]}>
              <Button>
                <Space>
                  Change status
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Button type="primary" className="bg-[#2562e9] m-[0.5rem] w-[30%]">
              Go to chart
            </Button>
            <div className="my-[0.5rem] w-[34%] float-right">
              <Row>
                <Col span={12}>
                  <Slider
                    min={0}
                    max={100}
                    onChange={(e) => handleChange("healthLevel", e.toString(), asset, setAsset)}
                    value={Number(asset?.healthLevel)}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    max={20}
                    style={{ margin: "0 16px" }}
                    value={Number(asset?.healthLevel)}
                    onChange={(e) => handleChange("healthLevel", e!.toString(), asset, setAsset)}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </>
    );
  }

  async function updateAssetInfo() {
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
          let data: UpdatedAsset = {
            name: asset?.name,
            unit: asset?.unit,
            description: asset?.description,
            model: asset?.model,
            owner: asset?.owner,
            status: asset?.status,
            healthLevel: asset?.healthLevel,
          };
          await editAssetData(props.userLogged.token, data, asset?._id);
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
                <Button
                  style={{ visibility: asset != undefined ? "visible" : "hidden" }}
                  className="absolute bottom-0
                   right-4 bg-[#20bd5a] text-white font-bold"
                  onClick={updateAssetInfo}
                >
                  Save
                </Button>
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
  userLogged: state.userLogged,
});

export default connect(MapStateToProps)(Assets);
