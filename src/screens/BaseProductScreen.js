import React from "react";
import BaseProductMain from "../components/addProduct/BaseProduct/BaseProductMain";
import BaseProductUpload from "../components/addProduct/BaseProduct/BaseProductUpload";
import { Card, Box, Typography } from "@mui/material";

export default function BaseProductLayout() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Mahsulot Qo'shish
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
