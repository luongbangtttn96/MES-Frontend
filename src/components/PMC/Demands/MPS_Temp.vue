<template>
  <div>
    <div class="row m-1 justify-content-between">
        <div class="row ml-2">
            <div class="row m-1">
                <label for="">Tháng:</label>
                <input type="month" name="" id="" v-model="v_Month" @change="Proc_get_MPS_days()" />
            </div>
            <div class="m-1">
                <select-pro-ject v-model="search_Project" :bom_sx="true" style="width: 300px;" 
                    @change="handSelectProject()" @clear="handleProjectClear()" />
            </div>
            <div class="m-1">
                <button @click="handSetSchedu_Plan_now()" style="height: 38px;">Tổng hơp lịch SX</button>
            </div> 
        </div>
        <div class="m-1">
            <button @click="handSOM_ExportExcel()">export excel</button>
        </div>
    </div>
    <chi-thi-mau :list_ChiThiMau="list_ChiThiMau"/>
    <div id="Table_PO" class="tableFixHead">
        <table id="tab_export_SOMdays" >
            <thead>
                <tr style="height:76px;">
                <th>Stt</th>
                <th style="min-width: 300px;">BOM CODE</th>
                <th>Part Num</th>
                <th v-for="(item) in Colums" :key="item" @click="handselect_col(item)" ><div class="text-truncate rotate">{{handformattedColumnHeader(item)}}</div></th>
                </tr>
            </thead>
            <tbody ref="tbody">
                <tr v-for="(item,index) in Showdata_MPS_days" :key="index">
                    <td >{{ index+1 }}</td>
                    <td class="colFix" >{{ item.BOM_CODE }}</td>
                    <td class="colFix text-truncate">{{ item.PART_NUM }}</td>
                    <td v-for="(cloum) in Colums" 
                        :key="cloum" 
                        :class="Metric_duNL[item.BOM_HDR_ID] && Metric_duNL[item.BOM_HDR_ID][cloum]? Metric_duNL[item.BOM_HDR_ID][cloum]:''"
                        :style="{width: '40px', height: '100%', backgroundColor:mauChuNhat(cloum)}"
                        :title="item[cloum]"
                        draggable="true"
                        :data-row="index"
                        :data-col="cloum"
                        @dblclick="handSetSchedu_Plan_day(item,cloum)"
                        @dragstart="handleDragStart($event, item)" @dragover="handleDragOver" @drop="handleDrop($event, item, cloum)">
                        {{ item[cloum]||'' }}
                    </td>
                </tr>

            </tbody>
        </table>
    </div>  
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ChiThiMau from '@/components/controls/ChiThiMau.vue'
import moment from 'moment';
import SelectProJect from '../../../controls/SelectProject/SelectProJect.vue';

