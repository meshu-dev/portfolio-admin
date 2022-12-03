import { toRaw } from 'vue';
import { useCategoryStore } from '@/stores/CategoryStore';
import { useItemStore } from '@/stores/ItemStore';

const categoryStore = useCategoryStore();
const itemStore = useItemStore();

export const getEmptyItem = () => {
  return {
    name: '',
    category: {
      id: 0,
      name: '',
      option: null
    },
    imageUrl: ''
  }
}

export const fetchData = async () => {
  if (categoryStore.getTotal == 0) {
    await categoryStore.fetchCategories();
  }

  if (itemStore.getTotal == 0) {
    await itemStore.fetchItems();
  }
}

export const updateItemRef = (item) => {
  const selectedItem = toRaw(itemStore.getItem);

  item.value.name = selectedItem.name;
  
  item.value.category.id = selectedItem.category.id;
  item.value.category.name = selectedItem.category.name;
  
  item.value.category.option = {
    text: selectedItem.category.name,
    value: selectedItem.category.id
  };

  item.imageUrl = itemStore.getImageUrl;
}

export const makeApiParams = (item) => {
  return {
    name: item.value.name,
    category_id: item.value.category.option.value,
    image_url: item.imageUrl
  };
}
