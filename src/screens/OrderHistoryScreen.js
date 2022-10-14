import React from "react";
import { Typography } from "@mui/material";
import EditProduct from "../components/editProduct/EditProduct";

export default function BaseProductLayout() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <EditProduct />
    </>
  );
}
