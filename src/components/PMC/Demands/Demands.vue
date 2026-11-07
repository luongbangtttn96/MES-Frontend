<template>
  <div class="demands-page">
    <div class="hero-card">
      <div class="hero-content">
        <div>
          <p class="eyebrow">Planning & Control</p>
          <h3>Quản lý nhu cầu khách hàng</h3>
          <p class="hero-subtitle">
            Theo dõi forecast, SO và tiến độ sản xuất trong một giao diện, dễ thao tác.
          </p>
        </div>
        <div class="hero-badges">
          <span class="pill-chip"><el-icon><TrendCharts /></el-icon> Dashboard</span>
          <span class="pill-chip"><el-icon><Calendar /></el-icon> Theo tháng</span>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <div class="chart-card">
        <div class="card-head">
          <div>
            <h6>Biểu đồ nhu cầu</h6>
            <small>Thông tin theo tháng</small>
          </div>
          <div class="month-picker">
            <el-date-picker
              v-model="month_Chart"
              type="month"
              value-format="YYYY-MM"
              format="YYYY-MM"
              :clearable="false"
              @change="handgetDataChartDM_Month()"
            />
          </div>
        </div>
        <div class="chart-body">
          <CharPie :chartData="dataChartDM" :width="180" :height="180" />
        </div>
      </div>

      <div class="form-card">
        <div class="card-head">
          <div>
            <h6>Tạo / cập nhật nhu cầu</h6>
            <small>Nhập thông tin chính để lưu vào hệ thống</small>
          </div>
          <span class="status-badge">Live</span>
        </div>

        <form action="#" v-on:submit.prevent="handSaveDemands">
          <div class="form-grid">
            

            <!-- <div class="field-group">
              <label for="project">Dự án SX</label>
              <projectSelect @getValue="SelectProject" v-model="projCode" />
            </div> -->
          </div>
            
          <div class="form-grid">   
            <div class="field-group">
              <label for="customer">Khách hàng</label>
              <Controls_customer v-model="customer" />
            </div>
            <div class="field-group">
              <label for="PO">Mã PO</label>
              <el-input v-model="valuePO" type="text" class="form-control" id="PO" />
            </div>

            <!-- <div class="field-group">
              <label for="SalesOder">Mã SO</label>
              <input v-model="valueSO" required type="text" class="form-control" id="SalesOder" />
            </div> -->

            <!-- <div class="field-group">
              <label for="DemQty">Số lượng</label>
              <input v-model="ValueQty" type="number" class="form-control" id="DemQty" />
            </div> -->

            <div class="field-group">
              <label for="Unit">Đơn vị đo</label>
              <el-select v-model="Unit" id="Unit" placeholder="Chọn đơn vị">
                <el-option v-for="it in dataUnits" :key="it.UNIT_ID" :label="it.UNIT_NAME" :value="it.UNIT_ID" />
              </el-select>
            </div>

            <div class="field-group">
              <label for="DemNgayD">Ngày bắt đầu</label>
              <el-date-picker v-model="valueNgayDau" type="date" value-format="YYYY-MM-DD" format="YYYY-MM-DD" :clearable="false" id="DemNgayD" />
            </div>

            <div class="field-group">
              <label for="DemNgayC">Ngày kết thúc</label>
              <el-date-picker v-model="valueNgayCuoi" type="date" value-format="YYYY-MM-DD" format="YYYY-MM-DD" :clearable="false" id="DemNgayC" />
            </div>

            <div class="field-group">
              <label for="DemandType">Loại nhu cầu</label>
              <el-select v-model="TYPE_DEMAND" id="DemandType" placeholder="Chọn loại nhu cầu">
                <el-option v-for="item in dataDemandType" :key="item.DANHBA_ID" :label="item.DANHBA_NAME" :value="item.CODE_NAME" />
              </el-select>
            </div>
          </div>

          <div class="textarea-block">
            <label for="DemName">Mô tả</label>
            <el-input v-model="valueMota" required type="text" id="DemName" />
          </div>

          <div class="action-row">
            <el-button @click="handTinhNguyenLieu()">
              <Icon name="calculation-50" :size="18" />&nbsp;Tính nguyên liệu
            </el-button>
            <el-button type="primary" native-type="submit">
              <Icon name="save-50" :size="18" />&nbsp;Lưu nhu cầu
            </el-button>
          </div>
        </form>
      </div>
    </div>

    <div class="section-card">
      <div class="section-head">
        <div>
          <h6>Danh sách nhu cầu</h6>
          <small>Giao diện theo dõi toàn bộ dữ liệu</small>
        </div>
        <span class="section-badge">Realtime</span>
      </div>
      <el-tabs content-class="mt-3" v-model="activeTab">
      <el-tab-pane label="Forecast" name="forecast" lazy>
        <el-row :gutter="20" justify="space-between">
          <el-col :xs="12" :sm="12">
            <el-input
              v-model="search_Forecast"
              type="text"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>
            <el-col :xs="12" :sm="6" style="text-align: right">
              <el-button
                class="btn btn-info"
                @click="handDanhSach_FOR_Demand_DTL()"
              >
                Chi tiết Forecast
              </el-button>
            </el-col>
          </el-row>
        <el-pagination
          v-model:current-page="pagingForecast.page.value"
          v-model:page-size="pagingForecast.pageSize.value"
          class="table-pagination"
          size="small"
          background
          layout="total, sizes, prev, pager, next"
          :page-sizes="PAGE_SIZES"
          :total="pagingForecast.total.value"
        />
        <el-table
          class="demand-table"
          :data="pagingForecast.rows.value"
          height="75vh"
          size="small"
          stripe
          border
          highlight-current-row
          @row-click="(row: any) => handGetDemand(row.PDE_ID)"
        >
          <el-table-column type="index" label="Số TT" width="70" :index="pagingForecast.indexMethod" />
          <el-table-column prop="PDE_ID" label="ID" width="80" />
          <el-table-column prop="CUS_NAME" label="KHÁCH HÀNG" min-width="140" show-overflow-tooltip />
          <el-table-column prop="PROJ_CODE" label="MÃ DA" width="110" />
          <el-table-column prop="PO_CODE" label="Mã PO" width="120" />
          <el-table-column prop="SALESODER_CODE" label="Mã SO" width="120" />
          <el-table-column prop="QTY" label="Số Lượng" width="90" />
          <el-table-column prop="UNIT_NAME" label="Đơn Vị" width="80" />
          <el-table-column prop="START_DATE" label="Ngày BĐ" width="100" />
          <el-table-column prop="END_DATE" label="Ngày KT" width="100" />
          <el-table-column prop="DESCRIPTION" label="Mô Tả" min-width="160" show-overflow-tooltip />
          <el-table-column prop="SoDotSX" label="Số FC" width="80" />
          <el-table-column prop="So_TL" label="Thiết Lập" width="90" />
          <el-table-column prop="So_TNL" label="Tính NVL" width="90" />
          <el-table-column prop="So_TTG_SX" label="Báo giá" width="80" />
          <el-table-column prop="So_DSX" label="Mua hàng" width="90" />
          <el-table-column prop="sum_delivery" label="Số giao" width="80" />
          <el-table-column label="@" width="140" fixed="right">
            <template #default="{ row }">
              <el-button size="small" type="success" title="Show forecast" :icon="List" circle @click="handShowForecast(row.PDE_ID)" />
              <el-button size="small" type="info" title="DTL forecast" :icon="Document" circle @click="handFormDemandsDTL(row.PDE_ID, row.PO_CODE)" />
              <el-button size="small" type="danger" title="Xóa forecast" :icon="Delete" circle @click="handHuyDemands(row.PDE_ID)" />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="SO:" name="so" lazy>
        <el-row :gutter="22" justify="space-between" align="middle">
          <el-col :xs="12" :sm="8">
            <el-input
              type="text"
              class="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              v-model="search"
            >
              <template #prefix>
                <span class="input-group-text" id="inputGroup-sizing-default">
                  <el-icon ><Search /></el-icon>
                </span>
              </template>
            </el-input>
          </el-col>
          <el-col :xs="12" :sm="16" style="text-align: right">
            <el-row :gutter="20" justify="space-between" align="middle">
            <el-button-group> 
            <el-button class="btn btn-info" @click="handDanhSach_AllDemand_DTL()">
              Chi tiết SO
            </el-button>
            <el-button class="btn btn-info" @click="handBaoCaoXuattraDemand()">
              QL xuất trả nhu cầu
            </el-button>
            <el-button class="btn btn-info" @click="handBaoCaoQL_lichPO()">
              QL lịch mua hàng
            </el-button>
            <el-button class="btn btn-info" @click="handBaoCaoTheoGioiKiemSoat_NLSX()">
              Kiểm soát nguyên liệu SX
            </el-button>
            </el-button-group>
            </el-row>
          </el-col>
        </el-row>

        <chi-thi-mau :list_ChiThiMau="list_ChiThiMau" />

        <el-pagination
          v-model:current-page="pagingSO.page.value"
          v-model:page-size="pagingSO.pageSize.value"
          class="table-pagination"
          size="small"
          background
          layout="total, sizes, prev, pager, next"
          :page-sizes="PAGE_SIZES"
          :total="pagingSO.total.value"
        />
        <el-table
          class="demand-table"
          :data="pagingSO.rows.value"
          height="75vh"
          size="small"
          border
          :row-class-name="({ row }: { row: any }) => mau(row) ?? ''"
          @row-click="(row: any) => handGetDemand(row.PDE_ID)"
          @row-dblclick="(row: any) => handFormDemandsDTL(row.PDE_ID, row.PO_CODE)"
        >
          <el-table-column type="index" label="Số TT" width="70" :index="pagingSO.indexMethod" />
          <el-table-column prop="PDE_ID" label="ID" width="80" />
          <el-table-column prop="CUS_NAME" label="KHÁCH HÀNG" min-width="140" show-overflow-tooltip />
          <el-table-column prop="PROJ_CODE" label="MÃ DA" width="110" />
          <el-table-column prop="PO_CODE" label="Mã PO" width="120" />
          <el-table-column label="Mã SO" width="120">
            <template #default="{ row }">
              <span class="link-cell" @click="handShowYCXuat_SO($event, row.SALESODER_CODE)">{{ row.SALESODER_CODE }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="QTY" label="Số Lượng" width="90" />
          <el-table-column prop="UNIT_NAME" label="Đơn Vị" width="80" />
          <el-table-column prop="START_DATE" label="Ngày BĐ" width="100" />
          <el-table-column prop="END_DATE" label="Ngày KT" width="100" />
          <el-table-column prop="DESCRIPTION" label="Mô Tả" min-width="160" show-overflow-tooltip />
          <el-table-column prop="SoDotSX" label="Số SOM" width="80" />
          <el-table-column prop="So_TNL" label="Tính NVL" width="90" />
          <el-table-column prop="So_TTG_SX" label="Tính Lịch SX" width="110" />
          <el-table-column prop="So_DSX" label="Đang SX" width="80" />
          <el-table-column prop="So_DungSX" label="Dừng SX" width="80" />
          <el-table-column prop="So_DHT_SX" label="Đã SX" width="80" />
          <el-table-column prop="sum_delivery" label="Số giao" width="80" />
          <el-table-column label="@" width="190" fixed="right">
            <template #default="{ row }">
              <el-button size="small" type="info" title="Chi tiết nhu cầu" :icon="Document" circle @click="handFormDemandsDTL(row.PDE_ID, row.PO_CODE)" />
              <el-button size="small" type="info" title="Tạm dừng nhu cầu" :icon="VideoPause" circle @click="handPauseDemands(row.PDE_ID)" />
              <el-button size="small" title="Đóng nhu cầu" :icon="Wallet" circle @click="handDongDemand(row)" />
              <el-button size="small" type="danger" title="Xóa nhu cầu" :icon="Delete" circle @click="handHuyDemands(row.PDE_ID)" />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="SOM Tạm dừng" name="som-tam-dung" lazy>
        <el-pagination
          v-model:current-page="pagingTamDung.page.value"
          v-model:page-size="pagingTamDung.pageSize.value"
          class="table-pagination"
          size="small"
          background
          layout="total, sizes, prev, pager, next"
          :page-sizes="PAGE_SIZES"
          :total="pagingTamDung.total.value"
        />
        <el-table
          class="demand-table"
          :data="pagingTamDung.rows.value"
          height="75vh"
          size="small"
          stripe
          border
          :row-class-name="({ row }: { row: any }) => mau_Table_dong(row) ?? ''"
          @row-dblclick="(row: any) => handFormDemandsDTL(row.PDE_ID, row.PO_CODE)"
        >
          <el-table-column type="index" label="Số TT" width="70" :index="pagingTamDung.indexMethod" />
          <el-table-column prop="PDE_ID" label="ID" width="80" />
          <el-table-column prop="PROJ_NAME" label="Dự Án" min-width="140" show-overflow-tooltip />
          <el-table-column prop="PROJ_CODE" label="MÃ DA" width="110" />
          <el-table-column prop="PO_CODE" label="Mã PO" width="120" />
          <el-table-column prop="SALESODER_CODE" label="Mã SO" width="120" />
          <el-table-column prop="QTY" label="Số Lượng" width="90" />
          <el-table-column prop="UNIT_NAME" label="Đơn Vị" width="80" />
          <el-table-column prop="START_DATE" label="Ngày BĐ" width="100" />
          <el-table-column prop="END_DATE" label="Ngày KT" width="100" />
          <el-table-column prop="DATE_CLOSE" label="Ngày Đóng" width="100" />
          <el-table-column prop="DESCRIPTION" label="Mô Tả" min-width="160" show-overflow-tooltip />
          <el-table-column prop="SoDotSX" label="Số SOM" width="80" />
          <el-table-column prop="So_TNL" label="Tính NVL" width="90" />
          <el-table-column prop="So_TTG_SX" label="Tính Lịch SX" width="110" />
          <el-table-column prop="So_DSX" label="Đang SX" width="80" />
          <el-table-column prop="So_DungSX" label="Dừng SX" width="80" />
          <el-table-column prop="So_DHT_SX" label="Đã SX" width="80" />
          <el-table-column prop="sum_delivery" label="Số giao" width="80" />
          <el-table-column prop="FULL_NAME" label="Người T/H" width="140" show-overflow-tooltip />
          <el-table-column prop="UPDATED_AT" label="Thời gian T/H" width="150" />
          <el-table-column label="Mở Demand" width="100" fixed="right">
            <template #default="{ row }">
              <el-button size="small" type="info" title="Mở Lại Demand" :icon="RefreshLeft" circle @click="handOpenDemand(row.PDE_ID)" />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="S.O.M đã đóng:" name="som-da-dong" lazy>
        <div class="year-filter">
          <span>Năm:</span>
          <el-input
            v-model="Year_Demand"
            type="number"
            style="width: 120px"
            @change="handGetDataDemands_Year()"
          />
        </div>
        <chi-thi-mau :list_ChiThiMau="list_ChiThiMau" />
        <el-pagination
          v-model:current-page="pagingYear.page.value"
          v-model:page-size="pagingYear.pageSize.value"
          class="table-pagination"
          size="small"
          background
          layout="total, sizes, prev, pager, next"
          :page-sizes="PAGE_SIZES"
          :total="pagingYear.total.value"
        />
        <el-table
          class="demand-table"
          :data="pagingYear.rows.value"
          height="75vh"
          size="small"
          stripe
          border
          :row-class-name="({ row }: { row: any }) => mau_Table_dong(row) ?? ''"
          @row-dblclick="(row: any) => handFormDemandsDTL(row.PDE_ID, row.PO_CODE)"
        >
          <el-table-column type="index" label="Số TT" width="70" :index="pagingYear.indexMethod" />
          <el-table-column prop="PDE_ID" label="ID" width="80" />
          <el-table-column prop="PROJ_NAME" label="Dự Án" min-width="140" show-overflow-tooltip />
          <el-table-column prop="PROJ_CODE" label="MÃ DA" width="110" />
          <el-table-column prop="PO_CODE" label="Mã PO" width="120" />
          <el-table-column prop="SALESODER_CODE" label="Mã SO" width="120" />
          <el-table-column prop="QTY" label="Số Lượng" width="90" />
          <el-table-column prop="UNIT_NAME" label="Đơn Vị" width="80" />
          <el-table-column prop="START_DATE" label="Ngày BĐ" width="100" />
          <el-table-column prop="END_DATE" label="Ngày KT" width="100" />
          <el-table-column prop="DATE_CLOSE" label="Ngày Đóng" width="100" />
          <el-table-column prop="DESCRIPTION" label="Mô Tả" min-width="160" show-overflow-tooltip />
          <el-table-column prop="SoDotSX" label="Số SOM" width="80" />
          <el-table-column prop="So_TNL" label="Tính NVL" width="90" />
          <el-table-column prop="So_TTG_SX" label="Tính Lịch SX" width="110" />
          <el-table-column prop="So_DSX" label="Đang SX" width="80" />
          <el-table-column prop="So_DungSX" label="Dừng SX" width="80" />
          <el-table-column prop="So_DHT_SX" label="Đã SX" width="80" />
          <el-table-column prop="sum_delivery" label="Số giao" width="80" />
          <el-table-column prop="FULL_NAME" label="Người T/H" width="140" show-overflow-tooltip />
          <el-table-column prop="UPDATED_AT" label="Thời gian T/H" width="150" />
          <el-table-column label="Mở Demand" width="100" fixed="right">
            <template #default="{ row }">
              <el-button size="small" type="info" title="Mở Lại Demand" :icon="RefreshLeft" circle @click="handOpenDemand(row.PDE_ID)" />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="SUM SOM&FORECAST" name="sum-som-forecast" lazy>
        <SumSOMForecast />
      </el-tab-pane>
    </el-tabs>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, watch, onMounted } from "vue";
