import React, { useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { UploadMultiFile } from "../../upload";

export default function BaseProduct() {
  const [preview, setPreview] = useState(true);

  const [files, setFiles] = useState([]);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };
  return (
    <>
      <Box sx={{ width: "50%" }}>
        <Typography variant="h5" gutterBottom>
          Rasm Qo'shish
        </Typography>
        <UploadMultiFile
          showPreview={preview}
          files={files}
          onDrop={handleDropMultiFile}
          onRemove={handleRemove}
        />
      </Box>
    </>
  );
}
