<template>
  <div>
    <div class="">
      <label>Line Name:</label> <b>{{ v_LINE_NAME }}</b>
    </div>
    <div class="tableFixHead" style="height: 85vh">
      <table class="table-bordered boxCalendar-day_fonts">
        <thead>
          <th class="text-truncate">BOM CODE</th>
          <th v-for="item in days" :key="item">{{ item.substring(0, 2) }}</th>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in dataSheduleDTL_Line"
            :key="index"
            style="overflow: hidden; height: 10px; width: 10px"
          >
            <td class="text-truncate">
              {{ item.BOM_CODE }}
            </td>
            <td
              v-for="i_date in days"
              :key="i_date"
              :class="mau_nen(item[i_date])"
              class=""
              style="width: 40px"
              :title="item['nb-' + i_date]"
            >
              <div
                v-if="item[i_date]"
                :class="mau(item[i_date], i_date)"
                role="progressbar"
                :style="
                  'width:' +
                  (100 * item[i_date]) / (item['nb-' + i_date] + item[i_date]) +
                  '%'
                "
              >
                {{ item[i_date] }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      dataSheduleDTL_Line: [],
      v_StartDate: "",
      v_LINE_ID_HDR: 0,
      v_LINE_NAME: "",
      days: [],
    };
  },
  props: {
    LINE_ID_HDR: Number,
    LINE_NAME: String,
    StartDate: String,
  },
  methods: {
    ...mapActions(["getScheduleDTL_Line"]),
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
    },
  },
  created() {
    this.v_StartDate = this.StartDate || this.$route.query.StartDate;
    this.v_LINE_ID_HDR = this.LINE_ID_HDR || this.$route.query.LINE_ID_HDR;
    this.v_LINE_NAME = this.LINE_NAME || this.$route.query.LINE_NAME;
    this.setLabelDay();
    let data = {
      LINE_ID_HDR: this.v_LINE_ID_HDR,
      month: this.v_StartDate,
    };
    this.getScheduleDTL_Line(data).then((res) => {
      this.dataSheduleDTL_Line = res.dataSheduleDTL_Line;
    });
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