import dayjs from "dayjs";
import { Search, List, Document, Delete, VideoPause, Wallet, RefreshLeft, TrendCharts, Calendar } from '@element-plus/icons-vue'

import { usePMCStore } from '@/stores/PMC.store';
import { useMasterDataStore } from '@/stores/MasterData.store';

import Icon from '@/components/controls/Icon.vue';
import CharPie from "@/components/Chart/CharPie.vue";
import ChiThiMau from "@/components/controls/ChiThiMau.vue";
import Controls_customer from "@/components/controls/customer/controls_customer.vue";
import SumSOMForecast from './SumSOMForecast.vue';


const pmcStore = usePMCStore();
const masterDataStore = useMasterDataStore();

// Danh sách lớn chỉ thay thế nguyên mảng nên dùng shallowRef để tránh bọc reactive sâu từng dòng
const dataDemands = shallowRef<Record<string, any>[]>([]);
const dataDemands_forecast = shallowRef<Record<string, any>[]>([]);
const search = ref("");
const search_Forecast = ref("");
const PDE_ID = ref<number|string|null>(null);
const PROJ_OBJECT = ref({});

const activeTab = ref("so");
const projCode = ref(null);
const valueSO = ref(null);
const valuePO = ref(null);
const ValueQty = ref(null);
const valueNgayDau = ref(dayjs().format("YYYY-MM-DD"));
const valueNgayCuoi = ref(dayjs().format("YYYY-MM-DD"));
const valueMota = ref(null);
const dataUnits = ref<Record<string, any>[]>([]);
const Unit = ref(0);
const month_Chart = ref(dayjs().format("YYYY-MM"));
const dataChartDM_Month = ref({
  tong: 0,
  So_SX: 0,
  DA_SX: 0,
  Pro_QTY: 0,
});
const dataChartDM = ref({});
const dataDemands_Year = shallowRef<Record<string, any>[]>([]);
const dataDemands_TamDung = shallowRef<Record<string, any>[]>([]);
const Year_Demand = ref(dayjs().format("YYYY"));

