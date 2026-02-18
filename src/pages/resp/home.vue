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

    <!-- Seção Meus Alunos -->
    <div class="d-flex align-center justify-space-between mt-8 mb-2">
      <h2 class="text-h6 font-weight-bold section-title">Meus Alunos</h2>
      <v-chip color="primary" variant="tonal" size="small" label>2 Ativos</v-chip>
    </div>

    <!-- Lista de Alunos -->
    <v-card
      v-for="aluno in alunos"
      :key="aluno.id"
      class="mb-3"
      flat
      rounded="lg"
    >
      <div class="d-flex align-center pa-3">
        <v-avatar size="48" class="mr-4">
          <v-img :src="aluno.avatar" :alt="aluno.nome"></v-img>
        </v-avatar>

        <div>
          <div class="font-weight-bold text-grey-darken-4">{{ aluno.nome }}</div>
          <div class="text-body-2 text-grey-darken-1">{{ aluno.info }}</div>
        </div>

        <v-spacer></v-spacer>

        <v-icon color="grey-lighten-1">mdi-chevron-right</v-icon>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const alunos = ref([
  {
    id: 1,
    nome: 'Lucas Matos',
    info: '5º ano - Turma B',
    // A foto real do aluno virá do backend, esta é uma imagem temporária
    avatar: 'https://media.gettyimages.com/id/1899572945/pt/foto/portrait-of-a-girl-student-on-art-class-at-school.jpg?s=612x612&w=gi&k=20&c=Yl0dZhE0uyKPjYLb3FLo1WJuJ5oY4Ut5QFtA1vuGbXg='
  },
  { id: 2,
    nome: 'Júlia Martins',
    info: '3º ano - Turma A',
    // A foto real do aluno virá do backend, esta é uma imagem temporária
    avatar: 'https://media.gettyimages.com/id/2203067603/pt/foto/schoolboy-sitting-at-desk-smiling-looking-sideways.jpg?s=1024x1024&w=gi&k=20&c=y7NAh9-Vw2Q06mcaLgCDcVC1_Oqs3a0l1Y80_Q-gB2o='
  },
]);
</script>

<style scoped>
.title-text {
  color: #1f2a44;
  font-family: 'Roboto Condensed', sans-serif;
}

.section-title {
  color: #1f2a44;
}
</style>

<route lang="yaml">
meta:
  layout: responsavel_layout
</route>
