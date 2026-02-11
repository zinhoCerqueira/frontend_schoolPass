<template>
  <v-container class="d-flex justify-center align-center min-vh-100">
    <AuthForm />
  </v-container>
</template>

<script setup>
import AuthForm from '../components/auth/AuthForm.vue';
// No specific script logic needed for AuthPage itself, just rendering AuthForm
</script>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
}
</style>
