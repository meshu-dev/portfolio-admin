import { useRepositoryStore } from '@/stores/RepositoryStore';

export const getRepositories = async () => {
  const repositoryStore = useRepositoryStore();

  if (repositoryStore.areFetched === false) {
    await repositoryStore.fetchRepositories();
  }
};

export const getRepositoryIds = (repositories) => {
  if (repositories) {
    return repositories.map(repository => repository.id);
  }
  return [];
};

export const getRepositoryNames = (repositories) => {
  if (repositories) {
    return repositories.map(repository => repository.name);
  }
  return [];
};

export const addRepository = async (repository) => {
  const repositoryStore = useRepositoryStore();

  const result = await repositoryStore.addRepository(
    {
      name: repository.name,
      url: repository.url
    }
  );
  
  if (result) {
    await msgAndRedirect('Repository has been added');
  }
};

export const editRepository = async (repository) => {
  const repositoryStore = useRepositoryStore();
  
  const result = await repositoryStore.editRepository(
    repository.id,
    {
      name: repository.name,
      url: repository.url
    }
  );

  if (result) {
    await msgAndRedirect('Repository has been edited');
  }
};

export const deleteRepository = async (doDelete) => {
  if (doDelete === true) {
    const repositoryStore = useRepositoryStore();
    
    const result = await repositoryStore.deleteRepository(repositoryStore.getRepository.id);
    
    if (result) {
      await repositoryStore.fetchRepositories();
      await msgAndRedirect('Repository has been deleted');
    }
  }
};

export const repositoryFormSubmit = async () => {
  const repositoryStore = useRepositoryStore();
  const repository = repositoryStore.getRepository;

  if (repository.id > 0) {
    await editRepository(repository);
  } else {
    await addRepository(repository);
  }
};

export const getRepositoriesByNames = (repositoryNames) => {
  const repositoryStore = useRepositoryStore();

  return repositoryStore.getOrderedRepositories.filter(
    repository => repositoryNames.includes(repository.name)
  );
};
