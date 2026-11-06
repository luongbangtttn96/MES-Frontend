<template>
  <div>
    <div class="container text-center col-12">
      <h3>
        <b><label for="">PHIẾU ĐỀ NGHỊ MUA HÀNG</label></b>
      </h3>
    </div>
    <div class="row container">
      <div>
        <button @click="handCreate_POERP()">Tạo đề nghị mua hàng ERP</button>
      </div>
      <div><button>Báo cáo mua hàng</button></div>
      <div><button @click="exportDNMuaHang()">Xuất Excel</button></div>
    </div>
    <div class="container text-right col-12">Hồ Chí Minh, Ngày:{{ ToDay }}</div>
    <div class="col ml-2">
      Họ và tên người đề nghị (Propose): {{ currentUser.fullName }}
    </div>
    <div class="col ml-2">
      Tên Dự Án: <b>{{ this.$route.query.projec }}</b>
    </div>
    <div class="col ml-2">PO: {{ this.$route.query.PO_CODE }}</div>
    <div class="row ml-2">
      <div class="col-2">Từ Ngày: {{ this.$route.query.Start }}</div>
      <div class="col-2">Đến Ngày: {{ this.$route.query.end }}</div>
    </div>
    <div class="clo ml-4">
      Số Lượng: <b> {{ this.$route.query.qty }} </b>
    </div>

    <table class="table table-sm" id="exportable_DeNghiMuaHang">
      <thead>
        <th>STT</th>
        <th>Mã nguyên liệu</th>
        <th>Tên nguyên liệu</th>
        <th>Đơn vị</th>
        <th>Số lượng</th>
        <th>Ngày Mua</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataMaterial" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.PART_NUM }}</td>
          <td>{{ item.PART_NAME }}</td>
          <td>{{ item.UNIT }}</td>
          <td>{{ item.QTY }}</td>
          <td>{{item.PROPOSED_DATE_PO}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import XLSX from "xlsx";
import moment from "moment";
export default {
  data() {
    return {
      dataMaterial: null,
      ToDay: moment().format("DD/MM/YYYY"),
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    ...mapActions(["GetMaterial_ThieuChoDamends", "Create_POERP"]),

    exportDNMuaHang(type, fn, dl) {
      //console.log(type);
      var elt = document.getElementById("exportable_DeNghiMuaHang");
      var wb = XLSX.utils.table_to_book(elt, { raw: true });
      var ws = wb.Sheets["DeNghiMH"];

      XLSX.utils.sheet_add_aoa(ws, [["Created " + new Date().toISOString()]], {
        origin: -1,
      });
      XLSX.writeFile(wb, "ReportDeNghiMH.xlsx");
    },

    ProGetMaterial_ThieuChoDamends(id) {
      this.GetMaterial_ThieuChoDamends({ code: id }).then((res) => {
        this.dataMaterial = res.dataMaterial;
        this.$forceUpdate();
      });
    },
    handCreate_POERP() {
      let data = {
        UserName: this.currentUser.fullName,
        projec: this.$route.query.projec,
        dataMaterial: this.dataMaterial,
        PDD_ID: this.$route.query.id,
        PO_CODE: this.$route.query.PO_CODE,
        QTY: this.$route.query.qty,
      };
      this.Create_POERP(data);
    },
  },

  created() {
    this.ProGetMaterial_ThieuChoDamends(this.$route.query.id);
  },
};
</script>

<style scoped>
</style>