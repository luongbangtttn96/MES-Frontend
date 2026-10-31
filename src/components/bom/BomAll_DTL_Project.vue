<template>
  <div class="containen-bom">
    <div class="bom-toolbar">
      <span class="bom-toolbar__label">Xuất file:</span>
      <el-button :icon="Download" @click="exportData('Xlsx')">Xlsx</el-button>
      <el-button :icon="Download" @click="exportData('Xls')">Xls</el-button>
      <el-button :icon="Download" @click="exportData('CSV')">CSV</el-button>
    </div>
    <div class="bom-table-wrap">
      <table class="bom-table" ref="tableRef">
        <thead>
          <tr>
            <th>No.</th>
            <th>LEVEL</th>
            <th style="min-height: 80px; min-width: 150px">ERP CODE</th>
            <th>DESCRIPTION</th>
            <th>REPLACE CODE</th>
            <th>CUSTOMER CODE</th>
            <th>LOCATION</th>
            <th>SORT</th>
            <th>PRIORITY</th>
            <th>QTY</th>
            <th>UNIT</th>
            <th>Eff Date</th>
            <th>Obs Date</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="mau_line(item)"
            v-for="(item, index) in dataBomHDRDTL"
            :key="index"
            :style="rowStyle(item)"
          >
            <td>{{ item.ID }}</td>
            <td>{{ item.LEVEL }}</td>
            <td>{{ item.PART_NUM }}</td>

            <td v-if="item.LEVEL == 0" colspan="10">
              {{ item.PROJ_NAME }}
            </td>
            <td v-if="item.LEVEL == 1" colspan="4">
              {{ item.BOM_NAME }}
            </td>
            <td v-if="item.LEVEL == 2">{{ item.PART_NAME }}</td>

            <td v-if="item.LEVEL == 2">{{ item.PART_NUM_REPLACE }}</td>

            <td v-if="item.LEVEL == 2">{{ item.CUSTOMER_PART }}</td>
            <td v-if="item.LEVEL == 2"  style="min-width: 150px; max-width: 300px;"><p>{{ item.Location }}</p></td>

            <td v-if="item.LEVEL != 0">{{ item.SORT }}</td>
            <td v-if="item.LEVEL != 0">{{ item.PRIORITY }}</td>
            <td v-if="item.LEVEL != 0">{{ item.QTY }}</td>
            <td v-if="item.LEVEL != 0">{{ item.UNIT }}</td>
            <td v-if="item.LEVEL != 0">{{ item.CREATED_AT }}</td>
            <td v-if="item.LEVEL != 0">{{ item.DELETED_AT }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Download } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx-js-style'

import { useBomStore } from '@/stores/bom.store'

interface BomLine {
  ID?: number | string
  LEVEL?: number | string
  PART_NUM?: string
  PROJ_NAME?: string
  BOM_NAME?: string
  PART_NAME?: string
  PART_NUM_REPLACE?: string
  CUSTOMER_PART?: string
  Location?: string
  SORT?: number | string
  PRIORITY?: number | string
  QTY?: number | string
  UNIT?: string
  CREATED_AT?: string
  DELETED_AT?: string | null
  IS_SIME?: boolean
}

type ExportType = 'Xlsx' | 'Xls' | 'CSV'

const route = useRoute()
const bomStore = useBomStore()
const dataBomHDRDTL = ref<BomLine[]>([])
const tableRef = ref<HTMLTableElement | null>(null)

function mau_line(item: BomLine) {
  if (item.LEVEL == 0) return 'mauNenXanhLam'
  if (item.LEVEL == 1) return 'mauNenXanhDaTroi'
  if (item.IS_SIME == true) return 'mauNenVang'
  if (item.DELETED_AT) return 'mauNenXam'
  return ''
}

function rowStyle(item: BomLine) {
  if (item.LEVEL == 0) return 'font-size: 1.2em; font-weight: bold;'
  if (item.LEVEL == 1) return 'font-size: 1.1em; font-weight: bold;'
  return ''
}

function exportData(type: ExportType) {
  if (!tableRef.value) return

  const wb = XLSX.utils.table_to_book(tableRef.value, { raw: true })

  if (type === 'CSV') {
    XLSX.writeFile(wb, 'Report.csv')
    return
  }

  // table_to_book names the sheet Sheet1, so take the first sheet.
  const ws = wb.Sheets[wb.SheetNames[0]]
  XLSX.utils.sheet_add_aoa(ws, [['Created ' + new Date().toISOString()]], { origin: -1 })
  XLSX.writeFile(wb, type === 'Xlsx' ? 'Report.xlsx' : 'Report.xls')
}

onMounted(async () => {
  const queryId = route.query.PROJ_ID
  const res = await bomStore.getBomHDRDTL_Project({
    PROJ_ID: Array.isArray(queryId) ? queryId[0] : queryId,
  })
  dataBomHDRDTL.value = 'dataBomHDRDTL' in res ? res.dataBomHDRDTL : []
})
</script>

<style scoped>
.containen-bom {
  max-width: 100%;
  padding: 20px 24px;
}
.bom-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 12px;
}
.bom-toolbar .el-button {
  margin: 0;
}
.bom-toolbar__label {
  margin-right: 4px;
  color: #66776f;
  font-size: 13px;
}
.bom-table-wrap {
  max-height: calc(100vh - 120px);
  overflow: auto;
  border: 1px solid #dfe8e2;
  border-radius: 6px;
  background: #fff;
}
.bom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: #26382e;
  font-size: 13px;
  text-align: left;
}
.bom-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 9px 12px;
  border-bottom: 1px solid #d4e2d9;
  background: #edf4ef;
  color: #43574a;
  font-size: 12px;
  font-weight: 650;
  white-space: nowrap;
}
.bom-table td {
  padding: 7px 12px;
  border-bottom: 1px solid #edf1ee;
  vertical-align: top;
}
/* tr:nth-child(even) {
  background-color: #dddddd;
} */
</style>