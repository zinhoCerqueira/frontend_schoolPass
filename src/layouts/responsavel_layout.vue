<template>
  <v-layout class="layout-wrapper">
    <RespAppBar />

    <v-main class="main-content">

      <div class="background-layer">
        <div class="circle-1">
          <v-icon class="bg-icon icon-school" icon="mdi-school-outline" />
        </div>

        <div class="circle-2">
          <v-icon class="bg-icon icon-car" icon="mdi-car-side" />
        </div>
      </div>

      <div class="content-wrapper">
        <router-view />
      </div>

    </v-main>

    <RespBottomNav />
  </v-layout>
</template>

<script setup>
import RespAppBar from "@/components/resp/RespAppBar.vue";
import RespBottomNav from "@/components/resp/RespBottomNav.vue";
</script>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
}

.main-content {
  position: relative;
  background-color: #f6f6f8;
  overflow: hidden;
}

.background-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  filter: blur(80px);
  opacity: 0.6;
}

.content-wrapper {
  position: relative;
  z-index: 1;
}

.background-layer > div[class^="circle-"] {
  position: absolute;
  border-radius: 50%;
  background-color: #aaadd5;
  display: flex;
  justify-content: center;
  align-items: center;
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

.bg-icon {
  color: #d1d3ed;
  pointer-events: none;
}

.icon-school {
  font-size: 200px;
  transform: translate(25%, 25%) rotate(15deg);
}

.icon-car {
  font-size: 300px;
  transform: translate(-25%, -25%) rotate(-10deg);
}
</style>