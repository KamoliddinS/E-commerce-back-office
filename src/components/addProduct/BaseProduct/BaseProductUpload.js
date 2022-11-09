import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { UploadMultiFile } from "../../upload";
import { useSelector } from "react-redux";

export default function BaseProduct({
  handleDropMultiFile,
  handleRemove,
  files,
  onUpload,
}) {
  const [preview, setPreview] = useState(true);
  const imagesApi = useSelector((state) => state.productEdit.product.images);

  //upload multiple images with axios

  return (
    <>
      <Box sx={{ width: "50%" }}>
        <Typography variant="h5" gutterBottom>
          Rasm Qo'shish
        </Typography>
        <UploadMultiFile
          showPreview={preview}
          files={files}
          imagesApi={imagesApi}
          onUpload={onUpload}
          onDrop={handleDropMultiFile}
          onRemove={handleRemove}
        />
      </Box>
    </>
  );
}
