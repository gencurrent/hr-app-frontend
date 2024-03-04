/**
 * Submissions list to the related Vacancy
 */

import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { styled } from "@mui/system";
import {
  Button,
  Breadcrumbs,
  Card,
  Collapse,
  Grid,
  Link as MUILink,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import { Translate } from "react-redux-i18n";

import { GeneralContainer, SubmissionListItemAnswer } from "component";
import { datetimeToString } from "utils/date";
import { QUERIES } from "utils/apollo";
import { GoogleCloudStorageClient } from "utils/cloudStorage";
import { ExpandMore } from "component";

const SubmissionListItem = styled(Card)(
  ({ theme }) => `
  margin: ${theme.spacing(3, 0, 2)};
  padding: ${theme.spacing(2)};

`
);

function SubmissionItem(props) {
  const { submission, singleVacancySusbmissions, vacancyId } = props;
  let { vacancyData } = props;
  let ts = new Date(submission.ts);
  // const tsString = new RegExp("(?P=<year>\d{4})\-(?P=<month>\d{2})\-(?P=<day>\d{2})");\
  const tsString = datetimeToString(ts);
  let [decision, setDecision] = useState(submission.decision);
  let [decisionClass, setDecisionClass] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /**
   *
   * @param {Event} e
   */
  function onDecisionChange(e) {
    const { value } = e.target;
    setDecision(value);
    setDecisionClass();
  }

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
      <Grid container>
        {fieldList.map((field) => (
          <Grid key={field.field} style={{ margin: "0px 0" }} item xs={12}>
            {field.field === "resume" ? (
              <MUILink
                target="_blank"
                download
                href={cloudStorageClient.getFileUrl(submission.resume)}
              >
                <Button variant="outlined" color="primary">
                  Resume
                </Button>
              </MUILink>
            ) : (
              <Typography
                key={field.field}
                variant="body1"
                component="p"
                sx={
                  field.field === "fullname"
                    ? { fontWeight: "600 !important" }
                    : { display: "inline" }
                }
              >
                {submission[field.field]}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    );
  }

  vacancyData = submission.vacancy || vacancyData;

  return (
    <SubmissionListItem key={submission.uuid} variant="outlined">
      {!singleVacancySusbmissions && (
        <Typography component="h5" variant="h5">
          <Link className="link-undecorated" to={`/vacancy/${vacancyId}`}>
            {vacancyData.position} | {vacancyData.company}
          </Link>
        </Typography>
      )}

      <Grid container justifyContent="space-between">
        <Grid item>
          <FieldItemsGrid submission={submission} />
        </Grid>
        <Grid item>{tsString}</Grid>
      </Grid>

      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {JSON.parse(submission.answers).map((answer, idx) => (
          <SubmissionListItemAnswer
            idx={idx}
            key={answer.q}
            answer={answer}
            vacancy={vacancyData}
          />
        ))}
      </Collapse>
    </SubmissionListItem>
  );
}

function VacancySubmissionListPage(props) {
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

  return (
    <GeneralContainer>
      {loading && <div>Loading...</div>}

      {error && <div>Error loading submissions</div>}
      {data && (
        <>
          {/* Title */}
          {singleVacancySusbmissions ? (
            <Typography component="h3" variant="h4">
              <Link className="link-undecorated" to={`/vacancy/${vacancyId}`}>
                {data.vacancy.position}
              </Link>
              {" submissions"}
            </Typography>
          ) : (
            <Typography component="h3" variant="h4">
              <Translate value="submissionListPage.allSubmissions" />
            </Typography>
          )}

          <Breadcrumbs>
            <Link to="/">
              <Translate value="breadcrumbs.dashboard" />
            </Link>
            <Typography>
              <Translate value="breadcrumbs.submissions" />
            </Typography>
          </Breadcrumbs>

          {submissionList.map((submission) => {
            vacancyId = singleVacancySusbmissions
              ? vacancyId
              : submission.vacancy.id;
            let vacancyData = singleVacancySusbmissions
              ? data.vacancy
              : submission.vacancy;
            return (
              <SubmissionItem
                key={submission.id}
                submission={submission}
                vacancyId={vacancyId}
                vacancyData={vacancyData}
                singleVacancySusbmissions={singleVacancySusbmissions}
              />
            );
          })}
        </>
      )}
    </GeneralContainer>
  );
}

VacancySubmissionListPage.propTypes = {
  singleVacancySusbmissions: PropTypes.bool,
};

export default VacancySubmissionListPage;
