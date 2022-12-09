import { useRepositoryStore } from '@/stores/RepositoryStore';

export const onAdd = async (repository) => {
  const repositoryStore = useRepositoryStore();

  await repositoryStore.addRepository(
    {
      name: repository.name,
      url: repository.url
    }
  );
  
  await msgAndRedirect('Repository has been added');
}

export const onEdit = async (id, repository) => {
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

export const onDelete = async (doDelete) => {
  if (doDelete === true) {
    const repositoryStore = useRepositoryStore();
    await repositoryStore.deleteRepository(id);
    
    await msgAndRedirect('Repository has been deleted');
  }
}
