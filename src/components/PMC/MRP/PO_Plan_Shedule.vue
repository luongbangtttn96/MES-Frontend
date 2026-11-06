<template>
  <div class="po-schedule-container">
    <title-page :titlepage="'Lịch mua hàng cho sản phẩm theo tháng'" />

    <div class="controls-section">
      <div class="month-selector">
        <label for="month-input">Tháng:</label>
        <input 
          id="month-input"
          type="month" 
          v-model="v_StartDate"
          class="month-input"
        />
      </div>
    </div>

    <el-tabs v-model="activeTab" class="schedule-tabs">
      <el-tab-pane label="📊 Biểu đồ đặt mua NL" name="chart">          
        <div class="chart-container">
          <div class="table-wrapper">
            <table class="schedule-table">
              <thead>
                <tr>
                  <th class="col-id">ID</th>
                  <th class="col-name">Dự Án</th>
                  <th v-for="(item, index) in days" :key="item" class="col-day">
                    {{
                      index == 0 || index == days.length - 1
                        ? "..."
                        : item.substring(0, 2)
                    }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in dataPO_Plan_shedule"
                  :key="index"
                  class="schedule-row"
                >
                  <td class="col-id">{{ index + 1 }}</td>
                  <td class="col-name" :title="item.PROJ_NAME">{{ item.PROJ_NAME }}</td>
                  <td
                    v-for="i_date in days"
                    :key="i_date"
                    class=""
                    :title="item[i_date]"
                  >
                    <div
                      v-if="item[i_date]"
                      :class="['bar-item', mau(item.STATUS)]"
                      role="progressbar"
                      :style="'width:' + 40.5 * (item[i_date]>30 ? 30 : item[i_date]) + 'px'"
                    >
                      {{ item[i_date] }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="📋 Chi tiết" name="detail">
        <div class="detail-controls">
          <div class="search-group">
            <label for="customer-select">Khách Hàng:</label>
            <Controls_customer v-model="customer" class="customer-control" />
            <button class="btn-search" @click="handgetMaterialOpenPO()" title="Tìm kiếm">
              🔍
            </button>
          </div>
          <button class="btn-export" @click="handExportExel()">
            📥 Xuất Excel
          </button>
        </div>

        <div class="detail-table-wrapper">
          <table class="detail-table" id="exportable_MaterialOpenPO">
            <thead>
              <tr>
                <th>STT</th>
                <th>Open PO</th>
                <th>Nhà CC</th>
                <th>PART NUM</th>
                <th>Ngày Đặt Mua</th>
                <th>D/K ngày Nhận</th>
                <th>Số đặt</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataMaterialOpenPO" :key="index" class="detail-row">
                <td>{{ index + 1 }}</td>
                <td class="highlight-po">{{ item.OPEN_PO_CODE }}</td>
                <td>{{ item.SUPPLIERS_NAME }}</td>
                <td class="part-num">{{ item.PART_NUM }}</td>
                <td class="date-cell">{{ item.SIGNED_DATE }}</td>
                <td class="date-cell">{{ item.EXP_RECEIVED_DATE }}</td>
                <td class="qty-cell">{{ item.QTY }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref, watch, onMounted } from "vue";

import { usePOStore } from "@/stores/po.store";

import TitlePage from "@/components/controls/TitlePage.vue";
import Controls_customer from '@/components/controls/customer/controls_customer.vue';
import { exportData } from "@/plugins/Excel";

const poStore = usePOStore();

  const dataPO_Plan_shedule = ref<Record<string, any>[]>([]);
  const v_StartDate = ref(dayjs().format("YYYY-MM"));
  const days = ref<string[]>([]);
  const activeTab = ref("chart");
  const customer = ref<Record<string, any>>({});
  const dataMaterialOpenPO = ref<Record<string, any>[]>([]);

  watch(v_StartDate, () => {
    setLabelDay();
  });

  const mau = (value: number) => {
    switch (value) {
      case 1:
        return "bar-success";
      default:
        return "bar-default";
    }
  };

  const handExportExel = () => {
    exportData("Xlsx", "exportable_MaterialOpenPO");
  };

  const handgetMaterialOpenPO = () => {
    let data = customer.value;      
    poStore.getMaterialOpenPO(data).then((res: any) => {
      dataMaterialOpenPO.value = res.dataMaterialOpenPO
    })
  };

  const setLabelDay = () => {
    let i_Days = dayjs(v_StartDate.value, "YYYY-MM").subtract(1, "days");
    let endMonth = dayjs(v_StartDate.value, "YYYY-MM")
      .endOf("month")
      .add(1, "days");

    days.value = [];
    while (i_Days <= endMonth) {
      days.value.push(i_Days.format("DD-MM-YYYY"));
      i_Days = i_Days.add(1, "days");
    }
    Pro_getPO_Plan_shedule();
  };

  const Pro_getPO_Plan_shedule = async () => {
    let data = {
      month: v_StartDate.value,
    };
    const res = await poStore.getPO_Plan_shedule(data)
    dataPO_Plan_shedule.value = res.dataPO_Plan_shedule;
  };

  onMounted(() => {
    setLabelDay();
  });

</script>
  
<style scoped>
  .po-schedule-container {
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
}

  /* ===== CONTROLS SECTION ===== */
  .controls-section {
    background: white;
    padding: 16px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .month-selector {
    display: flex;
    align-items: center;
    gap: 12px;
}

  .month-selector label {
    font-weight: 600;
    color: #333;
    min-width: 60px;
  }

  .month-input {
    padding: 8px 12px;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.3s ease;
    background: #fafafa;
  }

  .month-input:hover {
    border-color: #409eff;
    background: white;
  }

  .month-input:focus {
    outline: none;
    border-color: #409eff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
  }

  /* ===== TABS ===== */
  .schedule-tabs {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  :deep(.el-tabs__header) {
    background: linear-gradient(90deg, #409eff 0%, #85ce61 100%);
    padding: 0;
    border: none;
  }

  :deep(.el-tabs__nav-wrap) {
    background: transparent;
  }

  :deep(.el-tabs__item) {
    color: white;
    font-weight: 500;
    padding: 12px 24px;
    transition: all 0.3s ease;
  }

  :deep(.el-tabs__item:hover) {
    background: rgba(255, 255, 255, 0.15);
  }

  :deep(.el-tabs__item.is-active) {
    background: rgba(255, 255, 255, 0.25);
    border: none;
  }

  :deep(.el-tabs__active-bar) {
    background: white;
    height: 3px;
  }

  :deep(.el-tabs__content) {
    padding: 0;
  }

  :deep(.el-tab-pane) {
    padding: 20px;
  }

  /* ===== CHART TAB ===== */
  .chart-container {
    padding: 0;
  }

  .table-wrapper {
    overflow-x: auto;
    overflow-y: auto;
    max-height: calc(100vh - 280px);
    border-radius: 4px;
    border: 1px solid #e0e0e0;
  }

  .schedule-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    font-size: 13px;
  }

  .schedule-table thead {
    position: sticky;
    top: 0;
    z-index: 10;
    background: linear-gradient(180deg, #f0f9ff 0%, #e6f7ff 100%);
  }

  .schedule-table th {
    padding: 4px 6px;
    text-align: center;
    font-weight: 600;
    color: #0066cc;
    border-right: 1px solid #e0e0e0;
    border-bottom: 2px solid #0066cc;
    min-width: 50px;
    height: 28px;
  }

  .schedule-table th.col-id {
    width: 70px;
    position: sticky;
    left: 0;
    background: linear-gradient(180deg, #f5f7fa 0%, #e8ecf1 100%);
    z-index: 11;
  }

  .schedule-table th.col-name {
    width: 200px;
    text-align: left;
    position: sticky;
    left: 50px;
    background: linear-gradient(180deg, #f5f7fa 0%, #e8ecf1 100%);
    z-index: 11;
  }

  .schedule-table th.col-day {
    width: 50px;
    padding: 8px 2px;
  }

  .schedule-table tbody tr {
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.2s ease;
    height: 24px;
  }

  .schedule-table tbody tr:hover {
    background-color: #f0f9ff;
  }

  .schedule-table tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  .schedule-table tbody tr:nth-child(even):hover {
    background-color: #e6f7ff;
  }

  .schedule-table td {
    padding: 2px 6px;
    border-right: 1px solid #f0f0f0;
    position: relative;
    text-align: center;
    height: 20px;
    line-height: 1;
    vertical-align: middle;
  }

  .schedule-table td.col-id {
    width: 70px;
    position: sticky;
    left: 0;
    background: inherit;
    z-index: 9;
    font-weight: 500;
    color: #0066cc;
  }

  .schedule-table td.col-name {
    width: 200px;
    text-align: left;
    position: sticky;
    left: 50px;
    background: inherit;
    z-index: 9;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
    font-weight: 500;
  }

  .schedule-table td.col-day {
    width: 50px;
    padding: 1px 2px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bar-item {
    position: relative;
    padding: 1px 2px;
    border-radius: 2px;
    color: white;
    font-size: 10px;
    font-weight: 600;
    white-space: nowrap;
    /* display: flex; */
    align-items: center;
    justify-content: center;
    height: 14px;
    min-width: 18px;
    line-height: 1;
  }

  .bar-success {
    background: linear-gradient(135deg, #85ce61 0%, #67c23a 100%);
    box-shadow: 0 2px 6px rgba(103, 194, 58, 0.3);
    border: 1px solid #67c23a;
  }

  .bar-default {
    background: linear-gradient(135deg, #909399 0%, #606266 100%);
    box-shadow: 0 2px 6px rgba(96, 98, 102, 0.3);
    border: 1px solid #606266;
  }

  .bar-item:hover {
    transform: scale(1.1);
    filter: brightness(1.1);
  }

  /* ===== DETAIL TAB ===== */
  .detail-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    padding: 16px;
    background: #f5f7fa;
    border-radius: 4px;
    flex-wrap: wrap;
  }

  .search-group {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 300px;
  }

  .search-group label {
    font-weight: 600;
    color: #333;
    white-space: nowrap;
  }

  .customer-control {
    flex: 1;
    min-width: 200px;
  }

  .btn-search,
  .btn-export {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .btn-search {
    background: #409eff;
    color: white;
    min-width: 44px;
  }

  .btn-search:hover {
    background: #66b1ff;
    box-shadow: 0 2px 12px rgba(64, 158, 255, 0.3);
  }

  .btn-export {
    background: linear-gradient(135deg, #85ce61 0%, #67c23a 100%);
    color: white;
    min-width: 120px;
  }

  .btn-export:hover {
    background: linear-gradient(135deg, #95de64 0%, #73d13d 100%);
    box-shadow: 0 2px 12px rgba(103, 194, 58, 0.3);
  }

  .detail-table-wrapper {
    overflow-x: auto;
    overflow-y: auto;
    max-height: calc(100vh - 300px);
    border-radius: 4px;
    border: 1px solid #e0e0e0;
  }

  .detail-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    font-size: 13px;
  }

  .detail-table thead {
    position: sticky;
    top: 0;
    z-index: 10;
    background: linear-gradient(180deg, #f0f9ff 0%, #e6f7ff 100%);
  }

  .detail-table th {
    padding: 6px 10px;
    text-align: left;
    font-weight: 600;
    color: #0066cc;
    border-right: 1px solid #e0e0e0;
    border-bottom: 2px solid #0066cc;
    height: 28px;
  }

  .detail-table tbody tr {
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.2s ease;
    height: 28px;
  }

  .detail-table tbody tr:hover {
    background-color: #f0f9ff;
  }

  .detail-table tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  .detail-table tbody tr:nth-child(even):hover {
    background-color: #e6f7ff;
  }

  .detail-table td {
    padding: 4px 10px;
    border-right: 1px solid #f0f0f0;
    color: #333;
    height: 28px;
    line-height: 1.3;
    vertical-align: middle;
  }

  .detail-table td.highlight-po {
    font-weight: 600;
    color: #0066cc;
    background: rgba(0, 102, 204, 0.05);
  }

  .detail-table td.part-num {
    font-weight: 500;
    color: #555;
    font-family: 'Courier New', monospace;
    background: #f5f5f5;
  }

  .detail-table td.date-cell {
    color: #666;
    white-space: nowrap;
  }

  .detail-table td.qty-cell {
    font-weight: 600;
    color: #f56c6c;
    text-align: center;
    background: rgba(245, 108, 108, 0.05);
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    .po-schedule-container {
      padding: 12px;
    }

    .detail-controls {
      flex-direction: column;
      align-items: stretch;
    }

    .search-group {
      flex-direction: column;
    }

    .btn-search,
    .btn-export {
      width: 100%;
    }

    .schedule-table th.col-name,
    .schedule-table td.col-name {
      width: 100px;
    }
  }
  </style>