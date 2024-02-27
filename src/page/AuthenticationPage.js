import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/system";

import { pureApolloClient } from "utils/apollo";

const TabButton = styled(Button)(
  // ({ theme }) => `& [aria-selected="false"]: ${theme.palette.text.secondary}`
  ({ theme }) => ``
);

const MainPaper = styled("div")(
  ({ theme }) => `
    marginTop: ${theme.spacing(8)},
    display: flex,
    flexDirection: column,
    alignItems: center,
  `
);

const AuthenticationForm = styled("form")(
  ({ theme }) => `
    width: 100%;
    marginTop: ${theme.spacing(3)},
  `
);

const SubmitButton = styled(Button)(
  ({ theme }) => `margin: ${theme.spacing(3, 0, 2)};`
);

const SignUp = () => {
  useEffect(() => {});

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hanldeSubmit = (e) => {
    e.preventDefault();
  };
  const onEditFname = (e) => {
    setFname(e.target.value);
  };
  const onEditLname = (e) => {
    setLname(e.target.value);
  };
  const onEditEmail = (e) => {
    setEmail(e.target.value);
  };
  const onEditPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <MainPaper>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>

      <AuthenticationForm noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              name="firstname"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoComplete="fname"
              value={fname}
              onChange={onEditFname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastname"
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              autoComplete="lname"
              value={lname}
              onChange={onEditLname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              value={email}
              onChange={onEditEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              variant="outlined"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={onEditPassword}
            />
          </Grid>

          <Grid item xs={12}>
            <SubmitButton
              type="submit"
              onClick={hanldeSubmit}
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </SubmitButton>
          </Grid>
        </Grid>
      </AuthenticationForm>
    </MainPaper>
  );
};

const AuthenticationPage = (props) => {
  console.log("Authentication page");
  let navigate = useNavigate();
  let { pathname } = useLocation();
  let urlMap = ["/signin", "/signup"];
  // Change default value
  let [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (e, newValue) => {
    navigate(`${pathname}${urlMap[newValue]}`);
    setCurrentTab(newValue);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper square>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="disabled tabs example"
          centered
        >
          <TabButton label="Sign In" component="h1" />
          <TabButton label="Sign Up" component="h1" />
        </Tabs>
      </Paper>
      <Outlet />
    </Container>
  );
};

export default AuthenticationPage;
