import { Container } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => {
  const lightThemeShadow =
    "0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)";
  const darkThemeShadow =
    "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)";
  return `
      background-color: rgba(256, 256, 256, 0.4);
      box-shadow: ${theme === "light" ? lightThemeShadow : darkThemeShadow};
      border-radius: 16px;
      // box-shadow: shado
    `;
});

export default function GlassContainer(props) {
  return <StyledContainer maxWidth="lg">{props.children}</StyledContainer>;
}
