export const state = () => ({
  token: 'sda',
  uid: 'sdas',
  user: {
    member: 'sdasd',
    fetchProfileLoading: false,
    signIn: true,
    myProfile: {
      id: '1',
      username: 'dito',
      slug: 'dsds'
    },
    isLogin: true
  }
})

export const mutations = {
  SET_TOKEN: (state, data) => {
    state.token = data
  },
  SET_UID: (state, data) => {
    state.uid = data
  },
  SET_USER_SIGNIN: (state, data) => {
    state.user.signIn = data
  },
  SET_MY_PROFILE: (state, data) => {
    state.user.myProfile = data
  },
  SET_USER_LOGIN: (state, data) => {
    state.user.isLogin = data
  },
  SET_FETCH_PROFILE_LOADING: (state, data) => {
    state.user.fetchProfileLoading = data
  },
  SET_MEMBER: (state, data) => {
    state.user.member = data
  }
}

export const actions = {
  getUserByCredential ({ commit, state }, formData) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_API + 'auth/callback/google', formData)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getSession ({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_URL + 'user_login_session')
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getUserId ({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'protected?u=' + state.uid, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getUserProfile ({ commit, state }, id) {
    commit('SET_FETCH_PROFILE_LOADING', true)
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'userinfo/' + id, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
        .then(function (response) {
          const res = response.data
          commit('SET_MY_PROFILE', res.body)
          commit('SET_FETCH_PROFILE_LOADING', false)
          resolve(res)
        })
        .catch(function (error) {
          commit('SET_FETCH_PROFILE_LOADING', false)
          reject(error.response)
        })
    })
  },
  submitLogin ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { useremail, password } = data
      const formDataLogin = new FormData()
      formDataLogin.append('useremail', useremail)
      formDataLogin.append('passwd', password)

      this.$axios.post(process.env.BASE_API + 'member/login/', data, {
        headers: {
          'Content-Type': 'text/plain'
        }
      })
        .then(function (response) {
          const res = response.data
          commit('SET_USER_LOGIN', true)
          commit('SET_USER_SIGNIN', res)
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  submitLogOut () {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'member/logout/', {
        headers: {
          'Content-Length': '',
          Host: ''
        }
      })
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  }
}
