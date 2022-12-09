import { onMounted } from 'vue';
import { useTypeStore } from '@/stores/TypeStore';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';

const fetchList = async () => {
  const typeStore = useTypeStore();

  if (typeStore.areFetched === false) {
    await typeStore.fetchTypes();
  }
};

const setData = (id) => {
  const typeStore = useTypeStore();
  typeStore.setSelectedType(id);

  setupDeleteDialog();
  setReturnUrl();
};

const setupDeleteDialog = () => {
  const deleteDialogStore = useDeleteDialogStore();

  deleteDialogStore.setTitle('Delete type');
  deleteDialogStore.setMessage('Are you sure you want to delete this type?');
};

const setReturnUrl = () => {
  const layoutStore = useLayoutStore();
  layoutStore.setReturnUrl('/types');
};

export default (id) => {
  onMounted(async () => {
    await fetchList();
    
    if (id) {
      setData(id);
    }
  });
};
