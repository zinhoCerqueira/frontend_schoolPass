<template>
  <AppBar />

  <v-container class="d-flex flex-column justify-center" fluid>
    <v-row>
      <v-col cols="12" md="6" class="text-left pa-4">
        <h1 class="title-text mb-4">Saída mais rápida, segura e sem filas.</h1>
        <p class="description-text">
          Avise quando estiver chegando e a escola <br />
          prepara o aluno para a saída. Mais agilidade <br />
          para os responsáveis e mais organização e <br />
          confiança para a escola.
        </p>
      </v-col>
      <v-col class="hero-col">
        <v-btn
          variant="flat"
          rounded="lg"
          color="#4c6fff"
          class="index-fix btn-destaque"
          @click="openAuth('register')"
        >
          Crie sua conta
        </v-btn>

        <v-img
          class="hero-img"
          src="@/assets/escola_simples_background.png"
          width="400"
          height="300"
        />
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-col cols="12">
        <h2 class="title-text my-2">Recursos Principais</h2>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center" no-gutters>
      <v-col
        v-for="(feature, index) in features.slice(0, 3)"
        :key="index"
        cols="12"
        md="4"
        class="pa-2"
      >
        <v-card
          class="d-flex align-center pa-4"
          color="#F2F3FE"
          flat
          rounded="lg"
        >
          <div class="mr-4">
            <v-avatar color="#4c6fff" size="60">
              <v-icon dark size="36">{{ feature.icon }}</v-icon>
            </v-avatar>
          </div>
          <div>
            <h3 class="card-title-text">{{ feature.title }}</h3>
            <p class="card-description-text">{{ feature.text }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <AppFooter />

  <v-dialog v-model="dialog" max-width="450" :fullscreen="smAndDown">
    <AuthForm 
      @close="dialog = false"
      :initial-tab="initialAuthTab" 
    />
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useRouter } from 'vue-router';
import AppBar from "../components/AppBar.vue";
import AppFooter from "../components/AppFooter.vue";
import AuthForm from '../components/auth/AuthForm.vue';

const dialog = ref(false);
const router = useRouter();
const { smAndDown } = useDisplay();
const initialAuthTab = ref('register');

const openAuth = (tab) => {
  initialAuthTab.value = tab;
  if (smAndDown.value) {
    router.push({ path: '/authpage', query: { tab } });
  } else {
    dialog.value = true;
  }
};

const features = [
  {
    icon: "mdi-car-outline",
    title: "Estou a caminho",
    text: "Avise a escola quando sair de casa para buscar o aluno.",
  },
  {
    icon: "mdi-clock-outline",
    title: "Menos espera",
    text: "A escola se organiza com antecedência, evitando filas.",
  },
  {
    icon: "mdi-bell-ring-outline",
    title: "Notificação em tempo real",
    text: "A equipe recebe o aviso instantaneamente.",
  },
  {
    icon: "mdi-shield-check-outline",
    title: "Mais segurança",
    text: "Somente responsáveis autorizados fazem a retirada.",
  },
  {
    icon: "mdi-account-child-outline",
    title: "Foco no aluno",
    text: "Crianças saem no momento certo, sem aglomeração.",
  },
  {
    icon: "mdi-school-outline",
    title: "Rotina organizada",
    text: "A escola controla melhor os horários de saída.",
  },
];
</script>

<style scoped>
.title-text {
  color: #1f2a44;
  font-family: "DM Serif Text", serif;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.1;
}

.description-text {
  color: #1f2a44;
  font-family: "Roboto Condensed", sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.4;
}

.card-title-text {
  color: #1f2a44;
  font-family: "DM Serif Text", serif;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  line-height: 1.2;
}

.card-description-text {
  color: #1f2a44;
  font-family: "Roboto Condensed", sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  line-height: 1.3;
}

.hero-col {
  position: relative;
  overflow: hidden;
  min-height: 200px;
}

.hero-img {
  position: absolute;
  top: 10px;
  right: -20px;
  z-index: 0;
  width: clamp(320px, 45vw, 620px);
}

.index-fix {
  z-index: 1;
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
