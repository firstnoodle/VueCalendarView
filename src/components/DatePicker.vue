<template>
  <div class="date-picker">
    <component :is="currentPage" v-bind="currentProps" v-dynamic-events="knownEvents"/>
  </div>
</template>

<script>
import DatePage from "./DatePage.vue";
import MonthPage from "./MonthPage.vue";
import YearPage from "./YearPage.vue";

export default {
  name: "DatePicker",
  components: { DatePage, MonthPage, YearPage },
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
      currentPage: DatePage,
      dateGrid: [],
      month: null,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      selectedDate: null,
      today: null,
      weekStart: 1,
      year: null,
      weekdays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      knownEvents: {
        changeDate: "onChangeDate",
        changeMonth: "onChangeMonth",
        changePage: "onChangePage",
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
      if (this.currentPage.name === DatePage.name) {
        return {
          dateGrid: this.dateGrid,
          month: this.months[this.month],
          year: this.year,
          weekdays: this.weekdays.map((day, index) => {
            return this.weekdays[
              this.loopRange(index + this.weekStart, this.weekdays.length)
            ].slice(0, 3);
          })
        };
      }
      if (this.currentPage.name === MonthPage.name) {
        return {
          month: this.month,
          months: this.months,
          year: this.year
        };
      }
      if (this.currentPage.name === YearPage.name) {
        return {};
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

      let momentDate = moment.utc(this.value);
      this.month = momentDate.month();
      this.year = momentDate.year();

      this.updateDateGrid();
    },
    loopRange(index, length) {
      return ((index % length) + length) % length;
    },
    onChangeDate(value) {
      this.$emit("change", value);
    },
    onChangeMonth(value) {
      this.month = value;
      this.currentPage = DatePage;
      this.updateDateGrid();
    },
    onStepMonth(value) {
      const previousMonth = this.month;
      this.month = this.loopRange(this.month + value, this.months.length);
      const deltaMonths = previousMonth - this.month;
      if (Math.abs(deltaMonths) > 1) {
        if (deltaMonths >= 0) {
          this.year++;
        } else {
          this.year--;
        }
      }
      this.updateDateGrid();
    },
    onChangePage(value) {
      this.currentPage = this.$options.components[value];
    },
    onStepYear(value) {
      this.year += value;
      this.updateDateGrid();
    },
    moveRequest(direction) {
      console.log(direction);
      /*
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
      */
    },
    updateDateGrid() {
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
        : this.loopRange(
            dateCursor.day() - this.weekStart,
            this.weekdays.length
          );
      dateCursor.subtract(gridStartDate, "days");

      // clear dateGrid
      this.dateGrid = [];

      // populate grid
      for (let row = 0; row < 6; row++) {
        this.dateGrid.push([]);
        for (let col = 0; col < 7; col++) {
          this.dateGrid[row].push({
            label: dateCursor.date(),
            date: dateCursor.format(),
            disabled: this.options.disabledDate
              ? this.options.disabledDate(dateCursor)
              : false,
            inactive: dateCursor.month() !== this.month,
            selected: dateCursor.isSame(this.selectedDate, "day"),
            today: dateCursor.isSame(this.today, "day")
          });

          dateCursor.add(1, "days");
        }
      }
    }
  }
};
</script>

<style lang="scss">
$cellDimension: 40;

.date-picker {
  &__page {
    color: #555;
    font-family: Roboto mono;
    font-size: 12px;
    font-weight: 400;
  }

  &__row {
    height: $cellDimension + px;
    width: $cellDimension * 7 + px;
  }

  &__col {
    align-items: center;
    display: inline-flex;
    height: 100%;
    justify-content: center;
    width: $cellDimension + px;

    & > span {
      align-items: center;
      cursor: pointer;
      display: flex;
      height: $cellDimension - 14 + px;
      justify-content: center;
      width: $cellDimension - 14 + px;

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
        border-radius: 50%;
        color: white;
      }

      &.is-today {
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

