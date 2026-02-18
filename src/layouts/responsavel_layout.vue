<template>
    <!-- AppBar Customizada para o Responsável -->
    <v-app-bar color="white" elevation="1" height="70">
      <div class="d-flex flex-column ml-4 justify-center">
        <span class="text-caption text-grey-darken-1" style="line-height: 1;">Bem vindo</span>
        <span class="text-h6 font-weight-bold title-text" style="line-height: 1.2;">Olá, Responsável</span>
      </div>

      <v-spacer></v-spacer>

      <!-- Avatar Placeholder -->
      <v-avatar color="#F2F3FE" class="mr-4" size="45">
        <v-icon icon="mdi-account" color="#4c6fff" size="28"></v-icon>
      </v-avatar>
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <router-view />
    </v-main>

    <v-bottom-navigation
      grow
      color="#4c6fff"
    >
      <v-btn value="home" to="/resp/home">
        <v-icon>mdi-home-outline</v-icon>
        <span>Início</span>
      </v-btn>

      <v-btn value="filhos" to="/resp/filhos">
        <v-icon>mdi-account-school-outline</v-icon>
        <span>Filhos</span>
      </v-btn>

      <v-btn value="perfil" to="/resp/perfil">
        <v-icon>mdi-account-cog-outline</v-icon>
        <span>Perfil</span>
      </v-btn>
    </v-bottom-navigation>
</template>

<script setup>
</script>

<style scoped>
.title-text {
  color: #1f2a44;
  font-family: 'Playwrite AU TAS', cursive;
}
</style>
