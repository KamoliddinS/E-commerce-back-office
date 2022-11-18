import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
//
import BlockContent from "./BlockContent";
import RejectionFiles from "./RejectionFiles";
import MultiFilePreview from "./MultiFilePreview";
import EditModeButton from "./VariationUploadButton";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  padding: 0,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ----------------------------------------------------------------------

UploadMultiFile.propTypes = {
  files: PropTypes.array.isRequired,
  error: PropTypes.bool,
  showPreview: PropTypes.bool,
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function UploadMultiFile({
  error,
  showPreview = true,
  files,
  onUpload,
  onRemove,
  onRemoveAll,
  imagesApi,
  helperText,
  sx,
  ...other
}) {
  const editMode = useSelector((state) => state.productEdit.editMode);
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

      <MultiFilePreview
        imagesApi={imagesApi}
        files={files}
        showPreview={showPreview}
        onRemove={onRemove}
      />

      {helperText && helperText}
    </Box>
  );
}
