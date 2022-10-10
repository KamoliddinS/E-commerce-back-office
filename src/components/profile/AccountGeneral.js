import * as Yup from "yup";
import { useCallback } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { addPhotoUrl } from "../../redux/slices/userSlice";
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
import { useSelector, useDispatch } from "react-redux";
// utils
import { fData } from "../../utils/formatNumber";
import { useFormik } from "formik";
import * as yup from "yup";
import { UploadAvatar } from "../upload";
// components
// import {
//   FormProvider,
//   RHFSwitch,
//   RHFTextField,
//   RHFUploadAvatar,
// } from "../hook-form";
import { UploadUserAvatar } from "../../helpers/uploadPhoto";
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
// phone number formatter for uzbek phone number
const phoneNumberFormatter = (value) => {
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (!value) return value;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7)
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`;
};

export default function AccountGeneral() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [avatar, setAvatar] = useState();
  const { firstName, lastName, email, phoneNumber } = user;
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    name: yup.string("Enter your name").required("Name is required"),
    // password: yup
    //   .string("Enter your password")
    //   .min(8, "Password should be of minimum 8 characters length")
    //   .required("Password is required"),
  });
  async function handleUploadAvatar(file) {
    const data = await UploadUserAvatar(file);
    dispatch(addPhotoUrl(data[0].path));
  }

  console.log(avatar);
  const formik = useFormik({
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
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      handleUploadAvatar(avatar);
    },
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setAvatar(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setAvatar]
  );
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" spacing={2} width="100%">
          <Card sx={{ p: 3, width: "20%" }}>
            <Grid item xs={12} md={8}>
              <div>
                <UploadAvatar
                  onDrop={handleDrop}
                  accept={{ "image/*": [] }}
                  file={avatar}
                />
                {/* {checkError && (
                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {error.message}
                  </FormHelperText>
                )} */}
              </div>
            </Grid>
          </Card>
          <Card sx={{ p: 3, width: "80%" }}>
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
                  helperText={
                    formik.touched.telephone && formik.errors.telephone
                  }
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
                    label="Tuman"
                    onChange={formik.handleChange}
                  >
                    {districts.map((district, i) => (
                      <MenuItem key={i} value={district.label}>
                        {district.value}
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
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
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
        </Stack>
      </form>
    </>
  );
}
