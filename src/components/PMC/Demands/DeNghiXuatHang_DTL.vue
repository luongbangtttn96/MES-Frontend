<template>
  <div>
    <table class="table mt-1">
      <thead>
        <th>STT</th>
        <th>Nội dung</th>
        <th>Ngày Đề nghị</th>
        <th>Số Lượng</th>
        <th>Trạng thái</th>
        <th>@</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataDelivers" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.DESCRIPTION }}</td>
          <td>{{ item.CREATED_AT }}</td>
          <td>{{ item.QTY }}</td>
          <td>{{ item.STATUS }}</td>
          <td>
            <div class="button-row">
              <!-- <el-button type="primary" size="small" @click="handUPDeNghiGiaoHang_ERP(item)">ERP</el-button> -->
              <el-button type="danger" size="small"
                @click="handHuyDeNghiGiaoHang(item.PDDE_ID)"
              >
                &#10006;
              </el-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { usePOStore } from "@/stores/po.store.ts";

const poStore = usePOStore();
const route = useRoute();

const dataThanhPham_Kho = ref<Record<string, any>[]>([]);
const DESCRIPTION = ref("");
const CUR_CODE = ref("USD");
const dataDelivers = ref<Record<string, any>[]>([]);

const props = defineProps({
    PDD_ID: Number,
    QTY: Number,
    QTY_DELIVER: Number,

  })

//  methods: {
    // ...mapActions([
    //   "getThanhPham_Kho",
    //   "DeNghiXuatHang",
    //   "getDeNghiXuatHang",
    //   "huyDeNghiGiaoHang",
    //   "UPDeNghiGiaoHang_ERP",
    // ]),
const handUPDeNghiGiaoHang_ERP = (item: any) => {
      let data = {
        PDDE_ID: item.PDDE_ID,
        DESCRIPTION: item.DESCRIPTION,
        CUR_CODE: CUR_CODE.value,
      };
      poStore.UPDeNghiGiaoHang_ERP(data).then((res) => {
        Pro_getDeNghiXuatHang();
      });
    };
const handHuyDeNghiGiaoHang = (PDDE_ID: number) => {
      let data = { PDDE_ID: PDDE_ID };
      poStore.huyDeNghiGiaoHang(data).then((res) => {
        Pro_getDeNghiXuatHang();
      });
    };
const Pro_getDeNghiXuatHang = () => {
      let data = {
        PDD_ID: props.PDD_ID,
      };
      poStore.getDeNghiXuatHang(data).then((res) => {
        dataDelivers.value = res.dataDelivers;
      });
    };

onMounted( async () => {
  let data = {
    PDD_ID: props.PDD_ID || route.query.PDD_ID,
  };
  const res= await poStore.getThanhPham_Kho(data)
  dataThanhPham_Kho.value = res.dataThanhPham_Kho;
  dataThanhPham_Kho.value.forEach((item: any) => {
    item.UNIT_PRICE = 0;
  });
  Pro_getDeNghiXuatHang();
});
</script>

<style>
  .button-row {
  display: flex;
  gap: 1px;
  align-items: center;
}
</style>