<template>
  <v-bottom-navigation
    grow
    color="#4c6fff"
  >
    <v-btn value="home" to="/resp/home">
      <v-icon>mdi-home-outline</v-icon>
      <span>Início</span>
    </v-btn>

    <v-btn value="filhos" >
      <v-icon>mdi-account-school-outline</v-icon>
      <span>Filhos</span>
    </v-btn>

    <v-btn value="perfil">
      <v-icon>mdi-account-cog-outline</v-icon>
      <span>Perfil</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
</script>