<template>
  <div class="demands-dtl">
    <Busy_calculator :active.sync="showBusy" :message="texMasage" />

    <el-card shadow="never" class="mb-3">
      <el-form label-position="top" size="default">
        <el-row :gutter="12">
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="Dự Án SX">
              <projectSelect v-model="PROJ_CODE" @getValue="SelectProject" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="Báo giá">
              <el-select v-model="PQP_ID" placeholder="Chọn báo giá" style="width: 100%">
                <el-option
                  v-for="item in dataPQP_LIST"
                  :key="item.PQP_ID"
                  :label="`${item.NAME_PHASE}-${item.CUS_NAME}`"
                  :value="item.PQP_ID"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="3">
            <el-form-item label="Mã PO">
              <el-input v-model="valuePO" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="3">
            <el-form-item label="Mã SO">
              <el-input v-model="valueSO" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="3">
            <el-form-item label="Từ">
              <el-date-picker v-model="startDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="3">
            <el-form-item label="Đến">
              <el-date-picker v-model="endDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
            </el-form-item>
          </el-col>

          <el-col :xs="12" :sm="6" :md="4">
            <el-form-item label="Số lượng">
              <el-input-number v-model="ValueQty" :min="0" controls-position="right" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="4">
            <el-form-item label="Đơn giá">
              <el-input-number v-model="UNIT_PRICE" :min="0" controls-position="right" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="4">
            <el-form-item label="Std Code">
              <el-input :model-value="STANDARD_COST" readonly />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="6" :md="3">
            <el-form-item label="Ngoại tệ">
              <el-select v-model="CUR_CODE" style="width: 100%">
                <el-option v-for="c in ['VND', 'USD', 'EUR', 'CNY']" :key="c" :label="c" :value="c" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="7">
            <el-form-item label="Ghi chú">
              <el-input v-model="valueNod" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="2" class="form-action">
            <el-button type="primary" style="width: 100%" @click="handLuuDemandDTL">Lưu</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <div class="toolbar">
      <div class="toolbar-left">
        <el-tag size="large" effect="plain">{{ CurenDemand.PDD_ID }} - {{ CurenDemand.PROJ_CODE }}</el-tag>
        <el-button-group>
          <el-button @click="handNLSX">Yêu Cầu NLSX</el-button>
          <el-button @click="handLapKeHoachPO_POR" title="Lập kế hoạch">Lập Kế hoạch</el-button>
          <el-button @click="handPriceQoute">Lập Báo Giá</el-button>
          <el-button @click="handPPV_PLAN_SOM">PPV</el-button>
          <el-button @click="handDuyetChange_demand">Duyệt QTY</el-button>
          <el-button @click="handDonMuaHang">Đơn Hàng</el-button>
          <el-button @click="handGetBomGiaDTL_Projec">Bom Cost</el-button>
          <el-button @click="handCreaterWO">LSX</el-button>
          <el-button @click="handUpdateMaterialBomPO">Đồng bộ Bom</el-button>
        </el-button-group>
      </div>

      <div class="toolbar-right">
        <el-input v-model="searchText" placeholder="Tìm kiếm mã/ghi chú" clearable style="width: 220px" />
        <el-button type="info" @click="handPMC_Group_PO">Group PO</el-button>
      </div>
    </div>

    <el-card shadow="never" :body-style="{ padding: 0 }">
      <el-table
        :data="pagedData"
        row-key="PDD_ID"
        border
        stripe
        size="small"
        max-height="65vh"
        highlight-current-row
        :row-class-name="rowClass"
        @row-click="handSelectDemand"
      >
        <el-table-column prop="PDD_ID" label="ID" width="70" />
        <el-table-column prop="PROJ_CODE" label="Dự Án" min-width="110" />
        <el-table-column prop="PART_NUM" label="Mã" min-width="140" show-overflow-tooltip />
        <el-table-column prop="QTY" label="Số Lượng" width="90" align="right" />
        <el-table-column prop="UNIT_NAME" label="Đơn Vị" width="80" />
        <el-table-column prop="START_DEMANDS" label="Plan Từ" width="110" />
        <el-table-column prop="END_DEMANDS" label="Plan Đến" width="110" />
        <el-table-column prop="START_MATERIAL" label="Mua Từ" width="110" />
        <el-table-column prop="END_MATERIAL" label="Mua Đến" width="110" />
        <el-table-column prop="START_PRODUCT" label="SX Từ" width="110" />
        <el-table-column prop="END_PRODUCT" label="SX Đến" width="110" />
        <el-table-column prop="STATUS" label="Trạng thái" width="110" />
        <el-table-column prop="NUM_WO" label="LSX" width="70" />
        <el-table-column prop="NOTE" label="Ghi chú" min-width="160" show-overflow-tooltip />
        <el-table-column label="@" width="130" fixed="right" align="center">
          <template #default="{ row }">
            <el-button-group>
              <el-tooltip content="Xử lý" placement="top">
                <el-button size="small" type="primary" @click.stop="handForward(row.StatusId, row.PDD_ID, row.PROJ_CODE, row.START_DEMANDS, row.END_DEMANDS, row.QTY)">
                  <el-icon><Promotion /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="Theo dõi" placement="top">
                <el-button size="small" @click.stop="handTheoDoiDemands(row.StatusId, row.PDD_ID, row.PROJ_CODE, row.START_DEMANDS, row.END_DEMANDS, row.QTY)">
                  <el-icon><Search /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="Hủy" placement="top">
                <el-button size="small" type="danger" @click.stop="handHuyYCSanXuat_Demand(row.PDD_ID)">
                  <el-icon><Close /></el-icon>
                </el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div class="pager">
        <span>Hiển thị {{ filteredData.length ? startIndex + 1 : 0 }} - {{ endIndex }} trong {{ filteredData.length }}</span>
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="perPage"
          :page-sizes="[10, 25, 50]"
          :total="filteredData.length"
          layout="sizes, prev, pager, next"
          background
          size="small"
        />
      </div>
    </el-card>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import dayjs from "dayjs";
