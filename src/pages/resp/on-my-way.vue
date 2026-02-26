<template>
  <v-container class="pa-4" fluid>
    <div
      class="text-center py-2 title-text d-flex align-center justify-center mb-4"
    >
      <v-icon start icon="mdi-car-side" size="28" color="#1f2a44"></v-icon>
      <span class="text-h5 font-weight-bold" style="color: #1f2a44">{{
        isEditing ? "Editar Aviso" : "Estou a Caminho"
      }}</span>
    </div>

    <div class="text-center description-text mb-6">
      Selecione os alunos que você irá buscar.
    </div>

    <div v-if="loading" class="d-flex justify-center my-4">
      <v-progress-circular indeterminate color="#1f2a44"></v-progress-circular>
    </div>

    <div v-else>
      <div v-if="selectedList.length > 0" class="mb-6">
        <div class="text-subtitle-2 text-grey-darken-1 mb-2 font-weight-bold">
          Vou buscar ({{ selectedList.length }})
        </div>
        <v-card
          v-for="aluno in selectedList"
          :key="aluno.id"
          class="mb-3 pa-3"
          flat
          rounded="lg"
          style="border: 2px solid #1f2a44; background-color: #f4f6f8"
          @click="toggleSelection(aluno.id)"
        >
          <div class="d-flex align-center">
            <v-avatar size="48" class="mr-4">
              <v-img :src="aluno.avatar" :alt="aluno.nome"></v-img>
            </v-avatar>
            <div class="flex-grow-1">
              <div class="font-weight-bold text-grey-darken-4">
                {{ aluno.nome }}
              </div>
              <div class="text-body-2 text-grey-darken-1">{{ aluno.info }}</div>
            </div>
            <v-icon color="#1f2a44" icon="mdi-check-circle"></v-icon>
          </div>
        </v-card>
      </div>

      <div v-if="unselectedList.length > 0">
        <div class="text-subtitle-2 text-grey-darken-1 mb-2 font-weight-bold">
          Não vou buscar ({{ unselectedList.length }})
        </div>
        <v-card
          v-for="aluno in unselectedList"
          :key="aluno.id"
          class="mb-3 pa-3"
          flat
          rounded="lg"
          style="border: 1px solid #d2d2d8; opacity: 0.7"
          @click="toggleSelection(aluno.id)"
        >
          <div class="d-flex align-center">
            <v-avatar size="48" class="mr-4" style="filter: grayscale(100%)">
              <v-img :src="aluno.avatar" :alt="aluno.nome"></v-img>
            </v-avatar>
            <div class="flex-grow-1">
              <div class="font-weight-bold text-grey-darken-4">
                {{ aluno.nome }}
              </div>
              <div class="text-body-2 text-grey-darken-1">{{ aluno.info }}</div>
            </div>
            <v-icon color="grey" icon="mdi-plus-circle-outline"></v-icon>
          </div>
        </v-card>
      </div>
    </div>

    <div class="d-flex justify-end mb-2">
      <v-btn
        variant="text"
        size="small"
        color="#1f2a44"
        class="text-none px-0"
        @click="selectAll"
      >
        <v-icon start icon="mdi-check-all"></v-icon>
        {{
          selectedAlunos.length === alunos.length && alunos.length > 0
            ? "Desmarcar todos"
            : "Selecionar todos"
        }}
      </v-btn>
    </div>

    <v-btn
      block
      variant="flat"
      :color="isEditing && selectedAlunos.length === 0 ? '#D32F2F' : '#1f2a44'"
      class="text-none mt-4"
      rounded="lg"
      size="large"
      :loading="submitting"
      @click="handleConfirm"
    >
      <v-icon
        start
        :icon="
          isEditing && selectedAlunos.length === 0 ? 'mdi-close' : 'mdi-car'
        "
      ></v-icon>
      {{ mainButtonText }}
    </v-btn>
    <v-btn
      v-if="isEditing && selectedAlunos.length > 0"
      block
      variant="tonal"
      color="#D32F2F"
      class="text-none mt-2"
      rounded="lg"
      size="large"
      prepend-icon="mdi-close-circle-outline"
      :loading="submitting"
      @click="handleExplicitCancel"
    >
      Cancelar Aviso
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
  </v-container>
  <FeedbackDialog
    v-model="showFeedbackDialog"
    :message="feedbackMessage"
    :type="feedbackType"
    @confirm="handleFeedbackConfirm"
  />
  <ConfirmDialog
    v-model="showConfirmDialog"
    title="Cancelar Aviso"
    :message="confirmDialogMessage"
    @confirm="executeCancellation"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import {
  getAlunos,
  criarAviso,
  verificarAvisoAtivo,
  getAviso,
  atualizarAviso,
  cancelarAviso,
} from "@/services/api";
import FeedbackDialog from "@/components/resp/dialogs/FeedbackDialog.vue";
import ConfirmDialog from "@/components/resp/dialogs/ConfirmDialog.vue";

const router = useRouter();
const alunos = ref([]);
const selectedAlunos = ref([]);
const loading = ref(false);
const submitting = ref(false);
const showFeedbackDialog = ref(false);
const feedbackMessage = ref("");
const feedbackType = ref("alert");
const showConfirmDialog = ref(false);
const confirmDialogMessage = ref("");
const isEditing = ref(false);
const avisoId = ref(null);

