import { React, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
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

export default function MainBar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const locale = useSelector((state) => state.i18n.locale);
  const open = Boolean(anchorEl);
  const { maxWidth = "lg", sx = {} } = props;

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
    window.location.reload();
  };

  return (
    <>
      <GlassBar maxWidth={maxWidth} sx={sx}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent={"middle"}
          >
            {/* <TitleTypography variant="h6"> */}
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
            {/* </TitleTypography> */}
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
                <Grid item display="flex" alignItems="center">
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
                <Grid item display="flex" alignItems="center">
                  <div>
                    {/* TODO: Insert Typographed username here */}
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                      fontSize="medium"
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
            </div>
          </Grid>
        </Grid>
      </GlassBar>
      <Outlet />
    </>
  );
}
