<template>
  <div style="height: 200px; width: 300px;">
    <button @click="handCheck_IoT()">IoT</button>
    <DashboardCard title="Biểu đồ doanh thu">   
        <DonutChart 
            :labels="['Số Còn lại','Số SX']"
            :data="[3000, 1200]"
            :colors="['#00BFFF', '#32CD32']"
        />         
    </DashboardCard>
  </div>
</template>

<script>
import DonutChart from '@/components/Chart/donutChart.vue'
import DashboardCard from '../controls/Cards/DashboardCard.vue';
import { mapActions, } from 'vuex';

export default {
  components: {
    DonutChart,
    DashboardCard
  },
  methods: {
    // moduleIoT is namespaced, so map or dispatch with its namespace
    ...mapActions([
        'invPosition_IoT'
    ]),
    handCheck_IoT() {
      console.log('IoT button clicked');
      // call namespaced action, either via mapped method or direct dispatch
      this.invPosition_IoT({ value: 'ID:49FF6E064988825541371667_IP:192.168.10.137' })
      // alternatively: this.$store.dispatch('moduleIoT/invPosition_IoT', { value: '...' });
    }
  }
}
</script>
<style scoped>

</style>

