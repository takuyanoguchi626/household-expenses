<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  name: "SpendingChart",
  props: ["year", "month"],
  data() {
    return {
      test: this.test2,
      data: {
        labels: [...this.$store.getters.getSpendingCategory],
        datasets: [
          {
            label: "Doughnut Dataset",
            data: [
              ...this.$store.getters.getTotalSpendingbyCategory(
                this.year,
                this.month
              ),
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(1, 1, 1, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
          //   {
          //     label: "Line Dataset",
          //     data: [10, 50, 20],
          //     borderColor: "#CFD8DC",
          //     fill: false,
          //     type: "line",
          //     lineTension: 0.3,
          //   },
        ],
      },
      // options: {
      //   scales: {
      //     xAxes: [
      //       {
      //         scaleLabel: {
      //           display: true,
      //           labelString: "Month",
      //         },
      //       },
      //     ],
      //     yAxes: [
      //       {
      //         ticks: {
      //           beginAtZero: true,
      //           stepSize: 0.1,
      //         },

      //         scaleLabel: {
      //           display: true,
      //           labelString: "aaa",
      //         },
      //       },
      //     ],
      //   },
      // },
    };
  },
  mounted() {
    this.renderChart(this.data, this.options);
    console.log(
      this.$store.getters.getTotalSpendingbyCategory(this.year, this.month)
    );
  },
};
</script>
