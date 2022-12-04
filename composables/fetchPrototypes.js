import { onMounted } from 'vue';
import { usePrototypeStore } from '@/stores/PrototypeStore';

export default () => {
  const prototypeStore = usePrototypeStore();
  
  onMounted(async () => {
    if (prototypeStore.areFetched === false) {
      await prototypeStore.fetchPrototypes();
    }
  });
};
