<template>
      <table class="project-summary-table">    
        <tbody>
          <tr>       
            <th class="action-column" style="min-height: 80px; min-width: 85px;"> 
              <el-button
                link
                :icon="ArrowLeft"
                aria-label="Đóng chi tiết dự án"
                title="Đóng chi tiết dự án"
                @click="CloseBomHDR"
              />
            </th>
            <th style="min-height: 80px; min-width:100px"> {{ project?.id }}  </th>
            <th style="min-height: 80px; min-width:150px"> <div>{{ project?.code_project }}</div></th>
            <th style="min-height: 80px; min-width:150px"> <div>{{ project?.PROJ_NAME }}</div></th>
            <th style="min-height: 80px; min-width:150px"> {{ project?.PART_NUM }}  </th>
            <th style="min-height: 80px; min-width:300px"><div>{{ project?.discription }}</div> </th>
            <th style="min-height: 80px; min-width:60px"><div >{{ project?.IS_ACTIVE }}</div></th>
            <th style="min-height: 80px; min-width:300px"><div >{{ project?.NOTE }}</div></th>
            <th style="min-height: 80px; min-width:100px"><div >{{ project?.Update }}</div></th>
          </tr>        
        </tbody>
      </table>      
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'

import type { ProjectItem } from '@/types/bom'

const props = defineProps<{
  project?: ProjectItem | null
}>()

const emit = defineEmits<{
  (event: 'Close-BomHDR'): void
}>()

function CloseBomHDR() {
  emit('Close-BomHDR')
}
</script>

<style>
.project-summary-table {
  width: 100%;
  min-width: 1120px;
  border-collapse: separate;
  border-spacing: 0;
  color: #24352d;
  font-size: 13px;
  text-align: left;
}

.project-summary-table th {
  padding: 12px;
  border-bottom: 1px solid #d4e2d9;
  background: #e8f1eb;
  color: #43574a;
  font-size: 12px;
  font-weight: 650;
  vertical-align: middle;
}

.project-summary-table th:first-child {
  position: sticky;
  left: 0;
  z-index: 1;
  background: #e1eee5;
}

.project-summary-table .el-button {
  width: 28px;
  height: 28px;
  margin: 0;
  color: #287451;
  font-size: 17px;
}

</style>