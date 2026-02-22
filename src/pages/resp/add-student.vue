<template>
  <v-container class="pa-4" fluid>
    <div class="text-center py-2 title-text d-flex align-center justify-center">
      <v-icon start icon="mdi-account-plus-outline"></v-icon>
      <span>Adicionar Novo Aluno</span>
    </div>

    <div class="text-center description-text mb-4">
      Preencha os dados abaixo para cadastrar
    </div>

    <v-form ref="studentFormRef" @submit.prevent="handleCreateStudent">
      <div class="d-flex justify-center py-2 mb-4">
        <v-avatar size="120" class="avatar-container" @click="showFeatureNotReadyMessage">
          <v-icon size="40">mdi-camera</v-icon>
        </v-avatar>
      </div>
      <v-text-field
        v-model="studentForm.nome"
        label="Nome completo"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        :rules="[rules.required]"
        required
      ></v-text-field>
      <v-select
        v-model="studentForm.ensino"
        :items="ensinoOptions"
        item-title="text"
        item-value="value"
        label="Nível de Ensino"
        prepend-inner-icon="mdi-school"
        variant="outlined"
        :rules="[rules.required]"
        required
      ></v-select>
      <v-select
        v-model="studentForm.ano"
        :items="anoOptions"
        label="Ano"
        prepend-inner-icon="mdi-format-list-numbered"
        variant="outlined"
        :rules="[rules.required]"
        required
        :disabled="!studentForm.ensino"
      ></v-select>

      <v-btn
        @click="handleCreateStudent"
        color="#1f2a44"
        block
        class="mt-4"
        :loading="loading"
        size="large"
        rounded="lg"
      >
        Adicionar
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
    </v-form>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.message }}
    </v-snackbar>

    <FeedbackDialog
      v-model="showFeedbackDialog"
      :message="feedbackMessage"
      :type="feedbackType"
      @confirm="handleFeedbackConfirm"
    />
  </v-container>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { criarAluno } from '@/services/api';
import FeedbackDialog from '@/components/FeedbackDialog.vue';

const router = useRouter();
const studentFormRef = ref(null);
const loading = ref(false);

const showFeedbackDialog = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref('alert');

const studentForm = ref({
  nome: '',
  ano: null,
  ensino: null,
});

const snackbar = ref({
  show: false,
  message: '',
  color: 'info',
});

const showFeatureNotReadyMessage = () => {
  snackbar.value.message = 'Função de upload de foto ainda não implementada.';
  snackbar.value.color = 'info';
  snackbar.value.show = true;
};

const ensinoOptions = [
  { text: 'Ensino Fundamental', value: 'f' },
  { text: 'Ensino Médio', value: 'm' },
];

const fundamentalYears = Array.from({ length: 9 }, (_, i) => i + 1);
const medioYears = Array.from({ length: 3 }, (_, i) => i + 1);

const anoOptions = computed(() => {
  if (studentForm.value.ensino === 'f') {
    return fundamentalYears;
  }
  if (studentForm.value.ensino === 'm') {
    return medioYears;
  }
  return [];
});

watch(() => studentForm.value.ensino, () => {
  studentForm.value.ano = null;
});

const rules = {
  required: value => !!value || 'Campo obrigatório.',
};

const handleCreateStudent = async () => {
  const { valid } = await studentFormRef.value.validate();
  if (!valid) {
    feedbackMessage.value = 'Existem campos com dados incorretos ou faltando, confira o formulário.';
    feedbackType.value = 'alert';
    showFeedbackDialog.value = true;
    return;
  }

  loading.value = true;
  try {
    debugger;
    const responsavelId = localStorage.getItem('id_token');
    if (!responsavelId) {
      throw new Error('ID do responsável não encontrado.');
    }

    const alunoData = {
      ...studentForm.value,
      responsavel_ids: [responsavelId],
    };

    await criarAluno(alunoData);

    feedbackMessage.value = 'Aluno adicionado com sucesso!';
    feedbackType.value = 'success';
    showFeedbackDialog.value = true;

  } catch (error) {
    if (!error.response) {
      feedbackMessage.value = 'Falha de conexão com o servidor.';
    } else {
      feedbackMessage.value = error.response?.data?.error || 'Ocorreu um erro desconhecido.';
    }
    feedbackType.value = 'error';
    showFeedbackDialog.value = true;
    console.error('Erro ao criar aluno:', error.response?.data || error.message);
  } finally {
    loading.value = false;
  }
};

const handleFeedbackConfirm = () => {
  showFeedbackDialog.value = false;
  if (feedbackType.value === 'success') {
    router.back();
  }
};
</script>

<style scoped>
.title-text {
  color: #1f2a44;
  font-family: "DM Serif Text", serif;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  line-height: 1.2;
}

.description-text {
  color: #1f2a44;
  font-family: "Roboto Condensed", sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  line-height: 1.3;
}

.avatar-container {
  cursor: pointer;
  background-color: #f0f0f0;
  border: 2px dashed #1f2a44;
}
</style>

<route lang="yaml">
meta:
  layout: responsavel_layout
  requiresAuth: true
</route>