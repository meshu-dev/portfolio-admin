import { useProjectStore } from '@/stores/ProjectStore';

export const addProject = async (project) => {
  const projectStore = useProjectStore();

  await projectStore.addProject(
    { name: project.name }
  );
  
  await msgAndRedirect('Project has been added');
}

export const editProject = async (id, project) => {
  const projectStore = useProjectStore();
  
  await projectStore.editProject(
    id,
    { name: project.name }
  );
  await msgAndRedirect('Project has been edited');
}

export const deleteProject = async (doDelete) => {
  if (doDelete === true) {
    const projectStore = useProjectStore();
    await projectStore.deleteProject(projectStore.getProject.id);
    
    await msgAndRedirect('Project has been deleted');
  }
}
