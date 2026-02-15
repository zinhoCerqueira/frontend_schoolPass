<template>
  <v-app-bar color="#F2F3FE" scroll-behavior="elevate">
    <v-app-bar-title class="title">
      WayToSchool
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn variant="flat" rounded="lg" color="#4c6fff" class="mr-4 btn-destaque" @click="openAuth('login')">
      Entrar
    </v-btn>
  </v-app-bar>

  <v-dialog v-model="dialog" max-width="450" :fullscreen="smAndDown">
    <AuthForm @close="dialog = false" :initial-tab="initialAuthTab" />
  </v-dialog>
</template>

<script setup>
  import { ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useRouter } from 'vue-router';
  import AuthForm from './auth/AuthForm.vue';

  const dialog = ref(false);
  const router = useRouter();
  const { smAndDown } = useDisplay();
  const initialAuthTab = ref('login');

  const openAuth = (tab) => {
    initialAuthTab.value = tab;
    if (smAndDown.value) {
      router.push({ path: '/authpage', query: { tab: tab === 'register' ? 'register' : 'login' } });
    } else {
      dialog.value = true;
    }
  };
</script>

<style scoped>
  .title {
    color: #1f2a44;
    font-family: 'Playwrite AU TAS', cursive;
    font-weight: 600;
    font-size: clamp(18px, 2.5vw, 28px);
  }

  :deep(.v-toolbar-title__placeholder) {
  overflow: visible;
  text-overflow: clip;
  white-space: nowrap;
}

.btn-destaque {
  animation: pulse 4s infinite;
}

@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 rgba(76,111,255,0.5); }
  70%  { box-shadow: 0 0 0 12px rgba(76,111,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(76,111,255,0); }
}

</style>
