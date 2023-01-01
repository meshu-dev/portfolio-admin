<script setup>
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import setupData from '@/composables/prototype/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';

  const prototypeStore = usePrototypeStore();

  setupData();

  const setCurrentPrototype = (id) => {
    prototypeStore.setSelectedPrototype(id);
  };
</script>

<template>
  <ItemListHeader
    title="Prototypes"
    link="/prototypes/new" />
  <ItemListTable
    :items="prototypeStore.getPrototypes"
    link="/prototypes"
    :preDeleteFtn="setCurrentPrototype">
    <template #table-head>
      <th class="text-left">Type</th>
    </template>
    <template #table-body="{ item }">
      <td>{{ item.type.name }}</td>
    </template>
  </ItemListTable>
</template>