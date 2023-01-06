import { defineStore } from 'pinia';

const allOption = { text: 'All', value: 0 };
const statusMsgTime = 10000; // 10 Seconds

export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    dropdownAllOption: allOption,
    statusMsg: null,
    returnUrl: null,
    sideMenu: false
  }),
  getters: {
    getDropdownAllOption(state) {
      return state.dropdownAllOption;
    },
    getStatusMsg(state) {
      return state.statusMsg;
    },
    getReturnUrl(state) {
      return state.returnUrl;
    },
    isMenuOpen(state) {
      return state.sideMenu;
    }
  },
  actions: {
    setStatusMsg(statusMsg) {
      this.statusMsg = statusMsg;

      setTimeout(() => {
        this.statusMsg = null;
      }, statusMsgTime);
    },
    setReturnUrl(returnUrl) {
      this.returnUrl = returnUrl;
    },
    clearReturnUrl() {
      this.returnUrl = null;
    },
    toggleSideMenu() {
      this.sideMenu = !this.sideMenu;
      //setTimeout(4000, this.openSideMenu());
    },
    openSideMenu() {
      this.sideMenu = true;
    },
    closeSideMenu() {
      this.sideMenu = false;
    }
  }
});
