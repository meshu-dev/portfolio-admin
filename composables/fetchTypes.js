import { onMounted } from 'vue';
import { useTypeStore } from '@/stores/TypeStore';

export default (id) => {
  const typeStore = useTypeStore();

  onMounted(async () => {
    if (typeStore.areFetched === false) {
      await typeStore.fetchTypes();
    }

    if (id) {
      typeStore.setSelectedType(id);
    }
  });
};
