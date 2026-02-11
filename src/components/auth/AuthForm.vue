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
              v-model="registerForm.password"
              label="Senha"
              type="password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              :rules="[rules.required, rules.minPassword]"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.confirmPassword"
              label="Confirmar Senha"
              type="password"
              prepend-inner-icon="mdi-lock-check"
              variant="outlined"
              :rules="[rules.required, rules.passwordMatch]"
              required
            ></v-text-field>
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
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const rules = {
  required: value => !!value || 'Campo obrigatório.',
  email: value => {
    const pattern = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Email inválido.';
  },
  minPassword: value => value.length >= 6 || 'A senha deve ter no mínimo 6 caracteres.',
  passwordMatch: value => value === registerForm.value.password || 'As senhas não coincidem.',
};

const handleLogin = () => {
  // In a real application, you would perform validation here
  // and then emit the login event with the form data.
  console.log('Login attempt:', loginForm.value);
  emit('login', { ...loginForm.value });
  // For demonstration, you might close the dialog or navigate away here
};

const handleRegister = () => {
  // In a real application, you would perform validation here
  // and then emit the register event with the form data.
  console.log('Register attempt:', registerForm.value);
  emit('register', { ...registerForm.value });
  // For demonstration, you might close the dialog or navigate away here
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
