/**
 * A label component to return a standalone label Required
 */

import { styled } from "@mui/system";
import { Translate } from "react-redux-i18n";

const RequiredLabel = styled("div")(
  ({ theme }) => `
    padding: ${theme.spacing(0.2)};
    margin: ${theme.spacing(0.2)};
    border: 2px solid ${theme.palette.error.main};
    border-radius: 4px;
    display: inline;
    font-size: ${theme.typography.body2.fontSize};
    color: ${theme.palette.error.main};
  `
);

export default function FieldRequiredLabel() {
  return (
    <RequiredLabel>
      <Translate value="VacancyPage.required" />
    </RequiredLabel>
  );
}
