import { useRepositoryStore } from '@/stores/RepositoryStore';

export const addRepository = async (repository) => {
  const repositoryStore = useRepositoryStore();

  await repositoryStore.addRepository(
    {
      name: repository.name,
      url: repository.url
    }
  );
  
  await msgAndRedirect('Repository has been added');
}

export const editRepository = async (id, repository) => {
  const repositoryStore = useRepositoryStore();
  
  await repositoryStore.editRepository(
    id,
    {
      name: repository.name,
      url: repository.url
    }
  );
  await msgAndRedirect('Repository has been edited');
}

export const deleteRepository = async (doDelete) => {
  if (doDelete === true) {
    const repositoryStore = useRepositoryStore();
    await repositoryStore.deleteRepository(repositoryStore.getRepository.id);
    
    await msgAndRedirect('Repository has been deleted');
  }
}
