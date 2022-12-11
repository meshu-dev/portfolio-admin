import { useTypeStore } from '@/stores/TypeStore';

export const getTypes = async () => {
  const typeStore = useTypeStore();

  if (typeStore.areFetched === false) {
    await typeStore.fetchTypes();
  }
};

export const addType = async (type) => {
  const typeStore = useTypeStore();

  await typeStore.addType(
    { name: type.name }
  );
  
  await msgAndRedirect('Type has been added');
}

export const editType = async (type) => {
  const typeStore = useTypeStore();
  
  await typeStore.editType(
    type.id,
    { name: type.name }
  );
  await msgAndRedirect('Type has been edited');
}

export const deleteType = async (doDelete) => {
  if (doDelete === true) {
    const typeStore = useTypeStore();
    await typeStore.deleteType(typeStore.getType.id);
    
    await msgAndRedirect('Type has been deleted');
  }
}

export const typeFormSubmit = async () => {
  const typeStore = useTypeStore();
  const type = typeStore.getType;

  if (type.id > 0) {
    await editType(type);
  } else {
    await addType(type);
  }
};
