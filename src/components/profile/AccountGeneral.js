import * as Yup from "yup";
import { useCallback } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
// utils
import { fData } from "../../utils/formatNumber";
import { useFormik } from "formik";
import * as yup from "yup";
// components
// import {
//   FormProvider,
//   RHFSwitch,
//   RHFTextField,
//   RHFUploadAvatar,
// } from "../hook-form";

// ----------------------------------------------------------------------
// generate cities of Uzbekistan
const cities = [
  { value: "Toshkent", label: "Toshkent" },
  { value: "Andijon", label: "Andijon" },
  { value: "Buxoro", label: "Buxoro" },
  { value: "Farg'ona", label: "Farg'ona" },
  { value: "Jizzax", label: "Jizzax" },
  { value: "Namangan", label: "Namangan" },
  { value: "Navoiy", label: "Navoiy" },
  { value: "Qashqadaryo", label: "Qashqadaryo" },
  { value: "Qoraqalpog'iston", label: "Qoraqalpog'iston" },
  { value: "Samarqand", label: "Samarqand" },
  { value: "Sirdaryo", label: "Sirdaryo" },
  { value: "Surxondaryo", label: "Surxondaryo" },
  { value: "Toshkent", label: "Toshkent" },
  { value: "Xorazm", label: "Xorazm" },
];

const districts = [
  { value: "Bektemir", label: "Bektemir" },
  { value: "Chilonzor", label: "Chilonzor" },
  { value: "Yunusobod", label: "Yunusobod" },
  { value: "Mirzo Ulug'bek", label: "Mirzo Ulug'bek" },
  { value: "Mirobod", label: "Mirobod" },
  { value: "Olmazor", label: "Olmazor" },
  { value: "Shayxontohur", label: "Shayxontohur" },
  { value: "Sergeli", label: "Sergeli" },
  { value: "Toshkent", label: "Toshkent" },
  { value: "Yakkasaroy", label: "Yakkasaroy" },
];
// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const user = useSelector((state) => state.user.data);

  const { firstName, lastName, email, phoneNumber } = user;
  console.log(email);
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    // password: yup
    //   .string("Enter your password")
    //   .min(8, "Password should be of minimum 8 characters length")
    //   .required("Password is required"),
  });
  const { formik, formState } = useFormik({
    initialValues: {
      email: email,
      name: firstName,
      fullname: lastName,
      telephone: phoneNumber,
      city: "",
      district: "",
      address: "",
      index: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { isSubmitting } = formState;

  console.log(isSubmitting);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Card sx={{ p: 3 }}>
          <Grid item xs={12} md={8}>
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
            >
              <TextField
                fullWidth
                id="name"
                label="Ism"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="fullname"
                label="Familiya"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
                helperText={formik.touched.fullname && formik.errors.fullname}
              />
              <TextField
                fullWidth
                id="email"
                placeholder="email@example.com"
                label="Elektron pochta"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="telephone"
                type="tel"
                placeholder="+998 97 905 15 51"
                label="Telefon raqam"
                name="telephone"
                value={formik.values.telephone}
                onChange={formik.handleChange}
                error={
                  formik.touched.telephone && Boolean(formik.errors.telephone)
                }
                helperText={formik.touched.telephone && formik.errors.telephone}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Shahar / Viloyat
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.city}
                  name="city"
                  label="Shahar / Viloyat"
                  onChange={formik.handleChange}
                >
                  {cities.map((city, i) => (
                    <MenuItem key={i} value={city.label}>
                      {city.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tuman</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.district}
                  name="district"
                  label="Shahar / Viloyat"
                  onChange={formik.handleChange}
                >
                  {districts.map((districts, i) => (
                    <MenuItem key={i} value={districts.label}>
                      {districts.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                id="address"
                type="text"
                placeholder="220000"
                label="Manzil"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
              <TextField
                fullWidth
                id="index"
                type="number"
                placeholder="220000"
                label="Indeks"
                name="index"
                value={formik.values.index}
                onChange={formik.handleChange}
                error={formik.touched.index && Boolean(formik.errors.index)}
                helperText={formik.touched.index && formik.errors.index}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                // loading={isSubmitting}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Grid>
        </Card>
      </form>
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
