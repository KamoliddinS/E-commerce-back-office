import React from "react";
// @mui
import { Typography } from "@mui/material";
// components
import Profile from '../components/profile/Profile'


export default function BaseProductLayout() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
<Profile/>

  
    </>
  );
}
