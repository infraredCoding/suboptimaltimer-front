<template>
  <div class="z-20 md:hidden py-2 text-gray-100 fixed bottom-0 inset-x-0 bg-bgLight flex justify-evenly align-middle">
      <a href="#" @click.prevent="$emit('toggleTimeList')" class="hover:bg-bgDark transition duration-150 w-full mx-3 py-2 rounded-md block text-center bg-dark">
          Time List
      </a>
      <div class="w-full mx-3 rounded-md flex text-center">
        <a href="#" class="w-full px-3 py-2 rounded-md text-center bg-primary">
          <i class="fas fa-plus font-bold"></i>
        </a>
        <select class="bg-bgDark text-gray-50 px-4 py-2 rounded-md focus:outline-none">
            <option value="session_id">3x3 Session 1</option>
            <option value="session_id2">3x3 Session 2</option>
            <option value="session_id3">2x2 Session 1</option>
        </select>
      </div>
      <a href="#" class="hover:bg-bgDark transition duration-150 w-full mx-3 py-2 rounded-md block text-center bg-dark">
          Settings
      </a>
  </div>
</template>

<script>
export default {
    name: 'BottomNav'
}
</script>

<style>

</style>