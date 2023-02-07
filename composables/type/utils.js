import { useTypeStore } from '@/stores/TypeStore';

export const getTypes = async () => {
  const typeStore = useTypeStore();

  if (typeStore.areFetched === false) {
    await typeStore.fetchTypes();
  }
};

export const getTypeById = (id) => {
  const typeStore = useTypeStore();
  return typeStore.getTypeById(id);
};

export const addType = async (type) => {
  const typeStore = useTypeStore();

  const result = await typeStore.addType(
    { name: type.name }
  );
  
  if (result) {
    await msgAndRedirect('Type has been added');
  }
}

export const editType = async (type) => {
  const typeStore = useTypeStore();
  
  const result = await typeStore.editType(
    type.id,
    { name: type.name }
  );

  if (result) {
    await msgAndRedirect('Type has been edited');
  }
}

export const deleteType = async (doDelete) => {
  if (doDelete === true) {
    const typeStore = useTypeStore();
    
    const result = await typeStore.deleteType(typeStore.getType.id);
    
    if (result) {
      await typeStore.fetchTypes();
      await msgAndRedirect('Type has been deleted');
    }
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
