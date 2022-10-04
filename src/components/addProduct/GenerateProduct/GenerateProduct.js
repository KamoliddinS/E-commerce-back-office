import React from "react";
import { useSelector } from "react-redux";
import { Typography, Breadcrumbs, Divider, Stack } from "@mui/material";
import Iconify from "../../Iconify";
import Image from "../../Image";
import GenerateProductsList from "./GenerateProductsList";
export default function GenerateProduct({ files }) {
  const product = useSelector((state) => state.product.product);

  const { category, subcategory, nameuz, descriptionuz } = product;

  const mainImage = files[0].preview;

  // const breadcrumbs = [
  //   <Typography key="3" color="text.primary">
  //     {category}
  //   </Typography>,
  //   <Typography key="3" color="text.primary">
  //     {subcategory}
  //   </Typography>,
  // ];

  return (
    <>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Mahsulot toifasi
      </Typography>
      <Typography variant="body1" gutterBottom>
        {/* <Breadcrumbs
          separator={<Iconify icon="mdi:chevron-right" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs> */}
      </Typography>
      <Divider />
      {/* <Stack direction="row" alignItems="center" mt={2} mb={2} spacing={5}>
        <Image
          src={mainImage}
          // ratio="1/1"
          sx={{ width: 150, height: 150 }}
        />
        <Stack direction="column">
          <Typography variant="h6" gutterBottom>
            {nameuz}
          </Typography>
          <Typography variant="caption" width="60%" gutterBottom>
            {descriptionuz}
          </Typography>
        </Stack>
      </Stack> */}
      <Divider />
      {/* <GenerateProductsList /> */}
    </>
  );
}
