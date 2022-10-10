// add shop modal
import React, { useState, useCallback } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import {createShop} from '../../redux/slices/shopSlice';
// import { addShop } from "../../redux/slices/shopSlice";
import { useTranslation } from "react-i18next";
// formik
import { useFormik } from "formik";
import * as yup from "yup";
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
// components
import { UploadAvatar } from "../upload";

export default function AddShopModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const token = useSelector((state) => state.user.data.token);
  const [avatar, setAvatar] = useState("");

  const validationSchema = yup.object({
    name: yup.string("Enter your name").required("Name is required"),
    zip: yup.string("Enter your name").required("Name is required"),
    region: yup.string("Enter your name").required("Name is required"),
    district: yup.string("Enter your name").required("Name is required"),
    street: yup.string("Enter your name").required("Name is required"),
    room: yup.string("Enter your name").required("Name is required"),
    home: yup.string("Enter your name").required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      zip: "",
      region: "",
      district: "",
      street: "",
      room: "",
      home: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        // create form data with values data
        const formData = new FormData();
    
        formData.append("name", values.name);
        formData.append("zip", values.zip);
        formData.append("region", values.region);
        formData.append("district", values.district);
        formData.append("street", values.street);
        formData.append("room", values.room);
        formData.append("home", values.home);
        formData.append("image", avatar);
        
        // log data from formData
        
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + JSON.stringify(pair[1])); 
        // }
        dispatch(createShop(token, formData));
        
    },
  });


  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setAvatar(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
      console.log(avatar);
    },
    [avatar]
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle sx={{ textAlign: "center" }}>{t("shop.add")}</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <UploadAvatar
            onDrop={handleDrop}
            accept={{ "image/*": [] }}
            file={avatar}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t("shop.name")}
            type="text"
            fullWidth
            value={formik.values.name}
            name="name"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.errors.name}
            onChange={formik.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t("shop.zip_code")}
            type="text"
            fullWidth
            value={formik.values.zip}
            name="zip"
            error={formik.touched.zip && Boolean(formik.errors.zip)}
            helperText={formik.errors.zip}
            onChange={formik.handleChange}
          />
          <Stack direction="row" spacing={2} mt={2}>
            <FormControl fullWidth>
              <InputLabel id="type">{t("shop.region")}</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={formik.values.region}
                name="region"
                error={formik.touched.region && Boolean(formik.errors.region)}
                label={t("shop.region")}
                onChange={formik.handleChange}
              >
                <MenuItem value="online">shop.online</MenuItem>
                <MenuItem value="offline">shop.offline</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="type">{t("shop.district")}</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={formik.values.district}
                name="district"
                error={
                  formik.touched.district && Boolean(formik.errors.district)
                }
                label={t("shop.district")}
                onChange={formik.handleChange}
              >
                <MenuItem value="online">shop.online</MenuItem>
                <MenuItem value="offline">shop.offline</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="type">{t("shop.street")}</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={formik.values.street}
                name="street"
                error={formik.touched.street && Boolean(formik.errors.street)}
                label={t("shop.street")}
                onChange={formik.handleChange}
              >
                <MenuItem value="online">shop.online</MenuItem>
                <MenuItem value="offline">shop.offline</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2} mt={2}>
            <TextField
              autoFocus
              id="name"
              label={t("shop.apartment_number")}
              type="text"
              fullWidth
              value={formik.values.room}
              name="room"
              error={formik.touched.room && Boolean(formik.errors.room)}
              helperText={formik.errors.room}
              onChange={formik.handleChange}
            />
            <TextField
              autoFocus
              id="name"
              label={t("shop.house_number")}
              type="text"
              fullWidth
              value={formik.values.home}
              name="home"
              error={formik.touched.home && Boolean(formik.errors.home)}
              helperText={formik.errors.home}
              onChange={formik.handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("cancel")}</Button>
          <Button type="submit">{t("shop.add")}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
