<template>
  <v-card
    variant="flat"
    class=""
    width="400px"
    rounded="lg"
  >
    <div class="text-center py-4 title d-flex align-center justify-center">
      <v-icon start icon="mdi-school-outline"></v-icon>
      <span>WayToSchool</span>
    </div>
    <v-tabs
      v-model="tab"
      fixed-tabs
      color="#1f2a44"
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
              v-model="loginForm.senha"
              label="Senha"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-btn
              type="submit"
              color="#1f2a44"
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
              :rules="[rules.required, rules.telefone]"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.senha"
              label="Senha"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              :rules="[rules.required, rules.minPassword]"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.confirmacao_senha"
              label="Confirmar Senha"
              :type="showConfirmPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-check"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
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
                <v-btn value="responsavel" color="#1f2a44">
                  <v-icon start icon="mdi-check" v-if="registerForm.userType === 'responsavel'"></v-icon>
                  Responsável
                </v-btn>
                <v-btn value="escola" color="#1f2a44">
                  <v-icon start icon="mdi-check" v-if="registerForm.userType === 'escola'"></v-icon>
                  Escola
                </v-btn>
              </v-btn-toggle>
            </div>
            <v-btn
              type="submit"
              color="#1f2a44"
              block
              class="mt-5"
            >
              Criar conta
            </v-btn>
          </v-form>
        </v-card-text>
      </v-window-item>
    </v-window>
    <v-card-actions>
      <v-btn block variant="text" @click="$emit('close')" color="#1f2a44">
        <v-icon start icon="mdi-arrow-left"></v-icon>
        Voltar
      </v-btn>
    </v-card-actions>
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
import { useRouter } from 'vue-router';
import { criarResponsavel, criarEscola, login } from '@/services/api';
import FeedbackDialog from '@/components/FeedbackDialog.vue';

const router = useRouter();

const showFeedbackDialog = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
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
  senha: '',
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
  telefone: value => {
    const len = value.length;
    return (len === 11 || len === 13) || "O telefone deve ter 11 ou 13 digitos";
  }
};

const handleLogin = async () => {
  const { email, senha } = loginForm.value;
  if (!email || !senha) {
    feedbackMessage.value = 'Por favor, preencha todos os campos obrigatórios.';
    feedbackType.value = 'error';
    showFeedbackDialog.value = true;
    return;
  }

  try {
    await login(email, senha);
    feedbackMessage.value = 'Login bem-sucedido! Redirecionando...';
    feedbackType.value = 'success';
    showFeedbackDialog.value = true;
    
  } catch (error) {
    if (!error.response) {
      feedbackMessage.value = 'Falha de conexão com o servidor.';
    } else {
      feedbackMessage.value = error.response?.data?.message || 'Email ou senha inválidos.';
    }
    feedbackType.value = 'error';
    showFeedbackDialog.value = true;
    console.error('Erro no login:', error.response?.data || error.message);
  }
};

const handleRegister = async () => {
  let response;
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

    if (formData.telefone.length !== 11 && formData.telefone.length !== 13) {
      feedbackMessage.value = "O telefone deve ter 11 ou 13 dígitos. Exemplo: '75999999999' ou '5575999999999'.";
      feedbackType.value = 'alert';
      showFeedbackDialog.value = true;
      return;
    }
    
    if (formData.userType === 'responsavel') {
      response = await criarResponsavel(formData);
    } else {
      response = await criarEscola(formData);
    }

    console.log(response);

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
    if (feedbackMessage.value.includes('Login')) {
      router.push('/');
    } else {
      emit('close');
      tab.value = 'login';
    }
  }
};

watch(() => props.initialTab, (newVal) => {
  if (newVal) {
    tab.value = newVal;
  }
});
</script>

<style scoped>
.title {
  color: #1f2a44;
  font-family: 'Playwrite AU TAS', cursive;
  font-weight: 600;
  font-size: clamp(18px, 2.5vw, 28px);
}
</style>
