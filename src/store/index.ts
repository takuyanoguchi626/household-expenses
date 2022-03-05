// import { Spending } from "@/type/spending";
import { Incoming } from "@/type/incoming";
import { Spending } from "@/type/spending";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: true,

  state: {
    spendingList: new Array<Spending>(),
    incomingList: new Array<Incoming>(),
  },

  actions: {},

  mutations: {
    /**
     * 支出内容をステートの支出マップに追加
     *
     * @param state - ステート
     * @param payload 支出内容
     */
    setSpending(state, payload) {
      state.spendingList.push(payload.spending);
      // const existingSpending = state.spendingMap.get(payload.date);
      // if (existingSpending === undefined) {
      //   state.spendingMap.set(payload.date, [
      //     [payload.category, payload.spending],
      //   ]);
      //   return;
      // }
      // existingSpending.push([payload.category, payload.spending]);
      // state.spendingMap.set(payload.date, existingSpending);
      // console.log(existingSpending);
    },
    /**
     * 収入内容をステートの収入マップに追加
     *
     * @param state - ステート
     * @param payload 収入内容
     */
    setIncoming(state, payload) {
      state.incomingList.push(payload.incoming);
      // const existingIncoming = state.incomingMap.get(payload.date);
      // if (existingIncoming === undefined) {
      //   state.incomingMap.set(payload.date, [
      //     [payload.category, payload.spending],
      //   ]);
      //   return;
      // }
      // existingIncoming.push([payload.category, payload.incoming]);
      // state.incomingMap.set(payload.date, existingIncoming);
      // console.log(existingIncoming);
    },
  },

  getters: {
    getDetailList(state) {
      return (date: Date) => {
        const detailList = Array<Spending | Incoming>();
        const incomingList = state.incomingList.filter(
          (incoming) =>
            incoming.date.getFullYear() === date.getFullYear() &&
            incoming.date.getMonth() === date.getMonth() &&
            incoming.date.getDate() === date.getDate()
        );
        const spendingList = state.spendingList.filter(
          (spending) =>
            spending.date.getFullYear() === date.getFullYear() &&
            spending.date.getMonth() === date.getMonth() &&
            spending.date.getDate() === date.getDate()
        );
        if (incomingList !== undefined) {
          for (const incoming of incomingList) {
            detailList.push(incoming);
          }
        }
        if (spendingList !== undefined) {
          for (const spending of spendingList) {
            detailList.push(spending);
          }
        }
        return detailList;
      };
    },

    getTotalIncoming(state) {
      return (month: number) => {
        let totalIncoming = 0;
        const incomingList = state.incomingList.filter(
          (incoming) => incoming.date.getMonth() === month
        );
        for (const incoming of incomingList) {
          totalIncoming += incoming.incoming;
        }
        return totalIncoming;
      };
    },
    getTotalSpinding(state) {
      return (month: number) => {
        let totalSpending = 0;
        const spendingList = state.spendingList.filter(
          (spending) => spending.date.getMonth() === month
        );
        for (const spending of spendingList) {
          totalSpending += spending.spending;
        }
        return totalSpending;
      };
    },
  },
  modules: {},
});
