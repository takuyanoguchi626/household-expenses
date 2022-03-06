<template>
  <div class="calenderWrapper">
    <div>
      <input type="number" id="year" v-model.number="year" />年
      <select v-model.number="month" @change="getTotalPrice(month)">
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
      <span>{{ day }}日</span>
    </div>
    <div class="spendingTable">
      <div>
        <table class="calenderTable">
          <tr class="dayOfWeek">
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
          <tr>
            <td v-for="day1 of firstWeek" :key="day1">
              <button class="dayButton" @click="dayPush(day1)" v-if="day1 < 8">
                {{ day1 }}
              </button>
              <span v-else class="dayOtherMonth">{{ day1 }}</span>
            </td>
          </tr>
          <tr>
            <td v-for="day2 of secondWeek" :key="day2">
              <button class="dayButton" @click="dayPush(day2)">
                {{ day2 }}
              </button>
            </td>
          </tr>
          <tr>
            <td v-for="day3 of thirdWeek" :key="day3">
              <button class="dayButton" @click="dayPush(day3)">
                {{ day3 }}
              </button>
            </td>
          </tr>
          <tr>
            <td v-for="day4 of fourthWeek" :key="day4">
              <button class="dayButton" @click="dayPush(day4)">
                {{ day4 }}
              </button>
            </td>
          </tr>
          <tr>
            <td v-for="day5 of getFifthWeek" :key="day5">
              <button class="dayButton" @click="dayPush(day5)" v-if="day5 > 14">
                {{ day5 }}
              </button>
              <span v-else class="dayOtherMonth">{{ day5 }}</span>
            </td>
          </tr>
          <tr>
            <td v-for="day6 of sixthWeek" :key="day6">
              <button class="dayButton" @click="dayPush(day6)" v-if="day6 > 14">
                {{ day6 }}
              </button>
              <span v-else class="dayOtherMonth">{{ day6 }}</span>
            </td>
          </tr>
        </table>
      </div>
      <!-- 選択した日付の詳細内容 -->
      <div class="detail">
        <table border="1" class="totalTable">
          <tr>
            <td class="totalNum">収入</td>
            <td class="totalNum">支出</td>
            <td class="totalNum">合計</td>
          </tr>
          <tr>
            <td class="totalNum">{{ totalIncoming }}円</td>
            <td class="totalNum">{{ totalSpending }}円</td>
            <td class="totalNum">{{ totalFinance }}円</td>
          </tr>
        </table>
        <table class="detailTable" border="1">
          <tr>
            <th>カテゴリー</th>
            <th>金額</th>
            <th>メモ</th>
          </tr>
          <tr v-for="(detail, index) of detailList" :key="index">
            <td v-if="detail.id === 1">{{ detail.incomingCategory }}</td>
            <td v-if="detail.id === 1">{{ detail.incoming }}円</td>
            <td v-if="detail.id === 1">{{ detail.memo }}</td>
            <td v-if="detail.id === 2">{{ detail.spendingCategory }}</td>
            <td v-if="detail.id === 2">{{ detail.spending }}円</td>
            <td v-if="detail.id === 2">{{ detail.memo }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Incoming } from "@/type/incoming";
