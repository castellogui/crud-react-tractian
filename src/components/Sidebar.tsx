import tractianLogo from "../assets/tractian-logo.svg";
import {
  HomeFilled,
  LayoutFilled,
  DatabaseFilled,
  ContactsFilled,
  AppstoreFilled,
  SwitcherFilled,
  FireFilled,
  BookFilled,
} from "@ant-design/icons";
import { Drawer, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "../components/Sidebar/Sidebar.css";

interface SidebarProps {
  visible: boolean;
  callbackClose: Function;
}

export default function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  return (
    <Drawer
      open={props.visible}
      closable={false}
      onClose={() => {
        props.callbackClose(false);
      }}
      placement="left"
      drawerStyle={{
        background: "linear-gradient(90deg, rgba(30,59,140,1) 0%, rgba(37,98,233,1) 100%)",
      }}
      bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <img
        src={tractianLogo}
        className="w-[60%] mx-auto mb-7 block cursor-pointer"
        onClick={() => {
          navigate("/home");
        }}
      ></img>
      <Menu
        style={{ fontFamily: "Poppins,sans-serif", borderInlineEnd: "0" }}
        className="bg-transparent text-white text-base font-semibold "
        mode="inline"
        onClick={({ key }) => {
          navigate(key);
        }}
        items={[
          {
            label: "Home",
            key: "/home",
            icon: <HomeFilled></HomeFilled>,
          },
          {
            label: "Companies",
            key: "/companies",
            icon: <LayoutFilled></LayoutFilled>,
          },
          {
            label: "Units",
            key: "/units",
            icon: <DatabaseFilled></DatabaseFilled>,
          },
          {
            label: "Users",
            key: "/users",
            icon: <ContactsFilled></ContactsFilled>,
          },
          {
            label: "Assets",
            key: "/assets",
            icon: <AppstoreFilled></AppstoreFilled>,
          },
          {
            label: "About",
            key: "about",
            icon: <SwitcherFilled></SwitcherFilled>,
            children: [
              {
                label: "Challenge",
                key: "/challenge",
                icon: <FireFilled></FireFilled>,
              },
              {
                label: "Me",
                key: "/me",
                icon: <BookFilled></BookFilled>,
              },
            ],
          },
        ]}
      ></Menu>
    </Drawer>
  );
}
