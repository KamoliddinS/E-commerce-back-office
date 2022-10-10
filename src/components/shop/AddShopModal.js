// add shop modal
import React, { useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// import { addShop } from "../../redux/slices/shopSlice";
import { useTranslation } from "react-i18next";
// @mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

export default function AddShopModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const token = useSelector((state) => state.user.token);
  const [name, setName] = useState("");
  const [type, setType] = useState("online");

  const handleSubmit = () => {
    // dispatch(addShop({ name, type }, token))
    //     .then((res) => {
    //         enqueueSnackbar(t("shop.added"), {
    //             variant: "success",
    //         });
    //         handleClose();
    //     })
    //     .catch((err) => {
    //         enqueueSnackbar(t("shop.addError"), {
    //             variant: "error",
    //         });
    //     });
    console.log("added shop");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t("shop.add")}</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={t("shop.name")}
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={t("shop.zip_code")}
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Stack direction="row" spacing={2} mt={2}>
          <FormControl fullWidth>
            <InputLabel id="type">{t("shop.type")}</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={type}
              label={t("shop.region")}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="online">{t("shop.online")}</MenuItem>
              <MenuItem value="offline">{t("shop.offline")}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="type">{t("shop.type")}</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={type}
              label={t("shop.district")}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="online">{t("shop.online")}</MenuItem>
              <MenuItem value="offline">{t("shop.offline")}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="type">{t("shop.type")}</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={type}
              label={t("shop.street")}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="online">{t("shop.online")}</MenuItem>
              <MenuItem value="offline">{t("shop.offline")}</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t("shop.house_number")}
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

<TextField
            autoFocus
            margin="dense"
            id="name"
            label={t("shop.apartment_number")}
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("cancel")}</Button>
        <Button onClick={handleSubmit}>{t("shop.add")}</Button>
      </DialogActions>
    </Dialog>
  );
}
