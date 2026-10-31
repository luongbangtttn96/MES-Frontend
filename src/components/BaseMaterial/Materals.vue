<template>
  <div>
    <el-card class="material-form mb-1" shadow="never">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="18">
          <el-row :gutter="3">
            <!-- Part Number Field -->
            <el-col :xs="8" :sm="4" >
              <label for="PART_NUM">Mã nguyên liệu</label>
              <div class="input-group">
                <el-input 
                  id="PART_NUM" 
                  v-model="dataTypeMaterial.PART_NUM" 
                  @blur="handgetTypeBaseMaterial"
                  placeholder="Nhập mã..."
                />
              </div>
            </el-col>
            <!-- Name Field -->
            <el-col :xs="16" :sm="8">
              <label for="PART_NAME">Tên nguyên liệu</label>
              <el-input 
                id="PART_NAME" 
                v-model="dataTypeMaterial.PART_NAME" 
                placeholder="Tên nguyên liệu..."
              />
            </el-col>

            <!-- Additional Fields -->
            <el-col :xs="8" :sm="6">
              <label for="UNIT">Đơn vị tính</label>
              <el-input id="UNIT" v-model="dataTypeMaterial.UNIT" />
            </el-col>

            <el-col :xs="8" :sm="6">
              <label for="WastageRate">Tỷ lệ hao hụt (%)</label>
              <el-input 
                type="number" 
                id="WastageRate" 
                v-model="dataTypeMaterial.WASTAGE_RATE" 
              />
            </el-col>
            
            <el-col :xs="8" :sm="6">
              <label for="DEFINE_BY">Đ/N bởi:</label>
              <el-input id="DEFINE_BY" v-model="dataTypeMaterial.DEFINE_BY" />
            </el-col>

            <!-- Checkboxes (Dùng el-checkbox của Element Plus) -->

              <el-col :xs="8" :sm="4" >
                <el-checkbox id="IS_SIME" v-model="dataTypeMaterial.IS_SIME" :true-label="1" :false-label="0">
                  Bán thành phẩm
                </el-checkbox>
              </el-col>
              <el-col :xs="8" :sm="4" class="mb-0">
                <el-checkbox id="isSEC_MATERIAL" v-model="dataTypeMaterial.isSEC_MATERIAL" :true-label="1" :false-label="0">
                  Nguyên liệu phụ
                </el-checkbox>
              </el-col>
              <el-col :xs="8" :sm="4" class="mb-0">
                <el-checkbox id="VAL_INT" v-model="dataTypeMaterial.VAL_INT" :true-label="1" :false-label="0">
                  Nguyên vật liệu
                </el-checkbox>
              </el-col>

          </el-row>

          <!-- Description Field -->
          <div class="form-group mt-2">
            <label for="DESCRIPTION">Mô tả</label>
            <el-input 
              type="textarea" 
              id="DESCRIPTION" 
              :rows="2"
              v-model="dataTypeMaterial.DESCRIPTION"
            />
          </div>
        
        </el-col>

        <!-- Image Preview -->
        <el-col :xs="12" :sm="6">
          <div class="image-preview">
            <img :src="imagePreview" alt="Preview" class="img-fluid"/>
            <div class="image-upload-overlay">
              <el-icon :size="8"><Camera /></el-icon>
              <div>Click để tải ảnh</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- Form Actions -->
      <div class="form-actions mt-2">
        <el-button type="primary" @click="luuTypeMaterial">
          <el-icon><Check /></el-icon> Lưu
        </el-button>
        <el-button type="info" class="ml-1">
          <el-icon><Calculator /></el-icon> Tính tỷ lệ hao hụt 
        </el-button>
      </div>
    </el-card>

    <title-page :titlepage="'Mã Nguyên liệu'" />
    <el-row justify="space-between" align="middle">
      <div class="search-box d-flex align-items-center">
        <el-input 
          v-model="search"
          class="bom-search"
          placeholder="Tìm kiếm mã, tên nguyên liệu..."
          clearable
          style="width: 300px;"
        >
          <template #prefix>
            <el-icon @click="handSearch_PARTNUM"><Search /></el-icon>
          </template>
        </el-input>
        <pagination v-model="v_Pagination" :totalPages="totalPages" class="ml-2" />
      </div>

      <el-row :gutter="2" class="action-buttons">
        
        <el-button type="primary" @click="handSave_New_Material">
          <el-icon><CirclePlus /></el-icon> Thêm mới
        </el-button>
        <el-button type="success" @click="handImport_Material">
          <el-icon><Upload /></el-icon> Import
        </el-button>
        <el-button type="warning" @click="handUpdate_LeadtimeMOQPSQ">
          <el-icon><Refresh /></el-icon> Cập nhật LT/MOQ/SPQ
        </el-button>
        <el-button type="info" @click="handExport_Material">
          <el-icon><Download /></el-icon> Export
        </el-button>
      </el-row>
      <input 
        name="inputFile_MOQ_SPQ_Material" 
        class="input-file" 
        type="file" 
        style="display: none;"
        @change="ImportData_LeaMPQSPQ"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </el-row>
    <div>
        <table class="table tableFixHead">
            <thead>
              <tr>              
                <th>Mã</th>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Mã của</th>
                <th>UNIT</th>
                <th>Loại NL</th>
                <th>Số Ngày Mua</th>
                <th>MOQ</th>
                <th>SPQ</th>
                <th>Đơn Vị đo</th>
                <th>Giá trị Min</th>
                <th>Giá trị Max</th>
                <th>HH 100</th>
                <th>HH 1.000</th>
                <th>HH 10.000</th>
                <th>Bán TP</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in show_dataMaterals" :key="index">
                    <td @click="handGetinfor_Material(item.PART_NUM)"> {{item.PART_NUM}}</td>
                    <td> {{item.PART_NAME}}</td>
                    <td> {{item.DESCRIPTION}}</td>
                    <td> {{item.DEFINE_BY}}</td>
                    <td> {{item.UNIT}}</td>
                    <td> {{item.TYPE}} </td>
                    <td> {{item.LEADTIME}}</td>
                    <td> {{item.MOQ}}</td>
                    <td> {{item.POQ}}</td>
                    <td> {{item.measure}}</td>
                    <td> {{item.VALUE_MIN}}</td>
                    <td> {{item.VALUE_MAX}}</td>
                    <td> {{item.WASTAGE_100}}</td>
                    <td> {{item.WASTAGE_1000}}</td>
                    <td> {{item.WASTAGE_10000}}</td>
                    <td> <input type="checkbox" v-model="item.IS_SIME" disabled></td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import {  Search, Upload } from '@element-plus/icons-vue'

