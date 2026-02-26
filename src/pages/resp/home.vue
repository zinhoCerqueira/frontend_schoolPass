<template>
  <v-container class="pa-4" fluid>
    <v-card class="pa-4 mb-4" rounded="lg" elevation="0" style="border: 1px solid #D2D2D8;">
      <div class="d-flex align-center">
        <v-sheet
          color="#1f2a44"
          class="d-flex align-center justify-center rounded-lg mr-4"
          width="48"
          height="48"
        >
          <v-icon :icon="avisoAtivo ? 'mdi-clock-outline' : 'mdi-car-side'" color="white" size="24"></v-icon>
        </v-sheet>
        <div>
          <h2 class="text-h6 font-weight-bold title-text" style="line-height: 1.2;">
            {{ avisoAtivo ? 'Estamos te aguardando' : 'Eaí , tá chegando ?' }}
          </h2>
          <p class="text-body-2 text-grey-darken-1 mt-1">
            {{ avisoAtivo ? 'A escola já foi avisada.' : 'Avise a escola que você está a caminho.' }}
          </p>
        </div>
      </div>

      <div v-if="avisoAtivo" class="mt-4">
        <v-btn
          variant="tonal"
          color="#FBC02D"
          class="mb-2 text-none"
          rounded="lg"
          block
          prepend-icon="mdi-pencil"
          @click="handleEditAviso"
        >
          Editar
        </v-btn>
        <v-btn
          variant="tonal"
          color="#D32F2F"
          class="text-none"
          rounded="lg"
          block
          prepend-icon="mdi-close"
          @click="handleMainAction"
          :loading="loading"
        >
          Cancelar
        </v-btn>
      </div>

      <v-btn
        v-else
        variant="tonal"
        block
        color="#1f2a44"
        class="mt-4 text-none"
        rounded="lg"
        append-icon="mdi-arrow-right"
        @click="handleMainAction"
      >
        Estou a caminho
      </v-btn>
    </v-card>

    <div class="d-flex align-center justify-space-between mt-8 mb-2">
      <h2 class="text-h6 font-weight-bold section-title">Meus Alunos</h2>
      <v-chip color="primary" variant="tonal" size="small" label>{{ alunos.length }} Ativos</v-chip>
    </div>

    <div
      v-for="aluno in alunos"
      :key="aluno.id"
      @click="goToEditPage(aluno.id)"
      style="cursor: pointer"
      class="aluno-card"
    >
      <v-card
        class="mb-3"
        flat
        rounded="lg"
        style="border: 1px solid #D2D2D8;"
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
    </div>

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
import { getAlunos, verificarAvisoAtivo, cancelarAviso } from '@/services/api';

const router = useRouter();
const alunos = ref([]);
const avisoAtivo = ref(false);
const avisoId = ref(null);
const loading = ref(false);

const goToEditPage = (id) => {
  router.push({ path: '/resp/edit-student', state: { studentId: id } });
};

const handleEditAviso = () => {
  console.log('Editar aviso', avisoId.value);
};

const handleMainAction = async () => {
  if (avisoAtivo.value) {
    loading.value = true;
    try {
      await cancelarAviso(avisoId.value);
      avisoAtivo.value = false;
      avisoId.value = null;
    } catch (error) {
      console.error('Erro ao cancelar aviso:', error);
    } finally {
      loading.value = false;
    }
  } else {
    router.push('/resp/on-my-way');
  }
};

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

const checkAviso = async () => {
  try {
    const responsavelId = localStorage.getItem('id_token');
    if (!responsavelId) return;
    const response = await verificarAvisoAtivo(responsavelId);
    if (response.data && response.data.aviso_ativo) {
      avisoAtivo.value = true;
      avisoId.value = response.data.aviso_id;
    } else {
      avisoAtivo.value = false;
      avisoId.value = null;
    }
  } catch (error) {
    console.error('Erro ao verificar aviso:', error);
  }
};

onMounted(() => {
  fetchAlunos();
  checkAviso();
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
