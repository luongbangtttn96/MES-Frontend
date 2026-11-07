<template>
  <div>
      <schedure-cell 
        v-for="(item, index) in dataCells"
        :key="index"
        :dataCell="item"
        />
  </div>
</template>

<script>
import schedureCell from '../components/CellHour/Cell.vue'
import { dateDiff } from '../../../helpers'
export default {    
    data(){
        return{

        }
    },
    props:{
        dataline:{
            type: Object,
            default: null
        }
    },
    computed:{
        dataCells(){
            let dt =Array.from({length: 24}, () => ({}))    ;
            if (this.dataline.dataProcSchedur.length>0){
                let m=this.dataline.dataProcSchedur.length
                    this.dataline.dataProcSchedur.forEach(element => {
                        let t=new Date(element.TIME.substr(0,19))
                        let nt=t.getHours()
                        dt[nt]=element
                        //console.log(t,nt,dt[nt]);
                    });
               
            } 
            return dt.reverse()
        }
    },
    components:{
        schedureCell,
        dateDiff
    }
}
</script>

<style>

</style>