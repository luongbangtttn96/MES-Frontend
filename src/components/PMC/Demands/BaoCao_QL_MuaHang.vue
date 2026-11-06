<template>
  <div>
    <div class="row m-1">
      <label for="">Từ ngày:</label>
      <input type="month" name="" id="" v-model="v_StartDate" />
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      v_StartDate: moment().format("YYYY-MM"),
    };
  },
};
</script>

<style>
</style>