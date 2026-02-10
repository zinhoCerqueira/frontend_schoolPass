<template>
  <v-footer color="#F2F3FE" class="d-flex flex-column align-center pa-4">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="4" class="text-center py-2">
          <h4 class="footer-heading">Redes Sociais</h4>
          <div>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-1"
              :icon="icon"
              variant="text"
              color="#4c6fff"
            ></v-btn>
          </div>
        </v-col>

        <v-col cols="12" sm="4" class="text-center py-2">
          <h4 class="footer-heading">Contato</h4>
          <p class="footer-subtext">
            Email: contato@waytoschool.com.br <br />
            Telefone: (11) 99999-9999
          </p>
        </v-col>

        <v-col cols="12" class="text-center py-2">
          <p class="footer-text">
            &copy; {{ new Date().getFullYear() }} — <strong class="app-name">WayToSchool</strong>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue';

const icons = ref([
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]);
</script>

<style scoped>
.footer-text {
  color: #1f2a44;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1rem;
}

.app-name {
  font-family: 'Playwrite AU TAS', cursive;
  font-weight: 600;
  color: #1f2a44;
}

.footer-heading {
  color: #1f2a44;
  font-family: "DM Serif Text", serif;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.footer-subtext {
  color: #1f2a44;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>