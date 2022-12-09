import { useTechnologyStore } from '@/stores/TechnologyStore';

export const onAdd = async (name) => {
  const technologyStore = useTechnologyStore();

  await technologyStore.addTechnology(
    { name: name }
  );
  
  await msgAndRedirect('Technology has been added');
}

export const onEdit = async (id, name) => {
  const technologyStore = useTechnologyStore();
  
  await technologyStore.editTechnology(
    id,
    { name: name }
  );
  await msgAndRedirect('Technology has been edited');
}

export const onDelete = async () => {
  const technologyStore = useTechnologyStore();
  await technologyStore.deleteTechnology(id);
  
  await msgAndRedirect('Technology has been deleted');
}
