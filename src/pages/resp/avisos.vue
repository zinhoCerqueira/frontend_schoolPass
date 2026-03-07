<template>
  <v-container class="pa-4" fluid>
    <h2 class="text-h6 font-weight-bold title-text mb-4">Meus Avisos</h2>

    <div v-if="loading" class="d-flex justify-center my-4">
      <v-progress-circular indeterminate color="#1f2a44"></v-progress-circular>
    </div>

    <div v-else-if="avisos.length === 0" class="text-center text-grey-darken-1 my-4">
      Nenhum aviso encontrado.
    </div>

    <template v-else>
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

      <div class="d-flex justify-center mt-4">
        <v-pagination
          v-model="page"
          :length="totalPages"
          color="#1f2a44"
        ></v-pagination>
      </div>
    </template>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getAvisos } from '@/services/api';

const avisos = ref([]);
const page = ref(1);
const limit = 10;
const totalPages = ref(1);
const loading = ref(false);

const fetchAvisos = async () => {
  loading.value = true;
  try {
    const responsavelId = localStorage.getItem('id_token');
    if (!responsavelId) return;

    const response = await getAvisos(responsavelId, page.value, limit);
    const data = response.data;

    if (Array.isArray(data)) {
      avisos.value = data.map(aviso => ({
        id: aviso._id || aviso.id,
        titulo: aviso.titulo || 'Aviso',
        descricao: aviso.mensagem || aviso.descricao || '',
        data: aviso.criado_em ? new Date(aviso.criado_em).toLocaleString('pt-BR') : '',
        status: aviso.status
      }));

      // Lógica simples para paginação infinita já que o backend não retorna o total
      if (data.length === limit) {
        if (page.value >= totalPages.value) {
          totalPages.value = page.value + 1;
        }
      } else {
        // Se retornou menos que o limite, é a última página
        totalPages.value = page.value;
      }
    } else {
      avisos.value = [];
    }
  } catch (error) {
    console.error('Erro ao buscar avisos:', error);
    if (error.response && error.response.status === 404) {
      avisos.value = [];
    }
  } finally {
    loading.value = false;
  }
};

watch(page, () => {
  fetchAvisos();
});

onMounted(() => {
  fetchAvisos();
});

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