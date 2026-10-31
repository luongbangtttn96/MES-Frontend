<template>
  <div class="permission-manager">
    <div class="page-header">
      <h5>Quản lý phân quyền chức năng</h5>
      <p>Chọn nhóm quyền để bật/tắt chức năng cho người dùng trong hệ thống.</p>
    </div>

    <el-row :gutter="2">
      <el-col :sm="8">
        <el-card class="card shadow-sm" style="box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); border: 1px solid #ebeef5;"> 
          <div class="card-header bg-primary text-white">
            <strong>Nhóm quyền</strong>
          </div>
          <div class="card-body permission-body">
            <div class="input-group mb-3">
              <el-input
                v-model="DESCRIPTION"
                type="text"
                maxlength="30"
                placeholder="Mô tả nhóm quyền"
              />
            </div>
            <div class="input-group mb-3">
              <el-input
                v-model="role"
                type="text"
                maxlength="30"
                placeholder="Tên nhóm quyền"
                @keyup.enter="handAddRole"
              >
                <template #append>
                  <el-button class="btn btn-outline-primary" @click="handAddRole">Thêm</el-button>
                </template>
              </el-input>
            </div>
            
            <div class="role-list">
              <button
                v-for="item in dataroles"
                :key="item.ROLE_ID"
                type="button"
                class="role-item"
                :class="{ active: SelectRoles === item.ROLE_ID }"
                @click="handSelectRole(item.ROLE_ID)"
              >
                <span>{{ item.ROLE_NAME }}</span>
                <small v-if="SelectRoles === item.ROLE_ID">Đang chọn</small>
              </button>
            </div>
          </div>
        </el-card>

      </el-col>

      <el-col :sm="16">
        <el-card class="card " :style="{boxShadow: 'var(--bs-card-box-shadow)'}">
          
          <div class="card-header page-card__header_r">
            <strong>Danh sách chức năng</strong>
            <span v-if="SelectRoles">Đã chọn: {{ selectedCount }} / {{ totalCount }}</span>
          </div>
          <div class="card-body permission-body">
            <div v-if="!SelectRoles" class="empty-state">
              <i class="bi bi-person-gear"></i>
              <p>Vui lòng chọn một nhóm quyền để phân quyền chức năng.</p>
            </div>

            <div v-else-if="permissionTree.length === 0" class="empty-state">
              <p>Chưa có dữ liệu chức năng cho nhóm quyền này.</p>
            </div>

            <div v-else class="tree-list">
              <div v-for="node in permissionTree" :key="node.id" class="tree-node">
                <div class="tree-row"> 
                  <span class="tree-bullet"></span>               
                  <span class="tree-label">{{ node.name }}:</span>
                  <span>V</span>  
                  <input type="checkbox" v-model="node.IS_VIEW"  @change="togglePermission(node)" />
                  <span>I</span>  
                  <input type="checkbox" v-model="node.IS_INSERT" @change="togglePermission(node)" />
                  <span>U</span>  
                  <input type="checkbox" v-model="node.IS_UPDATE" @change="togglePermission(node)" />
                  <span>D</span>  
                  <input type="checkbox" v-model="node.IS_DELETE" @change="togglePermission(node)" />
                </div>

                <div v-if="node.children && node.children.length" class="tree-children">
                  <div v-for="child in node.children" :key="child.id" class="tree-node child-node">
                    <div class="tree-row">      
                      <span class="tree-bullet" :class="getBulletClass(child)"></span>                
                      <span class="tree-label">{{ child.name }}:</span>
                      <span>V</span>  
                      <input type="checkbox" v-model="child.IS_VIEW" @change="togglePermission(child)" />
                      <span>I</span>  
                      <input type="checkbox" v-model="child.IS_INSERT" @change="togglePermission(child)" />
                      <span>U</span>  
                      <input type="checkbox" v-model="child.IS_UPDATE" @change="togglePermission(child)" />
                      <span>D</span>  
                      <input type="checkbox" v-model="child.IS_DELETE" @change="togglePermission(child)" />
                    </div>

                    <div v-if="child.children && child.children.length" class="tree-children">
                      <div v-for="grandChild in child.children" :key="grandChild.id" class="tree-node child-node">
                        <div class="tree-row">
                          <span class="tree-bullet" :class="getBulletClass(grandChild)"></span>
                          <span class="tree-label">{{ grandChild.name }}</span>
                            <span>V</span>
                            <input type="checkbox" v-model="grandChild.IS_VIEW" @change="togglePermission(grandChild)" />
                            <span>I</span>
                            <input type="checkbox" v-model="grandChild.IS_INSERT" @change="togglePermission(grandChild)" />
                            <span>U</span>
                            <input type="checkbox" v-model="grandChild.IS_UPDATE" @change="togglePermission(grandChild)" />
                            <span>D</span>
                            <input type="checkbox" v-model="grandChild.IS_DELETE" @change="togglePermission(grandChild)" />
                        </div>
                        <div v-if="grandChild.children && grandChild.children.length" class="tree-children">
                          <div v-for="lev4 in grandChild.children" :key="lev4.id" class="tree-node child-node">
                            <div class="tree-row">
                              <span class="tree-bullet" :class="getBulletClass(lev4)"></span>
                              <span class="tree-label">{{ lev4.name }}</span>
                                <span>V</span>
                                <input type="checkbox" v-model="lev4.IS_VIEW" @change="togglePermission(lev4)" />
                                <span>I</span>
                                <input type="checkbox" v-model="lev4.IS_INSERT" @change="togglePermission(lev4)" />
                                <span>U</span>
                                <input type="checkbox" v-model="lev4.IS_UPDATE" @change="togglePermission(lev4)" />
                                <span>D</span>
                                <input type="checkbox" v-model="lev4.IS_DELETE" @change="togglePermission(lev4)" />
                            </div>
                            <div v-if="lev4.children && lev4.children.length" class="tree-children">
                              <div v-for="lev5 in lev4.children" :key="lev5.id" class="tree-node child-node">
                                <div class="tree-row">
                                  <span class="tree-bullet" :class="getBulletClass(lev5)"></span>
                                  <span class="tree-label">{{ lev5.name }}</span>
                                    <span>V</span>
                                    <input type="checkbox" v-model="lev5.IS_VIEW" @change="togglePermission(lev5)" />
                                    <span>I</span>
                                    <input type="checkbox" v-model="lev5.IS_INSERT" @change="togglePermission(lev5)" />
                                    <span>U</span>
                                    <input type="checkbox" v-model="lev5.IS_UPDATE" @change="togglePermission(lev5)" />
                                    <span>D</span>
                                    <input type="checkbox" v-model="lev5.IS_DELETE" @change="togglePermission(lev5)" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore, type roleItem } from '@/stores/user.store';

