<template>
  <div class="ee-date-picker">
    <table>
      <tbody>
        <tr>
          <td>
            <button @click="changeYear(-1)">&lt;&lt;</button>
          </td>
          <td>
            <button @click="changeMonth(-1)">&lt;</button>
          </td>
          <td colspan="3">
            <button @click="showTable('months')">{{ this.months[this.month] }}</button>
            <button @click="showTable('years')">{{ this.year }}</button>
          </td>
          <td>
            <button @click="changeMonth(1)">&gt;</button>
          </td>
          <td>
            <button @click="changeYear(1)">&gt;&gt;</button>
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td
            v-for="(day,index) in weekdays"
          >{{ weekdays[loopRange(index+weekStart, weekdays.length)].slice(0,3) }}</td>
        </tr>
      </tbody>
      <tbody>
        <tr v-for="row in calendarGrid">
          <th v-for="col in row">
            <span
              @click="onDateClick(col)"
              :class="{ 
                'is-selected' : col.selected, 
                'is-disabled' : col.disabled, 
                'is-inactive' : col.inactive,
                'is-today' : col.today,
              }"
            >{{ col.label }}</span>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const loopRange = (index, length) => ((index % length) + length) % length;

export default {
  name: "eeDatePicker",
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
      calendarGrid: [],
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
      weekdays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      weekStart: 1,
      year: null
    };
  },
  created() {
    this.today = moment().utc();
    this.updateGrid();
  },
  watch: {
    value(newDate, oldDate) {
      this.updateGrid();
    }
  },
  methods: {
    loopRange,

    changeMonth(value) {
      console.log(value);
    },

    changeYear(value) {
      console.log(value);
    },

    onDateClick(date) {
      if (!date.disabled) {
        this.$emit("change", date.date);
      }
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
    },

    showTable(type) {
      console.log(type);
    },

    updateGrid() {
      this.selectedDate = moment.utc(this.value);
      this.year = this.selectedDate.year();
      this.month = this.selectedDate.month();

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
        : loopRange(dateCursor.day() - this.weekStart, this.weekdays.length);
      dateCursor.subtract(gridStartDate, "days");

      this.calendarGrid = [];
      // populate grid
      for (let row = 0; row < 6; row++) {
        this.calendarGrid.push([]);
        for (let col = 0; col < 7; col++) {
          this.calendarGrid[row].push({
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
$cellDimension: 40px;

.ee-date-picker {
  & > table {
    border-collapse: collapse;
    border: none;
  }
  & tbody,
  & thead {
    color: #555;
    font-family: Roboto mono;
    font-size: 12px;
    font-weight: 400;
  }

  & th,
  & td {
    border: none;
    font-weight: normal;
    height: $cellDimension;
    padding: 0;
    text-align: center;
    width: $cellDimension;

    & > span {
      align-items: center;
      cursor: pointer;
      display: flex;
      height: 100%;
      justify-content: center;
      width: 100%;

      &.is-disabled {
        background-color: #eee;
        color: #aaa;
        cursor: not-allowed;
      }

      &.is-inactive {
        color: #aaa;
      }

      &.is-selected {
        background-color: red;
        border: 4px solid white;
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
  }
}
</style>


