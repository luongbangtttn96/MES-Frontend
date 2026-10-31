<template>
  <div class="row m-1">
    <div>
      <label> User Name:</label>
      <input type="text" size="30" maxlength="30" v-model="USER_NAME" />
    </div>
    <div>
      <label> Mã nhân viên(ERP):</label>
      <input type="text" size="13" maxlength="13" v-model="EMP_CODE" />
    </div>

    <button class="btn-sm btn-info ml-2" @click="handDongBoUser_Nhansu_erp()">
      Đồng Bộ ERP
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      USER_NAME: "",
      EMP_CODE: "",
    };
  },
  methods: {
    ...mapActions(["DongBoUser_Nhansu_erp"]),
    handDongBoUser_Nhansu_erp() {
      let data = {
        USER_NAME: this.USER_NAME.trim(),
        EMP_CODE: this.EMP_CODE.trim(),
      };
      //console.log(data);
      if (this.EMP_CODE.trim() != "") {
        this.DongBoUser_Nhansu_erp(data);
      }
    },
  },
};
</script>

<style>
</style>