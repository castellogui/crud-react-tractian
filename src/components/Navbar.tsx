import { MenuOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import { Dropdown, MenuProps, Space } from "antd";

const items: MenuProps["items"] = [
  {
    label: "1st menu item",
    key: "1124124124",
  },
  {
    label: "2nd menu item",
    key: "2",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const handleMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

const menuProps = {
  items,
  onClick: handleMenuClick,
};

interface NavbarProps {
  openSidebarFunction: Function;
}

export default function Navbar(props: NavbarProps) {
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
