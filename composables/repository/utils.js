import { useRepositoryStore } from '@/stores/RepositoryStore';

export const onAdd = async (name) => {
  const repositoryStore = useRepositoryStore();

  await repositoryStore.addRepository(
    { name: name }
  );
  
  await msgAndRedirect('Repository has been added');
}

export const onEdit = async (id, name) => {
  const repositoryStore = useRepositoryStore();
  
  await repositoryStore.editRepository(
    id,
    { name: name }
  );
  await msgAndRedirect('Repository has been edited');
}

export const onDelete = async () => {
  const repositoryStore = useRepositoryStore();
  await repositoryStore.deleteRepository(id);
  
  await msgAndRedirect('Repository has been deleted');
}