const customer = ref<Record<string, any>>({});

const list_ChiThiMau = ref([
        { text: "Đúng hẹn", color: "#009933" },
        { text: "Hết hạn trong 7 ngày", color: "#f89734" },
        { text: "Quá hạn", color: "#f50707" },
      ]);

const TYPE_DEMAND = ref(null);
const dataDemandType = ref<Record<string, any>[]>([]);

  //computed: 
const showdataDemands_forecast = computed(() => {
      if (dataDemands_forecast.value){
        
       let data = dataDemands_forecast.value.filter((element) => {
        return (
          element.PROJ_CODE.toUpperCase().includes(search_Forecast.value.toUpperCase()) ||
          (element.DESCRIPTION &&
            element.DESCRIPTION.toUpperCase().includes(
              search_Forecast.value.toUpperCase()
            )) ||
          (element.PO_CODE &&
            element.PO_CODE.toUpperCase().includes(
              search_Forecast.value.toUpperCase()
            )) ||
          (element.PROJ_NAME &&
            element.PROJ_NAME.toUpperCase().includes(search_Forecast.value.toUpperCase()))
        );
      });
      //console.log(data);
      return data;
      }
      else{ return null}
    });
const showdataDemands = computed(() => {
      let data = dataDemands.value.filter((element) => {
        return (
          element.PROJ_CODE.toUpperCase().includes(search.value.toUpperCase()) ||
          (element.DESCRIPTION && 
            element.DESCRIPTION.toUpperCase().includes(search.value.toUpperCase()
            )) ||
          (element.PO_CODE && 
            element.PO_CODE.toUpperCase().includes( search.value.toUpperCase()
            )) ||
          (element.PROJ_NAME &&
            element.PROJ_NAME.toUpperCase().includes(search.value.toUpperCase()
            )) ||
          (element.CUS_NAME &&
            element.CUS_NAME.toUpperCase().includes(search.value.toUpperCase()))
        );
      });
      //console.log(data);
      return data;
    });

