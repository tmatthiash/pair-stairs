import { InjectionKey } from 'vue';
import { createStore, MutationTree, CommitOptions, Store as VuexStore, useStore as baseUserStore } from "vuex";
import { MutationTypes } from "./MutationTypes";
import { state, State } from "./state"

export type Mutations<S = State> = {
  [MutationTypes.SET_PAIR_MATRIX](state: S, payload: any): void;
  [MutationTypes.SET_USER_LIST](state: S, payload: any): void;
  [MutationTypes.SET_SELECTED_PAIR_LIST](state: S, payload: any): void;
  [MutationTypes.SET_USER_PAIR_SETS](state: S, payload: any): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_PAIR_MATRIX](state, payload: any) {
    state.pairMatrix = payload
  },
  [MutationTypes.SET_USER_LIST](state, payload: any) {
    state.userList = payload
  },
  [MutationTypes.SET_SELECTED_PAIR_LIST](state, payload: any) {
    state.selectedPairs = payload
  },
  [MutationTypes.SET_USER_PAIR_SETS](state, payload: any) {
    console.log("setting pairSetList to ", payload)
    state.pairSetList = payload
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