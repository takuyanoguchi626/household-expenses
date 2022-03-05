<template>
  <div>
    <div>
      <input type="number" id="year" v-model.number="year" />年
      <select v-model.number="month">
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
    </div>
    <div class="spendingTable">
      <div>
        <table border="1">
          <tr>
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
              <button @click="dayPush(day1)">
                {{ day1 }}
              </button>
            </td>
          </tr>
          <tr>
            <td v-for="day2 of secondWeek" :key="day2">
              <button @click="dayPush(day2)">
                {{ day2 }}
              </button>
            </td>
          </tr>
          <tr>
            <td v-for="day3 of thirdWeek" :key="day3">
              <button @click="dayPush(day3)">
                {{ day3 }}
              </button>
            </td>
          </tr>
          <tr>
            <td v-for="day4 of fourthWeek" :key="day4">
              <button @click="dayPush(day4)">
                {{ day4 }}
              </button>
            </td>
          </tr>
          <tr>
            <td v-for="day5 of getFifthWeek" :key="day5">
              <button @click="dayPush(day5)">
                {{ day5 }}
              </button>
            </td>
          </tr>
          <tr>
            <td v-for="day6 of sixthWeek" :key="day6">
              <button @click="dayPush(day6)">
                {{ day6 }}
              </button>
            </td>
          </tr>
        </table>
      </div>
      <!-- 詳細内容 -->
      <div>
        <table>
          <tr>
            <th>カテゴリー</th>
            <th>金額</th>
          </tr>
          <tr>
            <th>合計金額</th>
            <th>{{ totalSpending }}</th>
          </tr>
          <tr v-for="(spending, index) of spendings" :key="index">
            <td>{{ spending[0] }}</td>
            <td>{{ spending[1] }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  //年
  private year = 2022;
  //月
  private month = 0;
  //日
  private day = 0;
  //Dateの月の調整
  private MOONAJDSTMENT = 1;
  //5週目
  private fifthWeek = Array<number>();
  /**
   * 日付を年月日つなげて取得する.
   *
   * @returns 年月日つなげた日付
   */
  get date(): string {
    return this.year + "-" + this.month + "-" + this.day;
  }
  /**
   *指定した日付の支出一覧を取得する
   *
   *@returns 指定した日付の支出一覧
   */
  get spendings(): Array<Array<string | number>> {
    return this.$store.getters.getSpendings(this.date);
  }
  /**
   * 指定した日付の支出の合計を取得する.
   *
   * @returns 指定した日付の支出の合計
   */
  get totalSpending(): number {
    return this.$store.getters.getTotalSpending(this.date);
  }
  /**
   * 日付を選択する.
   *
   * @param - 日付
   */
  dayPush(day: number): void {
    this.day = day;
  }
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

<style scoped>
#year {
  text-align: right;
  width: 50px;
}

table {
  margin: 0 auto;
  width: 400px;
  height: 400px;
}

.spendingTable {
  display: flex;
}
</style>
