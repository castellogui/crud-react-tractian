import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import { Dropdown, MenuProps, Space } from "antd";
import { connect } from "react-redux";
import { changeUnit, logOffUser } from "../store/actions";
import { Unit } from "../interfaces/models/unit.interface";

import units from "../assets/units.json";
import { useNavigate } from "react-router";

interface NavbarProps {
  userLogged: any;
  changeUnit: any;
  logOffUser: any;
  unit: any;
  openSidebarFunction: Function;
}

function Navbar(props: NavbarProps) {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [];
  items.push({
    label: "All Units",
    key: "all",
  });
  units.map((unit) => {
    let unitOption = {
      label: unit.name,
      key: unit._id,
    };
    items.push(unitOption);
  });

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    let unitId = e.key;
    let unitResult = units.filter((unit) => {
      return unit._id == unitId;
    });
    props.changeUnit(unitResult[0]);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const logOff = () => {
    props.logOffUser();
    navigate("/");
  };

  function renderNav() {
    return (
      <nav className="w-[100%] h-16 bg-white shadow-md flex flex-row items-center justify-between">
        <MenuOutlined
          className="mx-4 scale-125"
          onClick={() => {
            props.openSidebarFunction(true);
          }}
        ></MenuOutlined>
        <div className="w-max h-12 flex flex-row text-center items-center ">
          <div className="mx-8">
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  Units
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div className="w-max h-full flex flex-col">
            <div className="w-full h-full">
              <span className="w-full h-full text-left font-medium">
                Unit {props.unit.name == "" ? "All" : props.unit.name}
              </span>
            </div>
            <div className="w-full h-full flex flex-row gap-3">
              <span className="w-full h-auto text-[#404040]">Account</span>
              <span
                className="w-full h-auto text-[#404040] cursor-pointer"
                onClick={() => logOff()}
              >
                Log off
              </span>
            </div>
          </div>
          <img
            src={props.userLogged.avatar}
            alt="logged-profile-avatar"
            className="w-auto h-full rounded-full mx-4 "
          />
        </div>
      </nav>
    );
  }

  return <>{props.userLogged._id != "" ? renderNav() : null}</>;
}

const mapStateToProps = (state: any) => ({
  unit: state.unitState,
  userLogged: state.userLogged,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    changeUnit: (unit: Unit) => dispatch(changeUnit(unit)),
    logOffUser: () => dispatch(logOffUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
