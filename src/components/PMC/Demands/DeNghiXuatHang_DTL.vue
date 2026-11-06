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
            <button @click="handUPDeNghiGiaoHang_ERP(item)">ERP</button>
            <button
              @click="handHuyDeNghiGiaoHang(item.PDDE_ID)"
              class="btn-sm btn-danger"
            >
              &#10006;
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dataThanhPham_Kho: [],
      DESCRIPTION: "",
      CUR_CODE: "USD",
      dataDelivers: [],
    };
  },
  props: {
    PDD_ID: Number,
    QTY: Number,
    QTY_DELIVER: Number,

  },
  methods: {
    ...mapActions([
      "getThanhPham_Kho",
      "DeNghiXuatHang",
      "getDeNghiXuatHang",
      "huyDeNghiGiaoHang",
      "UPDeNghiGiaoHang_ERP",
    ]),
    handUPDeNghiGiaoHang_ERP(item) {
      let data = {
        PDDE_ID: item.PDDE_ID,
        DESCRIPTION: item.DESCRIPTION,
        CUR_CODE: this.CUR_CODE,
      };
      this.UPDeNghiGiaoHang_ERP(data).then((res) => {
        this.Pro_getDeNghiXuatHang();
      });
    },
    handHuyDeNghiGiaoHang(PDDE_ID) {
      let data = { PDDE_ID: PDDE_ID };
      this.huyDeNghiGiaoHang(data).then((res) => {
        this.Pro_getDeNghiXuatHang();
      });
    },
    Pro_getDeNghiXuatHang() {
      let data = {
        PDD_ID: this.PDD_ID,
      };
      this.getDeNghiXuatHang(data).then((res) => {
        this.dataDelivers = res.dataDelivers;
      });
    },
  },
  created() {
    let data = {
      PDD_ID: this.PDD_ID || this.$route.query.PDD_ID,
    };
    this.getThanhPham_Kho(data).then((res) => {
      this.dataThanhPham_Kho = res.dataThanhPham_Kho;
      this.dataThanhPham_Kho.forEach((item) => {
        item.UNIT_PRICE = 0;
      });
    });
    this.Pro_getDeNghiXuatHang();
  },
};
</script>

<style>
</style>