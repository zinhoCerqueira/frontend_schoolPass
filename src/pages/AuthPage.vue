<template>
  <v-container
    class="d-flex justify-center align-center fill-height"
    style="background-color: #f2f3fe"
  >
    <AuthForm :initialTab="initialTab" @close="handleClose" />
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

<style scoped></style>
