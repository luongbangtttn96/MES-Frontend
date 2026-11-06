<template>
  <div class="containen-bom">
    <title-page :titlepage="'BOM Cost'"/>
    <div class="justify-content-md-between row">
      <div class="col-md-6 row">Project:<select-pro-ject v-model="PROJ_OBJECT" @getValue="handgetBomCost()"/> </div>
      <div>Tỷ giá: <b>{{ tygia }}/USD</b></div>
      <div class="le_trai">
        <span>Export to:</span>
        <button id="Xlsx" @click="exportData('Xlsx')">Xlsx</button>
        <button id="Xls" @click="exportData('Xls')">Xls</button>
        <button id="CSV" @click="exportData('CSV')">CSV</button>
      </div>
    </div>
    
    <div class="tableFixHead1">
      <table class="table" id="exportable_bom">
        <thead>
          <tr>
            <th>No.</th>
            <th>LEVEL</th>
            <th style="min-height: 80px; min-width: 150px">ERP CODE</th>
            <th>DESCRIPTION</th>
            <th>UNIT</th>
            <th>UseQty</th>
            <th>VND_COST</th>
            <th>VND_TOTAL</th>
            <th>USD_COST</th>
            <th>USD_TOTAL</th>
            <th>L/T</th>
            <th>MOQ</th>
            <th>Location</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in dataBomHDRDTL"
            :key="index"
            :style="
              item.LEVEL == 0
                ? 'font-size: 1.2em; font-weight:  bold;'
                : '' + item.LEVEL == 1
                ? 'font-size: 1.1em; font-weight:  bold;'
                : ''
            "
          >
            <td>{{ item.ID }}</td>
            <td>{{ item.LEVEL }}</td>
            <td>{{ item.PART_NUM }}</td>

            <td v-if="item.LEVEL == 0" colspan="4">
              {{ item.PROJ_NAME }}
            </td>
            <td v-if="item.LEVEL == 1" colspan="2">
              {{ item.BOM_NAME }}
            </td>
            <td v-if="item.LEVEL == 2">{{ item.DESCRIPTION }}</td>

            <td v-if="item.LEVEL == 2">{{ item.UNIT }}</td>

            <td v-if="item.LEVEL != 0">{{ item.QTY }}</td>

            <td v-if="item.LEVEL != 0">
              {{ item.VND_COST == null ? "" : Math.ceil(item.VND_COST) }}
            </td>
            <td>
              {{ item.VND_TOTAL? Math.ceil(item.VND_TOTAL):0 }}
            </td>
            <td>
              {{ item.USD_COST == null ? "" : item.USD_COST.toFixed(6) }}
            </td>
            <td>
              {{ item.USD_TOTAL == null ? "" : item.USD_TOTAL.toFixed(6) }}
            </td>
            <td>{{ item.LEADTIME }}</td>
            <td>{{ item.MOQ }}</td>
            <td>{{ item.LOCATION }}</td>
            <td>{{ item.NODE }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import XLSX from "xlsx";
import SelectProJect from '../../../controls/SelectProject/SelectProJect.vue';
import TitlePage from '../../../controls/TitlePage.vue';
export default {
  components: { SelectProJect, TitlePage },
  data() {
    return {
      Pro_QTY: 1,
      dataBomHDRDTL: [],
      PROJ_OBJECT:'',
      tygia:0,
    };
  },
  methods: {
    ...mapActions(["getBomCostDTL_Project",'get_tyGiaUSD']),

    handgetBomCost(){
      this.pro_getBomCostDTL_Project()
    },
    exportData(type, fn, dl) {
      //console.log(type);
      var elt = document.getElementById("exportable_bom");
      var wb = XLSX.utils.table_to_book(elt, { raw: true });
      var ws = wb.Sheets["BOM"];
      switch (type) {
        case "Xlsx":
          XLSX.utils.sheet_add_aoa(
            ws,
            [["Created " + new Date().toISOString()]],
            {
              origin: -1,
            }
          );
          XLSX.writeFile(wb, "Report.xlsx");
          break;
        case "Xls":
          XLSX.utils.sheet_add_aoa(
            ws,
            [["Created " + new Date().toISOString()]],
            {
              origin: -1,
            }
          );
          XLSX.writeFile(wb, "Report.xls");
          break;
        case "CSV":
          XLSX.utils.sheet_to_csv(ws);
          XLSX.writeFile(wb, "Report.csv");
          break;

        default:
          break;
      }
      // XLSX.utils.sheet_add_aoa(ws, [["Created " + new Date().toISOString()]], {
      //   origin: -1,
      // });
      // XLSX.writeFile(wb, "Report.xlsx");
    },
    TinhCOST(start) {
      let totalCostUsd = 0,
        totalCostUsdAll = 0,
        totalCostVND = 0,
        totalCostVNDAll = 0;
      for (let i = this.dataBomHDRDTL.length - 1; i >= start; i--) {
        if (this.dataBomHDRDTL[i].LEVEL == 2) {
          this.dataBomHDRDTL[i].VND_TOTAL =
            this.dataBomHDRDTL[i].QTY * this.dataBomHDRDTL[i].VND_COST;
          totalCostVND = totalCostVND + this.dataBomHDRDTL[i].VND_TOTAL;

          this.dataBomHDRDTL[i].USD_TOTAL =
            this.dataBomHDRDTL[i].QTY * this.dataBomHDRDTL[i].USD_COST;
          totalCostUsd = totalCostUsd + this.dataBomHDRDTL[i].USD_TOTAL;
        }
        if (this.dataBomHDRDTL[i].LEVEL == 1) {
          this.dataBomHDRDTL[i].USD_COST = totalCostUsd;
          this.dataBomHDRDTL[i].VND_COST = totalCostVND;

          // lấy giá trị của Sản phẩm
          // totalCostVNDAll = totalCostVNDAll + this.dataBomHDRDTL[i].VND_TOTAL;
          // totalCostUsdAll = totalCostUsdAll + this.dataBomHDRDTL[i].USD_TOTAL;

          (totalCostUsd = 0), (totalCostVND = 0);
        }
        // if (this.dataBomHDRDTL[i].LEVEL == 0) {
        //   this.dataBomHDRDTL[i].USD_TOTAL = totalCostUsdAll;
        //   this.dataBomHDRDTL[i].VND_TOTAL = totalCostVNDAll;
        // }
       
      }
    },
    pro_getBomCostDTL_Project(){
      this.Pro_QTY = this.$route.query.qty;
      let data = { 
        PDD_ID: this.$route.query.id,
        PROJ_CODE: this.PROJ_OBJECT
      };
      this.getBomCostDTL_Project(data).then((res) => {
        this.dataBomHDRDTL = res.dataBomHDRDTL;

        this.TinhCOST(0);

        for (let i = 0; i < this.dataBomHDRDTL.length; i++) {
          if (this.dataBomHDRDTL[i].LEVEL == 1) {
            this.dataBomHDRDTL.forEach((item) => {
              if (
                item.LEVEL == 2 &&
                item.PART_NUM == this.dataBomHDRDTL[i].PART_NUM
              ) {
                item.VND_COST = this.dataBomHDRDTL[i].VND_COST;
                item.USD_COST = this.dataBomHDRDTL[i].USD_COST;
                item.VND_TOTAL = item.VND_COST * item.QTY;
                item.USD_TOTAL = item.USD_COST * item.QTY;
              }
            });
            this.TinhCOST(i);
          }
        }
        // Lấy đơn giá sản phẩm
        let semi_pro = this.dataBomHDRDTL.filter((item) => item.LEVEL == 1 && item.PART_NUM==this.dataBomHDRDTL[0].PART_NUM)
        let toUSD=semi_pro[0].VND_COST/((this.tygia && this.tygia==0)?1:this.tygia)
        
        //this.dataBomHDRDTL[0].VND_TOTAL = semi_pro[0].VND_COST;
        this.dataBomHDRDTL[0].USD_TOTAL = semi_pro[0].USD_COST + toUSD;
        //console.log(this.dataBomHDRDTL);
      }); 
    }
  },
  created(){
    this.get_tyGiaUSD().then(res=>{
      this.tygia=res.tyGiaUSD
    })
    this.pro_getBomCostDTL_Project()
  },
};
</script>

<style scoped>
.containen-bom {
  max-width: 98%;
  height: auto;
  margin: auto;
  margin-top: 2px;
}
.BomHDRDLT {
  float: right;
}
span {
  margin: 20px;
}
button {
  padding: 6px 20px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  position: relative;
  top: 10px;
}
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
/* tr:nth-child(even) {
  background-color: #dddddd;
} */
</style>