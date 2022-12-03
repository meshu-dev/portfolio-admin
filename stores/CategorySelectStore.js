import { defineStore } from 'pinia';
import { useCategoryStore } from '@/stores/CategoryStore';

const allOption = { text: 'All', value: 0 };

export const useCategorySelectStore = defineStore({
  id: 'category-select',
  state: () => ({
    allOption: allOption,
    selectedOption: allOption
  }),
  getters: {
    getAllOption(state) {
      return state.allOption;
    },
    getSelectedOption(state) {
      return state.selectedOption;
    },
    isAllOption(state) {
      return state.selectedOption.value == 0 ? true : false;
    },
    getCategoryOptions(state) {
      return (incAllOption) => {
        const categoryStore = useCategoryStore();
        const options = [];

        if (incAllOption) {
          options.push(allOption);
        }

        const categoryOptions = categoryStore.getCategories.map((category) => {
          return {
            text: category.name,
            value: category.id
          };
        });
  
        return options.concat(categoryOptions);
      };
    }
  },
  actions: {
    setSelectedOption(option) {
      this.selectedOption = option;
    }
  }
});
