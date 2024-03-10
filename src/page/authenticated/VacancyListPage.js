import { React, useState } from "react";
import { useQuery } from "@apollo/client";
import { Button, Breadcrumbs, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Translate } from "react-redux-i18n";

import {
  DeleteConfirmationDialog,
  GeneralContainer,
  GlassContainer,
  VacancyListItem,
} from "component";
import { authApolloClient, MUTATIONS, QUERIES } from "utils/apollo";

export default function VacancyListPage() {
  // DeleteConfirmationDialog is open
  let [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  // Current Vacancy this component is working with
  let [currentVacancy, setCurrentVacancy] = useState({});
  let { loading, error, data, refetch } = useQuery(QUERIES.VACANCY_LIST, {
    fetchPolicy: "no-cache",
  });
  if (loading) return "Loading";
  if (error) return "Error";

  function onVacancyDelete(vacancyId) {
    setCurrentVacancy(data.vacancyList.find((el) => el.id === vacancyId));
    setConfirmDialogOpen(true);
  }

  function onVacandyDeleteDialogConfirmed() {
    authApolloClient
      .mutate({
        mutation: MUTATIONS.DELETE_VACANCY,
        variables: { vacancyId: currentVacancy.id },
      })
      .then((response) => {
        setConfirmDialogOpen(false);
        refetch();
      });
  }

  return (
    <>
      <GeneralContainer
        title={<Translate value="VacancyListPage.title" />}
        breadcrumbs={
          <Breadcrumbs>
            <Link to="/">
              <Translate value="breadcrumbs.dashboard" />
            </Link>
            <Translate value="breadcrumbs.vacancies" />
          </Breadcrumbs>
        }
      >
        <GlassContainer>
          <Grid container direction="column">
            <Grid item>
              <Link to="/vacancy/create">
                <Button variant="contained" color="primary">
                  <Translate value="VacancyListPage.newVacancy" />
                </Button>
              </Link>
            </Grid>
            {data.vacancyList.map((vacancy, idx) => (
              <Grid item key={vacancy.id}>
                <VacancyListItem onDelete={onVacancyDelete} vacancy={vacancy} />
              </Grid>
            ))}
          </Grid>
          <DeleteConfirmationDialog
            title={`Delete vacancy "${currentVacancy.position}"`}
            open={confirmDialogOpen}
            vacancyId={currentVacancy.id}
            onClose={() => setConfirmDialogOpen(false)}
            onConfirm={onVacandyDeleteDialogConfirmed}
          >
            Do you want to delete the vacancy "{currentVacancy.position}" in "
            {currentVacancy.company}"?
          </DeleteConfirmationDialog>
        </GlassContainer>
      </GeneralContainer>
    </>
  );
}
