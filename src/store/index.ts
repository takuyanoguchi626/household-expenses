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
    spendingCategory: ["食費", "交際費", "娯楽", "交通費", "日用品費"],
    incomingCategory: ["今月分", "給料", "賞与", "副業", "投資"],
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
    },
    /**
     * 収入内容をステートの収入マップに追加
     *
     * @param state - ステート
     * @param payload 収入内容
     */
    setIncoming(state, payload) {
      state.incomingList.push(payload.incoming);
    },
  }, //end mutations

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
    getSpendingCategory(state) {
      return state.spendingCategory;
    },
    getIncomingCategory(state) {
      return state.incomingCategory;
    },
    getTotalSpendingbyCategory(state) {
      return (year: number, month: number) => {
        const TotalPricebyCategoryMap = new Map();
        const TotalPricebyCategory = new Array<number>();
        for (const spending of state.spendingList) {
          for (const category of state.spendingCategory) {
            if (
              spending.spendingCategory === category &&
              spending.date.getMonth() === month &&
              spending.date.getFullYear() === year
            ) {
              if (TotalPricebyCategoryMap.get(category) === undefined) {
                TotalPricebyCategoryMap.set(category, spending.spending);
              } else {
                TotalPricebyCategoryMap.set(
                  category,
                  TotalPricebyCategoryMap.get(category) + spending.spending
                );
              }
            }
          }
        }
        for (const category of state.spendingCategory) {
          TotalPricebyCategory.push(TotalPricebyCategoryMap.get(category));
        }
        return TotalPricebyCategory;
      };
    },
    getTotalIncomingbyCategory(state) {
      const TotalIncomingbyCategoryMap = new Map();
      const TotalIncomingbyCategory = new Array<number>();
      for (const incoming of state.incomingList) {
        for (const category of state.incomingCategory) {
          if (
            incoming.incomingCategory === category &&
            incoming.date.getMonth() === new Date().getMonth() + 1
          ) {
            if (TotalIncomingbyCategoryMap.get(category) === undefined) {
              TotalIncomingbyCategoryMap.set(category, incoming.incoming);
            } else {
              TotalIncomingbyCategoryMap.set(
                category,
                TotalIncomingbyCategoryMap.get(category) + incoming.incoming
              );
            }
          }
        }
      }
      for (const category of state.incomingCategory) {
        TotalIncomingbyCategory.push(TotalIncomingbyCategoryMap.get(category));
      }
      return TotalIncomingbyCategory;
    },
  }, //end getters
  modules: {},
});
