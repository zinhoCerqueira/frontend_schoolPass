<template>
  <v-bottom-navigation
    grow
    color="#4c6fff"
  >
    <v-btn value="home" to="/resp/home">
      <v-icon>mdi-home-outline</v-icon>
      <span>Início</span>
    </v-btn>

    <v-btn value="avisos" to="/resp/avisos">
      <v-icon>mdi-bell-outline</v-icon>
      <span>Avisos</span>
    </v-btn>

    <v-btn value="perfil">
      <v-icon>mdi-account-cog-outline</v-icon>
      <span>Perfil</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
</script>