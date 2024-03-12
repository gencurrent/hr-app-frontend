/**
 * Profile page to manage user settings
 */
import { Link } from "react-router-dom";

import {
  Breadcrumbs,
  Button,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import { GeneralContainer, GlassContainer } from "component";
import { Translate } from "react-redux-i18n";

export default function ProfileSettingsPage() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      firstName: data.get("first-name"),
      thirdName: data.get("third-name"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <GeneralContainer
      title={<Translate value="ProfileSettingsPage.title" />}
      breadcrumbs={
        <Breadcrumbs>
          <Link to="/">
            <Translate value="breadcrumbs.dashboard" />
          </Link>
          <Translate value="ProfileSettingsPage.title" />
        </Breadcrumbs>
      }
    >
      <GlassContainer>
        <Grid container spacing={2}>
          <Grid item>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    variant="outlined"
                    required
                    id="firstName"
                    label={<Translate value="ProfileSettingsPage.firstName" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="family-name"
                    name="lastName"
                    variant="outlined"
                    required
                    id="lastName"
                    label={<Translate value="ProfileSettingsPage.lastName" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    <Translate value="ProfileSettingsPage.save" />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <Translate value="ProfileSettingsPage.changeEmail" />
                  </Typography>
                  <TextField
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    required
                    id="email"
                    label={<Translate value="ProfileSettingsPage.email" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    <Translate value="ProfileSettingsPage.confirmEmail" />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <Translate value="ProfileSettingsPage.resetPassword" />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    variant="outlined"
                    required
                    id="old-password"
                    label={
                      <Translate value="ProfileSettingsPage.currentPassword" />
                    }
                    type="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    variant="outlined"
                    required
                    id="new-password"
                    label={
                      <Translate value="ProfileSettingsPage.newPassword" />
                    }
                    type="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    <Translate value="ProfileSettingsPage.resetPassword" />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </GlassContainer>
    </GeneralContainer>
  );
}