interface treeRole extends roleItem {
  children?: treeRole[];
}
interface group {
  ROLE_ID: number;
  ROLE_NAME: string;
  DESCRIPTION: string;
}

const userStore = useUserStore();
const route = useRoute()

const dataroles = ref<group[]>([]);
const datarolesDTL = ref<roleItem[]>([]);
const role=ref('')
const DESCRIPTION=ref('')
const SelectRoles=ref(0);
const ArrSelectRoleDTL=ref<number[]>([]);
const permissionTree=ref<treeRole[]>([]);


  const selectedCount = computed(() => {
      return datarolesDTL.value.filter((item) => (item.IS_VIEW || item.IS_INSERT || item.IS_UPDATE || item.IS_DELETE)).length;
    });
  const totalCount = computed(() => {
    //return permissionTree.value.flatMap((node) => flattenTree(node)).length;
      return datarolesDTL.value.length;
    });

    const getBulletClass = (item:roleItem) => {
      const isFunction = item && (item.FUNTION === 1 || item.FUNTION === true || item.FUNTION === '1');
      return {
        child: !isFunction,
        function: isFunction
      };
    }
    const flattenTree = (node:treeRole) => {
      const result = [node];
      if (node.children && node.children.length) {
        node.children.forEach((child) => {
          result.push(...flattenTree(child));
        });
      }
      return result;
    }
    const handAddRole = async () => {
      if (!role.value.trim()) return;
      const res = await userStore.AddRole({ ROLE_NAME: role.value.trim(), DESCRIPTION: DESCRIPTION.value.trim() });
      if (res && res.ok) {
        role.value = '';
        DESCRIPTION.value = '';
        await loadRoles();
      }
    }
    const loadRoles = async () => {
      const username = Array.isArray(route.query.UserName)
        ? route.query.UserName[0]
        : route.query.UserName || null;
      const res = await userStore.getRoles(username);
      if (res && res.ok) {
        dataroles.value = res.dataroles || [];
      }
    }
    const handSelectRole = async (roleId: number) => {
      SelectRoles.value = roleId;
      await handgetSelectRoleDTL();
    }
    const handgetSelectRoleDTL = async () => {
      if (!SelectRoles.value) return;
      const res = await userStore.getSelectRoleDTL({ ROLE_ID: SelectRoles.value });
      if (res && res.ok) {
        datarolesDTL.value = res.datarolesDTL || [];
        ArrSelectRoleDTL.value = [];
        datarolesDTL.value.forEach((item) => {
          if (item.P_MENU && item.MENU_ID) ArrSelectRoleDTL.value.push(item.MENU_ID);
        });
        buildPermissionTree();
      }
    }
    const buildPermissionTree = () => {
      const menuMap = new Map<string, treeRole>();
      const tree: treeRole[] = [];

      datarolesDTL.value.forEach((menu) => {
        if (menu.MENU_NAME)
        menuMap.set(menu.MENU_NAME, {
            id: menu.MENU_ID,
            MENU_NAME: menu.MENU_NAME,
            name: menu.MENU_LABLE || 'Chức năng',
            FUNTION: menu.FUNTION || false,
            MENU_ID_PARENT: menu.MENU_ID_PARENT || null,
            IS_UPDATE: menu.IS_UPDATE? true : false,
            IS_DELETE: menu.IS_DELETE? true : false,
            IS_INSERT: menu.IS_INSERT? true : false,
            IS_VIEW: menu.IS_VIEW? true : false,
            children: []
        });
      });

      datarolesDTL.value.forEach((menu) => {
        if (menu.MENU_NAME) {
          const node = menuMap.get(menu.MENU_NAME);
          if (node){
            if (menu.MENU_ID_PARENT) {
              const parent = menuMap.get(menu.MENU_ID_PARENT);
              if (parent && parent.children) parent.children.push(node);
            } else {
              tree.push(node);
            } 
          }
         
        }
      });

      permissionTree.value = tree;
      console.log('permissionTree', permissionTree.value);
    }
    const togglePermission = async (node: treeRole) => {
      if (!SelectRoles.value) return;      
      node.ROLE_ID = SelectRoles.value;
      const permission: roleItem = {
        ROLE_ID: SelectRoles.value,
        MENU_ID: node.id,
        IS_VIEW: node.IS_VIEW,
        IS_INSERT: node.IS_INSERT,
        IS_UPDATE: node.IS_UPDATE,
        IS_DELETE: node.IS_DELETE
      };
      console.log('togglePermission', permission);
      await userStore.UpdatePermission( permission );
    
    }
  
  onMounted(() => {
    loadRoles();
  });

