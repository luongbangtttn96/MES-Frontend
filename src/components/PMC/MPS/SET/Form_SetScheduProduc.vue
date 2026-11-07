<template>
  <div>
    <TitlePage :titlepage="'Thiết lập lịch sản xuất'" />
    <div class="row container-fluid">
      <div class="form-group" style="padding: 0 0 0 10px; width: 150px">
        <label for="DepatmenControlSelect1">Bộ Phận:</label>
        <select
          class="form-control small"
          id="DepatmenControlSelect1"
          v-model="depatId"
          @change="changeSelect($event)"
        >
          <option
            v-for="item in dataDepartmens"
            :key="item.DEPT_ID"
            :value="item.DEPT_ID"
          >
            {{ item.DEPT_NAME }}
          </option>
        </select>
      </div>
      <div class="form-group" style="width: 200px">
        <label for="SelectWO"> Lệnh SX: </label>
        <select
          class="form-control"
          id="SelectWO"
          v-model="PlanID"
          @change="changeSelect($event)"
        >
          <option
            v-for="item in PlanList"
            :key="item.PLA_ID"
            :value="item.PLA_ID"
          >
            {{ item.NUM_WO + "&nbsp;&nbsp;&nbsp;&nbsp;" + item.PROJ_CODE }}
          </option>
        </select>
      </div>

      <div class="form-group" style="padding: 0 0 0 10px; width: 170px">
        <label for="SemiControlSelect1">Sản phẩm:</label>
        <select
          class="form-control small"
          v-model="BomDTLId"
          id="SemiControlSelect1"
        >
          <option
            v-for="item in BOMList"
            :key="item.BOM_HDR_ID"
            :value="item.BOM_HDR_ID"
          >
            {{ item.BOM_NAME }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="Input_soluong">Số lượng:</label>
        <input
          v-model="Qty"
          class="form-control small"
          type="number"
          id="Input_soluong"
          maxlength="3"
          style="width: 80px"
        />
      </div>
      <div class="form-group">
        <label for="Input_date">Số nhân công:</label>
        <input
          v-model="ItemBOM.WORKER"
          class="form-control small"
          type="number"
          maxlength="2"
          id="Input_date"
          style="width: 80px"
        />
      </div>
    </div>

    <div class="row container-fluid group_time">
      <div class="contro_hand mr-2" @click="navigateToDate(-1)">
        <h4>&#8810;</h4>
      </div>
      <div class="ds-nav-info">
        <h4>{{ showCurDate }}</h4>
      </div>
      <div class="contro_hand ml-2" @click="navigateToDate(1)">
        <h4>&#8811;</h4>
      </div>
      <div>
        <a href="/ViewListScheduPro" class="btn btn-primary btn-sm"
          >View Kế hoạch</a
        >
      </div>
    </div>
    <div style="overflow: autos; width: 100vw">
      <div
        class="row container-fluid text-truncate"
        :style="'width:' + 34 * canh + 'px'"
      >
        <div>
          <div
            class="boxline"
            :style="'width:' + 3 * canh + 'px; ' + 'height:' + canh + 'px;'"
            v-for="(item, index) in showLineDept"
            :key="index"
          >
            {{ item.LINE_NAME }}
          </div>
        </div>
        <div v-for="(arr, i) in showmatric" :key="i">
          <boxvung
            :canh="canh"
            v-for="(item, j) in arr"
            :key="j"
            :Cel_Objec="item"
            :x="i"
            :y="j"
            :dragging="dragging"
            @ChangeDragging="ChangeDragging"
            @changeMau="SelectGio"
          />
        </div>
      </div>
    </div>
    <div v-if="newPlanSchdure_Duration.length > 0">
      <div class="m-2">
        <button class="btn btn-info" @click="handSaveScheduPro()">
          Lưu lịch SX
        </button>
      </div>
      <table class="table table-striped">
        <thead>
          <th>STT</th>
          <th>LINE</th>
          <th>BOM</th>
          <th>WO</th>
          <th>SỐ LƯỢNG</th>
          <th>SỐ NGƯỜI</th>
          <th>TG ĐẦU</th>
          <th>TG CUỐI</th>
          <th>NĂNG LỰC</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in newPlanSchdure_Duration" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.LINE_NAME }}</td>
            <td>{{ item.BOM_CODE }}</td>
            <td>{{ item.NUM_WO }}</td>
            <td>{{ item.QTY }}</td>
            <td>{{ item.WORKER }}</td>
            <td>{{ item.START_TIME }}</td>
            <td>{{ item.END_TIME }}</td>
            <td>{{ item.CAPACITY }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import boxvung from "../../../controls/boxVuong.vue";
import TitlePage from "../../../controls/TitlePage.vue";

export default {
  data() {
    return {
      dataDepartmens: [],

      dataPlanSchdure_Duration: [],
      newPlanSchdure_Duration: [],

      BOMList: [],
      PlanList: [],
      dragging: false,

      PlanID: 0,
      depatId: 0,
      BomDTLId: 0,
      Qty: 0,
      Worker: 0,

      ngaydau: moment().startOf("day").add(1, "day").add(6, "hour"),
      ngayCuoi: moment().endOf("day").add(1, "day").add(6, "hour"),
      ngaydaucu: moment().startOf("day").add(1, "day").add(6, "hour"),
      ngayCuoicu: moment().endOf("day").add(1, "day").add(6, "hour"),
      data2Datamatrix: [],
      Datamatrix: {},

      dataLine: [],
      indexLine: {},
      showmatric: [],

      canh: 40,

      cur_time: moment().add(1, "day"),
    };
  },
  components: {
    boxvung,
    TitlePage,
  },
  computed: {
    showCurDate() {
      return this.cur_time.format("DD-MM-YYYY");
    },

    showLineDept() {
      this.indexLine = {};
      let data = this.dataLine.filter((item) => {
        return item.DEPT_ID == this.depatId;
      });
      data.forEach((element, i) => {
        this.indexLine[element.LINE_NAME] = i;
      });
      this.showmatric = this.getdatashowmatric();
      return data;
    },
    ItemBOM() {
      let Abom = this.BOMList.filter((item) => {
        return item.BOM_HDR_ID == this.BomDTLId;
      });
      let bom = {};
      if (Abom.length > 0) {
        bom = Abom[0];
      }
      console.log(bom);
      return bom;
    },
    ItemPlan() {
      let Aplan = this.PlanList.filter((item) => {
        return item.PLA_ID == this.PlanID;
      });
      let plan = {};
      if (Aplan.length > 0) {
        plan = Aplan[0];
      }
      //console.log(plan);
      return plan;
    },
  },
  watch: {},
  methods: {
    ...mapActions([
      "getListDepartmens",
      "getBomHDRListOfDepPro",
      "getPlanHDRSetLine",
      "getLines",
      "getScheduPro_Duration",
      "SaveSchedure_Produc",
    ]),
    handSaveScheduPro() {
      console.log(this.newPlanSchdure_Duration);
      this.newPlanSchdure_Duration.forEach((element) => {
        this.SaveSchedure_Produc(element);
      });
    },
    getdatashowmatric() {
      let n = this.dataLine.filter((item) => {
        return item.DEPT_ID == this.depatId;
      }).length;
      let m = 24;
      let mat = this.create2DMatrix(n, m);
      let i_hours = moment(this.cur_time).startOf("day").add(6, "hour");
      //console.log(i_hours.format("YYYY-MM-DD HH"));
      for (let i = 0; i < 24; i++) {
        //console.log(this.Datamatrix,i_hours.format("YYYY-MM-DD HH"));
        if (this.Datamatrix[i_hours.format("YYYY-MM-DD HH")]) {
          this.Datamatrix[i_hours.format("YYYY-MM-DD HH")].forEach(
            (element) => {
              //console.log(element,element.Line,this.indexLine, mat[i]);
              if (element.Line in this.indexLine) {
                mat[i][this.indexLine[element.Line]].loai = element.loai;
                mat[i][this.indexLine[element.Line]].text = element.bomCode;
                mat[i][this.indexLine[element.Line]].position = "boxvunggiua";
              }
            }
          );
        }
        i_hours.add(1, "hour");
      }

      for (let y = 0; y < n; y++) {
        if (mat[0][y].text != 0) {
          mat[0][y].position = "boxvungdau";
        }
        for (let x = 1; x < m - 1; x++) {
          //console.log(mat[x-1][y],mat[x][y],mat[x+1][y]);
          if (
            mat[x][y].text != mat[x - 1][y].text &&
            mat[x][y].text == mat[x + 1][y].text
          )
            mat[x][y].position = "boxvungdau";
          if (
            mat[x][y].text == mat[x - 1][y].text &&
            mat[x][y].text != mat[x + 1][y].text
          )
            mat[x][y].position = "boxvungcuoi";
        }
        if (mat[23][y].text != 5) {
          mat[23][y].position = "boxvungcuoi";
        }
      }

      //console.log(mat);
      return mat;
    },

    navigateToDate(offest = 0) {
      this.cur_time = moment(this.cur_time).add(offest, "day");
      if (offest == -1 && this.cur_time < this.ngaydau) {
        this.ngaydaucu = moment(this.ngaydau);
        this.ngaydau.add(offest, "day");
        this.ngayCuoicu = moment(this.ngayCuoi);
        this.Pro_getScheduPro_Duration();
      }
      if (offest == 1 && this.cur_time > this.ngayCuoi) {
        this.ngayCuoicu = moment(this.ngayCuoi);
        this.ngayCuoi.add(offest, "day");
        this.ngaydaucu = moment(this.ngaydau);
        this.Pro_getScheduPro_Duration();
      }
      // this.showmatric=this.getdatashowmatric()
      // this.$forceUpdate()
    },
    Pro_getScheduPro_Duration() {
      let data = {
        ngaydau: this.ngaydau.format("YYYY-MM-DD HH:mm:ss"),
        ngaycuoi: this.ngayCuoi.format("YYYY-MM-DD HH:mm:ss"),
      };
      this.getScheduPro_Duration(data).then((res) => {
        this.dataPlanSchdure_Duration = res.dataPlanSchdure_Duration;
        //console.log(this.dataPlanSchdure_Duration);
        this.dataToDatamatrix();
      });
    },
    dataToDatamatrix() {
      //console.log(this.ngaydaucu.format(), this.ngayCuoicu.format());
      this.dataPlanSchdure_Duration.forEach((element) => {
        let v_ngd = moment(element.START_TIME),
          v_ngc = moment(element.END_TIME);
        if (moment(element.START_TIME) < this.ngaydaucu) {
          this.Pro_ChenLichSX(
            element,
            moment(element.START_TIME),
            this.ngaydaucu
          );
          v_ngd = this.ngaydaucu;
        }
        if (moment(element.END_TIME) > this.ngayCuoicu) {
          this.Pro_ChenLichSX(
            element,
            this.ngayCuoicu,
            moment(element.END_TIME)
          );
          v_ngc = this.ngayCuoicu;
        }
        if (this.ngayCuoicu.diff(this.ngaydaucu) < 86400000) {
          this.Pro_ChenLichSX(element, v_ngd, v_ngc);
        }
      });
      this.showmatric = this.getdatashowmatric();
      this.$forceUpdate();
    },
    // hàm chen thêm giờ lịch sản xuất vào data ma trận trong khoản thời gian
    Pro_ChenLichSX(element, st, end) {
      let ng_d = st;
      let ng_c = end;
      if (st > moment(element.START_TIME)) {
        ng_d = moment(st);
      } else {
        ng_d = moment(element.START_TIME);
      }
      if (end < moment(element.END_TIME)) {
        ng_c = moment(end);
      } else {
        ng_c = moment(element.END_TIME);
      }
      //console.log(ng_d.format(), ng_c.format());
      while (ng_d < ng_c) {
        let property_name = ng_d.format("YYYY-MM-DD HH");
        if (!this.Datamatrix.hasOwnProperty(property_name)) {
          this.Datamatrix[property_name] = [
            {
              Line: element.LINE_NAME,
              loai: 1,
              bomCode: element.BOM_CODE,
            },
          ];
        } else {
          this.Datamatrix[property_name].push({
            Line: element.LINE_NAME,
            loai: 1,
            bomCode: element.BOM_CODE,
          });
        }
        //console.log(property_name,this.Datamatrix[property_name],element.LINE_NAME);
        ng_d.add(1, "hours");
      }

      //console.log(this.Datamatrix);
    },
    proc_getLines() {
      this.getLines().then((res) => {
        this.dataLine = res.lines;
        this.showmatric = this.getdatashowmatric();
        this.$forceUpdate();
      });
    },
    SelectGio(selecValue, x, y) {
      let _x = (x + 6) % 24;
      let textNum = ("0" + _x).slice(-2);
      let time = this.cur_time.format("YYYY-MM-DD") + " " + textNum;
      //console.log(this.Datamatrix[time])
      let e = document.getElementById("SemiControlSelect1");
      if (this.cur_time >= moment().startOf("day")) {
        if (e.selectedIndex >= 0) {
          if (this.Qty > 0) {
            let bomCode = e.options[e.selectedIndex].text;
            let line = this.showLineDept[y];
            //console.log(selecValue,x,y, time, line);
            // cập nhất màn mình showmatric
            switch (selecValue.loai) {
              case -1:
                this.showmatric[x][y].loai = 0;
                this.showmatric[x][y].text = this.ItemBOM.BOM_CODE;
                this.showmatric[x][y].BOM_HDR_ID = this.ItemBOM.BOM_HDR_ID;
                this.showmatric[x][y].WO = this.ItemPlan.NUM_WO;
                this.showmatric[x][y].PLA_ID = this.ItemPlan.PLA_ID;
                this.showmatric[x][y].WORKER = this.ItemBOM.WORKER;
                this.showmatric[x][y].position = "boxvunggiua";

                break;
              case 0:
                this.showmatric[x][y].loai = -1;
                this.showmatric[x][y].text = _x;
                this.showmatric[x][y].position = "boxvung";
                break;
              default:
                break;
            }
            //this.showmatric[x][y].position='boxvunggiua'

            // đánh dấu màu cho vùng lịch SX
            if (this.showmatric[0][y].text != 6) {
              this.showmatric[0][y].position = "boxvungdau";
            }
            for (let i = 1; i < 23; i++) {
              //console.log(this.showmatric[i-1][y],this.showmatric[i][y],this.showmatric[i+1][y]);
              if (
                this.showmatric[i][y].text != this.showmatric[i - 1][y].text &&
                this.showmatric[i][y].text == this.showmatric[i + 1][y].text
              )
                this.showmatric[i][y].position = "boxvungdau";
              if (
                this.showmatric[i][y].text == this.showmatric[i - 1][y].text &&
                this.showmatric[i][y].text != this.showmatric[i + 1][y].text
              )
                this.showmatric[i][y].position = "boxvungcuoi";
              if (
                this.showmatric[i][y].text == this.showmatric[i - 1][y].text &&
                this.showmatric[i][y].text == this.showmatric[i + 1][y].text
              )
                this.showmatric[i][y].position = "boxvunggiua";
            }
            if (this.showmatric[23][y].text != 5) {
              this.showmatric[23][y].position = "boxvungcuoi";
            }
            this.$forceUpdate();

            // cập nhật dữ liệu datametric

            if (time in this.Datamatrix) {
              let i = 0; // số thứ tự của line
              while (
                i < this.Datamatrix[time].length &&
                this.Datamatrix[time][i].Line != line.LINE_NAME
              ) {
                i++;
              }
              // //thêm ô lịch SX
              if (this.showmatric[x][y].loai == 0) {
                if (i < this.Datamatrix[time].length) {
                  if (this.Datamatrix[time][i].loai == 0) {
                    this.Datamatrix[time][i].bomCode = bomCode;
                    this.Datamatrix[time][i].Line = line.LINE_NAME;
                  }
                  //console.log(this.Datamatrix[time][i])
                } else {
                  this.Datamatrix[time].push({
                    Line: line.LINE_NAME,
                    loai: 0,
                    bomCode: bomCode,
                  });
                }
              }
              // bỏ ô lịch Sx
              if (this.showmatric[x][y].loai == -1) {
                this.Datamatrix[time].splice(i, 1);
              }
              //console.log(this.Datamatrix[time]);
            } else {
              this.Datamatrix[time] = [
                {
                  Line: line.LINE_NAME,
                  loai: 0,
                  bomCode: line.BOM_CODE,
                },
              ];
            }

            // Update lịch sản xuất lên biến

            let dataScheduLine = [];
            let i = 0;
            while (i < 23) {
              let infoSchedu = {
                BOM_CODE: this.showmatric[i][y].text,
                BOM_HDR_ID: this.showmatric[i][y].BOM_HDR_ID || "",
                NUM_WO: this.showmatric[i][y].WO || "",
                PLA_ID: this.showmatric[i][y].PLA_ID || 0,
                LINE_ID_HDR: line.LINE_ID_HDR,
                LINE_NAME: line.LINE_NAME,
                QTY: this.Qty,
                WORKER: this.ItemBOM.WORKER,

                CAPACITY: 0,
                START_TIME: "",
                END_TIME: "",
              };
              // let _bom =this.showmatric[i][y].text
              // let _PLAN_ID=this.showmatric[i][y].PLA_ID|| null

              if (infoSchedu.BOM_CODE != (i + 6) % 24) {
                let td = moment(this.showCurDate, "DD-MM-YYYY HH").add(
                  i + 6,
                  "hour"
                );
                let tc = moment(this.showCurDate, "DD-MM-YYYY HH")
                  .add(i + 6, "hour")
                  .endOf("hours");
                //console.log(this.showmatric[i+1][y], infoSchedu.BOM_CODE, infoSchedu.PLAN_ID);
                while (
                  this.showmatric[i + 1][y].text == infoSchedu.BOM_CODE &&
                  this.showmatric[i + 1][y].PLA_ID == infoSchedu.PLA_ID
                ) {
                  tc.add(1, "hours");
                  i++;
                }
                if (this.Qty > 0)
                  infoSchedu.CAPACITY = (
                    tc.diff(td, "seconds") / this.Qty
                  ).toFixed(3);
                else infoSchedu.CAPACITY = 0;
                (infoSchedu.START_TIME = td.format("YYYY-MM-DD HH:mm:ss")),
                  (infoSchedu.END_TIME = tc.format("YYYY-MM-DD HH:mm:ss"));

                dataScheduLine.push(infoSchedu);
              }
              i++;
            }

            let l1 = this.newPlanSchdure_Duration.filter((item) => {
              return (
                item.LINE_ID_HDR == line.LINE_ID_HDR &&
                item.START_TIME.substring(0, 10) ==
                  this.cur_time.format("YYYY-MM-DD")
              );
            });
            this.newPlanSchdure_Duration = this.newPlanSchdure_Duration.filter(
              (item) => {
                return (
                  item.LINE_ID_HDR != line.LINE_ID_HDR ||
                  item.START_TIME.substring(0, 10) !=
                    this.cur_time.format("YYYY-MM-DD")
                );
              }
            );
            this.newPlanSchdure_Duration = [
              ...this.newPlanSchdure_Duration,
              ...dataScheduLine,
            ];
            //console.log(dataScheduLine, l1, this.newPlanSchdure_Duration);
          } else {
            alert("Bạn thêm số lượng kế hoạch");
          }
        } else {
          alert("Chưa có sản phậm chọn");
        }
      } else {
        alert("quá thời gian");
      }
    },

    ChangeDragging(value) {
      this.dragging = value;
    },
    changeSelect(event) {
      // this.departmenSelect=event.target.value
      //console.log(this.depatId)
      let data = {
        departMenID: this.depatId,
        PlanID: this.PlanID,
      };
      // lấy các Bom SP của lệnh SX
      this.getBomHDRListOfDepPro(data).then((res) => {
        this.BOMList = res.BOMList;
        //console.log(this.BOMList);
      });
    },
    create2DMatrix(x_dim, y_dim, val = -1) {
      let loai = -1;
      if (this.cur_time < moment().startOf("day")) {
        loai = 1;
      }
      var mat = new Array(y_dim);
      for (var i = 0; i < y_dim; i++) {
        mat[i] = new Array(x_dim).fill(val);
      }
      for (let i = 0; i < y_dim; i++) {
        for (let j = 0; j < x_dim; j++) {
          let tex = (i + 6) % 24;
          mat[i][j] = { loai: loai, text: tex, position: "boxvung" };
        }
      }
      return mat;
    },
  },
  created() {
    this.getListDepartmens().then((res) => {
      this.dataDepartmens = [
        [{ DEVICE_ID: 0, DEVICE_NAME: "Chọn Bộ Phận" }],
        ...res.dataDepartmens,
      ];
    });
    this.getPlanHDRSetLine().then((res) => {
      this.PlanList = res.PlanList;
    });
    this.proc_getLines();
    this.Pro_getScheduPro_Duration();
  },
};
</script>

<style>
.boxline {
  border: 1px;
  border-style: solid;
  border-radius: 2px;
  margin: 1px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: auto;
  width: 60%;
  background-color: #b9d3ee;
}
.group_time {
  font-size: 1.5em;
}
</style>