import { Promotion, Search, Close } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";

import { usePMCStore } from "@/stores/PMC.store.ts";
import { usePOStore } from "@/stores/po.store.ts";

import timeScroll from "./TimeScroll.vue";
import projectSelect from "@/components/controls/SelectProject/SelectProJect.vue";
import Busy_calculator from "@/components/Busy_calculator.vue";
import ChiThiMau from '@/components/controls/ChiThiMau.vue';

const route = useRoute()
const pmcStore = usePMCStore()
const poStore = usePOStore()

const ValueQty = ref(0)
const valueNod = ref("")
const valuePO = ref<string>("")
const Forecast = ref<string>("")
const valueSO = ref("")
const startDate = ref(dayjs().format("YYYY-MM-DD"))
const endDate = ref(dayjs().add(2, "day").format("YYYY-MM-DD"))
const UNIT_PRICE = ref<(number)>(0)
const CUR_CODE = ref('VND')
const PQP_ID = ref(null)
const dataPQP_LIST = ref<Record<string, any>[]>([])
const dataDemandsDTL = ref<Record<string, any>[]>([])
const CurenDemand = ref<any>({})
const PROJ_OBJECT = ref<Record<string, any>>({})
const PROJ_CODE = ref("")
const TYPE_PROD = ref("")

const PDD_ID = ref(0)
const showBusy = ref(false)
const texMasage = ref('Đang tính toán')
      // 1: thiết lập, 2: Tính nguyên liệu, 3: theo dõi nhu cầu nguyên liệu, 5: Tính Thời gian SX, 
			// --7: Chờ duyệt, 9: đã duyệt; 11 đang SX, 12: Dừng SX, 13: Giao hàng SX,14 đã hoàn thành, 15 cancel
