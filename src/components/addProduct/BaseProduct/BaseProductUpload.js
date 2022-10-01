import React, { useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { UploadMultiFile } from "../upload";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addImages } from "../../../redux/slices/productSlice";

export default function BaseProduct({ handleNext }) {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(true);

  const [files, setFiles] = useState([]);

  console.log(["somevalue"].toString());

  console.log({ name: "kamoliddin" }.toString());

  console.log(typeof "someString");
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
  //upload multiple images with axios
  const uploadImages = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    try {
      const res = await axios.post(
        "https://realsoft-e-commerce.herokuapp.com/api/products/user/upload_photos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const { fileName, filePath } = res.data;
      dispatch(addImages(res.data.result));
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
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
          onUpload={uploadImages}
          onDrop={handleDropMultiFile}
          onRemove={handleRemove}
        />
      </Box>
    </>
  );
}
