import ProfileTabs from './ProfileTabs';
import { useState } from 'react';
// @mui
import { Stack, Box, useMediaQuery, Drawer, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useTheme } from '@mui/material/styles';

import Iconify from '../Iconify';

const StackStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  // alignItems: 'center',
  justifyContent: 'center',
  // [theme.breakpoints.up('md')]: {
  //   borderLeft: `solid 10px ${theme.palette.divider}`,
  //   borderRight: `solid 1px ${theme.palette.divider}`,
  // },
  // [theme.breakpoints.up('sm')]: {
  //   borderLeft: `solid 1px ${theme.palette.divider}`,
  //   borderRight: `solid 1px ${theme.palette.divider}`,
  // },
}));

export default function Profile() {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <>
      <StackStyle container direction={!lg ? 'column' : 'row'}>

        <Box sx={{ margin: '0 auto', width: '100%', paddingLeft: !lg ? 1 : 10, paddingRight: !lg ? 1 : 10 }}>
          <ProfileTabs />
        </Box>
      </StackStyle>
    </>
  );
}

// // ----------------------------------------------------------------------
