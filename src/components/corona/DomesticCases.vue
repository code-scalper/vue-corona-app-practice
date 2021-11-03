<template>
  <div>
    <ul class="graph-list">
      <li>
        <h3>누적 확진/사망자 추이</h3>
        <LineChart :chartOptions="domesticCases" :key="caseKey" />
      </li>

      <li>
        <h3>확진자 대비 사망자</h3>
        <LineChart :chartOptions="domesticCompare" :key="compareKey" />
      </li>
    </ul>
  </div>
</template>

<script>
import coronaMixin from "@/mixins/coronaMixin";
import LineChart from "@/components/charts/LineChart";

import moment from "moment";
export default {
  name: "domesticCases",
  mixins: [coronaMixin],
  components: {
    LineChart,
  },
  data() {
    return {
      caseKey: 0,
      compareKey: 0,
      monthDifference: 6,
      domesticData: [],
    };
  },
  computed: {
    domesticCases() {
      return {
        type: "line",
        labels: this.domesticData.map((data) =>
          data.Date.split("T")[0].substr(0, 7)
        ),
        datasets: [
          {
            label: "확진자",
            data: this.domesticData.map((data) => data.Confirmed),

            borderWidth: 1,
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
          },
          {
            label: "사망자",
            data: this.domesticData.map((data) => data.Deaths),
            borderWidth: 1,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
          },
        ],
      };
    },
    domesticCompare() {
      const deaths = this.domesticData.reduce(
        (acc, cur) => acc + cur.Deaths,
        0
      );
      const confirmed = this.domesticData.reduce(
        (acc, cur) => acc + cur.Confirmed,
        0
      );
      const data = [deaths, confirmed];
      return {
        type: "doughnut",
        labels: ["사망자", "확진자"],
        datasets: [
          {
            label: "확진자",
            data,
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)z1323",
            ],
          },
        ],
      };
    },
  },
  watch: {
    domesticCases: {
      handler() {
        this.caseKey++;
      },
      deep: true,
    },
    domesticCompare: {
      handler() {
        this.compareKey++;
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchDomestic();
  },

  methods: {
    async fetchDomestic() {
      const to = moment().format("YYYY-MM-DD");
      const from = moment()
        .subtract(this.monthDifference, "months")
        .format("YYYY-MM-DD");
      const url = "https://api.covid19api.com/live/country/south-korea";

      const params = {
        from,
        to,
      };
      const domestic = await this.fetchData("get", url, params);

      this.setDomesticData(domestic);
    },
    setDomesticData(domestic) {
      let pick = 0;
      const targetDates = [];

      while (pick < this.monthDifference) {
        targetDates.push(
          moment().subtract(pick, "months").utc().format().split("T")[0]
        );
        pick++;
      }
      this.domesticData = domestic.filter((dom) =>
        targetDates.includes(dom.Date.split("T")[0])
      );
    },
  },
};
</script>

<style scoped>
.graph-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
  list-style: none;
}
</style>
