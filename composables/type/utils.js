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

export const editType = async (id, type) => {
  const typeStore = useTypeStore();
  
  await typeStore.editType(
    id,
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
