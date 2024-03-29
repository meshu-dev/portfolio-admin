import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/ProjectStore';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useImageStore } from '@/stores/ImageStore';
import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';
import { deleteProject } from '@/composables/project/utils';

const setBlankProject = (id) => {
  const projectStore = useProjectStore();

  if (id && id === 'new') {
    projectStore.setBlankProject();
  }
};

const fetchList = async () => {
  const projectStore = useProjectStore();

  if (projectStore.areFetched === false) {
    await projectStore.fetchProjects();
  }
};

const setData = (id) => {
  const projectStore = useProjectStore();
  projectStore.setSelectedProject(id);

  setImage(id);
};

const setImage = (id) => {
  const projectStore = useProjectStore();
  const imageStore = useImageStore();

  if (id === 'new') {
    imageStore.setImage(null);
    imageStore.setImageUrl(null);
  } else if (projectStore.getProject) {
    const images = projectStore.getProject.images;
    
    if (images.length > 0) {
      const image = images[0];
      
      imageStore.setImage(image);
      imageStore.setImageUrl(image.url);
    }
  }
};

const setupDeleteDialog = () => {
  const deleteDialogStore = useDeleteDialogStore();

  deleteDialogStore.setTitle('Delete project');
  deleteDialogStore.setMessage('Are you sure you want to delete this project?');
  deleteDialogStore.setCallback(deleteProject);
};

const setReturnUrl = () => {
  const layoutStore = useLayoutStore();
  layoutStore.setReturnUrl('/');
};

export default (id) => {
  setBlankProject(id);

  onMounted(async () => {
    await fetchList();

    setupDeleteDialog();
    setReturnUrl();
    
    if (id) {
      setData(id);
    }
  });
};
