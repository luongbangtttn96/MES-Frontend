<template>
  <div>
    <title-page :titlepage="'Kiểm soát sử dụng nguyên liệu dự kiến'" />
    <div class="row m-1 justify-content-between">
        <div>
            <label class="btn btn-sm" for="">Mã nguyên liệu</label>
            <el-input class="form-control-sm" type="text" size="20" maxlength="30" v-model="PART_NUM" @blur="handInfoSeriaMateralUser()" @keydown.enter="handInfoSeriaMateralUser()">
            </el-input>          
        </div>
        <div class="justify-content-lg-end">
            <el-button class="btn btn-sm" @click="handExportExel()" >export Excel</el-button>
        </div>
    </div>
    <div class="tableFixHead" style="height: 95vh;">
        <table class="table" id="exportable_MaterialUse">
            <thead>
                <tr>
                    <th rowspan="2">Ngày</th>
                    <th  rowspan="2">ID</th>
                    <th rowspan="2">PROJ PART</th>
                    <th rowspan="2">PART NUM</th>
                    <th rowspan="2"> Số sử dụng</th>
                    <th colspan="3">Số lượng</th>

                </tr>
                <tr>
                    <th>Tồn Kho</th>
                    <th>Open PO</th>
                    <th>Tồn</th>   
                </tr>   
            </thead>
            <tbody>
                <tr v-for="(item, index) in dataSeriaMateralUser_Date" :key="index">
                    <td>{{ item.DATE }}</td>
                    <td>{{ item.PDD_ID }}</td>
                    <td>{{ item.PART_PROJ }}</td>
                    <td>{{ item.PART_NUM }}</td>
                    <td>{{ item.USE }}</td>
                    <td>{{ item.QTY_WH }}</td>
                    <td>{{ item.QTY_PO }}</td>
                    <td>{{ item.QTY_SUM }}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

import { ref, computed } from 'vue';
import { exportData } from '@/plugins/Excel';
import { useInvStore } from '@/stores/inv.store'
import { usePMCStore } from '@/stores/PMC.store'

import TitlePage from '@/components/controls/TitlePage.vue'

const invStore = useInvStore()
const pmcStore = usePMCStore()

const PART_NUM = ref('')
const dataStocPart_num = ref<Record<string, any>[]>([])
const dataMaterialOnWay = ref<Record<string, any>[]>([])
const dataPlanUsePartNum_Porj = ref<Record<string, any>[]>([])
const dataPlanUsePartNum_Porj_Ngay = ref<Record<string, any>[]>([])

//    computed:{
const dataSeriaMateralUser_Date = computed(() => {
            let data=[], i=0,  Qty_WH=0
            data=dataPlanUsePartNum_Porj_Ngay.value.sort((a,b)=>{
                if (dayjs(a.DATE,'DD-MM-YYYY')<dayjs(b.DATE,'DD-MM-YYYY')) return -1
                else return 1
            })
            
            //console.log(data);
            // bổ sung tồn kho
            if (data.length> 0 && dataStocPart_num.value[0]) 
            {
                data[0].QTY_WH=dataStocPart_num.value[0].QTY 
                Qty_WH=dataStocPart_num.value[0].QTY 
            }
            // bổ sung nguyên liệu mua về
            dataMaterialOnWay.value.forEach(element => { 
                i=0;
                while (i< data.length && dayjs(element.EXP_RECEIVED_DATE,'DD-MM-YYYY')> dayjs(data[i].DATE,'DD-MM-YYYY')) {
                    i++
                }
                
                if (i<data.length)
                {
                    data[i].QTY_PO=element.QTY
                    console.log('i',i);
                }
                else
                {
                    let dt={
                        DATE:element.EXP_RECEIVED_DATE,
                        PART_NUM:element.PART_NUM,
                        USE:0,
                        QTY_WH : 0,
                        QTY_PO: element.QTY,
                        QTY_SUM : 0,
                    }
                    data.push(dt)
                }
            });
            // tính nguyên liệu
            i=0
           
            while (i< data.length) {
                data[i].QTY_WH=Qty_WH
                Qty_WH=data[i].QTY_WH + data[i].QTY_PO -data[i].USE
                data[i].QTY_SUM=Qty_WH
                i++
            }
            return data
        })
//    methods:{
const handExportExel = () => {
            exportData("Xlsx", "exportable_MaterialUse");
        }
const handInfoSeriaMateralUser = async () => {
            
            await pro_getStoc_PartNum()
            await Pro_getPlanUsePartNum_Porj()
            await pro_getMaterial_OnWay_Part()
        }
const pro_getMaterial_OnWay_Part = async () => {
            let data ={PART_NUM: PART_NUM}
            const res= await pmcStore.getMaterial_OnWay_Part(data)
                dataMaterialOnWay.value=res.dataMaterialOnWay

        }
const pro_getStoc_PartNum = async () => {
            let data ={PART_NUM: PART_NUM}
            const res= await invStore.getStoc_PartNum(data)
            dataStocPart_num.value= res.dataStocPart_num
        }
const Pro_getPlanUsePartNum_Porj = async () => {
            let data ={PART_NUM: PART_NUM}
            const res= await pmcStore.getPlanUsePartNum_Porj(data)
                dataPlanUsePartNum_Porj.value=res.dataPlanUsePartNum_Porj
                dataPlanUsePartNum_Porj_Ngay.value=[]

                dataPlanUsePartNum_Porj.value.forEach(element => {
                    let i_ngay = dayjs(element.START_PRODUCT,'YYYY-MM-DD'),
                        Today= dayjs(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'), 
                        End_date=dayjs(element.END_PRODUCT,'YYYY-MM-DD'),
                        QTY_MATERIAL=element.QTY_MATERIAL

                        //console.log(Today,i_ngay);
                        
                        i_ngay= i_ngay>Today? i_ngay:Today

                    while (i_ngay<=End_date && QTY_MATERIAL>0) {
                        let row_day_Proj={
                            DATE: '',
                            PDD_ID: 0,
                            NUM_WO: '',
                            PART_PROJ: '',
                            PART_NUM: '',
                            USE: 0,
                            QTY_WH: 0,
                            QTY_PO: 0,
                            QTY_SUM: 0
                        }
                        row_day_Proj.DATE=i_ngay.format('DD-MM-YYYY')
                        row_day_Proj.PDD_ID=element.PDD_ID
                        row_day_Proj.NUM_WO=element.NUM_WO
                        row_day_Proj.PART_PROJ=element.PART_PROJ
                        row_day_Proj.PART_NUM=element.PART_NUM
                        row_day_Proj.USE=(element.BASE_QTY * element.QTY_PRO_DAY)>QTY_MATERIAL? QTY_MATERIAL:element.BASE_QTY * element.QTY_PRO_DAY
                        row_day_Proj.QTY_WH = 0
                        row_day_Proj.QTY_PO = 0
                        row_day_Proj.QTY_SUM = 0

                        dataPlanUsePartNum_Porj_Ngay.value.push(row_day_Proj)
                        QTY_MATERIAL=QTY_MATERIAL-element.BASE_QTY * element.QTY_PRO_DAY
                        i_ngay=i_ngay.add(1,'days')
                    }
                })
        }
                //console.log(this.dataPlanUsePartNum_Porj_Ngay);                



</script>

<style>

</style>