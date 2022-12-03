import { defineStore } from 'pinia';

const allOption = { text: 'All', value: 0 };
const statusMsgTime = 10000; // 10 Seconds

export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    statusMsg: null,
    dropdownAllOption: allOption,
    editMode: false,
    showDeleteDialog: false
  }),
  getters: {
    getDropdownAllOption(state) {
      return state.dropdownAllOption;
    },
    getStatusMsg(state) {
      return state.statusMsg;
    },
    isEditMode(state) {
      return state.editMode;
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
    setEditMode(isEditMode) {
      this.editMode = isEditMode;
    },
    toggleDeleteDialog(isVisible) {
      this.showDeleteDialog = isVisible;
    }
  }
});
