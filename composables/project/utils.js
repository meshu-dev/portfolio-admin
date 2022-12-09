import { useProjectStore } from '@/stores/ProjectStore';

export const onAdd = async (name) => {
  const projectStore = useProjectStore();

  await projectStore.addProject(
    { name: name }
  );
  
  await msgAndRedirect('Project has been added');
}

export const onEdit = async (id, name) => {
  const projectStore = useProjectStore();
  
  await projectStore.editProject(
    id,
    { name: name }
  );
  await msgAndRedirect('Project has been edited');
}

export const onDelete = async () => {
  const projectStore = useProjectStore();
  await projectStore.deleteProject(id);
  
  await msgAndRedirect('Project has been deleted');
}
