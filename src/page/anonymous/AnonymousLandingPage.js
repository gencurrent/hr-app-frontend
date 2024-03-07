/**
 * The Landing Page for unauthenticated users
 */
import { ReactComponent as LPIcon } from "public/LP-icon.svg";
import { React, useState } from "react";
import { styled } from "@mui/system";
import {
  Container,
  Grid,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";
import ReactSpeedometer from "react-d3-speedometer";

import { BottomBar, GlassBar, GlassContainer, LanguageSelect } from "component";
// import { darkTheme, lightTheme } from "utils/material/theme";
import { Box } from "@mui/system";
import { Translate } from "react-redux-i18n";

const StyledCheckBoxFormGroup = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(1)};
    width: 100%;
    border: 1px solid #ff5722;
    borderRadius: 4px;
  `
);

function AnonymousLandingPage(props) {
  const speedometervalues = [
    "❤️‍🩹  We are sorry to have nothing selected above",
    "👩‍🔬  At least we could try it",
    "👩‍💻  We are close to your expectations",
    "🎉  We meet the most of your demands",
    "🚀  Staffence is exactly what could help you",
  ];
  const [checkedQuestions, setCheckedQuestions] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [speedometerValue, setSpeedometerValue] = useState(0);
  const [speedometerText, setSpeedometerText] = useState(speedometervalues[0]);

  function udpateCheckboxValue(number, value) {
    const newValues = [...checkedQuestions];
    newValues[number] = value;
    setCheckedQuestions(newValues);
    let counter = 0;
    newValues.forEach((el) => (el ? counter++ : 0));
    setSpeedometerValue((counter / 4) * 100);
    setSpeedometerText(speedometervalues[counter]);
  }

  const windowWidth = window.innerWidth;

  return (
    <>
      <GlassBar>
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
                <Grid item display={"flex"}>
                  <Link to={`/auth/signin`}>
                    <Button size="large" variant="contained" color="primary">
                      <Translate value="authenticate" />
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </GlassBar>

      <Container sx={{ my: 16 }} maxWidth="lg">
        <Box my={2}>
          <GlassContainer maxWidth={false}>
            {/* <ThemeProvider theme={darkTheme}> */}
            <Grid container>
              <Grid item sm={12} md={6} display={"flex"}>
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  color="text.primary"
                  style={{ fontWeight: 400 }}
                  margin={"auto"}
                >
                  Make recruiting
                  <br /> a simple game
                </Typography>
              </Grid>
              <Grid item sm={12} md={6} display={"flex"}>
                <LPIcon className="lp-image" />
                {/* <RequestDemoForm /> */}
              </Grid>
            </Grid>
            {/* </ThemeProvider> */}
          </GlassContainer>
        </Box>

        <Box my={2}>
          <GlassContainer className={`lp-benefits-block`}>
            {/* <ThemeProvider theme={lightTheme}> */}
            <Grid container>
              {/* CheckBoxes */}
              <Grid item sm={12} md={6}>
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  style={{ fontWeight: 400 }}
                >
                  The benefits
                </Typography>
                <Grid container justifyContent="center">
                  <Grid item sm={12} md={8}>
                    <Card>
                      <Box sx={{ p: 2 }}>
                        <Grid container justifyContent="center" spacing={2}>
                          <Grid item sm={12} style={{ width: "100%" }}>
                            <StyledCheckBoxFormGroup>
                              <FormControlLabel
                                className="unselectable"
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    checked={checkedQuestions[0]}
                                    onChange={(e) =>
                                      udpateCheckboxValue(0, e.target.checked)
                                    }
                                    name="question-0"
                                  />
                                }
                                label="Turn your responses into achievement"
                              />
                            </StyledCheckBoxFormGroup>
                          </Grid>

                          <Grid item sm={12} style={{ width: "100%" }}>
                            <StyledCheckBoxFormGroup>
                              <FormControlLabel
                                className="unselectable"
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    checked={checkedQuestions[1]}
                                    onChange={(e) =>
                                      udpateCheckboxValue(1, e.target.checked)
                                    }
                                    name="question-1"
                                  />
                                }
                                label="Get feedback faster"
                              />
                            </StyledCheckBoxFormGroup>
                          </Grid>

                          <Grid item sm={12} style={{ width: "100%" }}>
                            <StyledCheckBoxFormGroup>
                              <FormControlLabel
                                className="unselectable"
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    checked={checkedQuestions[2]}
                                    onChange={(e) =>
                                      udpateCheckboxValue(2, e.target.checked)
                                    }
                                    name="question-2"
                                  />
                                }
                                label="Score and filter all the responses"
                              />
                            </StyledCheckBoxFormGroup>
                          </Grid>

                          <Grid item sm={12} style={{ width: "100%" }}>
                            <StyledCheckBoxFormGroup>
                              <FormControlLabel
                                className="unselectable"
                                style={{ width: "100%" }}
                                control={
                                  <Checkbox
                                    checked={checkedQuestions[3]}
                                    onChange={(e) =>
                                      udpateCheckboxValue(3, e.target.checked)
                                    }
                                    name="question-3"
                                  />
                                }
                                label="Hire easy"
                              />
                            </StyledCheckBoxFormGroup>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={6} alignContent="center">
                <Container sx={{ p: 2 }}>
                  <ReactSpeedometer
                    // fluidWidth={true}
                    height={300}
                    width={windowWidth < 500 ? windowWidth * 0.8 : 500}
                    minValue={0}
                    maxValue={100}
                    value={speedometerValue}
                    maxSegmentLabels={0}
                    segments={1000}
                    needleHeightRatio={0.8}
                    currentValueText={speedometerText}
                    valueTextFontSize={windowWidth < 500 ? "12px" : "22px"}
                  />
                </Container>
              </Grid>
            </Grid>
            {/* </ThemeProvider> */}
          </GlassContainer>
        </Box>

        <GlassContainer>
          <Grid container sx={{ justifyContent: "left" }}>
            <Grid item sm={12} md={4}>
              <Typography
                component="h1"
                variant="h3"
                align="center"
                style={{ fontWeight: 400 }}
              >
                The essence
              </Typography>

              <Grid container justifyContent="left" sx={{ p: 2 }}>
                <Grid item>
                  <Typography variant="h5" component="h5">
                    1. Create a vacancy, add your custom questions
                  </Typography>
                  <Typography variant="h5" component="h5">
                    2. Let your candidates fill the vacancy form
                  </Typography>
                  <Typography variant="h5" component="h5">
                    3. Check: Score and filter responses
                  </Typography>
                  <Typography variant="h5" component="h5">
                    4. Choose among the best candidates
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </GlassContainer>
      </Container>
      <BottomBar />
    </>
  );
}

export default AnonymousLandingPage;
