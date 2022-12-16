import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import { Dropdown, MenuProps, Space } from "antd";
import { connect } from "react-redux";
import { changeUnit } from "../store/actions";
import { Unit } from "../interfaces/models/unit.interface";

import units from "../assets/units.json";

interface NavbarProps {
  changeUnit: any;
  unit: any;
  openSidebarFunction: Function;
}

function Navbar(props: NavbarProps) {
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
            <span className="w-full h-full text-left font-medium">Unidade Mooca</span>
          </div>
          <div className="w-full h-full flex flex-row gap-3">
            <span className="w-full h-auto text-[#404040]">Account</span>
            <span className="w-full h-auto text-[#404040]">Log off</span>
          </div>
        </div>
        <img
          src="https://cdn.lorem.space/images/face/.cache/200x200/charles-etoroma-95UF6LXe-Lo-unsplash.jpg"
          alt="logged-profile-avatar"
          className="w-auto h-full rounded-full mx-4 "
        />
      </div>
    </nav>
  );
}

const mapStateToProps = (state: any) => ({ unit: state.unitState });
const mapDispatchToProps = (dispatch: any) => {
  return {
    changeUnit: (unit: Unit) => dispatch(changeUnit(unit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
