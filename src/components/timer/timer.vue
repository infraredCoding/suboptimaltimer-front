<template>
  <div class="flex flex-col m-3 lg:m-0 lg:mt-3 lg:-mb-3 lg:ml-3 w-screen font-body bg-dark rounded-md overflow-y-auto">
      <div class="text-center mx-auto">
          <h6 class="text-center pt-6 text-md md:text-lg lg:text-xl px-10 md:px-16 text-gray-100">
            Rw2 L' B Fw U L Fw' L' R Uw Dw D Lw2 Dw2 D Bw' R' Fw' Dw' D' F Dw2 Bw' Lw' Fw F D2 U Dw2 Lw R' D2 F' R' L2 D Lw2 R2 D' Uw2 Fw2 Uw' R F' Bw2 Dw' D Bw2 D2 Lw Bw U2 R2 B' U Bw' R' D U2 Bw
          </h6>
          <div class="flex flex-col">
            <div class="py-7 md:py-5">
              <h1 :class="{'text-primary': timerState == 'ready' }" class="font-timer font-light text-7xl lg:text-8xl py-3 lg:py-2 text-gray-50 text-center">
                {{formattedTime}}
              </h1>
              <div class="text-center">
                  <span @click="solveOk()" class="text-gray-50 mx-2 px-3 py-1 font-bold transition duration-150 cursor-pointer rounded hover:bg-gray-50 hover:text-primary bg-primary">OK</span>
                  <span @click="solvePlusTwo()" class="text-gray-50 mx-2 px-3 py-1 font-bold transition duration-150 cursor-pointer rounded hover:bg-gray-50 hover:text-secondary bg-secondary">+2</span>
                  <span @click="solveDNF()" class="text-gray-50 mx-2 px-3 py-1 font-bold transition duration-150 cursor-pointer rounded hover:bg-gray-50 hover:text-danger bg-danger">DNF</span>
              </div>
            </div>
            <div class="flex">
                <twisty-player
                  class="pb-10 mb-0 mx-auto w-64 md:w-80 sm:w-96 relative"
                  alg="Rw2 L' B Fw U L Fw' L' R Uw Dw D Lw2 Dw2 D Bw' R' Fw' Dw' D' F Dw2 Bw' Lw' Fw F D2 U Dw2 Lw R' D2 F' R' L2 D Lw2 R2 D' Uw2 Fw2 Uw' R F' Bw2 Dw' D Bw2 D2 Lw Bw U2 R2 B' U Bw' R' D U2 Bw"
                  background="none"
                  control-panel="none"
                  puzzle="5x5x5"
                  visualization="2D">
                </twisty-player>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Timer',
    data () {
      return {
        timerState: 'stopped',
        lastKeyUp: 0,
        keyDownAt: 0,

        currentTime: 0,
        currentPenalty: 0,
        ticker: undefined,
      }
    },
    computed: {
      formattedTime(){
        var minutes = moment.duration(this.currentTime).minutes();
        var time = minutes == '0' ? moment.utc(this.currentTime).format('ss.SS') : moment.utc(this.currentTime).format('mm:ss.SS')

        switch (this.currentPenalty) {
          case 0:
            return time

          case 1:
            return `${time}+`

          case 2:
            return 'DNF'
        }
        return time
      },
      ...mapState('sessions', ['currentSession'])
    },
    created () {
      window.addEventListener('keyup', e => this.startTimer(e))
      window.addEventListener('keydown', e => this.prepOrStop(e))
    },
    methods: {
      startTimer (e){
        if (e.key == " "){
          this.lastKeyUp = new Date();

          if (this.timerState == 'ready'){
            this.timerState = 'running'

            this.ticker = setInterval(() => {
              this.currentTime += 10
            }, 10)
          }
        }
      },
      prepOrStop(e){
        if (e.key == " "){
          switch (this.timerState) {
            case 'stopped':
              this.keyDownAt = new Date();

              setTimeout(() => {
                if (+this.keyDownAt > +this.lastKeyUp){
                  this.timerState = 'ready'
                  this.currentTime = 0
                }
              }, 200)
              break;

            case 'running':
              this.timerState = 'stopped'
              clearInterval(this.ticker)
              this.addNewSolve({
                time: this.currentTime,
                timestamp: moment.utc(),
                penalty: this.currentPenalty
              });
              break;
          
            default:
              break;
          }
        }
      },

      // Penalties
      solveOk() {
        if (this.currentPenalty == 1){
          this.currentTime -= 2000
        }
        this.currentPenalty = 0
      },
      solvePlusTwo() {
        this.currentPenalty = 1
        this.currentTime += 2000
      },
      solveDNF() {
        if (this.currentPenalty == 1){
          this.currentTime -= 2000
        }
        this.currentPenalty = 2
      },

      ...mapActions('sessions', ['addNewSolve'])
    }
}
</script>

<style scoped>
</style>