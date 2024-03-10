/**
 * Page with main statistics and navigation through Staffence.
 * For authorized users only.
 */
import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Button,
  Breadcrumbs,
  Grid,
  Card,
  Typography,
  CardContent,
} from "@mui/material";
import { Translate } from "react-redux-i18n";

import {
  DashboardSubmissionStatisticsChart,
  GeneralContainer,
  GlassContainer,
} from "component";
import { QUERIES } from "utils/apollo";

export default function DashboardPage() {
  const { data, loading, error } = useQuery(QUERIES.USER_MAIN_STATS, {
    fetchPolicy: "no-cache",
  });

  if (loading) {
    return <div> Loading...</div>;
  }
  if (error) {
    return <div> Error...</div>;
  }
  const { userMainStatistics } = data;
  const {
    submissionCountTotal,
    submissionCountByDate,
    submissionCountNew,
    vacancyStatsList,
  } = userMainStatistics;
  vacancyStatsList.sort(
    (a, b) => b.submissionCountTotal - a.submissionCountTotal
  );
  return (
    <GeneralContainer
      title={<Translate value="mainStatistics.title" />}
      breadcrumbs={
        <Breadcrumbs>
          <Typography>
            <Translate value="breadcrumbs.dashboard" />
          </Typography>
        </Breadcrumbs>
      }
    >
      <GlassContainer>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography component="h5" variant="h5">
              <Translate value="mainStatistics.topVacancies" />
            </Typography>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid container direction="row" spacing={1}>
                  <Grid item>
                    <Link to="/vacancy">
                      <Button variant="text">
                        <Translate value="mainStatistics.allVacancies" />
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/vacancy/create">
                      <Button variant="contained">
                        <Translate value="DashBoardPage.newVacancy" />
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>

              {vacancyStatsList.map((vacancyStatsItem) => (
                <Grid item key={vacancyStatsItem.id}>
                  <Link
                    className="link-undecorated"
                    to={`/vacancy/${vacancyStatsItem.id}`}
                  >
                    <Typography variant="h6">
                      {vacancyStatsItem.position}
                    </Typography>
                  </Link>
                  <Link
                    className="link-undecorated"
                    to={`/vacancy/${vacancyStatsItem.id}/submission`}
                  >
                    <Typography variant="body2">
                      <Translate value="mainStatistics.lastWeekSubmissions" />:{" "}
                      {vacancyStatsItem.submissionCountTotal} (+
                      {vacancyStatsItem.submissionCountNew})
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item>
            <Typography component="h5" variant="h5">
              <Translate value="mainStatistics.submissions" />
            </Typography>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <DashboardSubmissionStatisticsChart
                  submissionData={submissionCountByDate}
                />
              </Grid>
              <Grid item>
                <Link to="/submission?status=new">
                  <Button variant="contained" color="secondary">
                    <Translate value="mainStatistics.newSubmissions" />: +
                    {submissionCountNew}
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/submission">
                  <Button>
                    <Translate value="mainStatistics.totalSubmissions" />:{" "}
                    {submissionCountTotal}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </GlassContainer>
    </GeneralContainer>
  );
}
