import { useLayoutStore } from '@/stores/LayoutStore';

export default (type, text) => {
  const layoutStore = useLayoutStore();

  layoutStore.setStatusMsg({
    type: type,
    text: text
  });
};
