<template>
  <div>
    <title-page :titlepage="'Lịch mua nguyên liệu:'" />
    <div class="tableFixHead" style="height: 95vh">
          <table class="table " id="exportable_DeNghiMuaHang">
            <thead>
              <th>STT</th>
              <th>Mã nguyên liệu</th>
              <th>Tên nguyên liệu</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
              <th>Stock</th>
              <th>OnWay</th>
              <th>Req Produc</th>
              <th>Lead time</th>
              <th>Số Y/C</th>
              <th>DK Ngày đặt</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataDateForecastPO_material" :key="index">
                <td>{{ index + 1 }}</td>
                <td > <div class="contro_hand">
                      {{ item.PART_NUM }}
                      </div>
                  
                  </td>
                <td>{{ item.PART_NAME }}</td>
                <td>{{ item.UNIT }}</td>
                <td>{{ item.QTY }}</td>
                <td>{{ item.QTY_STOC }}</td>
                <td>{{ item.QTY_ONWAY }}</td>
                <td>{{ item.QTY_PRODUC }}</td>
                <td>{{ item.LEADTIME }}</td>
                <td>{{item.QTY_PO}}</td>
                <td>{{item.PROPOSED_DATE_PO}} </td>
              </tr>
            </tbody>
          </table>
        </div>
    {{route.query.END_DATE}}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePMCStore } from '@/stores/PMC.store'
import { useRoute } from 'vue-router'

import TitlePage from '@/components/controls/TitlePage.vue'


const pmcStore = usePMCStore()
const route = useRoute()

const dataDateForecastPO_material = ref<Record<string, any>[]>([])


  onMounted(async () => {
    let data={
        PDE_ID:route.query.id,
        END_DEMANDS:route.query.END_DATE
    }
    const res = await pmcStore.getDateForecastPO_material(data)
    dataDateForecastPO_material.value=res.dataDateForecastPO_material
  })
</script>

<style>

</style>