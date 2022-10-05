import React, { useState, forwardRef } from 'react';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { registerUser } from '../../redux/slices/userSlice';

import {
  OutlinedInput,
  Box,
  Grid,
  Button,
  IconButton,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  FormHelperText,
} from '@mui/material';

import { Snackbar } from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/


const validationSchema = yup.object({
  firstName: yup.string('Enter your name').required('Name is required'),
  lastName: yup.string('Enter your last name').required('Last name is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], 'Both password need to be the same'),
    })
    .required('Password is required'),
});
const SignUp = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      type: 'supplier'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      delete values.confirmPassword;
      dispatch(registerUser(values))
    },
  });

  return (
    <Box ref={ref} {...props} sx={{ padding: 1 }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="firstName"
          id="outlined-basic-name"
          label="Имя"
          variant="outlined"
          sx={{ mt: 3 }}
          size="normal"
          fullWidth={true}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.errors.firstName}
        />
        <TextField
          name="lastName"
          id="outlined-basic-name"
          label="Фамилия"
          variant="outlined"
          sx={{ mt: 3 }}
          size="normal"
          fullWidth={true}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.errors.name}
        />
        <TextField
          name="email"
          id="outlined-basic-email"
          label="Почта"
          variant="outlined"
          sx={{ mt: 3 }}
          size="normal"
          fullWidth={true}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />
         <TextField
          name="phone"
          id="outlined-basic-email"
          label="Телефон"
          placeholder="+998909170913"
          variant="outlined"
          sx={{ mt: 3 }}
          size="normal"
          fullWidth={true}
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.errors.phone}
        />
        <Grid container flex="row" justifyContent="center">
          <Grid item xs={6}>
            <FormControl sx={{ mt: 2, mr: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Пароль"
              />
            </FormControl>
            {!!formik.errors.password && (
              <FormHelperText error id="accountId-error">
                {formik.errors.password}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ mt: 2 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password1">Пароль</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password1"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Пароль"
              />
            </FormControl>
            {!!formik.errors.confirmPassword && (
              <FormHelperText error id="accountId-error">
                {formik.errors.confirmPassword}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" flex="row" alignItems="center" sx={{ marginTop: 3 }}>
          <Grid item>
            <Button variant="contained" type="submit">
              Далее
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
});

export default SignUp;
