import i18next from 'i18next';
import moment from 'moment';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const DEFAULT_LANGUAGE = 'en';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback: any) => {
    // callback('en');
    // moment.locale('ko');
    // return callback('ko');
    const locales = RNLocalize.getLocales();
    const lang = locales?.[0]?.languageCode?.split('-')[0];
    const isSupported = ['en'].includes(lang);
    const checkedLang = isSupported ? lang : DEFAULT_LANGUAGE;
    moment.locale(checkedLang);
    return callback(checkedLang);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  // @ts-ignore
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    debug: false,
    resources: {
      en: {
        translation: require('./locales/en'),
      },
    },
  });

export default i18next;
