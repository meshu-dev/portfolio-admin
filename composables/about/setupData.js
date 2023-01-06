import { useAboutStore } from '@/stores/AboutStore';

export default () => {
  const aboutStore = useAboutStore();

  if (aboutStore.isFetched === false) {
    onMounted(async () => {
      await aboutStore.fetchAbout();
    });
  }
};
