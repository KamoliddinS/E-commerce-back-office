import React from "react";
import {
  Typography,
  Breadcrumbs,
  Divider,
  Box,
  Stack,
  Button,
} from "@mui/material";
import Iconify from "../../Iconify";

import { useSelector } from "react-redux";

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" },
  { name: "Red", hex: "#d51919" },
  { name: "Green", hex: "#00AB55" },
  { name: "Bleu", hex: "#076be7" },
  { name: "Yellow", hex: "#ffc800e3" },
];

export default function VariableSelects() {
  const category = useSelector(
    (state) => state.addProduct.baseProduct.category
  );
  const subcategory = useSelector(
    (state) => state.addProduct.baseProduct.subcategory
  );

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
      <Stack direction="row" spacing={2} sx={{ marginTop: 5 }}>
        <Typography variant="body1" gutterBottom>
          Mavjud ranglar
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Stack direction="row" spacing={0.5}>
            {colors.map((color) => (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  display: "flex",
                  borderRadius: "50%",
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: color.hex,
                  boxShadow: `0 2px 15px 0 ${color.hex}`,
                  border: "1px solid #e0e0e0",
                  transition: (theme) =>
                    theme.transitions.create("all", {
                      duration: theme.transitions.duration.shortest,
                    }),
                }}
              ></Box>
            ))}
          </Stack>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="akar-icons:circle-plus-fill" />}
          >
            Delete
          </Button>
        </Box>
      </Stack>
    </>
  );
}
