<template>
  <div class="container">
    <div class="form">
      <input type="number" id="year" v-model.number="year" @input="reset()" />年
      <div>
        <select
          v-model.number="month"
          @input="reset()"
          class="browser-default category"
        >
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
          <option value="12">12</option>
        </select>
      </div>
      月
    </div>
    <div style="display: flex">
      <SpendingChart
        v-if="resetKey"
        :year="year"
        :month="month"
        style="position: relative; height: 30vh; width: 30vw"
      ></SpendingChart>
      <incoming-chart
        style="position: relative; height: 30vh; width: 30vw"
      ></incoming-chart>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SpendingChart from "./SpendingChart.vue";
import IncomingChart from "./IncomingChart.vue";
@Component({
  components: { SpendingChart, IncomingChart },
})
export default class XXXComponent extends Vue {
  private year = new Date().getFullYear();
  private month = new Date().getMonth() + 1;
  private resetKey = true;

  reset(): void {
    this.resetKey = false;
    this.$nextTick(() => (this.resetKey = true));
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
  width: 50px;
}
</style>
