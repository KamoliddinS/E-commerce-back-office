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
import { updateProfile } from "../../redux/slices/userSlice";
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

export default function AccountGeneral() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [avatar, setAvatar] = useState();
  const { firstName, lastName, email, phoneNumber, token } = user;
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
  const formik = useFormik({
    initialValues: {
      email: email,
      name: firstName,
      fullname: lastName,
      telephone: phoneNumber,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let user = new FormData();
      user.append("firstName", values.name);
      user.append("lastName", values.fullname);
      user.append("email", values.email);
      user.append("phoneNumber", values.telephone);

      dispatch(updateProfile(user, token));
      // alert(JSON.stringify(values, null, 2));
      // handleUploadAvatar(avatar);
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
