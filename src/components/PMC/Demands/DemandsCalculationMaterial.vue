<template>
  <div class="container-demands" @click="handHideMenuPupo()">
    <!-- Info Card Section -->
    <el-card class="info-card mb-3" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="header-title">📋 Thông Tin Nhu Cầu Sản Xuất</span>
        </div>
      </template>
      <el-row :gutter="20" class="info-row">
        <el-col :xs="24" :sm="12" :md="6" class="info-col">
          <div class="info-item">
            <span class="label">🏢 Dự án:</span>
            <span class="value">{{ ObjNhuCau.projec }}</span>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" class="info-col">
          <div class="info-item">
            <span class="label">📅 Từ ngày:</span>
            <span class="value">{{ ObjNhuCau.START_DEMANDS }}</span>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" class="info-col">
          <div class="info-item">
            <span class="label">📅 Đến ngày:</span>
            <span class="value">{{ ObjNhuCau.END_DEMANDS }}</span>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" class="info-col">
          <div class="info-item">
            <span class="label">📦 Số lượng:</span>
            <span class="value">{{ ObjNhuCau.QTY }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- Action Buttons -->
    <div class="button-group mb-3">
      <el-button-group>
        <el-button type="success" :icon="DocumentCopy" @click="handSaveDemandMaterial(ObjNhuCau.id)">
          💾 Lưu Dữ Liệu
        </el-button>
        <el-button type="primary" :icon="Check" @click="handXacNhanHoanThanhCongDoanMRP(ObjNhuCau.id, 2)">
          ✓ Xác Nhận Hoàn Thành
        </el-button>
        <el-button type="info" :icon="ShoppingTrolley" @click="handDanhSachNLBoSung(ObjNhuCau.id)">
          🛒 Nguyên Liệu Cần Mua
        </el-button>
        <el-button :icon="Download" @click="handGetTongHopTonKho(ObjNhuCau.id)">
          📥 Tồn Kho
        </el-button>
        <el-button :icon="Download" @click="handGetMateralMuadu_onway(ObjNhuCau.id)">
          📦 Đang Vận Chuyển
        </el-button>
        <el-button :icon="Download" @click="handGetMateralChoDuAnDangSX(ObjNhuCau.id)">
          🏭 Dự Án Đang SX
        </el-button>
      </el-button-group>
    </div>

    <!-- Color Legend -->
    <div class="legend-section mb-3">
      <chi-thi-mau
        :list_ChiThiMau="dataListChiThiMau"
        @ActionChithiMau="ActionChithiMau"
      />
    </div>

    <!-- Main Table with Virtual Scroll -->
    <el-card class="table-card">
      <el-table
        :data="showdataMaterials"
        stripe
        highlight-current-row
        :row-class-name="tableRowClassName"
        :height="tableHeight"
        virtual-scroll
        :virtual-scroll-size="28"
        :scroll-bar-always-on="false"
        style="width: 100%"
      >
        <!-- STT Column -->
        <el-table-column
          type="index"
          label="STT"
          width="60"
          align="center"
          fixed="left"
        />

        <!-- PARTNUM & Checkbox -->
        <el-table-column
          label="PARTNUM"
          width="180"
          font-size="8px"
          fixed="left"
        >
          <template #default="{ row, $index }">
            <div class="part-cell">
              <el-checkbox
                v-model="row.NCNR"
                @change="handSetNCNR_REQ_Material_Demand({ NCNR: row.NCNR, PART_NUM: row.PART_NUM })"
              />
              <span
                class="part-num"
                @dblclick="handSetMaterialPhu(row.PART_NUM)"
                title="Nháy đúp để cập nhật loại nguyên liệu"
              >
                {{ row.PART_NUM }}
              </span>
            </div>
          </template>
        </el-table-column>

        <!-- Part Name -->
        <el-table-column
          prop="PART_NAME"
          label="Tên Nguyên Liệu"
          width="180"
          show-overflow-tooltip
        />

        <!-- Base Quantity -->
        <el-table-column
          prop="QTY_UNIT"
          label="SL Cơ Sở"
          width="90"
          align="center"
        />

        <!-- Unit -->
        <el-table-column
          prop="UNIT"
          label="Đơn Vị"
          width="70"
          align="center"
        />

        <!-- Material Need Group -->
        <el-table-column label="NGUYÊN LIỆU CẦN" align="center" width="180">
          <el-table-column prop="QTY" label="SL NL" width="90" align="right" />
          <el-table-column prop="QTY_WASTAGE" label="Hao Hụt" width="90" align="right" />
        </el-table-column>

        <!-- Stock Group -->
        <el-table-column label="TỒN KHO" align="center" width="180">
          <el-table-column prop="QTY_STOC" label="Kho" width="90" align="right" />
          <el-table-column prop="QTY_PROC" label="Sản Xuất" width="90" align="right" />
        </el-table-column>

        <!-- On-Way -->
        <el-table-column
          prop="QTY_ONWAY"
          label="NL Dự OW"
          width="100"
          align="right"
        />

        <!-- Material For Project -->
        <el-table-column
          prop="QTY_PRODUC"
          label="NL Cho D/A Đ/SX"
          width="130"
          align="right"
        >
          <template #default="{ row }">
            <span
              class="clickable-cell"
              @dblclick="handObjectPhuthuoc($event, row.PART_NUM)"
              title="Nháy đúp để lấy dự án phụ thuộc"
            >
              {{ row.QTY_PRODUC }}
            </span>
          </template>
        </el-table-column>

        <!-- Response Quantity -->
        <el-table-column
          label="SỐ ĐÁP ỨNG"
          width="110"
          align="right"
        >
          <template #default="{ row }">
            {{ row.QTY_STOC + row.QTY_ONWAY + row.QTY_PROC - row.QTY_PRODUC }}
          </template>
        </el-table-column>

        <!-- Missing Quantity -->
        <el-table-column
          label="SỐ THIẾU"
          width="110"
          align="right"
        >
          <template #default="{ row }">
            <span class="shortage" v-if="(row.QTY + row.QTY_WASTAGE - (row.QTY_STOC + row.QTY_ONWAY + row.QTY_PROC - row.QTY_PRODUC)) > 0">
              {{ row.QTY + row.QTY_WASTAGE - (row.QTY_STOC + row.QTY_ONWAY + row.QTY_PROC - row.QTY_PRODUC) }}
            </span>
            <span v-else class="sufficient">0</span>
          </template>
        </el-table-column>

        <!-- Planned PO Group -->
        <el-table-column label="DỰ KIẾN" align="center" width="200">
          <el-table-column prop="PROPOSED_DATE_PO" label="Ngày Mua" width="100" align="center" />
          <el-table-column prop="QTY_REQ" label="SL NL" width="90" align="right" />
        </el-table-column>

        <!-- Expected Received Date -->
        <el-table-column
          prop="EXP_RECEIVED_DATE"
          label="Ngày Nhận Dự Kiến"
          width="130"
          align="center"
        />
      </el-table>
    </el-card>

    <!-- Dependent Project Menu -->
    <div class="menu-popup" id="menuPopu">
      <du-an-phu-thuoc :Demand_PART="Demand_PART" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Download, Check, ShoppingTrolley, DocumentCopy } from "@element-plus/icons-vue";

