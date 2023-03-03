<script setup>
  import { defineProps } from "vue";
  import { RouterLink } from 'vue-router';
  import { FolderIcon, DocumentIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
  import TreeList from "@/components/TreeList.vue";

  defineProps({
    name: String,
    itemKey: String,
    children: Object,
    showChildren: { type: Boolean, default: false },
  });
</script>

<template>
  <li>
    <button
      v-if="children"
      type="button"
      class="text-xs flex items-center text-left w-full text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      aria-controls="dropdown-pages"
      data-collapse-toggle="dropdown-pages"
    >
      <ChevronRightIcon
        v-if="! showChildren"
        @click="showChildren = ! showChildren"
        class="w-4 h-4 mr-1 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      />

      <ChevronDownIcon
        v-if="showChildren"
        @click="showChildren = ! showChildren"
        class="w-4 h-4 mr-1 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      />

      <FolderIcon
        @click="showChildren = ! showChildren"
        class="w-5 h-5 mr-1 text-blue-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      />

      <span
        class="flex-1 whitespace-nowrap"
        @click="showChildren = ! showChildren"
      >{{ name }}</span>
    </button>

    <RouterLink
      :to="{ name: 'get', params: { id: itemKey }}"
      v-if="! children"
      custom
      v-slot="{ navigate }"
    >
      <button
        v-if="! children"
        @click="navigate"
        role="link"
        type="button"
        class="text-xs flex items-center pl-2 pt-1 w-full text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown-pages"
        data-collapse-toggle="dropdown-pages"
      >
        <DocumentIcon
          @click="showChildren = ! showChildren"
          class="w-4 h-4 text-yellow-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white mr-1"
        />
        <span class="flex-1 text-left whitespace-nowrap">{{ name }}</span>
      </button>
    </RouterLink>

    <TreeList v-if="children && showChildren" class="ml-2" :tree="children" />
  </li>
</template>
