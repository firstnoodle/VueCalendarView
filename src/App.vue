<template>
  <div id="app">
    <ee-date-picker ref="datepicker" :value="date" :options="options" @change="onDateChange"/>
  </div>
</template>

<script>
import eeDatePicker from "./components/DatePicker/eeDatePicker.vue";

export default {
  name: "App",
  components: { eeDatePicker },
  data() {
    return {
      date: "2019-12-27",
      options: {
        // disable weekend days
        disabledDate: momentDate => {
          const day = momentDate.day();
          return day === 0 || day === 6;
        }
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.$refs.datepicker.moveRequest("up");
    }, 2000);
  },
  methods: {
    onDateChange(date) {
      this.date = date;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono:400,700");

* {
  box-sizing: border-box;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
