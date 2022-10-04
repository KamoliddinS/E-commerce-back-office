import React, { useState, forwardRef } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../redux/slices/userSlice';

import { Icon } from '@iconify/react';

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
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

import { Visibility, VisibilityOff } from '@mui/icons-material';

// import { login, reset } from '../../features/auth/authSlice';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const SignInWithEimzo = forwardRef((props, ref) => {
  const [eimzoCertificate, setEimzoCertificate] = useState({});

  const eImzo = useSelector((state) => state.eimzo);
  const dispatch = useDispatch();

  const currentDate = Date.now();

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
        {Object.keys(eimzoCertificate).length !== 0 ? (
          <Box sx={{ mb: 3, border: '1px solid #C1C7CD', p: 1, borderRadius: '8px', position: 'relative' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography variant="subtitle2" sx={{ fontSize: 14, fontWeight: '400', color: '#9A9A9A' }}>
                СТИР {eimzoCertificate.UID}
              </Typography>
              {currentDate > Date.parse(JSON.parse(eimzoCertificate.validTo)) ? (
                <Typography variant="subtitle2" color="error" sx={{ fontSize: 12 }}>
                  Истек
                </Typography>
              ) : (
                <Typography
                  variant="subtitle2"
                  color="success"
                  align="right"
                  sx={{ fontSize: 14, fontWeight: '400', color: '#9A9A9A' }}
                >
                  <CheckCircleIcon color="success" sx={{fontSize: 16}}/> Действителен, до {JSON.parse(eimzoCertificate.validTo).slice(0, 10)}
                </Typography>
              )}
            </Box>
            <Typography variant="subtitle1" sx={{ fontSize: 16, mt: 1, fontWeight: 400, mb: 1 }}>
              {eimzoCertificate.O}
            </Typography>
            <Typography variant="subtitle1"  sx={{ fontSize: 16, fontWeight: 700 }}>{eimzoCertificate.CN}</Typography>

              <FingerprintIcon sx={{color: '#9A9A9A', fontSize: 40, mr: 3, position: 'absolute', bottom: '10px', right: '20px'}}/>
          </Box>
        ) : null}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">E-imzo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={eimzoCertificate}
            label="E-imzo"
            onChange={(e) => setEimzoCertificate(e.target.value)}
          >
            {eImzo.certificates.map((certificate, i) => (
              <MenuItem key={i} value={certificate}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1">{certificate.CN}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container justifyContent="flex-end" flex="row" alignItems="center" sx={{ marginTop: 3 }}>
          <Grid item>
            <Button variant="contained" type="submit" disabled={Object.keys(eimzoCertificate).length === 0}>
            <Icon icon="fa6-solid:key" /> 
            <Box sx={{ml: 1}}>Войти</Box> 
            </Button>
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

export default SignInWithEimzo;
