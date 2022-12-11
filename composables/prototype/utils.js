import { usePrototypeStore } from '@/stores/PrototypeStore';

export const addPrototype = async (prototype) => {
  const prototypeStore = usePrototypeStore();

  await prototypeStore.addPrototype(
    { name: prototype.name }
  );
  
  await msgAndRedirect('Prototype has been added');
};

export const editPrototype = async (prototype) => {
  const prototypeStore = usePrototypeStore();
  
  await prototypeStore.editPrototype(
    prototype.id,
    { name: prototype.name }
  );
  await msgAndRedirect('Prototype has been edited');
};

export const deletePrototype = async (doDelete) => {
  if (doDelete === true) {
    const prototypeStore = usePrototypeStore();
    await prototypeStore.deletePrototype(prototypeStore.getPrototype.id);
    
    await msgAndRedirect('Prototype has been deleted');
  }
};

export const prototypeFormSubmit = async () => {
  const prototypeStore = usePrototypeStore();
  const prototype = prototypeStore.getPrototype;

  if (prototype.id > 0) {
    await editPrototype(prototype);
  } else {
    await addPrototype(prototype);
  }
};
