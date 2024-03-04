import { React } from "react";
import { Typography } from "@mui/material";
import { Translate } from "react-redux-i18n";
import { GeneralContainer } from "component";

export default function AnonymousVacancyAppliedPage() {
  return (
    <GeneralContainer sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        <Translate value="AnonymousVacancyAppliedPage.appliedSuccessfully" />🎉
      </Typography>

      <Typography align="center">
        The recruiter has recieved your application and the company should review the
        answers soon
      </Typography>
    </GeneralContainer>
  );
}