import { usePMCStore } from '@/stores/PMC.store';
import { useMRPStore } from '@/stores/mrp.store';
import { useInvStore } from '@/stores/inv.store';

import ChiThiMau from "@/components/controls/ChiThiMau.vue";
import DuAnPhuThuoc from "./DuAnPhuThuoc.vue";

const route = useRoute();
const pmcStore = usePMCStore();
const mprStore = useMRPStore();
const invStore = useInvStore();

// State
const ObjNhuCau = ref<Record<string, any>>({});
const dataMaterials = ref<Record<string, any>[]>([]);
const isSaveTon = ref(false);
const isSaveMateria_DangSX = ref(false);
const irhcode = ref<string | null>(null);
const irhIdERP = ref<string | null>(null);
const showIc = ref("+");
const Demand_PART = ref({});
const MauSelect = ref("");
const tableHeight = ref("calc(100vh - 200px)");

// Color legend data
const dataChithimau = ref([
  { text: "Đã đủ", color: "#009933" },
  { text: "Đang vận chuyển", color: "#00ffbb" },
  { text: "Đã mua", color: "#ffff00" },
  { text: "Chưa mua", color: "#f50707" },
  { text: "Nguyên liệu phụ", color: "#aeaeae" },
]);

// Computed: Filtered data based on selection
const showdataMaterials = computed(() => {
  let data;
  
  if (MauSelect.value == "") {    
    if (showIc.value == "+") {
      data = dataMaterials.value.filter((item) => item.rn == 1);
    } else {
      data = dataMaterials.value;
    }
    data.sort((a, b) => a.isSEC_MATERIAL - b.isSEC_MATERIAL);
  } else {
    data = dataMaterials.value.filter((item) => item.mau == MauSelect.value);
  }
  return data;
});

