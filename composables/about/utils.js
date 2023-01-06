import { useAboutStore } from '@/stores/AboutStore';

export const editAbout = async (about) => {
  const aboutStore = useAboutStore();
  
  await aboutStore.editAbout(
    about.id,
    { text: about.text }
  );
  setStatusMsg('success', 'About has been edited');
}

export const aboutFormSubmit = async () => {
  const aboutStore = useAboutStore();
  const about = aboutStore.getAbout;

  await editAbout(about);
};
