<template>
  <div>
    <div class="row m-1">
      <div>
        <label> Tháng:</label>
        <input
          type="month"
          v-model="v_month"
          @change="handGetDemandsDTLs_month()"
        />
      </div>
      <div class="col-md-3">
        <div class="card mt-1">
          <div class="card-body">
            <CharPie :chartData="dataChartDM" :width="160" :height="160" />
          </div>
        </div>
      </div>
    </div>
    <div class="input-group mt-3 mb-2 col-md-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">
          <b-icon icon="search"></b-icon
        ></span>
      </div>
      <input
        type="text"
        class="form-control"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        v-model="search"
      />
    </div>

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
                <button
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
                </button>                 
              </div>
              <div v-else>
                <button class="btn btn-sucset" 
                @click="handShowformDenghiXuatDTL(item.StatusId,
                      item.PDD_ID,
                      item.PROJ_CODE,
                      item.START_DEMANDS,
                      item.END_DEMANDS,
                      item.QTY,
                      item.QTY_DELIVER)">
                  Xem 
                </button>
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
        :active.sync="ShowFormDeNghixuats"
        :tile="'Đề nghị xuất hàng'"
      >
        <de-nghi-xuat-hang 
          :PDD_ID="PDD_ID" 
          :QTY="QTY" 
          :QTY_DELIVER="QTY_DELIVER" 
        />
      </base-dialog>

      <base-dialog
        :active.sync="ShowFormDeNghixuatsDTL"
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

<script>
import moment from "moment";
import { mapActions } from "vuex";

import CharPie from "../../../Chart/CharPie.vue";
import BaseDialog from "../../../controls/BaseDialog.vue";
import DeNghiXuatHang from "./DeNghiXuatHang.vue";
import DeNghiXuatHangDTL from "./DeNghiXuatHang_DTL.vue";

export default {
  data() {
    return {
      v_month: moment().format("YYYY-MM"),
      dataDemandsDTLs: [],
      dataChartDM: {},

      DaGiao_DungHan: 0,
      DaGiao_TreHan: 0,
      ChuaGiao_TrongHan: 0,
      ChuaGiao_QuaHans: 0,

      ShowFormDeNghixuats: false,
      ShowFormDeNghixuatsDTL:false,
      PDD_ID: 0,
      QTY: 0,
      QTY_DELIVER: 0,
      search: "",
    };
  },
  computed: {
    showdataDemandDTL() {
      let data = this.dataDemandsDTLs.filter((element) => {
        return ( element.PROJ_CODE && element.PROJ_CODE.toUpperCase().includes(this.search.toUpperCase()) ||
          (element.PO_CODE &&  element.PO_CODE.toUpperCase().includes(this.search.toUpperCase())) ||
          (element.SALESODER_CODE && element.SALESODER_CODE.toUpperCase().includes(this.search.toUpperCase())) ||
          (element.NUM_WO && element.NUM_WO.toUpperCase().includes(this.search.toUpperCase())) ||
          element.PDE_ID == this.search
        );
      });
      return data;
    },
  },
  components: {
    CharPie,
    BaseDialog,
    DeNghiXuatHang,
    DeNghiXuatHangDTL
  },
  methods: {
    ...mapActions([
      "LuuDemandDTL",
      "getDemandDTLs_month",
      "HuyYCSanXuat_Demand",
      "UpdateMaterialBomPO",
    ]),
    getDataChar() {
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
              this.DaGiao_DungHan,
              this.DaGiao_TreHan,
              this.ChuaGiao_TrongHan,
              this.ChuaGiao_QuaHan,
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
              this.DaGiao_DungHan + this.DaGiao_TreHan,
              this.ChuaGiao_TrongHan + this.ChuaGiao_QuaHan,
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
    },
    handShowformDenghiXuatDTL(StatusId, PDD_ID, PROJ_CODE,START_DEMANDS,END_DEMANDS,QTY,QTY_DELIVER){
      this.PDD_ID = PDD_ID;
      this.QTY = QTY;
      this.QTY_DELIVER = QTY_DELIVER;
      this.ShowFormDeNghixuatsDTL = true;
    },
    handShowformDenghiXuat(
      StatusId,
      PDD_ID,
      PROJ_CODE,
      START_DEMANDS,
      END_DEMANDS,
      QTY,
      QTY_DELIVER

    ) {
      this.PDD_ID = PDD_ID;
      this.QTY = QTY;
      this.QTY_DELIVER = QTY_DELIVER;
      this.ShowFormDeNghixuats = true;

      //console.log(this.PDD_ID);
    },
    handSelectDemand(item) {
      this.CurenDemand = item;
    },

    handGetDemandsDTLs_month() {
      this.procgetDemandDTLs_month();
    },
    procgetDemandDTLs_month() {
      this.getDemandDTLs_month({ v_month: this.v_month }).then((res) => {
        this.dataDemandsDTLs = res.dataDemandsDTLs;

        (this.DaGiao_DungHan = 0),
          (this.DaGiao_TreHan = 0),
          (this.ChuaGiao_TrongHan = 0),
          (this.ChuaGiao_QuaHan = 0),
          this.dataDemandsDTLs.forEach((element) => {
            if (
              element.DATE_DELIVER &&
              moment(element.END_DEMANDS, "DD/MM/YYYY") >=
                moment(element.DATE_DELIVER, "DD/MM/YYYY")
            )
              this.DaGiao_DungHan++;
            if (
              element.DATE_DELIVER &&
              moment(element.END_DEMANDS, "DD/MM/YYYY") <
                moment(element.DATE_DELIVER, "DD/MM/YYYY")
            )
              this.DaGiao_TreHan++;
            if (
              !element.DATE_DELIVER &&
              moment(element.END_DEMANDS, "DD/MM/YYYY") >= moment()
            )
              this.ChuaGiao_TrongHan++;
            if (
              !element.DATE_DELIVER &&
              moment(element.END_DEMANDS, "DD/MM/YYYY") < moment()
            )
              this.ChuaGiao_QuaHan++;
            // console.log(element.DATE_DELIVER,element.END_DEMANDS,this.DaGiao_DungHan,this.DaGiao_TreHan,this.ChuaGiao_TrongHan,this.ChuaGiao_QuaHan);
          });

        this.dataChartDM = this.getDataChar();

        console.log(this.dataChartDM);
      });
    },
  },
  created() {
    this.procgetDemandDTLs_month();
  },
};
</script>

<style>
/* l{ */
/* bottom: #696969', '#FFFF00','#00AA00','#0000CC',  '#41B883', '#E46651', '#00D8FF', '#DD1B16' */
/* '#00AA00','#FFFF00','#00D8FF','#E46651','#0000CC','#DD1B16' */
/* } */
</style>