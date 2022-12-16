import { defineStore } from 'pinia';
import { useTypeStore } from '@/stores/TypeStore';

export const useTypeSelectStore = defineStore({
  id: 'type-select',
  state: () => ({ }),
  getters: {
    getOptions() {
      const typeStore = useTypeStore();

      const options = typeStore.getTypes.map((type) => {
        return {
          title: type.name,
          value: type.id
        };
      });

      return options;
    }
  },
  actions: { }
});
