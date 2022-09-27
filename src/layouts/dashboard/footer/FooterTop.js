import React from 'react';
// @mui
import { Box, Container, Typography, Grid, Stack, Link, useTheme } from '@mui/material';
// components
import Logo from '../../../components/Logo';

export default function FooterTop() {
  const links = [
    {
      title: 'Biz haqimizda',
      children: [
        { name: 'About', href: '#' },
        { name: 'Customers', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Sotuvchilar',
      children: [
        { name: 'Features', href: '#' },
        { name: 'Enterprise', href: '#' },
        { name: 'Security', href: '#' },
        { name: 'Integrations', href: '#' },
      ],
    },
    {
      title: 'Ma’lumotlar',
      children: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Use', href: '#' },
        { name: 'Cookies', href: '#' },
      ],
    },
  ];

  return (
    <Grid container sx={{ p: '24px' }}>
      <Grid item xs={12} md={2}>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            <Logo sx={{ width: 150, height: 75 }} />

            <Link>
              <Typography variant="body2" sx={{ mb: 1, width: '50%', mt: '10px' }}>
                Saytdan foydalanishda muammolar bormi?
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Grid>

      {links.map((item) => (
        <Grid item xs={6} md={2} key={item.title}>
          <Box sx={{ mb: 5 }}>
            <Typography sx={{ mb: '15px', fontSize: '22px', fontWeight: '400' }}>{item.title}</Typography>
            <Stack spacing={1.5} sx={{ color: 'text.secondary' }}>
              {item.children.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  variant="body2"
                  color="inherit"
                  underline="hover"
                  sx={{ width: 'fit-content' }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Box>
        </Grid>
      ))}
      <Grid item xs={6} md={2}>
        <Box sx={{ mb: 5 }}>
          <Typography sx={{ mb: '15px', fontSize: '20px', fontWeight: '400' }}>"SMART MARKETPLACE" МЧЖ</Typography>
          <Grid container>
            <Grid item xs={6} md={6}>
              <Stack spacing={1} sx={{ color: 'text.secondary' }}>
                <Typography variant="body2">СТИР: 309 095 650</Typography>
                <Typography variant="body2">МФО: 01057, ALLIANCE BANK Шайхонтохур филиали</Typography>
                <Typography variant="body2">ҲP: 2020 8000 4054 6738 5002</Typography>
                <Typography variant="body2">Тўлов мақсади: Оммавий офертага асосан гаров пули кўчирилди</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={6} md={2}>
        <Box sx={{ mb: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ mb: '15px', fontSize: '22px', fontWeight: '400' }}>Mo’bil ilovalar</Typography>
          <Link href="#" variant="subtitle2" color="inherit" underline="hover" sx={{ width: 'fit-content' }}>
            <img src="/assets/images/downloadAppstore.png" alt="Download from App Store" />
          </Link>
          <Link href="#" variant="subtitle2" color="inherit" underline="hover" sx={{ mt: 0, width: 'fit-content' }}>
            <img src="/assets/images/downloadGoogleplay.png" alt="Download from Google Play" />
          </Link>
        </Box>
      </Grid>
      {/* <Grid item xs={6} md={2}>

      </Grid> */}
    </Grid>
  );
}
