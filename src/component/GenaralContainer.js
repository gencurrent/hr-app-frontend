/**
 * General container for single-purpose pages (Create a Vacancy; Apply for a Vacancy; etc..)
 */

import PropTypes from "prop-types";
import { Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function GeneralContainer(props) {
  const { title, breadcrumbs } = props;

  return (
    <>
      <Container
        component="main"
        maxWidth={props?.maxWidth || "md"}
        sx={{ my: 14 }}
      >
        <>
          {title && (
            <Typography variant="h4" component="h1" gutterBottom>
              {title}
            </Typography>
          )}
          {breadcrumbs ? breadcrumbs : <></>}
          <Outlet />
          {props.children}
        </>
      </Container>
    </>
  );
}

GeneralContainer.propTypes = {
  maxWidth: PropTypes.string,
  breadcrumbs: PropTypes.element,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
