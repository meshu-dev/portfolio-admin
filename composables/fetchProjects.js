import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/ProjectStore';

const projectStore = useProjectStore();

export default () => {
  onMounted(async () => {
    if (projectStore.areFetched === false) {
      await projectStore.fetchProjects();
    }
  });
};
