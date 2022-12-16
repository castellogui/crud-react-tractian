import Frame from "../components/Frame";
import { connect } from "react-redux";
import SearchableListUsers from "../components/SearchableListUsers";
import { Unit } from "../interfaces/models/unit.interface";
import { useState } from "react";
import { User } from "../interfaces/models/user.interface";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Input, Dropdown, Button, Space, MenuProps } from "antd";
import companies from "../assets/companies.json";

interface UsersProps {
  unit: Unit;
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

  const handleMenuTypesClick: MenuProps["onClick"] = (e) => {
    let type = e.key;
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    let companyId = e.key;
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const menuTypeProps = {
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
    onClick: handleMenuTypesClick,
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
              value={user?.name}
              placeholder="Name"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              value={user?.familyName}
              placeholder="Family Name"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              value={user?.username}
              placeholder="Username"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              value={user?.email}
              placeholder="Email"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Input
              value={"password"}
              type="password"
              placeholder="Password"
              style={{ width: "30%", margin: "0.5rem" }}
            ></Input>
            <Dropdown menu={menuProps} className="m-[0.5rem]">
              <Button>
                <Space>
                  Companies
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Dropdown menu={menuTypeProps} className="mx-[3.1rem]">
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

  return (
    <>
      <div className="flex flex-row justify-center">
        <Frame height="full-screen" width={95}>
          <>
            <span className="title">Units</span>
            <div className="flex flex-row h-full justify-between relative">
              <div className="w-[30%]">
                <SearchableListUsers
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
});

export default connect(MapStateToProps)(Users);
