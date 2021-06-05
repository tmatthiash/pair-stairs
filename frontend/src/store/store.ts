import { InjectionKey } from 'vue';
import { createStore, MutationTree, CommitOptions, Store as VuexStore, useStore as baseUserStore } from "vuex";
import { MutationTypes } from "./MutationTypes";
import { state, State } from "./state"

export type Mutations<S = State> = {
  [MutationTypes.SET_PAIR_MATRIX](state: S, payload: any): void;
  [MutationTypes.SET_USER_LIST](state: S, payload: any): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_PAIR_MATRIX](state, payload: any) {
    state.pairMatrix = payload
  },
  [MutationTypes.SET_USER_LIST](state, payload: any) {
    console.log("in set user lsit", payload)
    state.userList = payload
  },
}

export const store = createStore({
  state, mutations
})

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
}

export function userStore() {
  return store as Store;
}


// export default createStore({
//   state: {
//     pairMatrix: null,
//     userList: null,
//     pairSetList: null,
//   },
//   mutations: {
//     setPairMatrix(state, payload) {
//       state.pairMatrix = payload;
//     },
//     setUserList(state, payload) {
//       state.userList = payload;
//     }
//   },
//   actions: {},
//   modules: {},
// });


// export default createStore({
//   state: {
//     pairMatrix: null,
//     userList: null,
//     pairSetList: null,
//   },
//   mutations: {
//     setPairMatrix(state, payload) {
//       state.pairMatrix = payload;
//     },
//     setUserList(state, payload) {
//       state.userList = payload;
//     }
//   },
//   actions: {},
//   modules: {},
// });
