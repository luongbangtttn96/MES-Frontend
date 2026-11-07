<template>
  <div
    class="divrow"
    style=""
   
  >
    <lineHDRItem
      v-for="(item, index) in dataSchedurProLine[0]"
      :key="index"
      :data="item.LINE_CODE"
    />
  </div>
</template>

<script>
import lineHDRItem from "./CellHDRLine.vue";
export default {
  props: {
    dataSchedurProLine: {
      type: Array,
      default: null,
    },
  },
  components: {
    lineHDRItem,
  },
};
</script>

<style>
</style>