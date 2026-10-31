<template>
  <div>
    <div>
        <h3>{{ NameQoutePhase.NAME_PHASE }}</h3>
        <el-input type="number" v-model="QTY_BO" style="width: 80px;" @input="handsetQtyMaterialQoute()"></el-input>
        <el-button>Load Qoute</el-button>
    </div>

    <div class="tableFixHead">
        <table class="table">
        <thead>
            <tr>
                <th>STT</th>
                <th>Mô tả</th>
                <th>Ghi chú</th>
                <th>Mã TP</th>
                <th>Mã MFR</th>
                <th>SL</th>
                <th>ĐVT</th>
                <th>NCNR</th>
                <th>@</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="p-0">0</td>
                <td class="p-0"><el-textarea cols="40" rows="1" v-model="DESCRIPTION" placeholder="Description"></el-textarea></td>
                <td class="p-0"><el-input type="text" size="15" v-model="NOTES" placeholder="Ghi chú"></el-input></td>
                <td class="p-0"><el-input type="text" size="15" v-model="PART_NUM" @blur="handgetPart_Description()" placeholder="PART NUM"></el-input></td>
                <td class="p-0"><el-input type="text" size="15" v-model="MATERIAL_CODE" @blur="handgetPart_Description()" placeholder="MFR PN"></el-input></td>
                <td class="p-0"><el-input type="text" size="4" v-model="QTY" placeholder="QTY"></el-input></td>
                <td class="p-0"><el-input type="text" size="3" v-model="dataPart_Description.UNIT"></el-input></td>
                <td class="p-0"><el-checkbox v-model="dataPart_Description.NCNR"></el-checkbox></td>

                <td class="p-0"><el-button @click="handAddMaterials2data()" @keypress.enter="handAddMaterials2data()">&#128190;</el-button></td>
            </tr>
            <tr v-for="(item, index) in dataMaterials_Qoute" :key="index"
            :class="mauLine(item.chon)">
                <td>{{ item.QMA_SIP }}</td>
                <td>{{ item.DESCRIPTION }}</td>
                <td><el-input type="text" size="15" v-model="item.NOTES"></el-input></td>
                <td>{{ item.PART_NUM }}</td>
                <td>{{ item.MATERIAL_CODE }}</td>
                <td>{{ item.QTY }}</td>
                <td>{{ item.UNIT }}</td>
                <td><el-checkbox v-model="item.NCNR"></el-checkbox></td>
                <td>
                    <el-button @click="handBoNguyenLieu(index)" title="Bỏ nguyên liệu"
                        class="btn btn-danger">&#10006;
                    </el-button>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="padding: 3px;">
                    <div class="container row m-0">
                        <el-button class="btn btn-sm btn-success" @click="btnClick" title="Nạp file Excel">
                            <el-icon><Upload /></el-icon>
                        </el-button>
                        <el-button class="btn btn-sm btn-info" @click="handSaveSetMaterial_Qoute()" title="Lưu">
                            <el-icon>&#128190;</el-icon>
                        </el-button>
                        <el-button class="btn btn-sm btn-warning" @click="handSetPriceQoute_Suppliers"> Tạo báo giá cho nhà cung cấp hiện có</el-button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    </div>

    <input ref="fileInput" class="input-file" type="file" @change="exportData"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import * as XLSX from 'xlsx'
import { Upload, DocumentChecked } from '@element-plus/icons-vue'
import { usePOStore } from '@/stores/po.store' // TODO: đổi lại store đang chứa getPDDMaterial_Qoute, getPart_Description, SaveSetMaterial_Qoute, dele_Material_qoute, getMaterialReqDemands_dtl, getDescription_Material
import  { useMaterialStore } from '@/stores/material.store'

interface PartDescription {
  PART_NUM?: string
  DESCRIPTION?: string
  TME_ID?: number
  QTY?: number | string
  PQP_ID?: number
  UNIT?: string
  NCNR?: number
  Chon?: number
}

const route = useRoute()
const poStore = usePOStore()
const materialStore= useMaterialStore()

