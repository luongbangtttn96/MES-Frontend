<template>
  <div :class="'row container ' + iscolor ">
        <div style="width:20px" @click="SavePLanLine(stt)"> <samp> &#10010;</samp>    </div>
      <div style="width:43px">{{stt+1}}</div>
      <div style="width:150px"> {{infoline.LINE_NAME}} </div>
      <div style="width:50px "> 
          <input type="number" :value="infoline.CAPACITY" style="width:70px " 
            :id="'capacity' +  stt"
            @blur="NhapInfoLine(stt)"> </div>
      <div style="width:72px "> 
          <input type="number" :value="infoline.people" style="width:72px "
            :id="'people' + stt"
            @blur="NhapInfoLine(stt)"
          > </div>
      <div style="width:73px "> {{infoline.QTY}}</div>
      <div style="width:50px "> {{infoline.time}}</div>
      <div style="width:150px"> {{infoline.START_TIME}}</div>
      <div style="width:150px"> {{infoline.END_TIME}}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
computed:{
    iscolor(){
        if(this.infoline.exists===1){ return 'color_xanh'}
        else{ return ''}
    }
    }, 
props:{
    stt: Number,
    infoline:{
        type: Object,
        default: null
    }
},
methods:{
    ...mapActions([
        'Save_Planline'
    ]),
    NhapInfoLine(n){
        let data_line={
            index:n,
            CAPACITY : document.getElementById("capacity" + n).value,
            people : document.getElementById("people" + n).value
        }
        this.$emit('NhapInfoLine', data_line)
    },
    UpdateShowline(n){
        this.$emit('UpdateShowline',n)
    },
    SavePLanLine(n){
        //console.log(this.infoline);
        this.Save_Planline( this.infoline).then(res=>{
            if (res.ok) {
                this.$emit('UpdateShowline',n)
            }
        });
    },
},
}
</script>

<style>
.color_xanh{
    background-color: rgba(0, 128, 0, 0.705);
}
</style>