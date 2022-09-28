// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Asosiy',
    items: [
      { title: 'Mablag’lar', path: '/money', icon: ICONS.dashboard },
      { title: 'Shaxsiy Ma’lumot', path: '/profile', icon: ICONS.dashboard },
      { title: 'Chat', path: '/chat', icon: ICONS.ecommerce },
      { title: 'Fakturalar', path: '/texture', icon: ICONS.ecommerce },
      { title: 'Buyurtmalar Tarixi', path: '/order-history', icon: ICONS.ecommerce },
      { title: 'Add product', path: '/add-product', icon: ICONS.ecommerce },
      { title: 'Mahsulotlar ro’yxati', path: '/order-list', icon: ICONS.ecommerce },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: '/user',
        icon: ICONS.user,
        children: [
          { title: 'Four', path: '/user/four' },
          { title: 'Five', path: '/user/five' },
          { title: 'Six', path: '/user/six' },
        ],
      },
    ],
  },
];

export default navConfig;
