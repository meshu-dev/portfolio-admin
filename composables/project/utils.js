import { useProjectStore } from '@/stores/ProjectStore';
import { getRepositoryIds, getRepositoriesByNames } from '@/composables/repository/utils';
import { getTechnologyIds, getTechnologiesByNames } from '@/composables/technology/utils';
import { getTypeById } from '@/composables/type/utils';
import { getImage } from '@/composables/image/utils';

const getParams = (project) => {
  const params = {
    name: project.name,
    description: project.description,
    typeId: project.type.id,
    repositoryIds: getRepositoryIds(project.repositories),
    technologyIds: getTechnologyIds(project.technologies)
  };

  if (project.images.length > 0) {
    params['imageIds'] = [project.images.id];
  }

  return params;
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

export const projectFormSubmit = async () => {
  const projectStore = useProjectStore();
  const project = projectStore.getProject;

  if (project.id > 0) {
    await editProject(project);
  } else {
    await addProject(project);
  }
};

export const onTypeChange = (typeId) => {
  const projectStore = useProjectStore();
  const project = projectStore.getProject;
    
  const type = getTypeById(typeId);
  project.type = type;

  projectStore.setProject(project);
};

export const onRepositoryChange = (values) => {
  const projectStore = useProjectStore();
  const project = projectStore.getProject;

  project.repositories = getRepositoriesByNames(values);

  projectStore.setProject(project);
};

export const onTechnologyChange = (values) => {
  const projectStore = useProjectStore();
  const project = projectStore.getProject;

  project.technologies = getTechnologiesByNames(values);

  projectStore.setProject(project);
};


export const onImageUpload = () => {
  const projectStore = useProjectStore();
  const project = projectStore.getProject;

  project.images = [getImage()];

  projectStore.setPrototype(project);
};

export const onImageRemove = () => {
  const projectStore = useProjectStore();
  const project = projectStore.getProject;

  project.images = [];

  projectStore.setProject(project);
};
