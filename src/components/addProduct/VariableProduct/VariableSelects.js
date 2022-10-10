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
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" },
  { name: "Red", hex: "#d51919" },
  { name: "Green", hex: "#00AB55" },
  { name: "Blue", hex: "#076be7" },
  { name: "Yellow", hex: "#ffc800e3" },
];

const techSpecsItems = [
  { title: "Screen Size", value: "screenSize" },
  { title: "Screen Resolution", value: "screenResolution" },
  { title: "Processor", value: "processor" },
  { title: "RAM", value: "ram" },
  { title: "Storage", value: "storage" },
  { title: "Battery", value: "battery" },
  { title: "Camera", value: "camera" },
  { title: "OS", value: "os" },
];

// const techSpecsItems = [
//   "Screen Size",
//   "Screen Resolution",
//   "Processor",
//   "RAM",
//   "Storage",
//   "Battery",
//   "Camera",
//   "OS",
// ];
export default function VariableSelects({ formik, techSpecs }) {
  const product = useSelector((state) => state.product.product);
  const filter = createFilterOptions();
  const { category, subcategory } = product;

  function handleAddTechSpecs(techName, techTitle) {
    formik.setFieldValue("techSpecs", [
      ...techSpecs,
      { [techName]: [{ name: techTitle, title: "", value: "" }] },
    ]);
  }
  function handleAddSubValue(index, value, name) {
    value.push({ name: name.name, title: "", value: "" });
    formik.setFieldValue(`value[${index}]`, [
      ...value,
      { name: name.name, title: "", value: "" },
    ]);
  }
  function handleRemoveTechSpecs(index) {
    formik.setFieldValue(
      "techSpecs",
      techSpecs.filter((item, i) => i !== index)
    );
  }
  function handleUpdateTechSpecs(index, value) {
    const obj = {};
    if (value.value === undefined) {
      value.value = value.title;
    }
    obj[value.value] = [{ name: value.title, title: "", value: "" }];
    formik.setFieldValue(`techSpecs[${index}]`, obj);
  }
  function handleRemoveSub(index, array) {
    formik.setFieldValue("array", array.splice(index, 1));
  }
  function handleUpdateSubvalue(array, index, value) {
    console.log(array, index, value);
    formik.setFieldValue(`array[${index}].value`, value);
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
          {techSpecs.map((item, index) => (
            <>
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  onClick={() => handleRemoveTechSpecs(index)}
                >
                  <Iconify icon="ep:delete" />
                </IconButton>
                <Autocomplete
                  value={item[Object.keys(item)[0]][0].name}
                  // name="techSpecs"
                  isOptionEqualToValue={(option, value) =>
                    option.title === value
                  }
                  // onChange={formik.handleChange}
                  onChange={(event, newValue) => {
                    handleUpdateTechSpecs(index, newValue);
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.title
                    );
                    if (inputValue !== "" && !isExisting) {
                      filtered.push({
                        inputValue,
                        title: `${inputValue}`,
                      });
                    }

                    return filtered;
                  }}
                  // selectOnFocus
                  // clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={techSpecsItems}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                  }}
                  renderOption={(props, option) => (
                    <li {...props}>{option.title}</li>
                  )}
                  sx={{ width: 300 }}
                  // freeSolo
                  renderInput={(params) => (
                    <TextField type="text" {...params} />
                  )}
                />
                <Stack
                  flexWrap="wrap"
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  {item[Object.keys(item)[0]].map((subItem, i) => (
                    <>
                      <TextField
                        // key={i}
                        fullWidth
                        sx={{ width: 200 }}
                        name="subItem.title"
                        placeholder="1GB, 15.6 inch, 1.6GHz, 16GB, 1TB"
                        value={subItem.value}
                        onChange={(event, newValue) =>
                          handleUpdateSubvalue(
                            item[Object.keys(item)[0]],
                            i,
                            newValue
                          )
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="delete"
                                disabled={
                                  item[Object.keys(item)[0]].length === 1
                                }
                                size="small"
                                color="primary"
                                onClick={() =>
                                  handleRemoveSub(i, item[Object.keys(item)[0]])
                                }
                              >
                                <TrashIcon width="16" height="16" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {/* {console.log(subItem)} */}
                    </>
                  ))}
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    color="primary"
                    onClick={() =>
                      handleAddSubValue(
                        index,
                        item[Object.keys(item)[0]],
                        item[Object.keys(item)[0]][0]
                      )
                    }
                  >
                    <Iconify icon="akar-icons:circle-plus-fill" />
                  </IconButton>
                </Stack>
              </Stack>
            </>
          ))}

          {/* </Stack> */}
          <Button
            variant="outlined"
            startIcon={<Iconify icon="akar-icons:circle-plus-fill" />}
            onClick={() => handleAddTechSpecs("", "")}
          >
            Yangi parametr qo'shish
          </Button>
        </Stack>
      </Stack>
      <Divider />
    </>
  );
}
