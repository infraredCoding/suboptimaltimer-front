<template>
    <div id="tList" class="bg-dark shadow-2xl z-10 border-t-2 border-bgDark text-gray-50 w-72 overflow-auto text-center absolute inset-y-0 left-0 transform -translate-x-full transition duration-200 ease-in-out md:relative md:translate-x-0">
        <select @change="handleSessionChange($event)" class="bg-bgDark text-gray-50 px-4 py-2 my-2 rounded-md focus:outline-none" v-if="allSessions.length > 0">
            <option v-for="(s, idx) in allSessions" :key="idx" :value="s.session_id" :selected="s == currentSession">
              {{s.name}}
            </option>
        </select>
        <button @click="ToggleModal()" class="my-4 btn bg-secondary hover:text-secondary hover:bg-gray-100 transition duration-150">
            <i class="fas fa-plus mr-3"></i> New Session
        </button>
        <ul class="list-none text-md text-left ml-16 mt-2">
          <li><span class="pr-3 font-medium">Ao5</span> 6.9</li>
          <li><span class="pr-3 font-medium">Mo3</span> 6.9</li>
          <li><span class="pr-3 font-medium">Ao12</span> 6.9</li>
        </ul>
        <ol class="text-center font-body mt-3" v-if="currentSession">
            <li v-for="(solve, idx) in currentSession.solveList" :key="idx"> 
              {{idx + 1}}. <span class="pl-3 font-bold">{{ parseTime(solve.time) }}</span> 
              <i class="text-primary ml-2 px-1.5 py-1.5 rounded cursor-pointer hover:bg-gray-900 transition duration-100 fas fa-pen"></i>
            </li>
        </ol>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import moment from 'moment';

export default {
    name: 'TimeList',
    data(){
        return {
          small: true,
          timeList: [],
          sessionList: [],
          stats: {},
          currSession: this.currentSession
        }
    },
    props: {
      toggles: Boolean
    },
    watch:{
      toggles: function(newVal, oldVal) {
        if (this.small) {
          const tList = document.querySelector('#tList');
          tList.classList.toggle('-translate-x-full')
          console.log(`timelist ${newVal} from ${oldVal}`)
        }
      }
    },
    mounted() {
      this.checkSmallScreen();
      window.addEventListener('resize', this.checkSmallScreen);
    },
    methods: {
      handleSessionChange(e) {
        let newSession = this.allSessions.filter(s => {
          return s.session_id == e.target.value
        })
        this.SetCurrentSession(newSession)
      },
      parseTime(time){
        var minutes = moment.duration(time).minutes();
        return minutes == '0' ? moment.utc(time).format('ss.SS') : moment.utc(time).format('mm:ss.SS')
      },
      checkSmallScreen() {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 767){
          this.small = true;
          return;
        }
        this.small = false;
      },

      ...mapMutations('modals', ['ToggleModal']),
      ...mapMutations('sessions', ['SetCurrentSession'])
    },
    computed: {
      ...mapState('sessions', ['currentSession']),
      ...mapState('sessions', ['allSessions']),
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