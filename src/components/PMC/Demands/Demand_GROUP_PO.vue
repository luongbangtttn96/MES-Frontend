
<template>
  <div @click="handhienDemandsPopu()">
    <title-page :titlepage="'Nhóm demand'" />
    <b-card header-tag="header" footer-tag="footer">
      <b-card-text>
        <div class="row">
          <div class="col">
            <label>Groups:</label>
            <select class="form-control" multiple size="6" style="width: 100%">
              <option
                v-for="(item, index) in dataDemand_Group_PO"
                :key="index"
                :value="item.PGP_ID"
                @click="handSelectGroup_PO(item)"
              >
                <b
                  ><span style="min-width: 15px"
                    >{{ item.PGP_ID }}
                    :
                  </span></b
                >
                {{ item.PGP_NAME }}
              </option>
            </select>
          </div>

          <div class="col-md-9">
            <div class="col-md-3">
              <label style="width: 50px">Tên:</label>
              <input type="text" v-model="dataGroup_PO_NEW.PGP_NAME" />
            </div>
            <div class="col-md-9">
              <label style="width: 50px">Mô tả:</label
              ><textarea
                cols="80"
                rows="1"
                v-model="dataGroup_PO_NEW.DESCRIPTION"
              ></textarea>
            </div>
            <b-button variant="primary" @click="handTaoNhomDemand()"
              >Tạo nhóm</b-button
            >
          </div>
        </div>
      </b-card-text>
    </b-card>
    
    
    <div class="row">
      <div class="col-md-3 ml-3">
        <label>Demand Khách hàng:</label>
        <div class="text-truncate row ml-2">
          <select
            v-model="PDE_ID"
            class="form-control col"
            @change="handgetDemandsDTLOfGroup()"
          >
            <option
              v-for="(item, index) in demands"
              :key="index"
              :value="item.PDE_ID"
            >
              {{item.PDE_ID}} - {{ item.CUS_NAME }}
            </option>
          </select>
          <button class="btn" @click="handForm_Demand()"><b>...</b></button>
        </div>

        <hr />
        <div
          v-for="(item, index) in dataDemandsDTLOfGroup"
          :key="index"
          class="row container-fluid"
        >
          <div style="width: 10px">
            <input
              type="checkbox"
              v-model="item.IsGroup"
              @change="handAdd_Demand_To_Group(item.PDD_ID)"
            />
          </div>
          <div class="col text-truncate">
            {{ ` ${item.PDD_ID}-${item.END_DEMANDS.substring(0,5)}: ${item.PROJ_NAME}` }}
          </div>
        </div>
      </div>
      <div class="col m-2">
        <div class="row container"         role="toolbar"
        aria-label="Toolbar with button groups">
          <div>
           
          </div>
          <div></div>
          <div>
            
          </div>
          <div> 
          </div>
        </div>
        <div class="container-fluid m-3 row justify-content-between">
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group mr-2" role="group" aria-label="First group">
           <button @click="handCreate_POERP()">Tạo đề nghị mua hàng ERP</button>

          <button type="button" class="btn btn-secondary" >Báo cáo mua hàng</button>
          

          <button
            type="button"
            class="btn btn-secondary"
            @click="handPriceQoute()"
          >
            Lập Báo Giá
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="handDonMuaHang()"
          >
            Đơn Hàng
          </button>
        </div>
      </div>
      <div  class="btn-group mr-2" role="group" aria-label="First group">
       <button class="btn btn-info" @click="import_MOQSPQ()">Nạp MOQ SPQ</button>
       <button  class="btn btn-info" @click="exportDNMuaHang()">Xuất Excel</button>  
       <input
            name="inputFile_MOQ_SPQ_Material"
            class="input-file"
            type="file"
            @change="ImportData"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
      </div>
    </div>

        <div class="container text-right col-12">Ngày:{{ ToDay }}</div>
        <div class="col ml-2">
          Họ và tên người đề nghị (Propose): {{ currentUser.fullName }}
        </div>
        <div class="tableFixHead" style="height: 60vh">
          <table class="table " id="exportable_DeNghiMuaHang">
            <thead>
              <th>STT</th>
              <th>Mã nguyên liệu</th>
              <th>Tên nguyên liệu</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
              <th>Lead time</th>
              <th>MOQ</th>
              <th>SPQ</th>
              <th>Số mua</th>
              <th>DK Ngày đặt</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataMaterialGroup_PO" :key="index">
                <td>{{ index + 1 }}</td>
                <td > <div class="contro_hand"
                      @click="handShowDemandOfMaterial($event, item)">
                      {{ item.PART_NUM }}
                      </div>
                  
                  </td>
                <td>{{ item.PART_NAME }}</td>
                <td>{{ item.UNIT }}</td>
                <td>{{ item.Qty_YeuCau }}</td>
                <td>{{ item.LEADTIME }}</td>
                <td>{{ item.MOQ}}</td>
                <td> {{item.POQ}} </td>
                <td>{{item.QTY}}</td>
                <td>{{item.PROPOSED_DATE_PO}} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <BaseDialog :active.sync="showForm_Demand" :tile="'Danh sách dự án'">
      <list-demand @selectDemand="selectDemand"/>
    </BaseDialog>
    <div class="DemandsPopu" id="DemandsPopu">
      <Demand_PO_of_Material_Group :dataDemandOfGroupMaterial= 'dataDemandOfGroupMaterial'/>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import XLSX from "xlsx";
