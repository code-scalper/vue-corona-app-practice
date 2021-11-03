<template>
  <canvas id="myChart" width="400" height="400" ref="myChart"></canvas>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  name: "LineChart",
  props: {
    chartOptions: {
      type: Object,
      default() {
        return {
          type: "line",
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
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
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
      const { type, datasets, labels, options } = this.chartOptions;
      const ctx = this.$refs.myChart.getContext("2d");
      this.chartObject = new Chart(ctx, {
        type,
        data: {
          labels,
          datasets,
        },
        options,
      });
    },
  },
};
</script>

<style scoped></style>
