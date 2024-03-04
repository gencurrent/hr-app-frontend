/**
 * General container for single-purpose pages (Create a Vacancy; Apply for a Vacancy; etc..)
 */

import PropTypes from "prop-types";
import { Container } from "@mui/material";

export default function GeneralContainer(props) {
  return (
    <Container
      component="main"
      maxWidth={props?.maxWidth || "md"}
      sx={{ my: 8 }}
    >
      {props.children}
    </Container>
  );
}

GeneralContainer.propTypes = {
  maxWidth: PropTypes.string,
  children: PropTypes.element.isRequired,
};
