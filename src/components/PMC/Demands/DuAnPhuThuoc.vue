<template>
  <div class="border">
    <ul>
        <li v-for="item in Projects" :key="item">{{ item.NUM_WO }}</li>
    </ul>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            Projects:[] 
        }
    },
    props:{
        Demand_PART:{
            type:Object,
            default: null
        }
    },
    watch:{
        Demand_PART(){
            let data={
            PDD_ID: this.Demand_PART.PDD_ID || this.$route.query.id,
            PART_NUM:this.Demand_PART.PART_NUM || this.$route.query.PART_NUM
            }
            this.getProjecttPhuthuoc(data).then(res=>{
                this.Projects=res.Projects
            })
        }
    },
    methods:{
        ...mapActions([
            'getProjecttPhuthuoc'
        ])
    },
    created(){
        
    }
}
</script>

<style>

</style>