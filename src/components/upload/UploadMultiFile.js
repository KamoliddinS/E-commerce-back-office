import { useDropzone } from "react-dropzone";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack, Button, Typography } from "@mui/material";
//
import BlockContent from "./BlockContent";
import RejectionFiles from "./RejectionFiles";
import MultiFilePreview from "./MultiFilePreview";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  // padding: theme.spacing(5, 1),
  // borderRadius: theme.shape.borderRadius,
  // backgroundColor: theme.palette.background.neutral,
  border: `2px dashed #6186AC`,
  "&:hover": { opacity: 0.5, transition: "0.2s", cursor: "pointer" },
  background: "#F5F6FA",
  borderRadius: "14px",
}));

// ----------------------------------------------------------------------

// UploadMultiFile.propTypes = {
//   files: PropTypes.array.isRequired,
//   error: PropTypes.bool,
//   showPreview: PropTypes.bool,
//   onUpload: PropTypes.func,
//   onRemove: PropTypes.func,
//   onRemoveAll: PropTypes.func,
//   helperText: PropTypes.node,
//   sx: PropTypes.object,
// };

export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onUpload,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  ...other
}) {
  function maxSize(file) {
    if (file.size > 5242880) {
      return {
        code: "rejected-file-too-large",
        message: `Reccomended size is 5MB`,
      };
    }

    return null;
  }
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    ...other,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    validator: maxSize,
  });

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />
      </DropZoneStyle>

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}
      <Box sx={{ marginTop: 1 }}>
        <Typography variant="subtitle1">Talablar</Typography>
        <Typography variant="body2" color="text.secondary" display="block">
          Format: PNG, JPEG, JPG. Tavsiya etilgan aniqlik 1920x1080
        </Typography>
        <Typography variant="body2" color="text.secondary" display="block">
          Hajmi: fayl hajmi 5 MB dan oshmasligi kerak
        </Typography>
        {/* <Typography variant="body2" color="text.secondary" display="block">
          Rasmlar turi: studiyada suratga olingan, tomonlar nisbati 4*3
        </Typography> */}
      </Box>
      <MultiFilePreview
        files={files}
        showPreview={showPreview}
        onRemove={onRemove}
      />

      {/* {files.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button size="small" variant="contained" onClick={onUpload}>
            Upload files
          </Button>
        </Stack>
      )} */}

      {helperText && helperText}
    </Box>
  );
}
