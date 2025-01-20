<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { listExtractor } from '@/api/extract';
import { toastify } from '@/api/general';

import BaseDialog from '@/components/BaseDialog.vue'

// If you haven't already declared this in a separate file:
export interface ExtractorModel {
  name: string;
  url: string;
  count: number;
  size: number;
}

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Object as PropType<ExtractorModel>,
    default: () => ({
      name: '',
      url: '',
      count: 0,
      size: 0,
    }),
  },
})

const emit = defineEmits(['update:show', 'update:modelValue'])

/**
 * The same computed pattern for controlling the dialog visible state,
 * but now we read/write props.show.
 */
const dialogVisible = computed({
  get() {
    return props.show
  },
  set(value: boolean) {
    emit('update:show', value)
  },
})

const textAreaValue = ref('')

async function handleSubmit() {
  if (!textAreaValue.value.trim()) {
    toastify('Please enter at least one line of text.')
    return
  }

  const updatedExtractorModel = await listExtractor(textAreaValue.value);

  // Emit the updated modelValue (ExtractorModel)
  emit('update:modelValue', updatedExtractorModel)

  // Close the dialog
  emit('update:show', false)
}
</script>

<template>
  <!-- Use v-model="dialogVisible" because 'show' controls dialog visibility now -->
  <BaseDialog v-model="dialogVisible">
    <template #title>
      <h2 class="text-lg font-semibold">Enter List of Items</h2>
    </template>

    <template #content>
      <div class="flex flex-col space-y-4">
        <label for="textArea" class="font-semibold">
          Paste or type your list:
        </label>
        <textarea
          id="textArea"
          v-model="textAreaValue"
          rows="7"
          class="border border-gray-400 p-2 rounded resize-none"
          :placeholder="'one item per line'"
        ></textarea>

        <button
          @click="handleSubmit"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Create List
        </button>
      </div>
    </template>
  </BaseDialog>
</template>
