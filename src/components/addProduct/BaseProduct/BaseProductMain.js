import React from "react";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addBaseProduct } from "../../../redux/slices/addProductSlice";
import { onNextStep } from "../../../redux/slices/addProductSlice";

import { useFormik } from "formik";
import * as yup from "yup";

export default function BaseProductMain() {
  const dispatch = useDispatch();
  // const validationSchema = yup.object({
  //   nameuz: yup
  //     .string("Enter your email")
  //     .email("Enter a valid email")
  //     .required("Email is required"),
  //   password: yup
  //     .string("Enter your password")
  //     .min(8, "Password should be of minimum 8 characters length")
  //     .required("Password is required"),
  // });

  const formik = useFormik({
    initialValues: {
      nameuz: "",
      nameru: "",
      infouz: "",
      inforu: "",
      descriptionuz: "",
      descriptionru: "",
      category: "",
      subcategory: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addBaseProduct(values));
    },
  });

  const categories = [
    {
      id: 1,
      category: "Movies",
    },
    {
      id: 2,
      category: "Jewelry",
    },
    {
      id: 3,
      category: "Home",
    },
    {
      id: 4,
      category: "Movies",
    },
    {
      id: 5,
      category: "Industrial",
    },
  ];
  return (
    <>
      <Box sx={{ width: "50%", marginRight: 5 }}>
        <Typography variant="h5" gutterBottom>
          Ma'lumot Qo'shish
        </Typography>
        <Box
          sx={{
            "& .MuiTextField-root": { width: "100%" },
            "& .MuiFormControl-root": { width: "100%" },
            "& .MuiTypography-root": { marginTop: 1 },
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div>
              <Typography variant="body2" gutterBottom>
                Mahsulot nomi
              </Typography>
              <TextField
                fullWidth
                id="nameuz"
                name="nameuz"
                placeholder="Changyutgich"
                value={formik.values.nameuz}
                onChange={formik.handleChange}
                error={formik.touched.nameuz && Boolean(formik.errors.nameuz)}
                helperText={formik.touched.nameuz && formik.errors.nameuz}
              />
              {/* <TextField
              required
              id="outlined-required"
              placeholder="Changyutgich"
            /> */}
            </div>
            <div>
              <Typography variant="body2" gutterBottom>
                Mahsulot nomi (Rus Tilida)
              </Typography>
              <TextField
                fullWidth
                id="nameru"
                name="nameru"
                placeholder="Пылесос"
                value={formik.values.nameru}
                onChange={formik.handleChange}
                error={formik.touched.nameru && Boolean(formik.errors.nameru)}
                helperText={formik.touched.nameru && formik.errors.nameru}
              />
            </div>
            <div>
              <Typography variant="body2" gutterBottom>
                Malumot
              </Typography>
              <TextField
                fullWidth
                id="infouz"
                name="infouz"
                placeholder="O'lchov birligi. Eng kam miqdori. Amal qilish muddati"
                value={formik.values.infouz}
                onChange={formik.handleChange}
                error={formik.touched.infouz && Boolean(formik.errors.infouz)}
                helperText={formik.touched.infouz && formik.errors.infouz}
              />
            </div>
            <div>
              <Typography variant="body2" gutterBottom>
                Malumot (Rus Tilida)
              </Typography>
              <TextField
                fullWidth
                id="inforu"
                name="inforu"
                placeholder="Единица измерения. Минимальная сумма. Срок годности"
                value={formik.values.inforu}
                onChange={formik.handleChange}
                error={formik.touched.inforu && Boolean(formik.errors.inforu)}
                helperText={formik.touched.infouz && formik.errors.inforu}
              />
            </div>
            <div>
              <Typography variant="body2" gutterBottom>
                Tavsif
              </Typography>
              <TextField
                fullWidth
                id="descriptionuz"
                name="descriptionuz"
                placeholder="Par dazmol ishlatish uchun qulay va sifatli. Par dazmol sifatli va kafolatlangan bepul xizmatlarimiz bir oygacha yetkazib beramiz  va ishlatib ko`rsatamiz"
                value={formik.values.descriptionuz}
                onChange={formik.handleChange}
                error={
                  formik.touched.descriptionuz &&
                  Boolean(formik.errors.descriptionuz)
                }
                helperText={
                  formik.touched.descriptionuz && formik.errors.descriptionuz
                }
              />
            </div>
            <div>
              <Typography variant="body2" gutterBottom>
                Tavsif (Rus Tilida)
              </Typography>
              <TextField
                fullWidth
                id="descriptionru"
                name="descriptionru"
                placeholder="Утюг прост в использовании и хорошего качества. Предоставляем качественное и гарантированно бесплатное обслуживание парового утюга на срок до одного месяца"
                value={formik.values.descriptionru}
                onChange={formik.handleChange}
                error={
                  formik.touched.descriptionru &&
                  Boolean(formik.errors.descriptionru)
                }
                helperText={
                  formik.touched.descriptionru && formik.errors.descriptionru
                }
              />
            </div>
            <div>
              <Typography variant="body2" gutterBottom>
                Toifa
              </Typography>
              <FormControl sx={{}}>
                <Select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {categories.map((item) => (
                    <MenuItem value={item.category}>{item.category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <Typography variant="body2" gutterBottom>
                Sub Toifa
              </Typography>
              <FormControl sx={{}}>
                <Select
                  name="subcategory"
                  value={formik.values.subcategory}
                  onChange={formik.handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {categories.map((item) => (
                    <MenuItem value={item.category}>{item.category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <Button type="submit">Submit</Button>
            <Button onClick={() => dispatch(onNextStep())}>Next Step</Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
