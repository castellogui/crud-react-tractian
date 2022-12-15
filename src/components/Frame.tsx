import "../components/Frame/Frame.css";

interface FrameProps {
  children?: JSX.Element;
  height: "half-screen" | "full-screen";
  width: Number;
}

const sizesH = {
  "half-screen": "16rem",
  "full-screen": "34rem",
};

export default function Frame(props: FrameProps) {
  return (
    <div
      {...props}
      style={{
        boxShadow: "0 0 20px 8px #d0d0d0",
        height: sizesH[props.height],
        width: `${props.width}%`,
      }}
      className="relative my-4 mx-4 rounded-lg max-h-[calc(100vh-8rem)] inline-block py-6 px-4 overflow-hidden box-border"
    >
      <div className="w-full h-5 bg-[#245ce4] rounded-t-[0.5rem] absolute top-0 left-0"></div>
      {props.children}
    </div>
  );
}
