import React from "react";
import { useSelector } from "react-redux";
import { Typography, Breadcrumbs, Divider } from "@mui/material";
import Iconify from "../../Iconify";
export default function GenerateProduct() {
  const product = useSelector((state) => state.product.product);

  const { category, subcategory } = product;

  const breadcrumbs = [
    <Typography key="3" color="text.primary">
      {category}
    </Typography>,
    <Typography key="3" color="text.primary">
      {subcategory}
    </Typography>,
  ];

  return (
    <>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Mahsulot toifasi
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Breadcrumbs
          separator={<Iconify icon="mdi:chevron-right" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Typography>
      <Divider />
    </>
  );
}
