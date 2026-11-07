<template>
  <div>
        <div>
           
        </div>
        <div class="row m-1 justify-content-between">
 
              <div class="input-group col-md-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    <b-icon icon="search"></b-icon
                  ></span>
                </div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="search_PN" />
            </div>

          <div class="mr-2">
            <button @click="handWOMat_ExportExcel()">export excel</button>
          </div>
        </div>
       <chi-thi-mau :list_ChiThiMau="list_ChiThiMau"/>
        <div id="Table_PO" class="tableFixHead"  style="overflow: auto; height: 93cqh;">
            <table class="table table-striped" id="tab_export_SOMdays">
                <thead>
                  <tr style="height:76px;">
                    <th>Stt</th>
                    <th>MÃ</th>
                    <th>PROJECT</th>
                    <th v-for="(item) in Colums" :key="item" @click="handselect_col(item)" ><div class="text-truncate rotate">{{item}}</div></th>
                  </tr>
                </thead>
                <tbody ref="tbody">
                    <tr v-for="(item,index) in ShowdataWO_matDays" :key="index">
                        <td >{{ index+1 }}</td>
                        <td class="colFix" >{{ item.PART_NUM }}</td>
                        <td>{{ item.PROJ_NAME }}</td>
                        <td v-for="(cloum) in Colums" :key="cloum" :class="item[cloum] ? mauCell(cloum, item.PART_NUM) : ''" style="padding:0; margin: 0;" >
                          <div class="mauNenXam" style=" width:100%; margin: 0; padding: 0; top: 0; text-align: center;"><b>{{ ObjWO[item.PART_NUM][cloum] }}</b></div>
                          <div>{{ item[cloum] || 0 }} / {{ ObjPRODUCTION[item.PART_NUM][cloum] || 0 }}</div>
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
import ChiThiMau from '../../../controls/ChiThiMau.vue';
import { exportArrObject, exportDataExcel_to_Arr } from '../../../../plugins/Excel';

export default {
  components: { ChiThiMau },
  data() {
    return {
      search_PN: "",
      data_WO_matdays: [],
      Colums: [],
      date:'',
      
      infoStatus: {},
      ObjPRODUCTION:{},
      ObjWO:{},

      list_ChiThiMau: [
          { text: "Đã SX đủ", color: "#009933"  },          
          { text: "Sản Xuất Muộn", color: "#f50707"  },   
          { text: "Đang SX", color: "#70a1ff"  }, 
          { text: "Chưa Xác Nhận", color: "#dfe4ea" },         
      ],
    };
  },
  computed: {
    ShowdataWO_matDays() {
      if (this.search_PN === "") {
        return this.data_WO_matdays;
      }
      return this.data_WO_matdays.filter(item => {
        return item.PART_NUM.toLowerCase().includes(this.search_PN.toLowerCase())
      })
    },
  },
  methods:{
    ...mapActions([
      'get_WO_matdays',
    ]),
    handselect_col(date){
      this.date=date
        // sắp xếp lại bảng có số lượng dảm dần theo ngày chọn
        this.data_WO_matdays.sort((a,b)=>{return b[date]-a[date]})
    },
    mauCell(date, PART_NUM){
      if(this.infoStatus[PART_NUM][date].STATUS =null ){ // chưa xác nhận
        return 'mauNenXam'
      }
      if(this.infoStatus[PART_NUM][date].STATUS =1 ){
        if(this.infoStatus[PART_NUM][date].QTY<=this.infoStatus[PART_NUM][date].PRODUCTION){ // đã sản xuất đủ
          return 'mauNenXanh'
        }
        if(moment(this.infoStatus[PART_NUM][date].END_DATE, "DD/MM/YYYY") <moment()){ // sản xuất muộn
          return 'mauNenDo'
        }
        return 'mauNenXanhDaTroi' //70a1ff
      }
      if(this.infoStatus[PART_NUM][date].STATUS =2 ){
        if(this.infoStatus[PART_NUM][date].QTY<=this.infoStatus[PART_NUM][date].PRODUCTION){
          return 'mauNenXanh'
        }
        if(moment(this.infoStatus[PART_NUM][date].END_DATE, "DD/MM/YYYY") <moment()){
          return 'mauNenDo'
        }
        return 'mauNenXanhDaTroi'
      }
      if(this.infoStatus[PART_NUM][date].STATUS =3 ){
        if(this.infoStatus[PART_NUM][date].QTY<=this.infoStatus[PART_NUM][date].PRODUCTION){
          return 'mauNenXanh'
        }
        if(moment(this.infoStatus[PART_NUM][date].END_DATE, "DD/MM/YYYY") <moment()){
          return 'mauNenDo'
        }
        return 'mauNenXanhDaTroi'
      }
      if(this.infoStatus[PART_NUM][date].STATUS =4 ){
        if(this.infoStatus[PART_NUM][date].QTY<=this.infoStatus[PART_NUM][date].PRODUCTION){
          return 'mauNenXanh'
        }
        if(moment(this.infoStatus[PART_NUM][date].END_DATE, "DD/MM/YYYY") <moment()){
          return 'mauNenDo'
        }
        return 'mauNenXanhLam'
      }
    },
    async Pro_get_WO_matdays(){
      await this.get_WO_matdays().then(res=>{
        //console.log(res.data_WO_matdays);
        this.data_WO_matdays=res.data_WO_matdays.matdays     
        const [PART_NUM,PROJ_NAME,...Colums] =Object.keys(this.data_WO_matdays[0])
        this.Colums=Colums  
        this.infoStatus=this.setStatusPDM(res.data_WO_matdays.All_status)        
      })
      
    },
    setStatusPDM(All_Status){
      
      let Status={}
      All_Status.forEach(element => {        
            // Khởi tạo Status nếu chưa có
        if (!Status[element.PART_NUM]) {
          Status[element.PART_NUM] = {};
        }
        if (!Status[element.PART_NUM][element.START_DATE]) {
          Status[element.PART_NUM][element.START_DATE] = {};
        }

        Status[element.PART_NUM][element.START_DATE].STATUS=element.STATUS
        Status[element.PART_NUM][element.START_DATE].QTY=element.QTY
        Status[element.PART_NUM][element.START_DATE].PRODUCTION=element.PRODUCTION
        Status[element.PART_NUM][element.START_DATE].END_DATE=element.END_DATE

        if (!this.ObjPRODUCTION[element.PART_NUM]) {
          this.ObjPRODUCTION[element.PART_NUM] = {};
        }
        if (!this.ObjPRODUCTION[element.PART_NUM][element.START_DATE]) {
          this.ObjPRODUCTION[element.PART_NUM][element.START_DATE] = {};
        }
        this.ObjPRODUCTION[element.PART_NUM][element.START_DATE]=element.PRODUCTION


        if (!this.ObjWO[element.PART_NUM]) {
          this.ObjWO[element.PART_NUM] = {};
        }
        if (!this.ObjWO[element.PART_NUM][element.START_DATE]) {
          this.ObjWO[element.PART_NUM][element.START_DATE] = {};
        }
        this.ObjWO[element.PART_NUM][element.START_DATE]=element.NUM_WO
       

      });
      return Status
    },
    handWOMat_ExportExcel(){
      exportArrObject('Xlsx',this.data_WO_matdays)
    },
    
  },
  created() {
    this.Pro_get_WO_matdays()
  },
}
</script>

<style>

</style>
