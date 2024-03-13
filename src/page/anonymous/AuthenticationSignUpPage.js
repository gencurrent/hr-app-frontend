import { useState } from "react";
import { Translate } from "react-redux-i18n";
import { styled } from "@mui/system";
import { Alert, Grid, Snackbar, TextField, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { MUTATIONS, QUERIES } from "utils/apollo";
import { pureApolloClient } from "utils/apollo/AppApolloClient";

const SubmitButton = styled(Button)(
  ({ theme }) => `margin: ${theme.spacing(3, 0, 2)};`
);

export default function AuthenticationSignUpPage(props) {
  const [snackBarError, setSnackBarError] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  let [registerMutation] = useMutation(MUTATIONS.REGISTER);

  function hanldeSubmit(e) {
    e.preventDefault();
    registerMutation({
      variables: {
        firstName: fname,
        lastName: lname,
        email: email,
        password: password,
      },
    })
      .then((response) => {
        console.log("Data", response);
        let created = response.data.register.created;
        if (created === true) {
        }
        console.log("created", created);

        // Login the user
        pureApolloClient
          .query({
            query: QUERIES.TOKEN_AUTH,
            variables: { username: email, password: password },
          })
          .then(({ loading, data }) => {
            // TODO: use redux dispatcher
            const { refreshToken, token } = { ...data.tokenAuth };

            localStorage.setItem("token", token);
            localStorage.setItem("refresh", refreshToken);
            window.location.replace("/");
          })
          .catch((error) => {
            console.error(`Unexpected error`, error);
            console.error(error.message);
          });
      })
      .catch((error) => {
        let message = error.graphQLErrors[0].message;

        setSnackBarError(message);
        setSnackBarOpen(true);
      });
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackBarOpen}
        onClose={() => setSnackBarOpen(false)}
        message="Failed to sign in"
        severity="error"
      >
        <Alert severity="error" onClose={() => setSnackBarOpen(false)}>
          {snackBarError}
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            name="firstname"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label={<Translate value="AuthenticationPage.firstName" />}
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
            label={<Translate value="AuthenticationPage.lastName" />}
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
            <Translate value="AuthenticationPage.signUp" />
          </SubmitButton>
        </Grid>
      </Grid>
    </>
  );
}
