import { Spending } from "@/type/spending";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: true,

  state: {
    spendingMap: new Map<string, Array<any>>(),
  },
  actions: {},

  mutations: {
    setSpending(state, payload) {
      const existingSpending = state.spendingMap.get(payload.date);
      state.spendingMap.set(payload.date, [
        existingSpending,
        [payload.category, payload.spending],
      ]);
    },
  },

  getters: {
    getSpendings(state) {
      return (date: string) => {
        return state.spendingMap.get(date);
      };
    },
  },

  getspendingMap(state) {
    return state.spendingMap;
  },

  modules: {},
});
