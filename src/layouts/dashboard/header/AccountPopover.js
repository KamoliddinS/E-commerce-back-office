import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, openModal, logOut } from '../../../redux/slices/userSlice';
// utils
import isLogged from '../../../utils/isLogged';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
// hooks
import getStorage from '../../../utils/getStorage';

// ----------------------------------------------------------------------

const MENU_OPTIONS_LOGGED = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: '/profile',
  },
  {
    label: 'Settings',
    linkTo: '/',
  },
];

const MENU_OPTIONS_UNLOGGED = [
  {
    label: 'Home',
    linkTo: '/',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const { getItem } = getStorage();
  const token = getItem('token');

  const isLoggedIn = isLogged(user ? user : {});

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <IconButtonAnimate
            onClick={handleOpen}
            sx={{
              p: 0,
              ...(open && {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                },
              }),
            }}
          >
            <Avatar alt={user.name} src={user.avatar} />
            {/* <Avatar src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg" alt="Rayan Moran" /> */}
          </IconButtonAnimate>

          <MenuPopover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            sx={{
              p: 0,
              mt: 1.5,
              ml: 0.75,
              '& .MuiMenuItem-root': {
                typography: 'body2',
                borderRadius: 0.75,
              },
            }}
          >
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {user.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {user.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack sx={{ p: 1 }}>
              {MENU_OPTIONS_LOGGED.map((option) => (
                <NextLink key={option.label} href={option.linkTo} passHref>
                  <MenuItem key={option.label} onClick={handleClose}>
                    {option.label}
                  </MenuItem>
                </NextLink>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem sx={{ m: 1 }} onClick={() => dispatch(logOut())}>
              Logout
            </MenuItem>
          </MenuPopover>
        </>
      ) : (
        <>
          <IconButtonAnimate
            onClick={handleOpen}
            sx={{
              p: 0,
              ...(open && {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                },
              }),
            }}
          >
            <Avatar>
              <PersonIcon />
            </Avatar>
          </IconButtonAnimate>

          <MenuPopover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            sx={{
              p: 0,
              mt: 1.5,
              ml: 0.75,
              '& .MuiMenuItem-root': {
                typography: 'body2',
                borderRadius: 0.75,
              },
            }}
          >
            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack sx={{ p: 1 }}>
              {MENU_OPTIONS_UNLOGGED.map((option) => (
                <NextLink key={option.label} href={option.linkTo} passHref>
                  <MenuItem key={option.label} onClick={handleClose}>
                    {option.label}
                  </MenuItem>
                </NextLink>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem sx={{ m: 1 }} onClick={() => dispatch(openModal())}>
              Login
            </MenuItem>
          </MenuPopover>
        </>
      )}
    </>
  );
}
