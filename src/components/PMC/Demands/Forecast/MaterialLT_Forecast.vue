<template>
    <div>
        <b-tabs>
            <b-tab title="Tông Hợp">            
                <title-page :titlepage="'Lịch mua nguyên liệu Leadtime >90 ngày:'" />
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
                        <tr v-for="(item, index) in dataDateForecastPO_materialLT" :key="index">
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
            </b-tab>
            <b-tab  title='Chi tiết'>
                <div class="tableFixHead" style="height: 95vh;">
                    <div class="ml-0 p-1">
                        <label>Mã nguyên liệu</label>
                        <input type="text" size="15" maxlength="30" v-model="PART_NUM">
                    </div>
                    <table class="table " id="exportable_DeNghiMuaHang">
                        <thead>
                            <tr>
                                <th rowspan="2">STT</th>                                
                                <th rowspan="2">Mã PROJ</th>     
                                <th rowspan="2">Mã nguyên liệu</th>
                                <th rowspan="2">Tên nguyên liệu</th>
                                <th colspan="2">Thời gian SD</th>
                                <th rowspan="2">Đơn vị</th>
                                <th rowspan="2">Số lượng</th>
                                <th rowspan="2">Stock</th>
                                <th rowspan="2">OnWay</th>
                                <th rowspan="2">Req Produc</th>
                                <th rowspan="2">Lead time</th>
                                <th rowspan="2">Số Y/C</th>
                                <th rowspan="2">DK Ngày đặt</th>
                            </tr>
                            <tr>
                                <th>Start</th>
                                <th>End</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in Show_dataDateForecastPO_materialLT_Detail" :key="index">
                            <td>{{ index + 1 }}</td>                            
                            <td>{{ item.PRO_PART }}</td>                            
                            <td > <div class="contro_hand">
                                    {{ item.PART_NUM }}
                                    </div>                                
                                </td>
                            <td>{{ item.PART_NAME }}</td>
                            <td>{{ item.START_PRODUCT }}</td>
                            <td>{{ item.END_DEMANDS }}</td>
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
            </b-tab>
        </b-tabs>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import TitlePage from '@/components/controls/TitlePage.vue'
  import { useRoute } from 'vue-router'
  

  import { usePMCStore } from '@/stores/PMC.store'


  const dataDateForecastPO_materialLT = ref<Record<string, any>[]>([])
  const dataDateForecastPO_materialLT_Detail = ref<Record<string, any>[]>([])
  const PART_NUM = ref('')
  const pmcStore = usePMCStore()
  const route = useRoute()

//    computed:{
const  Show_dataDateForecastPO_materialLT_Detail= computed(() => {
    if (PART_NUM.value=='') return dataDateForecastPO_materialLT_Detail.value
    return dataDateForecastPO_materialLT_Detail.value.filter((item)=>{ return item.PART_NUM==PART_NUM.value })
})

//    methods:{

    onMounted(async () => {
      let data={
          PDE_ID:route.query.id,
          DATE_FORECAST:route.query.DATE_FORECAST
      }
      pmcStore.getDateForecastPO_materialLT(data).then(res=>{
          dataDateForecastPO_materialLT.value=res.dataDateForecastPO_materialLT
      })
      const res= await pmcStore.getDateForecastPO_materialLT_Detail(data)
        console.log(res.dataDateForecastPO_materialLT_Detail);
        
        dataDateForecastPO_materialLT_Detail.value=res.dataDateForecastPO_materialLT_Detail
    })
  
  </script>
  
  <style>
  
  </style>