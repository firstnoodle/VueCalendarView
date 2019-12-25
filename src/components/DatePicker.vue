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
        changeYear: "onChangeYear"
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
      this.currentPage = value;
    },
    onChangeYear(value) {
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
