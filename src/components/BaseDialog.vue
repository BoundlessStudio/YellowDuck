<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';

const props = defineProps({
  /* Use modelValue so it plays nicely with v-model:show in Vue 3 */
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const dialog = ref<HTMLDialogElement | null>(null);

/**
 * Opens the native HTML dialog.
 */
function openDialog() {
  // `showModal()` throws if the dialog is already open, so we guard
  if (!dialog.value?.open) {
    dialog.value?.showModal();
  }
}

/**
 * Closes the native HTML dialog.
 */
function closeDialog() {
  // Only close if it is currently open
  if (dialog.value?.open) {
    dialog.value.close();
    emit('update:modelValue', false);
  }
}

/**
 * Close the dialog if clicked outside the content.
 */
function handleClickOutside(event: MouseEvent) {
  if (event.target === dialog.value) {
    closeDialog();
  }
}

/**
 * Watch for changes in `modelValue` to open/close the native dialog
 */
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      openDialog();
    } else {
      closeDialog();
    }
  }
);

onMounted(() => {
  // If modelValue is initially true, open on mount
  if (props.modelValue) {
    openDialog();
  }
});
</script>

<template>
  <dialog
    ref="dialog"
    @click="handleClickOutside"
    class="w-96  bg-white p-6 rounded-lg shadow-lg relative"
  >
    <!-- Title slot -->
    <div class="mb-4 text-center">
      <slot name="title"></slot>
    </div>

    <!-- Main content slot -->
    <slot name="content"></slot>
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
</style>
