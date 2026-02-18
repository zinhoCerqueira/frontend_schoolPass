<template>
  <v-container class="pa-4" color="blue-lighten-5" fluid>
    <v-card class="pa-4 mb-4" rounded="lg" elevation="0">
      <h2 class="text-h6 mb-2" style="color: #1f2a44;">Status da Saída</h2>
      <p class="text-body-2 text-grey-darken-1">
        Selecione um aluno para avisar que você está a caminho.
      </p>
      
      <!-- Placeholder de conteúdo -->
      <v-sheet
        class="d-flex align-center justify-center mt-4 bg-grey-lighten-4"
        height="150"
        rounded="lg"
        border="dashed"
      >
        <span class="text-caption text-grey">Lista de alunos aparecerá aqui</span>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script setup>
// Lógica da página home
</script>

<route lang="yaml">
meta:
  layout: responsavel_layout
</route>
