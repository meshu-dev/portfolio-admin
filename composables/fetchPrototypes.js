import { onMounted } from 'vue';
import { usePrototypeStore } from '@/stores/PrototypeStore';

export default (id) => {
  const prototypeStore = usePrototypeStore();
  
  onMounted(async () => {
    if (prototypeStore.areFetched === false) {
      await prototypeStore.fetchPrototypes();
    }

    if (id) {
      prototypeStore.setSelectedPrototype(id);
    }
  });
};
