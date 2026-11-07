<template>
  <div>
      <div class="row container">
        <div class="col-head" style="width:20px"> </div>
        <div class="col-head" style="width:40px"> Id</div>
        <div class="col-head" style="width:150px"> Line Name </div>
        <div class="col-head" style="width:50px "> NL </div>
        <div class="col-head" style="width:70px "> Nhân Công </div>
        <div class="col-head" style="width:70px "> Linh Kiện</div>
        <div class="col-head" style="width:50px "> Số giờ</div>
        <div class="col-head" style="width:150px "> Băt đầu</div>
        <div class="col-head" style="width:150px "> Kết thúc</div>
      </div>
      <div style="overflow: auto; height:300px">
          <lineItem 
            v-for="(item, index) in dataInfoLineOfsetPlanBom"
            :key="index"
            :stt="index"
            :infoline="item"
            @NhapInfoLine="NhapInfoLine"
            @UpdateShowline="UpdateShowline"
          />
      </div>
  </div>
</template>

<script>
import lineItem from './LineItem.vue'
export default {

components:{
    lineItem,
    
}, 
props:{
    dataInfoLineOfsetPlanBom:{
        type: Array,
        default: null
    }
},
methods:{
    NhapInfoLine(data_line){
        console.log(data_line);
         this.$emit('NhapInfoLine',data_line)
        // this.dataInfoLineOfsetPlanBom[n].CAPACITY
        // this.dataInfoLineOfsetPlanBom[n].people
    },
    UpdateShowline(n){
        this.$emit('UpdateShowline',n)
    },
},
}
</script>

<style>
.col-head{
   margin-right:1px;
   background-color: rgb(46, 78, 138); 
   color: rgb(255, 255, 255);
}
</style>