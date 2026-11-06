<template>
  <div>
    <b-tabs>
      <b-tab title="thực hiện sản xuất">
        <div class="row m-1">
          <label for="">Tháng:</label>
          <input type="month" name="" id="" v-model="v_StartDate" />
        </div>
        <div class="tableFixHead" style="height: 85vh">
          <table class="table-bordered boxCalendar-day_fonts table">
            <thead>
              <!-- <th>PROJ_NAME</th>
              <th>BOM_CODE</th> -->
              <th class="text-truncate">LINE_NAME</th>
              <th v-for="item in days" :key="item">{{ item.substring(0, 2) }}</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataDays_Pro_Plan"  :key="index"
                style="overflow: hidden; height: 10px; width: 10px; line-height: 1"
              >
                <!-- <td style="overflow: hidden; width: 100px">
                  {{ item.PROJ_NAME }}
                </td>
                <td style="overflow: hidden; width: 100px">
                  {{ item.BOM_CODE }}
                </td> -->
                <td class="text-truncate" @click="showShedule_DTL_line(item.LINE_ID_HDR, item.LINE_NAME)">
                  {{ item.LINE_NAME }}
                </td>
                <td v-for="i_date in days" :key="i_date" :class="mau_nen(item[i_date])" class="" style="width: 40px; height: 100%" :title="item['nb-' + i_date]" >
                  <div  v-if="item[i_date]" :class="mau(item[i_date], i_date)"  role="progressbar"
                    :style=" 'width:' + (100 * item[i_date]) / (item['nb-' + i_date] + item[i_date]) + '%'"
                  >
                    {{ item[i_date] }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-tab>
      <b-tab title="Chi tiết lịch SX tạm">
        <MPS_Temp />
      </b-tab>
      <b-tab title="Lịch Sản Xuất">
        <plan-schedure-produc />
      </b-tab>
    </b-tabs>

    <base-dialog
          :active.sync="showScheduleDTL_line"
          :tile="'Chi tiết kế hoạch SX trên line'"
        >
          <Shedule_dtl_line
            :LINE_ID_HDR="LINE_ID_HDR"
            :LINE_NAME="LINE_NAME"
            :StartDate="v_StartDate"
          />
        </base-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";
import BaseDialog from "../../../controls/BaseDialog.vue";
import Shedule_dtl_line from "./Shedule_dtl_line.vue";
import MPS_Temp from './MPS_Temp.vue';
import PlanSchedureProduc from '../Schedure/PlanSchedureProduc.vue';

export default {
  components: { BaseDialog, Shedule_dtl_line, MPS_Temp, PlanSchedureProduc },
  data() {
    return {
      dataDays_Pro_Plan: [],
      v_StartDate: moment().format("YYYY-MM"),
      days: [],
      showScheduleDTL_line: false,
      LINE_ID_HDR: 0,
      LINE_NAME: "",
    };
  },
  watch: {
    v_StartDate() {
      this.setLabelDay();
    },
  },
  methods: {
    ...mapActions(["getDays_Pro_Plan"]),
    showShedule_DTL_line(LINE_ID_HDR, LINE_NAME) {
      this.LINE_ID_HDR = LINE_ID_HDR;
      this.LINE_NAME = LINE_NAME;
      //this.showScheduleDTL_line = true;
      let src = "";
      src =
        "/pmc/Shedule_dtl_line?LINE_ID_HDR=" +
        LINE_ID_HDR +
        "&LINE_NAME=" +
        this.LINE_NAME +
        "&StartDate=" +
        this.v_StartDate;
      window.open(
        src,
        "newWin",
        "fullscreen=yes, scrollbars=auto, titlebar=no  width=600,height=450"
      );
    },
    mau_nen(vlue) {
      if (vlue) {
        return "numbehind_plan";
      } else return "";
    },
    mau(vlue, date) {
      if (vlue) {
        if (moment(date, "DD-MM-YYYY") < moment()) return "boxCalendar-day1";
        else return "boxCalendar-day2";
      } else return "boxCalendar-day0";
    },
    setLabelDay() {
      let i_Days = moment(this.v_StartDate, "YYYY-MM");
      let endMonth = moment(i_Days).endOf("month");
      this.days = [];
      while (i_Days <= endMonth) {
        this.days.push(i_Days.format("DD-MM-YYYY"));
        i_Days = i_Days.add(1, "days");
      }
      //console.log(this.days);
      this.Pro_getDays_Pro_Plan();
    },
    Pro_getDays_Pro_Plan() {
      let data = {
        month: this.v_StartDate,
      };
      this.getDays_Pro_Plan(data).then((res) => {
        this.dataDays_Pro_Plan = res.dataDays_Pro_Plan[0];
      });
    },
  },
  created() {
    this.setLabelDay();
  },
};
</script>

<style scoped>
.boxCalendar-day_font {
  font-size: 12px;
  text-align: center;
  font-weight: 400;
}
.boxCalendar-day0 {
  fill: #ebedf0;
  padding: 0.9em 0.5em 0.9em 0;
  shape-rendering: geometricPrecision;
  background-color: #ebedf0;
  border-radius: 2px;
  outline: 1px solid rgba(27, 31, 35, 0.06);
  outline-offset: -1px;
}
.boxCalendar-day1 {
  padding: 0.9em 0.5em 0.9em 0;
  fill: #aeaeae;
  shape-rendering: geometricPrecision;
  background-color: #aeaeae;
  border-radius: 2px;
  outline: 1px solid #aeaeae;
  outline-offset: -1px;
  height: 100%;
  max-width: 40px;
}
.boxCalendar-day2 {
  padding: 0.9em 0.5em 0.9em 0;
  margin: 0;
  fill: #009933;
  shape-rendering: geometricPrecision;
  background-color: #009933;
  border-radius: 2px;
  outline: 1px solid #009933;
  outline-offset: -1px;
  height: 100%;
  max-width: 40px;
}
.numbehind_plan {
  height: 100%;
  background-color: #e67e22;
  margin: 0;
  padding: 0;
}
</style>