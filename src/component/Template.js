import React from "react";
import PropTypes from "prop-types";
import { Box, CssBaseline } from "@mui/material";
import Mainbar from "./MainBar";

class Template extends React.Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Box my={2} sx={{ py: 2 }}>
          {this.props.children}
        </Box>
      </>
    );
  }
}

Template.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Template;
