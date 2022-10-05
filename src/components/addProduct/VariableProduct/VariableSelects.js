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
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import Iconify from "../../Iconify";
import { useSelector } from "react-redux";
import { TrashIcon } from "../../Icons";

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" },
  { name: "Red", hex: "#d51919" },
  { name: "Green", hex: "#00AB55" },
  { name: "Blue", hex: "#076be7" },
  { name: "Yellow", hex: "#ffc800e3" },
];

const techSpecsItems = [
  { name: "Screen Size", value: "screenSize" },
  { name: "Screen Resolution", value: "screenResolution" },
  { name: "Processor", value: "processor" },
  { name: "RAM", value: "ram" },
  { name: "Storage", value: "storage" },
  { name: "Battery", value: "battery" },
  { name: "Camera", value: "camera" },
  { name: "OS", value: "os" },
];

export default function VariableSelects({ formik, techSpecs }) {
  const product = useSelector((state) => state.product.product);

  const { category, subcategory } = product;

  function handleAddTechSpecs() {
    formik.setFieldValue("techSpecs", [
      ...formik.values.techSpecs,
      { name: "", value: [] },
    ]);
  }
  function handleAddSubValue(index) {
    formik.setFieldValue(`techSpecs[${index}].value`, [
      ...formik.values.techSpecs[index].value,
      "",
    ]);
  }
  function handleRemoveTechSpecs(index) {
    formik.setFieldValue(
      "techSpecs",
      formik.values.techSpecs.filter((item, i) => i !== index)
    );
  }
  function handleRemoveSubValue(index, subIndex) {
    formik.setFieldValue(
      `techSpecs[${index}].value`,
      formik.values.techSpecs[index].value.filter((item, i) => i !== subIndex)
    );
  }
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
        sx={{ mt: 5, mb: 5 }}
      >
        <Typography variant="body1" sx={{ width: "100%", maxWidth: "20%" }}>
          Mavjud ranglar
        </Typography>

        {/* <form onSubmit={formik.handleSubmit}> */}
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
              <MenuItem key={color.hex} value={{color}}>
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
        <Box sx={{ display: "flex" }}>
          <Stack direction="row" spacing={0.5}>
            {formik.values.colors.map((color, i) => (
              <Box
                key={i}
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

        {/* <Button
          variant="outlined"
          type="submit"
          startIcon={<Iconify icon="akar-icons:circle-plus-fill" />}
        >
          Rang Qo'shish
        </Button> */}
      </Stack>
      <Divider />
      <Stack
        sx={{ mt: 6, mb: 6 }}
        direction="row"
        alignItems="flex-start"
        spacing={2}
      >
        <Typography variant="body1" sx={{ width: "100%", maxWidth: "20%" }}>
          O'zgaruvchan parametrlar
        </Typography>

        <Stack direction="column" alignItems="flex-start" spacing={2}>
          {techSpecs.map((_, index) => (
            <Stack direction="row" key={index} alignItems="center" spacing={2}>
              <IconButton
                aria-label="delete"
                size="large"
                color="error"
                onClick={() => handleRemoveTechSpecs(index)}
              >
                <Iconify icon="ep:delete" />
              </IconButton>
              <FormControl sx={{ width: 300 }}>
                <Select
                  name={`techSpecs.${index}.name`}
                  id={`techSpecs.${index}.name`}
                  value={techSpecs[index].name}
                  onChange={formik.handleChange}
                  // displayEmpty
                  // inputProps={{ "aria-label": "Without label" }}
                >
                  {techSpecsItems.map((item, i) => (
                    <MenuItem key={i} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack
                flexWrap="wrap"
                direction="row"
                alignItems="center"
                spacing={1}
              >
                {techSpecs[index].value.map((_, i) => (
                  <TextField
                    key={i}
                    fullWidth
                    sx={{ width: 200 }}
                    name={`techSpecs.${index}.value.${i}`}
                    id={`techSpecs.${index}.value.${i}`}
                    placeholder="1GB, 15.6 inch, 1.6GHz, 16GB, 1TB"
                    value={techSpecs[index].value[i]}
                    onChange={formik.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="primary"
                            onClick={() => handleRemoveSubValue(index, i)}
                          >
                            <TrashIcon width="16" height="16" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    // error={formik.touched.nameuz && Boolean(formik.errors.nameuz)}
                    // helperText={formik.touched.nameuz && formik.errors.nameuz}
                  />
                ))}
              </Stack>
              <IconButton
                aria-label="delete"
                size="medium"
                color="primary"
                onClick={() => handleAddSubValue(index)}
              >
                <Iconify icon="akar-icons:circle-plus-fill" />
              </IconButton>
            </Stack>
          ))}
          <Button
            variant="outlined"
            startIcon={<Iconify icon="akar-icons:circle-plus-fill" />}
            onClick={() => handleAddTechSpecs()}
          >
            Yangi parametr qo'shish
          </Button>
        </Stack>
      </Stack>
      <Divider />
    </>
  );
}
