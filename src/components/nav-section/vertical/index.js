import PropTypes from 'prop-types';
// @mui
import { List, Box } from '@mui/material';
//
import { ListSubheaderStyle } from './style';
import NavList from './NavList';

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({ navConfig, isCollapse, ...other }) {
  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {group.subheader}
          </ListSubheaderStyle>

          {group.items.map((list) => (
            <NavList
              key={list.title + list.path}
              data={list}
              depth={1}
              hasChildren={!!list.children}
              isCollapse={isCollapse}
            />
          ))}
        </List>
      ))}
    </Box>
  );
}
