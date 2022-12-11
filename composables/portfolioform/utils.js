import { useTypeSelectStore } from '@/stores/TypeSelectStore';
import { useRepositorySelectStore } from '@/stores/RepositorySelectStore';
import { useTechnologySelectStore } from '@/stores/TechnologySelectStore';
import { useImageStore } from '@/stores/ImageStore';
import { getRepositoryNames } from '@/composables/repository/utils';
import { getTechnologyNames } from '@/composables/technology/utils';

export const getRepositoryValues = (item) => {
  const itemData = toRaw(item);

  if (itemData && itemData.repositories) {
    return getRepositoryNames(itemData.repositories);
  }
  return [];
};

export const getTechnologyValues = (item) => {
  const itemData = toRaw(item);

  if (itemData && itemData.technologies) {
    return getTechnologyNames(itemData.technologies);
  }
  return [];
};

export const getFormParams = (item) => {
  const currentItem = toRaw(item.value);
  const typeSelectStore = useTypeSelectStore();
  const repositorySelectStore = useRepositorySelectStore();
  const technologySelectStore = useTechnologySelectStore();
  const imageStore = useImageStore();

  const params = {
    name: currentItem.name,
    description: currentItem.description,
    type: typeSelectStore.getSelectedType,
    repositories: repositorySelectStore.getSelectedRepositories,
    technologies: technologySelectStore.getSelectedTechnologies,
    image: imageStore.getImage
  };

  return params;
};
