<template>
  <div class="calendar-view">
    <component :is="currentView" v-bind="currentProps" v-dynamic-events="knownEvents"/>
  </div>
</template>

<script>
import { months, weekdays } from "./config.js";
import DateView from "./components/DateView.vue";
import MonthView from "./components/MonthView.vue";
import YearView from "./components/YearView.vue";

export default {
  name: "CalendarView",
  components: { DateView, MonthView, YearView },
  props: {
    options: {
      type: Object
    },
    value: {
      type: String | Object | null,
      validator: value => moment(value).isValid()
    }
  },
  data() {
    return {
      currentView: DateView,
      dateGrid: [],
      decade: null,
      monthGrid: [],
      yearGrid: [],
      month: null,
      selectedDate: null,
      today: null,
      weekStart: 1,
      year: null,
      knownEvents: {
        changeDate: "onChangeDate",
        changeMonth: "onChangeMonth",
        changeView: "onChangeView",
        changeYear: "onChangeYear",
        stepMonth: "onStepMonth",
        stepYear: "onStepYear"
      }
    };
  },
  directives: {
    DynamicEvents: {
      bind: (el, binding, vnode) => {
        const allEvents = binding.value;
        Object.keys(allEvents).forEach(event => {
          // register handler in the dynamic component
          vnode.componentInstance.$on(event, eventData => {
            const targetEvent = allEvents[event];
            vnode.context[targetEvent](eventData);
          });
        });
      },
      unbind: function(el, binding, vnode) {
        vnode.componentInstance.$off();
      }
    }
  },
  computed: {
    currentProps() {
      if (this.currentView.name === DateView.name) {
        return {
          dateGrid: this.dateGrid,
          month: months[this.month],
          year: this.year,
          weekdays: weekdays.map((day, index) => {
            return weekdays[
              this.loopRange(index + this.weekStart, weekdays.length)
            ].slice(0, 3);
          })
        };
      }
      if (this.currentView.name === MonthView.name) {
        return {
          monthGrid: this.monthGrid,
          year: this.year
        };
      }
      if (this.currentView.name === YearView.name) {
        return {
          decade: this.decade,
          year: this.year,
          yearGrid: this.yearGrid
        };
      }
    }
  },
  watch: {
    value(newDate, oldDate) {
      this.update();
    }
  },
  created() {
    this.today = moment().utc();
    this.update();
  },
  methods: {
    update() {
      this.selectedDate = moment.utc(this.value);
      this.month = this.selectedDate.month();
      this.year = this.selectedDate.year();

      this.updateCurrentView();
    },

    loopRange(index, length) {
      return ((index % length) + length) % length;
    },

    onChangeDate(value) {
      this.$emit("change", value);
    },

    onChangeMonth(month) {
      this.month = month;
      this.onChangeView("DateView");
      this.updateCurrentView();
    },

    onChangeYear(year) {
      this.year = year;
      this.onChangeView("DateView");
      this.updateCurrentView();
    },

    onChangeView(viewName) {
      this.updateCurrentView(viewName);
      this.currentView = this.$options.components[viewName];
    },

    onStepMonth(value) {
      const previousMonth = this.month;
      this.month = this.loopRange(this.month + value, months.length);

      // change year ?
      const deltaMonths = previousMonth - this.month;
      if (Math.abs(deltaMonths) > 1) {
        if (deltaMonths >= 0) {
          this.year++;
        } else {
          this.year--;
        }
      }
      this.updateCurrentView();
    },

    onStepYear(value) {
      this.year += value;
      this.updateCurrentView();
    },

    moveRequest(direction) {
      let tempDate = moment(this.selectedDate);
      switch (direction) {
        case "up":
          tempDate.subtract(7, "days");
          break;
        case "down":
          tempDate.add(7, "days");
          break;
        case "left":
          tempDate.subtract(1, "days");
          break;
        case "right":
          tempDate.add(1, "days");
          break;
        default:
          console.warn(`Direction [${direction}] not accepted`);
          break;
      }
      if (this.options.disabledDate) {
        if (!this.options.disabledDate(tempDate)) {
          this.$emit("change", tempDate.format());
        }
      } else {
        this.$emit("change", tempDate.format());
      }

      // change back to DateView (if on month or year)
      if (this.currentView !== DateView) {
        this.onChangeView("DateView");
        this.updateCurrentView();
      }
    },

    selectedDateInCurrentView() {
      switch (this.currentView.name) {
        case "DateView":
          return this.selectedDate.month() === this.month;
        case "MonthView":
          return this.selectedDate.year() === this.year;
        case "YearView":
          return (
            this.selectedDate.year() >= this.decade &&
            this.selectedDate.year() <= this.decade + 9
          );
        default:
          console.error("ERROR");
      }
    },

    updateCurrentView(view = null) {
      const viewName = view || this.currentView.name;
      const fnName = `update${viewName}`;
      this[fnName]();
    },

    updateDateView() {
      let dateCursor = moment()
        .utc()
        .year(this.year)
        .month(this.month)
        .date(1)
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0);

      // find and set calendar grid start date
      const gridStartDate = !(dateCursor.day() - this.weekStart)
        ? 7
        : this.loopRange(dateCursor.day() - this.weekStart, weekdays.length);
      dateCursor.subtract(gridStartDate, "days");

      // clear dateGrid
      this.dateGrid = [];

      // populate grid
      for (let row = 0; row < 42; row++) {
        this.dateGrid.push({
          label: dateCursor.date(),
          date: dateCursor.format(),
          disabled: this.options.disabledDate
            ? this.options.disabledDate(dateCursor)
            : false,
          inactive: dateCursor.month() !== this.month,
          selected: dateCursor.isSame(this.selectedDate, "day"),
          current: dateCursor.isSame(this.today, "day")
        });
        dateCursor.add(1, "days");
      }
    },

    updateMonthView() {
      this.monthGrid = [];
      for (let [index, month] of months.entries()) {
        this.monthGrid.push({
          label: month,
          current:
            index === this.today.month() && this.year === this.today.year()
        });
      }
    },

    updateYearView() {
      this.decade = Math.floor(this.year / 10) * 10;
      this.yearGrid = [];
      for (const digit of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        const year = this.decade + digit;
        this.yearGrid.push({
          label: year,
          current: this.today.year() === year
        });
      }
    }
  }
};
</script>

