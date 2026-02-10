<template>
  <AppBar />

  <v-container class="d-flex flex-column justify-center fill-height" fluid>
    <v-row>
      <v-col cols="12" class="text-left pa-4">
        <h1 class="title-text mb-4">Saída mais rápida, segura e sem filas.</h1>
        <p class="description-text mb-6">
          Avise quando estiver chegando e a escola <br> prepara o aluno para a saída.
          Mais agilidade <br> para os responsáveis e mais organização e <br> confiança
          para a escola.
        </p>
        <v-btn variant="flat" rounded="lg" color="#4c6fff">
          Experimente
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import AppBar from '../components/AppBar.vue'
</script>

<style scoped>
.title-text {
  color: #1f2a44;
  font-family: 'DM Serif Text', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.1;
}

.description-text {
  color: #1f2a44;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.4;
}
</style>
