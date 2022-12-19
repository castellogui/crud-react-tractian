import Frame from "../components/Frame";
import { connect } from "react-redux";
import SearchableListUsers from "../components/SearchableListUsers";
import { Unit } from "../interfaces/models/unit.interface";
import { useState } from "react";
import { UpdatedUser, User } from "../interfaces/models/user.interface";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Input, Dropdown, Button, Space, MenuProps } from "antd";
import companies from "../assets/companies.json";
import { handleChange, handleChangeInputElement } from "../utils/HandlesUtils";
import { confirmMessage, showMessage } from "../utils/MessageUtils";
import { editUserData } from "../services/saveEntities";

interface UsersProps {
  unit: Unit;
  userLogged: User;
}

function Users(props: UsersProps) {
  const [user, setUser] = useState<User>();

  const items: MenuProps["items"] = [];

  companies.map((company) => {
    let unitOption = {
      label: company.name,
      key: company._id,
    };
    items.push(unitOption);
  });

  const filterAdminTypeWord = () => {
    let userType: any = menuProps.items.filter((option) => {
      return option.key == user?.type[0];
    });
    return userType[0]?.label;
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    let type = [e.key];
    handleChange("type", type, user, setUser);
  };

  const menuProps = {
    items: [
      {
        label: "Administration",
        key: "ROLE_ADMIN",
      },
      {
        label: "User",
        key: "ROLE_USER",
      },
    ],
    onClick: handleMenuClick,
  };

  function renderSelectUser() {
    return (
      <div className="flex m-auto">
        <span className="text-3xl text-black font-bold">Select a user to edit.</span>
      </div>
    );
  }

  function renderEditInputs() {
    return (
      <>
        <div className="py-5 flex flex-row items-center">
          <div>
            <Avatar src={user?.avatar} style={{ width: "300px", height: "300px" }}></Avatar>
          </div>
          <div className="px-5">
            <Input
              name="name"
              value={user?.name}
              onChange={(e) => {
                handleChangeInputElement(e, user, setUser);
              }}
              placeholder="Name"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              name="familyName"
              value={user?.familyName}
              onChange={(e) => {
                handleChangeInputElement(e, user, setUser);
              }}
              placeholder="Family Name"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              name="username"
              value={user?.username}
              onChange={(e) => {
                handleChangeInputElement(e, user, setUser);
              }}
              placeholder="Username"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              name="email"
              value={user?.email}
              onChange={(e) => {
                handleChangeInputElement(e, user, setUser);
              }}
              placeholder="Email"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              name="password"
              defaultValue={"password"}
              onChange={(e) => {
                handleChangeInputElement(e, user, setUser);
              }}
              type="password"
              placeholder="Password"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              name="type"
              value={filterAdminTypeWord()}
              readOnly
              style={{ width: "30%", margin: "0.5rem", cursor: "not-allowed" }}
            ></Input>
            <Dropdown menu={menuProps} className="m-2 w-[15%]" trigger={["click"]}>
              <Button>
                <Space>
                  Type
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
      </>
    );
  }

  async function updateUserInfo() {
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
          let data: UpdatedUser = {
            name: user?.name,
            familyName: user?.familyName,
            username: user?.username,
            email: user?.email,
            password: user?.password,
            type: user?.type,
          };
          await editUserData(props.userLogged.token, data, user?._id);
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
                <SearchableListUsers
                  editableItems={true}
                  buttonFunction={setUser}
                  height={90}
                  unitState={props.unit}
                ></SearchableListUsers>
              </div>
              <div className="w-[70%] h-[95%] px-4 relative">
                <span className="font-bold text-black text-5xl absolute top-0">Edit User</span>
                <div className="w-full h-full relative flex flex-col justify-center">
                  {user == undefined ? renderSelectUser() : renderEditInputs()}
                </div>
                <Button
                  style={{ visibility: user != undefined ? "visible" : "hidden" }}
                  className="absolute bottom-0
                   right-4 bg-[#20bd5a] text-white font-bold"
                  onClick={updateUserInfo}
                >
                  Save
                </Button>
                <Button
                  style={{ visibility: user != undefined ? "visible" : "hidden" }}
                  className="absolute bottom-0 left-4 font-bold"
                  onClick={() => {
                    setUser(undefined);
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

export default connect(MapStateToProps)(Users);
