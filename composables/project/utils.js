import { useProjectStore } from '@/stores/ProjectStore';

export const onAdd = async (project) => {
  const projectStore = useProjectStore();

  await projectStore.addProject(
    { name: project.name }
  );
  
  await msgAndRedirect('Project has been added');
}

export const onEdit = async (id, project) => {
  const projectStore = useProjectStore();
  
  await projectStore.editProject(
    id,
    { name: project.name }
  );
  await msgAndRedirect('Project has been edited');
}

export const onDelete = async (doDelete) => {
  if (doDelete === true) {
    const projectStore = useProjectStore();
    await projectStore.deleteProject(id);
    
    await msgAndRedirect('Project has been deleted');
  }
}
