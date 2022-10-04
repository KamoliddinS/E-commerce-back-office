import React, { useState, useEffect } from "react";
// @mui
import {
  Modal,
  Box,
  Typography,
  AppBar,
  Tabs,
  Button,
  Tab,
  IconButton,
  Grid,
  Zoom,
} from "@mui/material";
// components
import SignIn from "./SignIn";
import SignUp from "./SignUp";
//redux
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slices/userSlice";
import { installEimzoAndListAllUserKeys } from "../../redux/slices/eimzoSlice";
// other
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import SignInWithEimzo from "./SignInWithEimzo";

export default function AuthModal() {
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 560,
    // height: 400,
    // overflowY: 'scroll',
    bgcolor: "background.paper",
    // border: '2px solid #000',
    borderRadius: 2,
    boxShadow: 20,

    p: 4,
  };

  useEffect(() => {
    dispatch(installEimzoAndListAllUserKeys());
  }, []);

  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeModal());
  }

  return (
    <Box
      sx={[
        style,
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
     

      <FullWidthTabs />
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const eImzo = useSelector((state) => state.eimzo);

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          // indicatorColor="background.paper"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{ backgroundColor: "background.paper" }}
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Registration" {...a11yProps(1)} />
          <Tab label="Login with E-imzo" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <SignIn />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SignUp />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {eImzo.isError === true || eImzo.certificates.length === 0 ? (
            <Typography variant="h6" color="error">
              Error
            </Typography>
          ) : (
            <SignInWithEimzo />
          )}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
