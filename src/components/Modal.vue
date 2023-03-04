<script setup>
  import { XCircleIcon } from '@heroicons/vue/24/outline'

  defineProps({
    show: Boolean,
  })
</script>

<template>
  <Transition
    enter-from-class="opacity-0 scale-105"
    enter-to-class="opacity-100 scale-100"
    enter-active-class="transition duration-300"
    leave-active-class="transition duration-100"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="show" class="modal-mask">
      <div class="modal-container rounded-md">
        <header class="pb-1 mb-3 border-b">
          <slot name="header" />
          <button @click="$emit('close')" class="float-right w-6">
            <XCircleIcon class="text-gray-500" />
          </button>
        </header>

        <div>
          <slot />
        </div>

        <footer class="border-t pt-3 mt-3">
          <slot name="footer">
            <button
              @click="$emit('close')"
              class="rounded px-2 bg-gray-400 hover:bg-gray-500 float-right"
            >Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<style>
  .modal-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, .6);
    display: grid;
    place-items: center;
  }
  .modal-container {
    background: white;
    padding: 1rem;
    width: 80vw;
    max-width: 500px;
  }
</style>
