<template>
  <RespAppBar />
  <v-main class="no-padding" style="background-color: #f6f6f8">
    <router-view />
  </v-main>
  <RespBottomNav />
</template>

<script setup>
import RespAppBar from "@/components/resp/RespAppBar.vue";
import RespBottomNav from "@/components/resp/RespBottomNav.vue";
</script>

<style scoped>
.no-padding {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>
