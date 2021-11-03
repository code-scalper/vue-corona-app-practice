<template>
  <canvas id="myChart" width="400" height="400" ref="myChart"></canvas>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  name: "ChartView",
  props: {
    options: {
      type: Object,
      default() {
        return {
          type: "doughnut",

          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              data: [12, 19, 3, 5, 2, 3],
              label: "Test",
              borderWidth: 1,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
            },
          ],
        };
      },
    },
  },
  data() {
    return {
      chartObject: null,
    };
  },
  mounted() {
    this.activateChart();
  },
  methods: {
    activateChart() {
      const { type, datasets, labels } = this.options;
      const ctx = this.$refs.myChart.getContext("2d");
      this.chartObject = new Chart(ctx, {
        type,
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Chart.js Doughnut Chart",
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped></style>
