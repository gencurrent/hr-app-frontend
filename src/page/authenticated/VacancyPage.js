/**
 * The single Vacancy details page
 * Functions:
 * + Display the main info about the Vacancy
 * + Display statistics about the vacancy
 * + Provide actions for the vacancy (duplicate, close)
 */
import { React, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Breadcrumbs, Button, Grid, Typography } from "@mui/material";
import { Translate } from "react-redux-i18n";
import { Delete } from "@mui/icons-material";
import LinkIcon from "@mui/icons-material/Link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import copy from "copy-to-clipboard";

import { authApolloClient, QUERIES, MUTATIONS } from "utils/apollo";
import { datetimeToString } from "utils/date";
import {
  DeleteConfirmationDialog,
  FieldRequiredLabel,
  FieldTypeLabel,
  GeneralContainer,
  GlassContainer,
} from "component";

/**
 * The Vacancy Page hook
 * @param {} props
 * @returns
 */
function VacancyPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const { id: vacancyId } = params;
  const { loading, error, data } = useQuery(QUERIES.VACANCY, {
    variables: {
      id: vacancyId,
    },
  });

  function onCopyLink(e) {
    const loc = window.location;
    const url = `${loc.protocol}//${loc.host}/vacancy/${data.vacancy.id}/preview`;
    copy(url);
  }

  function onVacandyDeleteDialogConfirmed() {
    authApolloClient
      .mutate({
        mutation: MUTATIONS.DELETE_VACANCY,
        variables: { id: data.vacancy.id },
      })
      .then((response) => {
        setConfirmDialogOpen(false);
        navigate("/vacancy");
      });
  }

  let fields = data?.vacancy?.fields ? JSON.parse(data.vacancy.fields) : [];

  return (
    <>
      {loading && <Typography>Loading</Typography>}
      {error && <Typography>Error</Typography>}
      {data && (
        <GeneralContainer
          title={data.vacancy.position}
          breadcrumbs={
            <Breadcrumbs>
              <Link to="/">
                <Translate value="breadcrumbs.dashboard" />
              </Link>
              <Link to="/vacancy">
                <Translate value="breadcrumbs.vacancies" />
              </Link>
              <Typography>{data.vacancy.position}</Typography>
            </Breadcrumbs>
          }
        >
          <GlassContainer>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item display="flex" alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={onCopyLink}
                      color="info"
                    >
                      <LinkIcon />
                      <Translate value="VacancyPage.URL" />
                    </Button>
                  </Grid>
                  <Grid item display="flex" alignItems="center">
                    <Link to={`/vacancy/${data.vacancy.id}/preview`}>
                      <Button variant="outlined" size="small" color="success">
                        <CheckCircleOutlineIcon />
                        <Translate value="VacancyPage.apply" />
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item display="flex" alignItems="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setConfirmDialogOpen(true)}
                      size="small"
                    >
                      <Delete />
                      <Translate value="VacancyPage.delete" />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Link to={`/vacancy/${vacancyId}/application`}>
                  <Button variant="text" sx={{ textDecoration: "underline" }}>
                    <Translate value="VacancyPage.applications" />
                  </Button>
                </Link>
              </Grid>

              {/* Vacancy name, company, date, description */}
              <Grid item>
                <Grid item>
                  <Typography variant="h6">
                    <Translate value="VacancyPage.vacancyData" />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="span">
                    <Translate value="VacancyPage.name" />
                    {": "}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "800 !important" }}
                    component="span"
                  >
                    {data.vacancy.position}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="span">
                    <Translate value="VacancyPage.company" />
                    {": "}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "800 !important" }}
                    component="span"
                  >
                    {data.vacancy.company}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="span">
                    <Translate value="VacancyPage.created" />
                    {": "}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "800 !important" }}
                    component="span"
                  >
                    {datetimeToString(new Date(data.vacancy.ts))}
                  </Typography>
                </Grid>
              </Grid>

              {/* Vacancy custom fields */}
              <Grid item>
                <Grid container spacing={1}>
                  {fields.length > 0 && (
                    <>
                      <Grid item>
                        <Typography variant="h6">
                          <Translate value="VacancyPage.additionalFields" />
                        </Typography>
                      </Grid>
                      {fields.map((field, idx) => {
                        return (
                          <Grid item xs={12} key={[idx, field.q]}>
                            <Grid
                              container
                              direction={"column"}
                              spacing={0}
                              columnGap={0}
                            >
                              <Grid item>
                                <Typography
                                  sx={{ fontWeight: "800 !important" }}
                                  component="span"
                                >
                                  {`#${idx + 1}. `}
                                </Typography>
                                <Typography
                                  // sx={{ fontWeight: "800 !important" }}
                                  component="span"
                                >
                                  {field.q}
                                </Typography>
                              </Grid>
                              <Grid display="flex" alignItems={"center"}>
                                <br />
                                {<FieldTypeLabel type={field.t} />}
                                {field.r ? <FieldRequiredLabel /> : ""}
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </GlassContainer>

          <DeleteConfirmationDialog
            title={`Delete vacancy "${data.vacancy.position}"`}
            open={confirmDialogOpen}
            vacancyId={data.vacancy.id}
            onClose={() => setConfirmDialogOpen(false)}
            onConfirm={onVacandyDeleteDialogConfirmed}
          >
            Do you want to delete the vacancy "{data.vacancy.position}" in "
            {data.vacancy.company}"?
          </DeleteConfirmationDialog>
        </GeneralContainer>
      )}
    </>
  );
}

export default VacancyPage;
