<template>
         <tr @dblclick="handselectItemUser()">
            <td>{{dataUserItem.USER_NAME}}</td>
            <td>{{dataUserItem.EMP_CODE}}</td>
            <td>{{dataUserItem.FULL_NAME}}</td>
            <td>{{dataUserItem.EMAIL}}</td>
            <td>{{dataUserItem.DEPT_NAME}}</td>
             <td> {{Active}}</td>
            <td class="action-col">
              <el-button class="btn btn-default" title="Edit" @click="handUpdateUser($event)">
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button  class="btn-sm bg-light" title="Set Password" @click="handeSetPassword()">
                <el-icon><Key /></el-icon>
                <b-icon icon="key" aria-hidden="true"  variant="info"
                title="Pass" ></b-icon>
              </el-button>
              <el-button  class="btn-sm bg-light"  @click="handeSetRole()" title="Khai báo Role">
                <el-icon><Share /></el-icon>
                <!-- <b-icon icon="share" aria-hidden="true"  variant="info" 
                  title="Role""></b-icon> -->
              </el-button>
              
              <a class="btn btn-default">
                <i class='fas fa-user-friends' style='font-size:14px'></i>
              </a>
            </td>
          </tr>
</template>

<script setup lang="ts">
import {  computed } from 'vue';
import {Share , Key, Edit} from '@element-plus/icons-vue';
import { useUserStore, type userItem } from '@/stores/user.store';

const userStore = useUserStore();

    //computed:{
const Active = computed(() => {
        switch (props.dataUserItem?.IS_ACTIVE){
            case true :{ return 'ACTIVE'; break;}
            case false :{ return 'NO ACTIVE'; break;}
        }
    });
    
//   props:{

const props = defineProps<{
 dataUserItem: userItem
}>()

const emit = defineEmits<{
  (e: 'selectItemUser', data: any): void // Hoặc thay 'any' bằng interface user cụ thể của anh
  (e: 'handUpdateUser', data: any): void
}>()


const handeSetRole = () => {
  if (!props.dataUserItem.USER_NAME) return;
  let src=''
    src='/formSetRole?UserName=' + props.dataUserItem.USER_NAME 
    window.open(src, 'formSetRoles', 'fullscreen=yes, scrollbars=auto, width=400,height=400')
}
const handeSetPassword = () => {
  if (confirm("Lấy lại Password mắc định")){
    if (!props.dataUserItem.USER_NAME) return;

    let data={
      userName:props.dataUserItem.USER_NAME
    }
    userStore.SetPassword(data)
  }
}

const handselectItemUser = () => {
  emit('selectItemUser', props.dataUserItem)
}
const handUpdateUser = (e: Event) => {
  e.preventDefault();
  emit('handUpdateUser', props.dataUserItem)
}
</script>

<style>

</style>