const list_ChiThiMau = [
          { text: "Mới Lập", color: "#fffff" },//mauNenTrang
          { text: "Lập NL", color: "#00ffbb" },//mauNenXanhnGoc
          { text: "Đang SX", color: "#ffff00" }, //mauNenVang
          { text: "Đã Giao Hàng", color: "#2ecc71"  },  //mauNenXanhNhat  
          { text: "Đã Hoàn Thành", color: "#009933"  },  //mauNenXanh 
          { text: "Cancel", color: "#dfe4ea"  },     //mauNenXam
        ]
      // UI helpers
const searchText = ref('')
const page = ref(1)
const perPage = ref(10)

//computed: {
const STANDARD_COST = computed(() => {
      if (TYPE_PROD.value === 'Xuất Khẩu') {
        return UNIT_PRICE.value*70/100;
      }
      return UNIT_PRICE.value*95/100;;
    });
const filteredData = computed(() => {
      const txt = (searchText.value || '').toString().toLowerCase().trim();
      if (!txt) return dataDemandsDTL.value || [];
      return (dataDemandsDTL.value || []).filter(d => {
        return (
          (d.PART_NUM || '').toString().toLowerCase().includes(txt) ||
          (d.NOTE || '').toString().toLowerCase().includes(txt) ||
          (d.PROJ_CODE || '').toString().toLowerCase().includes(txt)
        );
      });
    })
const totalPages= computed(() => {
      return Math.max(1, Math.ceil((filteredData.value || []).length / (perPage.value || 10)));
    });
const pagedData = computed((): Record<string, any>[] => {
      const start = (page.value - 1) * perPage.value;
      return (filteredData.value || []).slice(start, start + perPage.value);
    });
const startIndex = computed(() => {
      return Math.min(((page.value - 1) * perPage.value), (filteredData.value || []).length - 1);
    });
const endIndex = computed(() => {
      return Math.min(page.value * perPage.value, (filteredData.value || []).length);
    });

//  methods: {
    // ...mapActions([
    //   "LuuDemandDTL",
    //   "getDemandDTL",
    //   "HuyYCSanXuat_Demand",
    //   "UpdateMaterialBomPO",
    //   "LapKeHoachPO_POR",
    //   "UpdatePlan_Material_Demand",
    //   'duyetChange_demand',
    //   'CreaterPlanForDemand',
    //   "getPQP_LIST"
    // ]),
const mauDemand = (item: any) => {
      switch (item.StatusId) {
        case 1:
          return 'mauNenTrang'
          break;
        case 2:
          return 'mauNenXanhnGoc'
          break;
         case 3:
          return 'mauNenXanhnGoc'
          break;
        case 4:
          return 'mauNenXanhnGoc'
          break;
        case 5:
          return 'mauNenXanhnGoc'
          break;
        case 6:
          return 'mauNenXanhnGoc'
          break;
        case 7:
          return 'mauNenXanhnGoc'
          break;
        case 8:
          return 'mauNenXanhnGoc'
          break;
        case 8:
          return 'mauNenXanhnGoc'
          break;
        case 10:
          return 'mauNenXanhnGoc'
          break;
        case 11:
          return 'mauNenVang'
          break;
        case 12:
          return ''
          break;
        case 13:
          return 'mauNenXanhNhat'
          break;
        case 14:
          return 'mauNenXanh'
          break;
        case 15:
          return 'mauNenXam'
          break;
      }
    }
const rowClass = ({ row }: { row: any }) =>
  [mauDemand(row), row.PDD_ID === CurenDemand.value.PDD_ID ? 'row-selected' : ''].join(' ')
const handPPV_PLAN_SOM = () => {
      let src = "";
      src = "/pmc/MRP/PPV_PLAN_SOM?PDD_ID=" + CurenDemand.value.PDD_ID;
      window.open(src,"BomGia_DTL_Project", "fullscreen=yes, scrollbars=auto, titlebar=no" );
    }
const SelectProject = (valueSelect: any) => {
      PROJ_OBJECT.value=valueSelect
    }
