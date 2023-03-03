<script setup>
defineProps({
  modelValue: String,
});
let emit = defineEmits(["update:modelValue"]);

function onTab(e) {
  let t = e.target;
  let val = t.value,
    start = t.selectionStart,
    end = t.selectionEnd;

  t.value = val.substring(0, start) + "\t" + val.substring(end);

  t.selectionStart = t.selectionEnd = start + 1;
}
</script>

<template>
  <textarea
    @keydown.tab.prevent="onTab"
    @keyup="emit('update:modelValue', $event.target.value)"
    v-text="modelValue"
  />
</template>
