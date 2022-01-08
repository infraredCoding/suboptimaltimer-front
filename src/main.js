import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import Vuex from 'vuex'
import store from './store'

createApp(App).use(store).use(Vuex).mount('#app')
