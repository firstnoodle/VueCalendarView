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
        v-for="year in yearGrid"
        @click="$emit('changeYear', year.label)"
        class="date-picker__cell span-3-5"
      >
        <span :class="{ 'is-selected': year.selected, 'is-current': year.current }">{{ year.label }}</span>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "YearPage",
  props: {
    year: {
      type: Number,
      required: true
    },
    yearGrid: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
</style>

