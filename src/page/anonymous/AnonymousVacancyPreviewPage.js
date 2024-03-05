/**
 * A Vacancy preview page to inform the candidate about the position
 * It is an entrypoint page to apply for an anonymous visiter
 */

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Translate, I18n } from "react-redux-i18n";

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
      <Typography variant="h4" component="h1" gutterBottom>
        <Translate value="AnonymousVacancySubmissionPage.vacancyDescription" />
      </Typography>
      <Breadcrumbs>
        <Translate value="AnonymousVacancySubmissionPage.vacancyDescription" />
      </Breadcrumbs>
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
        <Card variant="outlined">
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
        </Card>
      )}
    </GeneralContainer>
  );
}
