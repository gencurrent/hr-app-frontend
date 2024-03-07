import { Translate, I18n } from "react-redux-i18n";
import { Grid, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import { GlassBar, LanguageSelect } from "component";

export default function AnonymousGlassBar(props) {
  const { maxWidth = "md", sx = {} } = props;
  return (
    <>
      <GlassBar maxWidth={maxWidth} sx={sx}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography component="h1" variant="h4" style={{ fontWeight: 400 }}>
              <Translate value="applicationName" />
            </Typography>
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
      <Outlet />
    </>
  );
}
