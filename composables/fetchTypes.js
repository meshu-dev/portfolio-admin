import { onMounted } from 'vue';
import { useTypeStore } from '@/stores/TypeStore';

const typeStore = useTypeStore();

export default () => {
  onMounted(async () => {
    if (typeStore.areFetched === false) {
      await typeStore.fetchTypes();
    }
  });
};
