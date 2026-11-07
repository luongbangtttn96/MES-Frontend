<template>
    <div  class="container ">
        <div class="container-fluid bg_m2 KhoangCachTren"><h4>Tạo Lệnh Sản Xuất:</h4></div>
            <div class="row container ">
                <div class="col-md-4">
                    <div class="form-group row">
                        <label for="Num_WO" class="col-sm-4 col-form-label">Số lệnh SX:</label>
                        <div class="col-sm-7 bg-light">
                            <input type="text" size=8 maxlength="8" class="form-control" v-model="dataPlan.NUM_WO" >
                            <!-- <b> {{}} </b> -->
                            <!-- <input type="text" class="form-control" value="TC" v-model="dataPlan.NUM_WO" > -->
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="form-group row">
                        <label for="Prorject" class="col-sm-2 col-form-label">Dự Án SX:</label>
                        <div class="col-sm-10 bg-light">
                            <b> {{dataPlan.PROJ_NAME}} </b>
                            <!-- <input type="Text" class="form-control" id="Prorject" name="Prorject" v-model="dataPlan.PROJ_NAME"> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="row container ">
                <div class="col-md-4">
                    <div class="form-group row">
                        <label for="POOrder" class="col-sm-4 col-form-label">PO:</label>
                        <div class="col-sm-8 bg-light">
                            <b> {{dataPlan.PO_CODE}}</b>
                             <!-- <input type="Text" class="form-control" id="POOrder" name="POOrder" v-model="dataPlan.PO_CODE"> -->
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group row">
                        <label for="SalesOder" class="col-sm-4 col-form-label">Sale Oder:</label>
                        <div class="col-sm-8 bg-light">
                            <b> {{dataPlan.SALEODER_CODE}} </b>
                            <!-- <input type="Text" class="form-control" id="SalesOder" name="SalesOder" v-model="dataPlan.SALEODER_CODE"> -->
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group row">
                        <label for="SalesOder" class="col-sm-4 col-form-label">Hình thức:</label>
                        <div class="col-sm-8 bg-light">
                            <select class="form-control" v-model="dataPlan.PLAN_TYPE">
                                <option v-for="item in dataPlanType" 
                                :key="item.DANHBA_ID"
                                :value="item.CODE_NAME">
                                    {{ item.DANHBA_NAME }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row container ">
                 <div class="col-md-4">
                    <div class="form-group row">
                        <label for="QTY" class="col-sm-4 col-form-label">Số Lượng:</label>
                        <div class="col-sm-7">
                            <input type="Text" class="form-control" id="QTY" name="QTY" v-model.number="dataPlan.QTY">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group row">
                        <label for="Start-Date" class="col-sm-4 col-form-label">Start Date:</label>
                        <div class="col-sm-7">
                            <input type="date" id="Start-Date" class="form-control" v-model="dataPlan.START_DATE">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group row">
                        <label for="En-Date" class="col-sm-4 col-form-label">End date:</label>
                        <div class="col-sm-7">
                            <input type="date" id="En-Date" class="form-control" v-model="dataPlan.END_DATE">
                        </div>
                    </div>
                </div>  
            </div>  
                    
            <div class="row container ">
                <label for="Note" class="col-sm-2 col-form-label">Ghi Chú:</label>
                <div class="col-sm-10">
                    <textarea class="form-control" id="Note" rows="2" v-model="dataPlan.NOTE"></textarea>
                </div>
            </div>
            <div class="container mt-2">
                <button class="btn btn-primary"  type="button" @click="handAddPlanOfDemain()" v-if="!dataPlan.STATUS"> Tạo LSX </button>
                <button class="btn btn-primary"  type="button" @click="handSuaPlanOfDemand()" v-else> Sửa LSX </button>
                <button class="btn btn-primary"  type="button" @click="handgetSemiMis_BOM()"> Hiện BTP thiếu </button>
                <button class="btn btn-danger"  type="button" @click="handHuyPlan()" > Hủy  </button>
            </div>
           <div class="container mt-2 mb-2" >    
                <button class="btn btn-primary"  type="button" @click="handConfirmQCPlanOfDemain()"> Xác nhận QC </button>
                <button class="btn btn-primary"  type="button" @click="handConfirmBOMPlanOfDemain()"> Xác nhận BOM </button>
                <button class="btn btn-primary"  type="button" @click="handConfirmWHPlanOfDemain()"> Xác nhận Kho </button>
                <button class="btn btn-primary"  type="button" @click="handConfirmTECPlanOfDemain()"> Xác nhận Kỹ Thuật </button>
            </div>
            <div>
                <!-- danh sác các bán thành phẩm -->
                <Label> <b>Bán Thành Phẩm: </b> </Label>
                <div class="groupBTP">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Bán Thành Phẩm</th>
                                <th>PART NUM</th>
                                <th>Số tồn</th>
                                <th>Số Lượng </th>
                                <th>Ngày Bắt Đầu</th>
                                <th>Ngày Kêt Thúc</th>
                                <th>TT SX</th>
                                <th>@</th>
                            </tr>
                        </thead>
                        <tbody>
                            <item-w-o-demand v-for="(item, index) in semiProducts "
                            :key="index" 
                            :index="index"
                            :item="item"/>
                        </tbody>
                    </table>
                </div>
            </div>
        <div class="container mt-2" >      
            <button class="btn btn-primary"  type="button" @click="handXacNhanPlanOfDemain()"> Duyệt </button>
            <button class="btn btn-primary"  type="button"> Xem Lệnh SX </button>
        </div>
        <div class="row contaner-fluid mt-2">
            <div class="col-md-6">
                <div class="m-1 col-12" style="background-color:lavender;">
                    <label for="">Xác nhận công đoạn</label>
                </div>
                <div  class="ml-3"><label for=""><b>BOM: {{dataPlan.FULL_NAME_BOM}} </b></label></div>
                <div  class="ml-3"><label for=""><b>QC: {{dataPlan.FULL_NAME_QC}} </b></label></div>
                <div  class="ml-3"><label for=""><b>KHO: {{dataPlan.FULL_NAME_WH}} </b></label></div>
                <div  class="ml-3"><label for=""><b>KỸ THUẬT: {{dataPlan.FULL_NAME_TEC}} </b></label></div>

                <div  class="ml-3" v-for="(item, index) in dataConfirm"
                 :key="index"><label for=""><b>XN: {{item}} </b></label></div>
                
            </div>
           
            <div class="col-md-6">
                <div class="col-12 m-1" style="background-color:lavender;">
                    <label for="">Ký Duyệt Lệnh SX</label>
                </div>
                <br>
                <br>
                <div  class="ml-3"> <label for="" v-if="dataPlan.STATUS==2"><b>{{dataPlan.FULL_NAME}} </b></label></div>
               
            </div>
            
        </div>
</div>
</template>

<script>
//import moment from "moment";
import { mapActions } from 'vuex';
import ItemWODemand from "./ItemWODemand.vue";
export default {
    data(){
        return {
           dataPlan:[] ,
           semiProducts:[],
           dataPlanType:[],
        }
        
    },
    components:{
        ItemWODemand
    },
    computed:{
        dataConfirm(){
            let NameConfirm=[]
            this.semiProducts.forEach(item=>{
                if (NameConfirm.includes(item.FULL_NAME) == false) {
                    NameConfirm.push(item.FULL_NAME)
                }
            })
            return NameConfirm
        }
    },
    methods:{
        ...mapActions([
            'getWOofDemands',
            'AddPlanOfDemand',
            'getListBomHDROfDemand',
            'XacNhanPlanOfDemand',
            'ConfirmBOMPlanOfDemain',
            'ConfirmQCPlanOfDemain',
            'ConfirmWHPlanOfDemain',
            'ConfirmTECPlanOfDemain',
            'SuaPlanOfDemand',
            'getPlanType',
            'HuyPlan',
            'getSemiMis_BOM'
        ]),
        handgetSemiMis_BOM(){
            let data={PDD_ID:this.$route.query.id}
            this.getSemiMis_BOM(data).then(res=>{
                this.semiProducts=[...this.semiProducts,...res.dataPlan]
            }) 
        },
        handHuyPlan(){
            let data={
                PLA_ID:this.dataPlan.PLA_ID
            }
            this.HuyPlan(data).then(res=>{
                this.pro_getWOofDemands()
            })
        },
        handConfirmWHPlanOfDemain(){
            let data={
                PLA_ID:this.dataPlan.PLA_ID
            }
            this.ConfirmWHPlanOfDemain(data)
        },
        handConfirmTECPlanOfDemain(){
            let data={
                PLA_ID:this.dataPlan.PLA_ID
            }
            this.ConfirmTECPlanOfDemain(data)
        },
        handConfirmQCPlanOfDemain(){
            //console.log(this.dataPlan);
            let data={
                PLA_ID:this.dataPlan.PLA_ID
            }
            this.ConfirmQCPlanOfDemain(data)
        },
        handConfirmBOMPlanOfDemain(){
             let data={
                PLA_ID:this.dataPlan.PLA_ID
            }
            this.ConfirmBOMPlanOfDemain(data)
        },
        handSuaPlanOfDemand(){
            this.SuaPlanOfDemand(this.dataPlan).then(()=>{
                let data={PDD_ID:this.$route.query.id}
                this.getListBomHDROfDemand(data).then(res=>{
                    this.semiProducts=res.dataBomHDRPlan
                }) 
            })
        },
        handAddPlanOfDemain(){  
            //console.log(this.dataPlan);          
            this.AddPlanOfDemand(this.dataPlan).then(()=>{
                let data={PDD_ID:this.$route.query.id}
                this.getListBomHDROfDemand(data).then(res=>{
                    this.semiProducts=res.dataBomHDRPlan
                }) 
            })
        },
        handXacNhanPlanOfDemain(){
            let data={
                PLA_ID:this.dataPlan.PLA_ID
            }
            this.XacNhanPlanOfDemand(data).then(()=>{
                this.pro_getWOofDemands()
            })
        },
        pro_getWOofDemands(){
            let data={PDD_ID:this.$route.query.id}            
            this.getWOofDemands(data).then(res=>{
                this.dataPlan=res.dataPlan
                //console.log(this.dataPlan);
                this.getListBomHDROfDemand(data).then(res=>{
                    this.semiProducts=res.dataBomHDRPlan
                })
            })
        },
        Pro_grtPlanType(){
            this.getPlanType().then(res=>{
                this.dataPlanType= res.dataPlanType
                if (!this.dataPlan.PLAN_TYPE)
                    this.dataPlan.PLAN_TYPE=this.dataPlanType[0].CODE_NAME
            })
        }
    }, 
    created(){
        this.pro_getWOofDemands()
        this.Pro_grtPlanType()

    }
}
</script>

<style scoped>
.groupBTP {
    border:2px;
    border-style: inset
}
</style>