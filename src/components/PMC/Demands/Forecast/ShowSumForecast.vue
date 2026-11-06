<template>
    <div v-loading="Show_busy" :element-loading-text="textMasage">
        <div class="forecast-toolbar">
            <div class="forecast-actions">
                <el-button size="small" @click="handloadExceldataForecast()" >Up forecast</el-button>
                <el-button size="small" @click="handloadExceldataDTLForecast()" >Up DTL forecast</el-button>
                <el-button size="small" type="primary" @click="hand_saveItemForcast()">Lưu Forecast</el-button>
                <el-button size="small" @click="hand_IniForecast()">Khởi tạo forecast</el-button>
                <el-button size="small" type="success" @click="hand_TinhAllForecast()">Tính toán all ForeCast</el-button>
                <el-button size="small" @click="hand_getPartLT_Forecast()">Báo cáo NL L/T dài</el-button>
            </div>
            <div class="forecast-summary">
               Num Forecast: <b>{{ Num_forecast }}</b> &nbsp;|&nbsp; CS(Sum): <b>{{ sum_PCS }}</b>
            </div>
            <input class="input-file" ref="fileInput" type="file" style="display: none" @change="exportDataForecast"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        </div>
        <div id="Table_DTLForcast" v-if="isExceldataDTLForecast==true" class="tableFixHead" style="width: 100%; height: 95vh; " @scroll="handScrollforcastDTL($event)">
            <table class="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>PO_CODE</th>
                        <th>Mã (Part Num)</th>
                        <th>QTY</th>
                        <th>Ngày Nhận</th>
                        <th>Ngày Giao</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr id="startRow" :style="{height: `${scroll_DTLFocast.firstRowHeight}px`}"></tr> -->
                    <tr v-for="(item,index) in excel_dataforecast" :key="index" :class="item.isPartNum==false?'mauNenDo':''">
                        <td>{{ index + 1  }}</td>
                        <td>{{ item.PO_CODE }}</td>
                        <td> {{item.PART_NUM}}</td>
                        <td>{{ item.QTY }}</td>
                        <td>{{ item.START_DEMANDS }}</td>
                        <td>{{ item.END_DEMANDS }}</td>
                    </tr>
                    <!-- <tr id="endRow" :style="{height: `${scroll_DTLFocast.lastRowHeight-36}px`}"></tr> -->
                </tbody>
            </table>
        </div>   
        <div v-if="isExceldataDTLForecast==false" class="tableFixHead" style="width: 100%; height: 95vh;">
            <table class="table">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th v-for="(item, index) in data_colum" :key="index" class="text-truncate">
                            <a class="nut_congcu" @dblclick="handtinhForecast_Colomn(item)" >{{item}}</a> 
                            <a class="btn" @click="handshowForm_DateForecastPO_materia(item)"> &#128221; </a>
                        </th>
                    </tr>
                    <tr>
                        <th v-for="(it,i) in dataMatrix_forecast[0]"  :key="i">
                            {{it}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in dataMatrix_forecast" :key="index">
                        <td v-for="(it,i) in item" :key="i" @dblclick="handtinhForecast_Cel(String(i),item.PART_NUM,it)" >
                            {{it}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed, nextTick, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import { exportDataExcel_to_Arr} from '@/plugins/Excel'

import { usePMCStore } from '@/stores/PMC.store';
import { useBomStore } from '@/stores/bom.store';
import { fa } from 'element-plus/es/locales.mjs';

interface itemForcast {
    PDE_ID?: unknown,
    PO_CODE?: string,
    PART_NUM: string,
    START_DEMANDS: string,
    END_DEMANDS: string,
    QTY: number,
    tinhForecast?: boolean,
    x?: number,
    y?: number
}

const route = useRoute();
const pmcStore = usePMCStore();
const bomStore = useBomStore();

const excel_dataforecast = ref<Record<string, any>[]>([]);
const dataforecast = ref<Record<string, any>[]>([]);
///const PDE_ID = ref(route.query.id);
const datametric_mau = ref<Record<string, any>[]>([]);
//const Colum_name = ref([]);
const n_cel = ref(1);
//const Curren_END_DATE = ref(null);
//const Arr_END_DATE = ref([]);
const DATE_FORECAST = ref(dayjs().format('YYYY-MM-DD'));

//const dataDTLforecast = ref([]);
const isExceldataDTLForecast = ref(false);

const Show_busy = ref(false);
const textMasage = ref('tính toán');

const fileInput = ref<HTMLInputElement | null>(null);

const scroll_DTLFocast = ref({
    step:30,
    height:0,
    tableHeight:0,
    rowHeight:33,
    startRow:0,
    firstRowHeight: 0,
    lastRowHeight: 0,
    element_id:'Table_DTLForcast',
});
const Num_forecast = ref(0);
const sum_PCS = ref(0);

// Computed
// const showdataDTLforecast = computed(() => {            
//     let data = excel_dataforecast.value.slice(scroll_DTLFocast.value.startRow, scroll_DTLFocast.value.startRow + scroll_DTLFocast.value.step)             
//     return data
// });
const dataMatrix_forecast = computed(() => {
    let data = [...excel_dataforecast.value, ...dataforecast.value]

    datametric_mau.value = create2DMatrix_Mau(data)
    console.log('dataMatrix_forecast',data, datametric_mau.value);
    
    return data
});
const data_colum = computed(() => {
    let data: string[] = []
    if (dataMatrix_forecast.value.length > 0){
      let ob = Object.keys(dataMatrix_forecast.value[0])
      ob.forEach((item, i) => {
        if(i > 0){ data.push(item)}
      })
    }
    //console.log(data);
    
    return data
});

//        methods:{

const handScrollforcastDTL = (event: Event) => {
    set_Scrol_table(scroll_DTLFocast.value, event)
}

const handloadExceldataDTLForecast = () => {
    isExceldataDTLForecast.value = true
    fileInput.value?.click();
}
const set_Scrol_table = (scrol_table: any, event: Event) => {
                event.stopPropagation();
                let target_SCr: HTMLElement = event.target as HTMLElement
                const top = Math.floor(target_SCr.scrollTop) //this.$refs.tbody.getBoundingClientRect().top
                //const viewPortY = document.documentElement.clientHeight;

                if(top>0){
                    //this.step= Math.floor(viewPortY / this.rowHeight)
                    scrol_table.startRow= Math.floor(top/scrol_table.rowHeight)
                    scrol_table.firstRowHeight=top //this.startRow*this.rowHeight + this.rowHeight
                }else{
                    scrol_table.startRow= 0;
                    scrol_table.firstRowHeight=0
                    //this.step= Math.floor((viewPortY-top)/this.rowHeight)
                }
                
                nextTick(()=>{
                    //scrol_table.startRow= Math.ceil(top/scrol_table.rowHeight)
                    scrol_table.firstRowHeight= scrol_table.startRow* scrol_table.rowHeight      
                    scrol_table.lastRowHeight=scrol_table.height - scrol_table.firstRowHeight - scrol_table.tableHeight
                })
}
const init_Scrol_Table = (scrol_table: any, data_table: any[]) => {
                
                let tableTop= 0 //this.$refs.tbody.getBoundingClientRect().top
                let viewPortY = document.documentElement.clientHeight;

                if(tableTop>0){
                    scrol_table.step= Math.floor((viewPortY- tableTop)/scrol_table.rowHeight)
                    scrol_table.startRow=Math.ceil(tableTop / scrol_table.rowHeight)
                }else{
                    scrol_table.step=Math.floor((viewPortY/scrol_table.rowHeight))
                    scrol_table.startRow= 0
                }
                scrol_table.firstRowHeight=0
                scrol_table.height= data_table.length*scrol_table.rowHeight
                scrol_table.tableHeight= scrol_table.step * scrol_table.rowHeight
                scrol_table.lastRowHeight=scrol_table.height- scrol_table.tableHeight - scrol_table.firstRowHeight  
                
                //console.log(scrol_table.height,scrol_table.lastRowHeight + scrol_table.firstRowHeight, scrol_table.tableHeight);
}

const hand_TinhAllForecast = async () => {
    
    try {
        let re=/^\d{2}-\d{2}-\d{4}$//// mã chính quy    
        if(dataMatrix_forecast.value.length>0){
            let data={
                PDE_ID:route.query.id,
                DATE_FORECAST: DATE_FORECAST.value
            }
            await pmcStore.ini_Forcast(data)
            Show_busy.value=true
            n_cel.value=1                
            for (let i = 0; i < data_colum.value.length; i++) {                 
                 textMasage.value=`Update: ${data_colum.value[i]}; cell: ${i}` 
                if ( re.test(data_colum.value[i])){                       
                    await pro_saveItemForcast_Colum(data_colum.value[i],i, false, true);   
                }                                                    
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        Show_busy.value=false
    }
}
const hand_getPartLT_Forecast = () => {
                let src = "";
                src = `/pmc/MaterialLT_Forecast?id=${route.query.id}&DATE_FORECAST=${DATE_FORECAST.value} ` ; 
                window.open(src, "_blank","fullscreen=yes, scrollbars=auto, titlebar=no");
}
const handtinhForecast_Cel = async (END_DATE: string,PART_NUM: string, QTY: number) => {
                let re=/^\d{4}-\d{2}-\d{2}$//// mã chính quy theo chuẩn mã PCB
                let data: itemForcast ={} as itemForcast
                    data.PDE_ID=route.query.id,
                    data.PART_NUM=PART_NUM
                    data.START_DEMANDS=dayjs(dataMatrix_forecast.value[0][END_DATE],"DD-MM-YYYY").format("YYYY-MM-DD")
                    data.END_DEMANDS=dayjs(END_DATE,"DD-MM-YYYY").format("YYYY-MM-DD")
                    data.QTY =QTY
                    data.tinhForecast= true
                    data.x=-1
                    data.y=-1
                    //console.log(data);

                    if (re.test(data.START_DEMANDS) && re.test(data.END_DEMANDS)){
                        const res = await pmcStore.saveCelForcast(data)
                        //console.log(res.x,res.y, res.err, data.PART_NUM,data.END_DEMANDS);                                
                        //this.Pro_getdata_Forecast(du_excel)
                    }
}
const hand_IniForecast = () => {
    try {
        let data={PDE_ID:route.query.id}
        pmcStore.ini_Forcast(data).then()
    } catch (error) {
        console.error(error);
    }
}
const handtinhForecast_Colomn = (item: any) => {
                //console.log('tính NL', item);
                let re=/^\d{2}-\d{2}-\d{4}$//// mã chính quy theo ngày tháng năm DD-MM-YYYY
                //console.log(this.data_colum[i],re.test(this.data_colum[i]));  
                n_cel.value=1                          
                if ( re.test(item))
                    pro_saveItemForcast_Colum(item,-1, true, true) 
                //this.pro_saveItemForcast_Colum(this.data_colum[i])
}
const handshowForm_DateForecastPO_materia = (strdate: string) => {
                let src = "";
                src = `/pmc/Form_DateForecastPO_material?id=${route.query.id}&END_DATE=${dayjs(strdate,"DD-MM-YYYY").format("YYYY-MM-DD")} ` ; 
                window.open(src, "_blank","fullscreen=yes, scrollbars=auto, titlebar=no");
}
const create2DMatrix_Mau = (matricData: any[]) => {                
    
        let x_dim=0, y_dim=0, val=true
        x_dim = matricData? matricData.length:0
        y_dim= x_dim>0? matricData[0].length:0
        var mat = new Array(y_dim);
        for (var i=0; i<y_dim; i++) {
            mat[i] = new Array(x_dim).fill(val);
        }
        console.log(matricData,x_dim,y_dim);
        return mat;
                
}
const mau_metric = (y: number, x: number, b: boolean) => {
                if(b==true) return 'mauNenXanh'
                // if(this.datametric_mau[y][x] && this.datametric_mau[y][x]==1) return 'mauNenXanh'
                // else return ""
}
const handloadExceldataForecast = () => {
                isExceldataDTLForecast.value=false
                fileInput.value?.click();
}
const exportDataForecast = async (event: Event) => {
        excel_dataforecast.value=[]
        dataforecast.value=[]
        let SetPartNum = new Set<string>()
        
        const target = event.target as HTMLInputElement

        let xlsxfile = target?.files?.[0] ?? null;
        if (!xlsxfile) return
        
        const rowObject = await exportDataExcel_to_Arr(xlsxfile, { dateFormat: 'DD-MM-YYYY', parseTextDates: false })

        // tính tổng lượng dự báo
        
        let grouped: Record<string, Record<string, any>[]> = {};
        excel_dataforecast.value=rowObject


        excel_dataforecast.value.forEach(item => {
            const key = `${item.PART_NUM}_${item.PO_CODE}_${item.END_DEMANDS}`;

            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(item);
            SetPartNum.add(item.PART_NUM)
        });

        let dataAllForecast_part: Record<string, any>[] = Object.values(grouped).map(group => {
            let totalQty = group.reduce((sum, curr) => sum + (curr.QTY || 0), 0);
            return { ...group[0], QTY: totalQty };
        });
        // 
        let data_part=Array.from(SetPartNum)
        
        const res = await bomStore.getPart_num_not_PROJECT({data_part:[...data_part]})
        const dataPart_num_not_PROJECT: Record<string, any>[] = res.dataPart_num_not_PROJECT
        // thêm trang thái done
        dataAllForecast_part.forEach(item=>{
            item.isPartNum = !dataPart_num_not_PROJECT.some(it => it.PART_NUM === item.PART_NUM)
        })

        //this.excel_dataforecast=dataAllForecast_part
        init_Scrol_Table(scroll_DTLFocast.value,  excel_dataforecast.value) 
        //console.log('innit',rowObject, this.excel_dataforecast);

}
const hand_saveItemForcast = async () => {
    Show_busy.value=true
    try {
        let re=/^\d{2}-\d{2}-\d{4}$//// mã chính quy
        if(isExceldataDTLForecast.value==false) {
            if(excel_dataforecast.value.length>0){
                let data={
                    PDE_ID:route.query.id,
                    DATE_FORECAST: DATE_FORECAST.value
                }

                let res = await pmcStore.ini_Forcast(data)

                n_cel.value=1                
                for (let i = 0; i < data_colum.value.length; i++) {
                    
                    //console.log(this.data_colum[i],re.test(this.data_colum[i]));   
                    //if (this.n_cel>4000) this.n_cel=1        
                    textMasage.value=`Update: ${data_colum.value[i]}; cell: ${i}`                 
                    if ( re.test(data_colum.value[i]))
                        //console.log('created lines',this.$store.state.departmens.departMenID);
                        await pro_saveItemForcast_Colum(data_colum.value[i],i, false, true);                                 
                }
                n_cel.value=0 
            }
        } else{
            let vcomplete=0, verror=0
            let data1={
                    PDE_ID:route.query.id,
                    DATE_FORECAST: DATE_FORECAST.value
                }
            const resIni = await pmcStore.ini_Forcast(data1)
            console.log('Initialized forecast (DTL)', resIni);
            
            for(let i = 0; i < excel_dataforecast.value.length; i++ ){  
                console.log(excel_dataforecast.value[i]);

                if (re.test(excel_dataforecast.value[i].START_DEMANDS) && re.test(excel_dataforecast.value[i].END_DEMANDS)){
                    let data: itemForcast ={} as itemForcast
                    data.PDE_ID=route.query.id,
                    data.PART_NUM=excel_dataforecast.value[i].PART_NUM// PROJ_CODE: this.PROJ_OBJECT.id,
                    data.START_DEMANDS=dayjs(excel_dataforecast.value[i].START_DEMANDS,"DD-MM-YYYY").format("YYYY-MM-DD")
                    data.END_DEMANDS=dayjs(excel_dataforecast.value[i].END_DEMANDS,"DD-MM-YYYY").format("YYYY-MM-DD")
                    data.QTY =excel_dataforecast.value[i].QTY//ValueQty: this.ValueQty,
                    data.PO_CODE=excel_dataforecast.value[i].PO_CODE
                    data.tinhForecast= true

                
                    const res = await pmcStore.saveCelForcast(data)
                    if(res.ok==true){
                        excel_dataforecast.value[i].luu=res.ok
                        vcomplete++
                    }else{
                        verror++
                    }

                }else{
                    verror++
                }
                textMasage.value=`Complete: ${vcomplete}; Error: ${verror}     ` 
            };

        }             
        Show_busy.value=false     
    } catch (error) {
        console.error('hand_saveItemForcast error:', error);
        ElMessage.error(error instanceof Error ? error.message : 'Lưu forecast thất bại')
        Show_busy.value=false
    }
    
    // for (let i = 1; i < this.dataMatrix_forecast.length; i++) {
    //    this.pro_saveItemForcast(this.dataMatrix_forecast[i]) 
        
    // }
}

const pro_saveItemForcast_Colum = async (Colum_name: string, y: number, du_excel: any, tinhForecast: boolean) => { // dữ liệu cột, cho phép dữ lại dữ liêu excel, yêu cầu tính forecast 
                let re=/^\d{4}-\d{2}-\d{2}$//// mã chính quy theo chuẩn mã PCB
               
               // console.log(Colum_name);

                //if (!this.n_cel) this.n_cel=1;
                let heso =1;
                if (y==-1) heso=15
                for (let i = 1; i < dataMatrix_forecast.value.length; i++) {
                   let data: itemForcast ={} as itemForcast
                    data.PDE_ID=route.query.id,
                    data.PART_NUM=dataMatrix_forecast.value[i]['PART_NUM']// PROJ_CODE: this.PROJ_OBJECT.id,
                    data.START_DEMANDS=dayjs(dataMatrix_forecast.value[0][Colum_name],"DD-MM-YYYY").format("YYYY-MM-DD")
                    data.END_DEMANDS=dayjs(Colum_name,"DD-MM-YYYY").format("YYYY-MM-DD")
                    data.QTY =dataMatrix_forecast.value[i][Colum_name]//ValueQty: this.ValueQty,
                    data.tinhForecast= tinhForecast
                    data.x=i
                    data.y=y

                    //console.logs(re.test(data.START_DEMANDS) && re.test(data.END_DEMANDS));                  

                    if (re.test(data.START_DEMANDS) && re.test(data.END_DEMANDS)){
                        const res = await pmcStore.saveCelForcast(data)
                        //console.log(res.x,res.y, res.err, data.PART_NUM,data.END_DEMANDS);                                
                    }

                }
            }
const pro_saveItemForcast = async (row_forecast: any) => {
                //console.log(row_forecast);
                let array =Object.entries(row_forecast)
                 //console.log(array);
                let re=/^\d{4}-\d{2}-\d{2}$//// mã chính quy theo chuẩn mã PCB
                  
                for (let i = 1; i < array.length; i++) {
                    let data: itemForcast ={} as itemForcast
                    data.PDE_ID=route.query.id,
                    data.PART_NUM=String(array[0][1])// PROJ_CODE: this.PROJ_OBJECT.id,
                    data.START_DEMANDS=dayjs(dataMatrix_forecast.value[0][array[i][0]],"DD-MM-YYYY").format("YYYY-MM-DD")
                    data.END_DEMANDS=dayjs(array[i][0],"DD-MM-YYYY").format("YYYY-MM-DD")
                    data.QTY =Number(array[i][1])//ValueQty: this.ValueQty,

                    if (re.test(data.START_DEMANDS) && re.test(data.END_DEMANDS)){
                        //console.log(data);
                        const res = await pmcStore.saveCelForcast(data)
                        if(res.ok==true){
                            // handle success if needed
                            Pro_getdata_Forecast(null)
                        }
                        
                    }
            }
            }
const Pro_getdata_Forecast = async (du_Excle: any) => {
    let data={
        PDE_ID:route.query.id,
    }
    const res = await pmcStore.getdata_Forecast(data)
    
    if (!du_Excle) {
        excel_dataforecast.value=[]
        dataforecast.value=[]  
        dataforecast.value=res.dataforecast

        Num_forecast.value=0
        sum_PCS.value=0
        
        dataforecast.value.forEach(element => {
            
            for (let i = 0; i < data_colum.value.length; i++){
                if(typeof element[data_colum.value[i]]== "number"){
                    Num_forecast.value ++
                    sum_PCS.value = sum_PCS.value + element[data_colum.value[i]]
                    //console.log('fff',element[data_colum.value[i]], sum_PCS.value);
                }
                
            }
            // Num_forecast.value=Num_forecast.value +
            // sum_PCS.value=0
        });
    }   
    DATE_FORECAST.value=res.DATE_FORECAST
    
    //console.log(this.dataforecast);
    
}

onMounted(()=>{
    Pro_getdata_Forecast(null)
})


</script>

<style  scoped>
.cla_done {
	background-color: green;
}
.forecast-toolbar {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	padding: 8px 4px;
}
.forecast-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
}
.forecast-actions .el-button {
	margin-left: 0;
}
.forecast-summary {
	font-size: 14px;
	white-space: nowrap;
}
.tableFixHead thead th {
	white-space: nowrap;
	min-width: 100px;
	padding: 6px 10px;
	text-align: center;
	font-size: 13px;
}
.tableFixHead thead th:first-child {
	min-width: 120px;
	text-align: left;
}
.tableFixHead tbody td {
	white-space: nowrap;
	padding: 4px 8px;
}
</style>