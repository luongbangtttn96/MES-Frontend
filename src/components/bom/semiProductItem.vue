<template>
      <table class="semi-product-summary">    
        <tbody>
          <tr>       
            <th class="action-column"> 
              <el-button
                link
                :icon="ArrowLeft"
                aria-label="Đóng chi tiết bán thành phẩm"
                title="Đóng chi tiết bán thành phẩm"
                @click="CloseSemiProDTL"
              />
            </th>
            <th> {{semiProItem.BOM_HDR_ID}}  </th>
            <th> <div>{{semiProItem.BOM_CODE}}</div></th>
            <th> <div >{{semiProItem.BOM_NAME}}</div></th>
            <th> {{semiProItem.PART_NUM}}  </th>
            <th><div>{{semiProItem.DESCRIPTION}}</div> </th>
            <th><div>{{semiProItem.QTY}}</div> </th>
            <th><div >{{semiProItem.SORT}}</div></th>
            <th><div >{{semiProItem.LABOR_QTY}}</div></th>
            <td><div >{{semiProItem.PRODUC_EVERY_HOUR}}</div></td>
            <th><div >{{semiProItem.DEPT_NAME}}</div></th>
            <th><div >{{semiProItem.NOTE}}</div></th>
            <th><div >{{semiProItem.UPDATED}}</div></th>
            
          </tr>
        </tbody>
      </table>      
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'

import type { BomHeaderItem } from '@/types/bom'

defineProps<{
  semiProItem: BomHeaderItem
}>()

const emit = defineEmits<{
  (event: 'Close-SemiProDTL'): void
}>()

function CloseSemiProDTL() {
  emit('Close-SemiProDTL')
}
</script>

<style scoped>
.semi-product-summary {
  width: 100%;
  min-width: 1280px;
  border-collapse: separate;
  border-spacing: 0;
  color: #24352d;
  font-size: 13px;
  text-align: left;
}

.semi-product-summary th,
.semi-product-summary td {
  min-height: 64px;
  padding: 12px;
  border-bottom: 1px solid #d4e2d9;
  background: #e8f1eb;
  color: #43574a;
  font-weight: 600;
  vertical-align: middle;
}

.semi-product-summary th:nth-child(1) {
  min-width: 90px;
}

.semi-product-summary th:nth-child(2) {
  min-width: 100px;
}

.semi-product-summary th:nth-child(3),
.semi-product-summary th:nth-child(4) {
  min-width: 150px;
}

.semi-product-summary th:nth-child(5) {
  min-width: 200px;
}

.semi-product-summary th:nth-child(6) {
  min-width: 300px;
}

.semi-product-summary th:nth-child(7),
.semi-product-summary th:nth-child(8),
.semi-product-summary th:nth-child(9) {
  min-width: 60px;
}

.semi-product-summary th:nth-child(10) {
  min-width: 100px;
}

.semi-product-summary th:nth-child(11) {
  min-width: 200px;
}

.semi-product-summary th:nth-child(12) {
  min-width: 100px;
}

.semi-product-summary .el-button {
  width: 28px;
  height: 28px;
  margin: 0;
  color: #287451;
  font-size: 17px;
}
</style>