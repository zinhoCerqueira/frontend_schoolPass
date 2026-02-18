<template>
  <v-container class="pa-4" fluid>
    <v-card class="pa-4 mb-4" rounded="lg" elevation="0">
      <div class="d-flex align-center">
        <v-sheet
          color="#1f2a44"
          class="d-flex align-center justify-center rounded-lg mr-4"
          width="48"
          height="48"
        >
          <v-icon icon="mdi-car-side" color="white" size="24"></v-icon>
        </v-sheet>
        <div>
          <h2 class="text-h6 font-weight-bold title-text" style="line-height: 1.2;">Eaí ? Tá chegando ?</h2>
          <p class="text-body-2 text-grey-darken-1 mt-1">Avise a escola que você está chegando.</p>
        </div>
      </div>

      <v-btn
        block
        color="#4c6fff"
        class="mt-4 text-none"
        rounded="lg"
        flat
        append-icon="mdi-arrow-right"
      >
        Estou a caminho
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
// Lógica da página home
</script>

<style scoped>
.title-text {
  color: #1f2a44;
  font-family: 'Roboto Condensed', sans-serif;
}
</style>

<route lang="yaml">
meta:
  layout: responsavel_layout
</route>
