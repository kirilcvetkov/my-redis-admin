<script setup>
import TreePanel from "@/components/TreePanel.vue";
import DisplayPanel from "@/components/DisplayPanel.vue";
import Connect from "@/components/Connect.vue";

const props = defineProps({
  id: String
});
</script>

<template>
  <TreePanel />
  <DisplayPanel v-if="id" :id="id" />
  <Connect />
</template>
