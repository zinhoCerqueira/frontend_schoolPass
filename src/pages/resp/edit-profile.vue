<template>
  <v-container>
    <div class="text-center py-2 title-text d-flex align-center justify-center">
      <v-icon start icon="mdi-account-edit-outline"></v-icon>
      <span>Editar Perfil</span>
    </div>

    <div class="text-center description-text mb-3">
      Atualize seus dados pessoais abaixo.
    </div>

    <v-form ref="profileFormRef" @submit.prevent="handleUpdateProfile">
      <div class="d-flex justify-center py-2 mb-3">
        <v-avatar size="120" class="avatar-container" @click="showFeatureNotReadyMessage">
          <v-icon size="40">mdi-camera</v-icon>
        </v-avatar>
      </div>
      <v-text-field
        v-model="profileForm.nome"
        label="Nome"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        :rules="[rules.required, rules.singleWord, rules.minLength]"
        required
        bg-color="white"
        color="#1f2a44"
      ></v-text-field>
      <v-text-field
        v-model="profileForm.sobrenome"
        label="Sobrenome"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        :rules="[rules.required]"
        required
        bg-color="white"
        color="#1f2a44"
      ></v-text-field>
      <v-text-field
        v-model="profileForm.email"
        label="Email"
        type="email"
        prepend-inner-icon="mdi-email"
        variant="outlined"
        :rules="[rules.required, rules.email]"
        required
        bg-color="white"
        color="#1f2a44"
      ></v-text-field>
      <v-text-field
        v-model="profileForm.telefone"
        label="Telefone"
        prepend-inner-icon="mdi-phone"
        variant="outlined"
        :rules="[rules.telefone]"
        bg-color="white"
        color="#1f2a44"
      ></v-text-field>
      <v-text-field
        v-model="profileForm.senha"
        label="Nova Senha (opcional)"
        :type="showPassword ? 'text' : 'password'"
        prepend-inner-icon="mdi-lock"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
        variant="outlined"
        :rules="[rules.minPassword]"
        bg-color="white"
        color="#1f2a44"
        hint="*Deixe em branco para manter a senha atual"
        persistent-hint
      ></v-text-field>
      <v-text-field
        v-model="profileForm.confirmacao_senha"
        label="Confirmar Nova Senha"
        :type="showConfirmPassword ? 'text' : 'password'"
        prepend-inner-icon="mdi-lock-check"
        :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showConfirmPassword = !showConfirmPassword"
        variant="outlined"
        :rules="[rules.passwordMatch]"
        bg-color="white"
        color="#1f2a44"
        :disabled="!profileForm.senha"
      ></v-text-field>

      <v-btn
        @click="handleUpdateProfile"
        color="#1f2a44"
        block
        class="mt-4"
        :loading="loading"
        size="large"
        rounded="lg"
      >
        Salvar Alterações
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getResponsavel, updateResponsavel } from '@/services/api';
import FeedbackDialog from '@/components/resp/dialogs/FeedbackDialog.vue';

const router = useRouter();
const profileFormRef = ref(null);
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const showFeedbackDialog = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref('alert');

const profileForm = ref({
  nome: '',
  sobrenome: '',
  email: '',
  telefone: '',
  senha: '',
  confirmacao_senha: '',
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

const rules = {
  required: value => !!value || 'Campo obrigatório.',
  email: value => {
    const pattern = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !value || pattern.test(value) || 'Email inválido.';
  },
  singleWord: value => {
    if (!value) return true;
    const words = value.trim().split(/\s+/);
    return words.length === 1 || 'O nome deve conter apenas uma palavra.';
  },
  minLength: value => !value || value.length >= 2 || 'O nome deve ter no mínimo 2 letras.',
  minPassword: value => !value || value.length >= 6 || 'A senha deve ter no mínimo 6 caracteres.',
  passwordMatch: value => !profileForm.value.senha || value === profileForm.value.senha || 'As senhas não coincidem.',
  telefone: value => {
    if (!value) return true;
    const len = value.length;
    return len === 11 || len === 13 || 'O telefone deve ter 11 ou 13 digitos';
  }
};

const fetchProfileData = async () => {
  loading.value = true;
  try {
    const id = localStorage.getItem('id_token');
    if (!id) {
      throw new Error('ID do usuário não encontrado.');
    }
    const response = await getResponsavel(id);
    const { nome, sobrenome, email, telefone } = response.data;
    
    profileForm.value.nome = nome || '';
    profileForm.value.sobrenome = sobrenome || '';
    profileForm.value.email = email || '';
    profileForm.value.telefone = telefone ? telefone.replace('+', '') : '';
  } catch (error) {
    feedbackMessage.value = 'Erro ao buscar dados do perfil.';
    feedbackType.value = 'error';
    showFeedbackDialog.value = true;
    console.error('Erro ao buscar perfil:', error);
  } finally {
    loading.value = false;
  }
};

const handleUpdateProfile = async () => {
  const { valid } = await profileFormRef.value.validate();
  if (!valid) {
    feedbackMessage.value = 'Existem campos com dados incorretos ou faltando, confira o formulário.';
    feedbackType.value = 'alert';
    showFeedbackDialog.value = true;
    return;
  }

  loading.value = true;
  try {
    const id = localStorage.getItem('id_token');
    const updateData = { ...profileForm.value };
    
    // Remove empty password to avoid updating it if not changed
    if (!updateData.senha) {
      delete updateData.senha;
    }
    delete updateData.confirmacao_senha;

    await updateResponsavel(id, updateData);
    
    // Update local storage if name changed
    if (updateData.nome) localStorage.setItem('nome', updateData.nome);
    if (updateData.sobrenome) localStorage.setItem('sobrenome', updateData.sobrenome);

    feedbackMessage.value = 'Perfil atualizado com sucesso!';
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
    console.error('Erro ao atualizar perfil:', error.response?.data || error.message);
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

onMounted(() => {
  fetchProfileData();
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