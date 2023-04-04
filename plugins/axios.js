export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    config.headers.common.Accept = 'application/json'
    config.headers.common.Authorization = 'Bearer ' + store.state.auth.token
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      // window.open(process.env.BASE_URL + 'logout', '_self')
    }
  })
}
