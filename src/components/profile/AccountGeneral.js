import * as Yup from "yup";
import { useCallback } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Box, Grid, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// utils
import { fData } from "../../utils/formatNumber";
import { useFormik } from "formik";
// components
// import {
//   FormProvider,
//   RHFSwitch,
//   RHFTextField,
//   RHFUploadAvatar,
// } from "../hook-form";

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const methods = useForm({
  //   resolver: yupResolver(UpdateUserSchema),
  // });

  // const {
  //   setValue,
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  // const onSubmit = async () => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     if (file) {
  //       setValue(
  //         "photoURL",
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       );
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            ></Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                // loading={isSubmitting}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Card>
    </>
    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    //   <Grid container spacing={3}>
    //     <Grid item xs={12} md={4}>
    //       <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
    //         <RHFUploadAvatar
    //           name="photoURL"
    //           maxSize={3145728}
    //           onDrop={handleDrop}
    //           helperText={
    //             <Typography
    //               variant="caption"
    //               sx={{
    //                 mt: 2,
    //                 mx: 'auto',
    //                 display: 'block',
    //                 textAlign: 'center',
    //                 color: 'text.secondary',
    //               }}
    //             >
    //               Allowed *.jpeg, *.jpg, *.png, *.gif
    //               <br /> max size of {fData(3145728)}
    //             </Typography>
    //           }
    //         />

    //       </Card>
    //     </Grid>

    //   </Grid>
    // </FormProvider>
  );
}
