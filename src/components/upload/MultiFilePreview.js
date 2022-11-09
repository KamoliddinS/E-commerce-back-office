import PropTypes from "prop-types";
import { m, AnimatePresence } from "framer-motion";
// @mui
import { alpha } from "@mui/material/styles";
import {
  List,
  IconButton,
  ListItemText,
  ListItem,
  Divider,
} from "@mui/material";
// utils
import { fData } from "../../utils/formatNumber";
import getFileData from "../../utils/getFileData";
//
import Image from "../Image";
import Iconify from "../Iconify";
import { varFade } from "../animate";
import { useSelector, useDispatch } from "react-redux";
import { removeImage } from "../../redux/slices/productEditSlice";

// ----------------------------------------------------------------------

MultiFilePreview.propTypes = {
  files: PropTypes.array.isRequired,
  onRemove: PropTypes.func,
  showPreview: PropTypes.bool,
};

export default function MultiFilePreview({
  showPreview = true,
  files,
  onRemove,
  imagesApi,
  varIndex,
}) {
  const isSuccess = useSelector((state) => state.productEdit.isSuccess);
  const dispatch = useDispatch();

  return (
    <List disablePadding sx={{}}>
      <AnimatePresence>
        {isSuccess
          ? imagesApi.map((file, index) => {
              if (showPreview) {
                return (
                  <ListItem
                    key={index}
                    component={m.div}
                    {...varFade().inRight}
                    sx={{
                      p: 0,
                      m: 0.5,
                      width: 80,
                      height: 80,
                      borderRadius: 1.25,
                      overflow: "hidden",
                      position: "relative",
                      display: "inline-flex",
                      border: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <Image alt="preview" src={file} ratio="1/1" />
                    <IconButton
                      size="small"
                      sx={{
                        top: 6,
                        p: "2px",
                        left: 6,
                        cursor: "context-menu",
                        position: "absolute",
                        color: "common.white",
                        backgroundColor: "#00800099",
                      }}
                    >
                      <Iconify icon="ci:cloud-check" />
                    </IconButton>

                    {onRemove && (
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(removeImage({ file: file, id: varIndex }))
                        }
                        sx={{
                          top: 6,
                          p: "2px",
                          right: 6,
                          position: "absolute",
                          color: "common.white",
                          bgcolor: (theme) =>
                            alpha(theme.palette.grey[900], 0.72),
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
                );
              }
            })
          : ""}

        {files.map((file, index) => {
          const { key, name, size, preview } = getFileData(file, index);

          if (showPreview) {
            return (
              <ListItem
                key={key}
                component={m.div}
                {...varFade().inLeft}
                sx={{
                  p: 0,
                  m: 0.5,
                  width: 80,
                  height: 80,
                  borderRadius: 1.25,
                  overflow: "hidden",
                  position: "relative",
                  display: "inline-flex",
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >
                <Image alt="preview" src={preview} ratio="1/1" />
                <IconButton
                  size="small"
                  sx={{
                    top: 6,
                    p: "2px",
                    left: 6,
                    cursor: "context-menu",
                    position: "absolute",
                    color: "common.white",
                    backgroundColor: "#80000099",
                  }}
                >
                  <Iconify icon="ci:cloud-close" />
                </IconButton>

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
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
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
            );
          }
        })}
      </AnimatePresence>
    </List>
  );
}
