<template>
  <v-card
    variant="flat"
    class=""
    width="400px"
    rounded="lg"
  >
    <v-tabs
      v-model="tab"
      fixed-tabs
      color="primary"
    >
      <v-tab value="login">
        <v-icon start icon="mdi-login"></v-icon>
        Login
      </v-tab>
      <v-tab value="register">
        <v-icon start icon="mdi-account-plus-outline"></v-icon>
        Criar conta
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="login">
        <v-card-text>
          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="loginForm.email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              :rules="[rules.required, rules.email]"
              required
            ></v-text-field>
            <v-text-field
              v-model="loginForm.password"
              label="Senha"
              type="password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-btn
              type="submit"
              color="primary"
              block
            >
              Entrar
            </v-btn>
          </v-form>
        </v-card-text>
      </v-window-item>

      <v-window-item value="register">
        <v-card-text>
          <v-form @submit.prevent="handleRegister">
            <v-text-field
              v-model="registerForm.nome"
              label="Nome"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              :rules="[rules.required, rules.email]"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.telefone"
              label="Telefone"
              prepend-inner-icon="mdi-phone"
              variant="outlined"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.senha"
              label="Senha"
              type="password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              :rules="[rules.required, rules.minPassword]"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.confirmacao_senha"
              label="Confirmar Senha"
              type="password"
              prepend-inner-icon="mdi-lock-check"
              variant="outlined"
              :rules="[rules.required, rules.passwordMatch]"
              required
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-btn-toggle
                v-model="registerForm.userType"
                color="primary"
                variant="outlined"
                mandatory
                divided
              >
                <v-btn value="responsavel">Responsável</v-btn>
                <v-btn value="escola">Escola</v-btn>
              </v-btn-toggle>
            </div>
            <v-btn
              type="submit"
              color="primary"
              block
              class="mt-4"
            >
              Criar conta
            </v-btn>
          </v-form>
        </v-card-text>
      </v-window-item>
    </v-window>
    <FeedbackDialog 
      v-model="showFeedbackDialog" 
      :message="feedbackMessage" 
      :type="feedbackType"
      @confirm="handleFeedbackConfirm" 
    />
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { criarResponsavel, criarEscola } from '@/services/api';
import FeedbackDialog from '@/components/FeedbackDialog.vue';

const showFeedbackDialog = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref('alert');

const props = defineProps({
  initialTab: {
    type: String,
    default: 'login',
  },
});

const emit = defineEmits(['close']);

const tab = ref(props.initialTab);

const loginForm = ref({
  email: '',
  password: '',
});

const registerForm = ref({
  userType: 'responsavel',
  nome: '',
  email: '',
  telefone: '',
  senha: '',
  confirmacao_senha: '',
});

const rules = {
  required: value => !!value || 'Campo obrigatório.',
  email: value => {
    const pattern = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Email inválido.';
  },
  minPassword: value => value.length >= 6 || 'A senha deve ter no mínimo 6 caracteres.',
  passwordMatch: value => value === registerForm.value.senha || 'As senhas não coincidem.',
};

const handleLogin = () => {
  // In a real application, you would perform validation here
  // and then emit the login event with the form data.
  console.log('Login attempt:', loginForm.value);
  emit('close');
  // For demonstration, you might close the dialog or navigate away here
};

const handleRegister = async () => {
  try {
    const { ...formData } = registerForm.value;

    if (formData.senha !== formData.confirmacao_senha) {
      feedbackMessage.value = 'As senhas não coincidem.';
      feedbackType.value = 'error';
      showFeedbackDialog.value = true;
      return;
    }

    if (!formData.nome || !formData.email || !formData.telefone || !formData.senha || !formData.confirmacao_senha) {
      feedbackMessage.value = 'Por favor, preencha todos os campos obrigatórios.';
      feedbackType.value = 'error';
      showFeedbackDialog.value = true;
      return;
    }
    
    if (formData.userType === 'responsavel') {
      const { confirmacao_senha, ...responsavelData } = formData;
      await criarResponsavel(responsavelData);
    } else {
      await criarEscola(formData);
    }
    
    feedbackMessage.value = 'Conta criada com sucesso! Você será redirecionado para o login.';
    feedbackType.value = 'success';
    showFeedbackDialog.value = true;

  } catch (error) {
    feedbackMessage.value = error.response?.data?.error || 'Ocorreu um erro desconhecido.';
    feedbackType.value = 'error';
    showFeedbackDialog.value = true;
    console.error('Erro no registro:', error.response?.data || error.message);
  }
};

const handleFeedbackConfirm = () => {
  showFeedbackDialog.value = false;
  if (feedbackType.value === 'success') {
    emit('close');
    tab.value = 'login';
  }
};

watch(() => props.initialTab, (newVal) => {
  if (newVal) {
    tab.value = newVal;
  }
});
</script>

<style scoped>
/* No specific styles needed for AuthForm itself as Vuetify handles most of it */
</style>
