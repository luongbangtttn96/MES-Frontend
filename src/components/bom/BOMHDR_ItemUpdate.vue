<template>
  <div class="bomhdr-page">
    <el-card shadow="never" class="bomhdr-card">
      <template #header>
        <div class="bomhdr-heading">
          <span>Cập nhật bán thành phẩm</span>
          <el-tag type="success" effect="plain">Dự án: {{ dataBOMHDR.PROJ_NAME }}</el-tag>
        </div>
      </template>

      <el-form label-position="top" class="bomhdr-form">
        <el-row :gutter="16">
          <el-col :xs="24" :sm="12">
            <el-form-item label="BOM CODE">
              <el-input v-model="dataBOMHDR.BOM_CODE" maxlength="60" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="BOM NAME">
              <el-input v-model="dataBOMHDR.BOM_NAME" maxlength="255" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="Mã nguyên liệu">
              <el-input v-model="dataBOMHDR.PART_NUM" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="Bộ phận">
              <SelectDept v-model="dataBOMHDR.DEPT_ID" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-form-item label="Số nhân công">
              <el-input v-model="dataBOMHDR.LABOR_QTY" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-form-item label="Đơn giá">
              <el-input v-model="dataBOMHDR.COST" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-form-item label="Số lượng">
              <el-input v-model="dataBOMHDR.QTY" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-form-item label="Thứ tự SX">
              <el-input v-model="dataBOMHDR.SORT" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-form-item label="Sản phẩm / giờ">
              <el-input v-model="dataBOMHDR.PRODUC_EVERY_HOUR" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-form-item label="Setup (giờ)">
              <el-input v-model="dataBOMHDR.TIME_SET_LINE" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-form-item label="AQL">
              <el-select v-model="dataBOMHDR.AQL" placeholder="Chọn AQL">
                <el-option v-for="option in aqlOptions" :key="option" :label="option" :value="option" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-form-item label="AQL Level">
              <el-select v-model="dataBOMHDR.LEVEL_AQL" placeholder="Chọn level">
                <el-option v-for="option in aqlLevels" :key="option" :label="option" :value="option" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Active">
              <el-switch v-model="dataBOMHDR.IS_ACTIVE" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Mô tả">
              <el-input v-model="dataBOMHDR.NOTE" type="textarea" :rows="4" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="bomhdr-actions">
        <el-button type="primary" @click="handUpdateItemBOMHDR">Lưu</el-button>
      </div>
    </el-card>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBomStore, type BomHeaderItem } from '@/stores/bom.store'

import SelectDept from '../controls/Contr_SelectDepartmenDyn.vue'

const bomStore = useBomStore()

const route = useRoute()

const dataBOMHDR = ref<BomHeaderItem>({})

const aqlOptions = [
  'AC_0.065', 'AC_0.1', 'AC_0.15', 'AC_0.25', 'AC_0.4', 'AC_0.65', 'AC_1',
  'AC_1.5', 'AC_2.5', 'AC_4', 'AC_6.5', 'AC_10', 'AC_15',
]
const aqlLevels = ['LEVEL_I', 'LEVEL_II', 'LEVEL_III', 'LEVEL_S1', 'LEVEL_S2', 'LEVEL_S3', 'LEVEL_S4']

function getQueryValue(value: string | null | (string | null)[]): string {
  return Array.isArray(value) ? value[0] ?? '' : value ?? ''
}

async function proGetItem_BOMHDR(BOM_HDR_ID: string, PROJ_ID: string) {

  const res = await bomStore.getItem_BOMHDR({
    id: BOM_HDR_ID,
    PROJ_ID,  
  })

  dataBOMHDR.value = 'dataBOMHDR' in res ? res.dataBOMHDR : {}
}

async function handUpdateItemBOMHDR() {
  if (!bomStore || typeof bomStore.UpdateItemBOMHDR !== 'function') return

  await bomStore.UpdateItemBOMHDR(dataBOMHDR.value)
}

onMounted(() => {
  void proGetItem_BOMHDR(getQueryValue(route.query.id), getQueryValue(route.query.PROJ_ID))
})
</script>

<style scoped>
.bomhdr-page {
  min-height: 100%;
  padding: 20px 16px;
  background: #f3f6f3;
}

.bomhdr-card {
  max-width: 760px;
  margin: 0 auto;
  border-color: #dfe8e2;
}

.bomhdr-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #26382e;
  font-size: 16px;
  font-weight: 650;
}

.bomhdr-form :deep(.el-form-item__label) {
  color: #43574a;
  font-size: 12px;
  font-weight: 600;
}

.bomhdr-form :deep(.el-select) {
  width: 100%;
}

.bomhdr-actions {
  display: flex;
  justify-content: flex-end;
}
</style>