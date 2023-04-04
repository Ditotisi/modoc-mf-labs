import googleOneTap from 'google-one-tap'
export default {
  data: () => ({
    user_profile: {
      avatar: '',
      username: '',
      id: null
    },
    domain: '',
    cookieDialog: false
  }),
  created () {
    this.$store.commit('auth/SET_FETCH_PROFILE_LOADING', true)
    this.setDomain()
  },
  async mounted () {
    await this.checkSession()
    this.checkAuth()
    const cookie = this.$cookies.get('modoc_cookies')
    if (!cookie) {
      // this.cookieDialog = true
    }
  },
  methods: {
    confirmCookie () {
      this.$cookies.set('modoc_cookies', true, '90d', null, `${this.domain}`)
      this.cookieDialog = false
    },
    setDomain () {
      const name = process.env.BASE_HOME
      const split1 = name.split('//')
      const split2 = split1[1]
      const splitLength = (split1[1].split('.').length) - 1
      this.domain = '.' + split2.split('.').reverse().splice(0, splitLength).reverse().join('.').slice(0, -1)
    },
    async checkAuth () {
      if (!this.$store.state.auth.token) {
        this.$store.commit('auth/SET_FETCH_PROFILE_LOADING', false)
        return
      }
      if (this.user_profile.id) {
        this.$store.commit('auth/SET_FETCH_PROFILE_LOADING', false)
        return this.$store.commit('auth/SET_USER_LOGIN', true)
      }
      await this.$store.dispatch('auth/getUserId')
        .then(async (res) => {
          if (res && res.login_user_id) {
            await this.getUserProfile(res.login_user_id)
          }
          this.$store.commit('auth/SET_USER_LOGIN', true)
        })
        .catch((err) => {
          this.clearLocalStorage()
          throw new Error(err)
        })
    },
    clearLocalStorage () {
      const token = this.$cookies.get('modoc_token')
      const uid = this.$cookies.get('modoc_uid')
      if (token && uid) {
        this.$cookies.remove('modoc_token')
        this.$cookies.remove('modoc_uid')
      }
    },
    async getUserProfile (id) {
      this.$store.commit('auth/SET_FETCH_PROFILE_LOADING', true)
      await this.$store.dispatch('auth/getUserProfile', id)
        .then((res) => {
          this.user_profile = res.body
          this.$store.commit('auth/SET_FETCH_PROFILE_LOADING', false)
        })
        .catch((err) => {
          this.$store.commit('auth/SET_FETCH_PROFILE_LOADING', false)
          throw new Error(err)
        })
    },
    async checkSession () {
      if (this.$cookies.get('modoc_profile')) {
        const profile = this.$cookies.get('modoc_profile')
        this.$store.commit('auth/SET_USER_LOGIN', true)
        this.$store.commit('auth/SET_MY_PROFILE', profile)
        this.user_profile = profile
      }

      if (this.$route.query && this.$route.query.u) {
        if (this.$route.query.u === 'false') {
          return this.clearLocalStorage()
        }
        this.$store.commit('auth/SET_UID', this.$route.query.u)
        const decodeFirst = await this.decodeToken(this.$route.query.p)
        const decodeSecond = await this.decodeToken(decodeFirst)
        this.$store.commit('auth/SET_TOKEN', decodeSecond)
        this.$cookies.set('modoc_token', decodeSecond, '3d', null, `${this.domain}`)
        this.$cookies.set('modoc_uid', this.$route.query.u, '3d', null, `${this.domain}`)
      } else if (this.$cookies.get('modoc_token')) {
        const token = this.$cookies.get('modoc_token')
        const uid = this.$cookies.get('modoc_uid')
        this.$store.commit('auth/SET_UID', uid)
        this.$store.commit('auth/SET_TOKEN', token)
      } else {
        this.activateOneTap()
      }
    },
    decodeToken (val) {
      if (window) {
        return decodeURIComponent(window.atob(val))
      }
    },
    activateOneTap () {
      const options = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        auto_select: false,
        cancel_on_tap_outside: false,
        context: 'signin'
      }
      googleOneTap(options, async (response) => {
        const formData = new FormData()
        formData.append('credential', response.credential)
        await this.$store.dispatch('auth/getUserByCredential', formData)
          .then((res) => {
            if (res.authenticated) {
              this.$cookies.set('modoc_token', res.access_token, '3d', null, `${this.domain}`)
              this.$cookies.set('modoc_uid', res.uid, '3d', null, `${this.domain}`)
              this.$store.commit('auth/SET_TOKEN', res.access_token)
              this.$store.commit('auth/SET_UID', res.uid)
              this.checkAuth()
            } else {
              this.$message({
                message: 'Gagal login',
                type: 'error'
              })
            }
          })
      })
    },
    head () {
      return {
        __dangerouslyDisableSanitizers: ['script'],
        script: [
          {
            src: 'https://m.modoc.id/privacy-policy'
          },
          {
            innerHTML: `
            document.addEventListener('DOMContentLoaded', function () {
  cookieconsent.run({"notice_banner_type":"headline","consent_type":"express","palette":"light","language":"en","page_load_consent_levels":["strictly-necessary"],"notice_banner_reject_button_hide":false,"preferences_center_close_button_hide":false,"page_refresh_confirmation_buttons":false,"website_name":"Mobility Doctor Indonesia"});
  });`
          }
        ],
        noscript: [
          { innerHTML: 'This website requires JavaScript.' }
        ]
      }
    }
  }
}
