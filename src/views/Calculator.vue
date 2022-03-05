<template>
  <div>
    <form>
      <div>
        <!-- 年を選択 -->
        日付：<input type="number" id="year" v-model.number="year" />年
        <!-- 月を選択 -->
        <select v-model.number="month">
          <option value="-">--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option></select
        >月
        <!-- 日を選択 -->
        <select v-model="day">
          <option v-for="day of days" :key="day">{{ day }}</option></select
        >日
      </div>
      <!-- カテゴリーを選択 -->
      <div>
        支出カテゴリー：
        <select v-model="spendingCategory">
          <option value="">カテゴリーを選択してください</option>
          <option>食費</option>
          <option>交際費</option>
          <option>娯楽</option>
          <option>交通費</option>
          <option>日用品費</option>
        </select>
      </div>
      <!-- 金額を入力 -->
      <div>支出：<input type="number" v-model="spending" />円</div>
      <!-- メモを入力 -->
      <div>メモ：<input type="text" v-model="memo" /></div>
      <!-- 入力した内容をストアに保存する -->
      <div>
        <button type="button" @click="setSpending">支出を入力する</button>
      </div>
      {{ setSpendingMessage }}
    </form>
  </div>
</template>

<script lang="ts">
import { Spending } from "@/type/spending";
import { Incoming } from "@/type/incoming";
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class XXXComponent extends Vue {
  //年
  private year = 0;
  //月
  private month = 0;
  //日
  private day = 0;
  //支出カテゴリー
  private spendingCategory = "";
  //支出
  private spending = "";
  //支出入力完了メッセージ
  private setSpendingMessage = "";
  //収入カテゴリー
  private incomingCategory = "";
  //収入
  private incoming = "";
  //収入入力完了メッセージ
  private setIncomingMessage = "";
  //メモ
  private memo = "";
  /**
   *今日の日付を入力欄に表示する.
   *
   */
  created(): void {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.day = new Date().getDate();
  }
  /**
   * 今月の最終日を取得.
   *
   * @returns 今月の最終日
   */
  get days(): number {
    return new Date(this.year, this.month, 0).getDate();
  }
  /**
   * 指定した日付を取得する.
   *
   * @returns 指定した日付
   */
  get date(): string {
    return this.year + "-" + this.month + "-" + this.day;
  }
  /**
   * 入力した支出をストアに追加.
   *
   */
  setSpending(): void {
    let spending = new Spending(
      2,
      new Date(
        this.year,
        this.month,
        this.day,
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds()
      ),
      this.spendingCategory,
      Number(this.spending),
      this.memo
    );
    this.$store.commit("setSpending", {
      spending: spending,
    });
    this.setSpendingMessage = "支出の入力が完了しました！";
    this.spending = "";
    this.memo = "";
    setTimeout(() => {
      this.resetSpending();
    }, 5000);
  }
  /**
   * 入力した収入をストアに追加.
   *
   */
  setIncoming(): void {
    let incoming = new Incoming(
      1,
      new Date(
        this.year,
        this.month,
        this.day,
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds()
      ),
      this.incomingCategory,
      Number(this.incoming),
      this.memo
    );
    this.$store.commit("setIncoming", {
      incoming: incoming,
    });
    this.setIncomingMessage = "収入の入力が完了しました！";
    this.incoming = "";
    this.memo = "";
    setTimeout(() => {
      this.resetIncoming();
    }, 5000);
  }
  /**
   * 支出入力完了メッセージをリセットする.
   *
   */
  resetSpending(): void {
    this.setSpendingMessage = "";
  }
  /**
   * 収入入力完了メッセージをリセットする.
   *
   */
  resetIncoming(): void {
    this.setIncomingMessage = "";
  }
}
</script>

<style scoped></style>