const selectedList = computed(() =>
  alunos.value.filter((a) => selectedAlunos.value.includes(a.id))
);

const unselectedList = computed(() =>
  alunos.value.filter((a) => !selectedAlunos.value.includes(a.id))
);

const mainButtonText = computed(() => {
  if (isEditing.value) {
    return selectedAlunos.value.length === 0
      ? "Cancelar Aviso"
      : "Salvar Alterações";
  }
  return "Confirmar e Avisar a escola";
});

const fetchAlunos = async () => {
  loading.value = true;
  try {
    const responsavelId = localStorage.getItem("id_token");
    if (!responsavelId) return;

    const response = await getAlunos(responsavelId);
    const data = response.data;

    alunos.value = data.map((aluno) => ({
      id: aluno.id,
      nome: `${aluno.nome} ${aluno.sobrenome || ""}`.trim(),
      info: `${aluno.ano}º ano - ${aluno.ensino === "m" ? "Ensino Médio" : "Ensino Fundamental"}`,
      avatar:
        aluno.avatar ||
        "https://static.vecteezy.com/ti/vetor-gratis/p1/15278806-o-avatar-do-graduado-icone-do-aluno-ilustracaoial-em-um-estilo-plano-isolado-em-um-fundo-branco-vetor.jpg",
    }));
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
  } finally {
    loading.value = false;
  }
};

const toggleSelection = (id) => {
  const index = selectedAlunos.value.indexOf(id);
  if (index === -1) {
    selectedAlunos.value.push(id);
  } else {
    selectedAlunos.value.splice(index, 1);
  }
};

const selectAll = () => {
  if (selectedAlunos.value.length === alunos.value.length) {
    selectedAlunos.value = [];
  } else {
    selectedAlunos.value = alunos.value.map((a) => a.id);
  }
};

const handleConfirm = async () => {
  if (selectedAlunos.value.length === 0) {
    if (isEditing.value) {
      confirmDialogMessage.value = "Ao remover todos os alunos, o aviso será cancelado. Deseja continuar?";
      showConfirmDialog.value = true;
      return;
    } else {
      feedbackMessage.value =
        "Selecione pelo menos um aluno para avisar a escola.";
      feedbackType.value = "alert";
      showFeedbackDialog.value = true;
      return;
    }
  }

  submitting.value = true;
  try {
    if (isEditing.value) {
      await atualizarAviso(avisoId.value, { aluno_ids: selectedAlunos.value });
      feedbackMessage.value = "Aviso atualizado com sucesso!";
    } else {
      const responsavelId = localStorage.getItem("id_token");
      await criarAviso({
        aluno_ids: selectedAlunos.value,
        responsavel_id: responsavelId,
      });
      feedbackMessage.value = "Aviso enviado com sucesso!";
    }
    feedbackType.value = "success";
    showFeedbackDialog.value = true;
  } catch (error) {
    console.error("Erro ao enviar aviso:", error);
    feedbackMessage.value = "Erro ao enviar aviso. Tente novamente.";
    feedbackType.value = "error";
    showFeedbackDialog.value = true;
  } finally {
    submitting.value = false;
  }
};

const handleExplicitCancel = () => {
  confirmDialogMessage.value = "Tem certeza que deseja cancelar este aviso?";
  showConfirmDialog.value = true;
};

const executeCancellation = async () => {
  submitting.value = true;
  try {
    await cancelarAviso(avisoId.value);
    feedbackMessage.value = "Aviso cancelado com sucesso!";
    feedbackType.value = "success";
    showFeedbackDialog.value = true;
  } catch (error) {
    console.error("Erro ao cancelar aviso:", error);
    feedbackMessage.value = "Erro ao cancelar aviso. Tente novamente.";
    feedbackType.value = "error";
    showFeedbackDialog.value = true;
  } finally {
    submitting.value = false;
  }
};

const handleFeedbackConfirm = () => {
  showFeedbackDialog.value = false;
  if (feedbackType.value === "success") {
    router.push("/resp/home");
  }
};

const checkAvisoAtivo = async () => {
  try {
    const responsavelId = localStorage.getItem("id_token");
    if (responsavelId) {
      const response = await verificarAvisoAtivo(responsavelId);
      if (response.data.aviso_ativo) {
        isEditing.value = true;
        avisoId.value = response.data.aviso_id;

        const avisoResponse = await getAviso(avisoId.value);
        if (avisoResponse.data && avisoResponse.data.aluno_ids) {
          selectedAlunos.value = avisoResponse.data.aluno_ids;
        }
      }
    }
  } catch (error) {
    console.error("Erro ao verificar aviso ativo:", error);
  }
};

onMounted(async () => {
  await checkAvisoAtivo();
  fetchAlunos();
});
</script>

<style scoped>
.title-text {
  color: #1f2a44;
  font-family: "DM Serif Text", serif;
}
.description-text {
  color: #1f2a44;
  font-family: "Roboto Condensed", sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  line-height: 1.3;
}
</style>

<route lang="yaml">
meta:
  layout: responsavel_layout
  requiresAuth: true
</route>
