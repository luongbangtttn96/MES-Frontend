<template>
  <div @click="handHideMenuPupo()">
    <div class="row col-md-12">
      <!-- thông tin nhu cầu -->
      <div class="col-md-2">
        <!-- Tên dự án -->
        <b>Dự án: </b>
        <p>{{ ObjNhuCau.projec }}</p>
      </div>
      <div class="col-md-2">
        <!-- Từ Ngày -->
        <b>Từ ngày:</b>
        <p>{{ ObjNhuCau.START_DEMANDS }}</p>
      </div>
      <div class="col-md-2">
        <!-- Đến Ngày -->
        <b>Đến ngày:</b>
        <p>{{ ObjNhuCau.END_DEMANDS }}</p>
      </div>
      <div class="col-md-2">
        <!-- Số lượng -->
        <b> Số lượng:</b>
        <p>{{ ObjNhuCau.QTY }}</p>
      </div>
    </div>
    <button
      style="font-size: 16px"
      @click="handSaveDemandMaterial(ObjNhuCau.id)"
    >
      Lưu<i class="fa fa-floppy-o"></i>
    </button>
    <button
      style="font-size: 16px"
      @click="handXacNhanHoanThanhCongDoanMRP(ObjNhuCau.id, 2)"
    >
      Xác Nhận Hoàn thành<i class="fa fa-check" style="color: green"></i>
    </button>
    <button style="font-size: 16px" @click="handDanhSachNLBoSung(ObjNhuCau.id)">
      Nguyên Liệu Cần Mua
    </button>

    <div class="row m-2">
      <chi-thi-mau
        :list_ChiThiMau="dataListChiThiMau"
        @ActionChithiMau="ActionChithiMau"
      />
    </div>
    <div class="tableFixHead" style="height: 90vh">
      <table class="table table-sm">
        <thead>
          <tr class="p-0">
            <th class="p-0" style="min-height: 70px; min-width: 60px" rowspan="2" >
              STT
            </th>
            <th
              class="p-0" style="min-height: 70px; min-width: 150px" rowspan="2" >
              PARTNUM
            </th>
            <th
              class="p-0"  style="min-height: 70px; min-width: 150px" rowspan="2">
              TÊN NGUYÊN LIỆU
            </th>
            <th
              class="p-0" style="min-height: 70px; min-width: 80px" rowspan="2">
              SL CƠ SỞ
            </th>
            <th
              class="p-0" style="min-height: 70px; min-width: 60px"  rowspan="2">
              ĐƠN VI
            </th>
            <th class="p-0"  style="min-height: 70px; min-width: 160px"  colspan="2" >
              NGUYÊN LIỆU CẦN
            </th>
            <!-- <th style="min-height: 70px; min-width:60px">HAO HỤT</th> -->
            <th class="p-0" style="min-height: 70px; min-width: 80px" colspan="2" >
              TỒN KHO
              <button style="font-size: 12px" @click="handGetTongHopTonKho(ObjNhuCau.id)" >
                <i class="fa fa-download"></i>
              </button>
            </th>
             <th  class="p-0" style="min-height: 70px; min-width: 60px" rowspan="2" >
              NL DỰ OW
              <button
                style="font-size: 12px"
                @click="handGetMateralMuadu_onway(ObjNhuCau.id)"
              >
                <i class="fa fa-download"></i>
              </button>
            </th>
            <th class="p-0" style="min-height: 70px; min-width: 60px"  rowspan="2" >
              NL THỘC D/A Đ/SX
              <button
                style="font-size: 12px"
                @click="handGetMateralChoDuAnDangSX(ObjNhuCau.id)"
              >
                <i class="fa fa-download"></i>
              </button>
            </th>
            <th  class="p-0"  style="min-height: 70px; min-width: 60px" rowspan="2" title="Số nguyên liệu đáp ứng cho SX dự án" >
              SỐ ĐÁP ỨNG
            </th>
            <th class="p-0" style="min-height: 70px; min-width: 60px" rowspan="2" title="Số nguyên liệu còn thiếu" >
              SỐ THIẾU
            </th>
            
            <th class="p-0" colspan="3" title="Số nguyên liệu còn thiếu">
              DỰ KIẾN<a
                class="btn p-0"
                style="color: darkblue"
                @click="handAllPO()"
                >{{ showIc }}</a
              >
            </th>
          </tr>
          <tr>
            <th style="min-height: 70px; min-width: 80px">SỐ NL</th>
            <th style="min-height: 70px; min-width: 60px">HAO HỤT</th>
            <th style="min-height: 70px; min-width: 80px">KHO</th>
            <th style="min-height: 70px; min-width: 60px">SẢN XUẤT</th>
            <th  class="p-0" style="min-height: 70px; min-width: 60px"> NGÀY MUA </th>
            <th style="min-height: 70px; min-width: 60px">SỐ NL</th>
            <th style="min-height: 70px; min-width: 60px">NGÀY NHẬN</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="cursor: pointer"
            v-for="(item, index) in showdataMaterials"
            :key="index"
            :class="mau(item)"
          >
            <td style="min-height: 70px; min-width: 60px">{{ index + 1 }}</td>
            <td style="min-height: 70px; min-width: 150px">
              <input
                type="checkbox"
                v-model="item.NCNR"
                @change="handSetNCNR_REQ_Material_Demand({ NCNR: item.NCNR, PART_NUM: item.PART_NUM })"
              />
              <span
                @dblclick="handSetMaterialPhu(item.PART_NUM)"
                title="Nháy đúp để cập nhật nguyên liệu"
                >{{ item.PART_NUM }}</span
              >
            </td>
            <td>{{ item.PART_NAME }}</td>
            <td style="min-height: 70px; min-width: 80px">
              {{ item.QTY_UNIT }}
            </td>
            <td style="min-height: 70px; min-width: 60px">{{ item.UNIT }}</td>
            <td style="min-height: 70px; min-width: 60px">{{ item.QTY }}</td>
            <td style="min-height: 70px; min-width: 60px">
              {{ item.QTY_WASTAGE }}
            </td>
            <td style="min-height: 70px; min-width: 60px"> {{ item.QTY_STOC }} </td>
            <td style="min-height: 70px; min-width: 60px">{{ item.QTY_PROC }}</td>
            <td tyle="min-height: 70px; min-width: 60px">{{item.QTY_ONWAY}}</td>
            <td
              style="min-height: 70px; min-width: 60px"
              @dblclick="handObjectPhuthuoc($event, item.PART_NUM)"
              title="Nháy đúp chuột để lấy dự án phụ thuộc"
            >
              {{ item.QTY_PRODUC }}
            </td>
            <td style="min-height: 70px; min-width: 60px">
              {{ item.QTY_STOC + item.QTY_ONWAY + item.QTY_PROC - item.QTY_PRODUC }}
            </td>
            
            <!--item.QTY_RESPONSE -->
            <td style="min-height: 70px; min-width: 60px">
              {{
                (item.QTY + item.QTY_WASTAGE -  (item.QTY_STOC + item.QTY_ONWAY + item.QTY_PROC - item.QTY_PRODUC)) > 0
                  ? item.QTY + item.QTY_WASTAGE - ( item.QTY_STOC + item.QTY_ONWAY + item.QTY_PROC - item.QTY_PRODUC)
                  : 0
              }}
            </td>
            <td style="min-height: 70px; min-width: 60px">{{ item.PROPOSED_DATE_PO }}</td>
            <td style="min-height: 70px; min-width: 60px">{{ item.QTY_REQ }}</td>
            <td style="min-height: 70px; min-width: 60px">
              {{ item.EXP_RECEIVED_DATE }}
            </td>
            <!-- <td style="min-height: 70px; min-width:60px">
                <input type="text" v-model="item.extra" style="width:80px">
              </td> -->
            <!-- <td style="min-height: 70px; min-width:100px">USED</td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="menuPopu" id="menuPopu">
      <du-an-phu-thuoc :Demand_PART="Demand_PART" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ChiThiMau from "../../../controls/ChiThiMau.vue";
