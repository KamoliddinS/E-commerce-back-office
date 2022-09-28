// @mui
import { Container, Typography } from "@mui/material";
// hooks
import useSettings from "../hooks/useSettings";
// components
import Page from "../components/Page";
// ----------------------------------------------------------------------

export default function PageFour() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Page Four">
      <Container maxWidth={themeStretch ? false : "xl"}></Container>
    </Page>
  );
}
