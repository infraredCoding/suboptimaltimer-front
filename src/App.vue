<template>
  <div class="bg-bgDark h-screen flex flex-col">
    <Navbar />
    <div class="relative overflow-hidden flex flex-grow">
      <TimeList :toggles="toggleTList"/>
      <Timer />
    </div>
    <BottomNav @toggleTimeList="toggleTimeList"/>
    <CreateSessionModal />

    <!-- auth modals -->
    <LoginModal />
    <RegisterModal />
  </div>
</template>

<script>
import Navbar from './components/nav/navbar'
import TimeList from './components/timer/timeList'
import Timer from './components/timer/timer'
import BottomNav from './components/nav/bottomNav'
import LoginModal from './components/auth/loginModal'
import RegisterModal from './components/auth/signupModal'

import CreateSessionModal from './components/timer/sessionForm'
import { mapActions } from 'vuex'

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

export default {
  name: 'App',
  components: {
    Navbar,
    TimeList,
    Timer,
    BottomNav,
    CreateSessionModal,
    LoginModal,
    RegisterModal
  },
  data() {
    return {
      toggleTList: false,
    }
  },
  methods: {
    toggleTimeList() {
      this.toggleTList = !this.toggleTList;
    },
    ...mapActions('sessions', ['initSessions'])
  },
  mounted() {
    this.initSessions();
  }
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #182B3C;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #264059;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
