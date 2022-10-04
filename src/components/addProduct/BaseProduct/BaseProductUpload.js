import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { UploadMultiFile } from "../upload";

export default function BaseProduct({
  handleDropMultiFile,
  handleRemove,
  handleUpload,
  files,
}) {
  const [preview, setPreview] = useState(true);

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
          onUpload={handleUpload}
          onDrop={handleDropMultiFile}
          onRemove={handleRemove}
        />
      </Box>
    </>
  );
}
