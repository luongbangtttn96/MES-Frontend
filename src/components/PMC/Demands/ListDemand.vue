<template>
  <div>
    <div class="col">
      <label>Grops:</label>
      <select class="form-control" multiple size="6" style="width: 100%">
        <option
          v-for="(item, index) in datalistDemand"
          :key="index"
          :value="item.PGP_ID"
          @click="handSelectDemand(item)"
        >
          <b
            ><span style="min-width: 30px"
              >{{ item.PDE_ID }}:  </span>
           </b
          > 
          {{item.START_DATE}} - {{item.SALESODER_CODE}} - {{ item.CUS_NAME }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      datalistDemand: [],
    };
  },
  props:{

  },
  methods: {
    ...mapActions(["getListDemand"]),
    handSelectDemand(demand){
      this.$emit("selectDemand", demand)
    }
  },
  created() {
    this.getListDemand().then((res) => {
      this.datalistDemand = res.datalistDemand;
    });
  },
};
</script>

<style>
</style>