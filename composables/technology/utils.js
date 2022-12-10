import { useTechnologyStore } from '@/stores/TechnologyStore';

export const getTechnologies = async () => {
  const technologyStore = useTechnologyStore();

  if (technologyStore.areFetched === false) {
    await technologyStore.fetchTechnologies();
  }
};

export const addTechnology = async (technology) => {
  const technologyStore = useTechnologyStore();

  await technologyStore.addTechnology(
    { name: technology.name }
  );
  
  await msgAndRedirect('Technology has been added');
}

export const editTechnology = async (id, technology) => {
  const technologyStore = useTechnologyStore();
  
  await technologyStore.editTechnology(
    id,
    { name: technology.name }
  );
  await msgAndRedirect('Technology has been edited');
}

export const deleteTechnology = async (doDelete) => {
  if (doDelete === true) {
    const technologyStore = useTechnologyStore();
    await technologyStore.deleteTechnology(technologyStore.getTechnology.id);
    
    await msgAndRedirect('Technology has been deleted');
  }
}
