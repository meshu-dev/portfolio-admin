import { onMounted } from 'vue';
import { useTechnologyStore } from '@/stores/TechnologyStore';

export default () => {
  const technologyStore = useTechnologyStore();
  
  onMounted(async () => {
    if (technologyStore.areFetched === false) {
      await technologyStore.fetchTechnologies();
    }
  });
};
