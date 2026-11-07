<template>
  <div>
    <div class="row container">
        <div class="form-group" style="width:200px"> <label for="SelectWO"> Lệnh SX: </label>
        
            <input 
                type="search" 
                class="form-control" 
                id="SelectWO"
                list="PlanDataList" 
                v-model="selectedPlanText"
                @input="onPlanInput"
                placeholder="Gõ để tìm kiếm..."
            >
            
            <datalist id="PlanDataList">
                <option 
                v-for="item in PlanList" 
                :key="item.PLA_ID" 
                :value="item.NUM_WO + ' - ' + item.PROJ_CODE"
                ></option>
            </datalist>
        </div>
        <div class="form-group" style="padding:0 0 0 10px; width:150px" >
            <label for="DepatmenControlSelect1">Bộ Phận:</label>
            <select class="form-control small" 
            id="DepatmenControlSelect1"
            v-model="depatId"
            @change="changeSelect($event)"
            >
            <option v-for="item in dataDepartmens"
                :key="item.DEPT_ID" 
                :value="item.DEPT_ID"> {{item.DEPT_NAME}} </option>
            </select>
        
        </div>         
        <div class="form-group" style="padding:0 0 0 10px; width:170px">
            <label for="SemiControlSelect1">Sản phẩm:</label>
            <select class="form-control small" 
            v-model="PLA_DTL_ID"
            id="SemiControlSelect1"
            @change="changeSanPham($event)"
            >
            <option v-for="item in BOMList"
                :key="item.PLA_DTL_ID" 
                :value="item.PLA_DTL_ID"> {{item.BOM_NAME}} </option>
            </select>
        </div>
        <div class="form-group" style="padding:0 0 0 10px">
            <label for="Input_SPGio">SP/Giờ:</label>
            <input v-model="PRODUC_EVERY_HOUR" class="form-control small" type="number"  id="Input_SPGio" maxlength="3" style="width:80px;">
        </div>
        <div class="form-group" style="padding:0 0 0 10px">
            <label for="Input_NhanCong">Nhân Công:</label>
            <input v-model="WORKER" class="form-control small" type="number"  id="Input_NhanCong" maxlength="3" style="width:80px;">
        </div>
        <div class="form-group" style="padding:0 0 0 10px">
            <label for="Input_Plan">Số Plan:</label>
            <input v-model="QTY_PLAN" disabled class="form-control small" type="number"  id="Input_Plan" maxlength="3" style="width:80px;">
        </div>
        <div class="form-group" style="padding:0 0 0 10px">
            <label for="Input_sodasx">Số đã SX:</label>
            <input v-model="PRODUCTION" disabled class="form-control small" type="number"  id="Input_sodasx" maxlength="3" style="width:80px;">
        </div>
        <div class="form-group" style="padding:0 0 0 10px">
            <label for="Input_soluong">Số lượng sx:</label>
            <input v-model="Qty" class="form-control small" type="number"  
                id="Input_soluong" maxlength="3" style="width:80px;"
                @keyup="handQTYSX()">
        </div>
        <div class="form-group" style="padding:0 18px;">
            <label for="Input_date">Bắt đầu:</label>
            <div class="row">
                <input v-model="timeBegin" class="form-control small" 
                    type="datetime-local"  id="Input_date" style="width:250px;"
                    @change="LoadInfoLine()">
            </div>
        </div>
        <div class="form-group">  
            <div> 
                <button class="btn btn-primary btn-sm" @click="LoadInfoLine">Load</button>
                <!-- <button  class="btn btn-primary btn-sm" @click="tinhKHSX">Tính lịch SX</button> -->
                <a href="/ViewListScheduPro" class="btn btn-primary btn-sm">View Kế hoạch</a>
            </div>
        </div>
        
    </div>
      <!-- Line: số lao động , năng lực lao động, năng lực máy => năng lực line
      tính thời gian SX.
        ghép sx thực tế -->
    <div style="width:830px">
        <table class="table">
            <thead>    
                <th style="width:20px"> </th>
                <th style="width:40px"> Id</th>
                <th style="width:150px"> Line Name </th>
                <th style="width:150px "> Băt đầu</th>
                <th style="width:150px "> Kết thúc</th>
            </thead>
            <tbody>
                <tr  v-for="(item, index) in dataInfoLineOfsetPlanBom" :key="index"
                    class="{'color_xanh':item.exists}"
                    >
                    <td class="contro_hand" style="width:20px" @click="SavePLanLine(item)"> <samp> &#10010;</samp>    </td>
                    <td style="width:43px">{{index+1}}</td>
                    <td style="width:150px"> {{item.LINE_NAME}} </td>
                    <td style="width:150px"> {{item.START_TIME}}</td>
                    <td style="width:150px"> 
                        <input v-model="item.END_TIME" class="form-control small" 
                        type="datetime-local" style="width:250px;">
                </td>
                </tr>
            </tbody>
        </table>

    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';



