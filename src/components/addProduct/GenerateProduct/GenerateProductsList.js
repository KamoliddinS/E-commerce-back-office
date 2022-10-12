import React from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addVariations } from "../../../redux/slices/variationSlice";
// @mui
import {
  Box,
  Typography,
  Stack,
  Divider,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function GenerateProductsList({formik}) {
  const product = useSelector((state) => state.product.product);
  const { techSpecs } = product;
  const dispatch = useDispatch();

  function generateVariations(techSpecs) {
    let variations = [];
    techSpecs.map((spec, specIndex) => {
      let variation = [];
      Object.values(spec).map((value) => {
        value.map((value, valueIndex) => {
          let obj = {};
          obj[Object.keys(techSpecs[specIndex])[0]] = value;
          variation.push(obj);
        });
      });
      variations.push(variation);
    });
    variations = variations.reduce((a, b) =>
      a.flatMap((d) => b.map((e) => ({ ...d, ...e })))
    );
    dispatch(addVariations(variations));
  }

  generateVariations(techSpecs);
  return (
    <>
      <Box>
        <GeneratedProductItem techSpecs={techSpecs} formik={formik}/>
      </Box>
    </>
  );
}

function GeneratedProductItem() {
  const product = useSelector((state) => state.product.product);
  const variations = useSelector((state) => state.variation.all);
  const { techSpecs } = product;

  function createData(
    name,
    barcode,
    code,
    price,
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
      arr.push(v[1]);
    });
    rows.push(
      createData(
        arr.map((item, i) => (
          <Typography key={i} component="span" style={{ flex: "1 1 100%" }}>
            {item.title}
          </Typography>
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

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Артикул</TableCell>
              <TableCell align="center">Штрихкод</TableCell>
              <TableCell align="center">ИПКУ</TableCell>
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
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    placeholder="Штрихкод"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    placeholder="ИПКУ"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    placeholder="Цена"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    placeholder="Скидка"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    placeholder="Цена продажи"
                  />
                </TableCell>
                <TableCell align="center">{row.commission}</TableCell>
                <TableCell align="center">{row.commissionPercentage}</TableCell>
                <TableCell align="center">{row.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
    </Box>
  );
}
