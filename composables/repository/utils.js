import { useRepositoryStore } from '@/stores/RepositoryStore';

export const getRepositories = async () => {
  const repositoryStore = useRepositoryStore();

  if (repositoryStore.areFetched === false) {
    await repositoryStore.fetchRepositories();
  }
};

export const getRepositoryNames = (repositories) => {
  if (repositories) {
    return repositories.map(repository => repository.name);
  }
  return [];
};

/*
export const getRepositoryOptions = () => {
  const repositoryStore = useRepositoryStore();
  const repositories = repositoryStore.getRepositories;

  const options = repositories.map(repository => {
    return {
      title: repository.name,
      value: repository.id
    }
  });

  return options;
};

export const setSelectedRepositoryOptions = (repositories) => {
  const options = [];

  for (const repository of repositories) {
    options.push({ title: repository.name, value: repository.id });
  }
  return options;
}; */

export const addRepository = async (repository) => {
  const repositoryStore = useRepositoryStore();

  await repositoryStore.addRepository(
    {
      name: repository.name,
      url: repository.url
    }
  );
  
  await msgAndRedirect('Repository has been added');
};

export const editRepository = async (repository) => {
  const repositoryStore = useRepositoryStore();
  
  await repositoryStore.editRepository(
    repository.id,
    {
      name: repository.name,
      url: repository.url
    }
  );
  await msgAndRedirect('Repository has been edited');
};

export const deleteRepository = async (doDelete) => {
  if (doDelete === true) {
    const repositoryStore = useRepositoryStore();
    await repositoryStore.deleteRepository(repositoryStore.getRepository.id);
    
    await msgAndRedirect('Repository has been deleted');
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
