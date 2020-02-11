<template>
  <div id="app">
    <calendar-view ref="calendarView" :value="date" :options="options" @change="onDateChange"/>
  </div>
</template>

<script>
import CalendarView from "./components/CalendarView.vue";

export default {
  name: "App",
  components: { CalendarView },
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
      this.$refs.calendarView.moveRequest("up");
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
