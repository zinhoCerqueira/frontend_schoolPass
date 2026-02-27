<template>
  <v-container class="pa-4" fluid>
    <h2 class="text-h6 font-weight-bold title-text mb-4">Meus Avisos</h2>

    <v-card
      v-for="aviso in avisos"
      :key="aviso.id"
      class="mb-3 d-flex"
      flat
      rounded="lg"
      style="border: 1px solid #D2D2D8; overflow: hidden;"
    >
      <div class="flex-grow-1 pa-3">
        <div class="d-flex align-center justify-space-between mb-1">
          <span class="text-caption text-grey-darken-1">{{ aviso.data }}</span>
          <v-chip
            size="x-small"
            :color="getStatusColor(aviso.status)"
            variant="tonal"
            label
            class="font-weight-bold"
          >
            {{ getStatusText(aviso.status) }}
          </v-chip>
        </div>
        <div class="font-weight-bold text-grey-darken-4 mb-1">
          {{ aviso.titulo }}
        </div>
        <div class="text-body-2 text-grey-darken-1">
          {{ aviso.descricao }}
        </div>
      </div>
      <div
        :style="{ backgroundColor: getStatusColor(aviso.status), width: '8px', minWidth: '8px' }"
      ></div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const avisos = ref([
  {
    id: 1,
    titulo: 'Aviso de Chegada',
    descricao: 'Estou a caminho para buscar João Silva.',
    data: '27/02/2026 14:30',
    status: 'ativo'
  },
  {
    id: 2,
    titulo: 'Aviso de Chegada',
    descricao: 'Busca realizada para Maria Oliveira.',
    data: '26/02/2026 13:45',
    status: 'finalizado'
  }
]);

const getStatusColor = (status) => {
  switch (status) {
    case 'ativo': return '#4CAF50'; // Verde
    case 'finalizado': return '#F44336'; // Vermelho
    case 'cancelado': return '#FFC107'; // Amarelo
    default: return '#9E9E9E';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'ativo': return 'Ativo';
    case 'finalizado': return 'Finalizado';
    case 'cancelado': return 'Cancelado';
    default: return 'Desconhecido';
  }
};
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
  requiresAuth: true
</route>