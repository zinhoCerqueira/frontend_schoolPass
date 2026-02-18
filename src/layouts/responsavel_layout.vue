<template>
  <RespAppBar />
  <v-main style="background-color: #f6f6f8">
    <router-view />
  </v-main>
  <RespBottomNav />
</template>

<script setup>
import RespAppBar from "@/components/resp/RespAppBar.vue";
import RespBottomNav from "@/components/resp/RespBottomNav.vue";
</script>
