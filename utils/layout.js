import { useLayoutStore } from '@/stores/LayoutStore';

export const setStatusMsg = (type, text) => {
  const layoutStore = useLayoutStore();

  layoutStore.setStatusMsg({
    type: type,
    text: text
  });
};

export const msgAndRedirect = async (msg) => {
  const layoutStore = useLayoutStore();

  setStatusMsg('success', msg);
  
  await navigateTo(layoutStore.getReturnUrl);
  layoutStore.clearReturnUrl();
};
