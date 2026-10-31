<template>
  <div class="modern-config-page">
    <title-page :titlepage="'Thiết Lập Chức năng hệ thống'" />

    <div class="page-card">
      <div class="page-card__header">
        <div>
          <h4>Thông tin chức năng</h4>
          <p>Thiết lập menu cha, mã chức năng, nhãn và đường dẫn cho hệ thống.</p>
        </div>
        <el-button class="btn btn-primary" @click="hand_LuuConfigFuncSystem()">Lưu cấu hình</el-button>
      </div>

      <el-row :gutter="2">
      <!-- <div class="row g-3"> -->
        <el-col :lg="6" :md="6" :sm="12">
        <!-- <div class="form-group col-lg-3 col-md-6"> -->
          <label>Menu cha</label>
          <el-autocomplete
          v-model="menuselect"
          :fetch-suggestions="querySearch"
          clearable
          class="w-50"
          placeholder="Please Input"
          @select="handleSelect"
        />
        </el-col>
        <el-col :lg="4" :md="4" :sm="12">
          <label>Mã chức năng <el-text class="mx-1" type="danger">*</el-text></label>
          <el-input type="text" v-model="itemFunctionSys.MENU_NAME" maxlength="30" required />
        </el-col>
        <el-col :lg="6" :md="6" :sm="12">
          <label>Nhãn chức năng <el-text class="mx-1" type="danger">*</el-text></label>
          <el-input type="text" v-model="itemFunctionSys.MENU_LABLE" maxlength="30" required />
        </el-col>
        <el-col :lg="8" :md="8" :sm="12">
          <label>Link <el-text class="mx-1" type="danger">*</el-text></label>
          <el-input type="text" v-model="itemFunctionSys.LINK" maxlength="200" required />
        </el-col>
        <el-col :lg="4" :md="6" :sm="12">
          <label>TT Sắp xếp <el-text class="mx-1" type="danger">*</el-text></label>
          <el-input type="text" v-model="itemFunctionSys.SORTORDER" maxlength="200" required />
        </el-col>
        <el-col :lg="4" :md="6" :sm="12">
          <div class="switch-box">
            <input type="checkbox" v-model="itemFunctionSys.FUNTION" />
            <span>Chức năng thực thi</span>
          </div>
        </el-col>
        <el-col :lg="4" :md="6" :sm="12">
          <div class="switch-box">
            <input type="checkbox" v-model="itemFunctionSys.ISSHOW_MENU" />
            <span>Hiển thị Menu</span>
          </div>
        </el-col>
      </el-row>

      <div class="form-group mt-3">
        <label>Mô tả</label>
        <el-input type="textarea" v-model="itemFunctionSys.MENU_DESCRIPTION"></el-input>
      </div>
    </div>

    <el-row :gutter="5">
      <el-col :xs="24" :sm="10">
        <div class="page-card">
          <div class="page-card__header compact">
            <div>
              <h5>Cây chức năng</h5>
              <p>Nhấp vào từng node để chỉnh sửa thông tin nhanh.</p>
            </div>
          </div>

          <div class="tree-list">
            <div v-for="node in FuntionTree" :key="node.MENU_ID" class="tree-node">
              <div class="tree-row" @click="hand_selectFunctionSys_DTL(node)">
                <span class="tree-bullet"></span>
                <div class="tree-content">
                  <span class="tree-label">{{ node.MENU_LABLE }}</span>
                  <span class="tree-link">{{ node.LINK }}</span>
                </div>
              </div>

              <div v-if="node.children && node.children.length" class="tree-children">
                <div v-for="child in node.children" :key="child.MENU_ID" class="tree-node child-node">
                  <div class="tree-row"  @click="hand_selectFunctionSys_DTL(child)">
                    <span class="tree-bullet" :class="getBulletClass(child)"></span>
                    <div class="tree-content">
                      <span class="tree-label">{{ child.MENU_LABLE }}</span>
                      <span class="tree-link">{{ child.LINK }}</span>
                    </div>
                  </div>

                  <div v-if="child.children && child.children.length" class="tree-children">
                    <div v-for="grandChild in child.children" :key="grandChild.MENU_ID" class="tree-node child-node" >
                      <div class="tree-row" @click="hand_selectFunctionSys_DTL(grandChild)">
                        <span class="tree-bullet" :class="getBulletClass(grandChild)"></span>
                        <div class="tree-content">
                          <span class="tree-label">{{ grandChild.MENU_LABLE }}</span>
                          <span class="tree-link">{{ grandChild.LINK }}</span>
                        </div>
                      </div>
                      <div v-if="grandChild.children && grandChild.children.length" class="tree-children">
                        <div v-for="funtion in grandChild.children" :key="funtion.MENU_ID" class="tree-node child-node" >
                          <div class="tree-row" @click="hand_selectFunctionSys_DTL(funtion)">
                            <span class="tree-bullet" :class="getBulletClass(funtion)"></span>
                            <div class="tree-content">
                              <span class="tree-label">{{ funtion.MENU_LABLE }}</span>
                              <span class="tree-link">{{ funtion.LINK }}</span>
                            </div>
                          </div>
                          <div v-if="funtion.children && funtion.children.length" class="tree-children">
                            <div v-for="lv5 in funtion.children" :key="lv5.MENU_ID" class="tree-node child-node" >
                              <div class="tree-row" @click="hand_selectFunctionSys_DTL(lv5)">
                                <span class="tree-bullet" :class="getBulletClass(lv5)"></span>
                                <div class="tree-content">
                                  <span class="tree-label">{{ lv5.MENU_LABLE }}</span>
                                  <span class="tree-link">{{ lv5.LINK }}</span>
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
      </el-col>
      <el-col :xs="24" :sm="14">
        <div class="page-card">
          <div class="page-card__header compact">
            <div>
              <h5>Danh sách chức năng</h5>
              <p>Danh sách hiện tại trong hệ thống.</p>
            </div>
          </div>

          <div class="table-wrap">
            <table class="table modern-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mã</th>
                  <th>Nhãn</th>
                  <th>Link</th>
                  <th>Function</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataFunctionSys_DTL" :key="index" @click="hand_selectFunctionSys_DTL(item)">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.MENU_NAME }}</td>
                  <td>{{ item.MENU_LABLE }}</td>
                  <td>{{ item.LINK }}</td>
                  <td>{{ item.FUNTION }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';
import TitlePage from "@/components/controls/TitlePage.vue";
//mport contrSelectFunctionSys from "@/components/controls/SelectProject/DynamicSelect.vue";

import { useSystemStore, type MenuItem } from '@/stores/system.store';


 interface treeNode extends MenuItem {
   children?: treeNode[];
 }

//  interface SelectItem {
//   id: string | null;
//   name: string | null;
// }

interface SelectMenuItem {
  value: string | null;
  MENU_NAME: string | null;
}

const systemStore = useSystemStore();

const itemFunctionSys = ref<MenuItem>({});
const FuntionTree = ref<treeNode[]>([]);
let menuMap = new Map<string, treeNode>();
const dataFunctionSys_DTL = ref<MenuItem[]>([]);
// const SelectFunctionSys = ref<SelectItem[]>([]);

// const selectedObject = ref<SelectItem | null>(null);
const SelectMenu = ref<SelectMenuItem[]>([]);
const SelectMenuValue = ref<SelectMenuItem | null>(null);
const menuselect= ref('')
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? SelectMenu.value.filter(item => item.value?.toLowerCase().indexOf(queryString.toLowerCase())===0)
    : SelectMenu.value
  // call callback function to return suggestions
  cb(results)
}

