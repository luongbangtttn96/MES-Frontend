<template>
  <div>
    <title-page :titlepage="'Thông tin mua hàng '"></title-page>
    <table class="table">
      <thead>
        <tr>
          <th rowspan="2">PO</th>
          <th rowspan="2">NCC</th>
          <th rowspan="2">NƯỚC</th>
          <th colspan="8">Vận Chuyển</th>
          <th rowspan="2">Ghi chú</th>
        </tr>
        <tr>
          <th>Nhà VC</th>
          <th>Hình thức VC</th>
          <th>Kiện</th>
          <th>Mã</th>
          <th>Phí VC</th>
          <th>Loại Tiền</th>
          <th>Phí HQ</th>
          <th>Tổng tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataGetChitiet_POfoDemanDTL" :key="index">
          <td>{{ item.PO_CODE }}</td>
          <td>{{ item.SUPPLIERS_NAME }}</td>
          <td>{{ item.COUNTRY }}</td>
          <td>{{ item.TRANSPORTERS }}</td>
          <td>{{ item.SHIP_TYPE }}</td>
          <td>{{ item.QTY_GUI }}</td>
          <td>{{ item.TRANSPORT_FEE }}</td>
          <td>{{ item.CUR_CODE }}</td>
          <td>{{ item.CUSTOM_FEE }}</td>
          <td>
            {{ item.CUSTOM_FEE + item.TRANSPORT_FEE * item.TRANSPORT_FEE }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import TitlePage from "@/components/controls/TitlePage.vue";

import { usePOStore } from "@/stores/po.store";

interface Chitiet_POfoDemanDTL {
  PO_CODE: string;
  SUPPLIERS_NAME: string;
  COUNTRY: string;
  TRANSPORTERS: string;
  SHIP_TYPE: string;
  QTY_GUI: number;
  TRANSPORT_FEE: number;
  CUR_CODE: string;
  CUSTOM_FEE: number;
}

const dataGetChitiet_POfoDemanDTL = ref<Chitiet_POfoDemanDTL[]>([]);
const poStore = usePOStore();
const route = useRoute();

onMounted(() => {
  let data = {
    PDD_ID: route.query.PDD_ID,
  };
  poStore.getChitiet_POfoDemanDTL(data).then((res) => {
    dataGetChitiet_POfoDemanDTL.value = res.dataGetChitiet_POfoDemanDTL;
  });
});
</script>

<style>
</style>