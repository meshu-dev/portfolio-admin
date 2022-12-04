import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/ProjectStore';

export default () => {
  const projectStore = useProjectStore();
  
  onMounted(async () => {
    if (projectStore.areFetched === false) {
      await projectStore.fetchProjects();
    }
  });
};
