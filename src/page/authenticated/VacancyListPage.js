import { React, useState } from "react";
import { useQuery } from "@apollo/client";
import { Button, Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import {
  DeleteConfirmationDialog,
  GeneralContainer,
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
        title="Vacancies"
        breadcrumbs={
          <Breadcrumbs>
            <Link to="/">Dashboard</Link>
            <Typography>Vacancies</Typography>
          </Breadcrumbs>
        }
      >
        <Link to="/vacancy/create">
          <Button variant="contained" color="primary">
            New vacancy
          </Button>
        </Link>
        {data.vacancyList.map((vacancy, idx) => (
          <div key={idx}>
            <VacancyListItem onDelete={onVacancyDelete} vacancy={vacancy} />
          </div>
        ))}
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
      </GeneralContainer>
    </>
  );
}
