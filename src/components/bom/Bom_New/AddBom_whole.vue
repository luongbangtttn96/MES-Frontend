<template>
  <div>
    <title-page :titlepage="'Add BOM Tổng cho dự án'" />
    <div>

        <el-button :icon="Upload" @click="btnClick">Chọn file Excel</el-button>
        <el-button type="primary" :icon="Check" @click="hand_SaveAllBom_Schumacher">Lưu BOM</el-button>

      <input
        name="inputFile_BomSchumacher"
        class="input-file"
        ref="fileInput"
        type="file"
        @change="importData"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </div>
    <div>
      <table class="table">
        <thead class="thead-dark">
              <tr>
                <th style="min-height: 80px; min-width: 150px">
                  <div>PROJECT CODE: {{ dataShowProject.code_project }}</div>
                </th>
                <th style="min-height: 80px; min-width: 150px">
                  <div>NAME PROJECT: {{ dataShowProject.PROJ_NAME }}</div>
                </th>
                <th style="min-height: 80px; min-width: 150px">
                  ITEM CODE: {{ dataShowProject.PART_NUM }}
                </th>
                <th style="min-height: 80px; min-width: 300px">
                  <div>DESCRIPTION: {{ dataShowProject.DESCRIPTION }}</div>                
                </th>
              </tr>
            </thead>
      </table>

      <table class="table">
          <thead class="bg-warning">       
              <tr>       
                  <th style="min-height: 70px; min-width:100px"> ID  </th> 
                  <th style="min-height: 70px; min-width:150px"> <div>BOM CODE</div></th>
                  <th style="min-height: 70px; min-width:150px"> <div >BOM NAME</div></th>
                  <th style="min-height: 70px; min-width:200px"> ITEM CODE  </th>
                  <th style="min-height: 70px; min-width:300px"><div>DESCRIPTION</div> </th>
                  <th style="min-height: 70px; min-width:60px"><div >QTY</div></th>
                  <th style="min-height: 70px; min-width:60px"><div >ROUTE</div></th>
                  <th style="min-height: 70px; min-width:100px"><div >NHÂN CÔNG</div></th>
                  <th style="min-height: 70px; min-width:60px"><div >NS/h</div></th>
                  <th style="min-height: 70px; min-width:100px"><div >BỘ PHẬN</div></th>
                  <th style="min-height: 70px; min-width:100px"><div >NOTE</div></th>
              </tr>        
          </thead>
          <tbody v-for="(item, index) in dataShowSemi" :key="index">
            <tr class="bg-info" >
              <td>{{ index+1 }}</td>
              <td style="min-height: 80px; " > <div>{{item.BOM_CODE}}</div></td>
              <td style="min-height: 80px; " > <div >{{item.BOM_NAME}}</div></td>
              <td style="min-height: 80px; " > {{item.PART_NUM}}  </td>
              <td style="min-height: 80px; " ><div>{{item.DESCRIPTION}}</div> </td>
              <td style="min-height: 80px; " ><div >{{item.QTY}}</div></td>
              <td style="min-height: 80px; " ><div >{{item.SORT}}</div></td>
              <td style="min-height: 80px; " ><div >{{item.LABOR_QTY}}</div></td>
              <td style="min-height: 80px; " ><div >{{item.PRODUC_EVERY_HOUR}}</div></td>
              <td style="min-height: 80px; " ><div >{{item.DEPT_ID}}</div></td>
              <td style="min-height: 80px; " ><div >{{item.NOTE}}</div></td>
            </tr>
            <tr v-if="item.Items">
              <td colspan="11">
                <table class="table">
                  <thead>
                    <th style="min-height: 70px; min-width: 60px">No</th>
                    <th style="min-height: 70px; min-width: 150px"><div>PART NUM</div></th>
                    <th style="min-height: 70px; min-width: 150px"><div>PART NAME</div></th>
                    <!-- <th style="min-height: 70px; min-width: 250px"><div>DESCRIPTION</div></th> -->
                    <th style="min-height: 70px; min-width: 60px"><div>QTY</div></th>
                    <th style="min-height: 70px; min-width: 60px"><div>UNIT</div></th>
                    <th style="min-height: 70px; min-width: 200px"><div>Ref DESIGNATOR</div></th>
                    <th style="min-height: 70px; min-width: 30px"><div>CUSTOMER_PART</div></th>
                  </thead>
                  <tbody>
                    <tr v-for="(it,id) in item.Items" :key="id">            
                      <td style="min-height: 80px; "  ><div>{{id +1}}</div></td>        
                      <td > <div>{{it.PART_NUM}}</div></td>
                      <td > <div>{{it.PART_NAME}}</div></td>
                      <!-- <td style="min-height: 80px; "  > <div >{{it.DESCRIPTION}}</div></td> -->
                      <td style="min-height: 80px; "  ><div>{{it.QTY}}</div> </td>
                      <td style="min-height: 80px; " ><div >{{it.UNIT}}</div></td>
                      <td style="min-height: 80px; "  ><div >{{it.NOTE}}</div></td>
                      <td style="min-height: 80px; "  ><div >{{it.CUSTOMER_PART}}</div></td>                        
                    </tr>     
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
      </table>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check, Upload } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx-js-style'

