import { Palette } from "@mui/icons-material";
import { createTheme } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import createTypography from "@mui/material/styles/createTypography";

const primary = "#7C9DC4";
const secondary = "#DCE6F1";
const error = "#CE7D7D";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      // primary: grey.A700,
      primary: "#202020",
      secondary: grey.A400,
      mainbar: grey[50],
    },
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
      secondary: grey[200],
    },
    background: {
      default: grey[50],
    },
    error: {
      main: error,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: grey[50],
      secondary: grey[50],
      mainbar: grey[50],
    },
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: grey[50],
    },
    background: {
      default: grey.A700,
    },
  },
});

export { lightTheme, darkTheme };
