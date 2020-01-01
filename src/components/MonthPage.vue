<template>
  <div class="date-picker__page">
    <nav>
      <div class="date-picker__row">
        <div class="date-picker__col">
          <button @click="$emit('stepYear', -1)">&lt;&lt;</button>
        </div>
        <div class="date-picker__col span-5">{{ year }}</div>
        <div class="date-picker__col">
          <button @click="$emit('stepYear', 1)">&gt;&gt;</button>
        </div>
      </div>
    </nav>
    <main>
      <div class="date-picker__row">
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 0)">January</span>
        </div>
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 1)">February</span>
        </div>
      </div>
      <div class="date-picker__row">
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 2)">March</span>
        </div>
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 3)">April</span>
        </div>
      </div>
      <div class="date-picker__row">
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 4)">May</span>
        </div>
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 5)">June</span>
        </div>
      </div>
      <div class="date-picker__row">
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 6)">July</span>
        </div>
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 7)">August</span>
        </div>
      </div>
      <div class="date-picker__row">
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 8)">September</span>
        </div>
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 9)">October</span>
        </div>
      </div>
      <div class="date-picker__row">
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 10)">November</span>
        </div>
        <div class="date-picker__col span-3-5">
          <span @click="$emit('changeMonth', 11)">December</span>
        </div>
      </div>
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

