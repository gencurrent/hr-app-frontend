/**
 * Page with main statistics and navigation through the HR app
 * For authorized users only.
 */
import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button, Breadcrumbs, Box, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
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

  const Container = (props) => (
    <GeneralContainer
      title={<Translate value="DashBoardPage.title" />}
      breadcrumbs={
        <Breadcrumbs>
          <Typography>
            <Translate value="breadcrumbs.dashboard" />
          </Typography>
        </Breadcrumbs>
      }
    >
      <GlassContainer>{props.children}</GlassContainer>
    </GeneralContainer>
  );
  if (loading) {
    return (
      <Container>
        <Box sx={{ display: "flex" }} justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Box sx={{ display: "flex" }} justifyContent="center">
          <Typography>Error loading data</Typography>
        </Box>
      </Container>
    );
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
    <Container>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography component="h5" variant="h5">
            <Translate value="DashBoardPage.topVacancies" />
          </Typography>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Grid container direction="row" spacing={1}>
                <Grid item>
                  <Link to="/vacancy">
                    <Button variant="text">
                      <Translate value="DashBoardPage.allVacancies" />
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
                  to={`/vacancy/${vacancyStatsItem.id}/application`}
                >
                  <Typography variant="body2">
                    <Translate value="DashBoardPage.lastWeekApplications" />:{" "}
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
            <Translate value="DashBoardPage.applications" />
          </Typography>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <DashboardSubmissionStatisticsChart
                submissionData={submissionCountByDate}
              />
            </Grid>
            <Grid item>
              <Link to="/application?status=new">
                <Button variant="contained" color="secondary">
                  <Translate value="DashBoardPage.newApplications" />: +
                  {submissionCountNew}
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/application">
                <Button>
                  <Translate value="DashBoardPage.totalApplications" />:{" "}
                  {submissionCountTotal}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
