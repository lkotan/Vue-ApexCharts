<template>
  <div class="chart">
    <div>
      <select @change="updateChartType">
        <option value="" disabled selected>Please type choose</option>
        <option v-for="type in chartTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
      <button @click="updateChart">Update Chart</button>
    </div>
    <apexcharts
      width="600"
      :type="chartType"
      height="450"
      :options="options"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Bar",
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      chartType: "bar",
      horizontal: false,
      options: {
        chart: {
          animations: {
            speed: 200,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 6,
            columnWidth: "70%",
            barHeight: "50%",
            distributed: true,
            colors: {
              backgroundBarColors: ["blue"],
              backgroundBarOpacity: 0.1,
              backgroundBarRadius: 6,
            },
          },
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "Personnel",
          data: [],
        },
      ],
      max: 0,
      min: 0,
      chartTypes: ["bar", "line", "area", "radar", "scatter", "heatmap"],
    };
  },
  methods: {
    async getData() {
      const response = await fetch(`${this.$baseURL}/personnel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const personnel = await response.json();
      personnel.sort(function(a, b) {
        return a.appointmentCount - b.appointmentCount;
      });
      (this.min = personnel[0].appointmentCount),
        (this.max = personnel[personnel.length - 1].appointmentCount);
      personnel.map((item) => {
        this.series[0].data.push(item.appointmentCount);
        this.options.xaxis.categories.push(item.name);
      });
    },
    updateChart() {
      const newData = this.series[0].data.map(() => {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
      });
      this.series = [
        {
          data: newData,
        },
      ];
    },
    updateChartType(e) {
      this.chartType = e.target.value;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.chart {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.chart div:first-child {
  display: flex;
  align-items: center;
}
select {
  width: 250px;
  padding: 6px 8px;
  font-size: 16px;
  outline: 0;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgb(64 64 64 / 60%);
}
button {
  margin-left: 20px;
  padding: 10px;
  border: 0;
  outline: 0;
  border-radius: 6px;
  cursor: pointer;
  background: #383838;
  color: white;
}
</style>
