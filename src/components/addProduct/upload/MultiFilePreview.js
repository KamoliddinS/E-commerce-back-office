import PropTypes from "prop-types";
import { m, AnimatePresence } from "framer-motion";
// @mui
import { alpha } from "@mui/material/styles";
import {
  List,
  IconButton,
  ListItemText,
  ListItem,
  Box,
  ListItemAvatar,
  Typography,
} from "@mui/material";
// utils
import { fData } from "../../../utils/formatNumber";
import getFileData from "../../../utils/getFileData";
//
import Image from "../../Image";
import Iconify from "../../Iconify";

// ----------------------------------------------------------------------

// bytes to fixed kilobytes
function bytesToKilobytes(bytes) {
  return (bytes / 1024).toFixed(2);
}

// restrict adding same key to array

MultiFilePreview.propTypes = {
  files: PropTypes.array.isRequired,
  onRemove: PropTypes.func,
  showPreview: PropTypes.bool,
};

export default function MultiFilePreview({
  showPreview = false,
  files,
  onRemove,
}) {
  const hasFile = files.length > 0;

  return (
    <List
      disablePadding
      sx={{ ...(hasFile && { my: 3 }), display: "flex", flexWrap: "wrap" }}
    >
      <AnimatePresence>
        {files.map((file, index) => {
          const { key, name, size, preview } = getFileData(file, index);

          if (showPreview) {
            return (
              <ListItem
                key={key}
                sx={{
                  width: "fit-content",
                  background: "#FFFFFF",
                  border: "1px solid #E8EBED",
                  borderRadius: "8px",
                  margin: 1,
                }}
              >
                <ListItemAvatar>
                  <Image
                    alt="preview"
                    src={preview}
                    sx={{ width: 150, height: 150, borderRadius: 2 }}
                  />
                </ListItemAvatar>
                {/* <Box sx={{ display: "column", marginLeft: 2 }}>
                  <Typography variant="subtitle1" display="block">
                    {name}
                  </Typography>
                  <Typography variant="caption" display="block">
                    {bytesToKilobytes(size)} KB
                  </Typography>
                </Box> */}
                {onRemove && (
                  <IconButton
                    size="small"
                    onClick={() => onRemove(file)}
                    sx={{
                      top: 6,
                      p: "2px",
                      right: 6,
                      position: "absolute",
                      color: "common.white",
                      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.9),
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.grey[900], 0.48),
                      },
                    }}
                  >
                    <Iconify icon={"eva:close-fill"} />
                  </IconButton>
                )}
              </ListItem>
              // <ListItem
              //   key={key}
              //   component={m.div}
              //   sx={{
              //     p: 0,
              //     m: 0.5,
              //     width: 80,
              //     height: 80,
              //     borderRadius: 1.25,
              //     overflow: "hidden",
              //     position: "relative",
              //     display: "inline-flex",
              //     border: (theme) => `solid 1px ${theme.palette.divider}`,
              //   }}
              // >
              //   <Image alt="preview" src={preview} ratio="1/1" />

              // </ListItem>
            );
          }

          return (
            <ListItem
              key={key}
              component={m.div}
              sx={{
                my: 1,
                px: 2,
                py: 0.75,
                borderRadius: 0.75,
                border: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <Iconify
                icon={"eva:file-fill"}
                sx={{ width: 28, height: 28, color: "text.secondary", mr: 2 }}
              />

              <ListItemText
                primary={typeof file === "string" ? file : name}
                secondary={typeof file === "string" ? "" : fData(size || 0)}
                primaryTypographyProps={{ variant: "subtitle2" }}
                secondaryTypographyProps={{ variant: "caption" }}
              />

              {onRemove && (
                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => onRemove(file)}
                >
                  <Iconify icon={"eva:close-fill"} />
                </IconButton>
              )}
            </ListItem>
          );
        })}
      </AnimatePresence>
    </List>
  );
}