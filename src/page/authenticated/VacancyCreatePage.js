import PropTypes from "prop-types";
import { React, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  RichTextReadOnly,
} from "mui-tiptap";
import { useMutation } from "@apollo/client";
import {
  Button,
  Breadcrumbs,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import StarterKit from "@tiptap/starter-kit";

import {
  GeneralContainer,
  GlassContainer,
  VacancyCreateFieldList,
} from "component";
import { MUTATIONS } from "utils/apollo";
import { Translate } from "react-redux-i18n";

const TEXT_FIELD_ROWS_NUMBER_DEFAULT = 3;
const FIELD_VACANCY_HELPER_TEXT_DEFAULT = "Vacancy position";
const FIELD_VACANCY_HELPER_TEXT_DEFAULT_LENGTH_ERROR =
  "Vacancy position length must be greater than 10 symbols";

export default function VacancyCreatePage(props) {
  const rteRef = useRef(null);
  let navigate = useNavigate();
  let [position, setPosition] = useState("");
  let [company, setCompany] = useState("");
  let [text, setText] = useState("");
  let [vacancyDescription, setVacancyDescription] = useState("");
  let [fields, setFields] = useState([]);

  let [rowsNumber, setRowsNumber] = useState(TEXT_FIELD_ROWS_NUMBER_DEFAULT);

  const [positionFieldHelperProps, setPositionFieldHelperProps] = useState({
    error: false,
    text: FIELD_VACANCY_HELPER_TEXT_DEFAULT,
  });

  const updateFormPosition = (e) => {
    let value = e.currentTarget.value;
    if (value.length < 10) {
      setPositionFieldHelperProps({
        error: true,
        text: FIELD_VACANCY_HELPER_TEXT_DEFAULT_LENGTH_ERROR,
      });
    } else {
      setPositionFieldHelperProps({
        error: false,
        text: FIELD_VACANCY_HELPER_TEXT_DEFAULT,
      });
    }
    setPosition(value);
  };

  const updateFormText = (e) => {
    let strToCheck = RegExp("\n", "g");
    let matchesReg = e.currentTarget.value.matchAll(strToCheck);
    let newRowsNumber = Array.from(matchesReg).length + 1;
    setRowsNumber(
      newRowsNumber > TEXT_FIELD_ROWS_NUMBER_DEFAULT
        ? newRowsNumber
        : TEXT_FIELD_ROWS_NUMBER_DEFAULT
    );
    setText(e.currentTarget.value);
  };

  let [createVacancy] = useMutation(MUTATIONS.CREATE_VACANCY);

  const save = (e) => {
    let vacancyDescription = rteRef?.current?.editor?.getHTML();
    setVacancyDescription(vacancyDescription);
    createVacancy({
      variables: {
        company: company,
        position: position,
        text: vacancyDescription,
        fields: JSON.stringify(fields),
      },
    }).then(({ data }) => {
      // Success only
      navigate(`/vacancy/${data.createVacancy.id}`);
    });
  };
  return (
    <GeneralContainer
      title={<Translate value="VacancyCreatePage.title" />}
      breadcrumbs={
        <Breadcrumbs>
          <Link to="/">
            <Translate value="breadcrumbs.dashboard" />
          </Link>
          <Translate value="breadcrumbs.createVacancy" />
        </Breadcrumbs>
      }
    >
      <GlassContainer>
        <Grid container direction="column" spacing={2}>
          <Grid item sm={12}>
            <Typography variant="h4" component="h3"></Typography>
            <FormControl noValidate autoComplete="off" fullWidth={true}>
              <TextField
                label={<Translate value="VacancyCreatePage.vacancyName" />}
                error={positionFieldHelperProps["error"]}
                autoComplete="position"
                id="position"
                value={position}
                onChange={updateFormPosition}
                required
              />
              <FormHelperText error={positionFieldHelperProps["error"]}>
                {positionFieldHelperProps["text"]}
              </FormHelperText>
              <TextField
                label={<Translate value="VacancyCreatePage.company" />}
                autoComplete="company"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.currentTarget.value)}
                required
              />
              <FormHelperText>
                <Translate value="VacancyCreatePage.companyHelperText" />
              </FormHelperText>

              <RichTextEditor
                ref={rteRef}
                extensions={[StarterKit]} // Or any Tiptap extensions you wish!
                content={""} // Initial content for the editor
                disabled={true}
                // Optionally include `renderControls` for a menu-bar atop the editor:
                renderControls={() => (
                  <MenuControlsContainer>
                    <MenuSelectHeading />
                    <MenuDivider />
                    <MenuButtonBold />
                    <MenuButtonItalic />
                  </MenuControlsContainer>
                )}
              />
              <RichTextReadOnly
                content={vacancyDescription}
                extensions={[StarterKit]}
              />
              <FormHelperText>
                <Translate value="VacancyCreatePage.descriptionHelperText" />
              </FormHelperText>
              <VacancyCreateFieldList fields={fields} setFields={setFields} />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={save}>
              <Translate value="VacancyCreatePage.create" />
            </Button>
          </Grid>
        </Grid>
      </GlassContainer>
    </GeneralContainer>
  );
}

VacancyCreatePage.propTypes = {
  vacancyId: PropTypes.number,
};
