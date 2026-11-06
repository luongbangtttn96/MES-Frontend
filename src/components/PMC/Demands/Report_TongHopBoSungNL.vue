<template>
    <div>
         <div class="mb-4">
            <img src='../../../../assets/HEAD LETTER 102021.jpg' width="100%" alt="">
        </div>
        
        <div class="container text-center col-12"><h3><b><label for="">PHIẾU ĐỀ NGHỊ MUA HÀNG</label></b></h3></div>
        <div class=" container text-right col-12">Hồ Chí Minh, Ngày:{{ToDay}}</div>
        <div class="col ml-2">Họ và tên người đề nghị (Propose): {{currentUser.fullName}}</div>
        <div class="col ml-2">Tên Dự Án: <b>{{this.$route.query.projec}}</b>  </div>
        <div class="row ml-2">
            <div class=" col-2">Từ Ngày: {{this.$route.query.Start}} </div>
            <div class=" col-2">Đến Ngày: {{this.$route.query.end}} </div>
        </div>
        <div class="clo ml-4">Số Lượng: <b> {{this.$route.query.qty}} </b> </div>
        
        <table class="table table-sm">
            <thead>
                <th>STT</th>
                <th>Mã nguyên liệu</th>
                <th>Tên nguyên liệu</th>
                <th>Đơn vị</th>
                <th>Số lượng</th>

            </thead>
            <tbody>
                <tr v-for="(item, index) in dataMaterial"
                :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.PART_NUM}} </td>
                    <td>{{item.PART_NAME}} </td>
                    <td>{{item.UNIT}} </td>
                    <td>{{item.QTY}} </td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
export default {

    data(){
       return{
        dataMaterial:null,
        ToDay:moment().format('DD/MM/YYYY')
       } 
    },
     computed:{
        ...mapGetters([
            'currentUser'
        ])
    },
    methods:{
        ...mapActions([
            'GetMaterial_ThieuChoDamends'
        ]),
        ProGetMaterial_ThieuChoDamends(id){
        this.GetMaterial_ThieuChoDamends({code:id}).then(res=>{
          this.dataMaterial=res.dataMaterial
          this.$forceUpdate()
        })
      },
    },
    created(){
        this.ProGetMaterial_ThieuChoDamends(this.$route.query.id)
    }
}
</script>

<style scoped>

</style>