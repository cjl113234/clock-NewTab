<template>
  <div class="container">
    <div class="grid"
         v-for="(item, index) in data"
         :key="index">{{ item }}</div>
  </div>
</template>

<script>

import webData from "../datas/webData.js"

import { reactive } from "vue"

export default {
  name: "App",
  setup () {
    const { data } = reactive(webData)
    return {
      data
    }
  }
}
</script>

<style scoped>
.grid {
  border: 5px solid red;
}
</style>
