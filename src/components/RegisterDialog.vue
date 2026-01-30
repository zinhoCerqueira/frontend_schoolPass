<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="pa-6">
      <v-card-title class="text-h5 text-primary font-weight-bold">
        Cadastrar Responsável
      </v-card-title>
      <v-card-text class="px-4">
        <v-row>
          <v-col cols="12">
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              class="mb-4"
            >
              {{ errorMessage }}
            </v-alert>

            <v-text-field
              label="Nome Completo*"
              required
              v-model="nome"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>
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
        </v-row>
        <small class="text-text-secondary">*indica campo obrigatório</small>
      </v-card-text>
      <v-card-actions class="pr-4">
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :loading="loading"
          :disabled="loading"
          @click="handleRegister"
        >
          Cadastrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import api from "@/services/api";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const nome = ref("");
const email = ref("");
const senha = ref("");
const loading = ref(false);
const errorMessage = ref("");

const handleRegister = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    await api.post("/register/responsavel", {
      nome: nome.value,
      email: email.value,
      senha: senha.value,
    });

    dialog.value = false;
    nome.value = "";
    email.value = "";
    senha.value = "";
  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response.data?.error || "Erro ao cadastrar.";
    } else {
      errorMessage.value = "Erro de conexão com o servidor.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
