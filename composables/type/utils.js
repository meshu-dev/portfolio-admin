import { useTypeStore } from '@/stores/TypeStore';

export const onAdd = async (name) => {
  const typeStore = useTypeStore();

  await typeStore.addType(
    { name: name }
  );
  
  await msgAndRedirect('Type has been added');
}

export const onEdit = async (id, name) => {
  const typeStore = useTypeStore();
  
  await typeStore.editType(
    id,
    { name: name }
  );
  await msgAndRedirect('Type has been edited');
}

export const onDelete = async () => {
  const typeStore = useTypeStore();
  await typeStore.deleteType(id);
  
  await msgAndRedirect('Type has been deleted');
}
