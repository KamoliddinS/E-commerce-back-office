import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// redux
import { useSelector, useDispatch } from "react-redux";
import {setCurrentShop} from '../../../redux/slices/shopSlice'
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Typography,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// i18n
import { useTranslation } from "react-i18next";
// components
import AddShopModal from "../../../components/shop/AddShopModal";
// icons
import {AddIcon} from '../../../components/Icons'

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  // display: "flex",
  // alignItems: "center",
  // padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  // backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    dispatch(setCurrentShop(event.target.value))
  };

  const { t } = useTranslation();

  const userData = useSelector((state) => state.user.data);
  const shops = useSelector((state) => state.shop.shops);

  useEffect(() => {
    if (shops.length > 0) {
      dispatch(setCurrentShop(shops[0]))
    }
  }, [shops])
  
  function handleClose() {
    setOpen(false);
  }

  return (
    <Link underline="none" color="inherit">
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: "transparent",
          }),
        }}
      >
        <AddShopModal open={open}  handleClose={handleClose}/>
        <FormControl fullWidth>
          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={shops.length !== 0 ? shops[0].name : "No Shop"}
            onChange={handleChange}
          >
            {shops.map((shop) => (
              <MenuItem value={shop} key={shop._id} sx={{display: 'flex'}}>
                <Box sx={{display: 'flex'}}>
                <Avatar
                  src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg"
                  alt={userData.name}
                />

                <Box
                  sx={{
                    ml: 2,
                    transition: (theme) =>
                      theme.transitions.create("width", {
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(isCollapse && {
                      ml: 0,
                      width: 0,
                    }),
                  }}
                >
                  <Typography variant="subtitle2" noWrap>
                    {shop.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{ color: "text.secondary" }}
                  >
                    {t("shop.shop")}
                  </Typography>
                </Box>
                </Box>
              
              </MenuItem>
            ))}
            <MenuItem onClick={() => setOpen(true)}>
              
              <Box
                sx={{
                  ml: 2,
                  transition: (theme) =>
                    theme.transitions.create("width", {
                      duration: theme.transitions.duration.shorter,
                    }),
                  ...(isCollapse && {
                    ml: 0,
                    width: 0,
                  }),
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 0px'
                }}
              >
                <Typography variant="subtitle2" sx={{mr: '5px'}} noWrap>
                  {t("shop.add")} 
                </Typography>
                <AddIcon />

              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </RootStyle>
    </Link>
  );
}
