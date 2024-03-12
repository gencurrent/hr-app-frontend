import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLocale } from "react-redux-i18n";

import languageDict from "utils/constants/languageDict";

export default function LanguageSelect() {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.i18n.locale);

  function onLanguageSelected(newValue) {
    dispatch(setLocale(newValue));
  }

  return (
    <Autocomplete
      options={Object.keys(languageDict)}
      value={locale}
      size="small"
      disableClearable
      onChange={(event, newValue) => {
        onLanguageSelected(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Locale" fullWidth />
      )}
    />
  );
}
