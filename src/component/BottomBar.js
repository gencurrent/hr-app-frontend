import { React } from "react";

export default function BottomBar() {
  return (
    <div className="lp-footer footer">
      <div style={{ margin: "auto" }}>
        Staffence © {new Date().getFullYear()}
      </div>
    </div>
  );
}
