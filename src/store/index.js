import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    side0: '',
    side1: '',
    tmpSide0: '', // selected image, not saved in localStorage
    tmpSide1: '', // selected image, not saved in localStorage
  },
  getters: {
    getSide0(state) {
      state.side0 = localStorage.getItem("saved-side-0");
      return state.side0;
    },
    getSide1(state) {
      state.side1 = localStorage.getItem("saved-side-1");
      return state.side1;
    },
    getTmpSide0(state) {
      return state.tmpSide0;
    },
    getTmpSide1(state) {
      return state.tmpSide1;
    },
    getDefaultText() {
      let text = localStorage.getItem("default-text");
      if (text) {
        return text;
      }
      return "es copia ...";
    },
    getDefaultFilename() {
      let text = localStorage.getItem("default-filename");
      if (text) {
        return text;
      }
      return "file-card.jpg";
    }
  },
  mutations: {
    setSide0(state) {
      if (state.tmpSide0 && (state.tmpSide0 != state.side0)) {
        state.side0 = state.tmpSide0;
        state.tmpSide0 = '';
        localStorage.setItem("saved-side-0", state.side0);
      }
    },
    setSide1(state) {
      if (state.tmpSide1 && (state.tmpSide1 != state.side1)) {
        state.side1 = state.tmpSide1;
        state.tmpSide1 = '';
        localStorage.setItem("saved-side-1", state.side1);
      }
    },
    setTmpSide0(state, payload) {
      state.tmpSide0 = payload
    },
    setTmpSide1(state, payload) {
      state.tmpSide1 = payload
    },
    setDefaultText(state, payload) {
      localStorage.setItem("default-text", payload);
    },
    setDefaultFilename(state, payload) {
      localStorage.setItem("default-filename", payload);
    },
    reset(state) {
      state.tmpSide0 = '';
      state.tmpSide1 = '';
    },
    destroy(state) {
      state.side0 = '';
      state.side1 = '';
      localStorage.removeItem("saved-side-0");
      localStorage.removeItem("saved-side-1");
      localStorage.removeItem("default-text");
      localStorage.removeItem("default-filename");
    }
  },
  actions: {
  },
  modules: {
  }
})