import { useBomStore } from '@/stores/bom.store'

import TitlePage from '@/components/controls/TitlePage.vue'

interface SchumacherRow {
  Lv?: number
  PartNo?: string
  PartName?: string
  UnitQty?: number
  u_m?: string
  'M-P-T'?: string
  Ref_Designator?: string
  PROJ_CODE?: string
  PROJ_NAME?: string  
  BOM_CODE?: string
  BOM_NAME?: string
  DESCRIPTION?: string
  SORT?: number
  DEPT_ID?: string | number
  LABOR_QTY?: number
  PRODUC_EVERY_HOUR?: number
  NOTE?: string
  CUSTOMER_PART?: string
}

interface ImportedMaterial {
  PART_NUM?: string
  PART_NAME?: string
  DESCRIPTION?: string
  QTY?: number
  UNIT?: string
  PART_NUM_REPLACE?: string
  NOTE?: string
  CUSTOMER_PART?: string
  IS_SIME: number
}

interface SemiSummary {
  BOM_CODE?: string
  BOM_NAME?: string
  PART_NUM?: string
  PART_NAME?: string
  DESCRIPTION?: string
  SORT?: number
  LABOR_QTY?: number
  PRODUC_EVERY_HOUR?: number
  DEPT_ID?: string | number
  NOTE?: string
  Lv?: number
  QTY?: number
  UNIT?: string
  IS_SIME: number
  Items?: ImportedMaterial[]
}

interface ProjectSummary {
  code_project?: string
  PROJ_NAME?: string
  PART_NUM?: string
  PART_NAME?: string
  UNIT?: string
  DESCRIPTION?: string
  NOTE?: string
}

const bomStore = useBomStore()
const fileInput = ref<HTMLInputElement | null>(null)
const bomRows = ref<SchumacherRow[]>([])

