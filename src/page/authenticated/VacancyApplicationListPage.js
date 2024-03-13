/**
 * Submissions list to the related Vacancy
 */

import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Translate } from "react-redux-i18n";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Breadcrumbs,
  Divider,
  Fade,
  Grid,
  Link as MUILink,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";

import {
  GeneralContainer,
  GlassContainer,
  ApplicationListItemAnswer,
} from "component";
import { datetimeToString } from "utils/date";
import { QUERIES } from "utils/apollo";
import { GoogleCloudStorageClient } from "utils/cloudStorage";

function SubmissionItem(props) {
  const { submission, singleVacancySusbmissions, vacancyId } = props;
  let { vacancyData } = props;
  let ts = new Date(submission.ts);
  // const tsString = new RegExp("(?P=<year>\d{4})\-(?P=<month>\d{2})\-(?P=<day>\d{2})");\
  const tsString = datetimeToString(ts);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /**
   *
   * @param {Event} e
   */

  const fieldList = [
    {
      field: "fullname",
    },
    {
      field: "email",
    },
    {
      field: "phone",
    },
    {
      field: "resume",
    },
  ];

  function FieldItemsGrid(props) {
    const { submission } = props;
    const cloudStorageClient = new GoogleCloudStorageClient();
    return (
      <Grid container spacing={0.5}>
        {fieldList.map((field) => (
          <Grid key={field.field} style={{ margin: "0px 0" }} item xs={12}>
            {field.field === "resume" && (
              <MUILink
                target="_blank"
                download
                href={cloudStorageClient.getFileUrl(submission.resume)}
              >
                <Button variant="outlined" color="primary">
                  <DownloadIcon />
                  <Translate value="VacancyApplicationListPage.resume" />
                </Button>
              </MUILink>
            )}
            {field.field === "fullname" && (
              <>
                <Typography component="span">
                  <Translate value="VacancyApplicationListPage.name" />:{" "}
                </Typography>
                <Typography
                  key={field.field}
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: "600" }}
                >
                  {submission[field.field]}
                </Typography>
              </>
            )}
            {field.field === "email" && (
              <>
                <Typography component="span">
                  <Translate value="VacancyApplicationListPage.email" />:{" "}
                </Typography>
                <Typography
                  key={field.field}
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: "600" }}
                >
                  {submission[field.field]}
                </Typography>
              </>
            )}
            {field.field === "phone" && (
              <>
                <Typography component="span">
                  <Translate value="VacancyApplicationListPage.phone" />:{" "}
                </Typography>
                <Typography
                  key={field.field}
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: "600" }}
                >
                  {submission[field.field]}
                </Typography>
              </>
            )}
          </Grid>
        ))}
      </Grid>
    );
  }

  vacancyData = submission.vacancy || vacancyData;

  return (
    <>
      {singleVacancySusbmissions && (
        <Typography variant="h6">
          <Translate value="VacancyApplicationListPage.application" />{" "}
          {tsString}
        </Typography>
      )}
      {!singleVacancySusbmissions && (
        <Typography variant="h6">
          <Link className="link-undecorated" to={`/vacancy/${vacancyId}`}>
            {vacancyData.position}
          </Link>{" "}
          @ {vacancyData.company} on {tsString}
        </Typography>
      )}

      <Grid container justifyContent="space-between">
        <Grid item>
          <FieldItemsGrid submission={submission} />
        </Grid>
        <Grid item>
          <Typography component="span">
            <Translate value="VacancyApplicationListPage.appliedDate" />:{" "}
          </Typography>{" "}
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "600" }}
          >
            {tsString}
          </Typography>
        </Grid>
      </Grid>

      {/* <Grid item display="flex" alignItems="center"> */}
      <Accordion
        expanded={expanded}
        onChange={handleExpandClick}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
          "& .MuiAccordionDetails-root": {
            display: expanded ? "block" : "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            <Translate value="VacancyApplicationListPage.submittedForm" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {JSON.parse(submission.answers).map((answer, idx) => (
            <ApplicationListItemAnswer
              idx={idx}
              key={answer.q}
              answer={answer}
              vacancy={vacancyData}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      {/* </Grid> */}
    </>
  );
}

function VacancyApplicationListPage(props) {
  const { singleVacancySusbmissions } = props;
  let { vacancyId } = useParams();

  let query = undefined;
  let variables = {};
  if (singleVacancySusbmissions) {
    query = QUERIES.VACANCY_WITH_SUBMISSION_LIST;
    variables = {
      id: vacancyId,
    };
  } else {
    query = QUERIES.SUBMISSION_LIST;
  }

  let { loading, error, data } = useQuery(query, {
    fetchPolicy: "no-cache",
    variables: variables,
  });
  const submissionList =
    data &&
    ((data.vacancy && data.vacancy.submissionList) || data.submissionList);

  if (loading) {
    return (
      <GeneralContainer>
        <div>Loading...</div>
      </GeneralContainer>
    );
  }
  if (error) {
    return (
      <GeneralContainer>
        <div>Error loading applications</div>
      </GeneralContainer>
    );
  }

  return (
    <GeneralContainer
      title={
        singleVacancySusbmissions ? (
          <>
            {`${data.vacancy.position} `}
            <Translate value="VacancyApplicationListPage.applications" />
          </>
        ) : (
          <Translate value="VacancyApplicationListPage.allApplications" />
        )
      }
      breadcrumbs={
        <Breadcrumbs>
          <Link to="/">
            <Translate value="breadcrumbs.dashboard" />
          </Link>
          {singleVacancySusbmissions && (
            <Link to={`/vacancy/${vacancyId}`}>
              <Translate value="breadcrumbs.vacancy" />
            </Link>
          )}
          <Translate value="breadcrumbs.applications" />
        </Breadcrumbs>
      }
    >
      <GlassContainer>
        {data && (
          <Grid container direction="column" spacing={2}>
            {singleVacancySusbmissions && (
              <>
                <Grid item>
                  <Typography variant="h6">
                    <Translate value="VacancyApplicationListPage.vacancy" />
                  </Typography>
                </Grid>
                <Grid item>
                  <Link to={`/vacancy/${vacancyId}`}>
                    {data.vacancy.position} @{data.vacancy.company}
                  </Link>
                </Grid>

                <Grid item>
                  <Typography variant="h6">
                    <Translate value="VacancyApplicationListPage.applications" />
                  </Typography>
                </Grid>
              </>
            )}

            {!submissionList.length && (
              <Grid item>
                <Typography>
                  {!singleVacancySusbmissions && (
                    <Translate value="VacancyApplicationListPage.noApplications" />
                  )}
                  {singleVacancySusbmissions && (
                    <Translate value="VacancyApplicationListPage.noSingleVacancyApplications" />
                  )}
                </Typography>
              </Grid>
            )}
            {submissionList.map((submission) => {
              vacancyId = singleVacancySusbmissions
                ? vacancyId
                : submission.vacancy.id;
              let vacancyData = singleVacancySusbmissions
                ? data.vacancy
                : submission.vacancy;
              return (
                <Grid
                  item
                  sx={(theme) => ({ marginLeft: theme.spacing(1) })}
                  key={submission.id}
                >
                  <Divider variant="horizontal" />
                  <SubmissionItem
                    submission={submission}
                    vacancyId={vacancyId}
                    vacancyData={vacancyData}
                    singleVacancySusbmissions={singleVacancySusbmissions}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </GlassContainer>
    </GeneralContainer>
  );
}

VacancyApplicationListPage.propTypes = {
  singleVacancySusbmissions: PropTypes.bool,
};

export default VacancyApplicationListPage;
