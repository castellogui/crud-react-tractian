import { MenuOutlined } from "@ant-design/icons";

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
      <div className="w-max h-12 flex flex-row text-center ">
        <div className="w-max h-full flex flex-col">
          <div className="w-full h-full">
            <span className="w-full h-full text-left font-medium">Unidade Mooca</span>
          </div>
          <div className="w-full h-full flex flex-row">
            <span className="w-full h-auto text-[#404040]">Conta</span>
            <span className="w-full h-auto text-[#404040]">Sair</span>
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
