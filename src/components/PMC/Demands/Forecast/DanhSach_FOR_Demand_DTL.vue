<template>
  <div class="demand-container">
    <el-tabs v-model="activeTabIndex" nav-class="modern-tabs">
      <el-tab-pane label="SO" :name="0">
        <!-- Summary Cards Section -->
        <div class="summary-section">
          <div class="row g-3 summary-grid mb-4">
            <div class="col-12 col-sm-6 col-md-4 col-xl-2 summary-item">
              <div class="summary-card total-card">
                <div class="card-icon">
                  <el-icon icon="list-check" scale="2"></el-icon>
                </div>
                <div class="card-content">
                  <p class="card-label">Tổng Forecast</p>
                  <h3 class="card-value">{{ dem_sum_PDD }}</h3>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-xl-2 summary-item">
              <div class="summary-card late-card">
                <div class="card-icon">
                  <el-icon icon="exclamation-circle" scale="2"></el-icon>
                </div>
                <div class="card-content">
                  <p class="card-label">No Buffer</p>
                  <h3 class="card-value">{{ num_No_Buffer }}</h3>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-xl-2 summary-item">
              <div class="summary-card cancel-window-4-card">
                <div class="card-icon">
                  <el-icon icon="check-circle" scale="2"></el-icon>
                </div>
                <div class="card-content">
                  <p class="card-label">Cancel Window + 4</p>
                  <h3 class="card-value">{{ num_CW_4 }}</h3>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-xl-2 summary-item">
              <div class="summary-card cancel-window-2-card">
                <div class="card-icon">
                  <el-icon icon="check-circle" scale="2"></el-icon>
                </div>
                <div class="card-content">
                  <p class="card-label">Cancel Window + 2</p>
                  <h3 class="card-value">{{ num_CW_2 }}</h3>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-xl-2 summary-item">
              <div class="summary-card cancel-window-1-card">
                <div class="card-icon">
                  <el-icon icon="check-circle" scale="2"></el-icon>
                </div>
                <div class="card-content">
                  <p class="card-label">Cancel Window + 1</p>
                  <h3 class="card-value">{{ num_CW_1 }}</h3>
                </div>
              </div>
            </div>
            
            <div class="col-12 col-sm-6 col-md-4 col-xl-2 summary-item">
              <div class="summary-card cancel-window-card">
                <div class="card-icon">
                  <el-icon icon="gear" scale="2"></el-icon>
                </div>
                <div class="card-content">
                  <p class="card-label">In cancel window</p>
                  <h3 class="card-value">{{ Num_In_CW }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Legend Section -->
        <chi-thi-mau :list_ChiThiMau="list_ChiThiMau"/>

        <!-- Search and Export Section -->
        <div class="controls-section">
          <div class="search-wrapper">
            <el-icon icon="search" class="search-icon"></el-icon>
            <input 
              type="text" 
              class="search-input"  
              placeholder="Tìm kiếm dự án hoặc mã linh kiện..."
              v-model="search_PDE"
            />
          </div>
          <button class="btn-export" @click="handSOM_ExportExcel()">
            <el-icon icon="download"></el-icon>
            Xuất Excel
          </button>
        </div>
        <!-- Table Section -->
        <div class="table-wrapper">
          <div class="table-header">
            <h5 class="table-title">
              <el-icon icon="table"></el-icon>
              Bảng Nhu Cầu SOM Theo Ngày
            </h5>
            <span class="record-count">{{ Showdata_SOM_days.length }} bản ghi</span>
          </div>
        </div>
          <div id="Table_PO" class="tableFixHead">
            <table class="table table-hover" id="tab_export_SOMdays">
              <thead>
                <tr>
                    <th rowspan="2">Stt</th>
                    <th style="min-width: 300px;" rowspan="2">Project</th>
                    <th rowspan="2">Part Num</th>
                    <th v-for="(item) in Colums" :key="item"><div class="cell">{{Pro_Tuan(item)}}</div></th>
                </tr>
                  <tr>                   
                    <th v-for="(item) in Colums" :key="item" @click="handselect_col(item)" class="cell"><div>{{formatDate(item)}}</div></th>
                </tr>
              </thead>
              <tbody ref="tbody">
                  <tr v-for="(item,index) in Showdata_SOM_days" :key="index">
                      <td >{{ index+1 }}</td>
                      <td class="colFix" >{{ item.PROJ_CODE }}</td>
                      <td class="colFix text-truncate">{{ item.PART_NUM }}</td>
                      <td v-for="(cloum) in Colums" :key="cloum" :class="item[cloum]? mauCell(cloum,index,item.PART_NUM ):''" 
                        class="cell"
                        @dblclick="handSlect_cel_Deman(item.PROJ_CODE )" >
                          {{ item[cloum]||0 }}
                      </td>
                  </tr>
              </tbody>
            </table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Chi tiết SO" :name="1">
        <div class="row m-1 justify-content-between">
          <!-- <div>
            <label> Tháng:</label>
            <input  type="month"  v-model="v_month"  @change="handGetDemandsDTLs_month()" />
          </div> -->
          <div class="input-group col-md-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">
                <el-icon icon="search"></el-icon
              ></span>
            </div>
            <input type="text" class="form-control"  aria-label="Default" aria-describedby="inputGroup-sizing-default"  v-model="search" />
          </div>
          <button class="btn-export" @click="handExcel_DTP_SOM('tab_ChiTiet_SOM')">
            <el-icon icon="download"></el-icon>
            Xuất Excel
          </button>
        </div>
      
        <!-- Detail Table Section -->
        <div class="table-wrapper">
          <div class="table-header">
            <h5 class="table-title">
              <el-icon icon="info-circle"></el-icon>
              Chi Tiết Nhu Cầu SOM
            </h5>
            <span class="record-count">{{ showdataDemandDTL.length }} bản ghi</span>
          </div>
          <div class="tableFixHead">
            <table class="" id="tab_ChiTiet_SOM">
              <thead>
                <tr>
                <th rowspan="2" style="width: 50px">Số TT</th>
                <th rowspan="2" style="width: 80px">ID</th>
                <th rowspan="2" style="width: 80px">SOM ID</th>
                <th rowspan="2"> Khách hàng</th>
                <th rowspan="2" style="width: 80px">Dự Án</th>
                <th rowspan="2" style="width: 80px">Lệnh SX</th>
                <th colspan="7">Nhu cầu</th>
                <th colspan="4">Sản Xuất</th>

                <th rowspan="2" style="width: 80px">Trạng thái</th>
                <th rowspan="2" style="width: 150px">Ghi chú</th>
                </tr>
              <tr>
                <th style="width: 50px">Số Y/C</th>
                <th style="width: 50px">Số Giao</th>
                <th style="width: 50px">Đơn Vi</th>
                  <th>Mã PO</th>
                  <th>Mã SO</th>
                <th style="width: 30px">Từ ngày</th>
                <th style="width: 50px">Đến Ngày</th>
                <th style="width: 30px">Từ ngày</th>
                <th style="width: 50px">Đến Ngày</th>
                <th style="width: 50px">DK Số SX </th>
                <th style="width: 50px">Đã SX</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in showdataDemandDTL"
                  :key="index"
                  @click="handSelectDemand(item)"
                  :class="['data-row', maurow(item)]"
                >
                <td>{{ index + 1 }}</td>
                  <td>{{ item.PDD_ID }}</td>
                <td>{{ item.PDE_ID }}</td>
                <td>{{ item.CUS_NAME }}</td>
                <td>{{ item.PROJ_CODE }}</td>
                <td>{{ item.NUM_WO }}</td>
                <td>{{ item.QTY }}</td>
                <td>{{ item.QTY_DELIVERY }}</td>
                  <td>{{ item.UNIT_NAME }}</td>
                <td>{{ item.PO_CODE }}</td>
                  <td class="text-truncate">{{ item.SALESODER_CODE }}</td>
                <td>{{ item.START_DEMANDS }}</td>
                <td>{{ item.END_DEMANDS }}</td>
                <td>{{ item.START_PRODUCT }}</td>
                <td>{{ item.END_PRODUCT }}</td>
                <td>{{ item.QTY_DKSX }}</td>
                <td>{{ item.PRODUCTION }}</td>
                <td>{{ item.STATUS }}</td>
                <td>{{ item.NOTE }}</td>                
                </tr>
              </tbody>
            </table>
          </div>
          <base-dialog
            :active.sync="ShowFormDeNghixuats"
            :tile="'Đề nghị xuất hàng'"
          >
            <DeNghiXuatHang :PDD_ID="PDD_ID" />
          </base-dialog>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import dayjs from "dayjs";

import { usePMCStore } from "@/stores/PMC.store";

const pmcStore = usePMCStore();

import { exportData } from "@/plugins/Excel.js";
import BaseDialog from "@/components/controls/BaseDialog.vue";
import DeNghiXuatHang from "@/components/PMC/Demands/DeNghiXuatHang.vue";
import ChiThiMau from "@/components/controls/ChiThiMau.vue";

const dem_sum_PDD = ref(0)
const num_No_Buffer = ref(0)
const num_CW_4 = ref(0)
const num_CW_2 = ref(0)
const num_CW_1 = ref(0)
const Num_In_CW = ref(0)
const search_PDE = ref("")

const dataDemandsDTLs_SanXuat = ref<(Record<string, any>[])>([])


const DaGiao_DungHan = ref(0)
const DaGiao_TreHan = ref(0)
const ChuaGiao_TrongHan = ref(0)
const ChuaGiao_QuaHan = ref(0)

const ShowFormDeNghixuats = ref(false)
const PDD_ID = ref<number >(0)
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

//  computed: {
const Showdata_SOM_days = computed(() => {
      let data =  data_SOM_days.value.filter((element) => {
        return (
          element.PROJ_CODE.toUpperCase().includes(search_PDE.value.toUpperCase()) ||
          (element.PART_NUM && element.PART_NUM.toUpperCase().includes( search_PDE.value.toUpperCase() )) 
        );
      });
      return data;
    })
const showdataDemandDTL = computed(() => {
      let data = dataDemandsDTLs_SanXuat.value.filter((element) => {
        return ( element.PROJ_CODE && (
          element.PROJ_CODE.toUpperCase().includes(search.value.toUpperCase()) ||
          (element.PO_CODE && element.PO_CODE.toUpperCase().includes( search.value.toUpperCase() )) ||
          (element.CUS_NAME && element.CUS_NAME.toUpperCase().includes( search.value.toUpperCase() )) ||
          (element.SALESODER_CODE && element.SALESODER_CODE.toUpperCase().includes( search.value.toUpperCase() )) ||
          element.PDE_ID == search.value )
        );
      });
      return data;
    })
//  },

//  methods: {

const formatDate = (date: string) => {
      return dayjs(date,"DD/MM/YYYY").format('DD/MM YYYY');
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
const Pro_get_FORECAST_days = async () => {
      const res= await pmcStore.get_FORECAST_days(null)
      const data_FORECAST_days=res.data_FORECAST_days
        N_Chage.value=res.N_Chage
        infoStatus.value=setStatusPDM(res.All_status)
        const [PROJ_CODE,PART_NUM,..._Colums] =Object.keys(data_FORECAST_days[0])
        Colums.value=_Colums
        //console.log(Colums.value);
        
      // })
      
    }
const setStatusPDM = (All_Status: Record<string, any>[]) => {
      dem_sum_PDD.value=0
      num_CW_4.value=0
      num_CW_2.value=0
      num_CW_1.value=0
      Num_In_CW.value=0

      let Status: Record<string, Record<string, any>> = {}
      All_Status.forEach(element => {
        dem_sum_PDD.value=dem_sum_PDD.value+ element.Num_PDD
        num_CW_4.value=num_CW_4.value + element.CW_4
        num_CW_2.value=num_CW_2.value + element.CW_2
        num_CW_1.value=num_CW_1.value + element.CW_1
        Num_In_CW.value=Num_In_CW.value + element.In_CW

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
const mauCell = (date: string,row: number, PART_NUM: string) => {
      //console.log(date,this.N_Chage[row][date]);

      if(N_Chage.value[row][date] && N_Chage.value[row][date]>0){
        return 'mauNenVang'
      }
     
      //console.log(PART_NUM,infoStatus.value[PART_NUM]);
      
      if(infoStatus.value[PART_NUM][dayjs(date,"DD/MM/YYYY").isoWeek() + '' + dayjs(date,"DD/MM/YYYY").year()] && infoStatus.value[PART_NUM][dayjs(date,"DD/MM/YYYY").isoWeek() + '' + dayjs(date,"DD/MM/YYYY").year()]['num_complate_PDE'] && infoStatus.value[PART_NUM][dayjs(date,"DD/MM/YYYY").isoWeek() + '' + dayjs(date,"DD/MM/YYYY").year()]['num_complate_PDE']>0){
        return 'mauNenXanh'
      }
      if(infoStatus.value[PART_NUM][dayjs(date,"DD/MM/YYYY").isoWeek() + '' + dayjs(date,"DD/MM/YYYY").year()]&&infoStatus.value[PART_NUM][dayjs(date,"DD/MM/YYYY").isoWeek() + '' + dayjs(date,"DD/MM/YYYY").year()]['PHD_Late'] && infoStatus.value[PART_NUM][dayjs(date,"DD/MM/YYYY").isoWeek() + '' + dayjs(date,"DD/MM/YYYY").year()]['PHD_Late']>0){
        return 'mauNenCam'
      }
      if(infoStatus.value[PART_NUM][dayjs(date,"DD/MM/YYYY").isoWeek() + '' + dayjs(date,"DD/MM/YYYY").year()]&&infoStatus.value[PART_NUM][dayjs(date,"DD/MM/YYYY").isoWeek() + '' + dayjs(date,"DD/MM/YYYY").year()]['PDD_Late'] && infoStatus.value[PART_NUM][dayjs(date,"DD/MM/YYYY").isoWeek() + '' + dayjs(date,"DD/MM/YYYY").year()]['PDD_Late']>0){
        return 'mauNenDo'
      }
      if (dayjs(date,"DD/MM/YYYY")<dayjs().subtract(7,'days')){
        return 'mauNenDo'
      }
      return 'mauNenXam'
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
const getStatusBadgeClass = (status: string) => {
      const baseClass = 'status-badge';
      if (!status) return baseClass;
      
      const statusLower = status.toLowerCase();
      if (statusLower.includes('hoàn') || statusLower.includes('xong')) return `${baseClass} badge-success`;
      if (statusLower.includes('trễ') || statusLower.includes('muộn')) return `${baseClass} badge-danger`;
      if (statusLower.includes('chờ') || statusLower.includes('đợi')) return `${baseClass} badge-warning`;
      return `${baseClass} badge-info`;
    }
const handSelectDemand = (item: any) => {
      //CurenDemand.value = item;
    }

const ProgetDemandDTLs_SanXuat = () => {
      pmcStore.getDemandDTLs_SanXuat(null).then((res) => {
        dataDemandsDTLs_SanXuat.value = res.dataDemandsDTLs_SanXuat;
      });
    }

onMounted(async () => {
    await Pro_get_FORECAST_days()
    ProgetDemandDTLs_SanXuat();    
  })
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

.summary-grid {
  align-items: stretch;
}

.summary-item {
  display: flex;
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

.summary-card.cancel-window-4-card {
  background: linear-gradient(135deg, #ffd54f 0%, #fbc02d 100%);
}

.summary-card.cancel-window-2-card {
  background: linear-gradient(135deg, #ffb74d 0%, #f57c00 100%);
}

.summary-card.cancel-window-1-card {
  background: linear-gradient(135deg, #f48fb1 0%, #e91e63 100%);
}

.summary-card.late-card {
  background: linear-gradient(135deg, #9e9e9e 0%, #616161 100%);
}

.summary-card.wo-card {
  background: linear-gradient(135deg, #ff8a80 0%, #d32f2f 100%);
}

.summary-card.cancel-window-card {
  background: linear-gradient(135deg, #ff8a80 0%, #d32f2f 100%);
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
  padding: 20px;
  border-radius: 12px;
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 25px;
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

  .summary-section {
    padding: 18px;
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

  .summary-grid {
    row-gap: 12px;
  }

  .card-icon {
    font-size: 20px;
  }

  .card-value {
    font-size: 20px;
  }

  .controls-section {
    flex-direction: column;
    gap: 10px;
  }

  .search-wrapper {
    min-width: 100%;
  }

  .summary-section {
    padding: 14px;
  }


  .table-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}

/* ========== Print Styles ========== */
@media print {
  .controls-section,
  .table-header {
    display: none;
  }
}
</style>