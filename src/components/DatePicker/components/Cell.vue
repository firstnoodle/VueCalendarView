<template>
  <div class="cell">{{ value }}</div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    value: {
      type: String | Number,
      required: true
    }
  }
};
</script>

