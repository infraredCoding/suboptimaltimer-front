const state = {
  modalState: false,
}

const actions = {}

const mutations = {
    ToggleModal(state) {
        state.modalState = !state.modalState;
    }
}

const getters = {
    getModalState(state) {
        return state.modalState;
    }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}