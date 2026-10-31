<template>
  <div style="margin-left: 8px; width: 100%">    
    <div class="row container-fluid mt-3">
      <div class="col-sm-6">
        <div class="ml-12">
          <div class="form-group row">
            <label style="width: 110px">BOM NAME:</label>
            <div>
              <input type="text" name="" id="" v-model="dataBOMHDR.BOM_NAME" />
            </div>
          </div>
          <div class="form-group row">
            <label style="width: 110px">MÃ Nguyên Liệu:</label>
            <div>
              <input type="text" name="" id="" v-model="dataBOMHDR.PART_NUM" />
            </div>
          </div>
          <div class="form-group row">
            <label style="width: 110px">Số Nhân Công:</label>
            <div>
              <input
                type="number"
                style="max-width: 50px"
                v-model="dataBOMHDR.LABOR_QTY"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="form-group row">
          <label style="width: 110px">Thứ Tự SX:</label>
          <div>
            <input type="text" v-model="dataBOMHDR.SORT" />
          </div>
        </div>
        <div class="row">
          <label style="width: 110px">Bộ phận:</label>
          <div>
            <selectDept v-model="dataBOMHDR.DEPT_ID" />
          </div>
        </div>
        <div class="form-group row">
          <label style="width: 110px">Sản Phẩm:</label>
          <div>
            <input
              type="number"
              style="max-width: 60px"
              v-model="dataBOMHDR.PRODUC_EVERY_HOUR"
            />
          </div>
          <label>/giờ</label>
        </div>
      </div>

      <div class="row col-12">
        <div class="col">
          <div class="form-group row">
            <label style="width: 80px">Đơn Giá:</label>
            <div>
              <input
                type="number"
                style="max-width: 100px"
                v-model="dataBOMHDR.COST"
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="form-group row">
            <label style="width: 80px">Số lượng:</label>
            <div>
              <input
                type="number"
                style="max-width: 100px"
                v-model="dataBOMHDR.QTY"
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="form-group row">
            <label style="width: 80px">Active:</label>
            <div>
              <input type="checkbox" v-model="dataBOMHDR.IS_ACTIVE" />
            </div>
          </div>
        </div>
      </div>

      <div class="row col-12">
        <div class="col-6">
          <label style="width: 110px">AQL:</label>
          <select v-model="dataBOMHDR.AQL">
            <option value="AC_0.065">AC_0.065</option>
            <option value="AC_0.1">AC_0.1</option>
            <option value="AC_0.15">AC_0.15</option>
            <option value="AC_0.25">AC_0.25</option>
            <option value="AC_0.4">AC_0.4</option>
            <option value="AC_0.65">AC_0.65</option>
            <option value="AC_1">AC_1</option>
            <option value="AC_1.5">AC_1.5</option>
            <option value="AC_2.5">AC_2.5</option>
            <option value="AC_4">AC_4</option>
            <option value="AC_6.5">AC_6.5</option>
            <option value="AC_10">AC_10</option>
            <option value="AC_15">AC_15</option>
          </select>
        </div>
        <div class="col-6">
          <label style="width: 110px"> AQL Level:</label>
          <select v-model="dataBOMHDR.LEVEL_AQL">
            <option value="LEVEL_I">LEVEL_I</option>
            <option value="LEVEL_II">LEVEL_II</option>
            <option value="LEVEL_III">LEVEL_III</option>
            <option value="LEVEL_S1">LEVEL_S1</option>
            <option value="LEVEL_S2">LEVEL_S</option>
            <option value="LEVEL_S3">LEVEL_S</option>
            <option value="LEVEL_S4">LEVEL_S</option>
          </select>
        </div>
      </div>
      <div class="col-sm-12">
        <div>
          <label for="">Mô Tả:</label>
          <textarea
            class="col-12"
            name=""
            id=""
            rows="4"
            v-model="dataBOMHDR.NOTE"
          ></textarea>
        </div>
      </div>
    </div>
    <br />
    <button class="btn btn-info" @click="handUpdateItemBOMHDR()">Lưu</button>
    <button @click="handImportExcel()">Import Excel Item</button>
    <div>
      <table class="table">
        <thead class="table-success">
          <tr>
            <th class="action-column" style="min-height: 80px; min-width: 85px">
              Actions
            </th>
            <th style="min-height: 70px; min-width: 60px">ID</th>
            <th style="min-height: 70px; min-width: 150px"><div>PART NUM</div></th>
            <th style="min-height: 70px; min-width: 250px"><div>DESCRIPTION</div></th>
            <!-- <th style="min-height: 70px; min-width:100px"> BOM CODE  </th> -->
            <th style="min-height: 70px; min-width: 60px"><div>QTY</div></th>
            <th style="min-height: 70px; min-width: 60px"><div>UNIT</div></th>
            <th style="min-height: 70px; min-width: 150px">
              <div>PART REPLACE</div>
            </th>
            <!-- <th style="min-height: 70px; min-width:60px"><div >SORT</div></th> -->
            <th style="min-height: 70px; min-width: 200px"><div>NOTE</div></th>
            <th style="min-height: 70px; min-width: 30px"><div>SEMI PRO</div></th>
            <th style="min-height: 70px; min-width: 100px"><div>UPDATED</div></th>
            <th style="min-height: 70px; min-width: 150px">
              CUSTOMER PART
              <b-icon
                class="contro_hand"
                :class="mau"
                icon="grip-vertical"
                aria-hidden="true"
                @click="btnClick"
                for="file"
              ></b-icon>
              <input
                class="input-hidden input-file_CPA"
                type="file"
                @change="exportData_CPA"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </th>
            <!-- [BOM_DTL_ID],[PART_NUM],[DESCRIPTION],[BOM_CODE] ,[QTY] ,[UNIT]
            ,[PART_NUM_REPLACE],[SORT] ,[NOTE],[CREATED_AT],[UPDATED_AT],[PICTURE]-->
          </tr>
        </thead>
        <tbody>
          <tr   v-for="(item, index) in listMaterialExcel"
          :key="index"  :item="item" :id="index" >       
            <td style="padding: 3px;"  v-if="!showMateral">  
                <div class="container row padding: 2px;">
                  <div class="icon-container">
                    <b-icon icon="pencil-square" @click="onChange"></b-icon>
                  </div>
                  <!----><!----><!----><!---->
                  <div class="icon-container">
                    <b-icon icon="caret-right-fill" @change="onChange"></b-icon>
                  </div>
                  <!----><!----><!----><!---->
                  <div class="icon-container">
                    <b-icon icon="exclamation-circle-fill" @change="onChange"></b-icon>
                  </div>
                </div>
              </td>
            <td style="min-height: 80px; "  v-if="!showMateral"><div>{{id}}</div></td>        
            <td :style="'min-height: 80px; cursor: pointer; '+ mau"  v-if="!showMateral" @dblclick="capNhatMaNL(item.PART_NUM)"> <div>{{item.PART_NUM}}</div></td>
            <td style="min-height: 80px; "  v-if="!showMateral"> <div >{{item.DESCRIPTION}}</div></td>
            <!-- <td style="min-height: 80px; "  v-if="!showMateral"> {{item.BOM_CODE}}  </td> -->
            <td style="min-height: 80px; "  v-if="!showMateral"><div>{{item.QTY}}</div> </td>
            <td style="min-height: 80px; " v-if="!showMateral"><div >{{item.UNIT}}</div></td>
            <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.PART_NUM_REPLACE}}</div></td>
            <!-- <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.SORT}}</div></td> -->
            <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.NOTE}}</div></td>
            <td style="min-height: 30px; "  v-if="!showMateral"><div ></div></td> 
            <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.UPDATED}}</div></td>
            <td style="min-height: 80px; "  v-if="!showMateral"><div >{{item.CUSTOMER_PART}}</div></td>
            <!-- [BOM_DTL_ID],[PART_NUM],[DESCRIPTION],[BOM_CODE] ,[QTY] ,[UNIT] ,[PART_NUM_REPLACE],[SORT] ,[NOTE],[CREATED_AT],[UPDATED_AT]-->
            <!--[BOM_DTL_ID],[BOM_HDR_ID],[TME_ID],[IS_ACTIVE],[SORT],[QTY],[UNIT] ,[TME_ID_REPLACE],[NOTE],[PICTURE],[CREATED_AT],[CREATED_BY]  -->
          </tr>  
        </tbody>
      </table>
    </div>
    <input
        class="input-file" type="file" @change="exportData"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
  </div>
