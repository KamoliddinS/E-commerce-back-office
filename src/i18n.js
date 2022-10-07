
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import ru from "./locales/ru/translation.json";
// import uz from "./locales/uz/translation.json";

// const resources = {
//   ru: {
//     translation: ru
//   },
//   uz: {
//     translation: uz
//   }
// };

// i18n

//   .use(initReactI18next)
  // .init({
  //   resources,
  //   lng: "ru",
  //   keySeparator: false,
  //   interpolation: {
  //     escapeValue: false
  //   }
  // })
  // .init({
  //   resources,
  //   fallbackLng: 'uz',
  //   debug: true,

  //   interpolation: {
  //     escapeValue: false, // not needed for react as it escapes by default
  //   }
  // });


// export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from "./locales/ru/translation.json";
import uz from "./locales/uz/translation.json";

const resources = {
  ru: {
    translation: ru,
  },
  uz: {
    translation: uz,
  },
};

i18n

  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: "uz",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
