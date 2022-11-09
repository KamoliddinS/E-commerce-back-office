import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  addBaseProduct,
  onNextStep,
  onBackStep,
  addImages,
} from "../../redux/slices/productEditSlice";
import {
  Card,
  Box,
  Typography,
  CircularProgress,
  Stepper,
  Step,
  Backdrop,
  StepLabel,
  Stack,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Iconify from "../Iconify";
import BaseProductMain from "../addProduct/BaseProduct/BaseProductMain";
import BaseProductUpload from "../addProduct/BaseProduct/BaseProductUpload";
import VariableSelects from "../addProduct/VariableProduct/VariableSelects";
import VariableInputs from "../addProduct/VariableProduct/VariableInputs";
import EditVariations from "./EditVariations/EditVariations";
import { useNavigate } from "react-router-dom";
import {
  updateBaseProduct,
  addImage,
  updateVariation,
  changeSuccess,
} from "../../redux/slices/productEditSlice";
import { uploadPhoto } from "../../helpers/uploadPhoto";

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
    id: 0,
    label: "No Brand",
  },
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

export default function EditProduct() {
  const [files, setFiles] = useState([]);

  const activeStep = useSelector((state) => state.productEdit.activeStep);
  const state = useSelector((state) => state.productEdit);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    editMode,
    product,
    isLoading,
    isSuccess,
    isBaseSuccess,
    isVariationLoading,
    isVariationSuccess,
    isBaseLoading,
    imagesSuccess,
  } = state;

  // function reSobrat() {
  //   let res = [];
  //   for (let d = 0; d < product.variations[0].dimensions.length; d++) {
  //     let arr = [];
  //     let key = "";
  //     for (let i = 0; i < product.variations.length; i++) {
  //       arr.push(Object.values(product.variations[i].dimensions[d]));
  //       if (i === 0) {
  //         key = Object.keys(product.variations[i].dimensions[d])[0];
  //       }
  //     }
  //     arr = arr.flat();
  //     const filteredArr = arr.reduce((acc, current) => {
  //       const x = acc.find((item) => item.value === current.value);
  //       if (!x) {
  //         return acc.concat([current]);
  //       } else {
  //         return acc;
  //       }
  //     }, []);
  //     arr.length = 0;
  //     arr[key] = filteredArr;
  //     res.push(arr);
  //     //transform to object
  //   }
  //   // transform array to object

  //   console.log(res);
  //   return res;
  // }
  // useEffect(() => {
  //   if (isSuccess) {
  //     reSobrat();
  //   }
  // }, [product]);

  const formik = useFormik({
    initialValues: [],
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addBaseProduct(values));

      console.log(values);

      // handleUpload();
      dispatch(onNextStep());
    },
  });

  useEffect(() => {
    if (product) {
      formik.setValues(product);
    }
  }, [product]);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [files]
  );
  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  const handleBack = () => {
    dispatch(onBackStep());
  };

  // UPDATE PRODUCT API STARTS HERE
  function handleUpload() {
    if (files.length > 0) {
      uploadPhoto(files).then((uploaded) => {
        dispatch(addImage(uploaded));
      });
    } else {
      dispatch(changeSuccess());
    }
  }
  useEffect(() => {
    if (imagesSuccess) {
      const data = {
        name: formik.values.name,
        mainImage: product.images[0],
        images: product.images,
        brand: formik.values.brand,
        category: formik.values.category,
        subCategory: formik.values.subCategory,
        description: formik.values.description,
      };
      dispatch(updateBaseProduct({ data, id: product._id }));
    }
  }, [imagesSuccess]);

  useEffect(() => {
    if (isBaseSuccess) {
      product.variations.forEach((element) => {
        const variation = {
          dimensions: element.dimensions,
          SKU: element.price,
          price: element.price,
          stock: element.stock,
          images: element.images,
          mainImage: element.images[0],
          _id: element._id,
        };
        dispatch(
          updateVariation({
            data: variation,
            id: product._id,
            varId: element._id,
          })
        );
      });
    }
  }, [isBaseSuccess]);

  useEffect(() => {
    if (isVariationSuccess) {
      navigate("/order-list");
    }
  }, [isVariationSuccess]);
  // UPDATE PRODUCT API ENDS HERE

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isVariationLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h4" gutterBottom>
        Mahsulotni tahrirlash
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
                <BaseProductUpload
                  handleDropMultiFile={handleDropMultiFile}
                  files={files}
                  handleRemove={handleRemove}
                />
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
              <EditVariations />
              {/* <VariableSelects
                formik={formik}
                techSpecs={formik.values.techSpecs}
              /> */}
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

                <LoadingButton
                  variant="outlined"
                  size="large"
                  loading={isBaseLoading}
                  loadingPosition="end"
                  onClick={() => handleUpload()}
                  endIcon={<Iconify icon="bi:arrow-right-circle-fill" />}
                >
                  Saqlash
                </LoadingButton>
              </Stack>
            </>
          )}
          {activeStep === 2 && (
            <>
              {/* <GenerateProductsList />
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
              </Stack> */}
            </>
          )}
        </form>
      </Card>
    </>
  );
}