<style lang="scss">
$cellDimension: 40;

.calendar-view {
  // nav buttons
  button {
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 4px 8px;
    outline: none;

    &:hover {
      background-color: #eee;
    }
  }

  &__page {
    color: #555;
    font-family: Roboto mono;
    font-size: 12px;
    font-weight: 400;
    width: $cellDimension * 7 + px;
  }

  &__cell {
    align-items: center;
    display: inline-flex;
    height: $cellDimension + px;
    justify-content: center;
    width: $cellDimension + px;

    & > span {
      align-items: center;
      cursor: pointer;
      display: flex;
      height: $cellDimension - 14 + px;
      justify-content: center;
      width: calc(100% - 14px);

      &.is-disabled {
        background-color: #eee;
        //border-bottom: 1px solid white;
        color: #aaa;
        cursor: not-allowed;
        height: $cellDimension + px;
        width: $cellDimension + px;
      }

      &.is-inactive {
        color: #aaa;
      }

      &.is-selected {
        background-color: red;
        border-radius: $cellDimension/2 + px;
        color: white;
      }

      &.is-current {
        color: red;
        font-weight: 700;

        &.is-selected {
          color: white;
        }
      }
    }

    &.span-2 {
      width: $cellDimension * 2 + px;
    }
    &.span-3 {
      width: $cellDimension * 3 + px;
    }
    &.span-3-5 {
      width: $cellDimension * 3.5 + px;
    }
    &.span-4 {
      width: $cellDimension * 4 + px;
    }
    &.span-5 {
      width: $cellDimension * 5 + px;
    }
  }
}
</style>