export default {

data(){
    return{
         dataDepartmens:[],
          BOMList:[],
          PlanList:[],
          dataInfoLineOfsetPlanBom:[],

          PlanID:0,
          depatId:0,
          BomDTLId:0,
          Qty:0,  
          timeBegin:null    ,
          PRODUC_EVERY_HOUR:0,
          WORKER:0,
          PLA_DTL_ID: 0,
          QTY_PLAN:0,
          PRODUCTION:0,
          selectedPlanText: '',
    }
},
components:{
},
methods:{
    ...mapActions([
        'getListDepartmens',
        'getBomHDRListOfDepPro',
        'getPlanHDRSetLine',
        'getListLineOfSetPlanBom',
        'Save_Planline'
    ]),
    onPlanInput() {
        // Tìm item trong PlanList khớp với chuỗi người dùng vừa chọn/gõ
        let matchItem = this.PlanList.find(item => {
            let fullText = item.NUM_WO + ' - ' + item.PROJ_CODE;
            return fullText === this.selectedPlanText;
        });

        if (matchItem) {
            // 1. Gán ID thực tế vào PlanID để các hàm khác (LoadInfoLine,...) chạy đúng
            this.PlanID = matchItem.PLA_ID;
            this.changeSelect()
        } else {
            // Nếu người dùng đang gõ dở dang hoặc xóa trắng
            this.PlanID = 0;
            this.BOMList = [];
        }
    },
    handQTYSX(){
        //console.log(this.QTY_PLAN,parseInt(this.PRODUCTION)  + parseInt(this.Qty));
        if (this.Qty < 0) this.Qty = 0;
        const tongSanXuat = parseInt(this.PRODUCTION) + (parseInt(this.Qty) || 0);
        if (tongSanXuat > this.QTY_PLAN) {
            this.$store.dispatch('setMsgErro',"Số lượng vượt quá kế hoạch")
            this.Qty = 0;
        }
    },
    SavePLanLine(itemPlan){
        if (!itemPlan.END_TIME) {
            this.$store.dispatch('setMsgErro','Vui lòng nhập hoặc tính thời gian kết thúc trước khi lưu!')
            return;
        }
        //console.log(moment(itemPlan.END_TIME).format('YYYY-MM-DD HH:mm:ss'));
        itemPlan.END_TIME=itemPlan.END_TIME.replace('T', ' ') + ':00'
        //console.log(itemPlan);
        
        if (itemPlan.END_TIME<=itemPlan.START_TIME){
            this.$store.dispatch('setMsgErro',' Thời giam kết thúc không được nhỏ hơn thời gian bắt đầu')
            return
        }

        // tính lại năng lực line
        itemPlan.CAPACITY=itemPlan.QTY/ moment(itemPlan.END_TIME ,'YYYY-MM-DD HH:mm:ss').diff(moment(itemPlan.START_TIME,'YYYY-MM-DD HH:mm:ss'),'minute')
        this.Save_Planline(itemPlan).then(res=>{
            if (res.ok) {
                this.$set(itemPlan, 'exists', true)
            }
        });
    },
    changeSelect(value){
         //this.departmenSelect=event.target.value
         
         let data={
            departMenID: this.depatId,
            PlanID: this.PlanID,
         }
              // lấy các Bom SP của lệnh SX
        this.getBomHDRListOfDepPro(data).then(res=>{
            this.BOMList=res.BOMList || [];
        })
          
        },
    changeSanPham(event){
        let itemPla_dtl = this.BOMList.filter(item=>{ return item.PLA_DTL_ID == this.PLA_DTL_ID})
        
        if (itemPla_dtl){
            this.PRODUC_EVERY_HOUR=itemPla_dtl[0].PRODUC_EVERY_HOUR
            this.WORKER=itemPla_dtl[0].WORKER
            this.PRODUCTION=itemPla_dtl[0].PRODUCTION
            this.QTY_PLAN=itemPla_dtl[0].QTY
        }
            this.LoadInfoLine()
    },
    LoadInfoLine(){
        console.log(this.timeBegin);
        if(!this.timeBegin) return

        let data={
            PlanID: this.PlanID,
            depatId: this.depatId,
            BomDTLId: this.BomDTLId,
            PLA_DTL_ID:this.PLA_DTL_ID,
            Qty: this.Qty,
            timeBegin: this.timeBegin.replace('T',' ') + ':00'
        }
        //console.log('LoadInfoLine',data);
        this.getListLineOfSetPlanBom(data).then(res=>{
            this.dataInfoLineOfsetPlanBom=res.dataInfoLineOfsetPlanBom
            //console.log('dataInfoLineOfsetPlanBom',this.dataInfoLineOfsetPlanBom);
        })
    },
    tinhKHSX(){
        // for (let i=0; i<this.dataInfoLineOfsetPlanBom.length; i++){
        //     if (this.dataInfoLineOfsetPlanBom[i].CAPACITY===0){
        //         this.dataInfoLineOfsetPlanBom[i].END_TIME =formatDateTime(dateadd('ngày',360,this.dataInfoLineOfsetPlanBom[i].START_TIME))
        //     }else{
        //         let intevar=0
        //         intevar= (this.dataInfoLineOfsetPlanBom[i].QTY*this.dataInfoLineOfsetPlanBom[i].CAPACITY)
        //         this.dataInfoLineOfsetPlanBom[i].END_TIME =formatDateTime(dateadd('giay',intevar,this.dataInfoLineOfsetPlanBom[i].START_TIME))
        //         console.log(this.dataInfoLineOfsetPlanBom[i].START_TIME, 'date ', this.dataInfoLineOfsetPlanBom[i].END_TIME, 'inte: ', intevar);
                
        //         intevar= (intevar/3600).toFixed(2)
        //         this.dataInfoLineOfsetPlanBom[i].time=intevar;
        //     }
        // }
        // console.log('tinh',this.dataInfoLineOfsetPlanBom);
    },
    NhapInfoLine(data_line){
        //this.dataInfoLineOfsetPlanBom[data_line.index].PLA_ID=this.PlanID 
        this.dataInfoLineOfsetPlanBom[data_line.index].CAPACITY=data_line.CAPACITY
        this.dataInfoLineOfsetPlanBom[data_line.index].people=data_line.people
    },
    UpdateShowline(n){
        //console.log(this.dataInfoLineOfsetPlanBom[n]);
        this.$set(this.dataInfoLineOfsetPlanBom[n], 'exists',1)
    },
},
created() {    
    this.getListDepartmens().then(res=>{
        this.dataDepartmens=[[{DEVICE_ID:0,DEVICE_NAME:'Chọn Bộ Phận'}],...res.dataDepartmens]
        });
    this.getPlanHDRSetLine().then(res=>{
        this.PlanList=res.PlanList;
        })
    },
}
</script>

<style>
.color_xanh{
    background-color: rgba(0, 128, 0, 0.705);
}
</style>