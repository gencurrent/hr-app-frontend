import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";


import FloatingPaper from "component/FloatingPaper";
import AuthenticationForm from "component/AuthenticationForm";

const SubmitButton = styled(Button)(
  ({ theme }) => `margin: ${theme.spacing(3, 0, 2)};`
);



export default function AuthenticationSignUpPage(props) {
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
  );
};