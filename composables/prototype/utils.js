import { usePrototypeStore } from '@/stores/PrototypeStore';

export const onAdd = async (prototype) => {
  const prototypeStore = usePrototypeStore();

  await prototypeStore.addPrototype(
    { name: prototype.name }
  );
  
  await msgAndRedirect('Prototype has been added');
}

export const onEdit = async (id, prototype) => {
  const prototypeStore = usePrototypeStore();
  
  await prototypeStore.editPrototype(
    id,
    { name: prototype.name }
  );
  await msgAndRedirect('Prototype has been edited');
}

export const onDelete = async (doDelete) => {
  if (doDelete === true) {
    const prototypeStore = usePrototypeStore();
    await prototypeStore.deletePrototype(id);
    
    await msgAndRedirect('Prototype has been deleted');
  }
}
