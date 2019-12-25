<template>
  <table>
    <tbody>
      <tr>
        <td>
          <button @click="$emit('changeYear', -1)">&lt;&lt;</button>
        </td>
        <td>
          <button @click="$emit('changeMonth', -1)">&lt;</button>
        </td>
        <td colspan="3">
          <button @click="$emit('changePage', 'MonthPage')">{{ this.month }}</button>
          <button @click="$emit('changePage', 'YearPage')">{{ this.year }}</button>
        </td>
        <td>
          <button @click="$emit('changeMonth', 1)">&gt;</button>
        </td>
        <td>
          <button @click="$emit('changeYear', 1)">&gt;&gt;</button>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td v-for="day in weekdays">{{ day }}</td>
      </tr>
    </tbody>
    <tbody>
      <tr v-for="row in dateGrid">
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
</template>

<script>
export default {
  name: "DatePage",
  props: {
    dateGrid: {
      type: Array,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    weekdays: {
      type: Array,
      required: true
    }
  },
  methods: {
    onDateClick(date) {
      if (!date.disabled) {
        this.$emit("changeDate", date.date);
      }
    }
  }
};
</script>

<style lang="scss">
$cellDimension: 40px;

.date-picker {
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


