/**
 * A Vacancy preview page to inform the candidate about the position
 * It is an entrypoint page to apply for an anonymous visiter
 */

import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERIES } from "utils/apollo";
import GeneralContainer from "component/GenaralContainer";

export default function AnonymousVacancyPreviewPage() {
  const params = useParams();
  const vacancyId = params.id;
  const {
    loading,
    error,
    data: vacancyData,
  } = useQuery(QUERIES.VACANCY, {
    variables: {
      id: vacancyId,
      forSubmission: false,
    },
  });
  return (
    <GeneralContainer>
      {error && (
        <Typography component="h1" variant="h4">
          Error on loading the vacancy data...
        </Typography>
      )}
      {loading && (
        <Typography component="h1" variant="h4">
          Loading...
        </Typography>
      )}
      {vacancyData && (
        <Paper variant="elevation">
          <Grid container sx={{ p: 4 }}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h4" textAlign="center">
                {vacancyData.vacancy.position}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" textAlign="center">
                {vacancyData.vacancy.company}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ whiteSpace: "pre-line" }} paragraph={true}>
                {vacancyData.vacancy.text}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  to={{
                    pathname: `/vacancy/${vacancyId}/apply`,
                  }}
                >
                  <Button variant="contained" styles={{ float: "right" }}>
                    Apply
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </GeneralContainer>
  );
}