// Computed: Color legend with counts
const dataListChiThiMau = computed(() => {
  const jsondata = JSON.stringify(dataChithimau.value);
  const datact = JSON.parse(jsondata);

  let m1 = 0, m2 = 0, m3 = 0, m4 = 0, m5 = 0;
  
  dataMaterials.value.forEach((item) => {
    const m = mau(item);
    if (m === "mauNenXanh") m1++;
    if (m === "mauNenXanhnGoc") m2++;
    if (m === "mauNenVang") m3++;
    if (m === "mauNenDo") m4++;
    if (m === "mauNenXam") m5++;
  });

  datact[0].text = `${datact[0].text} ${m1}`;
  datact[1].text = `${datact[1].text} ${m2}`;
  datact[2].text = `${datact[2].text} ${m3}`;
  datact[3].text = `${datact[3].text} ${m4}`;
  datact[4].text = `${datact[4].text} ${m5}`;

  return datact;
});

// Methods
const mau = (item: any) => {
  if (item.isSEC_MATERIAL === 1 || item.IS_SIME === 1) {
    item.mau = "#aeaeae";
    return "mauNenXam";
  }

  if ((item.QTY + item.QTY_WASTAGE - item.QTY_RESPONSE) <= 0) {
    item.mau = "#009933";
    return "mauNenXanh";
  }

  if (item.QTY_Ship && item.QTY_Ship > 0) {
    item.mau = "#00ffbb";
    return "mauNenXanhnGoc";
  }

  if ((item.QTY + item.QTY_WASTAGE - item.QTY_RESPONSE) > 0 && item.PO_QTY) {
    item.mau = "#ffff00";
    return "mauNenVang";
  }

  if ((item.QTY + item.QTY_WASTAGE - item.QTY_RESPONSE) > 0 && !item.PO_QTY && !item.EXP_RECEIVED_DATE) {
    item.mau = "#f50707";
    return "mauNenDo";
  }

  return "";
};

const tableRowClassName = ({ row }: { row: any }) => {
  const color = mau(row);
  return color;
};

const handSetNCNR_REQ_Material_Demand = (item: any) => {
  const data = {
    PDD_ID: route.query.id,
    NCNR: item.NCNR,
    PART_NUM: item.PART_NUM
  };
  pmcStore.setNCNR_REQ_Material_Demand(data);
};

const handGetMateralMuadu_onway = async (id: number) => {
  const res = await pmcStore.getMateralMuadu_onway({ id: id });
  for (let i = 0; i < dataMaterials.value.length; i++) {
    if (dataMaterials.value[i].rn == 1) {
      const data = res.dataMateralMuadu_onway.filter(
        (vattu: any) => vattu.PART_NUM === dataMaterials.value[i].PART_NUM
      );
      dataMaterials.value[i].QTY_ONWAY = data[0] ? data[0].QTY_ONWAY : 0;
    }
  }
};

const ActionChithiMau = (p_color: string) => {
  MauSelect.value = p_color;
};

const handHideMenuPupo = () => {
  const menu = document.querySelector(".menu-popup");
  if (menu) {
    menu.classList.remove("hien-menu-popup");
  }
};

const handObjectPhuthuoc = (event: MouseEvent, PART_NUM: string) => {
  Demand_PART.value = {
    PDD_ID: route.query.id,
    PART_NUM: PART_NUM,
  };
  event.stopPropagation();
  const menuPopu = document.getElementById("menuPopu");
  if (menuPopu) {
    menuPopu.style.top = event.clientY + "px";
    menuPopu.style.left = event.clientX + "px";
    const menu = document.querySelector(".menu-popup");
    if (menu) {
      menu.classList.toggle("hien-menu-popup");
    }
  }
};

