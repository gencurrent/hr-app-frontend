import React, { useEffect, useState } from "react";
import { Translate } from "react-redux-i18n";
import { Alert, Grid, TextField, Button, Snackbar } from "@mui/material";
import { styled } from "@mui/system";
import { gql } from "@apollo/client";

import { pureApolloClient } from "utils/apollo";

const SubmitButton = styled(Button)(
  ({ theme }) => `margin: ${theme.spacing(3, 0, 2)};`
);

export default function AuthenticationSignInPage(props) {
  useEffect(() => {}, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

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
        // TODO: use redux dispatcher
        const { refreshToken, token } = { ...data.tokenAuth };

        localStorage.setItem("token", token);
        localStorage.setItem("refresh", refreshToken);
        window.location.replace("/");
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
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snackBarOpen}
      onClose={closeSnackBar}
      message="Failed to sign in"
      keys={"Horizontal"}
      severity="error"
    >
      <Alert severity="error" onClose={closeSnackBar}>
      <Translate value="AuthenticationPage.enterValidCredentials" />
      </Alert>
    </Snackbar>
  );

  return (
    <>
      {SnackBarAuthenticationResult}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="email"
            name="email"
            variant="outlined"
            required
            fullWidth
            id="email"
            label={<Translate value="AuthenticationPage.email" />}
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
            label={<Translate value="AuthenticationPage.password" />}
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
            <Translate value="AuthenticationPage.signIn" />
          </SubmitButton>
        </Grid>
      </Grid>
    </>
  );
}
