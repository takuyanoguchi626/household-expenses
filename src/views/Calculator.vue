<template>
  <div>
    <form>
      <div>
        日付：<input type="number" id="year" v-model.number="year" />年
        <select v-model.number="month">
          <option value="-">--</option>
          <option value="1">1月</option>
          <option value="2">2月</option>
          <option value="3">3月</option>
          <option value="4">4月</option>
          <option value="5">5月</option>
          <option value="6">6月</option>
          <option value="7">7月</option>
          <option value="8">8月</option>
          <option value="9">9月</option>
          <option value="10">10月</option>
          <option value="11">11月</option>
          <option value="12">12月</option>
        </select>

        <select v-model="day">
          <option v-for="day of days" :key="day">{{ day }}</option>
        </select>
      </div>

      <div>
        カテゴリー：
        <select v-model="category">
          <option value="">カテゴリーを選択してください</option>
          <option>食費</option>
          <option>交際費</option>
          <option>娯楽</option>
          <option>交通費</option>
          <option>日用品費</option>
        </select>
      </div>

      <div>支出：<input type="number" v-model="spending" />円</div>

      <div>
        <button type="button" @click="setSpending">支出を入力する</button>
        <button type="reset" @click="resetSpending">クリア</button>
      </div>
      {{ setSpendingMessage }}
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class XXXComponent extends Vue {
  //年
  private year = 2022;
  //月
  private month = 0;
  //日
  private day = 0;
  //カテゴリー
  private category = "";
  //支出
  private spending = "";
  //支出入力完了メッセージ
  private setSpendingMessage = "";
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
    this.$store.commit("setSpending", {
      date: this.date,
      category: this.category,
      spending: this.spending,
    });
    this.setSpendingMessage = "支出の入力が完了しました！";
    this.spending = "";
    setTimeout(() => {
      this.resetSpending();
    }, 5000);
  }
  /**
   * 支出入力完了メッセージをリセットする.
   *
   */
  resetSpending(): void {
    this.setSpendingMessage = "";
  }
}
</script>

<style scoped></style>
