import React from "react";
import {
  Typography,
  Divider,
  Stack,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import Iconify from "../../Iconify";
import { useSelector } from "react-redux";
import { TrashIcon } from "../../Icons";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const techSpecsItems = [
  { title: "Screen Size", value: "screenSize" },
  { title: "Screen Resolution", value: "screenResolution" },
  { title: "Processor", value: "processor" },
  { title: "RAM", value: "ram" },
  { title: "Storage", value: "storage" },
  { title: "Battery", value: "battery" },
  { title: "Camera", value: "camera" },
  { title: "OS", value: "os" },
  { title: "Color", value: "color" },
];
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
    formik.setFieldValue(`techSpecs[${index}].${name}`, [
      ...value,
      { name: value[0].name, title: "", value: "" },
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
  function handleRemoveSubValue(index, subIndex, item) {
    formik.setFieldValue(
      `techSpecs[${index}].${item}`,
      techSpecs[index][item].filter((item, i) => i !== subIndex)
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

      <Divider />
      <Stack
        sx={{ mt: 6, mb: 6 }}
        direction="column"
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
                alignItems="flex-start"
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
                  isOptionEqualToValue={(option, value) =>
                    option.title === value
                  }
                  onChange={(event, newValue) => {
                    handleUpdateTechSpecs(index, newValue);
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
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
                  // spacing={1}
                >
                  {item[Object.keys(item)[0]].map((subItem, i) => (
                    <>
                      <Stack
                        direction="row"
                        sx={{
                          p: 1,
                          border: "1px #80808040 solid",
                          borderRadius: 1,
                          mr: 1,
                          mb: 1,
                        }}
                        spacing={1}
                      >
                        <TextField
                          key={i}
                          size="small"
                          placeholder="Title"
                          name={`techSpecs[${index}].${
                            Object.keys(item)[0]
                          }[${i}].title`}
                          sx={{ width: 100 }}
                          value={subItem.title}
                          onChange={formik.handleChange}
                        />
                        <TextField
                          placeholder="Value"
                          type={
                            Object.keys(item)[0] === "color" ? "color" : "text"
                          }
                          size="small"
                          name={`techSpecs[${index}].${
                            Object.keys(item)[0]
                          }[${i}].value`}
                          sx={{ width: 100 }}
                          value={subItem.value}
                          onChange={formik.handleChange}
                        />
                        <IconButton
                          aria-label="delete"
                          disabled={item[Object.keys(item)[0]].length === 1}
                          size="small"
                          color="primary"
                          onClick={() => {
                            handleRemoveSubValue(
                              index,
                              i,
                              Object.keys(item)[0]
                            );
                          }}
                        >
                          <TrashIcon width="16" height="16" />
                        </IconButton>
                      </Stack>
                    </>
                  ))}
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    color="primary"
                    disabled={item[Object.keys(item)[0]].length === 5}
                    onClick={() =>
                      handleAddSubValue(
                        index,
                        item[Object.keys(item)[0]],
                        Object.keys(item)[0]
                      )
                    }
                  >
                    <Iconify icon="akar-icons:circle-plus-fill" />
                  </IconButton>
                </Stack>
              </Stack>
            </>
          ))}
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
