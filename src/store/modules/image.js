import ImageService from "@/services/ImageService.js";

export const namespaced = true;

export const state = {
  images: [],
  image: {},
  totalImages: 0,
  pageLimit: 10
};

export const mutations = {
  ADD_IMAGE(state, image) {
    state.images.push(image);
  },
  SET_IMAGES(state, images) {
    state.images = images;
  },
  SET_TOTAL_IMAGES(state, totalImages) {
    state.totalImages = totalImages;
  },
  SET_IMAGE(state, image) {
    state.image = image;
  },
  DELETE_IMAGE(state) {
    state.image = {};
  }
};

export const actions = {
  async addImage({ commit }, image, form) {
    let response = await ImageService.create(
      image,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        transformRequest: [function (data) {
          return data
        }],
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
          console.log('complete: ', complete)
        }
      }
    );
    console.log('addImage', response);

    if (response.data) {
      commit("ADD_IMAGE", response.data);
      commit("SET_IMAGE", response.data);
    }
  },
  async fetchImages({ commit }, { page }) {
    let offset = (parseInt(page) - 1) * state.pageLimit,
        response = await ImageService.readRows(state.pageLimit, offset);

    if (response.headers['x-total-count']) {
      commit("SET_TOTAL_IMAGES", response.headers['x-total-count']);
    }

    if (response.data !== undefined) {
      commit("SET_IMAGES", response.data);
    }
  },
  async fetchImage({ commit, getters }, id) {
    let image = getters.getImageById(id);

    if (image) {
      commit("SET_IMAGE", image);
    } else {
      let response = await ImageService.read(id);

      if (response.data) {
        commit("SET_IMAGE", response.data);
        image = response.data;
      }
    }
    return image;
  },
  async deleteImage({ commit }, keys) {
    let response = await ImageService.delete(keys);

    if (response.data) {
      commit("DELETE_IMAGE");
    }
  },
  async clearImage({ commit }) {
    commit("SET_IMAGE", {});
  }
};

export const getters = {
  getImageById: state => id => {
    return state.images.find(image => image.id === id);
  }
};
