import React, { useState, forwardRef } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import { loginUser } from '../../redux/slices/userSlice';

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
  Link,
  FormHelperText,
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

// import { login, reset } from '../../features/auth/authSlice';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const SignIn = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  // const {isError} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  return (
    <Box ref={ref} sx={{ padding: 1 }}>
      <form onSubmit={formik.handleSubmit}>
        <p>mustafaanvarov@mail.ru</p>
        <TextField
          id="outlined-basic"
          label="Почта"
          variant="outlined"
          sx={{ mt: 3 }}
          size="normal"
          fullWidth={true}
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />
        <p>123123</p>
        <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
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
        <Grid container justifyContent="space-between" flex="row" alignItems="center" sx={{ marginTop: 3 }}>
          <Grid item>
            <Button variant="contained" type="submit">
              Войти
            </Button>
          </Grid>
          <Grid item>
            <Link href="#" underline="none" onClick={() => alert('Вы дурак!')}>
              Забыли пароль?
            </Link>
          </Grid>
        </Grid>
      </form>
      {/* <Snackbar open={isError} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Неверный логин или пароль!
        </Alert>
      </Snackbar> */}
    </Box>
  );
});

export default SignIn;
