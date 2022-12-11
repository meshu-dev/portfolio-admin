import { useProjectStore } from '@/stores/ProjectStore';
import { getRepositoryIds } from '@/composables/repository/utils';
import { getTechnologyIds } from '@/composables/technology/utils';

const getParams = (project) => {
  return {
    name: project.name,
    description: project.description,
    typeId: project.type.id,
    repositoryIds: getRepositoryIds(project.repositories),
    technologyIds: getTechnologyIds(project.technologies),
    image: project.image.id
  };
};

export const addProject = async (project) => {
  const projectStore = useProjectStore();
  const params = getParams(project);

  await projectStore.addProject(params);
  
  await msgAndRedirect('Project has been added');
};

export const editProject = async (project) => {
  const projectStore = useProjectStore();
  const params = getParams(project);
  
  await projectStore.editProject(
    project.id,
    params
  );

  await msgAndRedirect('Project has been edited');
};

export const deleteProject = async (doDelete) => {
  if (doDelete === true) {
    const projectStore = useProjectStore();
    await projectStore.deleteProject(projectStore.getProject.id);
    
    await msgAndRedirect('Project has been deleted');
  }
};

export const setParamsToPrototype = (params) => {
  const projectStore = useProjectStore();
  const project = projectStore.getProject;

  project.name = params.name;
  project.type = params.type;
  project.description = params.description;
  project.repositories = params.repositories;
  project.technologies = params.technologies;
  project.images = params.image;

  projectStore.setProject(project);
};

export const projectFormSubmit = async () => {
  const projectStore = useProjectStore();
  const project = projectStore.getProject;

  if (project.id > 0) {
    await editProject(project);
  } else {
    await addProject(project);
  }
};
