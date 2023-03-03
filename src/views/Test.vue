<script setup>
  var data = [
  ];
</script>

<template>
  <tree
    :data="data"
    @toggle="toggle($event)"
    @change="change($event)">
  </tree>
</template>
