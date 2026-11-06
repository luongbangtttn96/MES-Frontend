<template>
  <div class="demand-container">
    <el-tabs v-model="activeTabIndex" nav-class="modern-tabs">
      <el-tab-pane label="SO" :name="0">
        <!-- Summary Cards Section -->
        <div class="summary-section">
          <el-row :gutter="23">
            <el-col :xs="12" :sm="8" :md="6" :lg="6">
              <div class="summary-card total-card">
                <div class="card-icon">
                  <el-icon scale="2"><Finished /></el-icon>
                </div>
                <div class="card-content">
                  <p class="card-label">Tổng Nhu Cầu</p>
                  <h3 class="card-value">{{ dem_sum_PDE }}</h3>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6">
              <div class="summary-card complete-card">
                <div class="card-icon">
                  <el-icon scale="2"><CircleCheck /></el-icon>
                  <!-- <el-icon icon="check-circle" scale="2"></el-icon> -->
                </div>
                <div class="card-content">
                  <p class="card-label">Hoàn Thành</p>
                  <h3 class="card-value">{{ num_complate_PDE }}</h3>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6">
              <div class="summary-card late-card">
                <div class="card-icon">
                  <el-icon scale="2"><Bicycle /></el-icon>
                  <!-- <el-icon icon="exclamation-circle" scale="2"></el-icon> -->
                </div>
                <div class="card-content">
                  <p class="card-label">Muộn Giao Hàng</p>
                  <h3 class="card-value">{{ num_late_PDE }}</h3>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6">
              <div class="summary-card wo-card">
                <div class="card-icon">
                  <el-icon><Setting /></el-icon>
                  <!-- <el-icon icon="gear" scale="2"></el-icon> -->
                </div>
                <div class="card-content">
                  <p class="card-label">Có Work Order</p>
                  <h3 class="card-value">{{ Num_wo_PDE }}</h3>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- Legend Section -->
        <chi-thi-mau :list_ChiThiMau="list_ChiThiMau"/>

        <!-- Search and Export Section -->
        <div class="controls-section">
          <div class="search-wrapper">
            <el-input 
              type="text" 
              class="search-input"  
              placeholder="Tìm kiếm dự án hoặc mã linh kiện..."
              v-model="search_PDE"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </div>
          <button class="btn-export" @click="handSOM_ExportExcel()">
            <el-icon><Download /></el-icon>
            Xuất Excel
          </button>
        </div>
        <!-- Table Section -->
        <div class="table-section">
          <div class="table-header">
            <h5 class="table-title">
              <el-icon><List /></el-icon>
              Bảng nhu cầu SO theo tuần
            </h5>
            <span class="record-count">{{ Showdata_SOM_days.length }} bản ghi</span>
          </div>

          <el-table 
            :data="Showdata_SOM_days" 
            id="tab_export_SOMdays"
            stripe
            style="width: 100%; height: calc(100vh - 280px)"
            :default-sort="{ prop: 'PROJ_CODE', order: 'ascending' }"
            :row-class-name="tableRowClassName"
            class="som-table"
            size="small"
            virtual-scroll
            :virtual-scroll-size="50"
          >
            <!-- STT Column -->
            <el-table-column 
              type="index" 
              label="STT" 
              width="50"
              fixed="left"
            />
            
            <!-- Project Column -->
            <el-table-column 
              prop="PROJ_CODE" 
              label="Project" 
              width="120"
              fixed="left"
              show-overflow-tooltip
            />
            
            <!-- Part Number Column -->
            <el-table-column 
              prop="PART_NUM" 
              label="Part Num" 
              width="120"
              fixed="left"
              show-overflow-tooltip
            />
            
            <!-- Dynamic Date Columns -->
            <el-table-column 
              v-for="(col) in Colums" 
              :key="col"
              :label="formatDate(col)"
              width="60"
              align="center"
              class-name="cell-center"
            >
              <template #header>
                <div class="column-header" @click="handselect_col(col)">
                  <span class="week">W{{ Pro_Tuan(col) }}</span>
                  <span class="date">{{ formatDate(col) }}</span>
                </div>
              </template>
              <template #default="{ row }">
                <div 
                  :class="['cell-value', row[col] ? mauCell(col, Showdata_SOM_days.indexOf(row), row.PART_NUM) : '']"
                  @dblclick="handSlect_cel_Deman(row.PROJ_CODE)"
                >
                  {{ row[col] || 0 }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Chi tiết SO" :name="1">
        <!-- Search and Export Section -->
        <div class="controls-section">
          <div class="search-wrapper">
            <el-input 
              type="text" 
              placeholder="Tìm kiếm..."
              v-model="search"
              clearable
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </div>
          <button class="btn-export" @click="handExcel_DTP_SOM('tab_ChiTiet_SOM')">
            <el-icon><Download /></el-icon>
            Xuất Excel
          </button>
        </div>
      
        <!-- Detail Table Section -->
        <div class="table-section">
          <div class="table-header">
            <h5 class="table-title">
              <el-icon><DocumentCopy /></el-icon>
              Chi Tiết Nhu Cầu SOM
            </h5>
            <span class="record-count">{{ showdataDemandDTL.length }} bản ghi</span>
          </div>

          <el-table 
            :data="showdataDemandDTL"
            id="tab_ChiTiet_SOM"
            stripe
            style="width: 100%; height: calc(100vh - 280px)"
            :row-class-name="tableDetailRowClassName"
            @row-click="handSelectDemand"
            class="detail-table"
            size="small"
            virtual-scroll
            :virtual-scroll-size="50"
          >
            <!-- STT -->
            <el-table-column 
              type="index" 
              label="STT" 
              width="50"
              fixed="left"
            />
            
            <!-- Sticky Columns -->
            <el-table-column 
              prop="PDD_ID" 
              label="ID" 
              width="80"
              fixed="left"
            />
            <el-table-column 
              prop="PDE_ID" 
              label="SOM ID" 
              width="80"
              fixed="left"
            />
            <el-table-column 
              prop="CUS_NAME" 
              label="Khách hàng" 
              width="100"
              show-overflow-tooltip
            />
            <el-table-column 
              prop="PROJ_CODE" 
              label="Dự Án" 
              width="100"
              show-overflow-tooltip
            />
            
            <!-- Group: Nhu cầu -->
            <el-table-column label="Nhu cầu" align="center">
              <el-table-column 
                prop="NUM_WO" 
                label="Lệnh SX" 
                width="80"
              />
              <el-table-column 
                prop="QTY" 
                label="Số Y/C" 
                width="70"
              />
              <el-table-column 
                prop="QTY_DELIVERY" 
                label="Số Giao" 
                width="70"
              />
              <el-table-column 
                prop="UNIT_NAME" 
                label="Đơn Vị" 
                width="60"
              />
              <el-table-column 
                prop="PO_CODE" 
                label="Mã PO" 
                width="100"
                show-overflow-tooltip
              />
              <el-table-column 
                prop="SALESODER_CODE" 
                label="Mã SO" 
                width="120"
                show-overflow-tooltip
              />
              <el-table-column 
                prop="START_DEMANDS" 
                label="Từ ngày" 
                width="100"
              />
              <el-table-column 
                prop="END_DEMANDS" 
                label="Đến Ngày" 
                width="100"
              />
            </el-table-column>
            
            <!-- Group: Sản Xuất -->
            <el-table-column label="Sản Xuất" align="center">
              <el-table-column 
                prop="START_PRODUCT" 
                label="Từ ngày" 
                width="100"
              />
              <el-table-column 
                prop="END_PRODUCT" 
                label="Đến Ngày" 
                width="100"
              />
              <el-table-column 
                prop="QTY_DKSX" 
                label="DK SX" 
                width="70"
              />
              <el-table-column 
                prop="PRODUCTION" 
                label="Đã SX" 
                width="70"
              />
            </el-table-column>
            
            <!-- Status & Notes -->
            <el-table-column 
              prop="STATUS" 
              label="Trạng thái" 
              width="100"
              show-overflow-tooltip
            >
              <template #default="{ row }">
                <el-tag 
                  :type="getStatusType(row.STATUS)"
                  effect="light"
                >
                  {{ row.STATUS }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column 
              prop="NOTE" 
              label="Ghi chú" 
              width="150"
              show-overflow-tooltip
            />
          </el-table>

          <base-dialog
            :active.sync="ShowFormDeNghixuats"
            :tile="'Đề nghị xuất hàng'"
          >
            <de-nghi-xuat-hang :PDD_ID="PDD_ID" />
          </base-dialog>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref, computed, onMounted } from "vue";
import { usePMCStore } from "@/stores/PMC.store";
import { Finished, CircleCheck, Bicycle, Setting, List, Search, Download } from '@element-plus/icons-vue';

import { exportData } from "@/plugins/Excel";
import CharPie from "@/components/Chart/CharPie.vue";
import BaseDialog from "@/components/controls/BaseDialog.vue";
import DeNghiXuatHang from "@/components/PMC/Demands/DeNghiXuatHang.vue";
import ChiThiMau from '@/components/controls/ChiThiMau.vue';

const pmcStore = usePMCStore()

const Num_wo_PDE = ref(0)
const num_late_PDE = ref(0)
const dem_sum_PDE = ref(0)
const num_complate_PDE = ref(0)
const search_PDE = ref("")
      
const v_month = ref(dayjs().format("YYYY-MM"))
const dataDemandsDTLs_SanXuat = ref<(Record<string, any>[])>([])
const CurenDemand = ref<(Record<string, any> | null)>(null)
const dataChartDM = ref({})

const DaGiao_DungHan = ref(0)
const DaGiao_TreHan = ref(0)
const ChuaGiao_TrongHan = ref(0)
const ChuaGiao_QuaHan = ref(0)

const ShowFormDeNghixuats = ref(false)
const PDD_ID = ref<(number)>(0)
const search = ref("")

const data_SOM_days = ref<(Record<string, any>[])>([])
const N_Chage = ref([])
const Colums = ref<(string[])>([])

const infoStatus = ref<({ [key: string]: { [key: string]: any } })>({})
const list_ChiThiMau = ref([
    { text: "Đã giao hàng", color: "#009933"  },          
    { text: "Muộn giao hàng", color: "#f50707"  },   
    { text: "Muộn sản xuất", color: "#f89734"  }, 
    { text: "Có thay đổi SOM", color: "#ffff00" },         
])

const activeTabIndex = ref(0)
const cachedColumns = ref<string[]>([])

//  computed: {
const Showdata_SOM_days = computed(() => {
      const searchUpper = search_PDE.value.toUpperCase()
      return data_SOM_days.value.filter((element) => {
        return (
          element.PROJ_CODE.toUpperCase().includes(searchUpper) ||
          (element.PART_NUM && element.PART_NUM.toUpperCase().includes(searchUpper)) 
        );
      });
    })
const showdataDemandDTL = computed(() => {
      const searchUpper = search.value.toUpperCase()
      return dataDemandsDTLs_SanXuat.value.filter((element) => {
        return ( element.PROJ_CODE && (
          element.PROJ_CODE.toUpperCase().includes(searchUpper) ||
          (element.PO_CODE && element.PO_CODE.toUpperCase().includes(searchUpper)) ||
          (element.CUS_NAME && element.CUS_NAME.toUpperCase().includes(searchUpper)) ||
          (element.SALESODER_CODE && element.SALESODER_CODE.toUpperCase().includes(searchUpper)) ||
          element.PDE_ID == search.value )
        );
      });
      return dataDemandsDTLs_SanXuat.value
    })


//  methods: {

const formatDate = (date: string) => {
      return dayjs(date,"DD/MM/YYYY").format('DD/MM/YYYY');
}
const Pro_Tuan = (date: string) => {
      return dayjs(date,"DD/MM/YYYY").isoWeek();
    }
const handselect_col = (date: string) => {
      date=date
        // sắp xếp lại bảng có số lượng dảm dần theo ngày chọn
        data_SOM_days.value.sort((a,b)=>{return b[date]-a[date]})

    }
const getDataChar = () => {
      //this.isShowChar=false
      let data = {
        labels: [
          "Đã giao",
          "Chưa giao",
          "Giao Đúng Hạn",
          "Giao Trễ Hạn",
          "Chưa giao trong hạn",
          "Chưa giao trễ hạn",
        ],
        datasets: [
          {
            label: [],
            data: [
              0,
              0,
              DaGiao_DungHan.value,
              DaGiao_TreHan.value,
              ChuaGiao_TrongHan.value,
              ChuaGiao_QuaHan.value,
            ],
            backgroundColor: [
              "",
              "",
              "#00AA00",
              "#FFFF00",
              "#0000CC",
              "#DD1B16",
            ],
            hoverOffset: 4,
          },
          {
            label: [],
            data: [
              DaGiao_DungHan.value + DaGiao_TreHan.value,
              ChuaGiao_TrongHan.value + ChuaGiao_QuaHan.value,
            ],
            backgroundColor: ["#00D8FF", "#E46651"],
            hoverOffset: 4,
          },
          {
            label: [],
            data: [0],
            backgroundColor: [],
            hoverOffset: 4,
          },
        ],
      };
      return data;
    }
const handSlect_cel_Deman = (PROJ_CODE: string) => {
     search.value=PROJ_CODE
      activeTabIndex.value=1
    }
const handExcel_DTP_SOM = (id_tble: string) => {
      exportData('Xlsx',id_tble)
    }
const handSOM_ExportExcel = () => {
      exportData('Xlsx','tab_export_SOMdays')
    }
const Pro_get_SOM_days = async () => {
      const res = await pmcStore.get_SOM_days(null)
        data_SOM_days.value=res.data_SOM_days
        N_Chage.value=res.N_Chage
        infoStatus.value=setStatusPDM(res.All_status)
        const [PROJ_CODE,PART_NUM,..._Colums] =Object.keys(data_SOM_days.value[0])
        Colums.value=_Colums
        cellColorCache.clear()
        console.log(Colums.value);
      
    }
const setStatusPDM = (All_Status: Record<string, any>[]) => {
      let Num_wo_PDE=0
      let num_late_PDE=0
      let dem_sum_PDE=0
      let num_complate_PDE=0

      let Status: Record<string, Record<string, any>> = {}
      All_Status.forEach(element => {
        dem_sum_PDE=dem_sum_PDE+ element.Num_PDD
        num_late_PDE=num_late_PDE + element.PDD_Late
        Num_wo_PDE=Num_wo_PDE + element.PHD_Late
        num_complate_PDE=num_complate_PDE + element.num_complate_PDE

            // Khởi tạo Status nếu chưa có
        if (!Status[element.PART_NUM]) {
          Status[element.PART_NUM] = {};
        }
        if (!Status[element.PART_NUM][element.WEEK]) {
          Status[element.PART_NUM][element.WEEK] = {};
        }

        Status[element.PART_NUM][element.WEEK]['Num_PDD']=element.Num_PDD
        Status[element.PART_NUM][element.WEEK]['PDD_Late']=element.PDD_Late
        Status[element.PART_NUM][element.WEEK]['PHD_Late']=element.PHD_Late
        Status[element.PART_NUM][element.WEEK]['num_complate_PDE']=element.num_complate_PDE

      });

      return Status
      
      
    }
const cellColorCache = new Map<string, string>()

const mauCell = (date: string, row: number, PART_NUM: string) => {
      const cacheKey = `${date}|${PART_NUM}`
      
      if (cellColorCache.has(cacheKey)) {
        return cellColorCache.get(cacheKey) || 'mauNenXam'
      }

      let color = 'mauNenXam'
      
      if(N_Chage.value[row]?.[date] > 0){
        color = 'mauNenVang'
      } else {
        const dayjsDate = dayjs(date, "DD/MM/YYYY")
        const isoWeekKey = dayjsDate.isoWeek() + '' + dayjsDate.year()
        const partStatus = infoStatus.value[PART_NUM]?.[isoWeekKey]
        
        if(partStatus) {
          if(partStatus.num_complate_PDE > 0){
            color = 'mauNenXanh'
          } else if(partStatus.PHD_Late > 0){
            color = 'mauNenCam'
          } else if(partStatus.PDD_Late > 0){
            color = 'mauNenDo'
          } else if(dayjsDate < dayjs().subtract(7, 'days')){
            color = 'mauNenDo'
          }
        } else if(dayjsDate < dayjs().subtract(7, 'days')){
          color = 'mauNenDo'
        }
      }
      
      cellColorCache.set(cacheKey, color)
      return color
    }
const maurow = (item: any) => {
     if (item.QTY!=item.QTY_CHANGER && item.QTY_CHANGER!=null){
      return 'mauNenVang'
     }
    //  if(this.infoStatus[item.PART_NUM][moment(date,"DD/MM/YYYY").week()]['num_complate_PDE'] && this.infoStatus[item.PART_NUM][moment(date,"DD/MM/YYYY").week()]['num_complate_PDE']>0){
    //     return 'mauNenXanh'
    //   }
      if(item.QTY<=item.QTY_DELIVERY){
          return 'mauNenXanh'
        }
      if(dayjs(item.END_DEMANDS,"YYYY/MM/DD")<dayjs()){
          return 'mauNenDo'
        }
      if( dayjs(item.END_PRODUCT,"YYYY/MM/DD")<dayjs()){
        return 'mauNenCam'
      }
    }

const getStatusBadgeClass = (status: String) => {
      const baseClass = 'status-badge';
      if (!status) return baseClass;
      
      const statusLower = status.toLowerCase();
      if (statusLower.includes('hoàn') || statusLower.includes('xong')) return `${baseClass} badge-success`;
      if (statusLower.includes('trễ') || statusLower.includes('muộn')) return `${baseClass} badge-danger`;
      if (statusLower.includes('chờ') || statusLower.includes('đợi')) return `${baseClass} badge-warning`;
      return `${baseClass} badge-info`;
    }
const tableRowClassName = ({ row }: { row: any }) => {
      return 'data-row';
    }
const tableDetailRowClassName = ({ row }: { row: any }) => {
      return maurow(row) || 'data-row';
    }
const getStatusType = (status: string) => {
      if (!status) return 'info';
      const statusLower = status.toLowerCase();
      if (statusLower.includes('hoàn') || statusLower.includes('xong')) return 'success';
      if (statusLower.includes('trễ') || statusLower.includes('muộn')) return 'danger';
      if (statusLower.includes('chờ') || statusLower.includes('đợi')) return 'warning';
      return 'info';
    }
const handSelectDemand = (item: any) => {
      CurenDemand.value = item;
    }

const ProgetDemandDTLs_SanXuat = async () => {
      const res = await pmcStore.getDemandDTLs_SanXuat(null);
      dataDemandsDTLs_SanXuat.value = res.dataDemandsDTLs_SanXuat;
    }
onMounted( async () => {
    await Pro_get_SOM_days()
    await ProgetDemandDTLs_SanXuat();    
  });
</script>

<style scoped>
/* ========== Main Container ========== */
.demand-container {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

/* ========== Tabs Styling ========== */
.cell {
  padding: 0px;
  width: 30px;
  height: 30px;
  text-align: center;
}

/* ========== Summary Cards ========== */
.summary-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
}

.summary-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  height: 100%;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.summary-card.total-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.summary-card.complete-card {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.summary-card.late-card {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.summary-card.wo-card {
  background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
}

.card-icon {
  font-size: 28px;
  opacity: 0.9;
}

.card-content {
  flex: 1;
}

.card-label {
  font-size: 13px;
  opacity: 0.9;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-value {
  font-size: 32px;
  font-weight: 700;
  margin: 5px 0 0 0;
}

/* ========== Controls Section ========== */
.controls-section {
  background: white;
  padding: 10px;
  border-radius: 12px;
  display: flex;
  gap: 5px;
  align-items: center;
  margin-bottom: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.search-wrapper {
  flex: 1;
  min-width: 250px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #999;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 10px 12px 10px 38px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.btn-export {
  background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.btn-export:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
}

.btn-export:active {
  transform: translateY(0);
}

/* ========== Table Wrapper ========== */
/* .table-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  padding: 20px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.table-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.record-count {
  background: #0066cc;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
} */

/* ========== Table Styles ========== */
.tableFixHead {
  height: 85vh;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  display: block;
}

.tableFixHead thead th {
   position: sticky; 
  top: 0;
  z-index: 10;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* .table {
  margin: 0;
  border-collapse: collapse;
  font-size: 13px;
  table-layout: fixed;
} */

/* .table thead {
  display: table;
  table-layout: fixed;
} */

/* .table tbody {
  display: block;
  max-height: calc(85vh - 120px);
  overflow-y: auto;
} */

/* .table tbody tr {
  /* display: table; */
  /* table-layout: fixed; */
/* } */ 

/* .table th {
  padding: 14px 12px;
  font-weight: 700;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.5px;
  white-space: nowrap;
} */

/* .table th:last-child {
  border-right: none;
} */

.table td {
  padding: 13px 12px;
  border-bottom: 1px solid #e8e8e8;
  border-right: 1px solid #f0f0f0;
  text-align: center;
  word-wrap: break-word;
}

.table td:last-child {
  border-right: none;
}

.table tbody tr {
  transition: all 0.15s ease;
  border-top: 1px solid #f5f5f5;
}

.table tbody tr:hover {
  background-color: #f0f7ff;
  box-shadow: inset 1px 0 0 rgba(0, 102, 204, 0.1);
}

.table tbody tr:nth-child(even) {
  background-color: #fafbfc;
}



/* ========== Detail Table Specific ========== */
.detail-table {
  font-size: 12px;
}

/* .detail-table thead {
  display: table;
  width: 100%;
  table-layout: fixed;
} */

/* .detail-table tbody {
  display: block;
  width: 100%;
  max-height: calc(85vh - 120px);
  overflow-y: auto;
} */

.detail-table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.detail-table th {
  padding: 12px 8px;
  font-weight: 700;
  font-size: 11px;
}

.detail-table td {
  padding: 12px 8px;
  font-size: 12px;
}

.group-header {
  background: rgba(255, 255, 255, 0.2) !important;
  font-weight: 700;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}

.code-badge {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-weight: 500;
}

.date-cell {
  font-size: 12px;
  color: #666;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-success {
  background: #d4edda;
  color: #155724;
}

.badge-danger {
  background: #f8d7da;
  color: #721c24;
}

.badge-warning {
  background: #fff3cd;
  color: #856404;
}

.badge-info {
  background: #d1ecf1;
  color: #0c5460;
}

.badge-secondary {
  background: #e2e3e5;
  color: #383d41;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

/* ========== Responsive Wrapper ========== */
/* .table-responsive-wrapper {
  overflow-x: auto;
} */

/* ========== Animation Classes ========== */


/* ========== Scrollbar Styling ========== */


/* ========== Responsive Design ========== */
@media (max-width: 1200px) {
  .summary-card {
    padding: 15px;
  }

  .card-value {
    font-size: 24px;
  }

  .modern-table {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .demand-container {
    padding: 10px;
  }

  .summary-section {
    padding: 15px;
  }

  .summary-card {
    padding: 12px;
    gap: 10px;
  }

  .card-icon {
    font-size: 20px;
  }

  .card-value {
    font-size: 20px;
  }

  .controls-section {
    flex-direction: column;
    gap: 5px;
  }

  .search-wrapper {
    min-width: 100%;
  }


  .table-header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
  }
}

/* ========== Color Classes for Cell Background ========== */
.mauNenVang {
  background-color: #ffff00 !important;
  color: #333;
  font-weight: 500;
}

.mauNenXanh {
  background-color: #90EE90 !important;
  color: #155724;
  font-weight: 500;
}

.mauNenCam {
  background-color: #FFA500 !important;
  color: #ffffff;
  font-weight: 500;
}

.mauNenDo {
  background-color: #FF6B6B !important;
  color: #ffffff;
  font-weight: 500;
}

.mauNenXam {
  background-color: #D3D3D3 !important;
  color: #555;
}

.cell-value {
  padding: 8px 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
}

.cell-value:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.column-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  padding: 8px 0;
}

.column-header:hover {
  text-decoration: underline;
  opacity: 0.8;
}

.column-header .week {
  font-weight: 700;
  font-size: 12px;
}

.column-header .date {
  font-size: 11px;
  opacity: 0.9;
}

.cell-center {
  text-align: center !important;
}

/* ========== SOM Table Styles ========== */
.som-table {
  --el-table-stripe-background: #f5f5f5;
  --el-table-border-color: #e0e0e0;
  --el-table-header-bg-color: #1e40af;
  --el-table-header-text-color: white;
}

.som-table :deep(.el-table__header-wrapper th) {
  background-color: #1e40af !important;
  color: white !important;
  border-bottom: 2px solid #1e3a8a;
}

.som-table :deep(.el-table__body tr:hover > td) {
  background-color: #f0f7ff !important;
}

/* ========== Detail Table Styles ========== */
.detail-table {
  --el-table-stripe-background: #f5f5f5;
  --el-table-border-color: #e0e0e0;
  --el-table-header-bg-color: #1e40af;
  --el-table-header-text-color: white;
  font-size: 12px;
}

.detail-table :deep(.el-table__header-wrapper th) {
  background-color: #1e40af !important;
  color: white !important;
  border-bottom: 2px solid #1e3a8a;
  padding: 10px 8px !important;
}

.detail-table :deep(.el-table__body tr:hover > td) {
  background-color: #f0f7ff !important;
}

.detail-table :deep(.el-table__body-wrapper) {
  max-height: 70vh;
}

/* ========== Sticky Columns ========== */
.som-table :deep(.el-table__fixed-header-wrapper) {
  background-color: white;
}

.detail-table :deep(.el-table__fixed-header-wrapper) {
  background-color: white;
}

/* ========== Table Section ========== */
.table-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
}

.table-header {
  padding: 20px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.table-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.record-count {
  background: #0066cc;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

/* ========== Print Styles ========== */
@media print {
  .controls-section,
  .table-header {
    display: none;
  }
}
</style>