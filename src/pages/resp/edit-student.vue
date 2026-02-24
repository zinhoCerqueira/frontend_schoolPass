<template>
  <v-container>
    <div class="text-center py-2 title-text d-flex align-center justify-center">
      <v-icon start icon="mdi-account-edit-outline"></v-icon>
      <span>Editar Aluno</span>
    </div>

    <div class="text-center description-text mb-3">
      Atualize os dados do aluno abaixo.
    </div>

    <v-form ref="studentFormRef" @submit.prevent="handleUpdateStudent">
      <div class="d-flex justify-center py-2 mb-3">
        <v-avatar size="120" class="avatar-container" @click="showFeatureNotReadyMessage">
          <v-icon size="40">mdi-camera</v-icon>
        </v-avatar>
      </div>
      <v-text-field
        v-model="studentForm.nome"
        label="Nome"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        :rules="[rules.required, rules.singleWord]"
        required
        bg-color="white"
        color="#1f2a44"
      ></v-text-field>
      <v-text-field
        v-model="studentForm.sobrenome"
        label="Sobrenome"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        :rules="[rules.required]"
        required
        bg-color="white"
        color="#1f2a44"
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
        bg-color="white"
        color="#1f2a44"
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
        bg-color="white"
        color="#1f2a44"
      ></v-select>

      <v-btn
        @click="handleUpdateStudent"
        color="#1f2a44"
        block
        class="mt-2"
        :loading="loading"
        size="large"
        rounded="lg"
      >
        Salvar Alterações
      </v-btn>
      <v-btn
        @click="showDeleteDialog = true"
        color="error"
        variant="outlined"
        block
        class="mt-2"
        size="large"
        rounded="lg"
      >
        Excluir Aluno
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

    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Excluir Aluno"
      message="Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita."
      @confirm="handleDeleteStudent"
    />
  </v-container>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAluno, updateAluno, deleteAluno } from '@/services/api';
import FeedbackDialog from '@/components/resp/dialogs/FeedbackDialog.vue';
import ConfirmDialog from '@/components/resp/dialogs/ConfirmDialog.vue';

const router = useRouter();
const studentFormRef = ref(null);
const loading = ref(false);

const studentId = history.state?.studentId;

const showFeedbackDialog = ref(false);
const showDeleteDialog = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref('alert');

const studentForm = ref({
  nome: '',
  sobrenome: '',
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

watch(() => studentForm.value.ensino, (newEnsino, oldEnsino) => {
  if (oldEnsino !== null) {
    studentForm.value.ano = null;
  }
});

const rules = {
  required: value => !!value || 'Campo obrigatório.',
  singleWord: value => {
    const words = value.trim().split(/\s+/);
    return words.length === 1 || 'O nome deve conter apenas uma palavra.';
  },
};

const fetchStudentData = async () => {
  loading.value = true;
  try {
    const response = await getAluno(studentId);
    const { nome, sobrenome, ano, ensino } = response.data;
    studentForm.value.nome = nome;
    studentForm.value.sobrenome = sobrenome;
    if (ensino) {
      const ensinoStr = String(ensino).toLowerCase();
      if (ensinoStr.includes('médio') || ensinoStr.includes('medio')) {
        studentForm.value.ensino = 'm';
      } else if (ensinoStr.includes('fundamental')) {
        studentForm.value.ensino = 'f';
      } else {
        studentForm.value.ensino = null;
      }
    } else {
      studentForm.value.ensino = null;
    }
    studentForm.value.ano = ano ? Number(ano) : null;
  } catch (error) {
    feedbackMessage.value = 'Erro ao buscar dados do aluno.';
    feedbackType.value = 'error';
    showFeedbackDialog.value = true;
    console.error('Erro ao buscar aluno:', error);
  } finally {
    loading.value = false;
  }
};

const handleUpdateStudent = async () => {
  const { valid } = await studentFormRef.value.validate();
  if (!valid) {
    feedbackMessage.value = 'Existem campos com dados incorretos ou faltando, confira o formulário.';
    feedbackType.value = 'alert';
    showFeedbackDialog.value = true;
    return;
  }

  loading.value = true;
  try {
    await updateAluno(studentId, studentForm.value);
    feedbackMessage.value = 'Aluno atualizado com sucesso!';
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
    console.error('Erro ao atualizar aluno:', error.response?.data || error.message);
  } finally {
    loading.value = false;
  }
};

const handleDeleteStudent = async () => {
  showDeleteDialog.value = false;
  loading.value = true;
  try {
    await deleteAluno(studentId);
    feedbackMessage.value = 'Aluno excluído com sucesso!';
    feedbackType.value = 'success';
    showFeedbackDialog.value = true;
  } catch (error) {
    if (!error.response) {
      feedbackMessage.value = 'Falha de conexão com o servidor.';
    } else {
      feedbackMessage.value = error.response?.data?.error || 'Erro ao excluir aluno.';
    }
    feedbackType.value = 'error';
    showFeedbackDialog.value = true;
    console.error('Erro ao excluir aluno:', error.response?.data || error.message);
  } finally {
    loading.value = false;
  }
};

const handleFeedbackConfirm = () => {
  showFeedbackDialog.value = false;
  if (feedbackType.value === 'success') {
    router.push('/resp/home');
  }
};

onMounted(() => {
  if (!studentId) {
    router.replace('/resp/home');
    return;
  }
  fetchStudentData();
});

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

.dialog-title {
  font-family: "DM Serif Text", serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.1;
  color: #1f2a44;
}

.dialog-description {
  color: #1f2a44;
  font-family: "Roboto Condensed", sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.4;
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