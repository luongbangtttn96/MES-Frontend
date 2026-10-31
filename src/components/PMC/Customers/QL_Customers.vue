<template>
  <div>
    <title-page :titlepage="'Danh sách khách hàng'" />
    <div class="mt-2">
      <button type="button" @click="HandAddCustomer()">Thêm khách hàng</button>
      <!-- <button type="button" @click="HandLoadERPCustomer()">Load ERP</button> -->
    </div>

    <div class="input-group mb-2 col-md-4 mt-2">
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

    <div class="tableFixHead" style="height: 80vh">
      <table class="table table-responsive-md">
        <thead>
          <tr>
            <!-- SUP_ID ,	SUP_CODE, NAME , SHORT_NAME ,IN_VIETNAM,case SUPPLIER_TYPE when 'S' Then N'Tổ Chức' when 'E' then N'Cá nhân' end as SUPPLIER_TYPE,
	ADDRESS ,COUNTRY, TELEPHONE, EMAIL, WEB, CUR_CODE, DFLT_RECEIVING_ADDRESS , DFLT_RECEIVING_METHOD , BANK , BANK_ACCOUNT, NOTES , 
	MODIFY_DATE ,STATUS, NUBER_DATE,TOTAL,NUMBER_ERR -->
            <th></th>
            <th>STT</th>
            <th>Mã KH</th>
            <th>Tên</th>
            <th>Điện thoại</th>
            <th>Mail</th>
            <th>Nước</th>
            <th>Thành phố</th>
            <th>địa chỉ</th>
            <th>Loại KH</th>
            <th>Đ/C Giao</th>
            <th>Phương thức giao</th>

            <th>Đồng Tiền TT</th>
            <th>Phương thức TT</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in showDataCustomers"
            :key="index"
            :class="mau(item.ISERP)"
          >
            <td>
              <input
                type="checkbox"
                v-if="item.ISERP == 1"
                @change="handSaveCustomer(index)"
              />
            </td>
            <td>{{ index + 1 }}</td>
            <td>{{ item.CUS_NUMBER }}</td>
            <td>{{ item.CUS_NAME }}</td>
            <td>{{ item.TELEPHONE }}</td>
            <td>{{ item.EMAIL }}</td>
            <td>{{ item.COUNTRY }}</td>
            <td>{{ item.CITY }}</td>
            <td>{{ item.ADDRESS }}</td>
            <td>{{ item.KH_CLASS_DETAIL }}</td>
            <td>{{ item.SHIPPING_ADDRESS }}</td>
            <td>{{ item.SHIPPING_METHOD }}</td>

            <td>{{ item.D_CURRENCY }}</td>
            <td>{{ item.D_PAYMENT_TEMRM }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseDialog :active.sync="showAddCustomer" :tile="'Tạo Khách hàng'">
      <add-customer @pro_GetdataCustomers="pro_GetdataCustomers"/>
    </BaseDialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import BaseDialog from "../controls/BaseDialog.vue";
import AddCustomer from "./AddCustomer.vue";
import TitlePage from "../controls/TitlePage.vue";
export default {
  data() {
    return {
      showAddCustomer: false,
      dataCustomers: [],
      dataERPCustomers: [],
      search: "",
    };
  },
  components: {
    BaseDialog,
    AddCustomer,
    TitlePage,
  },
  computed: {
    showDataCustomers() {
      let data;
      let ArrCUS_NUMBER = [];
      this.dataCustomers.forEach((item) => {
        item.isERP = 0;
        ArrCUS_NUMBER.push(item.CUS_NUMBER);
      });

      let dataERP = this.dataERPCustomers.filter((item) => {
        return !ArrCUS_NUMBER.includes(item.CUS_NUMBER);
      });
      //console.log(this.dataCustomers);
      data = [...dataERP, ...this.dataCustomers];
      data = data.filter((element) => {
        return element.CUS_NAME.toUpperCase().includes(
          this.search.toUpperCase()
        );
      });
      return data;
    },
  },
  watch: {
    dataERPCustomers() {},
  },
  methods: {
    ...mapActions(["getdataCustomers", "getdataERPCustomers", "SaveCustomer"]),
    handSaveCustomer(index) {
      // let checkbox= eve
      this.showDataCustomers[index].ISERP = 0;
      this.SaveCustomer(this.showDataCustomers[index]);
      this.$forceUpdate;
    },
    // HandLoadERPCustomer() {
    //   this.Pro_getdataERPCustomers();
    // },
    HandAddCustomer() {
      this.showAddCustomer = !this.showAddCustomer;
    },
    pro_GetdataCustomers() {
      this.getdataCustomers().then((res) => {
        this.dataCustomers = res.dataCustomers;
        if (!res.dataCustomers) this.dataCustomers = [];
      });
    },
    // Pro_getdataERPCustomers() {
    //   this.getdataERPCustomers().then((res) => {
    //     this.dataERPCustomers = res.dataERPCustomers;
    //     if (!res.dataERPCustomers) this.dataERPCustomers = [];
    //   });
    // },
    mau(isERP) {
      console.log(isERP);
      switch (isERP) {
        case 1:
          return "mauNenXam";
          break;

        default:
          break;
          return "";
      }
    },
  },
  created() {
    this.pro_GetdataCustomers();
  },
};
</script>

<style>
</style>