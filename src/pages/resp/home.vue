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
          <h2 class="text-h6 font-weight-bold title-text" style="line-height: 1.2;">Eaí , tá chegando ?</h2>
          <p class="text-body-2 text-grey-darken-1 mt-1">Avise a escola que você está a caminho.</p>
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

    <div class="d-flex align-center justify-space-between mt-8 mb-2">
      <h2 class="text-h6 font-weight-bold section-title">Meus Alunos</h2>
      <v-chip color="primary" variant="tonal" size="small" label>{{ alunos.length }} Ativos</v-chip>
    </div>

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

    <v-btn
      block
      height="64"
      variant="outlined"
      color="#1f2a44"
      class="text-none"
      rounded="lg"
      style="border-style: dashed; border-width: 2px;"
      prepend-icon="mdi-account-plus"
      @click="router.push('/resp/add-student')"
    >
      Adicionar Aluno
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAlunos } from '@/services/api';

const router = useRouter();
const alunos = ref([]);

const fetchAlunos = async () => {
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
  }
};

onMounted(() => {
  fetchAlunos();
});
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
  requiresAuth: true
</route>
