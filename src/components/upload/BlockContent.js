// @mui
import { Box, Typography, Stack } from "@mui/material";
// assets
import { UploadIllustration } from "../../assets";
import { UploadIcon } from "../Icons";

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction={{ xs: "column", md: "column" }}
      sx={{
        width: 1,
        padding: "10px 0px",
        textAlign: {
          xs: "center",
          md: "center",
        },
      }}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <UploadIcon width={42} height={42} color="#00AB55" />
        <Typography
          gutterBottom
          variant="body1"
          color="grey.600"
          sx={{ marginTop: 2 }}
        >
          Rasmni shu yerga qo'ying yoki tanlang
        </Typography>
      </Box>
    </Stack>
  );
}
