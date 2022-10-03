import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
// redux
import {useSelector} from 'react-redux';
// react-router
import {useNavigate} from 'react-router-dom'
// components
import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';
import Auth from '../components/auth/Auth'
// assets
import { PageNotFoundIllustration } from '../assets';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function AuthScreen() {

  const navigate = useNavigate();

  const userData = useSelector(state => state.user.data);

  if (Object.keys(userData).length !== 0) {
    navigate("/home");
  }

  return (
    <Page title="Authinfication">
      <Container component={MotionContainer}>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
         
            <Auth />

         
        </ContentStyle>
      </Container>
    </Page>
  );
}
