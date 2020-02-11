<template>
  <div class="date-picker__page">
    <nav>
      <div class="date-picker__cell">
        <button @click="$emit('stepYear', -10)">&lt;&lt;</button>
      </div>
      <div class="date-picker__cell span-5">{{ decade + ' - ' + (decade+9) }}</div>
      <div class="date-picker__cell">
        <button @click="$emit('stepYear', 10)">&gt;&gt;</button>
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
  name: "YearView",
  props: {
    decade: {
      type: Number,
      required: true
    },
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

