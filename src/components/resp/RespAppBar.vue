<template>
  <v-app-bar color="white" scroll-behavior="elevate" height="70">
    <div class="d-flex flex-column ml-4 justify-center">
      <span class="text-caption text-primary" style="line-height: 1;">Bem vindo (a)</span>
      <span class="text-h6 font-weight-bold title-text" style="line-height: 1.2;">Olá, {{ nome }}</span>
    </div>

    <v-spacer></v-spacer>

    <v-menu location="bottom end">
      <template v-slot:activator="{ props }">
        <v-avatar color="#F2F3FE" class="mr-4" size="45" v-bind="props" style="cursor: pointer;">
          <v-icon icon="mdi-account" color="#1f2a44" size="28"></v-icon>
        </v-avatar>
      </template>
      <v-list>
        <v-list-item @click="handleLogout">
          <template v-slot:prepend>
            <v-icon icon="mdi-logout"></v-icon>
          </template>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const nome = ref('');
const router = useRouter();

onMounted(() => {
  nome.value = localStorage.getItem('nome');
});

const handleLogout = () => {
  localStorage.clear();
  router.push('/');
};
</script>

<style scoped>
.title-text {
  color: #1f2a44;
  font-family: 'Roboto Condensed', cursive;
}
</style>