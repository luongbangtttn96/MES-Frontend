<template>
  <tr :class="mau">
    <td style="padding: 3px" v-if="!showMateral">
      <div class="material-row-actions">
        <el-button
          link
          :icon="EditPen"
          aria-label="Cập nhật vật liệu BOM"
          title="Cập nhật vật liệu BOM"
          @click="handshowFormUpdateItemBOMDTL(item.BOM_DTL_ID)"
        />
        <el-button
          link
          :type="item.IS_ACTIVE ? 'warning' : 'success'"
          :icon="Switch"
          :aria-label="item.IS_ACTIVE ? 'Ngừng kích hoạt vật liệu' : 'Kích hoạt vật liệu'"
          :title="item.IS_ACTIVE ? 'Ngừng kích hoạt vật liệu' : 'Kích hoạt vật liệu'"
          @click="handSetActiveMaterialOfBom(item.BOM_DTL_ID)"
        />
        <el-button
          v-if="item.IS_ACTIVE == false"
          link
          type="danger"
          :icon="Delete"
          aria-label="Xóa vật liệu BOM"
          title="Xóa vật liệu BOM"
          @click="handSetDeleteMaterialOfBom(item.BOM_DTL_ID)"
        />
      </div>
    </td>
    <td style="min-height: 80px" v-if="!showMateral">
      <div>{{ item.BOM_DTL_ID }}</div>
    </td>
    <td
      style="min-height: 80px"
      v-if="!showMateral"
      @click="handShowFomUpdate_Manufacturer_Material(item.PART_NUM)"
    >
      <div>{{ item.PART_NUM }}</div>
    </td>
    <td style="min-height: 80px" v-if="!showMateral">
      <div>{{ item.DESCRIPTION }}</div>
    </td>
    <!-- <td style="min-height: 80px; "  v-if="!showMateral"> {{item.BOM_CODE}}  </td> -->
    <td style="min-height: 80px" v-if="!showMateral">
      <div>{{ item.QTY }}</div>
    </td>
    <td style="min-height: 80px" v-if="!showMateral">
      <div>{{ item.UNIT }}</div>
    </td>
    <td style="min-height: 80px" v-if="!showMateral">
      <div>{{ item.PART_NUM_REPLACE }}</div>
    </td>
    <!-- <td style="min-height: 80px; " v-if="!showMateral"><div >{{item.SORT}}</div></td> -->
    <td style="min-height: 80px" v-if="!showMateral">
      <div>{{ item.NOTE }}</div>
    </td>
    <td style="min-height: 30px" v-if="!showMateral">
      <div>
        <el-checkbox v-model="item.IS_SIME" disabled />
      </div>
    </td>
    <td style="min-height: 80px" v-if="!showMateral">
      <div>{{ item.UPDATED }}</div>
    </td>
    <td style="min-height: 80px" v-if="!showMateral">
      <div>{{ item.CUSTOMER_PART }}</div>
    </td>
    <!-- [BOM_DTL_ID],[PART_NUM],[DESCRIPTION],[BOM_CODE] ,[QTY] ,[UNIT]
      ,[PART_NUM_REPLACE],[SORT] ,[NOTE],[CREATED_AT],[UPDATED_AT],[PICTURE]-->
  </tr>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Delete, EditPen, Switch } from '@element-plus/icons-vue'

import { useBomStore } from '@/stores/bom.store'
import type { BomMaterialItem } from '@/types/bom'

const props = defineProps<{
  item: BomMaterialItem
}>()

const bomStore = useBomStore()
const showMateral = ref(false)
const mau = computed(() => (props.item.IS_ACTIVE ? '' : 'mauNenXam'))

function handShowFomUpdate_Manufacturer_Material(partNum?: string) {
  const src = `/#/pmc/Update_Manufacturer_Material?PART_NUM=${encodeURIComponent(partNum ?? '')}`
  window.open(src, '', 'scrollbars=auto,width=450,height=550, titlebar=no')
}

async function handSetActiveMaterialOfBom(bomDtlId: string | number) {
  const response = await bomStore.SetActiveMaterialOfBom({ BOM_DTL_ID: bomDtlId })
  if (response?.ok) {
    props.item.IS_ACTIVE = !props.item.IS_ACTIVE
  }
}

async function handSetDeleteMaterialOfBom(bomDtlId: string | number) {
  await bomStore.deleteMaterialOfBom({ BOM_DTL_ID: bomDtlId })
}

function handshowFormUpdateItemBOMDTL(id: string | number) {
  const src = `/#/bom/BOMDTL_ItemUpdate?id=${encodeURIComponent(String(id))}`
  window.open(
    src,
    'BOMDTL_ItemUpdate',
    'fullscreen=yes, scrollbars= auto, width=600,height=450, titlebar=no',
  )
}
</script>

<style>
.material-row-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
}

.material-row-actions .el-button {
  width: 28px;
  height: 28px;
  margin: 0;
  font-size: 15px;
}

.material-row-actions .el-button.is-warning {
  color: #a96a16;
}
</style>