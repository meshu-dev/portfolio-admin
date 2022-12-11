import { useTechnologyStore } from '@/stores/TechnologyStore';

export const getTechnologies = async () => {
  const technologyStore = useTechnologyStore();

  if (technologyStore.areFetched === false) {
    await technologyStore.fetchTechnologies();
  }
};

export const getTechnologyNames = (technologies) => {
  if (technologies) {
    return technologies.map(technology => technology.name);
  }
  return [];
};

/*
export const getTechnologyOptions = () => {
  const technologyStore = useTechnologyStore();
  const technologies = technologyStore.getTechnologies;

  const options = technologies.map(technology => {
    return {
      title: technology.name,
      value: technology.id
    }
  });

  return options;
};

export const setSelectedTechnologyOptions = (technologies) => {
  const options = [];

  for (const technology of technologies) {
    options.push({ title: technology.name, value: technology.id });
  }
  return options;
}; */

export const addTechnology = async (technology) => {
  const technologyStore = useTechnologyStore();

  await technologyStore.addTechnology(
    { name: technology.name }
  );
  
  await msgAndRedirect('Technology has been added');
};

export const editTechnology = async (technology) => {
  const technologyStore = useTechnologyStore();
  
  await technologyStore.editTechnology(
    technology.id,
    { name: technology.name }
  );
  await msgAndRedirect('Technology has been edited');
};

export const deleteTechnology = async (doDelete) => {
  if (doDelete === true) {
    const technologyStore = useTechnologyStore();
    await technologyStore.deleteTechnology(technologyStore.getTechnology.id);
    
    await msgAndRedirect('Technology has been deleted');
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