import { Spending } from "@/type/spending";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  //年
  private year = 0;
  //月
  private month = 0;
  //日
  private day = 0;
  //Dateの月の調整
  private MOONAJDSTMENT = 1;
  //5週目
  private fifthWeek = Array<number>();
  //詳細
  private detailList = Array<Spending | Incoming>();
  //
  private totalIncoming = 0;
  //
  private totalSpending = 0;
  /**
   *
   */
  created(): void {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.day = new Date().getDate();
    this.getTotalPrice(this.month);
  }
  /**
   *指定した日付の支出一覧を取得する
   *
   *@returns 指定した日付の支出一覧
   */
  getDetailList(): void {
    this.detailList = new Array<Spending | Incoming>();
    const storeDetailList = this.$store.getters.getDetailList(
      new Date(this.year, this.month, this.day)
    );
    for (const detail of storeDetailList) {
      this.detailList.push(detail);
      console.log(typeof detail);
    }
    this.detailList.sort((a, b) => {
      if (b.date.getHours() - a.date.getHours() !== 0) {
        return b.date.getHours() - a.date.getHours();
      } else if (b.date.getMinutes() - a.date.getMinutes() !== 0) {
        return b.date.getMinutes() - a.date.getMinutes();
      } else {
        return b.date.getSeconds() - a.date.getSeconds();
      }
    });
  }
  /**
   * 日付を選択する.
   *
   * @param - 日付
   */
  dayPush(day: number): void {
    this.day = day;
    this.getDetailList();
  }
  /**
   *月の収入と支出それぞれの合計額を取得.
   *
   * @params - 月
   */
  getTotalPrice(month: number): void {
    this.totalIncoming = this.$store.getters.getTotalIncoming(month);
    this.totalSpending = this.$store.getters.getTotalSpinding(month);
  }
  /**
   *その月の収支の合計を取得.
   *
   */
  get totalFinance(): number {
    return this.totalIncoming - this.totalSpending;
  }
  //以下カレンダーテーブルを作成するためのメソッド
  //今月の1週間目を配列で取得
  get firstWeek(): Array<number> {
    let firstWeek = Array<number>();
    for (
      let i = this.LastDateOfLastMonth;
      i - this.dayOfWeek + 1 <= this.LastDateOfLastMonth;
      i++
    ) {
      firstWeek.push(i - this.dayOfWeek + 1);
    }
    for (let i = 0; firstWeek.length < 7; i++) {
      firstWeek.push(this.getmonthArr[i]);
    }
    return firstWeek;
  }
  //今月の2週間目を配列で取得
  get secondWeek(): Array<number> {
    let secondWeek = Array<number>();
    for (let i = 0; secondWeek.length < 7; i++) {
      secondWeek.push(7 - this.dayOfWeek + 1 + i);
    }
    return secondWeek;
  }
  //今月の3週間目を配列で取得
  get thirdWeek(): Array<number> {
    let thirdWeek = Array<number>();
    for (let i = 0; thirdWeek.length < 7; i++) {
      thirdWeek.push(7 - this.dayOfWeek + 1 + i + 7);
    }
    return thirdWeek;
  }
  //今月の4週間目を配列で取得
  get fourthWeek(): Array<number> {
    let fourthWeek = Array<number>();
    for (let i = 0; fourthWeek.length < 7; i++) {
      fourthWeek.push(7 - this.dayOfWeek + 1 + i + 14);
    }
    return fourthWeek;
  }
  //今月の5週間目を配列で取得
  get getFifthWeek(): Array<number> {
    this.fifthWeek = Array<number>();
    for (let i = 0; this.fifthWeek.length < 7; i++) {
      this.fifthWeek.push(7 - this.dayOfWeek + 1 + i + 21);
      if (7 - this.dayOfWeek + 1 + i + 21 === this.lastDay) {
        for (let i = 1; this.fifthWeek.length < 7; i++) {
          this.fifthWeek.push(i);
        }
      }
    }
    return this.fifthWeek;
  }
  //今月の6週間目を配列で取得
  get sixthWeek(): Array<number> {
    let sixthWeek = Array<number>();
    for (let i = 1; sixthWeek.length < 7; i++) {
      if (this.fifthWeek[6] === this.lastDay) {
        for (let j = 1; sixthWeek.length < 7; j++) {
          sixthWeek.push(j);
        }
      } else {
        sixthWeek.push(this.fifthWeek[6] + i);
      }
      if (this.fifthWeek[6] + i === this.lastDay) {
        for (let k = 1; sixthWeek.length < 7; k++) {
          sixthWeek.push(k);
        }
      }
    }
    return sixthWeek;
  }
  //今月の日付を配列に入れて取得
  get getmonthArr(): Array<number> {
    let monthArr = Array<number>();
    for (let i = 1; i <= this.lastDay; i++) {
      monthArr.push(i);
    }
    return monthArr;
  }
  //今月の初日の曜日を取得
  get dayOfWeek(): number {
    return new Date(
      Number(this.year),
      this.month - this.MOONAJDSTMENT
    ).getDay();
  }
  //先月の最終日を取得
  get LastDateOfLastMonth(): number {
    return new Date(
      Number(this.year),
      this.month - this.MOONAJDSTMENT,
      0
    ).getDate();
  }
  //今月の最終日を取得
  get lastDay(): number {
    let lastDate = new Date(Number(this.year), this.month, 0);
    return lastDate.getDate();
  }
}
</script>

<style scoped></style>
