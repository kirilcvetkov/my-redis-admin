<script setup>
  import Modal from "@/components/Modal.vue";
  import { PencilSquareIcon, XCircleIcon, CircleStackIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="flex items-center justify-center mb-8 rounded bg-gray-50 dark:bg-gray-800 gap-6">
    <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{ $route.params.id }}
    </h5>
    <div class="flex items-center justify-center gap-2">
      <button title="Edit">
        <PencilSquareIcon class="w-6 h-6 text-green-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      </button>
      <button title="Delete">
        <XCircleIcon class="w-6 h-6 text-red-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      </button>
      <button title="Export">
        <CircleStackIcon class="w-6 h-6 text-blue-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      </button>
    </div>
  </div>
</template>
