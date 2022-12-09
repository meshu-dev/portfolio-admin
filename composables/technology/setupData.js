import { onMounted } from 'vue';
import { useTechnologyStore } from '@/stores/TechnologyStore';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';

const fetchList = async () => {
  const technologyStore = useTechnologyStore();

  if (technologyStore.areFetched === false) {
    await technologyStore.fetchTechnologies();
  }
};

const setData = (id) => {
  const technologyStore = useTechnologyStore();
  technologyStore.setSelectedTechnology(id);

  setupDeleteDialog();
  setReturnUrl();
};

const setupDeleteDialog = () => {
  const deleteDialogStore = useDeleteDialogStore();

  deleteDialogStore.setTitle('Delete technology');
  deleteDialogStore.setMessage('Are you sure you want to delete this technology?');
};

const setReturnUrl = () => {
  const layoutStore = useLayoutStore();
  layoutStore.setReturnUrl('/repositories');
};

export default (id) => {
  onMounted(async () => {
    await fetchList();
    
    if (id) {
      setData(id);
    }
  });
};
