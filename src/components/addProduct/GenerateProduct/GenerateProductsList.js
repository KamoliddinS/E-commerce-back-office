import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

export default function GenerateProductsList() {
  const product = useSelector((state) => state.product.product);
  const { techSpecs, colors } = product;

  const techSpecsKeys = Object.keys(techSpecs);
  console.log("techSpecsKeys", techSpecsKeys);
  const techSpecsValues = Object.values(techSpecs);
  console.log("techSpecsValues", techSpecsValues);
  const techSpecsSubValues = techSpecsValues.map((item) => item.value);
  console.log("techSpecsSubValues", techSpecsSubValues);

  // generate n amount of products based on colors and techSpecsValues and techSpecsSubValues

  const generateProducts = () => {
    const products = [];
    for (let i = 0; i < colors.length; i++) {
      for (let j = 0; j < techSpecsKeys.length; j++) {
        for (let k = 0; k < techSpecsSubValues[j].length; k++) {
          products.push({
            color: colors[i],
            [techSpecsKeys[j]]: techSpecsSubValues[j][k],
          });
        }
      }
    }
    return products;
  };

  console.log("generateProducts", generateProducts());

  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          Mahsulotlar
        </Typography>
        <Divider />
      </Box>
    </>
  );
}

function GeneratedProductItem({ color, techSpecs }) {
  const [value, setValue] = React.useState([]);
  console.log(value);
  const handleChange = (event) => {
    setValue((value) => [...value, event.target.value]);
  };
  return (
    <Box>
      <Stack direction="row" mt={2} mb={2} spacing={5}>
        <Stack direction="column" alignItems="center">
          <Typography variant="body1">Rang</Typography>
          <Box
            sx={{
              mt: 1,
              width: 20,
              height: 20,
              display: "flex",
              borderRadius: "50%",
              position: "relative",
              // marginRight: 1,
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
        </Stack>
        {techSpecs.map((item, i) => (
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">{item.name}</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              width="100%"
              value={value}
              label="Age"
              onChange={handleChange}
            >
              {item.value.map((item) => (
                <MenuItem value={item.subvalue}>{item.subvalue}</MenuItem>
              ))}
            </Select>

            {/* <Typography variant="body2">{item.subvalue}</Typography> */}
          </Stack>
        ))}

        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">Mavjud tovarlar soni</Typography>
          <TextField
            placeholder="0"
            id="outlined-size-small"
            type="number"
            size="small"
          />
        </Stack>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">Narx</Typography>
          <TextField
            type="number"
            placeholder="0"
            id="outlined-size-small"
            size="small"
          />
        </Stack>
      </Stack>
      <Divider />
    </Box>
  );
}
