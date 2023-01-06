<script setup>
  import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';

  const props = defineProps({
    items: Array,
    link: String,
    preDeleteFtn: Function
  });

  const goToEditPage = async (id) => {
    await navigateTo(`${props.link}/edit/${id}`);
  };

  const showDeleteDialog = (id) => {
    if (props.preDeleteFtn) {
      props.preDeleteFtn(id);
    }

    const deleteDialogStore = useDeleteDialogStore();
    deleteDialogStore.open();
  };
</script>

<template>
  <v-table v-if="items.length > 0">
    <thead>
      <tr>
        <th class="text-left">Id</th>
        <th class="text-left">Name</th>
        <slot name="table-head"></slot>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.name">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <slot name="table-body" :item="item"></slot>
        <td class="actions">
          <v-btn
            color="primary"
            @click="goToEditPage(item.id)">
            <span>Edit</span>
            <v-icon icon="mdi:mdi-pencil" />
          </v-btn>
          <v-btn
            color="primary"
            @click="showDeleteDialog(item.id)">
            <span>Delete</span>
            <v-icon icon="mdi:mdi-delete" />
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div v-if="items.length == 0">
    None available
  </div>
</template>

<style lang="scss">
  .v-table {
    width: 100%;
  
    .actions {
      display: flex;
      gap: 20px;
      margin-top: 11px;

      button {
        .v-btn__content {
          i {
            display: none;
          }

          span {
            display: block;
          }
        }
      }
    }
  }

  @media (max-width: 800px) {
    .v-table {
      .actions {
        button {
          padding: 0 5px;
          min-width: 32px;

          .v-btn__content {
            i {
              display: block;
            }

            span {
              display: none;
            }
          }
        }
      }
    }
  }
</style>
