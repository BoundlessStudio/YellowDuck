<script setup lang="ts">
defineProps({
  textColor: {
    type: String,
    default: "text-amber-800", // Default value for the text color
  },
  state: {
    type: String,
    default: "locked", // Default state: unlocked
    validator: (value: string) => ["locked", "unlocked"].includes(value),
  },
});
</script>

<template>
  <!-- First Element -->
  <div class="px-1">
    <svg
      v-if="state === 'locked'"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
      :class="textColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </svg>

    <!-- Second Element -->
    <svg
      v-if="state === 'unlocked'"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
      :class="textColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </svg>
  </div>
</template>
