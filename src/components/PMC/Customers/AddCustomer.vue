<template>
  <section class="customer-form">
    <header class="customer-form__header">
      <div>
        <h2 class="customer-form__title">Thông tin khách hàng</h2>
        <p class="customer-form__subtitle">Nhập thông tin khách hàng và điều kiện giao nhận.</p>
      </div>
    </header>

    <el-row :gutter="20">
      <el-col :xs="24" :lg="12">
        <div class="customer-form__section">
          <h3 class="customer-form__section-title">Thông tin chung</h3>
          <el-form label-position="top">
            <el-row :gutter="14">
              <el-col :xs="24" :sm="8">
                <el-form-item label="Mã khách hàng">
                  <el-input v-model="CUS_NUMBER" placeholder="Nhập mã khách hàng" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="16">
                <el-form-item label="Tên khách hàng">
                  <el-input v-model="CUS_NAME" placeholder="Nhập tên khách hàng" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Loại khách hàng">
                  <el-select v-model="CLASS" class="w-100">
                    <el-option label="Khách hàng gia công" value="GC" />
                    <el-option label="Khách hàng xuất khẩu" value="XK" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Mã số thuế">
                  <el-input v-model="TAX_ID" placeholder="Nhập mã số thuế" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Mã số đăng ký kinh doanh">
                  <el-input v-model="BUSINESS_ID" placeholder="Nhập mã số ĐKKD" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Điều khoản thanh toán">
                  <el-input v-model="D_PAYMENT_TERM" placeholder="Ví dụ: Net 30" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Loại tiền">
                  <el-select v-model="D_CURRENCY" class="w-100" placeholder="Chọn loại tiền">
                    <el-option v-for="item in dataCURCODE" :key="item.CUR_CODE" :label="item.TEN" :value="item.CUR_CODE" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Điện thoại">
                  <el-input v-model="TELEPHONE" type="tel" placeholder="Nhập số điện thoại" />
                </el-form-item>
              </el-col>
              <el-col :xs="24">
                <el-form-item label="Email">
                  <el-input v-model="EMAIL" type="email" placeholder="name@example.com" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>

      <el-col :xs="24" :lg="12">
        <div class="customer-form__section">
          <h3 class="customer-form__section-title">Địa chỉ và giao nhận</h3>
          <el-form label-position="top">
            <el-row :gutter="14">
              <el-col :xs="24">
                <el-form-item label="Địa chỉ">
                  <el-input v-model="ADDRESS" placeholder="Nhập địa chỉ" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Địa bàn">
                  <el-input v-model="LOC_NAME" placeholder="Nhập địa bàn" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Tỉnh / thành phố">
                  <el-input v-model="PROVINCE" placeholder="Nhập tỉnh / thành phố" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Quốc gia">
                  <el-select v-model="COUNTRY" class="w-100" placeholder="Chọn quốc gia">
                    <el-option label="Việt Nam" value="VN" />
                    <el-option label="Mỹ" value="US" />
                    <el-option label="Canada" value="CA" />
                    <el-option label="Trung Quốc" value="CN" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Phương thức vận chuyển">
                  <el-select v-model="SHIPPING_METHOD" class="w-100" placeholder="Chọn phương thức">
                    <el-option label="Đường bộ" value="ROAD" />
                    <el-option label="Đường biển" value="SEA" />
                    <el-option label="Đường hàng không" value="AIR" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24">
                <el-form-item label="Địa chỉ nhận hàng">
                  <el-input v-model="SHIPPING_ADDRESS" placeholder="Nhập địa chỉ nhận hàng" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>

      <el-col :xs="24">
        <div class="customer-form__section customer-form__section--notes">
          <el-form label-position="top">
            <el-form-item label="Ghi chú">
              <el-input v-model="NOTES" type="textarea" :rows="3" placeholder="Thông tin bổ sung (nếu có)" />
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <footer class="customer-form__actions">
      <el-button type="primary" size="large" @click="handLuuAddCustomer">
        Lưu khách hàng
      </el-button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCustomerStore } from "@/stores/customer.store.ts";

const customerStore = useCustomerStore();

const CUS_NUMBER = ref('');
const CUS_NAME = ref('');
const CLASS = ref('XK');
const TELEPHONE = ref('');
const COUNTRY = ref('');
const PROVINCE = ref('');
const ADDRESS = ref('');
const LOC_NAME = ref('');
const SHIPPING_ADDRESS = ref('');
const SHIPPING_METHOD = ref('');
const TAX_ID = ref('');
const BUSINESS_ID = ref('');
const D_PAYMENT_TERM = ref('');
const D_CURRENCY = ref('');
const EMAIL = ref('');
const NOTES = ref('');

const dataCURCODE = ref<{ CUR_CODE: string; TEN: string }[]>([
  { CUR_CODE: "VND", TEN: "Việt Nam Đồng" },
  { CUR_CODE: "USD", TEN: "Đô la Mỹ" },
  { CUR_CODE: "EUR", TEN: "EUR" },
  { CUR_CODE: "GBP", TEN: "Bảng Anh" },
  { CUR_CODE: "CNY", TEN: "Nhân dân tệ" },
  { CUR_CODE: "JPY", TEN: "Yên Nhật" },
]);

const emit = defineEmits(["pro_GetdataCustomers"]);

const handLuuAddCustomer = async () => {
  let data = {
    CUS_NUMBER: CUS_NUMBER.value,
    CUS_NAME: CUS_NAME.value,
    CLASS: CLASS.value,
    TELEPHONE: TELEPHONE.value,
    COUNTRY: COUNTRY.value,
    PROVINCE: PROVINCE.value,
    ADDRESS: ADDRESS.value,
    LOC_NAME: LOC_NAME.value,
    SHIPPING_ADDRESS: SHIPPING_ADDRESS.value,
    SHIPPING_METHOD: SHIPPING_METHOD.value,
    TAX_ID: TAX_ID.value,
    BUSINESS_ID: BUSINESS_ID.value,
    D_PAYMENT_TERM: D_PAYMENT_TERM.value,
    D_CURRENCY: D_CURRENCY.value,
    EMAIL: EMAIL.value,
    NOTES: NOTES.value,
  };
  await customerStore.LuuAddCustomer(data)
  emit("pro_GetdataCustomers");
};


</script>

<style>
</style>