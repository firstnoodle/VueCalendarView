<template>
  <div class="date-picker__page">
    <nav class="date-picker__nav">
      <div class="date-picker__row">
        <div class="date-picker__col">
          <button @click="$emit('stepYear', -1)">&lt;&lt;</button>
        </div>
        <div class="date-picker__col">
          <button @click="$emit('stepMonth', -1)">&lt;</button>
        </div>
        <div class="date-picker__col span-3">
          <button @click="$emit('changePage', 'MonthPage')">{{ this.month }}</button>
          <button @click="$emit('changePage', 'YearPage')">{{ this.year }}</button>
        </div>
        <div class="date-picker__col">
          <button @click="$emit('stepMonth', 1)">&gt;</button>
        </div>
        <div class="date-picker__col">
          <button @click="$emit('stepYear', 1)">&gt;&gt;</button>
        </div>
      </div>
    </nav>
    <header>
      <div class="date-picker__row">
        <div class="date-picker__col" v-for="day in weekdays">{{ day }}</div>
      </div>
    </header>
    <main>
      <div class="date-picker__row" v-for="row in dateGrid">
        <div class="date-picker__col" v-for="col in row">
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
