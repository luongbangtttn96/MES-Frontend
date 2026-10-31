<template>    
    <tr>       
      <td style="padding: 3px;"  v-if="!showMateral">  
          <div class="container row padding: 2px;">
            <div class="icon-container">
              <b-icon icon="pencil-square" @click="onChange"></b-icon>
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
      <td style="min-height: 80px; "  v-if="!showMateral"><div>{{id}}</div></td>        
      <td :style="'min-height: 80px; cursor: pointer; '+ mau"  v-if="!showMateral" @dblclick="capNhatMaNL(item.PART_NUM)"> <div>{{item.PART_NUM}}</div></td>
      <td style="min-height: 80px; "  v-if="!showMateral"> <div >{{item.DESCRIPTION}}</div></td>
      <!-- <td style="min-height: 80px; "  v-if="!showMateral"> {{item.BOM_CODE}}  </td> -->
      <td style="min-height: 80px; "  v-if="!showMateral"><div>{{item.QTY}}</div> </td>
      <td style="min-height: 80px; " v-if="!showMateral"><div >{{item.UNIT}}</div></td>
      <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.PART_NUM_REPLACE}}</div></td>
      <!-- <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.SORT}}</div></td> -->
      <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.NOTE}}</div></td>
      <td style="min-height: 30px; "  v-if="!showMateral"><div ></div></td> 
      <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.UPDATED}}</div></td>
      <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.CUSTOMER_PART}}</div></td>
      <!-- [BOM_DTL_ID],[PART_NUM],[DESCRIPTION],[BOM_CODE] ,[QTY] ,[UNIT] ,[PART_NUM_REPLACE],[SORT] ,[NOTE],[CREATED_AT],[UPDATED_AT]-->
       <!--[BOM_DTL_ID],[BOM_HDR_ID],[TME_ID],[IS_ACTIVE],[SORT],[QTY],[UNIT] ,[TME_ID_REPLACE],[NOTE],[PICTURE],[CREATED_AT],[CREATED_BY]  -->
    </tr>        
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface MaterialExcelRow {
  PART_NUM?: string | number
  DESCRIPTION?: string
  QTY?: number | string
  UNIT?: string
  PART_NUM_REPLACE?: string
  NOTE?: string
  UPDATED?: string
  CUSTOMER_PART?: string
  PROJ_NAME?: string
  dataExists?: boolean
  [key: string]: unknown
}

const props = defineProps<{
  id: number
  item: MaterialExcelRow
}>()

const showMateral = ref(false)
const mau = computed(() =>
  props.item.dataExists ? '' : 'background-color: orangered',
)

function capNhatMaNL(partNum?: string | number) {
  const src = `/#/UpdateTypeMaterial?partNum=${encodeURIComponent(String(partNum ?? ''))}`
  window.open(
    src,
    'newWin',
    'fullscreen=yes, scrollbars=auto,width=600,height=380, titlebar=no',
  )
}

function onChange() {
  window.alert(`Hello ${props.item.PROJ_NAME ?? ''}!`)
}
</script>

<style>

</style>