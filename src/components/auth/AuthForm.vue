<template>
  <v-card
    class="mx-auto"
    :max-width="isMobile ? '100%' : '420'"
    :flat="isMobile"
    :tile="isMobile"
  >
    <v-tabs
      v-model="tab"
      fixed-tabs
      color="primary"
    >
      <v-tab value="login">Login</v-tab>
      <v-tab value="register">Criar conta</v-tab>
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
              class="mt-2"
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
              v-model="registerForm.name"
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
            <div class="d-flex justify-center mt-4">
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
              class="mt-2"
            >
              Criar conta
            </v-btn>
          </v-form>
        </v-card-text>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { criarResponsavel, criarEscola } from '@/services/api';

const props = defineProps({
  initialTab: {
    type: String,
    default: 'login',
  },
});

const emit = defineEmits(['login', 'register']);

const { mobile } = useDisplay();
const isMobile = ref(mobile.value);

watch(mobile, (newVal) => {
  isMobile.value = newVal;
});

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
  emit('login', { ...loginForm.value });
  // For demonstration, you might close the dialog or navigate away here
};

const handleRegister = async () => {
  try {
    const { userType, ...formData } = registerForm.value;

    // Universal password confirmation check
    if (formData.senha !== formData.confirmacao_senha) {
      console.error('As senhas não coincidem.');
      // Maybe show an error to the user
      return;
    }

    // Basic validation check before sending
    if (!formData.nome || !formData.email || !formData.telefone || !formData.senha || !formData.confirmacao_senha) {
      // Here you could show a more user-friendly error
      console.error('Por favor, preencha todos os campos obrigatórios.');
      console.log(registerForm);
      return;
    }
    
    if (userType === 'responsavel') {
      const { confirmacao_senha, ...responsavelData } = formData;
      await criarResponsavel(responsavelData);
      console.log('Responsável criado:', responsavelData);
    } else { // userType is 'escola'
      await criarEscola(formData);
      console.log('Escola criada:', formData);
    }
    
    emit('register', { userType, ...formData });
    // Optionally, switch to login tab or show a success message
    tab.value = 'login';
  } catch (error) {
    console.error('Erro no registro:', error.response?.data || error.message);
    // Handle error (e.g., show a snackbar with the error message)
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
