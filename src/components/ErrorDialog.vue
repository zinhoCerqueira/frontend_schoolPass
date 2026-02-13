
<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="error-dialog-title d-flex align-center">
        <v-icon color="#1f2a44" class="mr-2">mdi-alert-circle-outline</v-icon>
        Aconteceu um erro
      </v-card-title>
      <v-card-text class="error-dialog-description">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#1f2a44" text @click="close">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const dialog = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal;
});

watch(dialog, (newVal) => {
  if (!newVal) {
    emit('update:modelValue', false);
  }
});

const close = () => {
  dialog.value = false;
};
</script>

<style scoped>
.error-dialog-title {
  color: #1f2a44;
  font-family: "DM Serif Text", serif;
  font-size: clamp(1.5rem, 3vw, 2rem); /* Adjusted for dialog title */
  line-height: 1.1;
}

.error-dialog-description {
  color: #1f2a44;
  font-family: "Roboto Condensed", sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.4;
}
</style>

