<template>
<tr :class="item.mau">
    <th :rowspan="item.songay" v-if="item.ngay!=''"><h6><b>{{item.ngay}}</b></h6> </th> 
    <th :rowspan="item.sobp" v-if="item.DEPT_NAME!=''"> {{item.DEPT_NAME}}</th>
    <td > {{item.NUM_WO}}</td>
    <td > {{item.BOM_CODE}}</td>
    <td @dblclick="handChagerLine_PlanScherdu($event,item)"> {{item.LINE_NAME}}</td>
    <td > {{item.CAPACITY}}</td>
    <td > {{item.WORKER}}</td>
    <td > {{item.QTY}}</td>
    <td > {{item.START_TIME}}</td>
    <td > {{item.END_TIME}}</td>
    <td > 
        <span style='cursor: pointer;font-size:14px' @click="ganLichThucHienTheoGio(item.PLA_DSP_ID)">&#9788;</span>
        <span class="contro_hand" @click="handDeleteScheduleProduc(item.PLA_DSP_ID)">&#10006;</span>
    </td>
</tr>
</template>

<script>
import { mapActions } from 'vuex'
export default {
data(){
    return{

    }
},
props:{
    item:{
        type:Object,
        default: null
    }
},
methods:{
    ...mapActions([
        'SetScheduleProducLineOnHour',
        'DeleteScheduleProduc'
    ]),
    handChagerLine_PlanScherdu(event,item){
        this.$emit('changeLine_PlanSchdure',event,item)
        //console.log(item);
    },
     ganLichThucHienTheoGio(id){
            this.SetScheduleProducLineOnHour(id).then(res=>{
            })
        },
        handDeleteScheduleProduc(id){
            if (confirm('Bạn có xóa lịch SX này không') == true) {
                this.DeleteScheduleProduc(id).then(res=>{
                    this.getPlanline_online()
                })
            }           
        }
}
}
</script>

<style scoped>
    .mau0{ background:#FFFF33; margin: 1; padding: 1;}
    .mau1{ background: rgba(255, 255, 255, 0.978);  margin: 1;padding:1}
</style>