<template>
  <div class="container">
    <div style="display: flex">
      <SpendingChart
        style="position: relative; height: 30vh; width: 30vw"
      ></SpendingChart>
      <incoming-chart
        style="position: relative; height: 30vh; width: 30vw"
      ></incoming-chart>
    </div>
  </div>
</template>

<script>
import SpendingChart from "./SpendingChart.vue";
import IncomingChart from "./IncomingChart.vue";

export default {
  components: {
    SpendingChart,
    IncomingChart,
  },
};
</script>

<style scoped></style>
