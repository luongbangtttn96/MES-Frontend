<template>
  <div>
    <form class="form-inline m-2">
      <el-row>
        <div>
          <input type="search" class="form-control mb-2 mr-sm-2" id="username" placeholder="UserName" v-model="username" />
        </div>
        <div>
          <input type="search" class="form-control mb-2 mr-sm-2" id="ten" placeholder="Họ và tên" v-model="ten" />
        </div>
        <div>
          <input type="email" class="form-control mb-2 mr-sm-2"  id="email"  placeholder="Email" v-model="email"
          />
        </div>
        <div>
          <select class="form-control mb-2 mr-sm-2" name="" id="">
            <option value="1">All</option>
            <option value="2">Active</option>
            <option value="3">Inactive</option>
          </select>
        </div>
        <button class="btn nutNhan mb-2 mr-sm-2">Search</button>
      </el-row>
    </form>
    <el-row style="display: flex; justify-content: space-between; align-items: center;"> 
      <select class="form-control mb-2 mr-sm-2 w-20" name="" id="">
        <option value="1">20</option>
        <option value="2">30</option>
        <option value="3" selected>40</option>
        <option value="2">50</option>
        <option value="3">60</option>
      </select>
      <div>
        <button class="btn-sm mb-2 mr-sm-2 nutNhan" @click="formAddUser()">
          Thêm User
        </button>
      </div>
    
    </el-row>
    <div class="table-style2 clearfix table-responsive" style="height: 70vh">
      <table class="table tableFixHead" >
        <thead class="bg_m1">
          <tr>
            <th>Username</th>
            <th>mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Bộ Phận</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <!---->
          <user_Item
            v-for="(item, index) in Show_dataListUserItem"
            :key="index"
            :dataUserItem="item"
            @selectItemUser="selectItemUser"
            @handUpdateUser="handUpdateUser"
          />
        </tbody>
      </table>
    </div>
    <BaseDialog v-model:active="showfomAddUse" width="1000px" :tile="'thêm user'">
      <addUser />
    </BaseDialog>
    <BaseDialog v-model:active="showfomUpdateUse" width="1000px" :tile="'cập nhật user'">
      <updateUser :userData="userData" />
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import user_Item from "./User_Item.vue";
import BaseDialog from "@/components/controls/BaseDialog.vue";
import addUser from "./Singup.vue";
import updateUser from "./SingupUpdate.vue";

import { useUserStore, type userItem, type registerData } from '@/stores/user.store';

const userStore = useUserStore();
const showfomAddUse = ref(false);
const showfomUpdateUse = ref(false);
const dataListUserItem = ref<userItem[]>([]);
const userData = ref<registerData>({});
const username = ref('');
const ten = ref('');
const email = ref('');


const Show_dataListUserItem = computed(() => {

      if(username.value || ten.value ){
        return dataListUserItem.value.filter(item => {
          return (
            (username.value && item.USER_NAME?.toLowerCase().includes(username.value.toLowerCase())) ||
            (ten.value && item.FULL_NAME?.toLowerCase().includes(ten.value.toLowerCase())) 
          );
        });
      }
      return dataListUserItem.value || [];
    });


const handUpdateUser = (data: userItem) => {
  const user: registerData = {
    USER_NAME: data.USER_NAME,
    FULL_NAME: data.FULL_NAME,
    EMAIL: data.EMAIL,
    PHONE: data.PHONE,
    EMP_CODE: data.EMP_CODE,
    DEPT_ID: data.DEPT_ID,
    ROLES: []//, ...(data.ROLES || [])]
  };
  userData.value = user;
  selectItemUser(user);
  showfomUpdateUse.value = true;
};

const selectItemUser = (data: userItem) => {
  username.value = data.USER_NAME || '';
  ten.value = data.FULL_NAME || '';
  email.value = data.EMAIL || '';
};

const formAddUser = () => {
  showfomAddUse.value = true;
};

onMounted(() => {
  userStore.getdataUser().then((res) => {
    dataListUserItem.value = res.dataListUserItem;
    console.log("dataListUserItem", res);
  });
});

</script>

<style></style>
