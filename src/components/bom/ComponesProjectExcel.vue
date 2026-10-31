<script setup lang="ts">
import { computed } from 'vue'

interface BomExcelItem {
  BOM_CODE?: string
  BOM_NAME?: string
  PART_NUM?: string | number
  DESCRIPTION?: string
  QTY?: number | string
  SORT?: number | string
  LABOR_QTY?: number | string
  PRODUC_EVERY_HOUR?: number | string
  DEPT_ID?: string | number
  NOTE?: string
  UPDATED?: string
  dataExists?: boolean
  [key: string]: unknown
}

const props = defineProps<{
  item: BomExcelItem
  id: number
}>()

const mau = computed(() =>
  props.item.dataExists ? '' : 'background-color: orangered',
)

function capNhatMaNL(partNum: string | number | undefined) {
  const src = `/#/UpdateTypeMaterial?partNum=${encodeURIComponent(String(partNum ?? ''))}`
  window.open(
    src,
    'newWin',
    'fullscreen=yes, scrollbars=auto,width=600,height=380, titlebar=no',
  )
}

function onChange(value: unknown) {
  window.alert(`Hello ${String(value)}!`)
}
</script>

<template>    
    <tr>       
      <td style="padding: 3px;">  
          <div class="container row padding: 2px;">
            <div class="icon-container">
              <b-icon icon="pencil-square" @click="onChange(props.id)" ></b-icon>
            </div>
            <!----><!----><!----><!---->
            <div class="icon-container">
              <b-icon icon="caret-right-fill" @change="onChange"></b-icon>
            </div>
            <!----><!----><!----><!---->
            <div class="icon-container">
              <b-icon icon="exclamation-circle-fill" @change="onChange"></b-icon>
            </div>
          </div>
        </td>
      <td style="min-height: 80px;"> {{props.id}}  </td>
      <td style="min-height: 80px;"> <div>{{props.item.BOM_CODE}}</div></td>
      <td style="min-height: 80px;"> <div >{{props.item.BOM_NAME}}</div></td>
      <td :style="'min-height: 80px; cursor: pointer;' + mau"  @dblclick="capNhatMaNL(props.item.PART_NUM)" > {{props.item.PART_NUM}}  </td>
      <td style="min-height: 80px;"><div>{{props.item.DESCRIPTION}}</div> </td>
      <td style="min-height: 80px; "><div >{{props.item.QTY}}</div></td>
      <td style="min-height: 80px;"><div >{{props.item.SORT}}</div></td>     
      <td style="min-height: 80px;"><div >{{props.item.LABOR_QTY}}</div></td> 
      <td style="min-height: 80px; "><div >{{props.item.PRODUC_EVERY_HOUR}}</div></td>
      <td style="min-height: 80px;"><div >{{props.item.DEPT_ID}}</div></td>
      <td style="min-height: 80px;"><div >{{props.item.NOTE}}</div></td>
      <td style="min-height: 80px;"><div >{{props.item.UPDATED}}</div></td>
      <!-- BOM CODE, BOM NAME, ITEM CODE, DESCRIPTION, ACTIVe, NOTE, CREATED, UPDATED, -->
      <!-- [BOM_HDR_ID] ,[BOM_CODE] ,[BOM_NAME]  ,[TME_ID]  ,[PART_NUM] ,[PART_NAME]  ,[DESCRIPTION]  ,[IS_ACTIVE] ,[NOTE] -->
    </tr>        
</template>


<style>
 .l{
   cursor: pointer;
 }
</style>