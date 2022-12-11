import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useImageStore = defineStore({
  id: 'image',
  state: () => ({
    imageUrl: null,
    image: null
  }),
  getters: {
    getImageUrl(state) {
      return state.imageUrl;
    },
    getImage(state) {
      return state.image;
    }
  },
  actions: {
    async addImage(params) {
      let result = null;

      const apiFtn = async () => {
        let formData = new FormData();
        formData.append('image', params['image']);
        formData.append('thumb', true);

        console.log('FormData', formData);

        result = await imageService.add(formData);
        const image = result['data'] ?? null;

        this.image = image;
        this.imageUrl = image.url;
      };

      await callApi(apiFtn);
      return result;
    },
    setImageUrl(imageUrl) {
      this.imageUrl = imageUrl;
    },
    setImage(image) {
      this.image = image;
    }
  }
});
