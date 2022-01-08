import {createStore} from 'vuex';
import modals from './modules/modals'
import sessions from './modules/sessions';
import auth from './modules/auth'

export default createStore({
  modules: {
    auth,
    modals,
    sessions
  }
})