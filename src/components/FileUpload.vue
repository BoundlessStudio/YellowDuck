<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  modelValue: File | null | undefined
  extensions: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', file: File | null | undefined): void
}>()

const isDragging = ref(false)
const isSuccess = ref(false)
const isError = ref(false)
const fileName = ref('')

const file = computed<File | null | undefined>({
  get: () => props.modelValue,
  set: (newFile) => {
    emit('update:modelValue', newFile)
  },
})

const fileInputRef = ref<HTMLInputElement | null>(null)

function triggerFileInput() {
  fileInputRef.value?.click()
}

function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files) return

  handleFiles(input.files)
  input.value = '' // Reset input to allow re-selecting the same file
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
  if (!event.dataTransfer) return

  handleFiles(event.dataTransfer.files)
}

/**
 * Handle a batch of files (drag & drop or via input).
 * This example only handles one file at a time.
 */
function handleFiles(fileList: FileList) {
  const f = fileList[0]
  if (!f) return

  handleFile(f)
}

function handleFile(f: File) {
  const fileExtension = f.name.slice(f.name.lastIndexOf('.')).toLowerCase()
  if (props.extensions.includes(fileExtension)) {
    isSuccess.value = true
    isError.value = false
    fileName.value = f.name
    file.value = f
  } else {
    isSuccess.value = false
    isError.value = true
    fileName.value = f.name
    file.value = undefined
  }
}

/**
 * Watch for changes to the modelValue (File or null/undefined).
 * If it’s changed externally, we reset or re-check it here.
 */
watch(
  () => props.modelValue,
  (f) => {
    if (!f) {
      // Reset flags when file is cleared
      isSuccess.value = false
      isError.value = false
      fileName.value = ''
    } else {
      handleFile(f)
    }
  },
  { immediate: true } // Optional: run once on component mount
)
</script>

<template>
  <div class="pt-4">
    <div
      class="border-2 border-dashed rounded p-8 text-center cursor-pointer 
             w-full h-full transition-colors duration-300 relative"
      :class="[ 
        isDragging ? 'bg-blue-50 border-blue-400' : 'border-gray-300',
        isSuccess ? 'border-green-500 bg-green-50' : '',
        isError ? 'border-red-500 bg-red-50' : ''
      ]"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="triggerFileInput"
    >
      <p class="text-gray-600 hover:text-blue-500 transition-colors duration-300">
        Drag and drop file here or click to select file
      </p>
      <!-- Hidden file input -->
      <input
        type="file"
        class="hidden"
        :accept="extensions.join(',')"
        ref="fileInputRef"
        @change="handleFileSelect"
      />

      <!-- Success message -->
      <div 
        v-if="isSuccess" 
        class="text-green-600 font-semibold mt-4"
      >
        {{ fileName }} Ready.
      </div>

      <!-- Error message -->
      <div 
        v-if="isError" 
        class="text-red-600 font-semibold mt-4"
      >
        {{ fileName }} rejected.
      </div>
    </div>
  </div>
</template>