const handDuyetChange_demand = async () => {
      if (CurenDemand.value.PDD_ID) {
        let data = {
          PDD_ID: CurenDemand.value.PDD_ID,
        };
        await pmcStore.duyetChange_demand(data)

        texMasage.value='Lập lệnh Sản xuất'
        await pmcStore.CreaterPlanForDemand(data)

        procgetDemandDTL(Number(route.query.id) );
      }
    }
const handPMC_Group_PO = () => {
      let src = "";
      src = "/pmc/Demand_Group_PO?id=" + route.query.id;
      window.open(src,"BomGia_DTL_Project", "fullscreen=yes, scrollbars=auto, titlebar=no" );
    }
const handGetBomGiaDTL_Projec = () => {
      if (CurenDemand.value.PDD_ID) {
        let src = "";
        src = "/pmc/BomGia_DTL_Project?id=" + CurenDemand.value.PDD_ID + "&qty=" + CurenDemand.value.QTY;
        window.open( src, "BomGia_DTL_Project", "fullscreen=yes, scrollbars=auto, titlebar=no" );
      }
    }
const handLapKeHoachPO_POR = async () => {
      if (CurenDemand.value.PDD_ID) {
        let data = {
          PDD_ID: CurenDemand.value.PDD_ID,
        };
        await pmcStore.LapKeHoachPO_POR(data).then(res=>{
          procgetDemandDTL(Number(route.query.id));
        });
        await pmcStore.UpdatePlan_Material_Demand(data)
      }
    }
const handPriceQoute = () => {}
const handUpdateMaterialBomPO = () => {
      if (confirm('Bạn có đồng bộ lại Demand không')){

        let data = {
          PDD_ID: CurenDemand.value.PDD_ID,
        };
        //console.log(data);
        pmcStore.UpdateMaterialBomPO(data);
      }
    }
const handHuyYCSanXuat_Demand = (id: number) => {
      if (confirm('Bạn có  Hủy Demand không')){
      let data = { id: id };
        pmcStore.HuyYCSanXuat_Demand(data).then(() => {
          procgetDemandDTL(Number(route.query.id));
        });
      }
    }
const handSelectDemand = (item: any) => {
      CurenDemand.value = item;
      PROJ_CODE.value= CurenDemand.value.PROJ_CODE  
      PROJ_OBJECT.value ={
        id:CurenDemand.value.PROJ_CODE,
        name: CurenDemand.value.PROJ_NAME
      }
      ValueQty.value= CurenDemand.value.QTY
      valueNod.value= CurenDemand.value.NOTE
      startDate.value=  dayjs(CurenDemand.value.START_DEMANDS,"DD/MM/YYYY").format("YYYY-MM-DD") 
      endDate.value=  dayjs(CurenDemand.value.END_DEMANDS,"DD/MM/YYYY").format("YYYY-MM-DD")
      valuePO.value= CurenDemand.value.PO_CODE
      valueSO.value= CurenDemand.value.SALES_CODE
      UNIT_PRICE.value= CurenDemand.value.UNIT_PRICE
      CUR_CODE.value= CurenDemand.value.CUR_CODE
    }
