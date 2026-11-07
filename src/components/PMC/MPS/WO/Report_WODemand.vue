<template>
<div>
    <div id="printToPDF">
        <div>
            <img src='../../../assets/HEAD LETTER 102021.jpg' width="100%" alt="">
        </div>
        <br>
        <div class="container text-center col-12"><h3><b><label for="">LỆNH SẢN XUẤT</label></b></h3></div>
        <div class="container text-center col-12"> <h4><label for=""> Work Order</label></h4></div>
        <div class="container text-right col-12">Ngày: {{ObjectPlan.CREATED_AT}} </div>
        <div>Số: <b> {{ObjectPlan.NUM_WO}} </b> </div>
        <div>Họ và tên người đề nghị (Propose): {{currentUser.fullName}}</div>
        <div class="row">
            <div class="col">Tên SP: <b>{{ObjectPlan.PROJ_NAME}}</b>  </div>
            <div class="col">Model SP: <b>{{ObjectPlan.PROJ_CODE}}</b>  </div>
            <div class="col">Mã ERP SP: <b>{{ObjectPlan.PART_NUM}} </b></div>
        </div>
        <div> PO:<b> {{ObjectPlan.PO_CODE}} </b></div>
         <div> Sale Order:<b> {{ObjectPlan.SALEODER_CODE}} </b></div>
        <div> Số lượng:<b> {{ObjectPlan.QTY}} </b></div>
        <div class="row">
            <div class="col-4">Từ ngày: <b>{{ObjectPlan.START_DATE}}</b> </div>
            <div class="col-4">Đến Ngày: <b>{{ObjectPlan.END_DATE}}</b> </div>
        </div>
        <div><i> <xmp style="font-size:16px;">{{ObjectPlan.NOTE}}</xmp></i></div>
        <div> <b> NỘI DUNG TRIỂN KHAI SẢN XUẤT </b></div>
        <table class="table table-sm table-hover table-striped">
            <thead>
                <th style="min-height: 70px; min-width:60px">No.</th>
                <th  style="min-height: 70px; min-width:100px">Semi Product</th>
                <th style="min-height: 70px; min-width:200px">P/N</th>
                <th style="min-height: 70px; min-width:100px">Unit</th>
                <th style="min-height: 70px; min-width:150px">Quantity</th>
                <th style="min-height: 70px; min-width:150px">Start date</th>
                <th style="min-height: 70px; min-width:60px">Finish date</th>
                <th style="min-height: 70px; min-width:60px">Department</th>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>Soạn linh kiện</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <!-- <td>{{item.START_DATE}}</td>
                     <td>{{item.END_DATE}}</td> -->
                    <td>  &ensp;/ &emsp;&ensp; /   </td>
                     <td>  &ensp;/ &emsp; &ensp;/  </td>
                    <td>Kho</td>
                </tr>
                <tr v-for="(item, index) in ObjectPlan.schedurSemi"
                    :key="index">   
                    <td>{{ parseInt(index) + 2 }}</td>
                    <td>{{item.BOM_NAME}}</td>
                    <td>{{item.PART_NUM}}</td>
                    <td>{{item.UNIT}}</td>
                    <td>{{item.QTY}}</td>
                    <!-- <td>{{item.START_DATE}}</td>
                     <td>{{item.END_DATE}}</td> -->
                    <td>  &ensp;/ &emsp;&ensp; /   </td>
                     <td>  &ensp;/ &emsp; &ensp;/  </td>
                    <td>{{item.DEPT_NAME}}</td>
                </tr>         
            </tbody>
        </table>
        <br>

         <div class="row contaner-fluid mt-2">
            <div class="col-md-6">
                <div class="m-1 col-12" style="background-color:lavender;">
                    <label for="">Xác nhận công đoạn</label>
                </div>
                <div>

                </div>
            </div>
           
            <div class="col-md-6">
                <div class="col-12 m-1" style="background-color:lavender;">
                    <label for="">Ký Duyệt Lệnh SX</label>
                </div>
            </div>
            
        </div>

    </div>
    <div id="elementH"></div>
    <!-- <button @click="convert_HTML_to_PDF()">Pring</button> -->
</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
 data(){
    return {
        ObjectPlan:{},
        Wo_Semi:{}
    }
    } ,
    computed:{
        ...mapGetters([
            'currentUser'
        ])
    },
    methods:{
        ...mapActions([
            'getWOReport'
        ]),
    convert_HTML_to_PDF(){
        var doc = new jsPDF();
        var elementHTML = $('#printToPDF').html();
        var specialElementHandlers = {
            '#elementH': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML(elementHTML, 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });

        // Save the PDF
        doc.save('sample-document.pdf');
    }
        
    },
    created(){
        this.getWOReport(this.$route.query.WOID). then(res=>{
            this.ObjectPlan=res.ObjectPlan
            //console.log(this.ObjectPlan);
        })
    }
}

</script>

<style>

</style>