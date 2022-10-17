// components
import SvgIconStyle from '../../../components/SvgIconStyle';
// i18n
import i18next from '../../../i18n';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};



const t = (key) => i18next.t(key);
i18next.t('namespace: ru')
let money = t('nav.money');

i18next.on('languageChanged init', function (lng) {
  money = t('nav.money');
});

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: i18next.t('nav.general'),
    items: [
      { title: money, path: '/money', icon: ICONS.dashboard },
      { title: i18next.t('nav.profile'), path: '/profile', icon: ICONS.dashboard },
      { title: i18next.t('nav.chat'), path: '/chat', icon: ICONS.ecommerce },
      { title: i18next.t('nav.invoice'), path: '/invoice', icon: ICONS.ecommerce },
      { title: i18next.t('nav.orderHistory'), path: '/order-history', icon: ICONS.ecommerce },
      { title: i18next.t('nav.addProduct'), path: '/add-product', icon: ICONS.ecommerce },
      { title: i18next.t('nav.orderList'), path: '/order-list', icon: ICONS.ecommerce },
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
