<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="text-h5 text-primary font-weight-bold">
        Login
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Email*"
                required
                v-model="email"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Senha*"
                type="password"
                required
                v-model="senha"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                :items="['responsavel', 'escola']"
                label="Perfil*"
                required
                v-model="perfil"
                variant="outlined"
                density="comfortable"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <small class="text-text-secondary">*indica campo obrigatório</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn color="accent" variant="elevated" @click="handleLogin">
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

const email = ref('');
const senha = ref('');
const perfil = ref('responsavel');

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const handleLogin = () => {
  // TODO: Implementar a lógica de login aqui
  console.log('Login com:', { email: email.value, senha: senha.value, perfil: perfil.value });
  dialog.value = false;
};
</script>