import { useMaterialStore, type Material } from '@/stores/material.store.ts' // Thay đổi đường dẫn store tương ứng
import pagination from '../controls/Pagination/Pagination.vue'

import TitlePage from '../controls/TitlePage.vue'
// import * as XLSX from 'xlsx-js-style'

import {exportDataExcel_to_Arr} from '@/plugins/Excel.ts'

// 1. Khởi tạo Pinia Store
const materialStore = useMaterialStore()

interface PaginationType {
  page: number
  size: number
}

// 3. Reactive States
const dataMaterals = ref<Material[]>([])
const dataMaterals_excel = ref<Material[]>([])
const search = ref<string>('')
const totalPages = ref<number>(0)

const v_Pagination = ref<PaginationType>({
  page: 1,
  size: 50
})

const dataTypeMaterial = ref<Material>({
  PART_NUM: '',
  PART_NAME: '',
  DESCRIPTION: '',
  DEFINE_BY: 'TCE',
  IS_SIME: 0,
  isSEC_MATERIAL: 0,
  UNIT: 'PCS',
  IMAGE: '',
  WASTAGE_RATE: null
})

const imagePreview = ref<string>('')

// 4. Computed Properties
const show_dataMaterals = computed(() => {
  if (dataMaterals.value) {
    return dataMaterals.value.filter((item) => {
      const searchKey = search.value.toUpperCase()
      return (
        item.PART_NUM.toUpperCase().includes(searchKey) ||
        (item.DESCRIPTION && item.DESCRIPTION.toUpperCase().includes(searchKey))
      )
    })
  }
  return []
})

// 5. Watchers
watch(
  v_Pagination,
  () => {
    PRO_getMaterials()
  },
  { deep: true }
)

