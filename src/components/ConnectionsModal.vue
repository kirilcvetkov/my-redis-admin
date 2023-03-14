<script setup>
import { ref, computed } from "vue";
import { CheckCircleIcon, LinkIcon } from '@heroicons/vue/24/outline'
import Modal from "@/components/Modal.vue";

import { useTree } from "@/stores/TreeStore"
let tree = useTree();
tree.connections();

let showModal = ref(! tree.validateHost);

const validate = computed(() => {
  if (! tree.validateHost || ! tree.validatePort) {
    return;
  }

  tree.fill();
  showModal.value = false;
});
</script>

<template>
  <button
    type="button"
    class="px-2 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    title="Connection"
    @click="showModal = true"
  >
    <LinkIcon class="w-4" />
  </button>

  <Teleport to="body">
    <Modal :show="showModal" @close="showModal = false">
      <template #header>Connections</template>

      <table class="w-full border border-slate-300 dark:border-slate-600 dark:text-gray-300 bg-white dark:bg-gray-700 text-sm shadow-sm">
        <thead>
          <tr class="border-b border-slate-300 dark:border-slate-600 text-left">
            <th class="w-0"></th>
            <th class="p-2">Name</th>
            <th class="p-2">Host</th>
            <th class="p-2">Port</th>
            <th class="p-2">Username</th>
            <th class="p-2">Password</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(connection, key) in tree.connections">
            <td class="p-4 text-slate-500 dark:text-slate-400"
              @click="tree.connectionId = key"
            >
              <CheckCircleIcon
                class="w-4"
                :class="{
                  'text-green-600': key == tree.connectionId,
                  'text-gray-600': key != tree.connectionId,
                }"
              />
            </td>
            <td class="p-4 text-slate-500 dark:text-slate-400">
              {{ connection.name }}
            </td>
            <td class="p-4 text-slate-500 dark:text-slate-400">
              {{ connection.host }}
            </td>
            <td class="p-4 text-slate-500 dark:text-slate-400">
              {{ connection.port }}
            </td>
            <td class="p-4 text-slate-500 dark:text-slate-400">
              {{ connection.username }}
            </td>
            <td class="p-4 text-slate-500 dark:text-slate-400">
              {{ connection.password }}
            </td>
          </tr>
        </tbody>
      </table>

      <template #footer>
        <button
          @click="validate"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Connect</button>
        <button
          @click="showModal = false"
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-1.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >Close</button>
      </template>
    </Modal>
  </Teleport>
</template>
