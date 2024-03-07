import { React } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Snackbar,
} from "@mui/material";
import { Translate } from "react-redux-i18n";
import { Delete } from "@mui/icons-material";
import LinkIcon from "@mui/icons-material/Link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import copy from "copy-to-clipboard";

import { GeneralContainer, GlassContainer } from "component";

// const useStyles = makeStyles((theme) => ({
//   vacancyListItem: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

const VacancyListItem = (props) => {
  const { vacancy } = props;

  const onDelete = (e) => {
    props.onDelete && props.onDelete(vacancy.id);
  };
  function onCopyLink(e) {
    const loc = window.location;
    const url = `${loc.protocol}//${loc.host}/vacancy/${vacancy.id}/preview`;
    copy(url);
  }

  return (
    <Card variant="outlined" sx={{ my: 1 }}>
      <CardContent>
        <Typography component="h4" variant="h5">
          <Link
            className="link-undecorated"
            to={{
              pathname: `/vacancy/${vacancy.id}`,
              vacancy: vacancy,
            }}
          >
            {vacancy.position}
          </Link>
        </Typography>
        <Box>
          <Typography component="span" variant="body">
            @
          </Typography>
          <Typography component="span" variant="body">
            {vacancy.company}
          </Typography>
        </Box>
        <Box>
          <Typography component="h5" variant="h5"></Typography>
          <Link
            to={{
              pathname: `/vacancy/${vacancy.id}/submission`,
              vacancy: vacancy,
            }}
          >
            <div>Submissions: {vacancy.submissionCountTotal}</div>
          </Link>
        </Box>
      </CardContent>

      <CardActions>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              variant="outlined"
              size="small"
              onClick={onCopyLink}
              color="info"
            >
              <LinkIcon />
              <Translate value="component.VacancyListItem.URL" />
            </Button>
          </Grid>
          <Grid item>
            <Link to={`/vacancy/${vacancy.id}/preview`}>
              <Button variant="outlined" size="small" color="success">
                <CheckCircleOutlineIcon />
                <Translate value="component.VacancyListItem.apply" />
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={onDelete}
              size="small"
            >
              <Delete />
              <Translate value="component.VacancyListItem.delete" />
            </Button>
          </Grid>
        </Grid>
        {/* <Link to={`/vacancy/create`}>
          <Button
            variant='outlined'
            size='small'
          >Duplicate</Button>
        </Link> */}
      </CardActions>
      <Snackbar />
    </Card>
  );
};

VacancyListItem.propTypes = {
  vacancy: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

export default VacancyListItem;
