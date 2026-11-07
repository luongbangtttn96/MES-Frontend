<template>
  <div>
    <title-page :titlepage="'Báo cáo Tổng hợp lệnh SX theo tháng'" />
    <label>Tháng:</label>
    <input type="month" v-model="Month" @change="Pro_getDataBIWOMonth">
    <!-- biểu đồ  -->
    <char-bar 
        :chartData="dataWOChitietchar" 
        :height=250
        :options="options"/>
    <!-- Chi tiết -->

    <table class="table table-bordered b-table-fixed table-responsive">
        <thead>
            <th>ID</th>
            <th>Dự Án</th>
            <th>Lệnh SX</th>
            <th>Đã Chốt</th>
            <th>Đúng hạn</th>
            <th>SX hàng loạt</th>
            <th>Lệnh RW</th>
            <th>Lệnh Thử nghiệm</th>
            <th>Sản phẩm</th>
            <th>SP Đúng hạn</th>
            <th>Chậm TĐ</th>
        </thead>
        <tbody>
            <tr v-for="(item ,index) in dataDTLPlan"
            :key="index" :class="mau(item)">
                <td>{{ index+1 }}</td>
                <td>{{ item.PROJ_NAME }}</td>
                <td>{{ item.NUM_WO }}</td>
                <td>{{ item.Complate }}</td>
                <td>{{ item.Complate_On_Shedule }}</td>
                <td>{{ item.count_sx }}</td>
                <td>{{ item.count_rw }}</td>
                <td>{{ item.count_tn }}</td>
                <td>{{ item.Qty_Complate }}</td>
                <td>{{ item.Qty_complate_On_Shedule }}</td>
                <td>{{ item.dateQuaHan >0? item.dateQuaHan:0}}</td>
            </tr>
        </tbody>
       </table>

  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import CharBar from '../../../Chart/CharBar.vue';
import TitlePage from '../../../controls/TitlePage.vue';
export default {
    data(){
        return {
            dataChatPlan:[],
            dataWOChitietchar:{},
            dataDTLPlan:[],
            Month: moment().format('YYYY-MM'),
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                      stacked: true,
                      categoryPercentage: 0.5,
                      barPercentage: 1
                    }],
                      yAxes: [{
                      stacked: true
                    }]
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Custom Chart Title',
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    }
                }
            }
        }
    },
    components:{
        CharBar,
        TitlePage
    },
    computed:{
       
    },
    methods:{
        ...mapActions([
            'getDataBIWOMonth'
        ]),
        mau(item){
            if(item.Complate_On_Shedule==1) return 'mauNenXanh'
            if(item.Complate==1 && item.Complate_On_Shedule ==0 ) return 'mauNenDo'
        },
        Pro_getDataBIWOMonth(){
            let data={month: this.Month}
            this.getDataBIWOMonth(data).then(res=>{
                this.dataChatPlan = res.dataChatPlan
                this.dataDTLPlan = res.dataDTLPlan
                this.dataWOChitietchar= this.Pro_dataWOChitietchar()
            })
        },

        Pro_dataWOChitietchar(){
            let mau=['#f40606','#f87979','#3D5B96','#1EFFFF','#d9ec07','#ec07e0', '#e85708','#2de005','#140257',]
            let labels=[]
            //tạo nhãn trục hoành 12 tháng
           
            labels=["Tổng",
                    "Số WO hoàn thành" ,
                    "Số WO đúng tiến đổi" ,
                    "Số WO SXHL",
                    "Số WO SXRW",
                    "Số WO SXTN",
                    // "Số lượng SX" ,
                    // "Số lượng SX đúng hạn" ,
                ]                    
            
            let datasets=[]

            datasets.push({
                    label:"Số WO" ,
                    backgroundColor: mau[0],
                    data:[this.dataChatPlan[0].count_Tota,
                            this.dataChatPlan[0].Complate,
                            this.dataChatPlan[0].Complate_On_Shedule,
                            this.dataChatPlan[0].count_sx,
                            this.dataChatPlan[0].count_rw,
                            this.dataChatPlan[0].count_tn,
                            // this.dataChatPlan[0].Qty_Complate,
                            // this.dataChatPlan[0].Qty_complate_On_Shedule
                        ]
                })

            console.log({labels:labels,datasets: datasets});
            return {labels:labels,datasets: datasets}
        }
    },
    created(){
        this.Pro_getDataBIWOMonth() 
    }
}
</script>

<style>
 
</style>