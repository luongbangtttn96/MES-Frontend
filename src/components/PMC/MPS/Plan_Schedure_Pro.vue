<template>
  <div>
    <div class="row">
      <div class="col-md-2">
        <div class="form-group" style="padding: 0 0 0 10px">
          <label for="DepatmenControlSelect1">Bộ Phận:</label>
          <select
            class="form-control small"
            id="DepatmenControlSelect1"
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
        <!-- <div class="form-group" style="padding:0 0 0 5px">
            <label for="LineControlSelect1">Line:</label>
            <select class="form-control small" 
            id="LineControlSelect1"
            @change="changeSelect($event)"
            >
            <option v-for="item in dataDepartmens"
                :key="item.DEPT_ID" 
                :value="item.DEPT_ID"> {{item.DEPT_NAME}} </option>
            </select>
        </div> -->
      </div>
      <div class="col-md-8">
        <div class="form-group" style="padding: 0 0 0 10px">
          <label><strong> Danh sách kế hoạch: </strong></label>
          <Table_PlanHDR
            :dataPlanHDR="dataPlanHDR"
            :Check="false"
            :height_tab="130"
          />
        </div>
      </div>
      <div>
        <div style="padding: 15px">
          <button class="btn btn-primary" @click="clickSetPlan">
            Lập lịch SX
          </button>
        </div>

        <div style="padding: 15px">
          <a href="/pmc/form_setScheDuPro" class="btn btn-primary btn-sm"
            >>Lập lịch SX 2</a
          >
        </div>
      </div>
    </div>
    <div class="divrow">
      <div class="ngay">
        {{ Ngay }}
        <div>
          <a href="#" @click="ngayTruoc()">&lt;&lt;</a>
          <a href="#" @click="ngaySau()"> &gt;&gt;</a>
        </div>
      </div>
      <headerline :dataSchedurProLine="dataSchedurProLine" />
    </div>
    <schedureNgay
        v-for="(item, index) in dataSchedurProLine"
        :key="index"
        :datangay="item"
      />
    
    <BaseDialog :active.sync="showSetPlan" :tile="'Lập kế hoạch SX:'">
      <setPlan />
    </BaseDialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Table_PlanHDR from "../components/TablePlanHDR/Table_PlanHDR.vue";
//import shecdureProLine from './Shecdure_Pro_Line.vue'
import schedureNgay from "./Schedure_Pro_day.vue";
import headerline from "./headerLine.vue";
import BaseDialog from "../../controls/BaseDialog.vue";
import setPlan from "./SET/SetPlan.vue";
export default {
  data() {
    return {
      dataDepartmens: [],
      departmenSelect: 0,
      dataPlanHDR: [],
      today: new Date(),
      Ngay: "",
      hours: [
        23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5,
        4, 3, 2, 1, 0,
      ],
      showSetPlan: false,
      dataSchedurProLine: [],
    };
  },
  computed: {},
  components: {
    Table_PlanHDR,
    // shecdureProLine,
    headerline,
    schedureNgay,
    BaseDialog,
    setPlan,
  },
  methods: {
    ...mapActions([
      "getListDepartmens",
      "getPlanScheureProLineDay",
      "getListPlanHDR",
    ]),
    clickSetPlan() {
      this.showSetPlan = true;
    },
    changeSelect(event) {
      this.departmenSelect = event.target.value;
      this.getListPlanHDR(this.departmenSelect).then((res) => {
        this.dataPlanHDR = res.dataPlanHDR;
        //console.log('data:', this.dataPlanHDR)
      });
      this.getscherdureDay();
    },
    ngayTruoc() {
      this.today.setDate(this.today.getDate() - 1);
      this.Ngay = this.NgayTxt(this.today);
      this.getscherdureDay();
      //console.log(this.today);
    },
    ngaySau() {
      let t = this.today;
      t.setDate(t.getDate() + 1);
      this.today = t;
      this.Ngay = this.NgayTxt(this.today);
      this.getscherdureDay();
      //console.log(this.today);
    },
    NgayTxt(d) {
      return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
      // let x= this.today.toLocaleString().split("/")
      // this.Ngay= x[1] + "/" + x[0] + "/" + x[2].substr(0,4)
    },

    getscherdureDay() {
      let para = this.NgayTxt(this.today);
      //console.log("Dep:", this.departmenSelect);
      let par_data = {
        date: para,
        deparid: this.departmenSelect,
      };
      this.getPlanScheureProLineDay(par_data).then((res) => {
        if (this.dataSchedurProLine.length > 0) {
          this.dataSchedurProLine.shift();
        }
        this.dataSchedurProLine.push(res.dataSchedurProLine);
        //console.log(this.dataSchedurProLine)
      });
    },
  },
  created() {
    this.Ngay = this.NgayTxt(this.today);
    //console.log(this.NgayTxt(), this.viewdate(this.today));
    this.getListDepartmens().then((res) => {
      this.dataDepartmens = [
        [{ DEVICE_ID: 0, DEVICE_NAME: "Chọn Bộ Phận" }],
        ...res.dataDepartmens,
      ];
    });
    this.getListPlanHDR().then((res) => {
      this.dataPlanHDR = res.dataPlanHDR;
      //console.log("data:", this.dataPlanHDR);
    });
    let x = this.today.toLocaleString().split("/");
    this.getscherdureDay()
   
  },
};
</script>

<style>
.hours {
  border-width: 2px;
  border-style: outset;
  height: 50px;
  width: 75px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 1px;
  padding-top: 0;
}
.ngay {
  border-width: 2px;
  border-style: outset;
  height: 50px;
  width: 75px;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  margin: 1px;
  padding-top: 0;
}
</style>