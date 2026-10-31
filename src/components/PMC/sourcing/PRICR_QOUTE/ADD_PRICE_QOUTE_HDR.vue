<template>
  <div>
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
      <label>Nhà cung cấp</label>
      <Contr_SelectSuppliers v-model="SUP_ID" />
      <el-button type="primary" @click="handQouteCreateDTL()">Báo giá</el-button>
    </div>
    <div class="tableFixHead">
      <table class="table table-sm">
        <thead>
          <tr>
            <th>STT</th>
            <th>Nhà cung cấp</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Phí VC</th>
            <th>Điều kiện</th>
            <th>Thời gian</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataPriceQoute_HDR" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.SUPPLIERS_NAME }}</td>
            <td>{{ item.TELEPHONE }}</td>
            <td>{{ item.EMAIL }}</td>
            <td>{{ item.ADDRESS }}</td>
            <td> <input type="number" style="width: 80px;" name="transport_fee" id="transport_fee" v-model="item.TRANSPORT_FEE"></td>
            <td> <input type="text" style="width: 180px;" name="condition" id="condition" v-model="item.REQ_RFQ"></td>
            <td>{{ item.QUOTE_BEFORE }}</td>
            <td class="row">
              <button
                class="btn btn-info"
                style="font-size: 10px"
                title="Tạo báo giá"
                @click="handShowADD_PRICE_QOUTE_DTL(item)"
              >
                &#128221;
              </button>
              <button
                class="btn btn-info"
                style="font-size: 10px"
                title="Lưu báo giá"
                @click="handUpdateQouteHDR(item)"
              >
                &#128190;
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Contr_SelectSuppliers from "@/components/controls/Contr_SelectSuppliers.vue";

import { usePOStore } from "@/stores/po.store";
const poStore = usePOStore();

interface QuoteHDRRow {
  PQH_ID?: number
  SUP_ID?: number
  SUPPLIERS_NAME?: string
  TELEPHONE?: string
  EMAIL?: string
  ADDRESS?: string
  TRANSPORT_FEE?: number | string
  REQ_RFQ?: string
  QUOTE_BEFORE?: string
  [key: string]: any
}

const props = withDefaults(defineProps<{
  NameQoutePhase?: Record<string, any> | null
}>(), {
  NameQoutePhase: null
})

/* ===================== STATE ===================== */
const dataPriceQoute_HDR = ref<QuoteHDRRow[]>([])
const SUP_ID = ref<number | string>(0)


  /* ===================== METHODS ===================== */
const handShowADD_PRICE_QOUTE_DTL = (item: QuoteHDRRow) => {
  const src = `/pmc/po/ADD_PRICE_QOUTE_DTL?PQH_ID=${item.PQH_ID}&SUP_ID=${item.SUP_ID}`
  window.open(
    src,
    '',
    'fullscreen=yes, scrollbars=auto, titlebar=no  width=600,height=hv'
  )
}
 
const handUpdateQouteHDR = async (item: QuoteHDRRow) => {
  await poStore.UpdateQouteHDR(item)
}
 
const Pro_getDataQouteHDRs = async () => {
  const data = { PQP_ID: props.NameQoutePhase?.PQP_ID }
  const res = await poStore.getDataQouteHDRs(data)
  dataPriceQoute_HDR.value = res.dataPriceQoute_HDR
}
 
const handQouteCreateDTL = async () => {
  const data = {
    PQP_ID: props.NameQoutePhase?.PQP_ID,
    SUP_ID: SUP_ID.value,
  }
  const res = await poStore.addQouteCreateHDR(data)
  if (res.ok) {
    const src = `/pmc/po/ADD_PRICE_QOUTE_DTL?PQH_ID=${res.PQH_ID}&SUP_ID=${SUP_ID.value}`
    window.open(
      src,
      '',
      'fullscreen=yes, scrollbars=auto, titlebar=no  width=600,height=450'
    )
 
    await Pro_getDataQouteHDRs()
  }
}

//  methods: {
//    ...mapActions(["addQouteCreateHDR", "getDataQouteHDRs", "UpdateQouteHDR"]),

/* ===================== LIFECYCLE ===================== */
onMounted(() => {
  Pro_getDataQouteHDRs()
})
</script>

<style>
</style>