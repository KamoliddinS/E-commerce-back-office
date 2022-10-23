import React from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  addVariations,
  changeVariation,
} from "../../../redux/slices/variationSlice";
// @mui
import {
  Box,
  Typography,
  Stack,
  Divider,
  Select,
  IconButton,
  TextField,
  Table,
  Chip,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Iconify from "../../Iconify";
// utils
import { numberWithSpaces } from "../../../utils/numberWithSpaces";

export default function GenerateProductsList({ formik }) {
  const product = useSelector((state) => state.product.product);
  const { techSpecs } = product;
  const dispatch = useDispatch();

  function generateVariations(techSpecs) {
    let variations = [];
    techSpecs.map((spec, specIndex) => {
      let variation = [];
      Object.values(spec).map((value) => {
        value.map((value, valueIndex) => {
          let obj = {
            barcode: "",
            identityCode: "",
            price: "",
            discount: "",
            priceSale: "",
            commission: "",
            commissionPercentage: "",
            revenue: "",
            dimensions: [],
          };
          // obj[Object.keys(techSpecs[specIndex])[0]] = value;
          obj.dimensions.push({
            [Object.keys(techSpecs[specIndex])[0]]: value,
          });

          variation.push(obj);
        });
      });
      variations.push(variation);
    });
    // Creatin dimensions from obj
    let dimensions = [];
    dimensions = variations.map((variation, index) =>
      variation.map((v, i) => v.dimensions[0])
    );
    // Creating product variations from tech specs
    variations = variations.reduce((a, b) =>
      a.flatMap((d) => b.map((e) => ({ ...d, ...e })))
    );
    // merging different variations
    let dimension = dimensions.reduce((a, b) =>
      a.flatMap((d) => b.map((e) => ({ ...d, ...e })))
    );
    // adding dimensions to variations
    variations.map((variation, index) => {
      variation.dimensions = [dimension[index]];
      variation.dimensions = variation.dimensions.map((dim) => {
        return Object.keys(dim).map((key) => {
          return { [key]: dim[key] };
        });
      });
      variation.dimensions = variation.dimensions[0];
    });
    dispatch(addVariations(variations));
  }

  generateVariations(techSpecs);
  return (
    <>
      <Box>
        <GeneratedProductItem techSpecs={techSpecs} formik={formik} />
      </Box>
    </>
  );
}

function GeneratedProductItem() {
  const product = useSelector((state) => state.product.product);
  const variations = useSelector((state) => state.variation.all);
  const { techSpecs } = product;
  const dispatch = useDispatch();

  function handleChange(index, prop, value) {
    dispatch(changeVariation({ index, prop, value }));
  }

  function createData(
    name,
    barcode,
    code,
    price,
    inStock,
    discount,
    priceSale,
    commission,
    commissionPercentage,
    revenue
  ) {
    return {
      name,
      barcode,
      code,
      price,
      inStock,
      discount,
      priceSale,
      commission,
      commissionPercentage,
      revenue,
    };
  }

  const rows = [];

  variations.map((variation, index) => {
    let arr = [];
    Object.entries(variation).map((v) => {
      const obj = { key: v[0], ...v[1] };
      arr.push(obj);
      // console.log(arr);
    });
    rows.push(
      createData(
        variation.dimensions.map((dim) => (
          <Chip
            label={Object.values(dim)[0].title}
            size="small"
            sx={{ mr: 1, mb: 1 }}
          />
        )),
        "",
        "",
        "",
        "",
        "100 000",
        "10 000",
        "10%",
        "90 000"
      )
    );
  });

  // delete item from rows
  // function deleteItem(index) {
  //   rows.filter((item, i) => i !== index);
  //   console.log(rows);
  // }

  return (
    <Box>
      <TableContainer>
        <Table
          sx={{ minWidth: 650, border: "1px dashed #e4e4e4", borderRadius: 1 }}
          aria-label="simple table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>Вариация</TableCell>
              <TableCell align="center">Штрихкод</TableCell>
              <TableCell align="center">ИКПУ</TableCell>
              <TableCell align="center">Кол-ч</TableCell>

              <TableCell align="center">Цена</TableCell>
              <TableCell align="center">Скидка</TableCell>
              <TableCell align="center">Цена продажи</TableCell>
              <TableCell align="center">Комиссия за шт</TableCell>
              <TableCell align="center">Комиссия</TableCell>
              <TableCell align="center">К выводу</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={{ border: "1px dashed #e4e4e4" }}>
                {/* <TableCell>
                  <IconButton aria-label="delete">
                    <Iconify icon="ep:delete" />
                  </IconButton>
                </TableCell> */}
                <TableCell
                  scope="row"
                  sx={{
                    display: "flex",
                    // width: "120%",
                    // justifyContent: "center",
                  }}
                >
                  <Stack direction="row" flexWrap="wrap">
                    {row.name}
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="Штрихкод"
                    onChange={(e) =>
                      handleChange(index, "barcode", e.target.value)
                    }
                    value={variations[index].barcode}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    sx={{ width: 100 }}
                    placeholder="ИПКУ"
                    onChange={(e) =>
                      handleChange(index, "identityCode", e.target.value)
                    }
                    value={variations[index].identityCode}
                  />
                </TableCell>

                <TableCell align="center">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="number"
                    size="small"
                    placeholder="Кол-ч"
                    onChange={(e) =>
                      handleChange(index, "inStock", e.target.value)
                    }
                    value={variations[index].inStock}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="Цена"
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    value={variations[index].price}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="Скидка"
                    onChange={(e) =>
                      handleChange(index, "discount", e.target.value)
                    }
                    value={variations[index].discount}
                  />
                </TableCell>
                <TableCell align="center">
                  {numberWithSpaces(variations[index].priceSale)}
                </TableCell>
                <TableCell align="center">
                  {numberWithSpaces(variations[index].commission)}
                </TableCell>
                <TableCell align="center">{row.commissionPercentage}</TableCell>
                <TableCell align="center">
                  {numberWithSpaces(variations[index].revenue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
    </Box>
  );
}
