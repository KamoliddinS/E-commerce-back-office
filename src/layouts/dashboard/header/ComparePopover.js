import React, {useState, useEffect} from 'react';
// @mui
import { Badge, useMediaQuery } from '@mui/material';
// utils
// import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCompareModal } from '../../../redux/slices/compareSlice';

import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function ComparePopover() {
  const compareRedux = useSelector((state) => state.compare.compare);

  const [compare, setCompare] = useState([]);

  useEffect(() => {
    setCompare(compareRedux);
  }, [compareRedux]);

  const dispatch = useDispatch();

  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <IconButtonAnimate
        // color={open ? 'primary' : 'default'}
        onClick={() => dispatch(toggleCompareModal())}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={compare.length} color="primary">
          <Iconify icon="material-symbols:compare-arrows-rounded" width={20} height={20} />
        </Badge>
      </IconButtonAnimate>
    </>
  );
}
