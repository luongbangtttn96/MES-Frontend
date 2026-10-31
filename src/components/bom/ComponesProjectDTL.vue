<template>
    
    <tr>       
      <td style="padding: 3px;"  v-if="!showMateral">  
          <div class="bom-detail-actions">
            <el-button
              link
              :icon="CaretRight"
              :class="{ 'is-expanded': showMateral }"
              :aria-label="showMateral ? 'Thu gọn bán thành phẩm' : 'Mở bán thành phẩm'"
              :title="showMateral ? 'Thu gọn bán thành phẩm' : 'Mở bán thành phẩm'"
              @click="CloseSemiProDTL"
            />
            <el-button
              link
              :icon="EditPen"
              aria-label="Cập nhật bán thành phẩm"
              title="Cập nhật bán thành phẩm"
              @click="handShowUpdateBOMHDR(item.BOM_HDR_ID, item.PROJ_ID)"
            />
            <el-button
              link
              type="warning"
              :icon="WarningFilled"
              aria-label="Thiết lập FAI"
              title="Thiết lập FAI"
              @click="handShowSetupFAI(item.BOM_HDR_ID)"
            />
          </div>
        </td>
      <td style="min-height: 80px; "  v-if="!showMateral"> 
        <div>
         
          {{item.BOM_HDR_ID}}  
          </div>
      </td>        
      <td style="min-height: 80px; "  v-if="!showMateral"> <div>{{item.BOM_CODE}}</div></td>
      <td style="min-height: 80px; "  v-if="!showMateral"> <div >{{item.BOM_NAME}}</div></td>
      <td style="min-height: 80px; "  v-if="!showMateral"> {{item.PART_NUM}}  </td>
      <td style="min-height: 80px; "  v-if="!showMateral"><div>{{item.DESCRIPTION}}</div> </td>
      <td style="min-height: 80px; "  v-if="!showMateral"><div>{{item.QTY}}</div> </td>
      <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.SORT}}</div></td>
      <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.LABOR_QTY}}</div></td>
      <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.PRODUC_EVERY_HOUR}}</div></td>
      <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.DEPT_NAME}}</div></td>
      <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.NOTE}}</div></td>
      <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.UPDATED}}</div></td>
      <!-- BOM CODE, BOM NAME, ITEM CODE, DESCRIPTION, ACTIVe, NOTE, CREATED, UPDATED, -->
      <!-- [BOM_HDR_ID] ,[BOM_CODE] ,[BOM_NAME]  ,[TME_ID]  ,[PART_NUM] ,[PART_NAME]  ,[DESCRIPTION]  ,[IS_ACTIVE] ,[NOTE] -->
       <td style="padding: 3px;" v-if="showMateral" colspan="13">  
           <div style="overflow: auto;">
           <semiPorductComponent 
            :showMateral = "showMateral"
            :semiProItem= "item"
             @Close-SemiProDTL="CloseSemiProDTL"
            />
            <!-- :listMaterial="listMaterial"
            @Close-SemiProDTL="CloseSemiProDTL" -->
           </div>
        </td>

    </tr>        
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CaretRight, EditPen, WarningFilled } from '@element-plus/icons-vue'

import SemiPorductComponent from './semiPorductComponent.vue'
import type { BomHeaderItem } from '@/types/bom'

defineProps<{
  item: BomHeaderItem
}>()

const showMateral = ref(false)

function handShowUpdateBOMHDR(id?: string | number, projectId?: string | number) {
  const src = `/bom/BOMHDR_ItemUpdate?id=${encodeURIComponent(String(id ?? ''))}&PROJ_ID=${encodeURIComponent(String(projectId ?? ''))}`
  window.open(
    src,
    'newWin',
    'fullscreen=yes, scrollbars=auto, titlebar=no  width=600,height=450',
  )
}

function handShowSetupFAI(id?: string | number) {
  const src = `/qc/SetUpMaterialFAI?id=${encodeURIComponent(String(id ?? ''))}`
  window.open(src, 'newWin', 'fullscreen=yes, scrollbars=auto, titlebar=no')
}

function CloseSemiProDTL() {
  showMateral.value = !showMateral.value
}
</script>

<style>
.bom-detail-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
}

.bom-detail-actions .el-button {
  width: 28px;
  height: 28px;
  margin: 0;
  font-size: 15px;
}

.bom-detail-actions .el-button:first-child .el-icon {
  transition: transform 160ms ease;
}

.bom-detail-actions .el-button:first-child.is-expanded .el-icon {
  transform: rotate(90deg);
}

</style>