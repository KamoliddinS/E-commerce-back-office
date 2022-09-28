import React from "react";
import {
  Typography,
  Breadcrumbs,
  Divider,
  Box,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import Iconify from "../../Iconify";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { addVariableProduct } from "../../../redux/slices/addProductSlice";

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" },
  { name: "Red", hex: "#d51919" },
  { name: "Green", hex: "#00AB55" },
  { name: "Blue", hex: "#076be7" },
  { name: "Yellow", hex: "#ffc800e3" },
];

export default function VariableSelects() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      colors: [],
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addVariableProduct(values));
    },
  });
  const category = useSelector(
    (state) => state.addProduct.baseProduct.category
  );
  const subcategory = useSelector(
    (state) => state.addProduct.baseProduct.subcategory
  );

  const breadcrumbs = [
    <Typography key="3" color="text.primary">
      {category}
    </Typography>,
    <Typography key="3" color="text.primary">
      {subcategory}
    </Typography>,
  ];
  return (
    <>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Mahsulot toifasi
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Breadcrumbs
          separator={<Iconify icon="mdi:chevron-right" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Typography>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 5 }}
      >
        {console.log(formik.values.colors)}
        <Typography variant="body1">Mavjud ranglar</Typography>
        <Box sx={{ display: "flex" }}>
          <Stack direction="row" spacing={0.5}>
            {formik.values.colors.map((color) => (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  display: "flex",
                  borderRadius: "50%",
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: color,
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 8px 16px 0 rgb(0 0 0 / 15%)",
                  transition: (theme) =>
                    theme.transitions.create("all", {
                      duration: theme.transitions.duration.shortest,
                    }),
                }}
              ></Box>
            ))}
          </Stack>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Ranglar</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              name="colors"
              value={formik.values.colors}
              onChange={formik.handleChange}
              input={<OutlinedInput label="Ranglar" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {colors.map((color) => (
                <MenuItem key={color.name} value={color.hex}>
                  <Checkbox
                    checked={formik.values.colors.indexOf(color.hex) > -1}
                  />
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex" }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            display: "flex",
                            borderRadius: "50%",
                            position: "relative",
                            marginRight: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: color.hex,
                            border: "1px solid #e0e0e0",
                            boxShadow: "0 8px 16px 0 rgb(0 0 0 / 15%)",
                            transition: (theme) =>
                              theme.transitions.create("all", {
                                duration: theme.transitions.duration.shortest,
                              }),
                          }}
                        ></Box>
                        <Typography>{color.name}</Typography>
                      </Box>
                    }
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            type="submit"
            startIcon={<Iconify icon="akar-icons:circle-plus-fill" />}
          >
            Rang Qo'shish
          </Button>
        </form>
      </Stack>
    </>
  );
}
