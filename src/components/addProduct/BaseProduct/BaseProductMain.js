import React from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { UzbekIcon, RusIcon } from "../../Icons";
export default function BaseProductMain({ formik, categories }) {
  // function customHandleChange(e, field, other) {
  //   formik.setFieldValue(field, e.target.value);
  // }
  return (
    <>
      <Box sx={{ width: "50%", marginRight: 5 }}>
        <Typography variant="h5" gutterBottom></Typography>
        <Box
          sx={{
            "& .MuiTextField-root": { width: "100%" },
            "& .MuiFormControl-root": { width: "100%" },
            "& .MuiTypography-root": { marginTop: 1 },
          }}
        >
          <div>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" gutterBottom>
                Mahsulot nomi
              </Typography>
              <UzbekIcon width={14} height={14} />
            </Stack>
            <TextField
              fullWidth
              name={`name`}
              placeholder="Changyutgich"
              value={formik.values.name}
              onChange={formik.handleChange}
              // error={
              //   formik.touched.Object.keys(formik.values.name)[0] &&
              //   Boolean(formik.errors.Object.keys(formik.values.name)[0])
              // }
              // helperText={
              //   formik.touched.Object.keys(formik.values.name)[0] &&
              //   formik.errors.Object.keys(formik.values.name)[0]
              // }
            />
            {/* <TextField
              required
              id="outlined-required"
              placeholder="Changyutgich"
            /> */}
          </div>
          {/* <div>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" gutterBottom>
                Mahsulot nomi (Rus Tilida)
              </Typography>
              <RusIcon width={14} height={14} />
            </Stack>
            <TextField
              fullWidth
              name={`name.ru`}
              placeholder="Changyutgich"
              value={formik.values.name.ru}
              onChange={formik.handleChange}
              // error={
              //   formik.touched.Object.keys(formik.values.name)[0] &&
              //   Boolean(formik.errors.Object.keys(formik.values.name)[0])
              // }
              // helperText={
              //   formik.touched.Object.keys(formik.values.name)[0] &&
              //   formik.errors.Object.keys(formik.values.name)[0]
              // }
            />
          </div> */}
          <div>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" gutterBottom>
                Tavsif
              </Typography>
              <UzbekIcon width={14} height={14} />
            </Stack>
            <TextField
              fullWidth
              name="description"
              placeholder="Par dazmol ishlatish uchun qulay va sifatli. Par dazmol sifatli va kafolatlangan bepul xizmatlarimiz bir oygacha yetkazib beramiz  va ishlatib ko`rsatamiz"
              value={formik.values.description}
              onChange={formik.handleChange}
              // error={
              //   formik.touched.descriptionuz &&
              //   Boolean(formik.errors.descriptionuz)
              // }
              // helperText={
              //   formik.touched.descriptionuz && formik.errors.descriptionuz
              // }
            />
          </div>
          {/* <div>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" gutterBottom>
                Tavsif (Rus Tilida)
              </Typography>
              <RusIcon width={14} height={14} />
            </Stack>
            <TextField
              fullWidth
              id="description.ru"
              name="description.ru"
              placeholder="Утюг прост в использовании и хорошего качества. Предоставляем качественное и гарантированно бесплатное обслуживание парового утюга на срок до одного месяца"
              value={formik.values.description.ru}
              onChange={(e) => customHandleChange(e, "description.ru")}
              // error={
              //   formik.touched.descriptionru &&
              //   Boolean(formik.errors.descriptionru)
              // }
              // helperText={
              //   formik.touched.descriptionru && formik.errors.descriptionru
              // }
            />
          </div> */}
          <div>
            <Typography variant="body2" gutterBottom>
              Toifa
            </Typography>
            <FormControl sx={{}}>
              <Select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                {categories.map((item, i) => (
                  <MenuItem key={i} value={item.category}>
                    {item.category}
                  </MenuItem>
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
                name="subCategory"
                value={formik.values.subСategory}
                onChange={formik.handleChange}
              >
                {categories.map((item, i) => (
                  <MenuItem key={i} value={item.category}>
                    {item.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
      </Box>
    </>
  );
}