import DuAnPhuThuoc from "./DuAnPhuThuoc.vue";

export default {
  components: { DuAnPhuThuoc, ChiThiMau },
  data() {
    return {
      ObjNhuCau: {},
      dataMaterials: [],
      //showdataMaterials:[],
      STATUS: true,
      isSaveTon: false,
      isSaveMateria_DangSX: false,
      isSaveMaterialDemand: false,
      irhcode: null,
      irhIdERP: null,
      uocsx: 0,
      showIc: "+",
      Demand_PART: {},
      MauSelect: "",

      dataChithimau: [
        { text: "Đã đủ", color: "#009933" },
        { text: "Đang vận chuyển", color: "#00ffbb" },
        { text: "Đã mua", color: "#ffff00" },
        { text: "Chưa mua", color: "#f50707" },        
        { text: "Nguyên liệu phụ", color: "#aeaeae" },
      ],
    };
  },
  computed: {
    showdataMaterials() {
      let data;
      if (this.MauSelect == "") {
        if (this.showIc == "+") {
          data = this.dataMaterials.filter((item) => {
            return item.rn == 1;
          });
        } else {
          data = this.dataMaterials;
        }
        data.sort((a, b) => {
          return a.isSEC_MATERIAL - b.isSEC_MATERIAL;
        });
        //console.log(data);
      } else {
        data = this.dataMaterials.filter((item) => {
          return item.mau == this.MauSelect;
        });
      }
      console.log(data);
      return data;
    },
    dataListChiThiMau() {
      let jsondata = JSON.stringify(this.dataChithimau);
      let datact = JSON.parse(jsondata);

      let m1 = 0,
        m2 = 0,
        m3 = 0,
        m4 = 0,
        m5 = 0;
      let m = "";
      this.dataMaterials.forEach((item) => {
        m = this.mau(item);
        if (m == "mauNenXanh") {
          m1 = m1 + 1;
        }
        m = this.mau(item);
        if (m == "mauNenXanhnGoc") {
          m2 = m2 + 1;
        }

        if (m == "mauNenVang") {
          m3 = m3 + 1;
        }

        if (m == "mauNenDo") {
          m4 = m4 + 1;
        }

        if (m == "mauNenXam") {
          m5 = m5 + 1;
        }
      });
      console.log("jkjk", this.dataChithimau);

      datact[0].text = `${datact[0].text} ${m1}`;
      datact[1].text = `${datact[1].text} ${m2}`;
      datact[2].text = `${datact[2].text} ${m3}`;
      datact[3].text = `${datact[3].text} ${m4}`;
      datact[4].text = `${datact[4].text} ${m5}`;


      return datact;
    },
  },
  methods: {
    ...mapActions([
      "getMateralDemands_IDDemand",
      "getTongHopTonKhoMaterial",
      "getMateralChoDuAnDangSX",
      "ERPgetObReceived",
      "saveStocOfDemand",
      "ChyenTrangThaiNhuCauSX",
      "LuuNhapNLMRP",
      "setNCNR_REQ_Material_Demand",
      'GetMateralMuadu_onway'
    ]),
    handSetNCNR_REQ_Material_Demand(item) {
      let data={
        PDD_ID:this.$route.query.id,
        NCNR:item.NCNR,
        PART_NUM: item.PART_NUM
      }
      this.setNCNR_REQ_Material_Demand(data);
    },
    handGetMateralMuadu_onway(id){
      this.GetMateralMuadu_onway({ id: id }).then(res=>{
        this.dataMaterials.forEach((element, i) => {
          if (this.dataMaterials[i].rn == 1) {
            let data = res.dataMateralMuadu_onway.filter(
              (vattu) => vattu.PART_NUM == this.dataMaterials[i].PART_NUM
            );
            this.dataMaterials[i].QTY_ONWAY = data[0] ? data[0].QTY_ONWAY : 0;
          }
        });
      })
    },
    ActionChithiMau(p_color) {
      this.MauSelect = p_color;
    },
    handHideMenuPupo() {
      document.querySelector(".menuPopu").classList.remove("hienMenuPopu");
    },
    handObjectPhuthuoc(event, PART_NUM) {
      this.Demand_PART = {
        PDD_ID: this.$route.query.id,
        PART_NUM: PART_NUM,
      };
      event.stopPropagation();
      let menuPopu = document.getElementById("menuPopu");
      menuPopu.style.top = event.layerY + "px";
      menuPopu.style.left = event.layerX + "px";
      document.querySelector(".menuPopu").classList.toggle("hienMenuPopu");
    },
    handSetMaterialPhu(PART_NUM) {
      let src = "";
      src = "/UpdateTypeMaterial?partNum=" + PART_NUM;
      window.open(
        src,
        "formAddTypeMaterial",
        "fullscreen=yes, scrollbars=auto,width=600,height=450, titlebar=no"
      );
    },
    mau(item) {
      // Xám Vật tư không tính nguyên liệu Mua
      if (item.isSEC_MATERIAL == 1 || item.IS_SIME == 1) {
        item.mau = "#aeaeae";
        return "mauNenXam";
      }
      // màu xanh đủ nguyên liệu
      if (item.QTY + item.QTY_WASTAGE - item.QTY_RESPONSE <= 0) {
        item.mau = "#009933";
        return "mauNenXanh";
      }
      // Màu xanh lá cây đang vận chuyển           
      if (item.QTY_Ship  && item.QTY_Ship>0) {
        item.mau = "#00ffbb";
        return "mauNenXanhnGoc";
      }
      // vàng đã có thông tin mua hàng 
      if (item.QTY + item.QTY_WASTAGE - item.QTY_RESPONSE > 0 && item.PO_QTY) {
        item.mau = "#ffff00";
        return "mauNenVang";
      }

      // đỏ chưa có thông tin mua hàng
      if (
        item.QTY + item.QTY_WASTAGE - item.QTY_RESPONSE > 0 &&
        !item.PO_QTY &&
        !item.EXP_RECEIVED_DATE
      ) {
        item.mau = "#f50707";
        return "mauNenDo";
      }
    },
    handAllPO() {
      if (this.showIc === "+") {
        this.showIc = "-";
        //this.showdataMaterials=this.dataMaterials.filter(item=>() => { return item.rn==1})
      } else {
        this.showIc = "+";
        //this.showdataMaterials=this.dataMaterials
      }
    },
    handDanhSachNLBoSung(id) {
      let src = "";
      src =
        "/pmc/Form_TongHopBoSungNL?id=" +
        this.$route.query.id +
        "&projec=" +
        this.$route.query.projec +
        "&Start=" +
        this.$route.query.Start +
        "&end=" +
        this.$route.query.end +
        "&qty=" +
        this.$route.query.qty +
        "&PO_CODE=" +
        this.$route.query.PO_CODE;
      window.open(
        src,
        "Form_TongHopBoSungNL",
        "fullscreen=yes, scrollbars=auto, titlebar=no"
      );
    },
    Proc_MRPUocSoSX(id) {
      this.MRPuocSoSX({ code: id }).then((res) => {
        this.ObjNhuCau.UOC = res.dataMRPuocSoSX;
        this.$forceUpdate();
      });
    },
   
    handXacNhanHoanThanhCongDoanMRP(id, Status) {
      //console.log(id,Status);
      if (confirm("Bạn có xác nhận hoàn thành công đoạn này")) {
        this.ChyenTrangThaiNhuCauSX({ id: id, Status: Status });
      }
    },
    handLuuNhapNLMRP(id) {
      this.LuuNhapNLMRP({
        id: id,
        data: this.dataMaterials,
        irhcode: this.irhcode,
        irhIdERP: this.irhIdERP,
      }).then(() => {
        this.ProGetMateralDemands_IDDemand(this.$route.query.id);
        //this.Proc_MRPUocSoSX(id);
      });
    },
    handERPgetObReceived() {
      if ((this.irhcode = prompt("Nhập mã đơn hàng"))) {
        this.ERPgetObReceived(this.irhcode).then((res) => {
          //console.log(this.irhcode, res.ObRECEIVED);
          if (res.ObRECEIVED) {
            this.irhIdERP = this.irhcode;
            this.irhcode = res.ObRECEIVED.IRH_CODE;

            this.dataMaterials.forEach((el, i) => {
              this.dataMaterials[i].extra = 0;
              res.ObRECEIVED.dsVattu.forEach((element) => {
                if (el.PART_NUM == element.PART_NUM) {
                  this.dataMaterials[i].extra =
                    this.dataMaterials[i].extra + element.REC_QUANTITY;
                }
              });
            });
            this.$forceUpdate();
          }
          //console.log(this.dataMaterials);
        });
      }
    },
    ProGetMateralDemands_IDDemand(id) {
      this.getMateralDemands_IDDemand({ id: id }).then((res) => {
        this.dataMaterials = res.dataMaterials;
        this.dataMaterials.forEach((element) => {
          element.extra = 0;
          if (element.PART_NUM.includes("PGC")) element.checkUoc = false;
          else element.checkUoc = true;
          if (element.isSEC_MATERIAL == true) element.checkUoc = false;
        });
        //console.log(this.dataMaterials);
      });
    },
    handGetTongHopTonKho(id) {
      this.getTongHopTonKhoMaterial({ id: id }).then((res) => {
        this.dataMaterials.forEach((element, i) => {
          if (this.dataMaterials[i].rn == 1) {
            let data = res.dataStocMaterials.filter(
              (vattu) => vattu.PART_NUM == this.dataMaterials[i].PART_NUM
            );
            this.dataMaterials[i].QTY_STOC = data[0] ? data[0].QTY : 0;
            this.dataMaterials[i].QTY_PROC = data[0] ? data[0].QTY_PROC : 0;
          }
        });
        this.isSaveTon = true;
      });
    },
    handGetMateralChoDuAnDangSX(id) {
      this.getMateralChoDuAnDangSX({ id: id }).then((res) => {
        //console.log(res.dataMateralChoDuAnDangSX,this.dataMaterials);
        
        if (res.dataMateralChoDuAnDangSX) {

          this.dataMaterials.forEach((el, i) => {
            this.dataMaterials[i].QTY_PRODUC=0
            res.dataMateralChoDuAnDangSX.forEach((element) => {
              //console.log(el.PART_NUM== element.PART_NUM && Number(el.rn)==1,element.remains );              
              if (el.PART_NUM == element.PART_NUM && Number(el.rn) == 1) {
                this.dataMaterials[i].QTY_PRODUC = element.remains;
              }
            });
          });
          this.$forceUpdate();
        }
        this.isSaveMateria_DangSX = true;
        //this.dataMateralChoDuAnDangSX=res.dataMateralChoDuAnDangSX
      });
    },
    handSaveDemandMaterial(id) {
      //console.log(this.isSaveTon ,this.isSaveMateria_DangSX);
      // if (this.isSaveTon && this.isSaveMateria_DangSX) {
      this.proSaveStocOfDemand(id);

      // }else{
      //   confirm('Cần phải tổng hợp số liệu tồn kho và sô nguyên liệu còn cho dự án đang SX')
      // };
      // if(this.isSaveMaterialDemand){

      // };
    },
    proSaveStocOfDemand(id) {
      
      
      let data = this.showdataMaterials.filter((item) => item.rn == 1);
      //console.log(data);
      this.saveStocOfDemand({ id: id, data: data }).then(() => {
        //this.Proc_MRPUocSoSX(id);
        this.ProGetMateralDemands_IDDemand(this.$route.query.id);
      });
    },
  },
  created() {
    this.ObjNhuCau.id = this.$route.query.id;
    this.ObjNhuCau.projec = this.$route.query.projec;
    this.ObjNhuCau.START_DEMANDS = this.$route.query.Start;
    this.ObjNhuCau.END_DEMANDS = this.$route.query.end;
    this.ObjNhuCau.QTY = this.$route.query.qty;
    this.ObjNhuCau.UOC = 0;
    //this.Proc_MRPUocSoSX(this.$route.query.id);
    this.ProGetMateralDemands_IDDemand(this.$route.query.id);
    this.showIc = "+";
  },
};

</script>

<style scoped>
.boxNote {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  position: relative;
  top: 6px;
  left: 5px;
}
.menuPopu {
  background-color: #ffffff;
  color: black;
  position: absolute;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.3);
  display: none;
  z-index: 10;
}
.menuPopu a {
  display: block;
  text-decoration: none;
}
.menuPopu a:hover {
  background-color: #95a5a6;
}
.hienMenuPopu {
  display: block;
}
</style>