export default {
    data(){
        return{
            data_MPS_days:[],
            status_PlanDay:{},
            search_Project:'',
            v_Month: moment().format('YYYY-MM'), 
            list_ChiThiMau: [
                { text: "Đã Xác Nhận:", color: "#3742fa" },//mauNenXanhLam
                { text: "Đủ nguyên liệu:", color: "#2ecc71"  },// mauNenXanhNhat
                { text: "Thiếu nguyên liệu:", color: "#ffff00" },//mauNenVang
                
            ],
            Colums:[],
            Metric_duNL:[],
            BomHDR:[],
        }
    },
    components:{
        ChiThiMau,
        SelectProJect,
    },
    computed:{
        Showdata_MPS_days(){
            let data
            if( !this.search_Project || this.search_Project.length==0) data= this.data_MPS_days
            else data= this.data_MPS_days.filter(item=> this.BomHDR.find(b=>b.BOM_HDR_ID==item.BOM_HDR_ID) )
            //console.log(data);
            
            return data
        }
    },
    methods:{     
        ...mapActions([
            "get_MPS_days",
            "SetSchedu_Plan_now",
            "getInforMaterail_day",
            'getDataSchedu_BomHDR_Plan_day',
            'ChangeDateSchedu_Plan',
            'SetSchedu_Plan_day',
            'getStatus_NL',
            'getListBomHDR',
            'getMaxProducDate',
        ]),
        mauChuNhat(colum){
            return  moment(colum,'DD-MM-YYYY').isoWeekday() === 7 ? '#dfe4ea' : ''
        },
        handleProjectClear(){
            this.search_Project=''
        },
        async handSelectProject(){
            //console.log('Selected project:', this.search_Project);
            const res= await this.getListBomHDR(this.search_Project)
            this.BomHDR=res.BomHDR            
        },
        handGetInforMaterail_day(item,cloum){
            // lấy thông tin nguyên liệu theo ngày
            
            let data = {
                BOM_HDR_ID: item.BOM_HDR_ID,
                QTY: item[cloum],
                Date: cloum,
            }

            //console.log(data);
            this.getInforMaterail_day(data).then(res => {
                status_PlanDay[item] = res.dataDays_Pro_Plan;
            });
        },
        handSetSchedu_Plan_day(item, cloum){
            // set lịch sản xuất theo ngày
            //console.log(item[cloum]);
            if (item[cloum] && item[cloum]>0){
                const data={
                    BOM_HDR_ID: item.BOM_HDR_ID,
                    Date: cloum,
                }
                this.SetSchedu_Plan_day(data)
            }
            
        },
        handSetSchedu_Plan_now(){
            this.SetSchedu_Plan_now()
        },
        handformattedColumnHeader(date){
            return  moment(date, "DD-MM-YYYY").format("DD");
        },

        handSOM_ExportExcel(){},
        handselect_col(date){
            // sắp xếp lại bảng có số lượng dảm dần theo ngày chọn
            this.data_MPS_days.sort((a,b)=>{return b[date]-a[date]})
        },
        mauCell(){},
        
        
        async Proc_get_MPS_days(){
            let data={
                Month: this.v_Month,
            }
            const res = await this.get_MPS_days(data)

            const [ TME_ID, PART_NUM,BOM_HDR_ID,BOM_CODE,...Colums]= Object.keys(res.data_MPS_days[0]);
            this.Colums=Colums ;
            
            this.data_MPS_days = res.data_MPS_days;
            this.data_MPS_days.forEach(item=>{
                let it={}
                it[item.BOM_HDR_ID]={}
                this.Colums.forEach(cloum=>{
                    it[item.BOM_HDR_ID][cloum]=null
                })
                this.Metric_duNL={...this.Metric_duNL, ...it};
            })
            // lấy trạng thái nguyên liệu theo ngày
            for (let i=0;i<this.data_MPS_days.length;i++){   
                let data={
                    BOM_HDR_ID: this.data_MPS_days[i].BOM_HDR_ID,
                    Date: this.Colums[0]
                }
                const res= await this.getMaxProducDate(data)
                let ProducQTY=res.ProducQTY
                //console.log(ProducQTY, this.Colums[0]);
                if (!ProducQTY || ProducQTY.length==0){
                     for (let j=0;j<this.Colums.length;j++){                
                    //console.log(i,j, this.data_MPS_days[i]);  
                        if (this.data_MPS_days[i][this.Colums[j]] && this.data_MPS_days[i][this.Colums[j]]>0){
                            this.Pro_getStatus_NL( this.data_MPS_days[i].BOM_HDR_ID,this.Colums[j], this.data_MPS_days[i][this.Colums[j]],0)
                        } 
                    }
                    continue
                }else {
                    for (let j=0;j<this.Colums.length;j++){                
                    //console.log(i,j, this.data_MPS_days[i]);  
                        if (this.data_MPS_days[i][this.Colums[j]] && this.data_MPS_days[i][this.Colums[j]]>0){
                            this.Pro_getStatus_NL( this.data_MPS_days[i].BOM_HDR_ID,this.Colums[j], this.data_MPS_days[i][this.Colums[j]],ProducQTY[this.Colums[j]])
                        } 
                    }
                }
                
            }
        },
         Pro_getStatus_NL(BOM_HDR_ID, date, QTY=0, ProducQTY=0){
            //await this.getStatus_NL({BOM_HDR_ID: BOM_HDR_ID, Date: date}).then(res=>{
            //console.log(BOM_HDR_ID, date, QTY, ProducQTY);
            
            if(!ProducQTY || ProducQTY.length==0) {this.Metric_duNL[BOM_HDR_ID][date]='mauNenVang'; return}
            if (ProducQTY<0) {this.Metric_duNL[BOM_HDR_ID][date]='mauNenXanhLam'; return }
            else if (ProducQTY>=0 && ProducQTY<QTY) {this.Metric_duNL[BOM_HDR_ID][date]='mauNenVang'; return }
            else if (ProducQTY>=QTY) {this.Metric_duNL[BOM_HDR_ID][date]='mauNenXanhNhat'; return }
            else {this.Metric_duNL[BOM_HDR_ID][date]=null}
        },
        async handleDragStart(e, item) {
            const cell = e.target;
            let QTY = 0;
            
            try {
            // Lấy dữ liệu kế hoạch SX
            let data = {
                BOM_HDR_ID: item.BOM_HDR_ID,
                Date: cell.dataset.col
            }
            
            const res = await this.getDataSchedu_BomHDR_Plan_day(data);
            //console.log(res);
            if (  res.DataSchedu_BomHDR_Plan_day) {                   
                
                QTY = res.DataSchedu_BomHDR_Plan_day? res.DataSchedu_BomHDR_Plan_day.QTY || null: null;

                const dragData = {
                    row: cell.dataset.row,
                    col: cell.dataset.col,
                    QTY: QTY || 0,
                    value: Number(cell.textContent.trim()),
                    BOM_HDR_ID: item.BOM_HDR_ID,
                    PDD_SIP:  res.DataSchedu_BomHDR_Plan_day.PDD_SIP,
                };

                // Thêm các bước này để đảm bảo dữ liệu được set đúng
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.dropEffect = 'move';
                e.dataTransfer.setData('application/json', JSON.stringify(dragData));
                // Thêm một backup data
                cell.dataset.dragData = JSON.stringify(dragData);
                console.log('Drag started:', dragData);
            }else{
                throw new Error('No scheduling data found');
            }
            
            } catch (error) {
            console.error('Error in drag start:', error);
            }
        },

        handleDragOver(e) {
            e.preventDefault();
            const target = e.target;
            if (target.tagName === 'TD' && target.dataset.row) {
            e.dataTransfer.dropEffect = 'move';
            }
        },

        handleDrop(e, item, cloum) {
            e.preventDefault();
            const target = e.target;
            console.log(e.dataTransfer);
            
            try {
            // Thử lấy dữ liệu từ dataTransfer
            let jsonStr = e.dataTransfer.getData('application/json');
            
            
            // Nếu không có dữ liệu từ dataTransfer, thử lấy từ dataset
            if (!jsonStr) {
                const sourceCell = document.querySelector('[data-drag-data]');
                if (sourceCell) {
                    jsonStr = sourceCell.dataset.dragData;
                    // Xóa data backup sau khi sử dụng
                    delete sourceCell.dataset.dragData;
                }                
            }

            if (!jsonStr) {
                throw new Error('No drag data found');
            }

            const dragData = JSON.parse(jsonStr);
            //console.log(this.Metric_duNL[dragData.BOM_HDR_ID][dragData.col] );
            
            if (target.tagName === 'TD' && target.dataset.row === dragData.row && target.dataset.col != dragData.col && moment(target.dataset.col,'DD-MM-YYYY') > moment().subtract(1,'days') && this.Metric_duNL[dragData.BOM_HDR_ID][dragData.col] !='mauNenXanhLam') {
                // Xử lý logic swap data như cũ
                const targetValue = this.data_MPS_days[dragData.row][target.dataset.col];

                let data={
                    BOM_HDR_ID: dragData.BOM_HDR_ID,
                    PDD_SIP: dragData.PDD_SIP,
                    Date_source: dragData.col,
                    Date_target: target.dataset.col,
                    QTY_source: dragData.QTY,                    
                }
                this.ChangeDateSchedu_Plan(data).then(res=>{
                    if (res.ok){
                        this.$set(this.data_MPS_days[dragData.row], dragData.col, dragData.value - dragData.QTY);
                        this.$set(this.data_MPS_days[dragData.row], target.dataset.col, dragData.QTY + targetValue);
                    }
                })
                this.Pro_getStatus_NL(dragData.BOM_HDR_ID, dragData.col);
            }
            } catch (error) {
            console.error('Error during drop:', error);
            }
        }
    },
    created(){
        this.Proc_get_MPS_days();
    },
}
</script>

<style>

</style>