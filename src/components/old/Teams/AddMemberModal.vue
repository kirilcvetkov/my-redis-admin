<script setup>
import Modal from "@/components/Modal.vue";
import { ref } from "vue";
import { useTeamStore } from "@/stores/TeamStore"

let team = useTeamStore();

let showModal = ref(false);
</script>

<template>
  <button
    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
    :disabled="! team.spotsRemaining"
    @click="showModal = true"
  >Add Member ({{ team.spotsRemaining }} Spots Left)</button>

  <Teleport to="body">
    <Modal :show="showModal"  @close="showModal = false">
      <template #header>Add a new Member</template>
      <form>
        <input type="text" class="px-1 border rounded mx-1 border-gray-200 w-100" />
        <button class="rounded px-2 bg-blue-400 hover:bg-blue-500">Add</button>
      </form>
    </Modal>
  </Teleport>
</template>
