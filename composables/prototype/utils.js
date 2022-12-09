import { usePrototypeStore } from '@/stores/PrototypeStore';

export const onAdd = async (name) => {
  const prototypeStore = usePrototypeStore();

  await prototypeStore.addPrototype(
    { name: name }
  );
  
  await msgAndRedirect('Prototype has been added');
}

export const onEdit = async (id, name) => {
  const prototypeStore = usePrototypeStore();
  
  await prototypeStore.editPrototype(
    id,
    { name: name }
  );
  await msgAndRedirect('Prototype has been edited');
}

export const onDelete = async () => {
  const prototypeStore = usePrototypeStore();
  await prototypeStore.deletePrototype(id);
  
  await msgAndRedirect('Prototype has been deleted');
}
