<template>
  <div class="container">
    <form>
      <div class="form">
        <!-- 年を選択 -->
        日付：<input type="number" id="year" v-model.number="year" />年
        <!-- 月を選択 -->
        <div class="input-field col s3 form">
          <select v-model.number="month" class="browser-default">
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
        </div>
        <!-- 日を選択 -->
        <div class="input-field col s3 form">
          <select v-model="day" class="browser-default">
            <option v-for="day of days" :key="day">{{ day }}</option></select
          >日
        </div>
      </div>
      <!-- 支出か収入を選択 -->
      <div>
        <label for="spendingButton">
          <input
            type="radio"
            name="finance"
            id="spendingButton"
            value="spending"
            v-model="financeButton"
          /><span>支出</span>
        </label>
        <label for="incomingButton">
          <input
            type="radio"
            name="finance"
            id="incomingButton"
            value="incoming"
            v-model="financeButton"
          />
          <span> 収入 </span>
        </label>
      </div>
      <!-- カテゴリーを選択 -->
      <div v-if="financeButton === 'spending'" class="category">
        <span class="category2"> 支出カテゴリー： </span>
        <select v-model="spendingCategory" class="browser-default category3">
          <option value="">カテゴリーを選択してください</option>
          <option>食費</option>
          <option>交際費</option>
          <option>娯楽</option>
          <option>交通費</option>
          <option>日用品費</option>
        </select>
      </div>
      <div v-if="financeButton === 'incoming'" class="category">
        <span class="category2"> 収入カテゴリー：</span>
        <select v-model="incomingCategory" class="browser-default category3">
          <option value="">カテゴリーを選択してください</option>
          <option>今月分</option>
          <option>給料</option>
          <option>賞与</option>
          <option>副業</option>
          <option>投資</option>
        </select>
      </div>
      <!-- 金額を入力 -->
      <div v-if="financeButton === 'spending'" class="category">
        <span class="category4">支出：</span>
        <div>
          <input type="text" v-model="spending" />
        </div>
        <span>円</span>
      </div>
      <div v-if="financeButton === 'incoming'" class="category">
        <span class="category4"> 収入：</span>
        <div>
          <input type="number" v-model="incoming" />
        </div>
        円
      </div>
      <!-- メモを入力 -->
      <div class="category">
        <span class="category4">メモ：</span>
        <div>
          <input type="text" v-model="memo" />
        </div>
      </div>
      <!-- 入力した内容をストアに保存する -->
      <div v-if="financeButton === 'spending'">
        <button type="button" class="btn" @click="setSpending">
          支出を入力する
        </button>
      </div>
      <div v-if="financeButton === 'incoming'">
        <button type="button" class="btn" @click="setIncoming">
          収入を入力する
        </button>
      </div>
      {{ setSpendingMessage }}
      {{ setIncomingMessage }}
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
  //
  private financeButton = "spending";
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
    if (this.memo === "") {
      this.memo = "-";
    }
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
    this.incoming = "";
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
    if (this.memo === "") {
      this.memo = "-";
    }
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
    this.spending = "";
    this.memo = "";
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

<style scoped>
.form {
  display: flex;
  align-items: center;
  justify-content: center;
}
.category {
  display: flex;
  justify-content: center;
}
.category2 {
  width: 150px;
}
.category3 {
  display: inline-block;
  width: 300px;
}
.category4 {
  width: 50px;
}
</style>
