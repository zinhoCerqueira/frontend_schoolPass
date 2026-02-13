
<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="dialog-title d-flex align-center" :class="dialogContent.titleClass" :style="{ backgroundColor: dialogContent.backgroundColor }">
        <v-icon color="#1f2a44" class="mr-2">{{ dialogContent.icon }}</v-icon>
        {{ dialogContent.title }}
      </v-card-title>
      <v-card-text class="dialog-description">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#1f2a44" text @click="handleConfirm">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'alert',
    validator: (value) => ['error', 'success', 'alert'].includes(value),
  },
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const dialog = ref(props.modelValue);

const dialogContent = computed(() => {
  switch (props.type) {
    case 'error':
      return {
        title: 'Aconteceu um erro',
        icon: 'mdi-alert-circle-outline',
        backgroundColor: '#ffebee', // Light red
        titleClass: 'error-title',
      };
    case 'success':
      return {
        title: 'Sucesso!',
        icon: 'mdi-check-circle-outline',
        backgroundColor: '#e8f5e9', // Light green
        titleClass: 'success-title',
      };
    default: // alert
      return {
        title: 'Atenção',
        icon: 'mdi-alert-outline',
        backgroundColor: '#fffde7', // Light yellow
        titleClass: 'alert-title',
      };
  }
});

watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal;
});

watch(dialog, (newVal) => {
  if (!newVal) {
    emit('update:modelValue', false);
  }
});

const handleConfirm = () => {
  emit('confirm');
  dialog.value = false;
};
</script>

<style scoped>
.dialog-title {
  font-family: "DM Serif Text", serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.1;
  color: #1f2a44; /* Keep text color consistent */
}

.dialog-description {
  color: #1f2a44;
  font-family: "Roboto Condensed", sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.4;
}
/* Removed individual color classes as the color is now consistent and background is dynamic */
</style>

