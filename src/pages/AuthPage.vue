<template>
  <v-container
    class="d-flex justify-center align-center fill-height"
    style="background-color: #f2f3fe"
  >
    <AuthForm :initialTab="initialTab" />
  </v-container>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import AuthForm from "../components/auth/AuthForm.vue";

const route = useRoute();

const initialTab = computed(() => {
  return route.query.tab || "login";
});
</script>

<style scoped></style>