import { mapActions, mapGetters } from "vuex";
import TitlePage from "../../../controls/TitlePage.vue";
import ListDemand from './ListDemand.vue';
import BaseDialog from '../../../controls/BaseDialog.vue';
import { exportData } from "../../../../plugins/Excel";
import Demand_PO_of_Material_Group from './Demand_PO_of_Material_Group.vue';
export default {
  components: { TitlePage, ListDemand, BaseDialog, Demand_PO_of_Material_Group },
  data() {
    return {
      dataGroup_PO: {},
      dataGroup_PO_NEW: {},
      dataDemand_Group_PO: [],
      dataDemandsOfGroup: [],
      dataDemandsDTLOfGroup: [],
      dataMaterialGroup_PO: [],
      dataDemandOfGroupMaterial: [],
      Demand:[],
      PDE_ID:null,

      ToDay: moment().format("DD/MM/YYYY"),

      showForm_Demand: false,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    demands(){
      let data =[...this.dataDemandsOfGroup, ...[this.Demand]]

      return data
    }
  },
  methods: {
    ...mapActions([
      "getDemandsOfGroup",
      "getDemandsDTLOfGroup",
      "Add_Demand_To_Group",
      "TaoNhomDemand",
      "getMaterialGroup_PO",
      "UpdateMOQ_SPQ",
      'Create_POERP',
      'getDemandOfGroupMaterial'
    ]),
    handShowDemandOfMaterial(event, item){
      let data={
        PGP_ID: this.dataGroup_PO.PGP_ID,
        PART_NUM :item.PART_NUM 
      }
      //console.log(event);
      this.getDemandOfGroupMaterial(data).then(res =>{
        this.dataDemandOfGroupMaterial=res.dataDemandOfGroupMaterial
        //console.log(this.dataDemandOfGroupMaterial);
      })
    
      event.stopPropagation();
        let Denands = document.getElementById("DemandsPopu");
        Denands.style.top = (event.layerY + 20)  + "px";
        Denands.style.left = event.layerX + "px";
        document.querySelector(".DemandsPopu").classList.toggle("hienDemandsPopu");
    },
     handhienDemandsPopu() {
      document.querySelector(".DemandsPopu").classList.remove("hienDemandsPopu");
    },

    handDonMuaHang(){
      if ( this.dataGroup_PO.PGP_ID) {
        let src = "";
        src =
          "/po/MuaHang_Group?id=" + this.dataGroup_PO.PGP_ID ;
        window.open( src, "_blank", "fullscreen=yes, scrollbars=auto, titlebar=no"
        );
      }
    },
    import_MOQSPQ(){
      document.getElementsByName("inputFile_MOQ_SPQ_Material")[0].click();
    },
    ImportData(event) {
      var bomHdrs = [];
      //console.log(bomHdrs)
      let xlsxfile = event.target.files ? event.target.files[0] : null;
      if (xlsxfile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(xlsxfile);
        fileReader.onload = (e) => {
          let data = e.target.result;
          let workbook = XLSX.read(data, { type: "binary" });
          //console.log(workbook);
          let wb = workbook.SheetNames[0];
          let rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[wb]
          );
          //console.log(rowObject);
          this.UpdateMOQ_SPQ({data:rowObject}).then(res=>{
              this.handgetDemandsDTLOfGroup();
          })
        };
      }
    },

    exportDNMuaHang() {
       exportData("Xlsx", "exportable_DeNghiMuaHang");
    },
    selectDemand( Demand){
      this.Demand=Demand
      this.showForm_Demand=!this.showForm_Demand
    },
    handForm_Demand() {
      this.showForm_Demand = !this.showForm_Demand;
    },

    handCreate_POERP() {
      let data = {
        UserName: this.currentUser.fullName,
        PGP_ID: this.dataGroup_PO.PGP_ID,
        dataMaterial: this.dataMaterialGroup_PO.filter(item=>{return item.QTY>0}),
        PDD_ID: this.$route.query.id,
        PO_CODE: this.$route.query.PO_CODE,
        QTY: this.$route.query.qty,
      };
      this.Create_POERP(data);
    },

    handSelectGroup_PO(ItemGroup) {

      this.dataGroup_PO_NEW.PGP_NAME=ItemGroup.PGP_NAME
      this.dataGroup_PO_NEW.DESCRIPTION=ItemGroup.DESCRIPTION
      
      this.dataGroup_PO = ItemGroup;
      this.handgetDemandsDTLOfGroup();
      let data = {
        PGP_ID: this.dataGroup_PO.PGP_ID,
      };
      this.getMaterialGroup_PO(data).then((res) => {
        this.dataMaterialGroup_PO = res.dataMaterialGroup_PO;
        this.dataMaterialGroup_PO.forEach(row=>{
          row.Qty_YeuCau=row.QTY

          if (row.Qty_YeuCau < row.MOQ ) { 
            if(row.Qty_YeuCau==0){row.QTY=0} 
            else{row.QTY =row.MOQ} 
          }
          else { row.QTY=row.MOQ + Math.ceil(( row.Qty_YeuCau - row.MOQ)/row.POQ)*row.POQ }
        })
      });
    },
    handTaoNhomDemand() {
      this.TaoNhomDemand(this.dataGroup_PO_NEW).then((res) => {
        this.dataDemand_Group_PO = [
          ...res.dataDemand_Group_PO,
          ...this.dataDemand_Group_PO,
        ];
        this.dataGroup_PO = this.dataDemand_Group_PO[0];
        //this.pro_getDemandsOfGroup();
      });
    },
    handAdd_Demand_To_Group(PDD_ID) {
      let data = {
        PDD_ID: PDD_ID,
        PGP_ID: this.dataGroup_PO.PGP_ID,
      };

      this.Add_Demand_To_Group(data).then((res) => {
        this.handgetDemandsDTLOfGroup();
      });
    },
    handgetDemandsDTLOfGroup() {
      let dg = this.dataDemand_Group_PO.filter(
        (item) => item.PGP_ID == this.dataGroup_PO.PGP_ID
      );

      this.dataGroup_PO = dg[0];

      let data;
      if (this.dataGroup_PO) {
        data = {
          PGP_ID: this.dataGroup_PO.PGP_ID,
          PDE_ID: this.PDE_ID,
        };
      } else {
        data = {
          PGP_ID: null,

          PDE_ID: this.PDE_ID,
        };
      }

      this.getDemandsDTLOfGroup(data).then((res) => {
        this.dataDemandsDTLOfGroup = res.dataDemandsDTLOfGroup;
      });
    },
    pro_getDemandsOfGroup() {
      let data = {
        PDE_ID: this.$route.query.id,
      };
      this.getDemandsOfGroup(data).then((res) => {
        this.dataDemandsOfGroup = res.dataDemandsOfGroup;
        this.dataDemand_Group_PO = res.dataDemand_Group_PO;
        this.PDE_ID = this.dataDemandsOfGroup[0].PDE_ID;
        //console.log(this.dataDemand_Group_PO);
        if (this.dataDemand_Group_PO.length > 0) {
          this.dataGroup_PO = this.dataDemand_Group_PO[0];
          this.PGP_ID = this.dataGroup_PO.PGP_ID;
        }
        this.handgetDemandsDTLOfGroup();
      });
    },
  },
  created() {
    this.PDE_ID= this.$route.query.id,
    this.pro_getDemandsOfGroup();
  },
};
</script>

<style scoped>

.DemandsPopu {
  background-color: #ffffff;
  color: black;
  position: absolute;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.3);
  display: none;
  z-index: 9999;
}
.menuPopu a {
  display: block;
  text-decoration: none;
}
.menuPopu a:hover {
  background-color: #95a5a6;
}
.hienDemandsPopu {
  display: block;
}
</style>