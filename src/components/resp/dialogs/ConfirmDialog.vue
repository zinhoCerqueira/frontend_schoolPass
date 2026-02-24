<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="dialog-title d-flex align-center" style="background-color: #ffebee">
        <v-icon color="#1f2a44" class="mr-2">mdi-alert-circle-outline</v-icon>
        {{ title }}
      </v-card-title>
      <v-card-text class="dialog-description">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#1f2a44" variant="text" @click="handleCancel">Cancelar</v-btn>
        <v-btn color="error" variant="text" @click="handleConfirm">Confirmar</v-btn>
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
  title: {
    type: String,
    default: 'Confirmação',
  },
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const dialog = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal;
});

watch(dialog, (newVal) => {
  emit('update:modelValue', newVal);
});

const handleCancel = () => {
  dialog.value = false;
  emit('cancel');
};

const handleConfirm = () => {
  dialog.value = false;
  emit('confirm');
};
</script>

<style scoped>
.dialog-title {
  font-family: "DM Serif Text", serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.1;
  color: #1f2a44;
}

.dialog-description {
  color: #1f2a44;
  font-family: "Roboto Condensed", sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.4;
}
</style>