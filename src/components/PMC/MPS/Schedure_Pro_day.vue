<template>
  <div class="divrow">
      <div > 
      <div class="hours" v-for="item in hours"
      :key="item"
      :hou="item"
      > {{item}} </div>
    </div>
    <shecdureProLine 
      v-for="(item, index) in datangay"
      :key="index"
      :dataline="item"
    />
  </div>
</template>

<script>
import shecdureProLine from './Shecdure_Pro_Line.vue'
export default {
    data(){
        return{
            hours:[23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
        }
    },
    components:{
        shecdureProLine,
    }, 
    props:{
        datangay:{
            type: Array,
            default: null
        }
    }
}
</script>

<style>
.hours{
    border-width: 2px;
    border-style: outset;
    height: 50px;
    width: 75px;
    text-align: center; 
    font-size: 20px;
    font-weight: bold;
    margin: 1px;
    padding-top: 0;
}
</style>