/**
 * A label component to return a standalone label Required
 */

import PropTypes from "prop-types";
import { Translate } from "react-redux-i18n";

import { styled } from "@mui/system";

const Label = styled("div")(
  ({ theme }) => `
    padding: ${theme.spacing(0.5)};
    margin: ${theme.spacing(0.2)};
    border: 2px solid ${theme.palette.success.main};
    borderRadius: 4px;
    display: inline;
    fontSize: ${theme.typography.body2.fontSize};
    color: ${theme.palette.success.main};
  `
);

const FIELD_TYPE_VALUE_TO_NAME_MAP = {
  line: "Line",
  text: "Text",
  number: "Number",
  file: "File",
  // 'date': 'Date'
};

export default function FieldTypeLabel(props) {
  const { type } = props;
  const fieldTypeFull = FIELD_TYPE_VALUE_TO_NAME_MAP[type];

  return <Label>{fieldTypeFull}</Label>;
}

FieldTypeLabel.propTypes = {
  type: PropTypes.string.isRequired,
};