const handSetMaterialPhu = (PART_NUM: string) => {
  const src = `/UpdateTypeMaterial?partNum=${PART_NUM}`;
  window.open(
    src,
    "formAddTypeMaterial",
    "fullscreen=yes, scrollbars=auto,width=600,height=450, titlebar=no"
  );
};

const handAllPO = () => {
  if (showIc.value === "+") {
    showIc.value = "-";
  } else {
    showIc.value = "+";
  }
};

const handDanhSachNLBoSung = (id: number) => {
  const src = `/pmc/Form_TongHopBoSungNL?id=${route.query.id}&projec=${route.query.projec}&Start=${route.query.Start}&end=${route.query.end}&qty=${route.query.qty}&PO_CODE=${route.query.PO_CODE}`;
  window.open(
    src,
    "Form_TongHopBoSungNL",
    "fullscreen=yes, scrollbars=auto, titlebar=no"
  );
};

const handXacNhanHoanThanhCongDoanMRP = (id: number, Status: number) => {
  if (confirm("Bạn có xác nhận hoàn thành công đoạn này?")) {
    pmcStore.ChyenTrangThaiNhuCauSX({ id: id, Status: Status });
  }
};

const handLuuNhapNLMRP = async (id: number) => {
  await pmcStore.LuuNhapNLMRP({
    id: id,
    data: dataMaterials.value,
    irhcode: irhcode.value,
    irhIdERP: irhIdERP.value,
  });
  ProGetMateralDemands_IDDemand(Number(route.query.id));
};

const handERPgetObReceived = async () => {
  const inputCode = prompt("Nhập mã đơn hàng");
  if (inputCode !== null && inputCode.trim() !== "") {
    irhcode.value = inputCode;
    const res = await invStore.ERPgetObReceived(irhcode.value);
    if (res.ObRECEIVED) {
      irhIdERP.value = irhcode.value;
      irhcode.value = res.ObRECEIVED.IRH_CODE;

      dataMaterials.value.forEach((el, i) => {
        dataMaterials.value[i].extra = 0;
        res.ObRECEIVED.dsVattu.forEach((element: any) => {
          if (el.PART_NUM === element.PART_NUM) {
            dataMaterials.value[i].extra += element.REC_QUANTITY;
          }
        });
      });
    }
  }
};

const ProGetMateralDemands_IDDemand = (id: number) => {
  pmcStore.getMateralDemands_IDDemand({ id: id }).then((res) => {
    dataMaterials.value = res.dataMaterials;
    dataMaterials.value.forEach((element) => {
      element.extra = 0;
      if (element.PART_NUM.includes("PGC")) element.checkUoc = false;
      else element.checkUoc = true;
      if (element.isSEC_MATERIAL === true) element.checkUoc = false;
    });
  });
};

const handGetTongHopTonKho = async (id: number) => {
  const res = await pmcStore.getTongHopTonKhoMaterial({ id: id });
  for (let i = 0; i < dataMaterials.value.length; i++) {
    if (dataMaterials.value[i].rn == 1) {
      const data = res.dataStocMaterials.filter(
        (vattu: any) => vattu.PART_NUM === dataMaterials.value[i].PART_NUM
      );
      dataMaterials.value[i].QTY_STOC = data[0] ? data[0].QTY : 0;
      dataMaterials.value[i].QTY_PROC = data[0] ? data[0].QTY_PROC : 0;
    }
  }
  console.log("Tong hop ton kho updated", dataMaterials.value);
  isSaveTon.value = true;
};

const handGetMateralChoDuAnDangSX = async (id: number) => {
  const res: any = await pmcStore.getMateralChoDuAnDangSX({ id: id });

  if (res.dataMateralChoDuAnDangSX) {
    dataMaterials.value.forEach((el, i) => {
      dataMaterials.value[i].QTY_PRODUC = 0;
      res.dataMateralChoDuAnDangSX.forEach((element: any) => {
        if (el.PART_NUM === element.PART_NUM && Number(el.rn) === 1) {
          dataMaterials.value[i].QTY_PRODUC = element.remains;
        }
      });
    });
  }
  isSaveMateria_DangSX.value = true;
};

const handSaveDemandMaterial = (id: number) => {
  proSaveStocOfDemand(id);
};

