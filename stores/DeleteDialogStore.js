import { defineStore } from 'pinia';

export const useDeleteDialogStore = defineStore({
  id: 'delete-dialog',
  state: () => ({
    visible: false,
    title: '',
    message: '',
    callback: null
  }),
  getters: {
    isVisible(state) {
      return state.visible;
    },
    getTitle(state) {
      return state.title;
    },
    getMessage(state) {
      return state.message;
    },
    getCallback(state) {
      return state.callback;
    }
  },
  actions: {
    setTitle(title) {
      this.title = title;
    },
    setMessage(message) {
      this.message = message;
    },
    setCallback(callback) {
      this.callback = callback;
    },
    setContent(title, message, callback) {
      this.title = title;
      this.message = message;
      this.callback = callback;
    },
    open(title, message, callback) {
      this.visible = true;
      this.title = title;
      this.message = message;
      this.callback = callback;
    },
    open2() {
      this.visible = true;
    },
    close() {
      this.visible = false;

      const postClose = () => {
        this.title = '';
        this.message = '';
        this.callback = null;
      };

      setTimeout(2000, postClose);
    }
  }
});
