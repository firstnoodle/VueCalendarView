<template>
  <div class="date-picker__page">
    <nav class="date-picker__nav">
      <div class="date-picker__cell">
        <button @click="$emit('stepYear', -1)">&lt;&lt;</button>
      </div>
      <div class="date-picker__cell">
        <button @click="$emit('stepMonth', -1)">&lt;</button>
      </div>
      <div class="date-picker__cell span-3">
        <button @click="$emit('changePage', 'MonthPage')">{{ this.month }}</button>
        <button @click="$emit('changePage', 'YearPage')">{{ this.year }}</button>
      </div>
      <div class="date-picker__cell">
        <button @click="$emit('stepMonth', 1)">&gt;</button>
      </div>
      <div class="date-picker__cell">
        <button @click="$emit('stepYear', 1)">&gt;&gt;</button>
      </div>
    </nav>
    <header>
      <div class="date-picker__cell" v-for="day in weekdays">{{ day }}</div>
    </header>
    <main>
      <div class="date-picker__cell" v-for="col in dateGrid">
        <span
          @click="onDateClick(col)"
          :class="{ 
              'is-selected' : col.selected, 
              'is-disabled' : col.disabled, 
              'is-inactive' : col.inactive,
              'is-today' : col.today,
            }"
        >{{ col.label }}</span>
      </div>
    </main>
  </div>
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
