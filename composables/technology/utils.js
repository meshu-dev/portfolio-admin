import { useTechnologyStore } from '@/stores/TechnologyStore';

export const getTechnologies = async () => {
  const technologyStore = useTechnologyStore();

  if (technologyStore.areFetched === false) {
    await technologyStore.fetchTechnologies();
  }
};

export const getTechnologyIds = (technologies) => {
  if (technologies) {
    return technologies.map(technology => technology.id);
  }
  return [];
};

export const getTechnologyNames = (technologies) => {
  if (technologies) {
    return technologies.map(technology => technology.name);
  }
  return [];
};

export const addTechnology = async (technology) => {
  const technologyStore = useTechnologyStore();

  const result = await technologyStore.addTechnology(
    { name: technology.name }
  );
  
  if (result) {
    await msgAndRedirect('Technology has been added');
  }
};

export const editTechnology = async (technology) => {
  const technologyStore = useTechnologyStore();
  
  const result = await technologyStore.editTechnology(
    technology.id,
    { name: technology.name }
  );

  if (result) {
    await msgAndRedirect('Technology has been edited');
  }
};

export const deleteTechnology = async (doDelete) => {
  if (doDelete === true) {
    const technologyStore = useTechnologyStore();
    
    const result = await technologyStore.deleteTechnology(technologyStore.getTechnology.id);
    
    if (result) {
      await msgAndRedirect('Technology has been deleted');
    }
  }
};

export const technologyFormSubmit = async () => {
  const technologyStore = useTechnologyStore();
  const technology = technologyStore.getTechnology;

  if (technology.id > 0) {
    await editTechnology(technology);
  } else {
    await addTechnology(technology);
  }
};

export const getTechnologiesByNames = (technologyNames) => {
  const technologyStore = useTechnologyStore();

  return technologyStore.getOrderedTechnologies.filter(
    technology => technologyNames.includes(technology.name)
  );
};
