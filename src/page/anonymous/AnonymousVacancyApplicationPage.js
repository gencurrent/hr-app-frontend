/**
 * AnonymousVacancyApplicationPage — the
 */

import { React, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Translate, I18n } from "react-redux-i18n";
import { useQuery } from "@apollo/client";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { pureApolloClient, MUTATIONS, QUERIES } from "utils/apollo";
import VacancyApplicationFieldItem from "component/VacancyApplicationFieldItem";
import FileUploadField from "component/FileUploadField";
import GeneralContainer from "component/GenaralContainer";

export default function AnonymousVacancyApplicationPage() {
  const params = useParams();
  const navigate = useNavigate();
  const vacancyId = params.id;

  const [formError, setFormError] = useState("");
  // Fetched data
  const {
    loading,
    error,
    data: vacancyData,
  } = useQuery(QUERIES.VACANCY, {
    variables: { id: vacancyId, forSubmission: true },
  });
  const vacancyFields =
    vacancyData && vacancyData.vacancy
      ? JSON.parse(vacancyData.vacancy.fields)
      : [];

  // Fields
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState("");
  const [answers, setAnswers] = useState({});

  /**
   * Submit answers from the application form
   * @param {Event} e An event object
   * @return {null}
   */
  const submitAnswers = (e) => {
    let answersDict = {};
    vacancyFields.forEach((field) => {
      answersDict[field.q] = null;
    });
    answersDict = { ...answersDict, ...answers };

    let answersArray = Object.keys(answersDict).map((key) => ({
      q: key,
      a: answersDict[key],
    }));

    const submissionData = {
      vacancyId: vacancyId,
      fullname: fullname,
      email: email,
      phone: phone,
      resume: resume,
      answers: JSON.stringify(answersArray),
    };
    pureApolloClient
      .mutate({
        mutation: MUTATIONS.CREATE_SUBMISSION,
        variables: submissionData,
      })
      .then((result) => {
        if (result && result.data && result.data.createSubmission) {
          navigate(`/vacancy/${vacancyId}/applied`);
        }
      })
      .catch((error) => {
        const message = error.message;
        if (message === "The email is invalid") {
          setFormError("*The email is invalid");
        } else if (message === "The phone number is invalid") {
          setFormError("*The phone number is invalid");
        } else {
          setFormError("*Please, check all the fields");
        }
      });
  };

  const editData = (key, value) => {
    const answersData = { ...answers };
    answersData[key] = value;
    setAnswers(answersData);
  };

  const onResumeFieldUpdated = (value) => {
    setResume(value);
  };

  return (
    <>
      {loading && <div>Loading</div>}
      {error && <div>Error</div>}
      {vacancyData && (
        <GeneralContainer
          sx={{ py: 4 }}
          title={
            <Translate value="AnonymousVacancyApplicationPage.applyToVacancy" />
          }
          breadcrumbs={
            <Breadcrumbs>
              <Link to={`/vacancy/${vacancyId}/preview`}>
                <Translate value="AnonymousVacancyApplicationPage.vacancyDescription" />
              </Link>
              <Typography>
                <Translate value="AnonymousVacancyApplicationPage.apply" />
              </Typography>
            </Breadcrumbs>
          }
        >
          <Paper
            variant="outlined"
            sx={(theme) => ({ padding: theme.spacing(2) })}
          >
            <Typography variant="h5" align="center" gutterBottom>
              {vacancyData.vacancy.position}
            </Typography>
            {/* Should we use Stepper ? */}

            <Grid container direction="column">
              <Grid item xs={12}>
                <Typography variant="h6" align={"center"} gutterBottom>
                  {vacancyData.vacancy.company}
                </Typography>
              </Grid>

              <Grid item>
                <FormControl fullWidth={true} variant="outlined">
                  <TextField
                    onChange={(e) => setFullname(e.target.value)}
                    label={I18n.t("AnonymousVacancyApplicationPage.fullName")}
                    name="name"
                    id="name"
                    required
                    helperText={I18n.t(
                      "AnonymousVacancyApplicationPage.required"
                    )}
                    margin="normal"
                    autoComplete="name"
                    fullWidth
                  />
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    label={I18n.t("AnonymousVacancyApplicationPage.email")}
                    name="email"
                    id="email"
                    required
                    helperText={I18n.t(
                      "AnonymousVacancyApplicationPage.required"
                    )}
                    margin="normal"
                    autoComplete="email"
                    fullWidth
                  />
                  <TextField
                    label={I18n.t("AnonymousVacancyApplicationPage.phone")}
                    name="phone"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    margin="normal"
                    autoComplete="phone"
                    fullWidth
                  />
                  <FileUploadField
                    fieldRequired={true}
                    callBack={onResumeFieldUpdated}
                    vacancy={vacancyData.vacancy}
                    fieldText={I18n.t("AnonymousVacancyApplicationPage.resume")}
                  />
                </FormControl>
                <FormControl fullWidth={true} variant="outlined">
                  {vacancyFields.map((field, idx) => (
                    <VacancyApplicationFieldItem
                      key={idx}
                      valueUpdateCallback={editData}
                      field={field}
                      vacancy={vacancyData.vacancy}
                    />
                  ))}
                </FormControl>
              </Grid>
              <Grid item>
                <Typography>{formError}</Typography>
              </Grid>
              <Grid item>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={submitAnswers}
                    variant="contained"
                    color="primary"
                  >
                    <Translate value="AnonymousVacancyApplicationPage.submit" />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </GeneralContainer>
      )}
    </>
  );
}
