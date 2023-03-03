<script setup>
import { useFlash } from "@/composables/useFlash";

let { flash } = useFlash();
</script>

<template>
  <div>
    <button @click="flash('Success', 'works on about')">click2</button>
  </div>
</template>