/* ===================== STATE ===================== */
const fileInput = ref<HTMLInputElement | null>(null)

const dataMaterials = ref<any[]>([])
const dataMaterialReqDemands_dtl = ref<any[]>([])
const SearchMaterials = ref<any[]>([])

const PART_NUM = ref<string>('')
const MATERIAL_CODE = ref<string>('')
const DESCRIPTION = ref<string>('')
const QTY = ref<number | string>(0)
const QTY_BO = ref<number | string | null>(null)
const NOTES = ref('')
const AddExcel = ref(true)

const dataPart_Description = ref<PartDescription>({ PART_NUM: '', DESCRIPTION: '', TME_ID: 0, QTY: 0, UNIT: '', Chon: 0 })
const NameQoutePhase = ref<Record<string, any>>({ PQP_ID: '', PDD_ID: '', NAME_PHASE: '' })

/* ===================== COMPUTED ===================== */
const dataMaterials_Qoute = computed(() => {
  const data: any[] = []
  dataMaterialReqDemands_dtl.value.forEach((it) => {
    const index = dataMaterials.value.findIndex((item) => item.PRM_ID == it.PRM_ID)
    if (index < 0) {
      data.push(it)
    }
  })
  return [...dataMaterials.value, ...data]
})

/* ===================== METHODS ===================== */
const handsetQtyMaterialQoute = () => {
  if (!QTY_BO.value) return
  dataMaterials.value.forEach((item) => {
    if (item.Chon == 0 && item.BASE_QTY) {
      item.QTY = Number(QTY_BO.value) * item.BASE_QTY
    }
  })
}

const handSetPriceQoute_Suppliers = () => {
  // TODO: chưa có logic trong bản gốc
}

// const handGetMaterialReqDemands_dtl = async (PDD_IDs: any) => {
//   const data = { PDD_IDs, PQP_ID: NameQoutePhase.value.PQP_ID }
//   const res = await poStore.getMaterialReqDemands_dtl(data)
//   dataMaterialReqDemands_dtl.value = res.dataMaterialReqDemands_dtl
// }

const mauLine = (Chon: any) => (Chon == 0 ? 'mauNenCam' : 'mauNenXanh')

const btnClick = () => {
  fileInput.value?.click()
}

const exportData = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const xlsxfile = input.files ? input.files[0] : null
  if (!xlsxfile) return

  const fileReader = new FileReader()
  fileReader.onload = (e) => {
    const data = e.target?.result
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const rowObject = XLSX.utils.sheet_to_json<any>(workbook.Sheets[sheetName])
    ImportDataExcel(rowObject)

    if (rowObject) {
      AddExcel.value = !AddExcel.value
    }
    // Cho phép chọn lại cùng một file ở lần sau
    input.value = ''
  }
  fileReader.readAsArrayBuffer(xlsxfile)
}

