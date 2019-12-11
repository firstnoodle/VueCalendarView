<template>
  <div class="grid">
    <cell :value="31"/>
  </div>
</template>

<script>
import Cell from "./Cell.vue";

export default {
  name: "Grid",
  components: { Cell }
};
</script>

<style lang="scss">
.grid {
  background-color: #eee;
  display: flex;
  width: 280px;
}
</style>

