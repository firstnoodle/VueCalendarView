<template>
  <table class="month-page">
    <tbody>
      <tr>
        <td colspan="1">
          <button @click="$emit('stepYear', -1)">&lt;&lt;</button>
        </td>
        <td colspan="1">Year</td>
        <td colspan="1">Year</td>
        <td colspan="1">
          <button @click="$emit('stepYear', 1)">&gt;&gt;</button>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span @click="$emit('changeMonth', 0)">January</span>
        </td>
        <td colspan="2">
          <span @click="$emit('changeMonth', 1)">February</span>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span @click="$emit('changeMonth', 2)">March</span>
        </td>
        <td colspan="2">
          <span @click="$emit('changeMonth', 3)">April</span>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span @click="$emit('changeMonth', 4)">May</span>
        </td>
        <td colspan="2">
          <span @click="$emit('changeMonth', 5)">June</span>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span @click="$emit('changeMonth', 6)">July</span>
        </td>
        <td colspan="2">
          <span @click="$emit('changeMonth', 7)">August</span>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span @click="$emit('changeMonth', 8)">September</span>
        </td>
        <td colspan="2">
          <span @click="$emit('changeMonth', 9)">October</span>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span @click="$emit('changeMonth', 10)">November</span>
        </td>
        <td colspan="2">
          <span @click="$emit('changeMonth', 11)">December</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "MonthPage"
};
</script>

