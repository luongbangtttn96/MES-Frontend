<template>
  <div>
    <title-page :titlepage="'Mã Nguyên liệu'" />
    <div class="action-bar row justify-content-between ml-1 mr-1">
      <div class="search-box">
        <div class="input-group">         
          <el-input
            v-model="search"
            class="bom-search"
            clearable
            placeholder="Search nguyên liệu từ data..."
            aria-label="Search nguyên liệu từ data..."
          >
            <template #append>
              <el-button @click="handSearch_material">
                <el-icon><Search /></el-icon>Search
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div>
        <table class="table tableFixHead">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>MFR PN</th>
                <th>UNIT</th>
                <th>LEADTIME</th>
                <th>MOQ</th>
                <th>SPQ</th>  
                <th>Chân LK</th>
                <th>NCNR</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in dataMaterals" :key="index">
                    <td> {{item.PART_NUM}}</td>
                    <td> {{item.PART_NAME}}</td>
                    <td> {{item.DESCRIPTION}}</td>
                    <td> {{item.MATERIAL_CODE}}</td> 
                    <td> {{item.UNIT}}</td>
                    <td> {{item.LEADTIME}}</td>
                    <td> {{item.MOQ}}</td>
                    <td> {{item.POQ}}</td> 
                    <td> {{item.FOOTPRINT}}</td>
                    <td> <input type="checkbox" v-model="item.NCNR" disabled></td>

                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMaterialStore } from '@/stores/material.store'
import {  Search } from '@element-plus/icons-vue'

import TitlePage from '@/components/controls/TitlePage.vue'


interface Material {
  PART_NUM: string
  PART_NAME: string
  DESCRIPTION: string
  MATERIAL_CODE: string
  UNIT: string
  LEADTIME: number
  MOQ: number
  POQ: number
  FOOTPRINT: string
  NCNR: boolean
}

const materialStore = useMaterialStore()

const dataMaterals = ref<Material[]>([])
const search = ref('')
// const totalPages = ref(0)
// const v_Pagination = ref({size: 10})

const handSearch_material = () => {
  PRO_Search_material()
}

const PRO_Search_material = async () => {
  let data={      
    DESCRIPTION: search.value,
  }
  const res: any =await materialStore.Search_material(data)
  dataMaterals.value= res.dataMaterals
  // totalPages.value = Math.ceil(res.Tota_PN/v_Pagination.value.size)
}


</script>

<style>

</style>