import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

import { gql } from "@apollo/client";

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

export default function AuthenticationSignInPage() {
  useEffect(() => {
    console.log("AuthenticationSignInPage");
  }, []);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const snackBarSettings = {
    vertical: "bottom",
    horizontal: "left",
  };
  function openSnackBar() {
    setSnackBarOpen(true);
  }
  function closeSnackBar() {
    setSnackBarOpen(false);
  }

  const hanldeSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: email,
      password: password,
    };
    pureApolloClient
      .query({
        query: gql`
          query TokenAuth($username: String!, $password: String!) {
            tokenAuth(username: $username, password: $password) {
              token
              refreshToken
            }
          }
        `,
        variables: { ...data },
      })
      .then(({ loading, data }) => {
        const { refreshToken, token } = { ...data.tokenAuth };

        localStorage.setItem("token", token);
        localStorage.setItem("refresh", refreshToken);
        navigate("/");
      })
      .catch((error) => {
        if (error.message === "Please enter valid credentials") {
          openSnackBar();
          setTimeout(() => {
            closeSnackBar();
          }, 4000);
        }
      });
  };
  const onEditEmail = (e) => {
    setEmail(e.target.value);
  };
  const onEditPassword = (e) => {
    setPassword(e.target.value);
  };

  const SnackBarAuthenticationResult = (
    <Snackbar
      anchorOrigin={snackBarSettings}
      open={snackBarOpen}
      onClose={closeSnackBar}
      message="Failed to sign in"
      keys={"Horizontal"}
      severity="error"
    >
      <Alert severity="error" onClose={closeSnackBar}>
        Authentication failed
      </Alert>
    </Snackbar>
  );

  return (
    <MainPaper>
      {SnackBarAuthenticationResult}
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <AuthenticationForm noValidate>
        <Grid container spacing={2}>
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
              Sign In
            </SubmitButton>
          </Grid>
        </Grid>
      </AuthenticationForm>
    </MainPaper>
  );
}
