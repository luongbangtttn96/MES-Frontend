<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :md="6">
        <label> Tháng:</label>
        <el-input
          type="month"
          v-model="v_month"
          @change="handGetDemandsDTLs_month()"
        />
      </el-col>
      <el-col :xs="24" :md="6">
        <div class="card mt-1">
          <div class="card-body">
            <CharPie :chartData="dataChartDM" :width="160" :height="160" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-col :xs="24" :md="6">
      <el-input
        type="text"
        class="form-control"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        v-model="search"
      >
        <template #append>
          <el-icon><Search /></el-icon>
        </template>
    </el-input>
    </el-col>

    <div class="tableFixHead" style="overflow: auto; height: 80vh">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th rowspan="2" style="width: 50px">Số TT</th>
            <th rowspan="2" style="width: 80px">ID</th>
            <th rowspan="2" style="width: 80px">Dự Án</th>
            <th rowspan="2" style="width: 80px">Lệnh SX</th>
            <th colspan="7">Nhu cầu</th>
            <th colspan="2">Mua hàng</th>

            <th rowspan="2" style="width: 80px">Trạng thái</th>
            <th rowspan="2" style="width: 150px">Ghi chú</th>
            <th rowspan="2" style="width: 100px">@</th>
          </tr>
          <tr>
            <th style="width: 50px">Số Yêu cầu</th>
            <th style="width: 50px">Số Đã Giao</th>
            <th style="width: 50px">Đơn Vi</th>
            <th>Mã PO</th>
            <th>Mã SO</th>
            <th style="width: 30px">Từ ngày</th>
            <th style="width: 50px">Đến Ngày</th>
            <th style="width: 30px">Từ ngày</th>
            <th style="width: 50px">Đến Ngày</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in showdataDemandDTL"
            :key="index"
            @click="handSelectDemand(item)"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.PDE_ID }}</td>
            <td>{{ item.PROJ_CODE }}</td>
            <td>{{ item.NUM_WO }}</td>
            <td>{{ item.QTY }}</td>
            <td>{{ item.QTY_DELIVER }}</td>
            <td>{{ item.UNIT_NAME }}</td>
            <td>{{ item.PO_CODE }}</td>
            <td class="text-truncate">{{ item.SALESODER_CODE }}</td>
            <td>{{ item.START_DEMANDS }}</td>
            <td>{{ item.END_DEMANDS }}</td>
            <td>{{ item.START_MATERIAL }}</td>
            <td>{{ item.END_MATERIAL }}</td>
            <td>{{ item.STATUS }}</td>

            <td>{{ item.NOTE }}</td>
            <td class="text-truncate">
              <div v-if="parseInt(item.QTY) > (parseInt(item.QTY_DELIVER)||0) ">
                <el-button type="primary"
                  v-if="item.StatusId > 9"
                  class="btn btn-info"
                  style="font-size: 14px"
                  @click="
                    handShowformDenghiXuat(
                      item.StatusId,
                      item.PDD_ID,
                      item.PROJ_CODE,
                      item.START_DEMANDS,
                      item.END_DEMANDS,
                      item.QTY,
                      item.QTY_DELIVER
                    )
                  "
                >
                  Đề nghị xuất TP
                </el-button>                 
              </div>
              <div v-else>
                <el-button type="success" class="btn btn-sucset" 
                @click="handShowformDenghiXuatDTL(item.StatusId,
                      item.PDD_ID,
                      item.PROJ_CODE,
                      item.START_DEMANDS,
                      item.END_DEMANDS,
                      item.QTY,
                      item.QTY_DELIVER)">
                  Xem 
                </el-button>
              </div>
              
              <!-- <button  class="btn btn-info" style="font-size:14px" title="Theo dõi nguyên liệu cho SX"
                                @click="handTheoDoiDemands(item.StatusId,item.PDD_ID,item.PROJ_CODE,item.START_DEMANDS,item.END_DEMANDS,item.QTY)">
                                <b-icon icon="search" aria-hidden="true"></b-icon>
                            </button>

                            <button @click="handHuyYCSanXuat_Demand(item.PDD_ID)"  title="Hủy YC Sản xuất"
                                class="btn btn-danger">&#10006;
                            </button> -->
            </td>
          </tr>
        </tbody>
      </table>
      <base-dialog
        v-model:active="ShowFormDeNghixuats"
        :tile="'Đề nghị xuất hàng'"
      >
        <de-nghi-xuat-hang 
          :PDD_ID="PDD_ID" 
          :QTY="QTY" 
          :QTY_DELIVER="QTY_DELIVER" 
        />
      </base-dialog>

      <base-dialog
        v-model:active="ShowFormDeNghixuatsDTL"
        :tile="'Đề nghị xuất hàng của PO'"
      >
        <DeNghiXuatHangDTL
          :PDD_ID="PDD_ID" 
          :QTY="QTY" 
          :QTY_DELIVER="QTY_DELIVER" 
        />
      </base-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref, computed, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";

import { usePMCStore } from "@/stores/PMC.store.ts";

