// add shop modal

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addShop } from "../../redux/slices/shopSlice";
import { useTranslation } from "react-i18next";
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
        console.log('added shop');
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{t("shop.add")}</DialogTitle>
            <DialogContent>
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
                <FormControl fullWidth>
                    <InputLabel id="type">{t("shop.type")}</InputLabel>
                    <Select
                        labelId="type"
                        id="type"
                        value={type}
                        label={t("shop.type")}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="online">{t("shop.online")}</MenuItem>
                        <MenuItem value="offline">{t("shop.offline")}</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t("cancel")}</Button>
                <Button onClick={handleSubmit}>{t("shop.add")}</Button>
            </DialogActions>
        </Dialog>
    );
}