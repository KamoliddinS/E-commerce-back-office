import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Stack,
  Paper,
  Divider,
  Typography,
  IconButton,
  ListItemAvatar,
  Tooltip,
  ListItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import router from 'next/router';
// utils
// import { fToNow } from '../../../utils/formatTime';
import Image from '../../../components/Image';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWlistItem } from '../../../redux/slices/wishlistSlice';
import { addCart } from '../../../redux/slices/cartSlice';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import EmptyContent from '../../../components/EmptyContent';

import CloseIcon from '@mui/icons-material/Close';
import formatProductTitle from '../../../utils/formatProductTitle';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';

// ----------------------------------------------------------------------

export default function WishlistPopover() {
  const [wishlist, setWishlist] = useState([]);
  const wishlistRedux = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    setWishlist(wishlistRedux);
  }, [wishlistRedux]);

  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();

  const handleDelete = (code) => {
    dispatch(deleteWlistItem(code));
  };

  // function addCartItem(item) {
  //   dispatch(
  //     addCart({
  //       ...item,
  //       quantity: 1,
  //     })
  //   );
  // }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={wishlist.length} color="error">
          <Iconify icon="eva:heart-fill" width={20} height={20} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 350, maxHeight: 500, p: 0, mt: 1.5, ml: 1.5, mr: 1.5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box>
            <Typography variant="subtitle1">Wishlist</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Istaklar savatingizda {wishlist.length} ta maxsulot mavjud.
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ maxHeight: { xs: 400, sm: 'auto' } }}>
          <List>
            <Box>
              {wishlist.length === 0 ? (
                <EmptyContent
                  title="Your wishlist is empty"
                  description="Look like you have no items in your shopping cart."
                  img="/assets/illustrations/broken-heart.svg"
                />
              ) : (
                <TransitionGroup>
                  {wishlist.map((item) => (
                    <Collapse key={item.code}>{renderItem({ item, handleDelete })}</Collapse>
                  ))}
                </TransitionGroup>
              )}
            </Box>
          </List>
        </Scrollbar>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

function renderItem({ item, handleDelete, addCartItem }) {
  const { name, price, cover, code, category, gender, available } = item;

  // const handleCart = () => {
  //   dispatch(addCart({ id, name, priceSale, quantity: 1, available, cover, price, color: colors[0] }));
  // };

  renderItem.propTypes = {
    wishlistItem: PropTypes.shape({
      createdAt: PropTypes.instanceOf(Date),
      id: PropTypes.string,
      code: PropTypes.string,
      name: PropTypes.string,
      cover: PropTypes.string,
      category: PropTypes.string,
      gender: PropTypes.string,
      price: PropTypes.number,
      available: PropTypes.number,
    }),
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.1, 0.1),
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <ListItem
        sx={{
          py: 1,
          px: 1,
          mt: 0.5,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row">
          <Item>
            <ListItemAvatar>
              <Image src={cover} alt={name} sx={{ width: 64, height: 64, borderRadius: 0.5 }} />
            </ListItemAvatar>
          </Item>
          <Item>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                width: 170,
                cursor: 'pointer',
              }}
              onClick={() => router.push(`/${category.toLowerCase()}/${gender.toLowerCase()}/${code}`)}
            >
              <Tooltip title={name}>
                <Typography variant="subtitle2">{formatProductTitle(name, 19)}</Typography>
              </Tooltip>
              <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                Narx: {price}
              </Typography>
              <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                In Stock: {available}
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: 80,
              }}
            >
              {/* <IconButton size="small" color="primary">
                <Iconify icon="eva:shopping-cart-outline" style={{ fontSize: '24px' }} />
              </IconButton> */}

              <IconButton aria-label="delete" color="error" onClick={() => handleDelete(code)} size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Item>
        </Stack>
      </ListItem>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </>
  );
}
