<template>
  <div v-if="alertOpen" class="text-white px-6 py-4 border-t-2 w-52 rounded relative mb-4 bg-bgLight"
    :class="connStateClass">
    <span class="text-xl inline-block mr-5 align-middle">
      <i class="fas fa-bell"></i>
    </span>
    <span class="inline-block align-middle mr-8" v-if="status == 'Regained' ">
      Connection Has Been Re-established. Syncing Data
    </span>
    <span class="inline-block align-middle mr-8" v-else-if="status == 'Lost' ">
      Connection Lost. Solves Will be Saved In the Browser
    </span>
    <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" v-on:click="closeAlert()">
      <span>×</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "connectionAlert",
  data() {
    return {
      alertOpen: true
    }
  },
  props: {
      status: String
  },
  computed: {
      connStateClass: function() {
          return {
              'border-primary': this.status == 'Regained',
              'border-danger': this.status == 'Lost',
          }
      }
  },
  methods: {
    closeAlert: function(){
      this.alertOpen = false;
    }
  }
}
</script>