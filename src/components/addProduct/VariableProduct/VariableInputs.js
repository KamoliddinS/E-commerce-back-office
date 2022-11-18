import React, { useState } from "react";
import {
  Typography,
  TextField,
  Stack,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export default function VariableSelects({ formik, companies }) {
  const [brand, setbrand] = useState(false);

  const handleChange = (event) => {
    setbrand(event.target.checked);
  };

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
          disabled={brand}
          options={companies}
          getOptionDisabled={(option) => option.name === "Brend tanlanmagan"}
          autoHighlight={true}
          value={formik.values.brand}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          style={{ width: 300 }}
          onChange={(e, value) => {
            formik.setFieldValue(
              "brand",
              (value !== null ? value : "No Brand") ||
                (brand !== true ? (value = "No Brand") : "")
            );
          }}
          renderInput={(params) => (
            <TextField
              margin="normal"
              label="Brand"
              fullWidth
              value={formik.values.brand}
              name="brand"
              {...params}
            />
          )}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={brand}
              onChange={handleChange}
              defaultunchecked="true"
            />
          }
          label="Mavjud emas"
        />
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