const PAGE_SIZES = [50, 100, 200];

// Chỉ render một trang dòng để el-table không phải dựng toàn bộ DOM
function usePaging(source: () => Record<string, any>[] | null | undefined) {
  const page = ref(1);
  const pageSize = ref(PAGE_SIZES[0]);
  const total = computed(() => source()?.length ?? 0);
  const rows = computed(() => {
    const start = (page.value - 1) * pageSize.value;
    return (source() ?? []).slice(start, start + pageSize.value);
  });
  const indexMethod = (index: number) => (page.value - 1) * pageSize.value + index + 1;

  watch([total, pageSize], () => {
    page.value = 1;
  });

  return { page, pageSize, total, rows, indexMethod };
}

const pagingForecast = usePaging(() => showdataDemands_forecast.value);
const pagingSO = usePaging(() => showdataDemands.value);
const pagingTamDung = usePaging(() => dataDemands_TamDung.value);
const pagingYear = usePaging(() => dataDemands_Year.value);

const handPauseDemands = async (PDE_ID:number|string|null) => {
      let kq = confirm(
        "Bạn có chắc chắn muốn tạm dừng dự án này không?"
      );
      if (kq) {
        let data = { PDE_ID: PDE_ID };
        await pmcStore.PauseDemands(data);
        pro_getDemands();
        pro_getDemands_tamdung();
      }
    }
  const pro_getDemands_tamdung = async () => {
      let data={}
      let res = await pmcStore.getDataDemands_TamDung(data);
      dataDemands_TamDung.value = res.dataDemands_TamDung;
    }
