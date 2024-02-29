import { styled } from "@mui/system";

const MainPaper = styled("div")(
  ({ theme }) => `
    marginTop: ${theme.spacing(8)},
    display: flex,
    flexDirection: column,
    alignItems: center,
  `
);

export default MainPaper;