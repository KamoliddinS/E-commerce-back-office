import React from "react";
import { useSelector } from "react-redux";
import { Typography, Breadcrumbs, Divider, Stack } from "@mui/material";
import Iconify from "../../Iconify";
import Image from "../../Image";
import GenerateProductsList from "./GenerateProductsList";
export default function GenerateProduct({ photo }) {
  const product = useSelector((state) => state.product.product);

  console.log(photo);

  return (
    <>
      <Stack direction="row">
        <Image src={photo} sx={{ width: 500, height: 150 }} />
        <Stack direction="column" spacing={0.5}>
          <Typography variant="h6" gutterBottom>
            {product.nameuz}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {product.descriptionuz}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
