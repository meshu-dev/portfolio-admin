import { useLayoutStore } from '@/stores/LayoutStore';

export const callApi = async (ftn) => {
  const layoutStore = useLayoutStore();
  let result = null;
  
  try {
    result = await ftn();
  } catch (error) {
    if (error.cause == 401) {
      await navigateTo(`/login`);
    }

    layoutStore.setStatusMsg({
      type: 'error',
      text: error.message
    });
  }
  console.log('callApi - RES', result);

  return result;
}
