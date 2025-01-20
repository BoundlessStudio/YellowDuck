<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { ExtractorModel, rangeExtractor } from '@/api/extract'
import { toastify } from '@/api/general'

import BaseDialog from '@/components/BaseDialog.vue'


/**
 * Props
 *  - show: controls showing/hiding the dialog (old modelValue)
 *  - modelValue: the ExtractorModel to update (old enumeratorInput)
 */
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

/**
 * Emitted events
 *  - update:show: for v-model on boolean (open/close)
 *  - update:modelValue: for v-model on the ExtractorModel
 */
const emit = defineEmits(['update:show', 'update:modelValue'])

/**
 * Because props are read-only, we create a computed
 * property that gets/sets props.show.
 * This is what we bind to <BaseDialog v-model="dialogVisible"/>.
 */
const dialogVisible = computed({
  get() {
    return props.show
  },
  set(value: boolean) {
    emit('update:show', value)
  },
})

/**
 * Local state for the numeric input
 */
const rangeValue = ref<string>('')

/**
 * Create the file (or data) from the numeric input and emit as ExtractorModel
 */
 async function handleSubmit(event: Event) {
  event.stopPropagation()
  event.preventDefault()
  
  if (!rangeValue.value) return

  const max = parseInt(rangeValue.value, 10)
  if (isNaN(max) || max < 1) {
    toastify('Please enter a valid positive number.')
    return
  }

  const updatedExtractorModel = await rangeExtractor(max);

  // Emit to update the new modelValue (ExtractorModel)
  emit('update:modelValue', updatedExtractorModel)

  // Close the dialog by setting show to false
  emit('update:show', false)
}
</script>

<template>
  <!-- Instead of v-model="modelValue", we now use v-model="dialogVisible" because show controls dialog visibility -->
  <BaseDialog v-model="dialogVisible">
    <template #title>
      <h2 class="text-lg font-semibold">Select Range</h2>
    </template>

    <template #content>
      <form @submit="handleSubmit">
        <div class="flex flex-col gap-4">
          <div class="flex flex-row gap-4">
            <input
              value="1"
              disabled
              type="number"
              min="1"
              class="w-12 border border-gray-400 p-2 rounded "
              placeholder="Enter a positive integer"
            />
            <div class="text-lg flex justify-center items-center">To</div>
            <input
              v-model="rangeValue"
              type="number"
              min="1"
              class="w-full border border-gray-400 p-2 rounded"
              placeholder="Enter a positive integer"
            />
          </div>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Create Range
          </button>
        </div>
      </form>
    </template>
  </BaseDialog>
</template>