</script>

<style scoped>
.permission-manager {
  padding: 12px 0;
}

.page-header {
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  background: linear-gradient(90deg, #f8f9fa 0%, #eef2ff 100%);
}

.page-header h5 {
  margin-bottom: 4px;
  font-weight: 600;
}

.page-header p {
  margin: 0;
  color: #6c757d;
}

.card {
  border: none;
  border-radius: 12px;
}

.card-header {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: rgb(30, 144, 255);
}

.page-card__header_r {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.role-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.role-item {
  border: 1px solid #dee2e6;
  background: #fff;
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  transition: all 0.2s ease;
}

.role-item:hover,
.role-item.active {
  border-color: #3b82f6;
  background: #eef6ff;
  color: #1d4ed8;
}

.permission-body {
  max-height: 72vh;
  overflow: auto;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  color: #6c757d;
  text-align: center;
}

.tree-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tree-node {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 10px;
  background: #fff;
}
.tree-bullet {
  width: 8px;
  height: 8px;
  margin-top: 7px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  flex-shrink: 0;
}

.tree-bullet.child {
  background: linear-gradient(135deg, #10b981, #059669);
}

.tree-bullet.function {
  background: linear-gradient(135deg, #94047c, #94047c);
}

.tree-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.tree-label {
  font-weight: 500;
  color: #374151;
}

.tree-children {
  margin-left: 20px;
  border-left: 1px solid #e5e7eb;
  padding-left: 12px;
  margin-top: 4px;
}

.child-node {
  background: #fafafa;
}
</style>