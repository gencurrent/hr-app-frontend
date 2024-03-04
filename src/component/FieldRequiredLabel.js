/**
 * A label component to return a standalone label Required
 */

import { styled } from "@mui/system";

const RequiredLabel = styled("div")(
  ({ theme }) => `
    padding: ${theme.spacing(0.5)};
    margin: ${theme.spacing(0.2)};
    border: 2px solid ${theme.palette.error.main};
    borderRadius: 4px;
    display: inline;
    fontSize: ${theme.typography.body2.fontSize};
    color: ${theme.palette.error.main};
  `
);

export default function FieldRequiredLabel() {
  return <RequiredLabel>Required</RequiredLabel>;
}
