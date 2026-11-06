<template>
  <div>
    <title-page :titlepage="'Kiểm soát sử dụng nguyên liệu dự kiến'" />
    <div class="row m-1 justify-content-between">
        <div>
            <label class="btn btn-sm" for="">Mã nguyên liệu</label>
            <input class="form-control-sm" type="text" size="20" maxlength="30" v-model="PART_NUM" @blur="handInfoSeriaMateralUser()" @keydown.enter="handInfoSeriaMateralUser()">
          
        </div>
        <div class="justify-content-lg-end">
            <button class="btn btn-sm" @click="handExportExel()" >export Excel</button>
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

<script>
import moment, { min } from 'moment';
import TitlePage from '../../../controls/TitlePage.vue'
import { mapActions } from 'vuex/dist/vuex.common.js';
import { exportData } from '../../../../plugins/Excel';
export default {
  components: { TitlePage },
    data(){
        return{
            PART_NUM:'',
            dataStocPart_num:[],
            dataMaterialOnWay:[],
            dataPlanUsePartNum_Porj:[],
            dataPlanUsePartNum_Porj_Ngay:[],
        }
    },
    computed:{
        dataSeriaMateralUser_Date(){
            let data=[], i=0,  Qty_WH=0
            data=this.dataPlanUsePartNum_Porj_Ngay.sort((a,b)=>{
                if (moment(a.DATE,'DD-MM-YYYY')<moment(b.DATE,'DD-MM-YYYY')) return -1
                else return 1
            })
            
            //console.log(data);
            // bổ sung tồn kho
            if (data.length> 0 && this.dataStocPart_num[0]) 
            {
                data[0].QTY_WH=this.dataStocPart_num[0].QTY 
                Qty_WH=this.dataStocPart_num[0].QTY 
            }
            // bổ sung nguyên liệu mua về
            this.dataMaterialOnWay.forEach(element => { 
                i=0;
                while (i< data.length && moment(element.EXP_RECEIVED_DATE,'DD-MM-YYYY')> moment(data[i].DATE,'DD-MM-YYYY')) {
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
        },
        
    },
    methods:{
        ...mapActions(['getStoc_PartNum','getPlanUsePartNum_Porj','getMaterial_OnWay_Part']),
        handExportExel() {
            exportData("Xlsx", "exportable_MaterialUse");
        },
        handInfoSeriaMateralUser(){
            
            this.pro_getStoc_PartNum()
            this.Pro_getPlanUsePartNum_Porj()
            this.pro_getMaterial_OnWay_Part()
        },
        pro_getMaterial_OnWay_Part(){
            let data ={PART_NUM: this.PART_NUM}
            this.getMaterial_OnWay_Part(data).then(res=>{
                this.dataMaterialOnWay=res.dataMaterialOnWay
            })
        },
        pro_getStoc_PartNum(){
            let data ={PART_NUM: this.PART_NUM}
            this.getStoc_PartNum(data).then(res=>{
                this.dataStocPart_num= res.dataStocPart_num
            })
        },
        Pro_getPlanUsePartNum_Porj(){
            let data ={PART_NUM: this.PART_NUM}
            this.getPlanUsePartNum_Porj(data).then(res=>{
                this.dataPlanUsePartNum_Porj=res.dataPlanUsePartNum_Porj
                this.dataPlanUsePartNum_Porj_Ngay=[]

                this.dataPlanUsePartNum_Porj.forEach(element => {
                    let i_ngay = moment(element.START_PRODUCT,'YYYY-MM-DD'),
                        Today= moment(moment().format('YYYY-MM-DD'),'YYYY-MM-DD'), 
                        End_date=moment(element.END_PRODUCT,'YYYY-MM-DD'),
                        QTY_MATERIAL=element.QTY_MATERIAL

                        console.log(Today,i_ngay);
                        
                        i_ngay= i_ngay>Today? i_ngay:Today

                    while (i_ngay<=End_date && QTY_MATERIAL>0) {
                        let row_day_Proj={}
                        row_day_Proj.DATE=i_ngay.format('DD-MM-YYYY')
                        row_day_Proj.PDD_ID=element.PDD_ID
                        row_day_Proj.NUM_WO=element.NUM_WO
                        row_day_Proj.PART_PROJ=element.PART_PROJ
                        row_day_Proj.PART_NUM=element.PART_NUM
                        row_day_Proj.USE=(element.BASE_QTY * element.QTY_PRO_DAY)>QTY_MATERIAL? QTY_MATERIAL:element.BASE_QTY * element.QTY_PRO_DAY
                        row_day_Proj.QTY_WH = 0
                        row_day_Proj.QTY_PO = 0
                        row_day_Proj.QTY_SUM = 0

                        this.dataPlanUsePartNum_Porj_Ngay.push(row_day_Proj)
                        QTY_MATERIAL=QTY_MATERIAL-element.BASE_QTY * element.QTY_PRO_DAY
                        i_ngay=i_ngay.add(1,'days')
                    }
                });
                //console.log(this.dataPlanUsePartNum_Porj_Ngay);                

            })
        }
    }
}
</script>

<style>

</style>