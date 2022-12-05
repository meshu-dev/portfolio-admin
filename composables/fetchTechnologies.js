import { onMounted } from 'vue';
import { useTechnologyStore } from '@/stores/TechnologyStore';

export default (id) => {
  const technologyStore = useTechnologyStore();
  
  onMounted(async () => {
    if (technologyStore.areFetched === false) {
      await technologyStore.fetchTechnologies();
    }

    if (id) {
      technologyStore.setSelectedTechnology(id);
    }
  });
};
