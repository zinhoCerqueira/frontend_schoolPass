<template>
  <v-container
    class="auth-container d-flex justify-center align-center fill-height"
  >
    <div class="circle-1"></div>
    <div class="circle-2"></div>
    <div class="circle-3"></div>
    <AuthForm :initialTab="initialTab" @close="handleClose" class="auth-form" />
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import AuthForm from "../components/auth/AuthForm.vue";

const route = useRoute();
const router = useRouter();

const initialTab = computed(() => {
  return route.query.tab || "login";
});

const handleClose = () => {
  router.push('/');
};
</script>
<style scoped>
.auth-container {
  background-color: #f2f3fe;
  position: relative;
  overflow: hidden;
}

.auth-form {
  position: relative;
  z-index: 1;
}

.auth-container > div[class^="circle-"] {
  position: absolute;
  border-radius: 50%;
  background-color: #aaadd5;
  z-index: 0;
}

.circle-1 {
  width: 350px;
  height: 350px;
  top: -120px;
  left: -150px;
}

.circle-2 {
  width: 500px;
  height: 500px;
  bottom: -200px;
  right: -200px;
}

</style>
