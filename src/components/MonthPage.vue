<template>
  <div class="date-picker__page">
    <nav>
      <div class="date-picker__cell">
        <button @click="$emit('stepYear', -1)">&lt;&lt;</button>
      </div>
      <div class="date-picker__cell span-5">{{ year }}</div>
      <div class="date-picker__cell">
        <button @click="$emit('stepYear', 1)">&gt;&gt;</button>
      </div>
    </nav>
    <main>
      <div
        v-for="(month,index) in months"
        @click="$emit('changeMonth', index)"
        class="date-picker__cell span-3-5"
      >{{ month }}</div>
    </main>
  </div>
</template>

<script>
export default {
  name: "MonthPage",
  props: {
    month: {
      type: Number,
      required: true
    },
    months: {
      type: Array,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  }
};
</script>

