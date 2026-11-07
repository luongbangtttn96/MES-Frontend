<template>
  <div>
    <table class="table ">
        <thead>
            <th>STT</th>
            <th>BOM NAME</th>
            <th>PART NUM</th>
            <th> PART THAY THẾ</th>
            <th>SỐ LƯỢNG</th>
            <th></th>
        </thead>
        <tbody>
            <tr v-for="(item, index) in dataPartnumDeficit_PLAN"
            :key="index" :class="item.MaUpdate==true?'mauNenHong':'' ">
                <td> {{index}} </td>
                <td> <b v-if="item.bom_moi==true">{{item.BOM_NAME}} </b>  </td>
                <td> {{item.PART_NUM}} </td>
                <td> {{item.PART_NUM_REPLACE}}</td>
                <td> {{item.QTY}} </td>
                <td><a class="btn" v-if="item.Active==false" @click="handXoaMaterial_plan(item.PLA_MAT_ID)">&#128465;</a></td>
            </tr>
        </tbody>
    </table>
    <div>
        <button class="btn bg_m2" @click="hanDongBoLenhSXBOM()">Đồng Bộ</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
data(){
    return{
        dataPartnumDeficit_PLAN:[]
    }
},
props:{
    PLAN_ID:Number
},
methods:{
    ...mapActions([
        'getPartnumDeficit_PLAN',
        'DongBoLenhSXBOM',
        'XoaMaterial_plan'
    ]),
    handXoaMaterial_plan(id){
        let data = {PLA_MAT_ID: id}
        console.log(data);
        this.XoaMaterial_plan(data)
    },
    hanDongBoLenhSXBOM(PLAN_ID){
        let data={
            PLAN_ID: this.$route.query.PLANID
        }
        this.DongBoLenhSXBOM(data).then(()=>{
            this.Pro_getPartnumDeficit_PLAN()
        })
    },
    Pro_getPartnumDeficit_PLAN(){
        let data={
            PLAN_ID: this.$route.query.PLANID
        }
        this.getPartnumDeficit_PLAN(data).then(res=>{
            this.dataPartnumDeficit_PLAN=res.dataPartnumDeficit_PLAN
            let bom_moi=0
            this.dataPartnumDeficit_PLAN.forEach(element=>{
                if(bom_moi!=element.BOM_HDR_ID){
                    element.bom_moi=true
                }else  element.bom_moi=false

                bom_moi=element.BOM_HDR_ID
            })
            console.log(this.dataPartnumDeficit_PLAN);
        })
    }
},
created(){
    this.Pro_getPartnumDeficit_PLAN()
}
}
</script>

<style>

</style>