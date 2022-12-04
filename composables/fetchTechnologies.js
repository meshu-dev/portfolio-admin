import { onMounted } from 'vue';
import { useTechnologyStore } from '@/stores/TechnologyStore';

const technologyStore = useTechnologyStore();

export default () => {
  onMounted(async () => {
    if (technologyStore.areFetched === false) {
      await technologyStore.fetchTechnologies();
    }
  });
};
