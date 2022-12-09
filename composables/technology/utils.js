import { useTechnologyStore } from '@/stores/TechnologyStore';

export const onAdd = async (technology) => {
  const technologyStore = useTechnologyStore();

  await technologyStore.addTechnology(
    { name: technology.name }
  );
  
  await msgAndRedirect('Technology has been added');
}

export const onEdit = async (id, technology) => {
  const technologyStore = useTechnologyStore();
  
  await technologyStore.editTechnology(
    id,
    { name: technology.name }
  );
  await msgAndRedirect('Technology has been edited');
}

export const onDelete = async (doDelete) => {
  if (doDelete === true) {
    const technologyStore = useTechnologyStore();
    await technologyStore.deleteTechnology(id);
    
    await msgAndRedirect('Technology has been deleted');
  }
}
