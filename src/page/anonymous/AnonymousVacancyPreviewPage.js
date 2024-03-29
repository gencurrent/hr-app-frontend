/**
 * A Vacancy preview page to inform the candidate about the position
 * It is an entrypoint page to apply for an anonymous visiter
 */

import { useParams } from "react-router-dom";
import { RichTextReadOnly } from "mui-tiptap";
import { Link } from "react-router-dom";
import { Translate } from "react-redux-i18n";
import { useQuery } from "@apollo/client";
import {
  Box,
  Breadcrumbs,
  Button,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import StarterKit from "@tiptap/starter-kit";

import { QUERIES } from "utils/apollo";
import { GeneralContainer } from "component";

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
    <>
      <GeneralContainer
        title={
          <Translate value="AnonymousVacancyApplicationPage.vacancyDescription" />
        }
        breadcrumbs={
          <Breadcrumbs>
            <Translate value="AnonymousVacancyApplicationPage.vacancyDescription" />
          </Breadcrumbs>
        }
      >
        <>
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
            <Paper
              variant="outlined"
              sx={(theme) => ({ padding: theme.spacing(2) })}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    gutterBottom
                  >
                    {vacancyData.vacancy.position}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    component="h1"
                    variant="h6"
                    align="center"
                    gutterBottom
                  >
                    {vacancyData.vacancy.company}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <RichTextReadOnly
                    content={vacancyData.vacancy.text}
                    extensions={[StarterKit]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Link
                      to={{
                        pathname: `/vacancy/${vacancyId}/apply`,
                      }}
                    >
                      <Button variant="contained" styles={{ float: "right" }}>
                        <Translate value="AnonymousVacancyPreviewPage.apply" />
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}
        </>
      </GeneralContainer>
    </>
  );
}