const handleSelect = (item: SelectMenuItem) => {
  SelectMenuValue.value= item
  itemFunctionSys.value = {
    ...(itemFunctionSys.value || {}),
    MENU_ID_PARENT: SelectMenuValue.value.MENU_NAME
  };
};
// const SelecValue=(value: SelectItem | null) =>{
//   const parentId = value && value.id != null ? value.id : null;
//   itemFunctionSys.value = {
//     ...(itemFunctionSys.value || {}),
//     MENU_ID_PARENT: parentId
//   };
//   selectedObject.value = value;
// }

const getBulletClass = (item: MenuItem) => {
  const isFunction = item && (item.FUNTION === 1 || item.FUNTION === true || item.FUNTION === '1');
  return {
    child: !isFunction,
    function: isFunction
  };
}
    
  const hand_selectFunctionSys_DTL = (item: MenuItem, event: Event) => {
    event && event.stopPropagation(); // Prevent event bubbling
    if (!item) return;
    //console.log('hand_selectFunctionSys_DTL', item);
    itemFunctionSys.value = { ...item };
    //if(!item.MENU_ID_PARENT) return;

    const selectedNode = SelectMenu.value.find(menu => menu.MENU_NAME === item.MENU_ID_PARENT);
    //console.log('selectedNode', selectedNode);
    menuselect.value = selectedNode ? selectedNode.value ?? '' : '';
    
  }
    
  const hand_LuuConfigFuncSystem = async () => {
    //console.log('Current SelectMenuValue:', SelectMenuValue.value);
    if (!itemFunctionSys.value || !itemFunctionSys.value.MENU_NAME || itemFunctionSys.value.MENU_NAME.length === 0) {
      return;
    }
    let data={
      MENU_ID_PARENT:itemFunctionSys.value.MENU_ID_PARENT,
      FUNTION:itemFunctionSys.value.FUNTION,
      MENU_NAME:itemFunctionSys.value.MENU_NAME,
      MENU_LABLE:itemFunctionSys.value.MENU_LABLE,
      ISSHOW_MENU: itemFunctionSys.value.ISSHOW_MENU,
      LINK:itemFunctionSys.value.LINK,
      MENU_DESCRIPTION:itemFunctionSys.value.MENU_DESCRIPTION,
      SORTORDER: itemFunctionSys.value.SORTORDER,
    }
    systemStore.LuuConfigFuncSystem(data).then(()=>{
      pro_getFunctionSys_DTL()
      proc_getFunctionSys()
    })
  }
  const pro_getFunctionSys_DTL = async () => {
    const res=await systemStore.getFunctionSys_DTL();
    if (res?.dataFunctionSys_DTL && Array.isArray(res.dataFunctionSys_DTL)) {
      dataFunctionSys_DTL.value=res.dataFunctionSys_DTL;
      buildFunctionTree();
    }
  }

  function buildFunctionTree() {
    menuMap = new Map<string, treeNode>();
    const tree:treeNode[] = [];

    dataFunctionSys_DTL.value.forEach((funtion) => {
      if (funtion.MENU_NAME){
        menuMap.set(funtion.MENU_NAME, {
          MENU_ID: funtion.MENU_ID,
          MENU_NAME: funtion.MENU_NAME ,
          MENU_LABLE: funtion.MENU_LABLE ,            
          MENU_DESCRIPTION:funtion.MENU_DESCRIPTION,
          MENU_ID_PARENT: funtion.MENU_ID_PARENT || null,
          LINK: funtion.LINK,
          ISSHOW_MENU: funtion.ISSHOW_MENU? true : false,
          SORTORDER: funtion.SORTORDER,
          FUNTION: funtion.FUNTION? true : false,
          children: []
        });
      };      
    });


    dataFunctionSys_DTL.value.forEach((fun) => {
      if (fun.MENU_NAME) {
        const node = menuMap.get(fun.MENU_NAME);
        if (node) {
          if (fun.MENU_ID_PARENT) {
            const parent = menuMap.get(fun.MENU_ID_PARENT);
            if (parent && parent.children) {
              parent.children.push(node);
              //console.log('Added node to parent:', parent, node);
            }
          } else {
            tree.push(node);
          }
        }
        
      }
      
    });

    FuntionTree.value = tree;
    console.log('FuntionTree', tree);
  }

    const proc_getFunctionSys = async () => {
      try {
        const res= await systemStore.getFunctionSys()
        if (res?.SelectFunctionSys && Array.isArray(res.SelectFunctionSys)) { 
            const datamn: SelectMenuItem[] = res.SelectFunctionSys.map((element: any) => ({
              value: element.MENU_LABLE,
              MENU_NAME: element.MENU_NAME
            }))

            SelectMenu.value=datamn
        }
      } catch (error) {
        throw error;
      }
    }
  

