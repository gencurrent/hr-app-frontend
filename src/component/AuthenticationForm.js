import { styled } from "@mui/system";

const AuthenticationForm = styled("form")(
  ({ theme }) => `
    width: 100%;
    marginTop: ${theme.spacing(3)},
  `
);

export default AuthenticationForm;