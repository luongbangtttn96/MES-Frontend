<template>
  <div>
    <title-page :titlepage="'Đề nghị giao hàng cho '  " />
    <div>
        <label>SO CODE:</label>
        <input type="text" size="20" v-model="SO_CODE" maxlength="60">
        <button @click="handgetYC_Xuat_SO()">Seach</button>
    </div>
    <div>
        <table class="table">
            <thead>
                <th>STT</th>
                <th>SỐ PHIẾU</th>
                <th>NGÀY</th>
                <th>NỘI DUNG</th>
                <th>P/N</th>
                <th>TÊN HH</th>
                <th>SỐ LƯỢNG</th>
                <th>REQUESTOR</th>
                <th>CONFIRMED </th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in dataYC_Xuat_SO" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.MRH_NUMBER }}</td>
                    <td>{{ item.MRH_DATE }}</td>
                    <td>{{ item.DESCRIPTION }}</td>
                    <td>{{item.IIT_CODE}}</td>
                    <td>{{item.NAME}}</td>
                    <td>{{item.REQUISITED_QUANTITY}}</td>
                    <td>{{ item.REQUESTOR }}</td>
                    <td>{{ item.CONFIRMED }}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex/dist/vuex.common.js';
import TitlePage from '../../../controls/TitlePage.vue'
export default {
    data(){
        return{
            SO_CODE: this.$route.query.SO_CODE,
            dataYC_Xuat_SO:[]
        }
    },
  components: { TitlePage },
  methods:{
    ...mapActions(['getYC_Xuat_SO']),
    handgetYC_Xuat_SO(){
        let data={SO_CODE:this.SO_CODE}
        this.getYC_Xuat_SO(data).then(res=>{
            this.dataYC_Xuat_SO=res.dataYC_Xuat_SO
        })
    },
    },
    created(){
        this.handgetYC_Xuat_SO()
    }

}
</script>

<style>

</style>