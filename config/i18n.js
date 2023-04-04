import en from '../locales/en.json'
import id from '../locales/id.json'
export default {
  fallbackLocale: 'id',
  messages: { en, id },
  locales: ['id', 'en'],
  defaultLocale: 'id',
  vueI18n: {
    fallbackLocale: 'id',
    messages: {
      en,
      id
    }
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    alwaysRedirect: false
  }
}
