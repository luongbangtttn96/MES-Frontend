<template>
  <div>
    <div class="row">
      <div class="col-6">
        <div class="row pt-1">
          <div class="col-3 pt-2"><label>Mã KH:</label></div>
          <div class="col">
            <input type="text" class="form-control" v-model="CUS_NUMBER" />
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-2 pt-2"><label>Tên:</label></div>
          <div class="col">
            <input class="form-control" type="text" v-model="CUS_NAME" />
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-3 pt-2"><label>Loại KH:</label></div>
          <div class="col">
            <select class="form-control" v-model="CLASS">
              <option value="GC">KH giao công</option>
              <option value="XK">KH xuất khẩu</option>
            </select>
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-4 pt-2"><label>Mã Số thuế:</label></div>
          <div class="col">
            <input class="form-control" type="text" v-model="TAX_ID" />
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-4 pt-2"><label>Mã số ĐKKD:</label></div>
          <div class="col">
            <input class="form-control" type="text" v-model="BUSINESS_ID" />
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-4 pt-2"><label>PAYMENT TERM:</label></div>
          <div class="col">
            <input class="form-control" type="text" v-model="D_PAYMENT_TERM" />
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-3 pt-2"><label for="">Loại tiền:</label></div>
          <div class="col">
            <select class="form-control" v-model="D_CURRENCY">
              <option
                v-for="item in this.dataCURCODE"
                :key="item.CUR_CODE"
                :value="item.CUR_CODE"
              >
                {{ item.TEN }}
              </option>
            </select>
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-4 pt-2"><label>Điện thoại:</label></div>
          <div class="col">
            <input class="form-control" type="text" v-model="TELEPHONE" />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row pt-1">
          <div class="col-3 pt-2"><label>Địa Chỉ:</label></div>
          <div class="col">
            <input type="text" class="form-control" v-model="ADDRESS" />
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-3 pt-2"><label>Địa bàn:</label></div>
          <div class="col">
            <input type="text" class="form-control" v-model="LOC_NAME" />
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-3 pt-2"><label>Tỉnh:</label></div>
          <div class="col">
            <input class="form-control" type="text" v-model="PROVINCE" />
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-3 pt-2"><label>Nước:</label></div>
          <div class="col">
            <select class="form-control" v-model="COUNTRY">
              <option value="">Việt Nam</option>
              <option value="">Mỹ</option>
              <option value="">Canada</option>
              <option value="">Trung quốc</option>
            </select>
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-4 pt-2"><label>Đ/C Nhận:</label></div>
          <div class="col">
            <input
              class="form-control"
              type="text"
              v-model="SHIPPING_ADDRESS"
            />
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-4 pt-2"><label>Vận Chuyển:</label></div>
          <div class="col">
            <select class="form-control" v-model="SHIPPING_METHOD">
              <option value="">Đường bộ</option>
              <option value="">Đường biển</option>
              <option value="">Đường Không</option>
            </select>
          </div>
        </div>
        <div class="row pt-1">
          <div class="col-3 pt-2"><label>Email:</label></div>
          <div class="col">
            <input class="form-control" type="text" v-model="EMAIL" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <label> Ghi Chú:</label>
      <textarea cols="100" rows="3" class="form-control" v-model="NOTES"
      ></textarea>
    </div>
    <div class="pt-2"><button @click="handLuuAddCustomer()">Lưu</button></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      CUS_NUMBER:'',
      CUS_NAME:'',
      CLASS:'XK',
      TELEPHONE:'',
      COUNTRY:'',
      PROVINCE:'',
      ADDRESS:'',
      LOC_NAME:'',
      SHIPPING_ADDRESS:'',
      SHIPPING_METHOD:'',
      TAX_ID:'',
      BUSINESS_ID:'',
      D_PAYMENT_TERM:'',
      D_CURRENCY:'',
      EMAIL: '' ,
      NOTES:'',

      dataCURCODE: [
        { CUR_CODE: "VND", TEN: "Việt Nam Đồng" },
        { CUR_CODE: "USD", TEN: "Đô la Mỹ" },
        { CUR_CODE: "EUR", TEN: "EUR" },
        { CUR_CODE: "GBP", TEN: "Bảng Anh" },
        { CUR_CODE: "CNY", TEN: "Nhân dân tệ" },
        { CUR_CODE: "JPY", TEN: "Yên Nhật" },
      ],
    };
  },

  methods: {
    ...mapActions(["LuuAddCustomer"]),
    async handLuuAddCustomer() {
      let data = {
        CUS_NUMBER:this.CUS_NUMBER,
        CUS_NAME:this.CUS_NAME,
        CLASS:this.CLASS,
        TELEPHONE:this.TELEPHONE,
        COUNTRY:this.COUNTRY,
        PROVINCE:this.PROVINCE,
        ADDRESS:this.ADDRESS,
        LOC_NAME:this.LOC_NAME,
        SHIPPING_ADDRESS:this.SHIPPING_ADDRESS,
        SHIPPING_METHOD:this.SHIPPING_METHOD,
        TAX_ID:this.TAX_ID,
        BUSINESS_ID:this.BUSINESS_ID,
        D_PAYMENT_TERM:this.D_PAYMENT_TERM,
        D_CURRENCY:this.D_CURRENCY,
        EMAIL: this.EMAIL ,
        NOTES:this.NOTES,
      };
      await this.LuuAddCustomer(data).then((res) => {});
      this.$emit(pro_GetdataCustomers)
    },
  },
};
</script>

<style>
</style>