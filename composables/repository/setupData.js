import { onMounted } from 'vue';
import { useRepositoryStore } from '@/stores/RepositoryStore';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';
import { deleteRepository } from '@/composables/repository/utils';

const setBlankRepository = (id) => {
  const repositoryStore = useRepositoryStore();

  if (id && id === 'new') {
    repositoryStore.setBlankRepository();
  }
};

const fetchList = async () => {
  const repositoryStore = useRepositoryStore();

  if (repositoryStore.areFetched === false) {
    await repositoryStore.fetchRepositories();
  }
};

const setData = (id) => {
  const repositoryStore = useRepositoryStore();
  repositoryStore.setSelectedRepository(id);
};

const setupDeleteDialog = () => {
  const deleteDialogStore = useDeleteDialogStore();

  deleteDialogStore.setTitle('Delete repository');
  deleteDialogStore.setMessage('Are you sure you want to delete this repository?');
  deleteDialogStore.setCallback(deleteRepository);
};

const setReturnUrl = () => {
  const layoutStore = useLayoutStore();
  layoutStore.setReturnUrl('/repositories');
};

export default (id) => {
  setBlankRepository(id);

  onMounted(async () => {
    await fetchList();
    
    setupDeleteDialog();
    setReturnUrl();

    if (id) {
      setData(id);
    }
  });
};
