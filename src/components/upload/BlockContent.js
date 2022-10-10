// @mui
<<<<<<< HEAD
import { Box, Typography, Stack } from "@mui/material";
// assets
import { UploadIllustration } from "../../../assets";
import { UploadIcon } from "../../Icons";
=======
import { Box, Typography, Stack } from '@mui/material';
// assets
import { UploadIllustration } from '../../assets';
>>>>>>> main

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Stack
<<<<<<< HEAD
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
=======
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <Box sx={{ p: 3 }}>
        <Typography gutterBottom variant="h5">
          Drop or Select file
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Drop files here or click&nbsp;
          <Typography
            variant="body2"
            component="span"
            sx={{ color: 'primary.main', textDecoration: 'underline' }}
          >
            browse
          </Typography>
          &nbsp;thorough your machine
>>>>>>> main
        </Typography>
      </Box>
    </Stack>
  );
}
