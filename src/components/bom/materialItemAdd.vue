<template>
  <tr>
    <td style="padding: 3px">
      <div class="material-row-actions">
        <el-button
          v-if="AddExcel"
          link
          type="primary"
          :icon="Upload"
          aria-label="Chọn file vật liệu Excel"
          title="Chọn file vật liệu Excel"
          @click="btnClick"
        />
        <el-button
          v-else
          link
          type="success"
          :icon="Check"
          aria-label="Lưu danh sách vật liệu"
          title="Lưu danh sách vật liệu"
          @click="saveExcel"
        />
        <el-button
          link
          :icon="CirclePlus"
          aria-label="Thêm vật liệu"
          title="Thêm vật liệu"
          @click="onChange"
        />
      </div>
    </td>
    <td style="min-height: 80px"></td>
    <td style="min-height: 80px" colspan="9">
      <!-- <input type="file" name="file" id="file" accept=".xlsx" class="inputfile" @change="onChange($event)" />  -->
      <input
        class="material-file-input"
        type="file"
        ref="fileInput"
        @change="exportData"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </td>
  </tr>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Check, CirclePlus, Upload } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx-js-style'

interface MaterialExcelRow {
  PART_NUM?: string
  [key: string]: unknown
}

const props = defineProps<{
  semiProItemId: string | number
}>()

const emit = defineEmits<{
  (event: 'ImportDataMaterialExcel', rows: MaterialExcelRow[]): void
  (event: 'saveMaterialExcel', semiProId: string | number): void
}>()

const AddExcel = ref(true)
const fileInput = ref<HTMLInputElement | null>(null)

function btnClick() {
  fileInput.value?.click()
}

function exportData(event: Event) {
  const input = event.target as HTMLInputElement
  const xlsxFile = input.files?.[0]
  if (!xlsxFile) return

  const fileReader = new FileReader()
  fileReader.onload = () => {
    if (!(fileReader.result instanceof ArrayBuffer)) return

    const workbook = XLSX.read(fileReader.result, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    if (!firstSheetName) return

    const rowObject = XLSX.utils.sheet_to_json<MaterialExcelRow>(
      workbook.Sheets[firstSheetName],
    )
    emit('ImportDataMaterialExcel', rowObject)
    AddExcel.value = !AddExcel.value
  }

  fileReader.readAsArrayBuffer(xlsxFile)
}

function saveExcel() {
  emit('saveMaterialExcel', props.semiProItemId)
  AddExcel.value = !AddExcel.value
}

function onChange() {
  console.log('Đang phát triển')
}
</script>

<style>
.material-row-actions {
  display: flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
}

.material-row-actions .el-button {
  width: 28px;
  height: 28px;
  margin: 0;
  font-size: 16px;
}

.material-file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}
</style>