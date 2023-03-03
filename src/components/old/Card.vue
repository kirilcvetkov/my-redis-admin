<script setup>
  defineProps({
    theme: { type: String, default: 'dark' },
  });
</script>

<template>
  <div :class="{
    ' p-4 border rounded-lg': true,
    'bg-white text-gray-700 border-gray-300': theme == 'light',
    'bg-gray-700 border-gray-600': theme == 'dark',
  }">
  <div v-if="$slots.heading" class="flex justify-between items-start">
    <h2 class="font-bold mb-2">
      <slot name="heading" />
    </h2>
  </div>

  <slot />

  <footer v-if="$slots.footer" class="border-t border-gray-600 text-sm mt-4 pt-4">
    <slot name="footer" />
  </footer>
</div>
</template>