const proSaveStocOfDemand = (id: number) => {
  const data = showdataMaterials.value.filter((item) => item.rn === 1);
  pmcStore.saveStocOfDemand({ id: id, data: data }).then(() => {
    ProGetMateralDemands_IDDemand(Number(route.query.id));
  });
};

// Lifecycle
onMounted(() => {
  ObjNhuCau.value.id = route.query.id;
  ObjNhuCau.value.projec = route.query.projec;
  ObjNhuCau.value.START_DEMANDS = route.query.Start;
  ObjNhuCau.value.END_DEMANDS = route.query.end;
  ObjNhuCau.value.QTY = route.query.qty;
  ObjNhuCau.value.UOC = 0;
  ProGetMateralDemands_IDDemand(Number(route.query.id));
  showIc.value = "+";
});
</script>

<style scoped>
.container-demands {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

/* Info Card */
.info-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.info-row {
  width: 100%;
}

.info-col {
  margin-bottom: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: linear-gradient(135deg, #f0f4f8 0%, #e8eef5 100%);
  border-radius: 6px;
  border-left: 4px solid #409eff;
}

.info-item .label {
  font-weight: 600;
  color: #333;
  min-width: 90px;
}

.info-item .value {
  color: #606266;
  font-size: 14px;
}

/* Button Group */
.button-group {
  display: flex;
  gap: 8px;
}

.el-button-group {
  gap: 4px;
}

.el-button {
  font-size: 14px !important;
  padding: 8px 16px !important;
}

/* Legend Section */
.legend-section {
  padding: 12px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Table Card */
.table-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

:deep(.el-table) {
  font-size: 13px;
}

:deep(.el-table__header-wrapper) {
  background: linear-gradient(135deg, #409eff 0%, #409eff 100%);
}

:deep(.el-table__header th) {
  background-color: #409eff !important;
  color: white !important;
  font-weight: 600 !important;
  padding: 8px 4px !important;
  height: 28px !important;
  line-height: 1.4 !important;
  text-align: center !important;
}

:deep(.el-table__body tr) {
  height: 28px !important;
}

:deep(.el-table__body td) {
  padding: 4px 8px !important;
  height: 28px !important;
  color: #333 !important;
  font-size: 13px !important;
  line-height: 1.5 !important;
  vertical-align: middle !important;
}

:deep(.el-table__body tr span) {
  color: #333 !important;
}

:deep(.el-table__body tr .cell) {
  color: #333 !important;
  display: flex !important;
  align-items: center !important;
  height: 100% !important;
}

/* Row Colors */
:deep(.mauNenXanh) {
  background-color: #e6f7ed !important;
}

:deep(.mauNenXanhnGoc) {
  background-color: #e0f7f4 !important;
}

:deep(.mauNenVang) {
  background-color: #fef9e6 !important;
}

:deep(.mauNenDo) {
  background-color: #fde6e6 !important;
}

:deep(.mauNenXam) {
  background-color: #f2f2f2 !important;
}

/* Part Cell Styling */
.part-cell {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 100%;
}

.part-num {
  cursor: pointer;
  color: #409eff;
  font-weight: 500;
  transition: color 0.3s;
}

.part-num:hover {
  color: #66b1ff;
  text-decoration: underline;
}

/* Clickable Cell */
.clickable-cell {
  cursor: pointer;
  color: #409eff;
  transition: color 0.3s;
  padding: 2px 4px;
  border-radius: 2px;
}

.clickable-cell:hover {
  background-color: #e6f7ff;
  color: #66b1ff;
}

/* Shortage & Sufficient */
.shortage {
  color: #f56c6c;
  font-weight: 600;
}

.sufficient {
  color: #67c23a;
  font-weight: 600;
}

/* Menu Popup */
.menu-popup {
  background-color: white;
  color: black;
  position: absolute;
  min-width: 100px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  display: none;
  z-index: 100;
  border-radius: 4px;
}

.hien-menu-popup {
  display: block;
}

/* Checkbox Styling */
:deep(.el-checkbox) {
  margin-right: 4px;
}

/* Responsive */
@media (max-width: 768px) {
  .container-demands {
    padding: 12px;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .button-group {
    flex-direction: column;
  }

  .el-button-group {
    flex-direction: column;
    width: 100%;
  }

  :deep(.el-button) {
    width: 100% !important;
  }
}

/* Utility Classes */
.mb-3 {
  margin-bottom: 20px;
}
</style>
