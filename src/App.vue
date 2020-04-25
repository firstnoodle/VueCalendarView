<template>
  <div id="app">
    <calendar-view ref="calendarView" :value="date" :options="options" @change="onDateChange"/>
  </div>
</template>

<script>
import { arrowKeys } from "./utils/keyboard.js";
import CalendarView from "./components/CalendarView/main.vue";

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
    window.addEventListener("keydown", event => {
      const move = arrowKeys.find(key => key.code === event.keyCode);
      if (move) {
        this.$refs.calendarView.moveRequest(move.direction);
      }
    });
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
