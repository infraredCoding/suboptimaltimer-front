<template>
  <div>
    <transition name="pop">
      <div v-if="authRegisterModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-auto my-6 mx-auto max-w-sm">
            <!--content-->
            <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dark outline-none focus:outline-none">
            <!--header-->
            <div class="flex items-start justify-between p-5 border-solid border-blueGray-200 rounded-t">
                <h3 class="text-3xl font-semibold text-gray-50">
                Register
                </h3>
                <button class="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
                <span class="bg-transparent text-gray-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                </span>
                </button>
            </div>
            <!--body-->
            <div class="relative p-6 flex-auto">
                <input type="text" placeholder="name" class="bg-bgDark text-gray-50 px-4 py-2 my-2 rounded-md focus:outline-none" v-model="name">
                <input type="email" placeholder="email" class="bg-bgDark text-gray-50 px-4 py-2 my-2 rounded-md focus:outline-none" v-model="email">
                <input type="text" placeholder="username" class="bg-bgDark text-gray-50 px-4 py-2 my-2 rounded-md focus:outline-none" v-model="username">
                <input type="password" placeholder="password" class="bg-bgDark text-gray-50 px-4 py-2 my-2 rounded-md focus:outline-none" v-model="password">
            </div>
            <!--footer-->
            <div class="flex items-center justify-end p-6 border-solid border-blueGray-200 rounded-b">
                <button class="text-danger bg-transparent font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                Close
                </button>
                <button class="text-gray-50 bg-primary rounded hover:bg-gray-50 hover:text-primary font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="createNewSession()">
                Register
                </button>
            </div>
            </div>
        </div>
      </div>
    </transition>
    <div v-if="authRegisterModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: "RegisterModal",
  data() {
    return {
      name: '',
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    toggleModal: function(){
      this.ToggleAuthRegisterModal();
    },
    ...mapMutations('auth', ['ToggleAuthRegisterModal'])
  },
  computed: {
    ...mapState('auth', ['authRegisterModal'])
  }
}
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.35s ease;
}

.pop-enter-from,
.pop-leave-to {
  transform: translateY(-100%);
}
</style>