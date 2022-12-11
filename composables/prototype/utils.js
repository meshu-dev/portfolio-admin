import { usePrototypeStore } from '@/stores/PrototypeStore';
import { getRepositoryIds } from '@/composables/repository/utils';
import { getTechnologyIds } from '@/composables/technology/utils';

const getParams = (prototype) => {
  return {
    name: prototype.name,
    description: prototype.description,
    typeId: prototype.type.id,
    repositoryIds: getRepositoryIds(prototype.repositories),
    technologyIds: getTechnologyIds(prototype.technologies),
    imageId: prototype.image.id
  };
};

export const addPrototype = async (prototype) => {
  const prototypeStore = usePrototypeStore();
  const params = getParams(prototype);

  await prototypeStore.addPrototype(params);
  
  await msgAndRedirect('Prototype has been added');
};

export const editPrototype = async (prototype) => {
  const prototypeStore = usePrototypeStore();
  const params = getParams(prototype);
  
  await prototypeStore.editPrototype(
    prototype.id,
    params
  );

  await msgAndRedirect('Prototype has been edited');
};

export const deletePrototype = async (doDelete) => {
  if (doDelete === true) {
    const prototypeStore = usePrototypeStore();
    await prototypeStore.deletePrototype(prototypeStore.getPrototype.id);
    
    await msgAndRedirect('Prototype has been deleted');
  }
};

export const setParamsToPrototype = (params) => {
  const prototypeStore = usePrototypeStore();
  const prototype = prototypeStore.getPrototype;

  prototype.name = params.name;
  prototype.type = params.type;
  prototype.description = params.description;
  prototype.repositories = params.repositories;
  prototype.technologies = params.technologies;
  prototype.images = params.image;

  prototypeStore.setPrototype(prototype);
};

export const prototypeFormSubmit = async () => {
  const prototypeStore = usePrototypeStore();
  const prototype = prototypeStore.getPrototype;

  if (prototype.id > 0) {
    await editPrototype(prototype);
  } else {
    await addPrototype(prototype);
  }
};
