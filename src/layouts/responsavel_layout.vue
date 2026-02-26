<template>
  <v-layout class="layout-wrapper">
    <RespAppBar />

    <v-main class="main-content">
      <router-view />
    </v-main>

    <RespBottomNav />
  </v-layout>
</template>

<script setup>
import RespAppBar from "@/components/resp/RespAppBar.vue";
import RespBottomNav from "@/components/resp/RespBottomNav.vue";
</script>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
}

.main-content {
  background-color: #f6f6f8;
}
</style>
