// import { Spending } from "@/type/spending";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: true,

  state: {
    spendingMap: new Map<string, Array<Array<string | number>>>(),
  },

  actions: {},

  mutations: {
    /**
     * 支出内容をステートのその日付の
     *
     * @param state - ステート
     * @param payload 支出内容
     */
    setSpending(state, payload) {
      const existingSpending = state.spendingMap.get(payload.date);
      if (existingSpending === undefined) {
        state.spendingMap.set(payload.date, [
          [payload.category, payload.spending],
        ]);
        return;
      }
      existingSpending.push([payload.category, payload.spending]);
      state.spendingMap.set(payload.date, existingSpending);
      console.log(existingSpending);
    },
  },

  getters: {
    getSpendings(state) {
      return (date: string) => {
        return state.spendingMap.get(date);
      };
    },

    getTotalSpending(state) {
      return (date: string) => {
        let totalSpending = 0;
        const spendingList = state.spendingMap.get(date);
        if (spendingList === undefined) {
          return 0;
        }
        for (const spending of spendingList) {
          totalSpending += Number(spending[1]);
        }
        return totalSpending;
      };
    },
  },
  modules: {},
});