import CharPie from "@/components/Chart/CharPie.vue";
import BaseDialog from "@/components/controls/BaseDialog.vue";
import DeNghiXuatHang from "./DeNghiXuatHang.vue";
import DeNghiXuatHangDTL from "./DeNghiXuatHang_DTL.vue";

const pmcStore = usePMCStore();

const v_month = ref(dayjs().format("YYYY-MM"));
const dataDemandsDTLs = ref<Record<string, any>[]>([]);
const dataChartDM = ref<Record<string, any>>({});

const DaGiao_DungHan = ref(0);
const DaGiao_TreHan = ref(0);
const ChuaGiao_TrongHan = ref(0);
const ChuaGiao_QuaHan = ref(0);

const ShowFormDeNghixuats = ref(false);
const ShowFormDeNghixuatsDTL = ref(false);
const PDD_ID = ref(0);
const QTY = ref(0);
const QTY_DELIVER = ref(0);
const search = ref("");
const CurenDemand = ref<Record<string, any>>({});

//  computed: {
const showdataDemandDTL = computed(() => {
      let data = dataDemandsDTLs.value.filter((element) => {
        return ( element.PROJ_CODE && element.PROJ_CODE.toUpperCase().includes(search.value.toUpperCase()) ||
          (element.PO_CODE &&  element.PO_CODE.toUpperCase().includes(search.value.toUpperCase())) ||
          (element.SALESODER_CODE && element.SALESODER_CODE.toUpperCase().includes(search.value.toUpperCase())) ||
          (element.NUM_WO && element.NUM_WO.toUpperCase().includes(search.value.toUpperCase())) ||
          element.PDE_ID == search.value
        );
      });
      return data;
    });

//  methods: {
    // ...mapActions([
    //   "LuuDemandDTL",
    //   "getDemandDTLs_month",
    //   "HuyYCSanXuat_Demand",
    //   "UpdateMaterialBomPO",
    // ]),
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
const handShowformDenghiXuatDTL = (StatusId: number, _PDD_ID: number, PROJ_CODE: string, START_DEMANDS: string, END_DEMANDS: string, _QTY: number, _QTY_DELIVER: number) => {
      PDD_ID.value = _PDD_ID;
      QTY.value = _QTY;
      QTY_DELIVER.value = _QTY_DELIVER;
      ShowFormDeNghixuatsDTL.value = true;
    };

const handShowformDenghiXuat = (
      StatusId: number,
      _PDD_ID: number,
      PROJ_CODE: string,
      START_DEMANDS: string,
      END_DEMANDS: string,
      _QTY: number,
      _QTY_DELIVER: number
    ) => {
      PDD_ID.value = _PDD_ID;
      QTY.value = _QTY;
      QTY_DELIVER.value = _QTY_DELIVER;
      ShowFormDeNghixuats.value = true;

      //console.log(this.PDD_ID);
    };
const handSelectDemand = (item: any) => {
      CurenDemand.value = item;
    };

const handGetDemandsDTLs_month = () => {
      procgetDemandDTLs_month();
    };
const procgetDemandDTLs_month = async () => {
      const res = await pmcStore.getDemandDTLs_month({ v_month: v_month.value });
      dataDemandsDTLs.value = res.dataDemandsDTLs;

      DaGiao_DungHan.value = 0;
      DaGiao_TreHan.value = 0;
      ChuaGiao_TrongHan.value = 0;
      ChuaGiao_QuaHan.value = 0;
      dataDemandsDTLs.value.forEach((element) => {
          if (
            element.DATE_DELIVER &&
            dayjs(element.END_DEMANDS, "DD/MM/YYYY") >=dayjs(element.DATE_DELIVER, "DD/MM/YYYY")
          )
            DaGiao_DungHan.value++;
          if (
            element.DATE_DELIVER &&
            dayjs(element.END_DEMANDS, "DD/MM/YYYY") < dayjs(element.DATE_DELIVER, "DD/MM/YYYY")
          )
            DaGiao_TreHan.value++;
          if (
            !element.DATE_DELIVER &&
            dayjs(element.END_DEMANDS, "DD/MM/YYYY") >= dayjs()
          )
            ChuaGiao_TrongHan.value++;
          if (
            !element.DATE_DELIVER &&
            dayjs(element.END_DEMANDS, "DD/MM/YYYY") < dayjs()
          )
            ChuaGiao_QuaHan.value++;
          // console.log(element.DATE_DELIVER,element.END_DEMANDS,this.DaGiao_DungHan,this.DaGiao_TreHan,this.ChuaGiao_TrongHan,this.ChuaGiao_QuaHan);
        });

      dataChartDM.value = getDataChar();

      console.log(dataChartDM.value);
    };

onMounted(() => {
    procgetDemandDTLs_month();
});
</script>

<style>
/* l{ */
/* bottom: #696969', '#FFFF00','#00AA00','#0000CC',  '#41B883', '#E46651', '#00D8FF', '#DD1B16' */
/* '#00AA00','#FFFF00','#00D8FF','#E46651','#0000CC','#DD1B16' */
/* } */
</style>