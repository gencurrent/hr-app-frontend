/**
 *
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { I18n } from "react-redux-i18n";
import { Grid, TextField } from "@mui/material";

import FileUploadField from "./FileUploadField";

const VacancySubmissionFieldItem = (props) => {
  const { field, vacancy } = props;

  // Field-specific errors
  const fieldRequiredText = I18n.t(
    "AnonymousVacancySubmissionPage.fieldIsRequired"
  );
  const [fieldError, setFieldError] = useState(undefined);

  const setValue = (e) => {
    const value = e.target.value;
    drillValue(value);
  };

  /**
   * Drill the value onto the upper level (Parent Component's callback)
   * @param {Object} value The value to pass on
   */
  const drillValue = (value) => {
    if (field.r && (value === undefined || value === "")) {
      setFieldError(fieldRequiredText);
    } else {
      setFieldError(undefined);
    }
    const key = field.q;
    console.log(
      `field r, key, value,  error = `,
      field.r,
      key,
      value,
      fieldError
    );
    props.valueUpdateCallback(key, value);
  };

  return (
    <Grid container spacing={6}>
      <Grid item sm={12} xs={12}>
        {field.t === "text" && (
          <TextField
            onChange={setValue}
            label={field.q}
            helperText={fieldError}
            required={field.r}
            error={fieldError}
            margin="normal"
            fullWidth={true}
            multiline
            rows={4}
            key={`field-${field.q}`}
          />
        )}
        {field.t === "line" && (
          <TextField
            onChange={setValue}
            label={field.q}
            helperText={fieldError}
            required={field.r}
            error={fieldError}
            margin="normal"
            fullWidth
            key={`field-${field.q}`}
          />
        )}
        {field.t === "number" && (
          <TextField
            onChange={setValue}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            label={field.q}
            helperText={fieldError}
            required={field.r}
            error={fieldError}
            margin="normal"
            variant="outlined"
            fullWidth
            type="number"
            key={`field-${field.q}`}
          />
        )}
        {field.t === "file" && (
          <>
            <FileUploadField
              callBack={(file) => props.valueUpdateCallback(field.q, file)}
              fieldRequired={field.r}
              vacancy={vacancy}
              fieldText={field.q}
            />
          </>
        )}
        {/* {field.t === 'date' && <TextField
                    onChange={setValue}
                    label="Birthday"
                    helperText={fieldError}
                    type="date"
                    defaultValue=''
                    sx={{ width: 220 }}
                    InputLabelProps={{
                    shrink: true
                    }}
                />} */}
      </Grid>
    </Grid>
  );
};

VacancySubmissionFieldItem.propTypes = {
  valueUpdateCallback: PropTypes.func.isRequired,
  vacancy: PropTypes.object.isRequired,
};

export default VacancySubmissionFieldItem;
