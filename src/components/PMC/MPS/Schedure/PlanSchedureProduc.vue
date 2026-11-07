<template>
  <div class="container-fluid">
    <title-page :titlepage="'Lịch sản xuất:'" />
      <table class="table-ms table-bordered">
          <thead class="bg_m3">
              <tr>
                    <th style="width: 100px;">Ngày</th>
                    <th style="width: 150px;">Bộ Phận SX</th>
                    <th style="width: 100px;">Lệnh SX </th>
                    <th style="width: 150px;"> BOM CODE </th>
                    <th style="width: 150px;"> Line </th>
                    <th style="width: 60px;"> Năng Lực</th>
                    <th style="width: 60px;"> Số NC</th>
                    <th style="width: 60px;"> Số lượng</th>
                    <th style="width: 180px;"> Bắt đầu</th>
                    <th style="width: 180px;"> Kết Thúc</th>
                    <th style="width: 60px;"> @ </th>
              </tr>
          </thead>
          <tbody>
            <item-plan-schedure-proc v-for="(item, index) in showdataListPlanSchdure"
                :key="index"
                :item="item"
                @changeLine_PlanSchdure="changeLine_PlanSchdure"
                />
                
              <!-- <tr v-for="(item, index) in dataListPlanSchdure"
                :key="index"
                >
                <th ><h6><b>{{Ngay(item.START_TIME)}}</b></h6> </th> 
                <th :class="mau_bophan(item.DEPT_NAME)"> {{Bo_Phan(item.DEPT_NAME)}}</th>
                <td :class="mau_bophan(item.DEPT_NAME)"> {{item.NUM_WO}}</td>
                <td :class="mau_bophan(item.DEPT_NAME)"> {{item.BOM_CODE}}</td>
                <td :class="mau_bophan(item.DEPT_NAME)"> {{item.LINE_NAME}}</td>
                <td :class="mau_bophan(item.DEPT_NAME)"> {{item.CAPACITY}}</td>
                <td :class="mau_bophan(item.DEPT_NAME)"> {{item.WORKER}}</td>
                <td :class="mau_bophan(item.DEPT_NAME)"> {{item.QTY}}</td>
                <td :class="mau_bophan(item.DEPT_NAME)"> {{item.START_TIME}}</td>
                <td :class="mau_bophan(item.DEPT_NAME)"> {{item.END_TIME}}</td>
                <td :class="mau_bophan(item.DEPT_NAME)"> 
                    <span style='cursor: pointer;font-size:14px' @click="ganLichThucHienTheoGio(item.PLA_DSP_ID)">&#9788;</span>
                    <span class="contro_hand" @click="handDeleteScheduleProduc(item.PLA_DSP_ID)">&#10006;</span>
                </td>
              </tr> -->
          </tbody>
      </table>
      <div class="menuPopu" id="menuPopu">
         <select  v-model="LINE_ID_HDR" @change="handSetChangeLine_PlanSchdure()">
            <option v-for="item in dataLine" :key="item.LINE_ID_HDR" :value="item.LINE_ID_HDR">{{ item.LINE_NAME}}</option>
          </select>
      </div>
         
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex';
import itemPlanSchedureProc from './ItemPlanSchedureProduc.vue'
import TitlePage from '../../../controls/TitlePage.vue'
import BaseDialog from '../../../controls/BaseDialog.vue';
export default {
    data(){
        return{
            dataListPlanSchdure: [],
            ngaytam:'',
            BoPhanTam:'',
            BoPhanTam_m:'',
            Ma_mau:1,
            dataLine:[],
            showScheduleDTL_line:false,
            LINE_ID_HDR: null,
            lineselect: null,
        }
    },
    props:{
        depa: Number,
    }, 
    components:{
        TitlePage,
        itemPlanSchedureProc,
        BaseDialog
    },
    computed:{

        ... mapGetters([
             'currentUser'
        ]),
        showdataListPlanSchdure(){
            let dat_PlanSchedure=[]
            let Ng='', bp=''
            this.dataListPlanSchdure.forEach(item=>{
                if (Ng==moment(item.START_TIME).format('DD-MM-YYYY')){
                    
                    item.ngay=''
                }else{                   
                    item.ngay=moment(item.START_TIME).format('DD-MM-YYYY')
                    Ng=moment(item.START_TIME).format('DD-MM-YYYY')
                    item.songay=this.dataListPlanSchdure.filter(i=>{return moment(i.START_TIME).format('DD-MM-YYYY')==Ng}).length
                }
                if (bp==item.DEPT_NAME){
                    item.DEPT_NAME=''
                    switch (this.Ma_mau%2) {
                        case 0:
                            item.mau='mau0'
                            break;
                        case 1:
                            item.mau='mau1'
                            break;
                        default:
                            break;
                    }
                }else{
                    this.Ma_mau+=1
                    bp=item.DEPT_NAME
                    item.sobp=this.dataListPlanSchdure.filter(i=>{return moment(i.START_TIME).format('DD-MM-YYYY')==Ng && bp==i.DEPT_NAME}).length
                    switch (this.Ma_mau%2) {
                        case 0:
                            item.mau='mau0'
                            break;
                        case 1:
                            item.mau='mau1'
                            break;
                        default:
                            break;
                    }
                }
               
                item.Bophan=item.DEPT_NAME

                dat_PlanSchedure.push(item)
            })
            return dat_PlanSchedure
        }
    },
    methods:{
        ...mapActions([
            'getPlanlineOnline',
            'getLinesInDept',
            'setChangeLine_PlanSchdure'
        ]),
        async handSetChangeLine_PlanSchdure(event){
            //prompt('Bạn có chắc chắn đổi line không ?') 
            document.querySelector(".menuPopu").classList.remove("hienMenuPopu");
            await this.setChangeLine_PlanSchdure({LINE_ID_HDR:this.LINE_ID_HDR, PLA_DSP_ID:this.lineselect.PLA_DSP_ID})  
            
            this.getPlanline_online()          
                
        },
        async  changeLine_PlanSchdure(event,item){
            //console.log(item);
            this.lineselect=item
            this.LINE_ID_HDR=item.LINE_ID_HDR
            console.log(this.LINE_ID_HDR,item);
            
            event.stopPropagation();
            let menuPopu = document.getElementById("menuPopu");
            menuPopu.style.top = event.layerY + "px";
            menuPopu.style.left = event.layerX + "px";
            document.querySelector(".menuPopu").classList.toggle("hienMenuPopu");

            this.showScheduleDTL_line=true
            let res= await this.getLinesInDept({DEPT_ID:item.DEPT_ID})
            this.dataLine=res.dataLine
         
        },
        getPlanline_online(DeptId){
            let deptId =DeptId            
            if (!DeptId){
                deptId=this.currentUser.DEPTID
            }
            this.getPlanlineOnline(deptId).then(res=>{
                //console.log(res);
                this.dataListPlanSchdure=res.dataListPlanSchdure  ;
                //console.log('Ủe',deptId,res.dataListPlanSchdure);
            })
        },

        Ngay(date){
            let ngay=moment(date).format('DD-MM-YYYY')
            if (ngay==this.ngaytam) {
                this.ngaytam=ngay
               
                return ''
            }else {
                this.ngaytam=ngay
                return ngay
            }
        },
        Bo_Phan(bophan){
             if (bophan==this.BoPhanTam) {
                this.BoPhanTam=bophan
                return ''
            }else {
                this.BoPhanTam=bophan
                return bophan
            }
        },
        mau_bophan(bophan){
             if (bophan==this.BoPhanTam_m) {
                this.BoPhanTam_m=bophan
                if ( (this.Ma_mau % 2)==1) return 'mau0'
                else return ''
            }else {
                this.Ma_mau +=1
                this.BoPhanTam_m=bophan
                if ( (this.Ma_mau % 2)==1) return 'mau0'
                else return ''
            }
            
        },
       

    },
    created(){
        this.getPlanline_online()       
        
    }
}
</script>

<style >
.menuPopu {
  background-color: #ffffff;
  color: black;
  position: absolute;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.3);
  display: none;
}
.menuPopu a {
  display: block;
  text-decoration: none;
}
.menuPopu a:hover {
  background-color: #95a5a6;
}
.hienMenuPopu {
  display: block;
}
</style>