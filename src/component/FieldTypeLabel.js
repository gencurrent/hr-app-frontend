/**
 * A label component to return a standalone label Required
 */

import PropTypes from "prop-types";
import { Translate } from "react-redux-i18n";

import { styled } from "@mui/system";

const Label = styled("div")(
  ({ theme }) => `
    padding: ${theme.spacing(0.2)};
    margin: ${theme.spacing(0.2)};
    border: 2px solid ${theme.palette.primary.main};
    border-radius: 4px;
    display: inline;
    font-size: ${theme.typography.body2.fontSize};
    color: ${theme.palette.primary.secondary};
  `
);

export default function FieldTypeLabel(props) {
  const { type } = props;

  return (
    <Label>
      <Translate value={`VacancyPage.${type}`} />
    </Label>
  );
}

FieldTypeLabel.propTypes = {
  type: PropTypes.string.isRequired,
};
