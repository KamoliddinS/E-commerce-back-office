import PropTypes from 'prop-types';
// components
import DashboardLayout from './dashboard';
import FullWidthLayout from './FullWidthLayout';

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['dashboard', 'main', 'logoOnly']),
};

export default function Layout({ variant = 'dashboard', children }) {
  if (variant === 'fullWidth') {
    return <FullWidthLayout> {children} </FullWidthLayout>;
  }

  return <DashboardLayout> {children} </DashboardLayout>;
}
