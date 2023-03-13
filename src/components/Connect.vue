<script setup>
import { ref, computed } from "vue";
import Modal from "@/components/Modal.vue";

import { useTree } from "@/stores/TreeStore"
let tree = useTree();

let showModal = ref(! tree.isConfigured);
let disabled = ref(false);

const validate = computed(() => {
  if (! tree.validateHost || ! tree.validatePort) {
    return;
  }

  tree.fill();
  showModal.value = false;
});
</script>

<template>
  <Teleport to="body">
    <Modal :show="showModal" @close="showModal = false">
      <template #header>Connection Details</template>

      <table class="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-gray-700 text-sm shadow-sm">
        <tbody>
          <tr>
            <td class="w-32 text-right border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              Host
            </td>
            <td class="border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
              <input
                type="text"
                class="p-2 w-full bg-gray-300 dark:text-slate-100 dark:bg-gray-600"
                v-model="tree.host"
                :class="{'border border-red-400': ! tree.validateHost}"
              />
            </td>
          </tr>
          <tr>
            <td class="w-32 text-right border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              Port
            </td>
            <td class="border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
              <input
                type="text"
                class="p-2 w-full bg-gray-300 dark:text-slate-100 dark:bg-gray-600"
                v-model="tree.port"
                :class="{'border border-red-400': ! tree.validatePort}"
              />
            </td>
          </tr>
          <tr>
            <td class="w-32 text-right border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              Username
            </td>
            <td class="border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
              <input
                type="text"
                class="p-2 w-full bg-gray-300 dark:text-slate-100 dark:bg-gray-600"
                v-model="tree.username"
                placeholder="Optional"
              />
            </td>
          </tr>
          <tr>
            <td class="w-32 text-right border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
              Password
            </td>
            <td class="border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
              <input
                type="text"
                class="p-2 w-full bg-gray-300 dark:text-slate-100 dark:bg-gray-600"
                v-model="tree.password"
                placeholder="Optional"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <template #footer>
        <button
          @click="validate"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Connect</button>
        <button
          @click="$emit('close')"
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >Close</button>
      </template>
    </Modal>
  </Teleport>
</template>
