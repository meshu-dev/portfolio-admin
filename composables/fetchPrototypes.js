import { onMounted } from 'vue';
import { usePrototypeStore } from '@/stores/PrototypeStore';

const prototypeStore = usePrototypeStore();

export default () => {
  onMounted(async () => {
    if (prototypeStore.areFetched === false) {
      await prototypeStore.fetchPrototypes();
    }
  });
};
