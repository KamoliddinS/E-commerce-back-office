import React from "react";
import BaseProductMain from "./BaseProductMain";
import BaseProductUpload from "./BaseProductUpload";
import { Card, Box, Typography } from "@mui/material";

export default function BaseProductLayout() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Malumot Qo'shish
      </Typography>
      <Card sx={{ padding: 2, margin: 5 }}>
        <Box sx={{ display: "flex" }}>
          <BaseProductMain />
          <BaseProductUpload />
        </Box>
      </Card>
    </>
  );
}
