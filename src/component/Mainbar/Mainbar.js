import { React, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Translate, setLocale } from "react-redux-i18n";
import { styled } from "@mui/system";
import {
  AppBar,
  Grid,
  Toolbar,
  Menu,
  Typography,
  IconButton,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import { LanguageSelect } from "component";
import { LanguageDict } from "utils/constants";
import "./index.css";
import { GlassBar } from "component";

const GlassAppBar = styled(AppBar)(
  ({ theme }) => `

  `
);

const TitleTypography = styled(Typography)(({ theme }) => `flexGrow: 1;`);

export default function MainBar() {
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
    <GlassBar>
      <Grid container direction="row" justifyContent="flex-end" spacing={2}>
        <Grid item>
          <TitleTypography variant="h6">
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Staffence
            </Link>
          </TitleTypography>
        </Grid>
        <Grid item>
          <LanguageSelect
            labelId="select-language-select-label"
            id="select-language-select"
            value={locale}
            onChange={onLanguageSelected}
            variant="outlined"
          >
            {Object.keys(LanguageDict).map((key) => (
              <MenuItem value={LanguageDict[key].short} key={key}>
                {LanguageDict[key].full}
              </MenuItem>
            ))}
          </LanguageSelect>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </GlassBar>
  );
}
