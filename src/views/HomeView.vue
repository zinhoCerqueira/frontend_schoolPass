<template>
  <v-app-bar color="primary" flat>
    <v-toolbar-title class="font-weight-bold">Conecta Escola</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn variant="text" class="mx-2" @click="loginDialog = true">Entrar</v-btn>
    <v-btn color="accent" variant="flat" class="mx-2" @click="registerDialog = true">Cadastrar Responsável</v-btn>
  </v-app-bar>

  <v-main class="bg-background">
    <!-- Hero Section -->
    <v-container fluid class="fill-height d-flex align-center justify-center pt-10 pb-10">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="7">
          <v-card class="pa-8 elevation-4 text-center">
            <v-card-title class="text-h3 font-weight-bold text-primary mb-4">
              Conectando Escolas, Alunos e Responsáveis.
            </v-card-title>
            <v-card-text class="text-h6 text-md-h5 text-text-secondary mb-6">
              Comunicação clara, acompanhamento fácil, confiança reforçada para uma educação conectada.
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn size="large" color="primary" variant="elevated" class="mx-3" @click="loginDialog = true">Entrar Agora</v-btn>
              <v-btn size="large" color="accent" variant="outlined" class="mx-3" @click="registerDialog = true">Cadastre-se Grátis</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Explanatory Section -->
    <v-container class="mt-12 mb-12">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 font-weight-bold text-primary mb-8">Como Funciona?</h2>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col cols="12" md="4">
          <v-card class="pa-6 elevation-2 fill-height">
            <v-icon size="48" color="primary" class="mb-4">mdi-account-group</v-icon>
            <v-card-title class="text-h6 font-weight-bold text-primary">Para Responsáveis</v-card-title>
            <v-card-text class="text-body-2 text-text-secondary">
              Acompanhe a rotina do seu filho, receba comunicados importantes e participe ativamente da vida escolar.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6 elevation-2 fill-height">
            <v-icon size="48" color="primary" class="mb-4">mdi-school</v-icon>
            <v-card-title class="text-h6 font-weight-bold text-primary">Para Escolas</v-card-title>
            <v-card-text class="text-body-2 text-text-secondary">
              Agilize a comunicação, gerencie avisos de forma eficiente e mantenha todos os responsáveis informados.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6 elevation-2 fill-height">
            <v-icon size="48" color="primary" class="mb-4">mdi-bullhorn</v-icon>
            <v-card-title class="text-h6 font-weight-bold text-primary">Avisos Essenciais</v-card-title>
            <v-card-text class="text-body-2 text-text-secondary">
              Crie e visualize avisos sobre atrasos, eventos, materiais e emergências, tudo em um só lugar.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <v-footer color="primary" flat>
    <v-row justify="center" no-gutters>
      <v-col class="text-center text-caption py-3 text-white" cols="12">
        &copy; {{ new Date().getFullYear() }} Conecta Escola. Todos os direitos reservados.
      </v-col>
    </v-row>
  </v-footer>

  <LoginDialog v-model="loginDialog" />
  <RegisterDialog v-model="registerDialog" />
</template>

<script setup>
import { ref } from 'vue';
import LoginDialog from '@/components/LoginDialog.vue';
import RegisterDialog from '@/components/RegisterDialog.vue';

const loginDialog = ref(false);
const registerDialog = ref(false);

</script>
