<template>
  <div class="permission-manager">
    <div class="page-header">
      <h5>Quản lý phân quyền chức năng</h5>
      <p>Chọn nhóm quyền để bật/tắt chức năng cho người dùng trong hệ thống.</p>
    </div>

    <div class="row">
      <div class="col-lg-4 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <strong>Nhóm quyền</strong>
          </div>
          <div class="card-body">
            <div class="input-group mb-3">
              <input
                v-model="DESCRIPTION"
                type="text"
                maxlength="30"
                class="form-control"
                placeholder="Mô tả nhóm quyền"
              />
            </div>
            <div class="input-group mb-3">
              <input
                v-model="role"
                type="text"
                maxlength="30"
                class="form-control"
                placeholder="Tên nhóm quyền"
                @keyup.enter="handAddRole"
              />
              <div class="input-group-append">
                <button class="btn btn-outline-primary" @click="handAddRole">Thêm</button>
              </div>
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
        </div>
      </div>

      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      dataroles: [],
      datarolesDTL: [],
      role: '',
      DESCRIPTION: '',
      SelectRoles: 0,
      ArrSelectRoleDTL: [],
      permissionTree: []
    };
  },
  props: {
    dataUser: {
      type: Object,
      default: null
    }
  },
  computed: {
    selectedCount() {
      return this.datarolesDTL.filter((item) => {
        console.log('selectedCount',item);
        return item.IS_VIEW || item.IS_INSERT || item.IS_UPDATE || item.IS_DELETE;
      }).length;
    },
    totalCount() {
      return this.permissionTree.flatMap((node) => {
        console.log('totalCount', node);
        return this.flattenTree(node);
      }).length;
    }
  },
  methods: {
    ...mapActions([
      'getRoles',
      'AddRole',
      'getSelectRoleDTL',
      'UpdatePermission'
    ]),
    getBulletClass(item) {
      const isFunction = item && (item.FUNTION === 1 || item.FUNTION === true || item.FUNTION === '1');
      return {
        child: !isFunction,
        function: isFunction
      };
    },
    flattenTree(node) {
      console.log('flattenTree called with node:', node);
      const result = [node];
      if (node.children && node.children.length) {
        node.children.forEach((child) => {
          result.push(...this.flattenTree(child));
        });
      }
      return result;
    },
    async handAddRole() {
      if (!this.role.trim()) return;
      const res = await this.AddRole({ ROLE_NAME: this.role.trim(), DESCRIPTION: this.DESCRIPTION.trim() });
      if (res && res.ok) {
        this.role = '';
        this.DESCRIPTION = '';
        await this.loadRoles();
      }
    },
    async loadRoles() {
      const res = await this.getRoles(this.$route.query.UserName || '');
      if (res && res.ok) {
        this.dataroles = res.dataroles || [];
      }
    },
    async handSelectRole(roleId) {
      this.SelectRoles = roleId;
      await this.handgetSelectRoleDTL();
    },
    async handgetSelectRoleDTL() {
      if (!this.SelectRoles) return;
      const res = await this.getSelectRoleDTL({ ROLE_ID: this.SelectRoles });
      if (res && res.ok) {
        this.datarolesDTL = res.datarolesDTL || [];
        this.ArrSelectRoleDTL = [];
        this.datarolesDTL.forEach((item) => {
          if (item.P_MENU) this.ArrSelectRoleDTL.push(item.MENU_ID);
        });
        this.buildPermissionTree();
      }
    },
    buildPermissionTree() {
      const menuMap = new Map();
      const tree = [];

      this.datarolesDTL.forEach((menu) => {
        menuMap.set(menu.MENU_ID, {
            id: menu.MENU_ID,
            name: menu.MENU_LABLE || 'Chức năng',
            FUNTION: menu.FUNTION || false,
            parentId: menu.MENU_ID_PARENT || null,
            IS_UPDATE: menu.IS_UPDATE || false,
            IS_DELETE: menu.IS_DELETE || false,
            IS_INSERT: menu.IS_INSERT || false,
            IS_VIEW: menu.IS_VIEW || false,
            children: []
        });
      });

      this.datarolesDTL.forEach((menu) => {
        const node = menuMap.get(menu.MENU_ID);
        if (menu.MENU_ID_PARENT) {
          const parent = menuMap.get(menu.MENU_ID_PARENT);
          if (parent) parent.children.push(node);
        } else {
          tree.push(node);
        }
      });

      this.permissionTree = tree;
      console.log('permissionTree', this.permissionTree);
    },
    async togglePermission(node) {
      if (!this.SelectRoles) return;
      node.ROLE_ID = this.SelectRoles;
      console.log('togglePermission', node);
      const res = await this.UpdatePermission( node );
    //   if (res && res.ok) {
    //     this.updateChildren(node);
    //     this.permissionTree = [...this.permissionTree];
    //   }
    },
    // updateChildren(node) {
    //   if (!node.children) return;
    //   node.children.forEach((child) => {
    //     child.IS_DELETE = node.IS_DELETE;
    //     child.IS_INSERT = node.IS_INSERT;
    //     child.IS_UPDATE = node.IS_UPDATE;
    //     child.IS_VIEW = node.IS_VIEW;
    //     this.updateChildren(child);
    //   });
    // }
  },
  created() {
    this.loadRoles();
  }
};
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