import { defineStore } from 'pinia';
import { useTypeStore } from '@/stores/TypeStore';

export const useTypeSelectStore = defineStore({
  id: 'type-select',
  state: () => ({
    selectedValue: 0
  }),
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
    },
    getSelectedOption(state) {
      const typeStore = useTypeStore();
      const type = typeStore.getTypeById(state.selectedValue);

      if (type) {
        return {
          title: type.name,
          value: type.id
        };
      }
      return null;
    },
    getSelectedValue(state) {
      return state.selectedValue;
    }
  },
  actions: {
    setSelectedValue(value) {
      this.selectedValue = value;
    }
  }
});
