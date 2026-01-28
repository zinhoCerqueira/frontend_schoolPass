<template>
  // Barra de navegação
  <v-app-bar :elevation="1" class="app-title">
    <v-app-bar-title>WayToSchool</v-app-bar-title>
    <template v-slot:image>
      <v-img
        gradient="to top left, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:append>
      <div class="app-bar-actions">
        <v-btn
          variant="flat"
          rounded
          prepend-icon="mdi-login-variant"
          class="btn-gradient"
          elevation
        >
          Entrar
        </v-btn>

        <v-btn
          variant="flat"
          rounded
          prepend-icon="mdi-account-plus-outline"
          class="btn-gradient"
        >
          Cadastre-se
        </v-btn>
      </div>
    </template>
  </v-app-bar>

  
</template>

<script setup>
import { ref } from "vue";
import LoginDialog from "@/components/LoginDialog.vue";
import RegisterDialog from "@/components/RegisterDialog.vue";

const loginDialog = ref(false);
const registerDialog = ref(false);
</script>

<style scoped>
/* Título */
.app-title {
  font-family: "Playwrite AU TAS", cursive;
  font-size: 1.25rem;
  font-weight: 600;
  white-space: nowrap;
}

.app-bar-actions {
  display: flex;
  align-items: center;
  margin-inline-end: 20px;
  gap: 10px;
}

.btn-gradient {
  color: white;
  background: linear-gradient(135deg, #1e5f8a, #2f78a8);
}
</style>
