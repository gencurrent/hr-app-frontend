import { React } from "react";
import { Typography } from "@mui/material";
import { GeneralContainer } from "component";

export default function AnonymousVacancyAppliedPage() {
  return (
    <GeneralContainer sx={{ py: 4 }}>
      <Typography component="h1" variant="h4" align="center">
        You have applied successfully
      </Typography>
      <Typography align="center">
        We have recieved your application and the company should review the
        answers soon
      </Typography>
    </GeneralContainer>
  );
}