const ImportDataExcel = async (e: any[]) => {
  const ArrSearchDesPart: any[] = []
  e.forEach((data) => {
    ArrSearchDesPart.push({ QMA_SIP: data.QMA_SIP, DESCRIPTION: data.DESCRIPTION })
  })

  // Đồng bộ Description
  const res = await materialStore.getDescription_Material({ ARRAY_DESCRIPTION: ArrSearchDesPart??[] })
  const e_thieu: any[] = []
  SearchMaterials.value = res.Materials
  let QMA_SIP = dataMaterials.value ? dataMaterials.value.length : 0

  for (let j = 0; j < e.length; j++) {
    e[j].Chon = false
    e[j].PQP_ID = NameQoutePhase.value.PQP_ID
    e[j].CUSTOMER_PN = e[j].PART_NUM

    SearchMaterials.value.forEach((type_material) => {
      if (e[j].QMA_SIP == type_material.QMA_SIP && e[j].DESCRIPTION == type_material.DESCRIPTION) {
        if (e[j].PART_NUM && String(e[j].PART_NUM).trim().length > 0) {
          if (type_material.MaterialSearch[0].MATERIAL_CODE == e[j].PART_NUM) {
            e[j].TME_ID = type_material.MaterialSearch ? type_material.MaterialSearch[0].TME_ID : null
          }
          e[j].MATERIAL_CODE = e[j].PART_NUM
        } else {
          e[j].MATERIAL_CODE = e[j].MATERIAL_CODE
            ? e[j].MATERIAL_CODE
            : type_material.MaterialSearch ? type_material.MaterialSearch[0].MATERIAL_CODE : null
          e[j].PART_NUM = type_material.MaterialSearch ? type_material.MaterialSearch[0].PART_NUM : null
        }
        e[j].NCNR = type_material.MaterialSearch ? type_material.MaterialSearch[0].NCNR : null
      }
    })

    // Đồng bộ số lượng nguyên liệu
    const index = dataMaterials.value.findIndex((item) => item.DESCRIPTION == e[j].DESCRIPTION)
    if (index >= 0) {
      dataMaterials.value[index].QTY = e[j].QTY
      dataMaterials.value[index].QMA_SIP = dataMaterials.value[index].QMA_SIP || e[j].QMA_SIP
    } else {
      if (e[j].DESCRIPTION && String(e[j].DESCRIPTION).trim().length > 0) {
        e[j].QMA_SIP = ++QMA_SIP
        e_thieu.push(e[j])
      }
    }
  }
  dataMaterials.value = [...dataMaterials.value, ...e_thieu]
}

const Pro_getPDDMaterial_Qoute = async () => {
  const data = { PDD_IDS: NameQoutePhase.value.PDD_ID, PQP_ID: NameQoutePhase.value.PQP_ID }
  const res = await poStore.getPDDMaterial_Qoute(data)
  dataMaterials.value = res.dataMaterials
}

const handSaveSetMaterial_Qoute = async () => {
  const data = {
    dataMaterial: dataMaterials_Qoute.value,
    PQP_ID: NameQoutePhase.value.PQP_ID,
  }
  await poStore.SaveSetMaterial_Qoute(data)
  await Pro_getPDDMaterial_Qoute()
  AddExcel.value = !AddExcel.value
  window.opener?.location.reload()
}

const handBoNguyenLieu = async (index: number) => {
  if (dataMaterials.value[index].Chon == false) {
    dataMaterials.value.splice(index, 1)
  } else {
    const data = { QMA_ID: dataMaterials.value[index].QMA_ID }
    const res = await poStore.dele_Material_qoute(data)
    if (res.ok == true) {
      dataMaterials.value.splice(index, 1)
    }
  }
}

const handAddMaterials2data = () => {
  dataPart_Description.value.PART_NUM = PART_NUM.value
  dataPart_Description.value.DESCRIPTION = DESCRIPTION.value
  dataPart_Description.value.QTY = QTY.value
  dataPart_Description.value.PQP_ID = NameQoutePhase.value.PQP_ID
  dataPart_Description.value.Chon = 0

  const data = { ...dataPart_Description.value }
  dataMaterials.value.unshift(data)
}

const handgetPart_Description = async () => {
  const res = await poStore.getPart_Description({ PART_NUM: PART_NUM.value })
  const part = res?.dataPart_Description as Partial<PartDescription> | undefined
  
  if (part) {
    dataPart_Description.value = res.dataPart_Description

      if (dataPart_Description.value) {
        PART_NUM.value = dataPart_Description.value.PART_NUM
        DESCRIPTION.value = dataPart_Description.value.DESCRIPTION
      } else {
        PART_NUM.value = ''
        DESCRIPTION.value = ''
        dataPart_Description.value = { PART_NUM: '', DESCRIPTION: '', TME_ID: 0, QTY: 0, UNIT: '', Chon: 0 }
      }
  }
}

/* ===================== LIFECYCLE ===================== */
onMounted(() => {
  NameQoutePhase.value = {
    PQP_ID: route.query.PQP_ID || '',
    PDD_ID: route.query.PDD_ID || '',
    NAME_PHASE: route.query.NAME_PHASE || '',
  }
  Pro_getPDDMaterial_Qoute()
})
</script>

<style>
</style>