// 6. Business Methods (Gọi trực tiếp Action từ Pinia Store)
const handGetinfor_Material = (PART_NUM: string) => {
  Pro_getTypeBaseMaterial(PART_NUM)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handgetTypeBaseMaterial = () => {
  if (dataTypeMaterial.value.PART_NUM !== '') {
    Pro_getTypeBaseMaterial(dataTypeMaterial.value.PART_NUM)
  }
}

const Pro_getTypeBaseMaterial = async (PART_NUM: string) => {
  const res: any = await materialStore.getTypeBaseMaterial(PART_NUM)
  if (res?.dataTypeMaterial && res.dataTypeMaterial.length > 0) {
    dataTypeMaterial.value = res.dataTypeMaterial[0]
  } else {
    dataTypeMaterial.value = { PART_NUM: PART_NUM } as Material
  }
}

const LoadERP = async () => {
  const res: any = await materialStore.ERPgetTypeBaseMaterial(dataTypeMaterial.value.PART_NUM)
  if (res && res.dataTypeMaterial) {
    console.log('pn', res.dataTypeMaterial)
    dataTypeMaterial.value.PART_NUM = res.dataTypeMaterial.PART_NUM
    dataTypeMaterial.value.PART_NAME = res.dataTypeMaterial.PART_NAME
    dataTypeMaterial.value.DESCRIPTION = dataTypeMaterial.value.DESCRIPTION
      ? dataTypeMaterial.value.DESCRIPTION
      : res.dataTypeMaterial.DESCRIPTION
      ? res.dataTypeMaterial.DESCRIPTION
      : res.dataTypeMaterial.PART_NAME
    dataTypeMaterial.value.DEFINE_BY = 'TCE'
    dataTypeMaterial.value.UNIT = res.dataTypeMaterial.UNIT
    dataTypeMaterial.value.Sync_ERP = res.dataTypeMaterial.SYNC_ERP
  }
}

const luuTypeMaterial = () => {
  materialStore.addTypeMaterial(dataTypeMaterial.value)
}

const ImportData_LeaMPQSPQ = async (event: Event) => { 
  const target = event.target as HTMLInputElement
  const xlsxfile = target.files ? target.files[0] : null
  if (!xlsxfile) return

  const rowObject = await exportDataExcel_to_Arr(xlsxfile)

   materialStore.UpdateMOQ_SPQ({ data: rowObject })
   
  // if (xlsxfile) {
  //   const fileReader = new FileReader()
  //   fileReader.readAsBinaryString(xlsxfile)
  //   fileReader.onload = (e: ProgressEvent<FileReader>) => {
  //     const data = e.target?.result
  //     const workbook = XLSX.read(data, { type: 'binary' })
  //     const wb = workbook.SheetNames[0]
  //     // const rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[wb])
  //      const rowObject = XLSX.utils.sheet_to_json<Record<string, any>>(workbook.Sheets[wb], {
  //         raw: false,
  //         dateNF: 'YYYY-MM-DD'
  //       })
  //     materialStore.UpdateMOQ_SPQ({ data: rowObject }).then((res: any) => {
  //       // Xử lý sau khi update nếu cần
  //     })
  //   }
  // }
}

const handSearch_PARTNUM = () => {
  v_Pagination.value = {
    page: 1,
    size: 50
  }
  PRO_getMaterials()
}

const exportDataNewPrice = async (event: Event) => {
  // Logic xuất dữ liệu giá mới
}

const handUpdate_LeadtimeMOQPSQ = () => {
  //console.log('inputFile_MOQ_SPQ_Material')
  const elements = document.getElementsByName('inputFile_MOQ_SPQ_Material')
  if (elements.length > 0) {
    (elements[0] as HTMLElement).click()
  }
}

const handSave_New_Material = () => {}
const handImport_Material = () => {}
const handExport_Material = () => {}

const PRO_getMaterials = async () => {
  const data = {
    Search_PART_NUM: search.value,
    page: v_Pagination.value.page,
    size: v_Pagination.value.size
  }
  const res: any = await materialStore.getMaterials(data)
  if (res) {
    dataMaterals.value = res.dataMaterals
    totalPages.value = Math.ceil(res.Tota_PN / v_Pagination.value.size)
  }
  //console.log(totalPages.value)
}

// 7. Lifecycle Hooks
onMounted(async () => {
  await PRO_getMaterials()
})
</script>

<style>

</style>