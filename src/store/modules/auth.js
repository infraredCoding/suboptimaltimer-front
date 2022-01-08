const state = {
    authRegisterModal: false,
    authLoginModal: false,
    authState: false
}
  
const actions = {}
  
const mutations = {
    ToggleAuthRegisterModal(state) {
        state.authRegisterModal = !state.authRegisterModal;
    },
    ToggleAuthLoginModal(state) {
        state.authLoginModal = !state.authLoginModal;
    }
}

const getters = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}