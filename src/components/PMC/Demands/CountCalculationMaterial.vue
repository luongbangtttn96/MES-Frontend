<template>
  <div class="ccm-page">
    <title-page :titlepage="'Tính nguyên liệu cho dự án:'" />

    <el-card shadow="never" class="ccm-info">
      <el-form label-position="top">
        <el-row :gutter="16">
          <el-col :xs="12" :sm="6">
            <el-form-item label="Dự án">
              <el-tag size="large" effect="plain">{{ ObjNhuCau.projec }}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-form-item label="Từ ngày">
              <el-date-picker
                v-model="ObjNhuCau.START_DEMANDS"
                type="date"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-form-item label="Số lượng">
              <el-input-number
                v-model="ObjNhuCau.QTY"
                :min="0"
                controls-position="right"
                style="width: 100%"
                @change="hand_changeQty()"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-form-item label="Ước SX">
              <el-statistic :value="uocsx" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="8" v-if="dataBomObjectProject.length">
          <el-col :xs="12" :sm="8" :md="6" v-for="item in dataBomObjectProject" :key="item.BOM_HDR_ID">
            <el-tag type="info" class="ccm-bom-tag">{{ item.BOM_NAME }}: <b>{{ item.min }}</b></el-tag>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <div class="ccm-toolbar">
      <el-button type="success" @click="handExportExel()">Export Excel</el-button>
    </div>

    <el-card shadow="never" :body-style="{ padding: 0 }">
      <el-table
        :data="dataMaterials"
        border
        stripe
        size="small"
        max-height="70vh"
        :header-cell-style="{ background: '#f5f7fa', textAlign: 'center' }"
      >
        <el-table-column type="index" label="STT" width="60" fixed />
        <el-table-column label="MÃ NL" min-width="190" fixed>
          <template #default="{ row, $index }">
            <el-checkbox v-model="row.checkUoc" @change="ProcUocSX($index, !!row.checkUoc)">
              {{ row.PART_NUM }}
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="PART_NAME" label="TÊN NL" min-width="200" show-overflow-tooltip />
        <el-table-column prop="QTY_UNIT" label="SL CƠ SỞ" width="90" align="right" />
        <el-table-column prop="UNIT" label="ĐƠN VỊ" width="80" />

        <el-table-column label="NGUYÊN LIỆU CẦN" align="center">
          <el-table-column label="SỐ NL" width="100" align="right">
            <template #default="{ row }">{{ formatQty(row.QTY) }}</template>
          </el-table-column>
          <el-table-column prop="QTY_WASTAGE" label="HAO HỤT" width="90" align="right" />
        </el-table-column>

        <el-table-column label="TỒN NL" align="center">
          <el-table-column prop="QTY_KHO" label="KHO" width="80" align="right" />
          <el-table-column prop="QTY_GIAONHAN" label="GIAO NHẬN" width="100" align="right" />
          <el-table-column prop="QTY_STOC" label="TỔNG" width="80" align="right" />
        </el-table-column>

        <el-table-column prop="QTY_ONWAY" label="ONWAY" width="80" align="right" />
        <el-table-column prop="QTY_PRODUC" label="NL THUỘC D/A Đ/SX" width="130" align="right" />
        <el-table-column prop="QTY_RESPONSE" label="SỐ ĐÁP ỨNG" width="110" align="right" />
        <el-table-column label="SỐ THIẾU" width="100" align="right" fixed="right">
          <template #default="{ row }">
            <span :class="{ 'ccm-short': row.SOTHIEU > 0 }">{{ row.SOTHIEU }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="EXP_RECEIVED_DATE" label="NGÀY DỰ KIẾN" width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import TitlePage from '@/components/controls/TitlePage.vue';
import { exportArrObject } from "@/plugins/Excel";

import { useBomStore } from "@/stores/bom.store";
import { usePMCStore } from "@/stores/PMC.store";

  interface ObjNhuCauType {
    id: number| string;
    projec: string;
    START_DEMANDS: string;
    END_DEMANDS: string;
    QTY: number ;
    UOC: number;
  }
  
const route = useRoute();
const bomStore = useBomStore();
const pmcStore = usePMCStore();


const ObjNhuCau = ref<ObjNhuCauType>({} as ObjNhuCauType),
      dataMaterials = ref<Record<string, any>[]>([]),
      dataBomObjectProject = ref<Record<string, any>[]>([]),
      dataStocMaterials = ref<Record<string, any>[]>([]),
      dataMateralChoDuAnDangSX = ref<Record<string, any>[]>([]),
      //showdataMaterials:[],
      STATUS = ref(true),
      isSaveTon = ref(false),
      isSaveMateria_DangSX = ref(false),
      isSaveMaterialDemand = ref(false),
      irhcode = ref(null),
      irhIdERP = ref(null),
      uocsx = ref(0),
      showIc = ref('+');

const page = ref(1)
const perPage = ref(10)

// computed properties for pagination and filtering
const pagedData = computed((): Record<string, any>[] => {
      const start = (page.value - 1) * perPage.value;
      return (dataMaterials.value || []).slice(start, start + perPage.value);
    });

 //    methods: {
      // ...mapActions([
      //   'getdataBomObjectProject',
      //   'getTongHopTonKhoMaterial_Proj',
      //   'getMateralChoDuAnDangSX_Proj',
      // ]),   
const handExportExel = () => {
       exportArrObject("Xlsx", dataMaterials.value.map((it, i) => ({
         STT: i + 1,
         "MÃ NL": it.PART_NUM,
         "TÊN NL": it.PART_NAME,
         "SL CƠ SỞ": it.QTY_UNIT,
         "ĐƠN VỊ": it.UNIT,
         "SỐ NL": formatQty(it.QTY),
         "HAO HỤT": it.QTY_WASTAGE,
         "KHO": it.QTY_KHO,
         "GIAO NHẬN": it.QTY_GIAONHAN,
         "TỔNG": it.QTY_STOC,
         "ONWAY": it.QTY_ONWAY,
         "NL THUỘC D/A Đ/SX": it.QTY_PRODUC,
         "SỐ ĐÁP ỨNG": it.QTY_RESPONSE,
         "SỐ THIẾU": it.SOTHIEU,
         "NGÀY DỰ KIẾN": it.EXP_RECEIVED_DATE,
       })));
    };
const formatQty = (qty: number) =>
      Number.isInteger(Number(qty)) ? qty : Number(qty).toFixed(5)
const hand_changeQty = () => {
        //console.log(this.ObjNhuCau);
        dataMaterials.value = Pro_dataMaterialsShow();
      };
const ProcUocSX= (i: number,check: boolean) => {
        dataMaterials.value[i].checkUoc=check
        Proc_UOCSP()
        Proc_UOCBTP()
      };
const Proc_UOCSP = () => {
        let min=1000000000000
        dataMaterials.value.forEach(element=>{  
          if (element.QTY_UNIT>0)        
            if(  element.checkUoc==true && element.Proc_SX <min ) 
                  min=element.Proc_SX

        })
        //console.log(element.QTY_RESPONSE,element.QTY_UNIT, min, element.PART_NUM);
        uocsx.value=min
      };

const Proc_UOCBTP = () => {
        let jsdata= JSON.stringify(dataMaterials.value);
        let data= [...JSON.parse(jsdata)]
        //console.log(data);
        dataBomObjectProject.value.forEach(element=>{
          let min=1000000000
          element.BOMDTL.forEach((item: Record<string, any>)=>{
            data.forEach((el)=>{
              if(item.QTY_UNIT>0 && el.PART_NUM==item.PART_NUM && el.checkUoc==true){
                let n=Math.min(item.QTY_UNIT* ObjNhuCau.value.QTY, el.QTY_RESPONSE)
                min= Math.min(min,Math.floor(n/item.QTY_UNIT))   
                //console.log(n,min);
                el.QTY_RESPONSE=el.QTY_RESPONSE-n
              }
            })
          })
          if ( min==1000000000){min=0}
          element.min=min
 //         console.log(element);
        })
      };

const Pro_dataMaterialsShow = () => {
        let data: Record<string, any>[]=[]
        dataBomObjectProject.value.forEach(element=>{
          let jsdata= JSON.stringify(element.BOMDTL);
          data=[...data,...JSON.parse(jsdata)]
        })
        let partNums: string[] = [], dt: Record<string, any>[]=[]
        uocsx.value=1000000000
        data.forEach(element=>{
          if (partNums.includes(element.PART_NUM)== false){
            partNums.push(element.PART_NUM)
            
            let d=data.filter(item=>{return item.PART_NUM==element.PART_NUM})
            let QTY_UNIT=0.0
            d.forEach(it=>{ 
              
              
              QTY_UNIT=QTY_UNIT+ it.QTY_UNIT
              //console.log(it.PART_NUM, it.QTY_UNIT, QTY_UNIT);
            
            })
            element.QTY_UNIT= QTY_UNIT 
            let QTY=QTY_UNIT*ObjNhuCau.value.QTY
            element.QTY=QTY //Math.ceil(QTY,3)
            let WASTAGE=Math.round(element.WASTAGE_RATE*QTY_UNIT*ObjNhuCau.value.QTY)
            if(QTY<100) {element.QTY_WASTAGE=element.WASTAGE_100 || WASTAGE}
            else { if (QTY<1000){element.QTY_WASTAGE=element.WASTAGE_1000 || WASTAGE }
                   else { if (QTY<1000){element.QTY_WASTAGE=element.WASTAGE_1000 || WASTAGE}
                          else {element.QTY_WASTAGE= WASTAGE}
                        } 
                  }    

            d=dataMateralChoDuAnDangSX.value.filter(item=>{return item.PART_NUM==element.PART_NUM})
            let QTY_PRODUC=0
            d.forEach(it=>{ QTY_PRODUC=QTY_PRODUC+ it.remains})

            d=dataStocMaterials.value.filter(item=>{return item.PART_NUM==element.PART_NUM})
            let QTY_STOC=0, QTY_KHO=0, QTY_GIAONHAN=0
            d.forEach(it=>{ 
              QTY_STOC=QTY_STOC+ it.QTY;
              QTY_KHO=QTY_KHO+ it.QTY_KHO;
              QTY_GIAONHAN= QTY_GIAONHAN + it.QTY_GIAONHAN
            })
            //console.log(QTY_GIAONHAN)
            element.QTY_STOC=QTY_STOC
            element.QTY_KHO=QTY_KHO
            element.QTY_GIAONHAN=QTY_GIAONHAN
            element.QTY_PRODUC=QTY_PRODUC

            
            let QTY_RESPONSE=QTY_STOC - QTY_PRODUC
            element.QTY_RESPONSE=QTY_RESPONSE<0?0:QTY_RESPONSE
            element.SOTHIEU=(QTY + element.QTY_WASTAGE - QTY_RESPONSE)>0? Math.ceil(QTY + element.QTY_WASTAGE - QTY_RESPONSE): 0
            element.checkUoc = !element.PART_NUM.includes('PGC')
            // Chỉ tính ước SX khi có định mức, tránh chia cho 0 (NaN/Infinity)
            if (element.QTY_UNIT>0) {
              element.Proc_SX=Math.floor(element.QTY_RESPONSE/element.QTY_UNIT)
              if (element.checkUoc && element.Proc_SX<uocsx.value)
                uocsx.value=element.Proc_SX
            }
            dt.push(element)
            //console.log(element);
          }
        })
        // sắp xếp mảng
        dt.sort((el1, el2)=>{
          return el2.SOTHIEU- el1.SOTHIEU
        })
        return dt
      };
const Pro_getMateralChoDuAnDangSX_Proj = async () => {
        let data={
          PROJ_CODE:ObjNhuCau.value.projec as string
        }
        const res= await pmcStore.getMateralChoDuAnDangSX_Proj(data)
        dataMateralChoDuAnDangSX.value=res.dataMateralChoDuAnDangSX
        dataMaterials.value=Pro_dataMaterialsShow()
      }

const Pro_getTongHopTonKhoMaterial_Proj = async () => {
        let data={
          PROJ_CODE:ObjNhuCau.value.projec as string
        }
        const res = await pmcStore.getTongHopTonKhoMaterial_Proj(data)
        dataStocMaterials.value= res.dataStocMaterials
        dataMaterials.value=Pro_dataMaterialsShow()
      }
const Pro_getdataBomObjectProject = async () => {
        let data={
          PROJ_CODE:ObjNhuCau.value.projec as string
        }
        const res = await bomStore.getdataBomObjectProject(data)   
        dataBomObjectProject.value=res.dataBomObjectProject
        dataMaterials.value=Pro_dataMaterialsShow()

      }
const Pro_GetMateralMuadu_onway = async () => {
        const res = await pmcStore.getMateralMuadu_onway({ id: ObjNhuCau.value.id })
        dataMaterials.value.forEach((element, i) => {
          if (dataMaterials.value[i].rn == 1) {
            let data = res.dataMateralMuadu_onway.filter(
              (vattu: Record<string, any>) => vattu.PART_NUM == dataMaterials.value[i].PART_NUM
            );
            dataMaterials.value[i].QTY_ONWAY = data[0] ? data[0].QTY_ONWAY : 0;
          }
        });

      }

  onMounted( async () => {
      ObjNhuCau.value.id=Number(route.query.id)
      ObjNhuCau.value.projec=route.query.projec as string
      ObjNhuCau.value.START_DEMANDS=route.query.Start as string
      ObjNhuCau.value.END_DEMANDS=route.query.end as string
      ObjNhuCau.value.QTY=Number(route.query.qty)
      ObjNhuCau.value.UOC=0
      await Pro_getdataBomObjectProject()
      await Pro_getTongHopTonKhoMaterial_Proj()
      await Pro_getMateralChoDuAnDangSX_Proj()

  })

</script>

<style scoped>
.ccm-page { padding: 12px; }
.ccm-info { margin-bottom: 12px; }
.ccm-info :deep(.el-form-item) { margin-bottom: 8px; }
.ccm-bom-tag { margin-bottom: 6px; }
.ccm-toolbar { margin-bottom: 10px; }
.ccm-short { color: var(--el-color-danger); font-weight: bold; }
</style>
