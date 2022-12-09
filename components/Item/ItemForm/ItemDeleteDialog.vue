<script setup>
  import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';

  const deleteDialogStore = useDeleteDialogStore();

  const selection = async (doDelete) => {
    const ftn = deleteDialogStore.getCallback;
    await ftn(doDelete);

    deleteDialogStore.close();
  };
</script>

<template>
  <v-dialog
    id="item-delete-dialog"
    v-model="deleteDialogStore.isVisible">
    <v-card>
      <v-card-title class="text-h5">
        {{ deleteDialogStore.title }}
      </v-card-title>
      <v-card-text>
        {{ deleteDialogStore.message }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          variant="tonal"
          @click="() => selection(true)">
          Yes
        </v-btn>
        <v-btn
          color="primary"
          variant="tonal"
          @click="() => selection(false)">
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
  #item-delete-dialog {
    max-width: 400px;

    .v-card-actions {
      display: flex;
      justify-content: center;
    }
  }
</style>
