<template>
  <thead class="table-success">
    <tr>
      <th class="action-column" style="min-height: 80px; min-width: 85px"> Actions </th>
      <th style="min-height: 70px; min-width: 60px">ID</th>
      <th style="min-height: 70px; min-width: 150px"><div>PART NUM</div></th>
      <th style="min-height: 70px; min-width: 250px"><div>DESCRIPTION</div></th>
      <!-- <th style="min-height: 70px; min-width:100px"> BOM CODE  </th> -->
      <th style="min-height: 70px; min-width: 60px"><div>QTY</div></th>
      <th style="min-height: 70px; min-width: 60px"><div>UNIT</div></th>
      <th style="min-height: 70px; min-width: 150px"> <div>PART REPLACE</div> </th>
      <!-- <th style="min-height: 70px; min-width:60px"><div >SORT</div></th> -->
      <th style="min-height: 70px; min-width: 200px"><div>NOTE</div></th>
      <th style="min-height: 70px; min-width: 30px"><div>SEMI PRO</div></th>
      <th style="min-height: 70px; min-width: 100px"><div>UPDATED</div></th>
      <th class="customer-part-heading" style="min-height: 70px; min-width: 150px">
        <span>CUSTOMER PART</span>
        <el-button
          link
          :class="mau"
          :type="statusColor === 1 ? 'danger' : statusColor === 2 ? 'success' : 'primary'"
          :icon="Upload"
          :aria-label="statusColor === 1 ? 'Lưu mã khách hàng' : 'Nhập file mã khách hàng'"
          :title="statusColor === 1 ? 'Lưu mã khách hàng' : 'Nhập file mã khách hàng'"
          @click="btnClick"
        />
        <input
          class="input-hidden input-file_CPA"
          ref="fileInput"
          type="file"
          @change="exportData_CPA"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </th>
      <!-- [BOM_DTL_ID],[PART_NUM],[DESCRIPTION],[BOM_CODE] ,[QTY] ,[UNIT]
      ,[PART_NUM_REPLACE],[SORT] ,[NOTE],[CREATED_AT],[UPDATED_AT],[PICTURE]-->
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx-js-style'

interface CustomerPartRow {
  PART_NUM?: string
  CUSTOMER_PART?: string
  [key: string]: unknown
}

const emit = defineEmits<{
  (event: 'ImportUpdate_CPA_Excel', rows: CustomerPartRow[]): void
  (event: 'saveData_CPAExcel'): void
}>()

const statusColor = ref(0)
const fileInput = ref<HTMLInputElement | null>(null)

const mau = computed(() => {
  if (statusColor.value === 1) return 'mauNenDo'
  if (statusColor.value === 2) return 'mauNenXanh'
  return ''
})

function advanceStatus() {
  statusColor.value = (statusColor.value + 1) % 3
}

function btnClick() {
  if (statusColor.value === 1) {
    emit('saveData_CPAExcel')
    advanceStatus()
    return
  }

  if (statusColor.value === 2) {
    advanceStatus()
    return
  }

  fileInput.value?.click()
}

function exportData_CPA(event: Event) {
  const input = event.target as HTMLInputElement
  const xlsxFile = input.files?.[0]
  if (!xlsxFile) return

  const fileReader = new FileReader()
  fileReader.onload = () => {
    if (!(fileReader.result instanceof ArrayBuffer)) return

    const workbook = XLSX.read(fileReader.result, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    if (!firstSheetName) return

    const rows = XLSX.utils.sheet_to_json<CustomerPartRow>(
      workbook.Sheets[firstSheetName],
    )
    emit('ImportUpdate_CPA_Excel', rows)
    advanceStatus()
  }

  fileReader.readAsArrayBuffer(xlsxFile)
}
</script>

<style>
.customer-part-heading {
  white-space: nowrap;
}

.customer-part-heading .el-button {
  width: 28px;
  height: 28px;
  margin-left: 6px;
  vertical-align: middle;
  font-size: 16px;
}
</style>