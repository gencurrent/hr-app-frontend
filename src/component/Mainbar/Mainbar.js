import { React, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Translate, setLocale } from "react-redux-i18n";
import { styled } from "@mui/system";
import {
  AppBar,
  Toolbar,
  Menu,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import languageDict from "./languageDict";
import "./index.css";

const LanguageSelect = styled(Select)(
  ({ theme }) =>
    `
    color: white !important;
    borderColor: rgba(255, 255, 255, 0.43);
  `
);

const TitleTypography = styled(Typography)(({ theme }) => `flexGrow: 1;`);

const Mainbar = () => {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.i18n.locale);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function onLanguageSelected(e) {
    const value = e.target.value;
    dispatch(setLocale(value));
  }

  const onLogOutClick = () => {
    handleClose();
    let keys = ["refresh", "token", "tokenExpiresIn"];
    keys.forEach((key) => localStorage.removeItem(key));

    navigate("/");
  };

  return (
    <AppBar>
      <Toolbar id="header-toolbar">
        <TitleTypography variant="h6">
          {/* <Link style={{ textDecoration: "none", color: "white" }} to="/"> */}
          <Link to="/">Staffence</Link>
        </TitleTypography>
        <LanguageSelect
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
        </LanguageSelect>
        <div>
          {/* TODO: Insert Typographed username here */}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-bar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Translate value="mainBar.profile" />
            </MenuItem>
            <MenuItem onClick={onLogOutClick}>
              <Translate value="mainBar.logOut" />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Mainbar;
