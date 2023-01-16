import { useLayoutStore } from '@/stores/LayoutStore';
import { useAboutStore } from '@/stores/AboutStore';

export const editAbout = async (about) => {
  const layoutStore = useLayoutStore();
  const aboutStore = useAboutStore();
  
  await aboutStore.editAbout(
    about.id,
    { text: about.text }
  );

  layoutStore.setStatusMsg({
    type: 'success',
    text: ['About has been edited']
  });
}

export const aboutFormSubmit = async () => {
  const aboutStore = useAboutStore();
  const about = aboutStore.getAbout;

  await editAbout(about);
};
