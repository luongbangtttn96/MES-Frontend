<template>
  <div v-loading="Show_busy" :element-loading-text="textMasage">
    <div class="toolbar">
      <el-input
        v-model="search_Forecast"
        placeholder="Tìm Project / Mã"
        clearable
        style="width: 320px"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-upload
        :auto-upload="false"
        :show-file-list="false"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :on-change="exportDataForecast"
      >
        <el-button type="primary" plain>Chọn file</el-button>
      </el-upload>
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        class="sum-pagination"
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="[50, 100, 200]"
        :total="filtered.length"
      />
    </div>

    <el-table
      :data="rows"
      border
      stripe
      height="75vh"
      size="small"
      :row-key="(row: Record<string, any>) => row.PROJ_CODE + row.PART_NUM"
    >
      <el-table-column
        label="Stt"
        type="index"
        :index="(i: number) => (page - 1) * pageSize + i + 1"
        width="60"
        align="center"
        fixed
      />
      <el-table-column prop="PROJ_CODE" label="Project" min-width="220" fixed />
      <el-table-column prop="PART_NUM" label="Mã" width="140" show-overflow-tooltip />
      <el-table-column
        v-for="col in data_colum"
        :key="col"
        :prop="col"
        width="110"
        align="center"
      >
        <template #header>
          <div>{{ col }}</div>
          <div class="week-label">{{ Pro_Tuan(col, "DD/MM/YYYY") }}</div>
        </template>
        <template #default="{ row }">
          <span
            :class="row[col] ? mauCell(col, 0, row.PART_NUM) : ''"
            class="cell-link"
            @dblclick="handSlect_cel_Deman(row.PROJ_CODE)"
          >
            {{ row[col] || 0 }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, watch, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { usePMCStore } from "@/stores/PMC.store";
import { Pro_Tuan as get_tuan } from "@/helpers/functions";

const pmcStore = usePMCStore();
const Show_busy = ref(false);
const textMasage = ref("Loading...");
const search_Forecast = ref("");
const data_colum = ref<string[]>([]);
const dataSum_PlanSOMForecast_now = shallowRef<Record<string, any>[]>([]);

const page = ref(1);
const pageSize = ref(50);

const filtered = computed(() => {
  const kw = search_Forecast.value.trim().toLowerCase();
  if (!kw) return dataSum_PlanSOMForecast_now.value;
  return dataSum_PlanSOMForecast_now.value.filter(
    (r) =>
      String(r.PROJ_CODE ?? "").toLowerCase().includes(kw) ||
      String(r.PART_NUM ?? "").toLowerCase().includes(kw)
  );
});

const rows = computed(() =>
  filtered.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
);

watch([() => filtered.value.length, pageSize], () => {
  page.value = 1;
});

const exportDataForecast = () => {};
const Pro_Tuan = (date: string, fomat: string) => get_tuan(date, fomat);
const mauCell = (_date: string, _row: number, _PART_NUM: string) => "mauNenXam";

const pro_getSum_PlanSOMForecast_now = () => {
  Show_busy.value = true;
  pmcStore
    .getSum_PlanSOMForecast_now(null)
    .then((res: any) => {
      dataSum_PlanSOMForecast_now.value = res.dataSum_PlanSOMForecast_now;
      if (dataSum_PlanSOMForecast_now.value.length) {
        const [, , ...Colums] = Object.keys(dataSum_PlanSOMForecast_now.value[0]);
        data_colum.value = Colums;
      }
    })
    .catch((err: unknown) => {
      console.error("Error fetching forecast data:", err);
    })
    .finally(() => {
      Show_busy.value = false;
    });
};

const handSlect_cel_Deman = (PROJ_CODE: string) => {
  console.log("Selected cell for project:", PROJ_CODE);
};

onMounted(() => {
  pro_getSum_PlanSOMForecast_now();
});
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.sum-pagination {
  margin-left: auto;
}
.week-label {
  font-weight: normal;
  font-size: 12px;
  color: #909399;
}
.mauNenXam {
  display: block;
  background: #f2f3f5;
}
</style>
