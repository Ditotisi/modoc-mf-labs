
export const state = () => ({
  feedsList: []
})

export const mutations = {
  set (state, data) {
    state.feedsList = data
  },
  add (state, item) {
    state.feedsList.unshift(item)
  }
}