onMounted(() => {
  proc_getFunctionSys()
  pro_getFunctionSys_DTL()
})
</script>

<style scoped>
.modern-config-page {
  padding: 2px 0 4px;
}

.page-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  padding: 6px 6px;
}

.page-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.page-card__header.compact {
  margin-bottom: 12px;
}

.page-card__header h4,
.page-card__header h5 {
  margin-bottom: 2px;
  font-weight: 700;
  color: #1f2937;
}

.page-card__header p {
  margin: 0;
  color: #6b7280;
  font-size: 13px;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.form-control {
  border-radius: 10px;
  border: 1px solid #d1d5db;
  padding: 8px 10px;
}

.form-control:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.switch-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  color: #374151;
  font-size: 14px;
}

.btn-primary {
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 600;
}

.tree-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
}

.tree-list::-webkit-scrollbar {
  width: 8px;
}

.tree-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.tree-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.tree-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.tree-node {
  border: 1px solid #eef2f7;
  border-radius: 8px;
  background: #fcfdff;
  padding: 5px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
}

.tree-node:hover {
  border-color: #93c5fd;
  background: #f5faff;
}

.tree-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
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

.tree-content {
  display: flex;
  flex-direction: column;
}

.tree-label {
  font-weight: 600;
  color: #111827;
}

.tree-link {
  font-size: 12px;
  color: #6b7280;
}

.tree-children {
  margin-left: 12px;
  margin-top: 4px;
  border-left: 1px dashed #d1d5db;
  padding-left: 8px;
}

.table-wrap {
  max-height: 480px;
  overflow: auto;
}

.modern-table {
  margin-bottom: 0;
}

.modern-table thead th {
  background: #f8fafc;
  color: #475569;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.modern-table tbody tr {
  cursor: pointer;
  transition: background 0.15s ease;
}

.modern-table tbody tr:hover {
  background: #f8fbff;
}
</style>