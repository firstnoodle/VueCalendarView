<template>
  <table>
    <tbody>
      <tr>
        <td>
          <button @click="$emit('stepYear', -1)">&lt;&lt;</button>
        </td>
        <td>Year</td>
        <td>
          <button @click="$emit('stepYear', 1)">&gt;&gt;</button>
        </td>
      </tr>
      <tr>
        <td>
          <span @click="$emit('changeMonth', 0)">January</span>
        </td>
        <td>
          <span @click="$emit('changeMonth', 1)">February</span>
        </td>
      </tr>
      <tr>
        <td>
          <span @click="$emit('changeMonth', 2)">March</span>
        </td>
        <td>
          <span @click="$emit('changeMonth', 3)">April</span>
        </td>
      </tr>
      <tr>
        <td>
          <span @click="$emit('changeMonth', 4)">May</span>
        </td>
        <td>
          <span @click="$emit('changeMonth', 5)">June</span>
        </td>
      </tr>
      <tr>
        <td>
          <span @click="$emit('changeMonth', 6)">July</span>
        </td>
        <td>
          <span @click="$emit('changeMonth', 7)">August</span>
        </td>
      </tr>
      <tr>
        <td>
          <span @click="$emit('changeMonth', 8)">September</span>
        </td>
        <td>
          <span @click="$emit('changeMonth', 9)">October</span>
        </td>
      </tr>
      <tr>
        <td>
          <span @click="$emit('changeMonth', 10)">November</span>
        </td>
        <td>
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

<style>
</style>

