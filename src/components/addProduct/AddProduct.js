import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import LoadingButton from "@mui/lab/LoadingButton";
import VariableSelects from "./VariableProduct/VariableSelects";
import VariableInputs from "./VariableProduct/VariableInputs";
import { useFormik } from "formik";
import {
  addBaseProduct,
  onNextStep,
  onBackStep,
  addImages,
  postBaseProduct,
} from "../../redux/slices/productSlice";
import { postVariations } from "../../redux/slices/variationSlice";
import Iconify from "../Iconify";
import GenerateProduct from "./GenerateProduct/GenerateProduct";
import { uploadPhoto } from "../../helpers/uploadPhoto";
import GenerateProductsList from "./GenerateProduct/GenerateProductsList";

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
export default function AddProduct() {
  const activeStep = useSelector((state) => state.product.activeStep);
  const product = useSelector((state) => state.product.product);
  const shop = useSelector((state) => state.shop);
  const token = useSelector((state) => state.user.data.token);
  const dispatch = useDispatch();
  const variations = useSelector((state) => state.variation);
  const navigate = useNavigate();
  const { all, isLoading, completed, isSuccess } = variations;
  const [files, setFiles] = useState([]);

  // const { images } = product;

  useEffect(() => {
    if (product.images.lenght !== 0) {
      const baseProduct = {
        name: product.name,
        shopId: shop.currentShop._id,
        brand: product.brand.label,
        mainImage: product.images[0],
        images: product.images,
        category: product.category,
        subCategory: product.subcategory,
        description: product.description,
      };
      dispatch(postBaseProduct({ token, data: baseProduct }));
    }
  }, [product.images, shop]);

  useEffect(() => {
    if (product._id !== "") {
      all.forEach((variation) => {
        const data = {
          product: product._id,
          SKU: variation.identityCode,
          price: variation.price,
          stock: variation.inStock,
          mainImage: product.mainImage,
          images: [product.mainImage],
          dimensions: variation.dimensions,
        };
        dispatch(postVariations({ token, data, id: product._id }));
      });
    }
  }, [product._id]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/order-list");
    }
  }, [isSuccess]);

  // function addVariations () {
  //   variations.forEach((item) => {
  //     const vatiation = {
  //       product: product._id,
  //       SKU: item.identityCode,
  //       price: item.price,
  //       quantity: item.inStock,
  //       mainImage: product.mainImage,
  //       images: product.images
  //       size: variation.size,
  //       baseProductId: product._id,
  //     };
  //     dispatch(postVariation({ token, data: vatiation, id: product._id }));
  //   }
  // }

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

  function handleUpload() {
    uploadPhoto(files).then((uploaded) => {
      dispatch(addImages(uploaded));
    });
  }

  const formik = useFormik({
    initialValues: product,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(onNextStep());

      dispatch(addBaseProduct(values));
    },
  });

  const handleBack = () => {
    // dispatch(addBaseProduct(formik.values));
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
              {/* <GenerateProduct photo={files[0].preview} /> */}
              <GenerateProductsList formik={formik} />

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
                  onClick={handleUpload}
                  loading={isLoading}
                  loadingPosition="end"
                  endIcon={<Iconify icon="bi:arrow-right-circle-fill" />}
                >
                  Yuklash
                </LoadingButton>
              </Stack>
            </>
          )}
          {/* {activeStep === 3 && (
            <>
              <Stack direction="row" justifyContent="space-between" mt={5}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleBack}
                  startIcon={<Iconify icon="bi:arrow-left-circle-fill" />}
                >
                  Ortga qaytish
                </Button>
              </Stack>
            </>
          )} */}
        </form>
      </Card>
    </>
  );
}
