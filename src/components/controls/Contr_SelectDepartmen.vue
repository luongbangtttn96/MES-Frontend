<template>
    <div class="form-group" style="padding:0 0 0 0px">
        <label for="DepatmenControlSelect1">Bộ Phận:</label>
        <input type="search" autocomplete="true" list="browsers" id="DepatmenControlSelect1" class="form-control form-control-sm"  @change="onChangeSelect($event)" /> 
        <datalist id="browsers">
            <option v-for="item in dataDepartmens"
                :key="item.DEPT_ID" 
                :value="item.DEPT_ID"> {{item.DEPT_NAME}} </option>
        </datalist>
           
        <!-- <select class="form-control small" 
        id="DepatmenControlSelect1"
        @change="onChangeSelect($event)"  
        >
        <option selected>Chọn bộ phận</option>
        <option v-for="item in dataDepartmens"
            :key="item.DEPT_ID" 
            :value="item.DEPT_ID"> {{item.DEPT_NAME}} </option>
        </select> -->
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useDepartmensStore, type departmenItem } from '@/stores/departmens.store';

const emit = defineEmits<{
  (e: 'getValue', value: any): void
}>()

const departmenStore = useDepartmensStore();

const dataDepartmens = ref<departmenItem[]>([]);


const  onChangeSelect=(event: Event) => {
            const target = event.target as HTMLInputElement;
            emit('getValue', target.value )
        }

onMounted(()=>{
        departmenStore.getListDepartmens().then(res=>{
        dataDepartmens.value=[...res.dataDepartmens]
        });
})
</script>

<style>

</style>