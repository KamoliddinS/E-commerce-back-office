import {
  Typography,
  Box,
  Stack,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import Image from "../Image";
import Iconify from "../Iconify";
import { borderRadius } from "@mui/system";

export default function ProductList({ data }) {
  return (
    <>
      <div>ProductList</div>
      <Stack direction="row" flexWrap="wrap">
        {data.map((product) => (
          <ProductListItem {...product} />
        ))}
      </Stack>
    </>
  );
}

function ProductListItem(products) {
  const { name, status, totalRating, totalReview, cover } = products;
  return (
    <>
      <Stack
        direction="column"
        sx={{
          bgcolor: "#fff",
          borderRadius: "5px",
          boxShadow: "0 1px 5px rgba(0,0,0,.07)",
          mb: 3,
          mr: 3,
          padding: 2,

          minWidth: "25%",
        }}
      >
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <Image
            src={cover}
            sx={{ width: 180, height: 200, borderRadius: 1 }}
          />
          <Stack direction="column" spacing={1}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  padding: "2px 30px",
                  border: "1px solid #0080004d",
                  borderRadius: 1,
                }}
                color="primary"
              >
                No SKU
              </Typography>
              <IconButton aria-label="delete" size="small">
                <Iconify icon="bx:dots-horizontal-rounded" />
              </IconButton>
            </Box>
            <Stack direction="column" spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  Reyting
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {totalRating}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  Ko'rishlar
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {totalReview}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  RIO
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  0.0%
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  Konversiya
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  0.0%
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
