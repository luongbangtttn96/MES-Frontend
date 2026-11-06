<template>
  <div>
    <div class=" row col-md-12"> <!-- thông tin nhu cầu -->
      <div class="col-md-2"> <!-- Tên dự án -->
          <b>Dự án: </b> <p>{{ ObjNhuCau.projec}}</p>
      </div>
      <div class="col-md-2"> <!-- Từ Ngày --> 
         <b>Từ ngày:</b><p>{{ ObjNhuCau.START_DEMANDS}}</p>
      </div>
      <div class="col-md-2"> <!-- Đến Ngày --> 
        <b>Đến ngày:</b><p>{{ObjNhuCau.END_DEMANDS}}</p>
      </div>
      <div class="col-md-2"> <!-- Số lượng --> 
        <b> Số lượng:</b> <p>{{ ObjNhuCau.QTY}}</p>
      </div>
      <div class="col-md-2"> <!-- Số lượng --> 
        <b> Ước SX:</b> <p>{{ ObjNhuCau.UOC}}</p>
      </div>
    </div>
    <!-- <button style="font-size:16px" @click="handSaveDemandMaterial(ObjNhuCau.id)">Lưu<i class="fa fa-floppy-o"></i></button> -->
     <!-- <button  style="font-size:16px"
              @click="handXacNhanHoanThanhCongDoanMRP(ObjNhuCau.id,1)">Xác Nhận Hoàn thành<i class="fa fa-check" style="color:green"></i></button> -->
    <!-- <button  style="font-size:16px"
              @click="handDanhSachNLBoSung(ObjNhuCau.id)">Nguyên Liệu Cần Mua</button> -->
    <table class="table table-sm">
         <thead>

            <tr>
              <th style="min-height: 70px; min-width:60px" rowspan="2">STT</th>
              <th style="min-height: 70px; min-width:100px" rowspan="2">PARTNUM</th>
              <th style="min-height: 70px; min-width:60px" rowspan="2">SL CƠ SỞ</th>
              <th style="min-height: 70px; min-width:60px" rowspan="2">ĐƠN VI</th>
              <th style="min-height: 70px; min-width:120px" colspan="2">NGUYÊN LIỆU CẦN</th>
              <th style="min-height: 70px; min-width:120px" colspan="2">SỐ NGUYÊN LIỆU NHẬP</th>
              <th style="min-height: 70px; min-width:120px" colspan="2">SỐ NGUYÊN LIỆU XUẤT</th>
              
            </tr>
            <tr>
              <th style="min-height: 70px; min-width:60px">SỐ NL</th>
              <th style="min-height: 70px; min-width:60px">HAO HỤT</th>
              <th style="min-height: 70px; min-width:60px" title="Số nguyên liệu đáp ứng cho SX dự án">SỐ NL</th>
              <th style="min-height: 70px; min-width:60px" >NHẬP              
                <button style="font-size:12px" @click="handERPgetObReceived(ObjNhuCau.id)"><i class="fa fa-download"></i></button>
                <button style="font-size:12px" @click="handLuuNhapNLMRP(ObjNhuCau.id)"><i class="fa fa-floppy-o"></i></button>
              </th>
              <th style="min-height: 70px; min-width:60px" title="Số nguyên liệu đáp ứng cho SX dự án">SỐ NL</th>
              <th style="min-height: 70px; min-width:60px" >XUẤT              
                <!-- <button style="font-size:12px" @click="handERPgetObReceived(ObjNhuCau.id)"><i class="fa fa-download"></i></button>
                <button style="font-size:12px" @click="handLuuXuatNLMRP(ObjNhuCau.id)"><i class="fa fa-floppy-o"></i></button> -->
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="cursor:pointer " v-for="(item, index) in dataMaterials"
              :key="index">  
              <td style="min-height: 70px; min-width:60px">{{index+1}}</td>
              <td style="min-height: 70px; min-width:200px">{{item.PART_NUM}}</td>
              <td style="min-height: 70px; min-width:60px">{{item.QTY_UNIT}}</td>
              <td style="min-height: 70px; min-width:60px">{{item.UNIT}}</td>
              <td style="min-height: 70px; min-width:60px">{{item.QTY}}</td> 
              <td style="min-height: 70px; min-width:60px">{{item.QTY_WASTAGE}}</td>              
              <td style="min-height: 70px; min-width:60px">{{item.QTY_RESPONSE}}</td>
              <td style="min-height: 70px; min-width:60px">
                <input type="text" v-model="item.extra" style="width:80px">
              </td>
              <td style="min-height: 70px; min-width:60px">{{item.QTY_DELIVE}}</td>
              <td style="min-height: 70px; min-width:60px">
                <input type="text" v-model="item.extra" style="width:80px">
              </td>
              <!-- <td style="min-height: 70px; min-width:100px">USED</td> -->     
            </tr> 
          </tbody>
    </table>
    
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data(){
      return {
        ObjNhuCau:{},
        dataMaterials:[],
        STATUS: true,
        isSaveTon:false,
        isSaveMateria_DangSX: false,
        isSaveMaterialDemand: false,
        irhcode: null,
        irhIdERP:null,
      }
    },

    methods: {
      ...mapActions([
        'getMateralDemands_IDDemand',
        'ERPgetObReceived',
        'LuuNhapNLMRP',
        'MRPuocSoSX'
      ]),
      // handDanhSachNLBoSung(id){
      //    let src=''
      //       src='/pmc/Form_TongHopBoSungNL?id=' + this.$route.query.id + '&projec=' + this.$route.query.projec + '&Start=' + this.$route.query.Start + '&end=' + this.$route.query.end + '&qty='+ this.$route.query.qty
      //       window.open(src, 'Form_TongHopBoSungNL', 'fullscreen=yes, scrollbars=auto, titlebar=no')
            
      // },
      Proc_MRPUocSoSX(id){
        this.MRPuocSoSX({code:id}).then(res=>{
          this.ObjNhuCau.UOC=res.dataMRPuocSoSX
          this.$forceUpdate()
        })
      },
     handLuuXuatNLMRP(){
      alert('chưa triển khai')
     },
      handLuuNhapNLMRP(id){
        this.LuuNhapNLMRP({id:id, data:this.dataMaterials,irhcode: this.irhcode, irhIdERP:this.irhIdERP }).then(()=>{
           this.ProGetMateralDemands_IDDemand(this.$route.query.id)
           this.Proc_MRPUocSoSX(id)
        })
      },

      handERPgetObReceived(){
        if (this.irhcode=prompt('Nhập mã đơn hàng')){
          this.ERPgetObReceived(this.irhcode).then(res=>{
            //console.log(this.irhcode, res.ObRECEIVED);
            if (res.ObRECEIVED){
              this.irhIdERP=this.irhcode
              this.irhcode=res.ObRECEIVED.IRH_CODE
              this.dataMaterials.forEach((el, i)=>{
                this.dataMaterials[i].extra=0
                res.ObRECEIVED.dsVattu.forEach((element)=>{
                  if(el.PART_NUM==element.PART_NUM){
                    this.dataMaterials[i].extra=this.dataMaterials[i].extra+element.REC_QUANTITY
                  }
                })
              })
              this.$forceUpdate()
            }
             //console.log(this.dataMaterials); 
          })
        }
      },  
      ProGetMateralDemands_IDDemand(id){
        this.getMateralDemands_IDDemand({id:id}).then(res=>{
          this.dataMaterials=res.dataMaterials.filter(item => { return item.rn==1})
          this.dataMaterials.forEach(element=>{
            element.extra=0
          })
          console.log(this.dataMaterials);
        })
      },
    
      // handSaveDemandMaterial(id){
      //   //console.log(this.isSaveTon ,this.isSaveMateria_DangSX);
      //   // if (this.isSaveTon && this.isSaveMateria_DangSX) {
      //     this.proSaveStocOfDemand(id)

      //   // }else{
      //   //   confirm('Cần phải tổng hợp số liệu tồn kho và sô nguyên liệu còn cho dự án đang SX')
      //   // };
      //   // if(this.isSaveMaterialDemand){

      //   // };
      // },
      proSaveStocOfDemand(id){
        this.saveStocOfDemand({id:id, data:this.dataMaterials}).then(()=>{
          this.Proc_MRPUocSoSX(id)
          this.ProGetMateralDemands_IDDemand(this.$route.query.id)
        })
      }
    },
    created(){
      this.ObjNhuCau.id=this.$route.query.id
      this.ObjNhuCau.projec=this.$route.query.projec
      this.ObjNhuCau.START_DEMANDS=this.$route.query.Start
      this.ObjNhuCau.END_DEMANDS=this.$route.query.end
      this.ObjNhuCau.QTY=this.$route.query.qty
      this.ObjNhuCau.UOC=0
      this.Proc_MRPUocSoSX(this.$route.query.id)
      this.ProGetMateralDemands_IDDemand(this.$route.query.id)
    }
}
</script>

<style>

</style>