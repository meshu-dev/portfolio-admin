<script setup>
  const props = defineProps({
    items: Array,
    link: String
  });
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Id</th>
        <th class="text-left">Name</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.name">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td class="actions">
          <v-btn variant="tonal">Edit</v-btn>
          <v-btn variant="tonal">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style lang="scss">
  .v-table {
    width: 100%;
  
    .actions {
      display: flex;
      gap: 20px;
      margin-top: 11px;
    }
  }
</style>