const handLuuDemandDTL = async () => {
      try {
        showBusy.value=true
        if (PROJ_OBJECT.value.id) {
          let data = {
            ID: route.query.id,
            PDD_ID: CurenDemand.value.PDD_ID,
            PROJ_CODE: PROJ_OBJECT.value.id,
            ValueQty: ValueQty.value,
            valueNod: valueNod.value,
            startDate: startDate.value,
            endDate: endDate.value,
            PO_CODE: valuePO.value,
            SALES_CODE: valueSO.value,
            UNIT_PRICE: UNIT_PRICE.value,
            CUR_CODE: CUR_CODE.value,
            STANDARD_COST: STANDARD_COST.value,
            TYPE_PROD: TYPE_PROD.value,
            PQP_ID: PQP_ID.value
          };
          //console.log(data);
          // lưu Demaind DTL/ tính kế hoạch mua hàng và kế hoạch sản xuất
          texMasage.value='Lưu Demand'
          let retunDemandDTL=await pmcStore.LuuDemandDTL(data)
          // Tính kế hoạch mua hàng và kế hoạch SX
          //console.log(retunDemandDTL);          
          if (retunDemandDTL.PDD_ID){
            CurenDemand.value.PDD_ID=retunDemandDTL.PDD_ID
            let data1 = {
              PDD_ID: CurenDemand.value.PDD_ID,
            };
            //texMasage.value='Lên kế hoạch mua hàng và kế hoạch sản xuất'
            //await LapKeHoachPO_POR(data1)
            // Bổ sung chi tiết kế hoạch sử dụng nguyên liệu
            //texMasage.value='Cập nhật chi tiết sử dụng nguyên liệu cho demand'
            //await UpdatePlan_Material_Demand(data1)

            //texMasage.value='Lập lệnh Sản xuất'
            //await CreaterPlanForDemand(retunDemandDTL)

            texMasage.value='Lấy thông tin demand'
            procgetDemandDTL(Number(route.query.id));
          }
          

          
        } else alert("Chưa có dự án triển khai");

        showBusy.value=false
      } catch (error) {
      
      }finally{
        showBusy.value=false
      }
      
    }
const procgetDemandDTL = (PDE_ID: number) => {

      pmcStore.getDemandDTL({ PDE_ID: PDE_ID, Forecast: route.query.Forecast }).then((res) => {
        dataDemandsDTL.value = res.dataDemandsDTL;
        //console.log(dataDemandsDTL.value);
      });
    }
const changePage = (p: number) => {
      if (!p || p < 1) p = 1;
      if (p > totalPages.value) p = totalPages.value;
      page.value = p;
    }
const handCreaterWO = () => {
      if (CurenDemand.value.PDD_ID) {
        let src = "";
        src =
          "/pmc/MPS/MPSCreaterWO?id=" +
          CurenDemand.value.PDD_ID +
          "&projec=" +
          CurenDemand.value.PROJ_CODE +
          "&Start=" +
          CurenDemand.value.START_DEMANDS +
          "&end=" +
          CurenDemand.value.END_DEMANDS +
          "&qty=" +
          CurenDemand.value.QTY;
        window.open(
          src,
          "_blank",
          "fullscreen=yes, scrollbars=auto, titlebar=no"
        );
      }
    }
const handDonMuaHang = () => {
      if (CurenDemand.value.PDD_ID) {
        let src = "";
        src =
          "/po/MuaHang?id=" +
          CurenDemand.value.PDD_ID +
          "&projec=" +
          CurenDemand.value.PROJ_CODE +
          "&Start=" +
          CurenDemand.value.START_DEMANDS +
          "&end=" +
          CurenDemand.value.END_DEMANDS +
          "&qty=" +
          CurenDemand.value.QTY;
        window.open(
          src,
          "_blank",
          "fullscreen=yes, scrollbars=auto, titlebar=no"
        );
      }
    }
const handTheoDoiDemands = (status: number, id: number, projec: string, Start: string, end: string, qty: number) => {
      let src = "";
      src = "/pmc/DemandsTheoDoiMateral?id=" + id;
      window.open(
        src,
        "_blank",
        "fullscreen=yes, scrollbars=auto, titlebar=no"
      );
    }
const handNLSX = () => {
      if (CurenDemand.value.PDD_ID) {
        let status = CurenDemand.value.StatusId,
          id = CurenDemand.value.PDD_ID,
          projec = CurenDemand.value.PROJ_CODE,
          Start = CurenDemand.value.START_DEMANDS,
          end = CurenDemand.value.END_DEMANDS,
          qty = CurenDemand.value.QTY;

        let src = "";
        src =
          "/mrp/DamendsCaculationMaterial?id=" +
          id +
          "&projec=" +
          projec +
          "&Start=" +
          Start +
          "&end=" +
          end +
          "&qty=" +
          qty +
          "&PO_CODE=" +
          CurenDemand.value.PO_CODE;
        window.open(src, "", "fullscreen=yes, scrollbars=auto, titlebar=no");
      }
    }
