import { usePrototypeStore } from '@/stores/PrototypeStore';
import { getTypeById } from '@/composables/type/utils';
import { getRepositoryIds, getRepositoriesByNames } from '@/composables/repository/utils';
import { getTechnologyIds, getTechnologiesByNames } from '@/composables/technology/utils';
import { getImage } from '@/composables/image/utils';

const getParams = (prototype) => {
  const params = {
    name: prototype.name,
    description: prototype.description,
    typeId: prototype.type.id,
    repositoryIds: getRepositoryIds(prototype.repositories),
    technologyIds: getTechnologyIds(prototype.technologies)
  };

  if (prototype.images.length > 0) {
    params['imageIds'] = [prototype.images.id];
  }

  return params;
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

export const prototypeFormSubmit = async () => {
  const prototypeStore = usePrototypeStore();
  const prototype = prototypeStore.getPrototype;

  if (prototype.id > 0) {
    await editPrototype(prototype);
  } else {
    await addPrototype(prototype);
  }
};

export const onTypeChange = (typeId) => {
  const prototypeStore = usePrototypeStore();
  const prototype = prototypeStore.getPrototype;
    
  const type = getTypeById(typeId);
  prototype.type = type;

  prototypeStore.setPrototype(prototype);
};

export const onRepositoryChange = (values) => {
  const prototypeStore = usePrototypeStore();
  const prototype = prototypeStore.getPrototype;

  prototype.repositories = getRepositoriesByNames(values);

  prototypeStore.setPrototype(prototype);
};

export const onTechnologyChange = (values) => {
  const prototypeStore = usePrototypeStore();
  const prototype = prototypeStore.getPrototype;

  prototype.technologies = getTechnologiesByNames(values);

  prototypeStore.setPrototype(prototype);
};

export const onImageUpload = () => {
  const prototypeStore = usePrototypeStore();
  const prototype = prototypeStore.getPrototype;

  prototype.images = [getImage()];

  prototypeStore.setPrototype(prototype);
};

export const onImageRemove = () => {
  const prototypeStore = usePrototypeStore();
  const prototype = prototypeStore.getPrototype;

  prototype.images = [];

  prototypeStore.setPrototype(prototype);
};
