<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Plus, Search, Upload } from '@element-plus/icons-vue'

import { useBomStore } from '@/stores/bom.store'
import itemProject from './view-projectsItem.vue'
import BaseDailog from '../controls/BaseDialog.vue'
import FormAddProject from './formAddProject.vue'

interface ProjectItem {
  id?: number | string
  code_project?: string
  PROJ_NAME?: string
  [key: string]: unknown
}

const activeName = ref('BOM')
const bomStore = useBomStore()

const showfomAddObject = ref(false)
const projects = ref<ProjectItem[]>([])
const dataprojectsInActive = ref<ProjectItem[]>([])
const search = ref('')
const search_BOM_InAc = ref('')

const Showdataprojects = computed(() => {
  const keyword = search.value.trim().toUpperCase()

  return projects.value.filter((element) => {
    const code = (element.code_project ?? '').toUpperCase()
    const name = (element.PROJ_NAME ?? '').toUpperCase()
    return code.includes(keyword) || name.includes(keyword)
  })
})

const ShowdataprojectsInActive = computed(() => {
  const keyword = search_BOM_InAc.value.trim().toUpperCase()

  return dataprojectsInActive.value.filter((element) => {
    const code = (element.code_project ?? '').toUpperCase()
    const name = (element.PROJ_NAME ?? '').toUpperCase()
    return code.includes(keyword) || name.includes(keyword)
  })
})

const handShowForm_ADD_BOM_Whole = () => {
  const src = '/bom/AddBom_whole'
  window.open(src, '', 'fullscreen=yes, scrollbars=auto, titlebar=no')
}

const handeAddProject = () => {
  showfomAddObject.value = true
}

const getListProjectHasPaging = async () => {
  const res = await bomStore.getListProjectHasPaging()
  projects.value = res?.Projects ?? []
}

const getListProjectHasPagingInActive = async () => {
  const res = await bomStore.getListProjectHasPagingInActive()
  dataprojectsInActive.value = res?.dataprojectsInActive ?? []
}

onMounted(async () => {
  await getListProjectHasPaging()
  await getListProjectHasPagingInActive()
})
</script>


<template>
  <main class="bom-page">
    <header class="bom-heading">
      <div>
        <span class="bom-eyebrow">SẢN XUẤT / QUẢN LÝ</span>
        <h1>Danh sách BOM</h1>
      </div>
      <span class="bom-total">{{ Showdataprojects.length }} dự án</span>
    </header>

    <el-tabs v-model="activeName" class="bom-tabs" type="border-card">
      <el-tab-pane label="BOM đang hoạt động" name="BOM">
        <div class="bom-toolbar">
          <el-input
            v-model="search"
            class="bom-search"
            clearable
            placeholder="Tìm mã hoặc tên dự án"
            aria-label="Tìm mã hoặc tên dự án"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <div class="bom-actions">
            <el-button :icon="Upload" @click="handShowForm_ADD_BOM_Whole">
              Nạp BOM Dự Án
            </el-button>
            <el-button type="primary" :icon="Plus" @click="handeAddProject">
              Thêm dự án
            </el-button>
          </div>
        </div>

        <div class="bom-table-wrap">
          <table class="bom-table">
            <thead>
              <tr>
                <th class="action-column">Thao tác</th>
                <th>ID</th>
                <th>Mã dự án</th>
                <th>Tên dự án</th>
                <th>Mã sản phẩm</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Ghi chú</th>
                <th>Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              <itemProject
                v-for="project in Showdataprojects"
                :key="project.id"
                :project="project"
                :code_project="project.code_project"
              />
              <tr v-if="Showdataprojects.length === 0">
                <td class="bom-empty" colspan="9">Không tìm thấy dự án</td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="BOM ngừng hoạt động" name="inactive">
        <div class="bom-toolbar">
          <el-input
            v-model="search_BOM_InAc"
            class="bom-search"
            clearable
            placeholder="Tìm mã hoặc tên dự án"
            aria-label="Tìm mã hoặc tên dự án trong BOM ngừng hoạt động"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <div class="bom-table-wrap">
          <table class="bom-table">
            <thead>
              <tr>
                <th class="action-column">Thao tác</th>
                <th>ID</th>
                <th>Mã dự án</th>
                <th>Tên dự án</th>
                <th>Mã sản phẩm</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Ghi chú</th>
                <th>Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              <itemProject
                v-for="project in ShowdataprojectsInActive"
                :key="project.id"
                :project="project"
                :code_project="project.code_project"
              />
              <tr v-if="ShowdataprojectsInActive.length === 0">
                <td class="bom-empty" colspan="9">Không tìm thấy dự án</td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>

    <base-dailog v-model:active="showfomAddObject" :tile="'bổ sung dự án'">
      <FormAddProject />
    </base-dailog>
  </main>
</template>


<style scoped>
.bom-page {
  --bom-ink: #24352d;
  --bom-muted: #66776f;
  --bom-line: #dfe8e2;
  --bom-accent: #287451;
  min-height: 100%;
  padding: 22px 26px 28px;
  color: var(--bom-ink);
  background: #f5f8f5;
}

.bom-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin: 0 auto 18px;
  max-width: 1600px;
}

.bom-eyebrow {
  color: var(--bom-accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0;
}

.bom-heading h1 {
  margin: 4px 0 0;
  color: var(--bom-ink);
  font-size: 25px;
  font-weight: 650;
  line-height: 1.25;
}

.bom-total {
  padding: 5px 10px;
  border: 1px solid #d3e4d9;
  border-radius: 4px;
  background: #e9f3ed;
  color: #286344;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.bom-tabs {
  max-width: 1600px;
  margin: 0 auto;
  border: 1px solid var(--bom-line);
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 8px rgb(31 55 42 / 5%);
}

.bom-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 4px 0 16px;
}

.bom-search {
  width: min(100%, 360px);
}

.bom-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.bom-table-wrap {
  max-height: calc(100vh - 290px);
  min-height: 300px;
  overflow: auto;
  border: 1px solid var(--bom-line);
  border-radius: 4px;
}

.bom-table {
  width: 100%;
  min-width: 1120px;
  border-collapse: separate;
  border-spacing: 0;
  color: var(--bom-ink);
  font-size: 13px;
  text-align: left;
}

.bom-table thead th {
  position: sticky;
  z-index: 1;
  top: 0;
  padding: 11px 12px;
  border-bottom: 1px solid #d4e2d9;
  background: #edf4ef;
  color: #43574a;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.bom-table tbody :deep(td) {
  padding: 9px 12px;
  border-bottom: 1px solid #edf1ee;
  background: #fff;
  vertical-align: middle;
}

.bom-table tbody :deep(tr:hover td) {
  background: #f5faf6;
}

.bom-table .action-column {
  min-width: 116px;
}

.bom-empty {
  height: 120px;
  color: var(--bom-muted);
  text-align: center;
}

@media (max-width: 700px) {
  .bom-page {
    padding: 16px 12px 22px;
  }

  .bom-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .bom-search {
    width: 100%;
  }

  .bom-actions :deep(.el-button) {
    flex: 1 1 auto;
    margin-left: 0;
  }

  .bom-table-wrap {
    max-height: calc(100vh - 330px);
  }
}
</style>