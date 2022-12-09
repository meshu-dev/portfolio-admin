import { useTypeStore } from '@/stores/TypeStore';

export const onAdd = async (type) => {
  const typeStore = useTypeStore();

  await typeStore.addType(
    { name: type.name }
  );
  
  await msgAndRedirect('Type has been added');
}

export const onEdit = async (id, type) => {
  const typeStore = useTypeStore();
  
  await typeStore.editType(
    id,
    { name: type.name }
  );
  await msgAndRedirect('Type has been edited');
}

export const onDelete = async (doDelete) => {
  if (doDelete === true) {
    const typeStore = useTypeStore();
    await typeStore.deleteType(id);
    
    await msgAndRedirect('Type has been deleted');
  }
}