const handShowYCXuat_SO = (even: Event, SO_CODE: string) => {
      let src = "";
      src = "/pmc/BaoCao_YCXuat_SO?SO_CODE=" + SO_CODE;
      window.open(src, "", "fullscreen=yes, scrollbars=auto, titlebar=no");
      even.stopPropagation();
    }
const handBaoCaoTheoGioiKiemSoat_NLSX = () => {
      let src = "";
      src = "/mrp/BaoCaoTheoGioiKiemSoat_NLSX";
      window.open(src, "", "fullscreen=yes, scrollbars=auto, titlebar=no");
    }
const handOpenDemand = async (PDE_ID: number|string|null) => {
      if (confirm("Bạn muốn mở lại dự án này không")) {
        let data = {
          PDE_ID: PDE_ID,
        };
        await pmcStore.OpenDemand(data);
        pro_getDemands_Year();
      }
    }
const handGetDemand = async (demandId: number|string|null) => {
      let data = { PDE_ID: demandId };
      let res = await pmcStore.getDemand(data);
        //console.log(res.dataGetdemand);
        PROJ_OBJECT.value = {};
        PROJ_OBJECT.value = {
          id: res.dataGetdemand.PROJ_CODE|| '',
          name: res.dataGetdemand.PROJ_NAME || '',
        };
        customer.value = {};
        customer.value = {
          id: res.dataGetdemand.CUS_NUMBER,
          name: res.dataGetdemand.CUS_NAME,
        };

        if (!customer.value.id) {
          customer.value = {};
        }
        console.log(customer.value);

        PDE_ID.value = res.dataGetdemand.PDE_ID;
        projCode.value = res.dataGetdemand.PROJ_CODE;
        valueSO.value = res.dataGetdemand.SALESODER_CODE;
        valuePO.value = res.dataGetdemand.PO_CODE;
        ValueQty.value = res.dataGetdemand.QTY;
        valueNgayDau.value = dayjs(
          res.dataGetdemand.START_DATE,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");

        valueNgayCuoi.value = dayjs(
          res.dataGetdemand.END_DATE,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");
        valueMota.value = res.dataGetdemand.DESCRIPTION;
        Unit.value = res.dataGetdemand.UNIT;
        TYPE_DEMAND.value = res.dataGetdemand.TYPE_DEMAND;
    }
const mau_Table_dong = (item: any) => {
      if (item.QTY <= item.sum_delivery) return "mauNenXanh";
      if (
        dayjs(item.END_DATE, "DD/MM/YYYY") <
          dayjs(item.DATE_CLOSE, "DD/MM/YYYY") &&
        item.QTY > item.sum_delivery
      )
        return "mauNenDo";
      if (
        dayjs(item.END_DATE, "DD/MM/YYYY").subtract(7, "day") < dayjs() &&
        item.QTY > item.sum_delivery
      )
        return "mauNenCam";
};
const mau = (item: any) => {
      if (item.QTY <= item.sum_delivery) return "mauNenXanh";
      if (
        dayjs(item.END_DATE, "DD/MM/YYYY") < dayjs() &&
        item.QTY > item.sum_delivery
      )
        return "mauNenDo";
      if (
        dayjs(item.END_DATE, "DD/MM/YYYY").subtract(7, "day") < dayjs() &&
        item.QTY > item.sum_delivery
      )
        return "mauNenCam";
}
const handBaoCaoQL_lichPO = () => {
      let src = "";
      src = "/pmc/mrp/PO_Plan_Shedule";
      window.open(src, "", "fullscreen=yes, scrollbars=auto, titlebar=no");
    }
const handDanhSach_FOR_Demand_DTL = () => {
      let src = "";
      src = "/pmc/DanhSach_FOR_Demand_DTL";
      window.open(
        src,
        "",
        "fullscreen=yes, scrollbars=auto, titlebar=no"
      );
};
const handDanhSach_AllDemand_DTL = () => {
      let src = "";
      src = "/pmc/DanhSach_AllDemand_DTL";
      window.open(
        src,
        "",
        "fullscreen=yes, scrollbars=auto, titlebar=no"
      );
};
const handBaoCaoXuattraDemand = () => {
      let src = "";
      src = "/pmc/ReportXuattraDemand";
      window.open(
        src,
        "newWin",
        "fullscreen=yes, scrollbars=auto, titlebar=no"
      );
};
const handGetDataDemands_Year = async () => {
      await pro_getDemands_Year();
};
const handDongDemand = async (item: any) => {
      let kq = true;
      if (item.tong > item.So_DHT_SX) {
        kq = confirm("Dự án này chưa SX xong, bạn có muống đóng không");
      }
      if (kq) {
        let data = { PDE_ID: item.PDE_ID };
        await pmcStore.DongDemand(data)
        await pro_getDemands();
      }
};
const handShowForecast = (id: any) => {
      let src = "";
      src = "/pmc/ShowSumForecast?id=" + id + '&Forecast=true';
      window.open(
        src,
        "newWin",
        "fullscreen=yes, scrollbars=auto, titlebar=no"
      );
};
const getDataChar = () => {
      //this.isShowChar=false
      let data = {
        labels: ["Chưa SX", "Đang SX", "Sản phẩm SX", "Số đang SX"],
        datasets: [
          {
            //label: ['C.KHSX', 'C.SX','Tháng','Trước'],
            data: [
              dataChartDM_Month.value.tong - dataChartDM_Month.value.So_SX,
              dataChartDM_Month.value.So_SX - dataChartDM_Month.value.DA_SX,
              dataChartDM_Month.value.Pro_QTY,
              dataChartDM_Month.value.DA_SX - dataChartDM_Month.value.Pro_QTY,
            ],
            backgroundColor: ["#696969", "#FFFF00", "#00AA00", "#0000CC"],
            hoverOffset: 4,
          },
          // {
          // labels: [50],
          // data: [50],
          // backgroundColor: [],
          // hoverOffset: 4}
        ],
      };
      return data;
};
const handgetDataChartDM_Month = async () => {
      let data = {
        month: month_Chart.value,
      };
      const res = await pmcStore.getDataChartDM_Month(data);
      dataChartDM_Month.value = res.dataChartDM_Month;
      dataChartDM.value = getDataChar();
      dataChartDM_Month.value = res.dataChartDM_Month;
      dataChartDM.value = getDataChar();
        //this.getDataChar()
};

const handTinhNguyenLieu = () => {
      let src = "";
      src =
        "/pmc/CountCalculationMaterial?projec=" +
        projCode.value +
        "&Start=" +
        valueNgayDau.value +
        "&qty=" +
        ValueQty.value;
      window.open(src, "", "fullscreen=yes, scrollbars=auto, titlebar=no");
};
const SelectProject = (valueSelect: any) => {
      //console.log(valueSelect, this.PROJ_OBJECT);
      PROJ_OBJECT.value = valueSelect;
      //this.projCode = valueSelect.id;
};
const handSaveDemands = async () => {
        let data = {
          PDE_ID: PDE_ID.value,
          projCode: projCode.value,
          valueSO: valueSO.value,
          valuePO: valuePO.value,
          ValueQty: ValueQty.value,
          valueNgayDau: valueNgayDau.value,
          valueNgayCuoi: valueNgayCuoi.value,
          valueMota: valueMota.value,
          Unit: Unit.value,
          CUS_NUMBER: customer.value.id,
          TYPE_DEMAND: TYPE_DEMAND.value,
        };
        //console.log(data);
        const res = await pmcStore.saveDemands(data);
        if (res.ok) {
          pro_getDemands();
          pro_getDemands_forecast();
        }
};
const pro_getDemands_forecast = async () => {
      const res = await pmcStore.getDemands_forecast(null);
      dataDemands_forecast.value = res.dataDemands_forecast;
};
const pro_getDemands =  async () => {
      const res = await pmcStore.getDemands();
      dataDemands.value = res.dataDemands;
};
const pro_getDemands_Year = async () => {
      let data = {
        Year_Demand: Year_Demand.value,
      };
      const res = await pmcStore.getDataDemands_Year(data);
      dataDemands_Year.value = res.dataDemands_Year;
};
const handHuyDemands =  async (id: any) => {
      //console.log(id);
      if(confirm('Bạn có muốn xóa nhu cầu này không')==true){
        await pmcStore.HuyDemands({ id: id });
        pro_getDemands();
        pro_getDemands_forecast();
      }
};
const handFormDemandsDTL = (id: any, PO_CODE: any) => {
      let src = "";
      src = "/pmc/DemandsDTL?id=" + id + "&PO_CODE=" + PO_CODE;
      window.open(src, "", "fullscreen=yes, scrollbars=auto, titlebar=no");
};
const Pro_GetDataDemandType = async () => {
      const res = await pmcStore.getDataDemandType(null);
      dataDemandType.value=res.dataDemandType;
};

onMounted(async () => {
    pro_getDemands();
    const res= await masterDataStore.getUnit()
    dataUnits.value = res.dataUnits;
      //console.log(dataUnits.value);

    let data = {
      month: month_Chart.value,
    };
    // this.getDataChartDM_Month(data).then((res) => {
    //   this.dataChartDM_Month = res.dataChartDM_Month;
    //   this.dataChartDM = this.getDataChar("QL nhu cầu");
    //   //this.getDataChar()
    // });
    pro_getDemands_Year();
    pro_getDemands_tamdung();
    Pro_GetDataDemandType();

    pro_getDemands_forecast();
});
  // mounted(){
  //     this.dataChartDM=this.getDataChar('QL nhu cầu')
  //     console.log(this.dataChartDM_Month);
  // }

</script>

<style scoped>
.demands-page {
  padding: 20px;
  background: linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%);
  min-height: 100%;
}

.hero-card {
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  border-radius: 22px;
  padding: 8px 28px;
  color: #fff;
  box-shadow: 0 16px 38px rgba(37, 99, 235, 0.22);
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.eyebrow {
  margin-bottom: 3px;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.8;
}

.hero-subtitle {
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
  max-width: 680px;
}

.hero-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.pill-chip,
.status-badge,
.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 600;
}

.pill-chip {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}

.content-grid {
  display: grid;
  grid-template-columns: 310px minmax(0, 1fr);
  gap: 8px;
  margin-top: 8px;
}

.chart-card,
.form-card,
.section-card {
  background: #fff;
  border: 1px solid #e5ebff;
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
}

.chart-card,
.form-card {
  padding: 6px;
}

.card-head,
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.card-head h6,
.section-head h6 {
  margin: 0;
  font-weight: 700;
  color: #0f172a;
}

.card-head small,
.section-head small {
  color: #64748b;
}

.status-badge {
  background: #e0f2fe;
  color: #0369a1;
}

.section-badge {
  background: #ecfdf3;
  color: #047857;
}

.month-picker input,
.form-control {
  border: 1px solid #dbe4ff;
  border-radius: 10px;
  box-shadow: none;
}

.month-picker input:focus,
.form-control:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.chart-body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 230px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-group.full {
  grid-column: 1 / -1;
}

.field-group label,
.textarea-block label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

.textarea-block {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.action-row {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border: none;
}

.btn-outline-primary {
  border-color: #93c5fd;
  color: #2563eb;
}

.btn-outline-primary:hover {
  background: #eff6ff;
  color: #1d4ed8;
}

.section-card {
  margin-top: 8px;
  padding: 12px;
}

.demand-table {
  width: 100%;
  border-radius: 14px;
  border: 1px solid #e5ebff;
  --el-table-header-bg-color: #f8fbff;
  --el-table-header-text-color: #334155;
  --el-table-row-hover-bg-color: #f1f6ff;
  font-size: 13px;
}

.demand-table :deep(th.el-table__cell .cell) {
  white-space: nowrap;
  font-size: 12px;
}

/* Cho màu nền dòng (mauNen*) hiển thị xuyên qua các ô của el-table */
.demand-table :deep(tr[class*="mauNen"] > td.el-table__cell) {
  background-color: transparent;
  color: inherit;
}

.demand-table :deep(tr.mauNenXanh > td.el-table__cell) {
  background-color: #009933;
}

.demand-table :deep(tr.mauNenCam > td.el-table__cell) {
  background-color: #f89734;
}

.demand-table :deep(tr.mauNenDo > td.el-table__cell) {
  background-color: #f50707;
  color: #fff;
}

.link-cell {
  color: #2563eb;
  cursor: pointer;
  text-decoration: underline;
}

.table-pagination {
  margin: 8px 0;
  justify-content: flex-end;
}

.year-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.field-group :deep(.el-select),
.field-group :deep(.el-date-editor) {
  width: 100%;
}

@media (max-width: 992px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .hero-content {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .action-row {
    justify-content: stretch;
  }

  .action-row button {
    width: 100%;
  }
}
</style>