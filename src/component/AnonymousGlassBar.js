import { Translate, I18n } from "react-redux-i18n";
import { Grid, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

import { GlassBar, LanguageSelect } from "component";

export default function AnonymousGlassBar(props) {
  const { maxWidth = "md", sx = {} } = props;
  return (
    <>
      <GlassBar maxWidth={maxWidth} sx={sx}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
              }}
              to="/"
            >
              <img src={"/logo512.png"} height="48px" />
            </Link>
          </Grid>
          <Grid item>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Grid container spacing={1}>
                <Grid item>
                  <LanguageSelect />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </GlassBar>
      {props.children}
      <Outlet />
    </>
  );
}
