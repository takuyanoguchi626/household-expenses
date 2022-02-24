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
          <td v-for="day1 of getFirstWeek" :key="day1">
            <button @click="dayPush(day1)">
              {{ day1 }}
            </button>
          </td>
        </tr>
        <tr>
          <td v-for="day2 of getSecondWeek" :key="day2">
            <button @click="dayPush(day2)">
              {{ day2 }}
            </button>
          </td>
        </tr>
        <tr>
          <td v-for="day3 of getThirdWeek" :key="day3">
            <button @click="dayPush(day3)">
              {{ day3 }}
            </button>
          </td>
        </tr>
        <tr>
          <td v-for="day4 of getFourthWeek" :key="day4">
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
          <td v-for="day6 of getSixthWeek" :key="day6">
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
        <tr v-for="(spending, index) of spendings" :key="index">
          <td>{{ spending[0] }}</td>
          <td>{{ spending[1] }}</td>
        </tr>
      </table>
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
  //1週間目
  private firstWeek = Array<number>();
  //2週間目
  private secondWeek = Array<number>();
  //3週間目
  private thirdWeek = Array<number>();
  //4週間目
  private fourthWeek = Array<number>();
  //5週間目
  private fifthWeek = Array<number>();
  //6週間目
  private sixthWeek = Array<number>();

  get spendings(): Map<string, Array<Array<string>>> {
    let date = this.year + "-" + this.month + "-" + this.day;
    return this.$store.getters.getSpendings(date);
  }
  dayPush(day: number): void {
    this.day = day;
    console.log(this.year + "-" + this.month + "-" + this.day);
  }
  //今月の1週間目を配列で取得
  get getFirstWeek(): Array<number> {
    this.firstWeek = Array<number>();
    for (
      let i = this.getLastDateOfLastMonth;
      i - this.dayOfWeek + 1 <= this.getLastDateOfLastMonth;
      i++
    ) {
      this.firstWeek.push(i - this.dayOfWeek + 1);
    }
    for (let i = 0; this.firstWeek.length < 7; i++) {
      this.firstWeek.push(this.getmonthArr[i]);
    }
    return this.firstWeek;
  }
  //今月の2週間目を配列で取得
  get getSecondWeek(): Array<number> {
    this.secondWeek = Array<number>();
    for (let i = 0; this.secondWeek.length < 7; i++) {
      this.secondWeek.push(7 - this.dayOfWeek + 1 + i);
    }
    return this.secondWeek;
  }
  //今月の3週間目を配列で取得
  get getThirdWeek(): Array<number> {
    this.thirdWeek = Array<number>();
    for (let i = 0; this.thirdWeek.length < 7; i++) {
      this.thirdWeek.push(7 - this.dayOfWeek + 1 + i + 7);
    }
    return this.thirdWeek;
  }
  //今月の4週間目を配列で取得
  get getFourthWeek(): Array<number> {
    this.fourthWeek = Array<number>();
    for (let i = 0; this.fourthWeek.length < 7; i++) {
      this.fourthWeek.push(7 - this.dayOfWeek + 1 + i + 14);
    }
    return this.fourthWeek;
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
  get getSixthWeek(): Array<number> {
    this.sixthWeek = Array<number>();
    for (let i = 1; this.sixthWeek.length < 7; i++) {
      if (this.fifthWeek[6] === this.lastDay) {
        for (let j = 1; this.sixthWeek.length < 7; j++) {
          this.sixthWeek.push(j);
        }
      } else {
        this.sixthWeek.push(this.fifthWeek[6] + i);
      }
      if (this.fifthWeek[6] + i === this.lastDay) {
        for (let k = 1; this.sixthWeek.length < 7; k++) {
          this.sixthWeek.push(k);
        }
      }
    }
    return this.sixthWeek;
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
  get getLastDateOfLastMonth(): number {
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
</style>
