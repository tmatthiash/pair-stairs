import { createStore } from "vuex";

export default createStore({
  state: {
    pairMatrix: null,
    userList: null,
    pairSetList: null,
  },
  mutations: {
    setPairMatrix(state, payload) {
      state.pairMatrix = payload;
    },
    setUserList(state, payload) {
      state.userList = payload;
    }
  },
  actions: {},
  modules: {},
});