</template>

<script >
import { mapActions } from "vuex";
import SelectDept from "../../controls/Contr_SelectDepartmenDyn.vue";
export default {
  data() {
    return {
      dataBOMHDR: {},
      listMaterialExcel: [],
    };
  },
  components: {
    SelectDept
  },
  methods: {
    ...mapActions(["getItem_BOMHDR", "UpdateItemBOMHDR"]),
    handImportExcell() {
      document.querySelector(".input-file").click();
    },
    exportData(event) {
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
          //console.log('data material: ',rowObject)
          this.$emit("ImportDataMaterialExcel", rowObject);
          if (rowObject) {
            this.AddExcel = !this.AddExcel;
          }
        };
      }
    },

    
    ImportDataMaterialExcel(e) {
      let str = "";
      e.forEach((data) => {
        str += "','" + data.PART_NUM;
      });
      str = "'" + str + "'";
      //console.log(str, 'data: ', e);
      // động bộ Description
      this.getTypeMaterial(str).then((res) => {
        let Type = res.parts_type;
        for (let j = 0; j < e.length; j++) {
          e[j].dataExists = false;
          Type.forEach((type_material) => {
            if (e[j].PART_NUM == type_material.PART_NUM) {
              e[j].DESCRIPTION = type_material.DESCRIPTION;
              e[j].dataExists = true;
            }
          });
        }
        this.listMaterialExcel = e;
        //console.log('e: ',this.listMaterialExcel)
      });
    },

    proGetItem_BOMHDR(id) {
      this.getItem_BOMHDR({ id: id }).then((res) => {
        this.dataBOMHDR = res.dataBOMHDR;
      });
    },
    handUpdateItemBOMHDR() {
      this.UpdateItemBOMHDR(this.dataBOMHDR);
    },
  },
  created() {
    this.proGetItem_BOMHDR(this.$route.query.id);
  },
};
</script>

<style scoped>
</style>