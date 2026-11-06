<template>
  <div>
    <title-page :titlepage="'Danh sách khách hàng'" />
    <div class="mt-2">
      <el-button type="button" @click="HandAddCustomer()">Thêm khách hàng</el-button>
      <!-- <button type="button" @click="HandLoadERPCustomer()">Load ERP</button> -->
    </div>

    <div class="input-group mb-2 col-md-4 mt-2">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">
          <el-icon icon="search"></el-icon
        ></span>
      </div>
      <el-input
        type="text"
        class="form-control"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        v-model="search"
      >
      <template #prefix>
        <el-icon ><Search /></el-icon>
      </template>
      </el-input>
    </div>

    <div class="tableFixHead" style="height: 80vh">
      <table class="table table-responsive-md">
        <thead>
          <tr>
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

    <BaseDialog v-model:active="showAddCustomer" :tile="'Tạo Khách hàng'">
      <add-customer @pro_GetdataCustomers="pro_GetdataCustomers"/>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";

import BaseDialog from "@/components/controls/BaseDialog.vue";
import AddCustomer from "./AddCustomer.vue";
import TitlePage from "@/components/controls/TitlePage.vue";

import { useCustomerStore } from "@/stores/customer.store.ts";


const customerStore = useCustomerStore();

const showAddCustomer = ref(false);
const dataCustomers = ref<Record<string, any>[]>([]);
const dataERPCustomers = ref<Record<string, any>[]>([]);
const search = ref("");

const showDataCustomers = computed(() => {
      let data;
      let ArrCUS_NUMBER: string[] = [];
      dataCustomers.value.forEach((item) => {
        item.isERP = 0;
        ArrCUS_NUMBER.push(item.CUS_NUMBER);
      });

      let dataERP = dataERPCustomers.value.filter((item) => {
        return !ArrCUS_NUMBER.includes(item.CUS_NUMBER);
      });
      //console.log(this.dataCustomers);
      data = [...dataERP, ...dataCustomers.value];
      data = data.filter((element) => {
        return element.CUS_NAME.toUpperCase().includes(
          search.value.toUpperCase()
        );
      });
      return data;
    })
  watch(dataERPCustomers, (newVal, oldVal) => {
    // Handle changes to dataERPCustomers here if needed
  });
    
  const handSaveCustomer = (index: number) => {
      // let checkbox= eve
      showDataCustomers.value[index].ISERP = 0;
      customerStore.SaveCustomer(showDataCustomers.value[index]);
    }
    // HandLoadERPCustomer() {
    //   this.Pro_getdataERPCustomers();
    // },
  const HandAddCustomer = () => {
      showAddCustomer.value = !showAddCustomer.value;
    }
  const pro_GetdataCustomers = async () => {
      const res = await customerStore.getdataCustomers({});
      dataCustomers.value = res.dataCustomers || [];
    }
    // Pro_getdataERPCustomers() {
    //   this.getdataERPCustomers().then((res) => {
    //     this.dataERPCustomers = res.dataERPCustomers;
    //     if (!res.dataERPCustomers) this.dataERPCustomers = [];
    //   });
    // },
    const mau = (isERP: boolean | number) => {
      console.log(isERP);
      switch (isERP) {
        case 1:
          return "mauNenXam";
          break;

        default:
          break;
          return "";
      }
    }

  onMounted(() => {
    pro_GetdataCustomers();
  });
</script>

<style>
</style>