const handForward = (status: number, id: number, projec: string, Start: string, end: string, qty: number) => {
      let src = "";
      switch (status) {
        case 1: // tính nguyên liệu
          src ="/mrp/DamendsCaculationMaterial?id=" + id +"&projec=" + projec + "&Start=" +Start +"&end=" + end + "&qty=" + qty + "&PO_CODE=" +
            CurenDemand.value.PO_CODE;
          window.open(
            src,
            "_blank","fullscreen=yes, scrollbars=auto, titlebar=no"
          );
          break;
        case 2:
          src = "/pmc/XacNhanMuaNL?id=" + id + "&projec=" + projec + "&Start=" + Start + "&end=" + end + "&qty=" + qty;
          window.open(src, "", "fullscreen=yes, scrollbars=auto, titlebar=no");
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        case 8:
          break;
        case 8:
          break;
        case 10:
          break;
        case 11:
          break;
        case 12:
          break;
      }
    }

  onMounted(async () => {
    valuePO.value = String(route.query.PO_CODE ?? "");
    Forecast.value = String(route.query.Forecast ?? "")
    procgetDemandDTL(Number(route.query.id) );
    const res = await poStore.getPQP_LIST()
    dataPQP_LIST.value = res.dataPQP_LIST;
      if (dataPQP_LIST.value.length > 0) {
        PQP_ID.value = dataPQP_LIST.value[0].PQP_ID;
      }
  })

</script>

<style scoped>
.demands-dtl { padding: 12px; }
.demands-dtl .mb-3 { margin-bottom: 12px; }
.demands-dtl :deep(.el-form-item) { margin-bottom: 10px; }
.form-action { display: flex; align-items: flex-end; padding-bottom: 10px; }
.toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.toolbar-left, .toolbar-right { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.pager {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid var(--el-border-color-lighter);
}
.demands-dtl :deep(.el-table .mauNenTrang td) { background: #ffffff !important; }
.demands-dtl :deep(.el-table .mauNenXanhnGoc td) { background: #e6fff5 !important; }
.demands-dtl :deep(.el-table .mauNenVang td) { background: #fff7e6 !important; }
.demands-dtl :deep(.el-table .mauNenXanhNhat td) { background: #dff0e6 !important; }
.demands-dtl :deep(.el-table .mauNenXanh td) { background: #d4efdf !important; }
.demands-dtl :deep(.el-table .mauNenXam td) { background: #f0f2f5 !important; }
.demands-dtl :deep(.el-table .row-selected td) { font-weight: bold; background: #e3f2fd !important; }
.e-responsive { background: #fff; }
.demands-dtl .table thead th { position: sticky; top: 0; z-index: 5; }
.mauNenTrang { background: #ffffff !important; }
.mauNenXanhnGoc { background: #e6fff5 !important; }
.mauNenVang { background: #fff7e6 !important; }
.mauNenXanhNhat { background: #dff0e6 !important; }
.mauNenXanh { background: #d4efdf !important; }
.mauNenXam { background: #f0f2f5 !important; }
.text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.row-selected { font-weight: bold; font-size: 1.05em; background-color: #e3f2fd !important; }
.demands-dtl .table thead th { position: sticky; top: 0; z-index: 5; }
.mauNenTrang { background: #ffffff !important; }
.mauNenXanhnGoc { background: #e6fff5 !important; }
.mauNenVang { background: #fff7e6 !important; }
.mauNenXanhNhat { background: #dff0e6 !important; }
.mauNenXanh { background: #d4efdf !important; }
.mauNenXam { background: #f0f2f5 !important; }
.text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.row-selected { font-weight: bold; font-size: 1.05em; background-color: #e3f2fd !important; }
</style>