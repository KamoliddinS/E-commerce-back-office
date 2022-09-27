import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Badge } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import { toggleSnackbar } from '../../../redux/slices/compareSlice';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import CategoryPopover from './CategoryPopover';
import LanguagePopover from './LanguagePopover';
import { toggleModalCheckout } from '../../../redux/slices/cartSlice';
// import ContactsPopover from './ContactsPopover';
// import NotificationsPopover from './NotificationsPopover';
import WishlistPopover from './WishlistPopover';
import ComparePopover from './ComparePopover';
import CustomSnackbar from '../../../components/snackbar/CustomSnackbar';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `100%`,
    ...(isCollapse && {
      width: `100%`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

const Item = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  isCollapse: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({ isCollapse = false, verticalLayout = false }) {
  const dispatch = useDispatch();

  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
  const cartRedux = useSelector((state) => state.cart.items);
  const compareLenght = useSelector((state) => state.compare.compare.length);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setCart(cartRedux);
  }, [cartRedux]);

  const isDesktop = useResponsive('up', 'lg');
  const compareSnack = useSelector((state) => state.compare.compareSnackbar);

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{}} />}

        {/* {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )} */}

        {/* Snackbars */}
        {compareLenght === 5 ? (
          <CustomSnackbar
            open={compareSnack}
            text="You can't add more than 5 products to compare"
            time={4000}
            variant="error"
            vertical="top"
            horizontal="center"
            handleClose={() => dispatch(toggleSnackbar())}
          />
        ) : (
          <CustomSnackbar
            open={compareSnack}
            text="Product is added to compare"
            time={4000}
            variant="warning"
            vertical="top"
            horizontal="center"
            handleClose={() => dispatch(toggleSnackbar())}
          />
        )}

        {/* Snackbars END */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Item>
            <Logo sx={{ width: 100, height: 'auto' }} />
          </Item>
          <Item>
            <CategoryPopover />
          </Item>
          <Item>
            <Searchbar />
          </Item>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguagePopover />
          {/* <NotificationsPopover /> */}
          <IconButtonAnimate
            // color={open ? 'primary' : 'default'}
            onClick={() => dispatch(toggleModalCheckout())}
            sx={{ width: 40, height: 40 }}
          >
            <Badge badgeContent={cart.length} color="error">
              <Iconify icon="el:shopping-cart-sign" width={20} height={20} />
            </Badge>
          </IconButtonAnimate>
          <ComparePopover />
          <WishlistPopover />
          {/* <ContactsPopover /> */}
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
