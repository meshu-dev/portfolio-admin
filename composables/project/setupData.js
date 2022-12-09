import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/ProjectStore';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useImageStore } from '@/stores/ImageStore';
import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';
import { onDelete } from '@/composables/project/utils';

const setBlankProject = (id) => {
  const projectStore = useProjectStore();

  if (id && projectStore.getProject == null) {
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

  setImage();
  setupDeleteDialog();
  setReturnUrl();
};

const setImage = () => {
  const projectStore = useProjectStore();

  if (projectStore.getProject) {
    const image = projectStore.getProject.image;
    
    const imageStore = useImageStore();
    imageStore.setImage(image);
    imageStore.setImageUrl(image.url);
  }
};

const setupDeleteDialog = () => {
  const deleteDialogStore = useDeleteDialogStore();

  deleteDialogStore.setTitle('Delete project');
  deleteDialogStore.setMessage('Are you sure you want to delete this project?');
  deleteDialogStore.setCallback(onDelete);
};

const setReturnUrl = () => {
  const layoutStore = useLayoutStore();
  layoutStore.setReturnUrl('/');
};

export default (id) => {
  setBlankProject(id);

  onMounted(async () => {
    await fetchList();
    
    if (id) {
      setData(id);
    }
  });
};
