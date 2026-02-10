<template>
  <AppBar />

  <v-container class="d-flex flex-column justify-center align-center min-height-container" fluid>
    <v-row>
      <v-col cols="12" class="text-center pa-4">
        <h1 class="title-text mb-4">Sobre a WayToSchool</h1>
        <p class="description-text">
          Somos uma plataforma dedicada a otimizar a saída de alunos nas escolas,
          tornando-a mais rápida, segura e organizada. Acreditamos que a tecnologia
          pode transformar a comunicação entre pais, responsáveis e instituições de ensino,
          reduzindo filas, evitando aglomerações e garantindo que cada criança saia no
          momento certo com a pessoa certa.
        </p>
        <p class="description-text mt-4">
          Nossa missão é proporcionar tranquilidade para as famílias e eficiência para as escolas,
          criando um ambiente mais harmonioso e seguro para toda a comunidade escolar.
        </p>
      </v-col>
    </v-row>
  </v-container>

  <AppFooter />
</template>

<script setup>
import AppBar from "../components/AppBar.vue";
import AppFooter from "../components/AppFooter.vue";
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

.min-height-container {
  min-height: calc(100vh - 128px); /* Adjust based on AppBar and AppFooter height */
}
</style>
