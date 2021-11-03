<template>
  <div>
    <div class="buttons">
      <el-radio-group v-model="displayType" size="small">
        <el-radio-button
          v-for="(item, index) in displayTypes"
          :key="index"
          :label="index"
          >{{ item.alias }}</el-radio-button
        >
      </el-radio-group>
      <input type="text" v-model="keyword" />
    </div>

    <ul class="list">
      <li class="country" v-for="country in sortedCountries" :key="country.ID">
        <img
          :src="require(`@/assets/flags/${country.CountryCode}.svg`)"
          :alt="country.Country"
        />
        <span class="name">{{ country.Country }}</span>
        <span class="cases"
          >{{ country.NewConfirmedComma }} /
          {{ country.TotalConfirmedComma }}</span
        >
      </li>
    </ul>
  </div>
  <!--https://github.com/purecatamphetamine/country-flag-icons -->
</template>

<script>
import coronaMixin from "@/mixins/coronaMixin";
export default {
  name: "countryCases",
  mixins: [coronaMixin],
  data() {
    return {
      keyword: "",
      countries: [],
      alphabets: [""],
      selectedCases: [],
      displayType: 0,
      displayTypes: [
        { alias: "Daily Worst", key: "NewConfirmed", compare: -1 },
        { alias: "Daily Best", key: "NewConfirmed", compare: 1 },
        { alias: "Total Worst", key: "TotalConfirmed", compare: -1 },
        { alias: "Total Best", key: "TotalConfirmed", compare: 1 },
      ],
    };
  },
  computed: {
    sortedCountries() {
      const { compare, key } = this.displayTypes[this.displayType];
      let list = [...this.countries];
      if (this.keyword) {
        list = list.filter((li) =>
          li.Country.toUpperCase().includes(this.keyword.toUpperCase())
        );
      }
      return list.sort((a, b) => (a[key] > b[key] ? compare : -compare));
    },
  },
  mounted() {
    this.fetchCases();
  },
  methods: {
    async fetchCases() {
      const url = "https://api.covid19api.com/summary";
      const summary = await this.fetchData("get", url);
      this.updatedTime = summary.Date.replace("T", " ").substr(0, 19);
      this.countries = summary.Countries.map((country) => {
        const NewConfirmedComma = this.numberWithCommas(country.NewConfirmed);
        const TotalConfirmedComma = this.numberWithCommas(
          country.TotalConfirmed
        );
        // console.log(country.Country, NewConfirmedComma, TotalConfirmedComma);
        return { ...country, NewConfirmedComma, TotalConfirmedComma };
      });
    },
  },
};
</script>

<style scoped>
.info {
  font-size: 12px;
  margin-top: 0.5em;
  margin-bottom: 1em;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.5em;
  margin-top: 1em;
}
.country {
  border: 1px solid #efefef;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5em;
  font-size: 12px;
}

.country img {
  max-width: 1em;
  margin-right: 1em;
}
.country .name {
  margin-right: 1em;
  font-weight: bold;
}
</style>
