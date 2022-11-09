import React, { useState, useCallback } from "react";
import { alpha } from "@mui/material/styles";
import { m, AnimatePresence } from "framer-motion";
import { varFade } from "../../animate";
import {
  deleteVariation,
  changeVariation,
  deleteVariationImage,
  addVariationmages,
} from "../../../redux/slices/productEditSlice";
import {
  Accordion,
  Chip,
  Box,
  TextField,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Badge,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fCurrency } from "../../../utils/formatNumber";
import Iconify from "../../Iconify";
import { useSelector, useDispatch } from "react-redux";
import { UploadVariationImages } from "../../upload";
import { uploadPhoto } from "../../../helpers/uploadPhoto";
import { useEffect } from "react";

export default function VariationItem({ index, item, onDelete, token, pId }) {
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            productId: pId,
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

  function handleChangeVariation(index, prop, value) {
    dispatch(changeVariation({ index, prop, value }));
  }

  function handleUpload(index) {
    uploadPhoto(files).then((uploaded) => {
      setFiles([]);
      dispatch(addVariationmages({ data: uploaded, index: index }));
    });
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to remove this variation?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack
              direction="row"
              spacing={2}
              mt={2}
              mb={0}
              alignItems="center"
            >
              <Box
                component="img"
                sx={{ width: "50px", mr: 1 }}
                src={item.images[0]}
              />
              {item.dimensions.map((item, i) => (
                <Chip
                  key={i}
                  label={Object.values(item)[0].title}
                  size="medium"
                  sx={{ mr: 1 }}
                />
              ))}
            </Stack>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Narx: {fCurrency(item.price)} sum
            </Typography>
            <Typography variant="body2">
              Mavjud tovar soni: {fCurrency(item.stock)} dona
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions p={0} sx={{}}>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              onDelete({ token, pId: pId, vId: item._id });
              dispatch(deleteVariation(item._id));
              handleClose();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Accordion
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
        sx={
          expanded === `panel${index}`
            ? { border: "1px solid #54545426", mb: 2, mt: 2 }
            : {}
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Box
            component="img"
            sx={{ width: "32px", mr: 1, borderRadius: "5px" }}
            src={item.images[0]}
          />
          <Typography sx={{ width: "20%", flexShrink: 0 }}>
            {item.dimensions.map((item, i) => (
              <Chip
                key={i}
                label={Object.values(item)[0].title}
                size="medium"
                sx={{ mr: 1 }}
              />
            ))}
          </Typography>
          <Typography sx={{ color: "text.secondary", width: "20%" }}>
            Narx: {fCurrency(item.price)} sum
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Mavjud tovar soni: {fCurrency(item.stock)} dona
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
            <Stack direction="column" width="13%" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 0 }}>
                Narx
              </Typography>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue="Small"
                onChange={(e) => {
                  handleChangeVariation(index, "price", e.target.value);
                }}
                variant="filled"
                size="small"
                value={item.price}
              />
            </Stack>
            <Stack direction="column" width="13%" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 0 }}>
                Mavjud tovar soni
              </Typography>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                variant="filled"
                onChange={(e) => {
                  handleChangeVariation(index, "stock", e.target.value);
                }}
                size="small"
                value={item.stock}
              />
            </Stack>
            <Stack direction="column" width="13%" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 0 }}>
                Barcode
              </Typography>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue="0"
                variant="filled"
                onBlur={(e) => {
                  handleChangeVariation(index, "barcode", e.target.value);
                }}
                size="small"
                value={item.barcode}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
            <Stack direction="column" width="13%" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 0 }}>
                ИКПУ
              </Typography>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue="0"
                variant="filled"
                size="small"
                onBlur={(e) => {
                  handleChangeVariation(index, "identityCode", e.target.value);
                }}
                value={item.identityCode}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
            <Stack direction="column" width="13%" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 0 }}>
                Chegirma
              </Typography>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue="0"
                variant="filled"
                // onChange={(e) => {}}
                onBlur={(e) => {
                  handleChangeVariation(index, "discount", e.target.value);
                }}
                size="small"
                //   value={item.price}
              />
            </Stack>
            <Stack direction="column" width="13%" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 0 }}>
                Sotuvdagi narx
              </Typography>
              <TextField
                hiddenLabel
                InputProps={{
                  readOnly: true,
                }}
                onBlur={(e) => {
                  handleChangeVariation(index, "priceSale", e.target.value);
                }}
                id="filled-hidden-label-small"
                defaultValue="0"
                variant="filled"
                size="small"
                value={item.priceSale}
              />
            </Stack>
            <Stack direction="column" width="13%" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 0 }}>
                1 dona uchun komissiya
              </Typography>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue="0"
                InputProps={{
                  readOnly: true,
                }}
                onBlur={(e) => {
                  handleChangeVariation(index, "commission", e.target.value);
                }}
                variant="filled"
                size="small"
                value={item.commission}
              />
            </Stack>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            mt={2}
          >
            <UploadVariationImages
              imagesApi={item.images}
              onDrop={handleDropMultiFile}
              varIndex={index}
              files={files}
              onRemove={handleRemove}
            />

            <Button
              color="primary"
              variant="outlined"
              disabled={files.length === 0}
              startIcon={<Iconify icon="bx:upload" />}
              onClick={() => handleUpload(index)}
            >
              <Badge badgeContent={files.length} color="primary">
                Upload
              </Badge>
            </Button>
            <Button
              color="error"
              variant="outlined"
              startIcon={<Iconify icon="fluent:delete-24-regular" />}
              onClick={() => handleClickOpen()}
            >
              Delete
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
