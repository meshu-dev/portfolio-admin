import { defineStore } from 'pinia';

const allOption = { text: 'All', value: 0 };
const statusMsgTime = 10000; // 10 Seconds

export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    statusMsg: null,
    dropdownAllOption: allOption,
    showDeleteDialog: false
  }),
  getters: {
    getDropdownAllOption(state) {
      return state.dropdownAllOption;
    },
    getStatusMsg(state) {
      return state.statusMsg;
    },
    isDeleteDialogVisible(state) {
      return state.showDeleteDialog;
    }
  },
  actions: {
    setStatusMsg(statusMsg) {
      this.statusMsg = statusMsg;

      setTimeout(() => {
        this.statusMsg = null;
      }, statusMsgTime);
    },
    toggleDeleteDialog(isVisible) {
      this.showDeleteDialog = isVisible;
    }
  }
});
