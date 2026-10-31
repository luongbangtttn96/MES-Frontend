<template>
  <div style="overflow: auto">
    <semiProductItem
      :semiProItem="semiProItem"
      @Close-SemiProDTL="CloseSemiProDTL"
    />

    <table class="table table-sm table-hover table-striped">
      <materialListHDR
        @ImportUpdate_CPA_Excel="ImportUpdate_CPA_Excel"
        @saveData_CPAExcel="saveData_CPAExcel"
      />
      <tbody>
        <materialItem
          v-for="(item, index) in listMaterial"
          :key="index"
          :item="item"
        />
        <materialItemExcel
          v-for="(item, index) in listMaterialExcel"
          :key="index"
          :item="item"
          :id="index"
        />
        <materialItemAdd
          :semiProItemId="semiProItem.BOM_HDR_ID"
          @ImportDataMaterialExcel="ImportDataMaterialExcel"
          @saveMaterialExcel="saveMaterialExcel"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue'

import { useBomStore } from '@/stores/bom.store'

import type { BomMaterialExcelRow, BomMaterialItem, BomHeaderItem } from '@/types/bom'
import MaterialItem from './materialItem.vue'
import MaterialItemAdd from './materialItemAdd.vue'
import MaterialItemExcel from './materialItemExcel.vue'
import MaterialListHDR from './materialListHDR.vue'
import SemiProductItem from './semiProductItem.vue'

const bomStore = useBomStore()

interface MaterialType {
  PART_NUM: string
  DESCRIPTION?: string
}

interface LegacyStore {
  dispatch: (action: string, payload?: unknown) => Promise<any>
}

const props = defineProps<{
  semiProItem: BomHeaderItem
}>()

const emit = defineEmits<{
  (event: 'Close-SemiProDTL'): void
}>()

const store = (getCurrentInstance()?.proxy as { $store?: LegacyStore } | null)?.$store
const listMaterial = ref<BomMaterialItem[]>([])
const listMaterialExcel = ref<BomMaterialExcelRow[]>([])

function CloseSemiProDTL() {
  emit('Close-SemiProDTL')
}

async function saveData_CPAExcel() {
  const data = {
    BOM_HDR_ID: props.semiProItem.BOM_HDR_ID,
    Datas: listMaterial.value,
  }

  await store?.dispatch('saveListCustomer_PARExcel', data)
  await pro_getSemiPro_ListMateral()
}

function ImportUpdate_CPA_Excel(rows: BomMaterialExcelRow[]) {
  listMaterial.value.forEach((item) => {
    const matchingRow = rows.find((row) => row.PART_NUM === item.PART_NUM)
    if (matchingRow) item.CUSTOMER_PART = matchingRow.CUSTOMER_PART
  })
}

async function ImportDataMaterialExcel(rows: BomMaterialExcelRow[]) {
  const partNumbers = rows.map((row) => row.PART_NUM ?? '')
  const partNumbersParam = `'${partNumbers.map((partNumber) => `','${partNumber}`).join('')}'`
  const response = await store?.dispatch('getTypeMaterial', partNumbersParam)
  const materialTypes = (response?.parts_type ?? []) as MaterialType[]

  rows.forEach((row) => {
    row.dataExists = false
    const materialType = materialTypes.find((type) => type.PART_NUM === row.PART_NUM)
    if (materialType) {
      row.DESCRIPTION = materialType.DESCRIPTION
      row.dataExists = true
    }
  })

  listMaterialExcel.value = rows
}

async function saveMaterialExcel(semiProId: string | number) {
  await store?.dispatch('saveListMaterial_semi', {
    semiPro_ID: semiProId,
    Materiallist_semi: listMaterialExcel.value,
  })
}

async function pro_getSemiPro_ListMateral() {
  const response = await bomStore.getSemiPro_ListMateral(props.semiProItem.BOM_HDR_ID)
  listMaterial.value = response?.listMaterialSemi ?? []
  console.log('listMaterial:', listMaterial.value)
}

onMounted(() => {
  void pro_getSemiPro_ListMateral()
})
</script>

<style>
</style>