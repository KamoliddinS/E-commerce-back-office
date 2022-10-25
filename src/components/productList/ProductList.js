import {
  Typography,
  Box,
  Stack,
  IconButton,
  Divider,
  Grid,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Image from "../Image";
import Iconify from "../Iconify";
import {
  getProductByShopId,
  removeProduct,
} from "../../redux/slices/productSlice";
import { deleteProduct } from "../../helpers";
import { borderRadius } from "@mui/system";
import MenuPopover from "../MenuPopover";

export default function ProductList({ data }) {
  const dispatch = useDispatch();

  const currentShop = useSelector((state) => state.shop.currentShop);

  const products = useSelector((state) => state.product);

  const { productsByShopId, isLoading } = products;

  const { _id } = currentShop;

  useEffect(() => {
    dispatch(getProductByShopId({ shopId: _id }));
  }, [_id]);

  return (
    <>
      {/* <Stack direction="row" flexWrap="wrap"> */}
      <Grid container spacing={1} sx={{ margin: "0 auto" }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {productsByShopId.length === 0 && (
          <Typography variant="h6" sx={{ margin: "0 auto" }}>
            No products
          </Typography>
        )}
        {productsByShopId.length > 0 &&
          productsByShopId.map((product) => (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
              <ProductListItem
                product={product}
                deleteProduct={deleteProduct}
              />
            </Grid>
          ))}
      </Grid>

      {/* </Stack> */}
    </>
  );
}

function ProductListItem({ product, deleteProduct }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };
  const token = useSelector((state) => state.user.data.token);
  const {
    name,
    price,
    rating,
    _id,
    brand,
    variations,
    available,
    totalReview,
    category,
    mainImage,
  } = product;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this product?"}
        </DialogTitle>
        <DialogContent sx={{ padding: "0 25px", mt: 1 }}>
          <DialogContentText id="alert-dialog-description">
            <Stack direction="row" spacing={2}>
              <Box component="img" width={100} src={mainImage} />
              <Stack direction="column">
                <Typography>
                  {name} / {brand} / {category}
                </Typography>
              </Stack>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            endIcon={<Iconify icon="line-md:cancel" />}
            onClick={handleClickClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            endIcon={<Iconify icon="fluent:delete-24-regular" />}
            onClick={() => {
              deleteProduct(_id, token);
              handleClickClose();
              dispatch(removeProduct(_id));
              handleClose();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Stack
        direction="column"
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 5px 15px 6px rgba(0, 0, 0, 0.06)",
          mb: 3,
          mr: 3,
          padding: 2,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            bottom: 0,
          }}
        >
          <IconButton
            onClick={handleOpen}
            aria-label="delete"
            size="medium"
            sx={{ ml: 1 }}
          >
            <Iconify icon="bx:dots-horizontal-rounded" />
          </IconButton>
          <MenuPopover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            sx={{
              p: 0,
              mt: 1.5,
              ml: 0.75,
              "& .MuiMenuItem-root": {
                typography: "body2",
                borderRadius: 0.75,
              },
            }}
          >
            <Stack sx={{ p: 1 }}>
              <MenuItem onClick={handleClose}>
                <Iconify icon="ant-design:edit-filled" />
                <Typography sx={{ ml: 1 }}>Tahrirlash</Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Iconify icon="fluent:archive-20-regular" />
                <Typography sx={{ ml: 1 }}>Arxivlash</Typography>
              </MenuItem>
              <MenuItem onClick={handleClickOpen}>
                <Iconify icon="ant-design:delete-outlined" color="error" />
                <Typography sx={{ ml: 1 }} color="error">
                  O'chirib tashlash
                </Typography>
              </MenuItem>
            </Stack>
          </MenuPopover>
        </Box>
        <Stack direction="column" sx={{ mb: 1 }}>
          <Stack direction="row">
            <Typography variant="body1">{name}</Typography>
          </Stack>
          <Typography variant="caption">
            {category} / {brand}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <Image
            src={mainImage}
            sx={{ width: 250, height: 250, borderRadius: 1 }}
          />
          <Stack direction="column" spacing={1} width="50%">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  padding: "2px 30px",
                  width: "100%",
                  border: "1px solid #0080004d",
                  borderRadius: 1,
                  textAlign: "center",
                }}
                color="primary"
              >
                No SKU
              </Typography>
            </Box>
            <Stack direction="column" spacing={0.3}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  Reyting
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {rating}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  Ko'rishlar
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  0
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", m: 0 }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  RIO
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  0.0%
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  Konversiya
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  0.0%
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  Sotildi
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  0
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: 0,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  Qaytarildi
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  0
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: 0,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  Brak
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  0
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: 0,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.secondary"
                >
                  Variatsiya
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {variations.length}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Box
            sx={{
              padding: "2px 10px",
              backgroundColor: "#f3f3f3",
              width: "50%",
              borderRadius: 0.5,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
              Mavjud tovarlar soni: {variations[0].stock}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "2px 10px",
              backgroundColor: "#f3f3f3",
              width: "50%",
              borderRadius: 0.5,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
              Sotuvlar soni: {totalReview}
            </Typography>
          </Box>
        </Stack>
        <Stack sx={{ mt: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Narx: {variations[0].price} sum
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
