import { onMounted } from 'vue';
import { useRepositoryStore } from '@/stores/RepositoryStore';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';
import { onDelete } from '@/composables/repository/utils';

const setBlankRepository = (id) => {
  const repositoryStore = useRepositoryStore();

  if (id && repositoryStore.getRepository == null) {
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

  setupDeleteDialog();
  setReturnUrl();
};

const setupDeleteDialog = () => {
  const deleteDialogStore = useDeleteDialogStore();

  deleteDialogStore.setTitle('Delete repository');
  deleteDialogStore.setMessage('Are you sure you want to delete this repository?');
  deleteDialogStore.setCallback(onDelete);
};

const setReturnUrl = () => {
  const layoutStore = useLayoutStore();
  layoutStore.setReturnUrl('/repositories');
};

export default (id) => {
  setBlankRepository(id);

  onMounted(async () => {
    await fetchList();
    
    if (id) {
      setData(id);
    }
  });
};
