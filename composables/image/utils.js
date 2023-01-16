import { useImageStore } from '@/stores/ImageStore';

export const uploadImage = async (fileInput) => {
  const files = toRaw(fileInput.value);
    
  console.log('Files', files[0], files);

  if (files[0]) {
    const imageStore = useImageStore();

    const result = await imageStore.addImage(
      { image: files[0] }
    );

    if (result) {
      return true;
    }
  }
  return false;
};

export const getImage = () => {
  const imageStore = useImageStore();
  return imageStore.image;
};

export const removeImage = () => {
  const imageStore = useImageStore();

  imageStore.setImage(null);
  imageStore.setImageUrl(null);
};
