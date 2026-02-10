<template>
  <v-app-bar color="#F2F3FE" scroll-behavior="elevate">
    <v-app-bar-title class="title">
      WayToSchool
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn variant="flat" rounded="lg" color="#4c6fff" class="mr-4">
      Experimente
    </v-btn>
  </v-app-bar>
</template>

<script setup>
  //
</script>

<style scoped>
  .title {
    color: #1f2a44;
    font-family: 'Playwrite AU TAS', cursive;
    font-weight: 500;
    font-size: clamp(18px, 2.5vw, 28px);
  }

  :deep(.v-toolbar-title__placeholder) {
  overflow: visible;
  text-overflow: clip;
  white-space: nowrap;
}

</style>
