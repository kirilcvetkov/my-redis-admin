<script setup>
import TreeList from "@/components/TreeList.vue";
import ConnectionsModal from "@/components/ConnectionsModal.vue";
import { useTree } from "@/stores/TreeStore"

let tree = useTree();
tree.connections();
tree.fill();
</script>

<template>
  <aside class="fixed top-0 left-0 w-64 h-full" aria-label="Sidenav">
    <div class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div class="pb-3">
        <img class="object-contain w-auto" src="@/assets/logo.png" />
      </div>

      <div class="pb-2">
        <ConnectionsModal />
      </div>

      <TreeList :tree="tree.list" :main="true" />
    </div>
  </aside>
</template>
