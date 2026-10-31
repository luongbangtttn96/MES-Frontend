<template>
  <div style="overflow: auto;">
        <componentItemProject 
          :project="project"
          @Close-BomHDR="CloseBomHDR"
          />

      <table class="table table-sm table-hover table-striped">
          <componentProjectHDR />
        <tbody>
          <ComponesProjectDTL 
           v-for= "(item) in BomHDR"
            :key="item.BOM_HDR_ID"
            :item="item"            
             />
          <ComponesProjectExcel 
            v-for= "(item, index)  in BomExcel"
            :key="index"
            :item="item"
            :id="index"
            />
          <ComponesAddProject
              :ProjId="project?.id"
              @ImportDataExcel="ImportDataExcel"
              @saveExcel="saveExcel"
              @Add_BOMsemi="Por_Add_BOMsemi"
             />
        </tbody>
      </table>
      <base-dialog v-model:active="Show_addBOMHDR"
      :tile="`Thiết lập bán thành phẩm cho sản phẩm ID=${project?.id ?? ''}`" :width="'70%'" >
        <ADD_BOMHDR
          :PROJ_ID="project?.id"
          :PROJ_CODE="project?.code_project"
          :BomHDR="BomHDR"
          @getListBomHDR="Pro_getListBomHDR"
        />
      </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useBomStore } from '@/stores/bom.store'
import { useMaterialStore } from '@/stores/material.store'

import type { ProjectItem } from '@/types/bom'

import componentItemProject from './ComponetItemProject.vue'
import componentProjectHDR from './ComponesProjectHDR.vue'
import ComponesProjectDTL from './ComponesProjectDTL.vue'
import ComponesProjectExcel from './ComponesProjectExcel.vue'
import ComponesAddProject from './ComponesAddProject.vue'
import BaseDialog from '../controls/BaseDialog.vue'
import ADD_BOMHDR from './ADD_BOMHDR.vue'


const bomStore = useBomStore()
const materialStore = useMaterialStore()

const props = withDefaults(
  defineProps<{
    project?: ProjectItem | null
  }>(),
  {
    project: null,
  },
)

const emit = defineEmits<{ (e: 'show-BomHDR'): void }>()

const BomHDR = ref<any[]>([])
const BomExcel = ref<ProjectItem[]>([])
const Show_addBOMHDR = ref(false)

async function Pro_getListBomHDR(code_project?: string) {
  if (!code_project) {
    BomHDR.value = []
    return
  }
  const res = await bomStore.getListBomHDR(code_project)
  BomHDR.value = res?.BomHDR ?? []
}

function Por_Add_BOMsemi(_proj_id?: number | string) {
  Show_addBOMHDR.value = !Show_addBOMHDR.value
  console.log(BomHDR.value)
}

function CloseBomHDR() {
  emit('show-BomHDR')
}

async function ImportDataExcel(e: ProjectItem[]) {
  let str = ''
  e.forEach((data) => {
    str += "','" + (data.PART_NUM ?? '')
  })
  str = "'" + str + "'"

  const res = await materialStore.getTypeMaterial(str)
  const Type = res?.parts_type ?? []

  for (let j = 0; j < e.length; j++) {
    e[j].dataExists = false
    Type.forEach((type_material: { PART_NUM?: string; DESCRIPTION?: string }) => {
      if (e[j].PART_NUM == type_material.PART_NUM) {
        e[j].DESCRIPTION = type_material.DESCRIPTION
        e[j].dataExists = true
      }
    })
  }

  BomExcel.value = e
}

async function saveExcel(PROJ_ID?: number | string) {
  const data = {
    PROJ_ID,
    ListBomHDR: BomExcel.value,
  }

  const res = await bomStore.saveListBomHDR(data)
  BomHDR.value = res?.BomHDR ?? []
}

onMounted(() => {
  void Pro_getListBomHDR(props.project?.code_project)
})
</script>


<style>

</style>