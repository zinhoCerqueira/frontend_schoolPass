<template>
  // Barra de navegação
  <v-app-bar :elevation="1">
    <v-app-bar-title class="app-title">WayToSchool</v-app-bar-title>

    <template v-slot:image>
      <v-img gradient="135deg, #2f78a8, #000508" />
    </template>

    <template v-slot:append>
      <div class="app-bar-actions">
        <v-btn
          variant="flat"
          rounded
          prepend-icon="mdi-login-variant"
          color="white"
        >
          Entrar
        </v-btn>

        <v-btn
          variant="flat"
          rounded
          prepend-icon="mdi-account-plus-outline"
          color="white"
        >
          Cadastre-se
        </v-btn>
      </div>
    </template>
  </v-app-bar>

  <v-main class="d-flex align-center">
    <v-container>
      <p class="app-main-title mb-8" :class="{ typing: isTyping }">
        {{ displayedText }}
      </p>

      <v-row justify="center">
        <v-col
          v-for="(feature, index) in features"
          :key="index"
          cols="12"
          md="6"
        >
          <v-card
            variant="tonal"
            :color="cardColor(index)"
            class="rounded-xl d-flex flex-row align-center"
          >
            <v-btn
              class="mr-2 ml-5"
              :color="cardColor(index)"
              :icon="feature.icon"
            ></v-btn>

            <v-card-text>
              <div>
                <div class="text-h6 font-weight-bold text-uppercase">
                  {{ feature.title }}
                </div>

                <div class="text-body-1">
                  {{ feature.text }}
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12">
          <v-card
            class="rounded-xl pa-8 text-center"
            color="#405877"
          >
            <div class="text-h4 font-weight-bold mb-4">
              Mais controle. Menos preocupação.
            </div>

            <div class="text-body-1 mb-6">
              Pais avisam, a escola se organiza e o aluno sai no momento certo.
              Tudo em tempo real, sem filas e sem confusão.
            </div>

            <v-btn
              size="large"
              rounded
              color="white"
              prepend-icon="mdi-rocket-launch-outline"
            >
              Começar agora
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <v-footer class="footer-gradient">
    <v-container class="py-0">
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="4" class="text-center text-md-left">
          <div class="footer-title">WayToSchool</div>
          <div class="footer-subtitle">Chegar e sair com mais tranquiliadade2</div>
        </v-col>

        <!-- Links -->
        <v-col cols="12" md="4" class="text-center">
          <v-btn variant="text" class="footer-link"> Sobre </v-btn>
          <v-btn variant="text" class="footer-link"> Contato </v-btn>
          <v-btn variant="text" class="footer-link"> Privacidade </v-btn>
        </v-col>

        <v-col cols="12" md="4" class="text-center text-md-right">
          <div class="footer-copy">
            © {{ new Date().getFullYear() }} WayToSchool
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
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
const endDelay = 400;

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

const visibleCards = ref(Array(features.length).fill(false));

const showCardsSequentially = () => {
  features.forEach((_, index) => {
    setTimeout(() => {
      visibleCards.value[index] = true;
    }, index * 150);
  });
};

setTimeout(() => {
  isTyping.value = false;
  showCardsSequentially();
}, endDelay);

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

const cardColor = (index) => {
  const colors = ["primary", "secondary"];
  return colors[index % colors.length];
};
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

.feature-title {
  font-size: 1.05rem; /* maior que body */
  font-weight: 700; /* impacto */
  text-transform: uppercase; /* MAIÚSCULO */
  letter-spacing: 0.06em; /* visual mais premium */
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 6px;
}

.feature-text {
  font-size: 0.95rem; /* levemente maior */
  line-height: 1.6; /* conforto de leitura */
  color: rgba(var(--v-theme-on-surface), 0.75);
}

.footer-gradient {
  background: linear-gradient(135deg, #000508, #2f78a8);
  color: white;
  flex: 0 0 auto !important;
}

.footer-title {
  font-family: "Playwrite AU TAS", cursive;
  font-size: 1.1rem;
  font-weight: 600;
}

.footer-subtitle {
  font-size: 0.85rem;
  opacity: 0.85;
}

.footer-link {
  color: white;
  font-weight: 500;
}

.footer-link:hover {
  opacity: 0.8;
}

.footer-copy {
  font-size: 0.8rem;
  opacity: 0.8;
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
