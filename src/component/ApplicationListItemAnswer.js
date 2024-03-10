/**
 * A single vacancy application answer react component
 */
import { React } from "react";
import { Translate } from "react-redux-i18n";
import PropTypes from "prop-types";

import { styled } from "@mui/system";
import { Link, Typography, Box, Card, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import { GoogleCloudStorageClient } from "utils/cloudStorage";

const AnswerContainerBox = styled(Box)(
  ({ theme }) => `
    margin: ${theme.spacing(0, 0, 0, 2)};
    padding: ${theme.spacing(0.5)};
  `
);

const AnswerBlockCard = styled(Card)(
  ({ theme }) => `padding: ${theme.spacing(0.4)};`
);

const AnswerTextBox = styled(Card)(
  ({ theme }) => `
    padding: ${theme.spacing(0, 1)};
  `
);

function ApplicationListItemAnswer(props) {
  const cloudStorageClient = new GoogleCloudStorageClient();
  const { idx, answer, vacancy } = props;
  // TODO:
  // 1) Add validation on the found element;
  // 2) Make question the 1st priority (iterate over questions on the level above);
  // 3) Raise an exception in case the answer is not found
  const answerFull = {
    ...JSON.parse(vacancy.fields).find((el) => el.q === answer.q),
    ...answer,
  };
  return (
    <>
      <AnswerBlockCard elevation={0}>
        <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
          #{idx}. {answer.q}
        </Typography>
        {/* <Box className={classes.answerContainer}> */}
        <AnswerContainerBox>
          {answer.a === null || answer.a === "" ? (
            <Typography component="p">--- No answer ---</Typography>
          ) : (
            answerFull.t === "file" && (
              <>
                <Link
                  target="_blank"
                  download
                  href={cloudStorageClient.getFileUrl(answer.a)}
                >
                  <Button variant="outlined" color="primary">
                    <DownloadIcon />
                    <Translate value="component.ApplicationListItemAnswer.download" />
                  </Button>
                </Link>
              </>
            )
          )}
          {(answerFull.t === "line" ||
            answerFull.t === "text" ||
            answerFull.t === "number") && (
            <AnswerTextBox>
              <Typography>{answer.a}</Typography>
            </AnswerTextBox>
          )}
        </AnswerContainerBox>
      </AnswerBlockCard>
    </>
  );
}

ApplicationListItemAnswer.propTypes = {
  answer: PropTypes.object.isRequired,
};

export default ApplicationListItemAnswer;
