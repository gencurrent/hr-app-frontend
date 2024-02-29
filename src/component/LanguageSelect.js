import { styled } from "@mui/system";
import { Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Translate, setLocale } from "react-redux-i18n";

import languageDict from "utils/constants/languageDict";
import { increment } from "utils/redux/ColorModereducer";

const StyledSelect = styled(Select)(
  ({ theme }) =>
    `
    // color: white !important;
    borderColor: rgba(255, 255, 255, 0.43);
  `
);

export default function LanguageSelect(props) {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.i18n.locale);

  function onLanguageSelected(e) {
    const value = e.target.value;
    dispatch(increment(1));
    dispatch(setLocale(value));
  }

  return (
    <StyledSelect
      labelId="select-language-select-label"
      id="select-language-select"
      value={locale}
      onChange={onLanguageSelected}
      variant="outlined"
    >
      {Object.keys(languageDict).map((key) => (
        <MenuItem value={languageDict[key].short} key={key}>
          {languageDict[key].full}
        </MenuItem>
      ))}
    </StyledSelect>
  );
}
