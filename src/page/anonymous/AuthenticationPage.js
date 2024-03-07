import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Paper, Tabs, Tab, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

import GeneralContainer from "component/GenaralContainer";
import FloatingPaper from "component/FloatingPaper";

const AuthenticationForm = styled("form")(
  ({ theme }) => `
    width: 100%;
    marginTop: ${theme.spacing(3)},
  `
);

const AuthenticationPage = (props) => {
  let navigate = useNavigate();
  let urlMap = ["signin", "signup"];
  let methodMap = ["Sign In", "Sign Up"];
  // Change default value
  let [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (e, newValue) => {
    navigate(`/auth/${urlMap[newValue]}`);
    setCurrentTab(newValue);
  };
  return (
    <GeneralContainer maxWidth="xs">
      <Paper square>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="disabled tabs example"
          centered
        >
          <Tab label="Sign In" component="h1" />
          <Tab label="Sign Up" component="h1" />
        </Tabs>
      </Paper>

      <FloatingPaper>
        <Box py={2}>
          <Typography component="h1" variant="h5">
            {methodMap[currentTab]}
          </Typography>
        </Box>
        <AuthenticationForm noValidate>
          <Outlet />
          {props.children}
        </AuthenticationForm>
      </FloatingPaper>
    </GeneralContainer>
  );
};

export default AuthenticationPage;
