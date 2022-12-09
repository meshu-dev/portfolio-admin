import { onMounted } from 'vue';
import { usePrototypeStore } from '@/stores/PrototypeStore';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useImageStore } from '@/stores/ImageStore';
import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';

const fetchList = async () => {
  const prototypeStore = usePrototypeStore();

  if (prototypeStore.areFetched === false) {
    await prototypeStore.fetchPrototypes();
  }
};

const setData = (id) => {
  const prototypeStore = usePrototypeStore();
  prototypeStore.setSelectedPrototype(id);

  setImage();
  setupDeleteDialog();
  setReturnUrl();
};

const setImage = () => {
  const prototypeStore = usePrototypeStore();

  if (prototypeStore.getPrototype) {
    const image = prototypeStore.getPrototype.image;
        
    const imageStore = useImageStore();
    imageStore.setImage(image);
    imageStore.setImageUrl(image.url);
  }
};

const setupDeleteDialog = () => {
  const deleteDialogStore = useDeleteDialogStore();

  deleteDialogStore.setTitle('Delete prototype');
  deleteDialogStore.setMessage('Are you sure you want to delete this prototype?');
};

const setReturnUrl = () => {
  const layoutStore = useLayoutStore();
  layoutStore.setReturnUrl('/prototypes');
};

export default (id) => {
  onMounted(async () => {
    await fetchList();
    
    if (id) {
      setData(id);
    }
  });
};