const dataShowSemi = computed<SemiSummary[]>(() => {
  let semis: SemiSummary[] = []
  let data: SchumacherRow[] = []
  const dataBomShumacher = bomRows.value

  data=dataBomShumacher.filter(item=>{ return item['M-P-T']=='M' })

  if (data.length>0)
    {
      data.forEach(element => {
        let itemSM: SemiSummary = {} as SemiSummary
          itemSM.BOM_CODE = element.BOM_CODE
          itemSM.BOM_NAME = element.BOM_NAME
          itemSM.PART_NUM =element.PartNo
          itemSM.PART_NAME=element.PartName
          itemSM.DESCRIPTION=element.DESCRIPTION
          itemSM.SORT =element.SORT
          itemSM.LABOR_QTY =element.LABOR_QTY
          itemSM.PRODUC_EVERY_HOUR=element.PRODUC_EVERY_HOUR
          itemSM.DEPT_ID =element.DEPT_ID
          itemSM.NOTE=element.NOTE
          itemSM.Lv=element.Lv
          itemSM.QTY=element.UnitQty
          itemSM.UNIT=element.u_m
          itemSM.IS_SIME=element['M-P-T']=='M'?1:0
          // kiểm tra mã sản phẩm đã có chưa, nếu có thì bổ sung số lượng, chưa có thi chèn thêm BTP
          let n=0
          while (n<semis.length && (semis[n].PART_NUM!=itemSM.PART_NUM || semis[n].BOM_CODE!=itemSM.BOM_CODE)) {
            n++
          }
          if (n<semis.length){
            
            semis[n].QTY = (itemSM.QTY ?? 0) + (semis[n].QTY ?? 0)
          }else{
            semis.push(itemSM)
          }
          
        }); 

        let i=0
        
        while(i<dataBomShumacher.length-1){   
            if (dataBomShumacher[i]['M-P-T']=='M'){
              let k=0              
              while(semis[k].PART_NUM !=dataBomShumacher[i].PartNo || semis[k].BOM_CODE !=dataBomShumacher[i].BOM_CODE){
                k++
              }
              semis[k].Items=[]
              let j=i+1
              while (j<dataBomShumacher.length && (dataBomShumacher[j].Lv ?? 0) > (dataBomShumacher[i].Lv ?? 0) ){
                if( (dataBomShumacher[i].Lv ?? 0) + 1 == dataBomShumacher[j].Lv){
                  let material={
                    PART_NUM:dataBomShumacher[j].PartNo,
                    PART_NAME:dataBomShumacher[j].PartName,
                    DESCRIPTION:dataBomShumacher[j].DESCRIPTION? dataBomShumacher[j].DESCRIPTION: dataBomShumacher[j].PartName ,
                    QTY:dataBomShumacher[j].UnitQty ,
                    UNIT:dataBomShumacher[j].u_m ,
                    PART_NUM_REPLACE:dataBomShumacher[j].PartNo ,
                    NOTE:dataBomShumacher[j].Ref_Designator ,
                    CUSTOMER_PART:dataBomShumacher[j].CUSTOMER_PART,
                    IS_SIME:dataBomShumacher[j]['M-P-T']=='M'?1:0,
                  }
                  semis[k].Items?.push(material)
                }
                j++
              }
            }            
          
          i++

        } 
      }
      //console.log(semis);      
      return semis
})

const dataShowProject = computed<ProjectSummary>(() => {
  const root = bomRows.value.find((row) => row.Lv === 0)
  if (!root) return {}

  return {
    code_project: root.PROJ_CODE,
    PROJ_NAME: root.PROJ_NAME,
    PART_NUM: root.PartNo,
    PART_NAME: root.PartName,
    UNIT: root.u_m,
    DESCRIPTION: root.DESCRIPTION,
    NOTE: root.NOTE,
  }
})

async function hand_SaveAllBom_Schumacher() {
  if (!bomRows.value.length || !dataShowProject.value.code_project) {
    window.alert('Chưa chọn sản phẩm ')
    return
  }

  await bomStore.saveAllBom_Schumacher({
    Project: dataShowProject.value,
    Semis: dataShowSemi.value,
  })
}

function btnClick() {
  fileInput.value?.click()
}

function importData(event: Event) {
  const input = event.target as HTMLInputElement
  const xlsxFile = input.files?.[0]
  if (!xlsxFile) return

  let fileReader = new FileReader()
  fileReader.readAsArrayBuffer(xlsxFile)
  fileReader.onload = () => {
    if (!(fileReader.result instanceof ArrayBuffer)) return

    const workbook = XLSX.read(fileReader.result, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    if (!firstSheetName) return

    bomRows.value = XLSX.utils.sheet_to_json<SchumacherRow>(
      workbook.Sheets[firstSheetName],
    )
  }
  
}
</script>

<style scoped>
.input-file {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.el-button {
  margin: 0 8px 14px 0;
}

.table {
  width: 100%;
  margin-bottom: 14px;
  border: 1px solid #dfe8e2;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  color: #26382e;
  font-size: 13px;
  text-align: left;
}

.table th,
.table td {
  padding: 7px 12px;
  border-bottom: 1px solid #edf1ee;
  vertical-align: middle;
}

.table th {
  background: #f1f6f2;
  color: #43574a;
  font-size: 12px;
  font-weight: 650;
  white-space: nowrap;
}

.thead-dark th {
  background: #e6f0ea;
  color: #24352d;
  font-size: 13px;
}

.bg-info td {
  background: #f7faf8;
  font-weight: 600;
}

.table .table {
  margin: 4px 0 8px;
  box-shadow: none;
}

.table tbody tr:last-child td {
  border-bottom: 0;
}
.page-title {
  margin: 0 0 16px;
  color: #26382e;
  font-size: 22px;
  font-weight: 650;
}

</style>