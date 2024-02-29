import { useState } from "react";
import { ThemeProvider } from "@mui/material";

import { useDispatch } from "react-redux";

import { lightTheme, darkTheme } from "utils/material/theme";

export default function LocalStorageThemeProvider(props) {
  let [theme, setTheme] = useState(lightTheme);
  let disptach = useDispatch();
  
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
