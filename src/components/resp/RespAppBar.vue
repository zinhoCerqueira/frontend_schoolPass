<template>
  <v-app-bar color="white" scroll-behavior="elevate" height="70">
    <div class="d-flex flex-column ml-4 justify-center">
      <span class="text-caption text-primary" style="line-height: 1;">Bem vindo (a)</span>
      <span class="text-h6 font-weight-bold title-text" style="line-height: 1.2;">Olá, {{ nome }}</span>
    </div>

    <v-spacer></v-spacer>

    <v-avatar color="#F2F3FE" class="mr-4" size="45">
      <v-icon icon="mdi-account" color="#1f2a44" size="28"></v-icon>
    </v-avatar>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const nome = ref('');

onMounted(() => {
  nome.value = localStorage.getItem('nome');
});
</script>

<style scoped>
.title-text {
  color: #1f2a44;
  font-family: 'Roboto Condensed', cursive;
}
</style>