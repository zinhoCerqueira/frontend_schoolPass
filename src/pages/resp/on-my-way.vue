<template>
  <v-container class="pa-4" fluid>
    <div class="text-center py-2 title-text d-flex align-center justify-center mb-4">
      <v-icon start icon="mdi-car-side" size="28" color="#1f2a44"></v-icon>
      <span class="text-h5 font-weight-bold" style="color: #1f2a44;">Estou a Caminho</span>
    </div>

    <div class="text-center description-text mb-6">
      Selecione os alunos que você irá buscar.
    </div>

    <div v-if="loading" class="d-flex justify-center my-4">
      <v-progress-circular indeterminate color="#1f2a44"></v-progress-circular>
    </div>

    <div v-else>
      <v-card
        v-for="aluno in alunos"
        :key="aluno.id"
        class="mb-3 pa-3"
        flat
        rounded="lg"
        style="border: 1px solid #D2D2D8;"
        @click="toggleSelection(aluno.id)"
      >
        <div class="d-flex align-center">
          <v-avatar size="48" class="mr-4">
            <v-img :src="aluno.avatar" :alt="aluno.nome"></v-img>
          </v-avatar>

          <div class="flex-grow-1">
            <div class="font-weight-bold text-grey-darken-4">{{ aluno.nome }}</div>
            <div class="text-body-2 text-grey-darken-1">{{ aluno.info }}</div>
          </div>

          <v-checkbox
            v-model="selectedAlunos"
            :value="aluno.id"
            color="#1f2a44"
            hide-details
            density="compact"
            @click.stop
          ></v-checkbox>
        </div>
      </v-card>
    </div>

    <div class="d-flex justify-end mb-2">
        <v-btn
          variant="text"
          size="small"
          color="#1f2a44"
          class="text-none px-0"
          @click="selectAll"
        >
          <v-icon start icon="mdi-check-all"></v-icon>
          {{ selectedAlunos.length === alunos.length && alunos.length > 0 ? 'Desmarcar todos' : 'Selecionar todos' }}
        </v-btn>
      </div>

    <v-btn
      block
      color="#1f2a44"
      class="mt-4 text-none"
      rounded="lg"
      size="large"
      @click="handleConfirm"
    >
      <v-icon start icon="mdi-car"></v-icon>
      Confirmar e Avisar a escola
    </v-btn>
    
    <v-btn
        block
        variant="text"
        @click="router.back()"
        color="#1f2a44"
        class="mt-2"
        size="large"
      >
        <v-icon start icon="mdi-arrow-left"></v-icon>
        Voltar
      </v-btn>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAlunos } from '@/services/api';

const router = useRouter();
const alunos = ref([]);
const selectedAlunos = ref([]);
const loading = ref(false);

const fetchAlunos = async () => {
  loading.value = true;
  try {
    const responsavelId = localStorage.getItem('id_token');
    if (!responsavelId) return;

    const response = await getAlunos(responsavelId);
    const data = response.data;

    alunos.value = data.map(aluno => ({
      id: aluno.id,
      nome: `${aluno.nome} ${aluno.sobrenome || ''}`.trim(),
      info: `${aluno.ano}º ano - ${aluno.ensino === 'm' ? 'Ensino Médio' : 'Ensino Fundamental'}`,
      avatar: aluno.avatar || 'https://static.vecteezy.com/ti/vetor-gratis/p1/15278806-o-avatar-do-graduado-icone-do-aluno-ilustracaoial-em-um-estilo-plano-isolado-em-um-fundo-branco-vetor.jpg'
    }));
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
  } finally {
    loading.value = false;
  }
};

const toggleSelection = (id) => {
  const index = selectedAlunos.value.indexOf(id);
  if (index === -1) {
    selectedAlunos.value.push(id);
  } else {
    selectedAlunos.value.splice(index, 1);
  }
};

const selectAll = () => {
  if (selectedAlunos.value.length === alunos.value.length) {
    selectedAlunos.value = [];
  } else {
    selectedAlunos.value = alunos.value.map(a => a.id);
  }
};

const handleConfirm = () => {
  console.log('Confirmar e avisar escola', selectedAlunos.value);
};

onMounted(() => {
  fetchAlunos();
});
</script>

<style scoped>
.title-text {
  color: #1f2a44;
  font-family: "DM Serif Text", serif;
}
.description-text {
  color: #1f2a44;
  font-family: "Roboto Condensed", sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  line-height: 1.3;
}
</style>

<route lang="yaml">
meta:
  layout: responsavel_layout
  requiresAuth: true
</route>