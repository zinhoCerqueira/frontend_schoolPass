<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-4" max-width="400" width="100%">
      <v-card-title class="text-h5 text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="username"
            label="Username"
            required
            variant="outlined"
            class="mb-4"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
            variant="outlined"
            class="mb-4"
          ></v-text-field>
          <v-btn
            color="primary"
            block
            type="submit"
            size="large"
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const login = () => {
  // Handle login logic here
  console.log('Login attempt:', username.value, password.value)
  alert('Login functionality not implemented yet.')
}
</script>

<style scoped>
/* Add any specific styles for the login page here if needed */
</style>
