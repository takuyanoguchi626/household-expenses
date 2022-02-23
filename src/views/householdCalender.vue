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
      {{ getmonthArr }}
      {{ dayOfWeek }}
      {{ getLastDateOfLastMonth }}
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
  private year = 2022;
  private month = 0;
  private day = 0;
  private MOONAJDSTMENT = 1;
  private firstDate = new Date();
  private lastDate = new Date();
  private monthArr = Array<number>();
  private LastDateOfLastMonth = new Date();
  private firstWeek = Array<number>();
  private secondWeek = Array<number>();
  private thirdWeek = Array<number>();
  private fourthWeek = Array<number>();
  private fifthWeek = Array<number>();
  private sixthWeek = Array<number>();

  get spendings(): Map<string, Array<Array<string>>> {
    let date = this.year + "-" + this.month + "-" + this.day;
    return this.$store.getters.getSpendings(date);
  }

  dayPush(day: number): void {
    this.day = day;
    console.log(this.year + "-" + this.month + "-" + this.day);
  }

  //カレンダーテーブル作成
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

  get getSecondWeek(): Array<number> {
    this.secondWeek = Array<number>();
    for (let i = 0; this.secondWeek.length < 7; i++) {
      this.secondWeek.push(7 - this.dayOfWeek + 1 + i);
    }
    return this.secondWeek;
  }

  get getThirdWeek(): Array<number> {
    this.thirdWeek = Array<number>();
    for (let i = 0; this.thirdWeek.length < 7; i++) {
      this.thirdWeek.push(7 - this.dayOfWeek + 1 + i + 7);
    }
    return this.thirdWeek;
  }

  get getFourthWeek(): Array<number> {
    this.fourthWeek = Array<number>();
    for (let i = 0; this.fourthWeek.length < 7; i++) {
      this.fourthWeek.push(7 - this.dayOfWeek + 1 + i + 14);
    }
    return this.fourthWeek;
  }

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

  get getdate(): Date {
    this.firstDate = new Date(
      Number(this.year),
      this.month - this.MOONAJDSTMENT
    );
    return this.firstDate;
  }

  get lastDay(): number {
    this.lastDate = new Date(Number(this.year), this.month, 0);
    return this.lastDate.getDate();
  }

  get getmonthArr(): Array<number> {
    this.monthArr = Array<number>();
    for (let i = 1; i <= this.lastDay; i++) {
      this.monthArr.push(i);
    }
    return this.monthArr;
  }

  get dayOfWeek(): number {
    this.firstDate = new Date(
      Number(this.year),
      this.month - this.MOONAJDSTMENT
    );
    return this.firstDate.getDay();
  }

  get getLastDateOfLastMonth(): number {
    this.LastDateOfLastMonth = new Date(
      Number(this.year),
      this.month - this.MOONAJDSTMENT,
      0
    );
    return this.LastDateOfLastMonth.getDate();
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
