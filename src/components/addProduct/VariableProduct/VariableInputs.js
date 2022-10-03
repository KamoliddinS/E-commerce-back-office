import React from "react";
import {
  Typography,
  TextField,
  Stack,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

export default function VariableSelects({ formik, companies }) {
  return (
    <>
      <Stack
        direction="row"
        sx={{ marginTop: 5 }}
        spacing={2}
        alignItems="center"
      >
        <Typography
          width={190}
          variant="body1"
          sx={{ width: "100%", maxWidth: "20%" }}
        >
          Brend
        </Typography>
        <Autocomplete
          id="brand"
          name="brand"
          options={companies}
          value={formik.values.brand}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          // getOptionLabel={(option) => option.lable}
          style={{ width: 300 }}
          onChange={(e, value) => {
            formik.setFieldValue("brand", value !== null ? value : "no brand");
          }}
          renderInput={(params) => (
            <TextField
              margin="normal"
              label="Brand"
              fullWidth
              name="brand"
              {...params}
            />
          )}
        />

        <FormControlLabel
          control={<Checkbox defaultunchecked="true" />}
          label="Mavjud emas"
        />
        {/* <TextField
          id="nameuz"
          sx={{ width: "30%" }}
          name="nameuz"
          placeholder="Changyutgich"
          value={formik.values.nameuz}
          onChange={formik.handleChange}
          error={formik.touched.nameuz && Boolean(formik.errors.nameuz)}
          helperText={formik.touched.nameuz && formik.errors.nameuz}
        /> */}
      </Stack>
      <Stack
        direction="row"
        sx={{ marginTop: 1 }}
        spacing={2}
        alignItems="center"
      >
        <Typography
          width={190}
          variant="body1"
          sx={{ width: "100%", maxWidth: "20%" }}
        >
          Model
        </Typography>

        <TextField
          id="model"
          sx={{ width: "30%" }}
          name="model"
          placeholder="Galaxy S21, IPhone 14 Pro Max, Macbook Air 2021"
          value={formik.values.model}
          onChange={formik.handleChange}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}
        />
      </Stack>
      <Stack
        direction="row"
        sx={{ marginTop: 2 }}
        spacing={2}
        alignItems="center"
      >
        <Typography
          width={190}
          variant="body1"
          sx={{ width: "100%", maxWidth: "20%" }}
        >
          Ishlab chiqarilgan yili
        </Typography>

        <TextField
          id="madeIn"
          sx={{ width: "30%" }}
          name="madeIn"
          placeholder="2022"
          value={formik.values.madeIn}
          onChange={formik.handleChange}
          error={formik.touched.madeIn && Boolean(formik.errors.madeIn)}
          helperText={formik.touched.madeIn && formik.errors.madeIn}
        />
      </Stack>
      <Stack
        direction="row"
        sx={{ marginTop: 2 }}
        spacing={2}
        alignItems="center"
      >
        <Typography
          width={190}
          variant="body1"
          sx={{ width: "100%", maxWidth: "20%" }}
        >
          Kafolat muddati
        </Typography>

        <TextField
          id="warranty"
          sx={{ width: "30%" }}
          name="warranty"
          placeholder="1 yil, 6 oy, 2 xafta, 3 kun, 0"
          value={formik.values.warranty}
          onChange={formik.handleChange}
          error={formik.touched.warranty && Boolean(formik.errors.warranty)}
          helperText={formik.touched.warranty && formik.errors.warranty}
        />
      </Stack>
      {/* <Button type="submit">Submit</Button> */}
    </>
  );
}
