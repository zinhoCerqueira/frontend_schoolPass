<template>
  // Barra de navegação
  <v-app-bar :elevation="1" class="app-title">
    <v-app-bar-title>WayToSchool</v-app-bar-title>
    <template v-slot:image>
      <v-img
        gradient="to top left, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:append>
      <div class="app-bar-actions">
        <v-btn
          variant="flat"
          rounded
          prepend-icon="mdi-login-variant"
          class="btn-gradient"
          elevation
        >
          Entrar
        </v-btn>

        <v-btn
          variant="flat"
          rounded
          prepend-icon="mdi-account-plus-outline"
          class="btn-gradient"
        >
          Cadastre-se
        </v-btn>
      </div>
    </template>
  </v-app-bar>

  <v-main>
  <v-container>
    <p
      class="app-main-title"
      :class="{ typing: isTyping }"
    >
      {{ displayedText }}
    </p>
  </v-container>
</v-main>


</template>

<script setup>
import { ref, onMounted } from "vue";
import LoginDialog from "@/components/LoginDialog.vue";
import RegisterDialog from "@/components/RegisterDialog.vue";

const loginDialog = ref(false);
const registerDialog = ref(false);

const fullText = "Chegar e sair ficou mais fácil.";
const displayedText = ref("");
const isTyping = ref(true);
const typingSpeed = 30;

const features = [
  {
    icon: "mdi-car-outline",
    title: "Estou a caminho",
    text: "Avise a escola quando sair de casa para buscar o aluno.",
  },
  {
    icon: "mdi-clock-outline",
    title: "Menos espera",
    text: "A escola se organiza com antecedência, evitando filas.",
  },
  {
    icon: "mdi-bell-ring-outline",
    title: "Notificação em tempo real",
    text: "A equipe recebe o aviso instantaneamente.",
  },
  {
    icon: "mdi-shield-check-outline",
    title: "Mais segurança",
    text: "Somente responsáveis autorizados fazem a retirada.",
  },
  {
    icon: "mdi-account-child-outline",
    title: "Foco no aluno",
    text: "Crianças saem no momento certo, sem aglomeração.",
  },
  {
    icon: "mdi-school-outline",
    title: "Rotina organizada",
    text: "A escola controla melhor os horários de saída.",
  },
];

onMounted(() => {
  let index = 0;
  const typingInterval = setInterval(() => {
    if (index < fullText.length) {
      displayedText.value += fullText.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
      isTyping.value = false;

    }
  }, typingSpeed);
});


</script>

<style scoped>
.app-title {
  font-family: "Playwrite AU TAS", cursive;
  font-size: 1.25rem;
  white-space: nowrap;
}

.app-main-title {
  font-family: "Roboto Mono", monospace;
  font-size: 1.5rem;
  font-weight: 500;
}

.app-bar-actions {
  display: flex;
  align-items: center;
  margin-inline-end: 20px;
  gap: 10px;
}

.btn-gradient {
  color: white;
  background: linear-gradient(135deg, #000508, #2f78a8);
}

.main-content {
  background: linear-gradient(
    to bottom right,
    rgba(52, 110, 143, 0.307),
    rgba(71, 151, 142, 0.458)
  );
}

.typing {
  display: inline-block;
  border-right: 2px solid currentColor;
  padding-right: 4px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

</style>
