/**
 * Contains two classes:
 *  1) VacancyFieldListItemDialog for adding a field in the Add Field Dialog
 *  2) VacancyFieldList for working with all the fields below main line
 */

import PropTypes from "prop-types";
import { useState } from "react";
import { Translate } from "react-redux-i18n";
import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  FormHelperText,
  Card,
  FormControl,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Checkbox,
  CardContent,
  CardActions,
} from "@mui/material";

import {
  FIELD_TYPE_VALUE_TO_HELPER_TEXT_MAP,
  FIELD_TYPE_VALUE_TO_NAME_MAP,
} from "./constants";
import { FieldRequiredLabel, FieldTypeLabel } from "component";

/**
 * A dialog to edit field's parameters
 * @param {*} props {function onClose, function open}
 * @returns JSX
 */
function VacancyCreateFieldListItemDialog(props) {
  const [fieldDescription, setFieldDescription] = useState({
    q: "", // Question
    t: "line", // Type
    r: true, // Required
  });
  const { onClose, open } = props;

  const updateQuestion = (e) => {
    // TODO: Add a question length validation (length > 10 symbols)
    let desc = { ...fieldDescription, q: e.target.value };
    setFieldDescription(desc);
  };

  const updateType = (e) => {
    let desc = { ...fieldDescription, t: e.target.value };
    setFieldDescription(desc);
  };

  const updateRequired = (e) => {
    let desc = { ...fieldDescription, r: e.target.checked };
    setFieldDescription(desc);
  };

  const handleClose = (e) => {
    onClose();
  };
  const handleSave = (e) => {
    props.onSave(fieldDescription);
    props.onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Translate value="component.VacancyCreateFieldList.addEditField" />
      </DialogTitle>
      <DialogContent>
        <FormControl>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                label={
                  <Translate value="component.VacancyCreateFieldList.questionField" />
                }
                id="field-name"
                onChange={updateQuestion}
                value={fieldDescription.q}
                fullWidth={true}
              />
              <FormHelperText>
                <Translate value="component.VacancyCreateFieldList.questionFieldHelper" />
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Select
                label="Type"
                variant="standard"
                onChange={updateType}
                fullWidth
                value={fieldDescription.t}
              >
                <MenuItem key="line" value="line">
                  <Translate value="component.VacancyCreateFieldList.line" />
                </MenuItem>
                <MenuItem key="text" value="text">
                  <Translate value="component.VacancyCreateFieldList.text" />
                </MenuItem>
                <MenuItem key="number" value="number">
                  <Translate value="component.VacancyCreateFieldList.number" />
                </MenuItem>
                <MenuItem key="file" value="file">
                  <Translate value="component.VacancyCreateFieldList.file" />
                </MenuItem>
                {/* <MenuItem key='date' value='date'>Date</MenuItem> */}
              </Select>
              <FormHelperText>
                <Translate
                  value={`component.VacancyCreateFieldList.${fieldDescription.t}TypeHelper`}
                />
              </FormHelperText>
            </Grid>

            <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fieldDescription.r}
                    onChange={updateRequired}
                  />
                }
                label={
                  <Translate value="component.VacancyCreateFieldList.fieldIsRequired" />
                }
              />
            </Grid>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          <Translate value="component.VacancyCreateFieldList.discard" />
        </Button>
        <Button autoFocus onClick={handleSave}>
          <Translate value="component.VacancyCreateFieldList.save" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

VacancyCreateFieldListItemDialog.propTypes = {
  onClose: PropTypes.func.isRequired, // Dialog got closed callback function
  open: PropTypes.bool.isRequired, // Dialog got opened callback
  onSave: PropTypes.func.isRequired, // New field submitted (saved)
};

export default function VacancyCreateFieldList(props) {
  let [fields, setFields] = useState(props.fields || []);

  let [dialogOpen, setDialogOpen] = useState(false);

  const openAddFieldDialog = (e) => {
    setDialogOpen(!dialogOpen);
  };

  const closeAddFieldDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const saveField = (fieldProps) => {
    let newFields = [...fields];
    newFields.push(fieldProps);
    setFields(newFields);
    props.setFields && props.setFields(newFields); // Update the parent component fields
  };

  const removeField = (fieldIdx) => {
    let newFields = [...fields];
    newFields.splice(fieldIdx, 1);
    setFields(newFields);
  };

  return (
    <>
      <VacancyCreateFieldListItemDialog
        open={dialogOpen}
        onClose={closeAddFieldDialog}
        onSave={saveField}
      />
      <Grid container spacing={2}>
        {fields.map((el, idx) => (
          <Grid key={idx} item sm={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography component="h6" variant="h6">
                  {idx + 1}: {el.q}
                </Typography>
                <Typography component="span" variant="span">
                  <FieldTypeLabel type={el.t} />
                  {/* {FIELD_TYPE_VALUE_TO_NAME_MAP[el.t]} */}
                </Typography>{" "}
                <Typography
                  component="span"
                  color="text.secondary"
                  variant="span"
                >
                  {el.r ? <FieldRequiredLabel /> : "Not required"}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                {/* <Button><Translate value="component.VacancyCreateFieldList.edit" /> </Button> */}
                <Button onClick={(e) => removeField(idx)}>
                  <Translate value="component.VacancyCreateFieldList.remove" />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={openAddFieldDialog}
          >
            <Translate value="component.VacancyCreateFieldList.addField" />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

VacancyCreateFieldList.propTypes = {
  fields: PropTypes.arrayOf(Object).isRequired,
  setFields: PropTypes.func,
};
