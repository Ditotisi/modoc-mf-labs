export const state = () => ({
  notifications: [],
  mailbox: [],
  lang: 'id',
  sidebar_category_name: ''
})

export const mutations = {
  SET_NOTIFICATIONS: (state, data) => {
    state.notifications = data
  },
  SET_MAILBOX: (state, data) => {
    state.mailbox = data
  },
  SET_SIDEBAR_CATEGORY_NAME: (state, data) => {
    state.sidebar_category_name = data
  },
  SET_LANGUAGE: (state, data) => {
    state.lang = data
  }
}

export const actions = {
  getSearch ({ commit }, payload) {
    const { type, keyword, limit } = payload
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + type + '/search?keyword=' + keyword + '&limit=' + limit)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getCategoryCommunity ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/communities/category')
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  checkCategoryLink ({ commit }, val) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + `communities/slug/check?slug=${val}`)
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getTour ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/tour')
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getFloatingBanner ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/floating-button')
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getBannerData ({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/banner/' + id)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getLeaderboardPointlists ({ commit }, payload) {
    const { formData, page } = payload
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_API + 'view/leaderboard/point?page=' + page, formData)
        .then(function (response) {
          const res = response.data
          resolve(res.data)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getLeaderboardLevels ({ commit }, page) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/leaderboard/level?page=' + page)
        .then(function (response) {
          const res = response.data
          resolve(res.data)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getProvinces ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/provinces')
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getCities ({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/cities/' + id)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getMenuSidebar ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/menu-categories')
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getNotifications ({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      if (!rootState.auth.token) { return }
      this.$axios.get(process.env.BASE_API + 'notification/user', {
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.token
        }
      })
        .then(function (response) {
          const res = response.data
          commit('SET_NOTIFICATIONS', res.body)
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getMailbox ({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      if (!rootState.auth.token) { return }
      this.$axios.get(process.env.BASE_API + 'mail/inbox', {
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.token
        }
      })
        .then(function (response) {
          const res = response.data
          commit('SET_MAILBOX', res.body)
          resolve(res.body)
        })
        .catch(function (error) {
          commit('SET_MAILBOX', [])
          reject(error.response)
        })
    })
  },
  getTopUserToday ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/user/top' + '?limit=5')
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getCommunities ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/communities/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getPopular ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'popular/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getQuestions ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/questions/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  submitCommentQuestion ({ commit }, formData) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_API + 'question/answer/post', formData, {
        headers: {
          'content-type': 'multipart/form-data'
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
  postSubmitNewQuestion ({ commit }, formData) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_API + 'question/post', formData, {
        headers: {
          'content-type': 'multipart/form-data'
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
  postSubmitQuestionCommunity ({ commit }, payload) {
    const { formData } = payload
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_API + 'communities/questions', formData, {
        headers: {
          'content-type': 'multipart/form-data'
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
  updateQuestion ({ commit }, payload) {
    const { id, formData } = payload
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_API + `communities/questions/${id}`, formData)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  postSubmitNewCommunity ({ commit }, payload) {
    const { formData } = payload
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_API + 'communities', formData, {
        headers: {
          'content-type': 'multipart/form-data'
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
  postSubmitEditCommunity ({ commit }, payload) {
    const { formData, id } = payload
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_API + `communities/${id}`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
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
  fetchLocationCommunity ({ commit }, keyword) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/cities?city_name=' + keyword)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  submitQnaLike ({ commit, rootState }, data) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: process.env.BASE_API + 'question/postlike',
        method: 'POST',
        data
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
  submitDiscussionLike ({ commit, rootState }, data) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: process.env.BASE_API + 'communities/like',
        method: 'POST',
        data
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
  getDiscussionDetail ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/communities/' + params.id + '/questions/' + params.qid)
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getNews ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/news/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getNewsPopular ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/news/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getNewsNew ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'news/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getNewsFeatures ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: process.env.BASE_API + 'news/picked',
        params,
        method: 'GET'
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
  setPointReadNews ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: process.env.BASE_API + 'point/set/readnews?origin=' + url,
        method: 'POST'
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
  getCategory ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/categories/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getMarketplace ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/marketplace/' + url + '?limit=12')
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getVote ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/votes')
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  submitVote ({ commit, rootState }, formData) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_API + 'view/votes/submit', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: 'Bearer ' + rootState.auth.token
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
  getNewsDetail ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'news/read/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getNewsRelated ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'news/related/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getNewsRelease ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'news/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getQuestionData ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'question/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getCommunityOwned ({ commit, rootState }, url) {
    return new Promise((resolve, reject) => {
      if (!rootState.auth.token) { return }
      this.$axios.get(process.env.BASE_API + 'communities/owned' + url, {
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.token
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
  getListMediaCommunity ({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/communities/' + id + '/medias')
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getListDiscussionCommunity ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/communities/' + url)
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getWidgetFeaturedCommunity ({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + `view/communities/${id}/medias/questions`)
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  // getWidgetTrendingCommunity ({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     this.$axios.get(process.env.BASE_API + 'view/communities/recommended?limit=2')
  //       .then(function (response) {
  //         const res = response.data
  //         resolve(res.body)
  //       })
  //       .catch(function (error) {
  //         reject(error.response)
  //       })
  //   })
  // },
  getLinkPlusCommunity ({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/communities/linkplus/' + id)
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getMemberCommunity ({ commit }, params) {
    const { id, page } = params
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/communities/' + id + '/member' + `?p=${page}`)
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getTopRecommended ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/communities/recommended')
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getCommunityDetail ({ commit }, data) {
    const { param_id, param_slug } = data
    const url = param_slug ? `?share_by=${param_slug}` : ''
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'view/communities/' + param_id + url)
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getTopCommunities ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: process.env.BASE_API + 'view/communities/popular',
        params: {
          limit: 5
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
  getMarketplacePopular ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: process.env.BASE_API + 'view/marketplace/popular',
        params,
        method: 'GET'
      })
        .then(function (response) {
          const res = response.data
          resolve(res.body)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getCommunityData ({ commit }, url) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_URL + 'discover/' + url, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
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
  getMyCommunityData ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_URL + 'get/mycommunity', null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
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
  postLikeQuestion ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_URL + 'action/like', payload, {
        headers: {
          Authorization: ''
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
  postReportQuestion ({ commit }, formData) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BASE_URL + 'report/question', formData, {
        headers: {
          Authorization: ''
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
  getCarBrands ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_API + 'garage/cars/brands')
        .then(function (response) {
          const res = response.data
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getCsrf ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_URL + 'set_csrf')
        .then(function (response) {
          const res = response
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  },
  getUsername ({ commit }, query) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BASE_URL + 'media/users/u?query=' + query)
        .then(function (response) {
          const res = response
          resolve(res)
        })
        .catch(function (error) {
          reject(error.response)
        })
    })
  }
}
