import { useImageStore } from '@/stores/ImageStore';

export default (image) => {
  const imageStore = useImageStore();

  imageStore.setImageUrl(image.url);
  imageStore.setImage(image);
};
