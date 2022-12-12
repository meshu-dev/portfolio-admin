import { onMounted } from 'vue';
import { usePrototypeStore } from '@/stores/PrototypeStore';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useImageStore } from '@/stores/ImageStore';
import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';
import { deletePrototype } from '@/composables/prototype/utils';

const setBlankPrototype = (id) => {
  const prototypeStore = usePrototypeStore();

  if (id && id === 'new') {
    prototypeStore.setBlankPrototype();
  }
};

const fetchList = async () => {
  const prototypeStore = usePrototypeStore();

  if (prototypeStore.areFetched === false) {
    await prototypeStore.fetchPrototypes();
  }
};

const setData = (id) => {
  const prototypeStore = usePrototypeStore();
  prototypeStore.setSelectedPrototype(id);

  if (id !== 'new') {
    setImage();
  }
  setupDeleteDialog();
  setReturnUrl();
};

const setImage = () => {
  const prototypeStore = usePrototypeStore();

  if (prototypeStore.getPrototype) {
    const images = prototypeStore.getPrototype.images;
    
    if (images.length > 0) {
      const image = images[0];
    
      const imageStore = useImageStore();
      imageStore.setImage(images);
      imageStore.setImageUrl(image.url);
    }
  }
};

const setupDeleteDialog = () => {
  const deleteDialogStore = useDeleteDialogStore();

  deleteDialogStore.setTitle('Delete prototype');
  deleteDialogStore.setMessage('Are you sure you want to delete this prototype?');
  deleteDialogStore.setCallback(deletePrototype);
};

const setReturnUrl = () => {
  const layoutStore = useLayoutStore();
  layoutStore.setReturnUrl('/prototypes');
};

export default (id) => {
  setBlankPrototype(id);
  
  onMounted(async () => {
    await fetchList();
    
    if (id) {
      setData(id);
    }
  });
};
