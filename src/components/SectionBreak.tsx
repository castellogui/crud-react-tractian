import { MouseEventHandler } from "react";

interface SectionBreakProps {
  action?: boolean;
  actionFunction?: MouseEventHandler<HTMLSpanElement>;
  text: String;
}

export default function SectionBreak(props: SectionBreakProps) {
  return (
    <div className="barrier-container">
      <div className="barrier">
        {props.action ? (
          <span
            onClick={props.actionFunction}
            style={{ cursor: "pointer", marginBottom: "0.5rem" }}
          >
            {props.text}
          </span>
        ) : (
          <span>{props.text}</span>
        )}
      </div>
    </div>
  );
}
