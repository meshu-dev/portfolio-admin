import { onMounted } from 'vue';
import { useTypeStore } from '@/stores/TypeStore';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';
import { deleteType } from '@/composables/type/utils';

const setBlankType = (id) => {
  const typeStore = useTypeStore();

  if (id && typeStore.getType == null) {
    typeStore.setBlankType();
  }
};

const fetchList = async () => {
  const typeStore = useTypeStore();

  if (typeStore.areFetched === false) {
    await typeStore.fetchTypes();
  }
};

const setData = (id) => {
  const typeStore = useTypeStore();
  typeStore.setSelectedType(id);
};

const setupDeleteDialog = () => {
  const deleteDialogStore = useDeleteDialogStore();

  deleteDialogStore.setTitle('Delete type');
  deleteDialogStore.setMessage('Are you sure you want to delete this type?');
  deleteDialogStore.setCallback(deleteType);
};

const setReturnUrl = () => {
  const layoutStore = useLayoutStore();
  layoutStore.setReturnUrl('/types');
};

export default (id) => {
  setBlankType(id);
  
  onMounted(async () => {
    await fetchList();

    setupDeleteDialog();
    setReturnUrl();
    
    if (id) {
      setData(id);
    }
  });
};
