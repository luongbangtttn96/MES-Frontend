<template>
  <div> 
    <el-row>
      <div>
        <el-button @click="handCreate_POERP()">Tạo đề nghị mua hàng ERP</el-button>
      </div>
      <div><el-button>Báo cáo mua hàng</el-button></div>
      <div><el-button @click="exportDNMuaHang()">Xuất Excel</el-button></div>
    </el-row>
    <div id="printToPDF" class="quote-sheet">
    <div class="title text-center">
      <h3><b><label for="">PHIẾU ĐỀ NGHỊ MUA HÀNG</label></b></h3>
    </div>
   
    <div class="text-right">Hồ Chí Minh, Ngày:{{ ToDay }}</div>
    <div class="col ml-2">
      Họ và tên người đề nghị (Propose): {{ currentUser?.fullName }}
    </div>
    <div class="col ml-2">
      Tên Dự Án: <b>{{ route.query.projec }}</b>
    </div>
    <div class="col ml-2">PO: {{ route.query.PO_CODE }}</div>
    <div class="row ml-2">
      <div class="col-2">Từ Ngày: {{ route.query.Start }}</div>
      <div class="col-2">Đến Ngày: {{ route.query.end }}</div>
    </div>
    <div class="clo ml-4">
      Số Lượng: <b> {{ route.query.qty }} </b>
    </div>

    <table class="table table-sm" id="exportable_DeNghiMuaHang">
      <thead>
        <tr>
          <th>STT</th>
          <th>Mã nguyên liệu</th>
          <th>Tên nguyên liệu</th>
          <th>Đơn vị</th>
          <th>Số lượng</th>
          <th>Ngày Mua</th>
        </tr>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import * as XLSX from 'xlsx';
import dayjs from "dayjs";

import { useAuthStore } from '@/stores/auth.store';
import { usePMCStore } from '@/stores/PMC.store';
import { useRoute } from "vue-router";

const pmcStore = usePMCStore();
const authStore = useAuthStore();
const route = useRoute();

const dataMaterial = ref(null);
const ToDay = ref(dayjs().format("DD/MM/YYYY"));

//computed: {
 const currentUser = computed(() => authStore.user);

//  methods: {

//    ...mapActions(["GetMaterial_ThieuChoDamends", "Create_POERP"]),

const exportDNMuaHang = () => {
      //console.log(type);
      var elt = document.getElementById("exportable_DeNghiMuaHang");
      var wb = XLSX.utils.table_to_book(elt, { raw: true });
      var ws = wb.Sheets["DeNghiMH"];

      XLSX.utils.sheet_add_aoa(ws, [["Created " + new Date().toISOString()]], {
        origin: -1,
      });
      XLSX.writeFile(wb, "ReportDeNghiMH.xlsx");
    }

const ProGetMaterial_ThieuChoDamends = async (id: string) => {
    const res = await  pmcStore.GetMaterial_ThieuChoDamends({ code: id })
    dataMaterial.value = res.dataMaterial;
  }
const handCreate_POERP = () => {
      let data = {
        UserName: currentUser.value?.fullName ,
        projec: route.query.projec,
        dataMaterial: dataMaterial.value,
        PDD_ID: route.query.id,
        PO_CODE: route.query.PO_CODE,
        QTY: route.query.qty,
      };
      pmcStore.Create_POERP(data);
    };

onMounted(() => {
    ProGetMaterial_ThieuChoDamends(String(route.query.id));
  });

</script>

<style scoped>
.quote-sheet {
	width: 210mm;
	min-height: 297mm;
	margin: 0 auto;
	background: #ffffff;
	color: #111111;
	padding: 14mm 12mm;
	font-size: 14px;
	line-height: 1.35;
	box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}
.title {
	text-align: center;
	font-size: 24px;
	margin: 8px 0 14px;
}

</style>