import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/ProjectStore';

export default (id) => {
  const projectStore = useProjectStore();
  
  onMounted(async () => {
    if (projectStore.areFetched === false) {
      await projectStore.fetchProjects();
    }

    if (id) {
      projectStore.setSelectedProject(id);
    }
  });
};
