import { Translate } from "react-redux-i18n";
import { React } from "react";

export default function BottomBar() {
  return (
    <div className="lp-footer footer">
      <div style={{ margin: "auto" }}>
        <Translate value="applicationName" /> © {new Date().getFullYear()}
      </div>
    </div>
  );
}
