import axios from "axios";
const coronaMixin = {
  methods: {
    async fetchData(method, url, params) {
      const res = await axios[method](url, { params });
      return res.data;
    },
    numberWithCommas(number) {
      console.log(number);
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};

export default coronaMixin;
