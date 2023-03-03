<script setup>
  import DisplayTitle from "@/components/DisplayTitle.vue";
  import DisplayValue from "@/components/DisplayValue.vue";
  import DisplayDetails from "@/components/DisplayDetails.vue";
  import { useTree } from "@/stores/TreeStore"
  import { useRoute } from 'vue-router';

  const route = useRoute();
  let tree = useTree();
  tree.getItem(route.params.id);
</script>

<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <DisplayTitle />
      <DisplayDetails :item="tree.getItemValue" />
      <DisplayValue :item="tree.getItemValue" />
    </div>
  </div>
</template>

