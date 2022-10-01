import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BaseProductMain from "./BaseProduct/BaseProductMain";
import BaseProductUpload from "./BaseProduct/BaseProductUpload";
import {
  Card,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Button,
} from "@mui/material";
import VariableSelects from "./VariableProduct/VariableSelects";
import VariableInputs from "./VariableProduct/VariableInputs";
import { useFormik } from "formik";
import {
  addBaseProduct,
  onNextStep,
  onBackStep,
} from "../../redux/slices/productSlice";
import Iconify from "../Iconify";
import GenerateProduct from "./GenerateProduct/GenerateProduct";

const steps = [
  "Mahsulot m’alumoti",
  "Ozgaruvchan ma'lumot",
  "Rang, hajm, soni",
];
const categories = [
  {
    id: 1,
    category: "Electronics",
    subcategories: [
      { id: 1, subcategory: "Mobile Phones" },
      { id: 2, subcategory: "Laptops" },
      { id: 3, subcategory: "Tablets" },
      { id: 4, subcategory: "Accessories" },
    ],
  },
  {
    id: 2,
    category: "Clothes",
  },
  {
    id: 3,
    category: "Shoes",
  },
  {
    id: 4,
    category: "Accessories",
  },
  {
    id: 5,
    category: "Books",
  },
];

const companies = [
  {
    id: 1,
    label: "Samsung",
  },
  {
    id: 2,
    label: "Apple",
  },
  {
    id: 3,
    label: "Xiaomi",
  },
  {
    id: 4,
    label: "Huawei",
  },
  {
    id: 5,
    label: "Lenovo",
  },
  {
    id: 6,
    label: "Asus",
  },
  {
    id: 7,
    label: "LG",
  },
  {
    id: 8,
    label: "Nokia",
  },
  {
    id: 9,
    label: "Sony",
  },
  {
    id: 10,
    label: "Microsoft",
  },
  {
    id: 11,
    label: "Dell",
  },
  {
    id: 12,
    label: "HP",
  },
];
export default function AddProduct() {
  const activeStep = useSelector((state) => state.product.activeStep);
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  const { images } = product;

  console.log(images.length);

  const formik = useFormik({
    initialValues: product,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addBaseProduct(values));
      dispatch(onNextStep());
      // dispatch(onNextStep());
    },
  });

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };
  const handleBack = () => {
    dispatch(addBaseProduct(formik.values));
    dispatch(onBackStep());
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Mahsulot Qo'shish
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Card sx={{ padding: 2, margin: 5 }}>
        <form onSubmit={formik.handleSubmit}>
          {activeStep === 0 && (
            <>
              <Box sx={{ display: "flex" }}>
                <BaseProductMain formik={formik} categories={categories} />
                <BaseProductUpload />
              </Box>

              <Stack direction="row" justifyContent="flex-end" mt={5}>
                <Button
                  variant="outlined"
                  type="submit"
                  size="large"
                  endIcon={<Iconify icon="bi:arrow-right-circle-fill" />}
                >
                  Tasdiqlash
                </Button>
              </Stack>
            </>
          )}
          {activeStep === 1 && (
            <>
              <VariableSelects
                formik={formik}
                techSpecs={formik.values.techSpecs}
              />
              <VariableInputs formik={formik} companies={companies} />
              <Stack direction="row" justifyContent="space-between" mt={5}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleBack}
                  startIcon={<Iconify icon="bi:arrow-left-circle-fill" />}
                >
                  Ortga qaytish
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  endIcon={<Iconify icon="bi:arrow-right-circle-fill" />}
                >
                  Tasdiqlash
                </Button>
              </Stack>
            </>
          )}
          {activeStep === 2 && (
            <>
              <GenerateProduct />
              <Stack direction="row" justifyContent="space-between" mt={5}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleBack}
                  startIcon={<Iconify icon="bi:arrow-left-circle-fill" />}
                >
                  Ortga qaytish
                </Button>
                <Button
                  variant="outlined"
                  disabled
                  size="large"
                  type="submit"
                  endIcon={<Iconify icon="bi:arrow-right-circle-fill" />}
                >
                  Yuklash
                </Button>
              </Stack>
            </>
          )}
        </form>
      </Card>
    </>
  );
}
