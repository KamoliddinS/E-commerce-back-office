import { useDropzone } from "react-dropzone";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
//
import RejectionFiles from "./RejectionFiles";
import MultiFilePreview from "./MultiFilePreview";
import VariationUploadButton from "./VariationUploadButton";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  padding: 5,
  width: 80,
  height: 80,
  display: "flex",
  alignItems: "center",
  paddingTop: 10,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ----------------------------------------------------------------------

export default function UploadVariationImages({
  error,
  showPreview = true,
  files,
  onRemove,
  imagesApi,
  varIndex,
  helperText,
  sx,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    ...other,
  });

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <Stack direction="row" alignItems="center">
        <MultiFilePreview
          imagesApi={imagesApi}
          files={files}
          varIndex={varIndex}
          showPreview={showPreview}
          onRemove={onRemove}
        />
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
          <VariationUploadButton />
        </DropZoneStyle>
      </Stack>
      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      {helperText && helperText}
    </Box>
  );
}
