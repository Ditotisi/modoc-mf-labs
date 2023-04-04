import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import VueCookies from 'vue-cookies'

Vue.use(ElementUI, { locale, size: 'small', zIndex: 3000 })
Vue.use(VueCookies)
