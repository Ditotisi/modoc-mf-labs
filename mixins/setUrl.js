export default {
  mounted () {
    this.setUrlToLocalStorage()
  },
  methods: {
    setUrlToLocalStorage () {
      const url = window.location.href
      const name = process.env.BASE_URL
      const split1 = name.split('//')
      const split2 = split1[1]
      const splitLength = split1[1].split('.').length
      const domain = '.' + split2.split('.').reverse().splice(0, splitLength).reverse().join('.').slice(0, -1)

      this.$cookies.set('modoc_url', url, '24d', null, `${domain}`)
    }
  }
}
