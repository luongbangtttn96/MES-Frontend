<template>
    <div class="pu-page">
      <div class="pu-container">
        <div class="pu-row">
          <div class="pu-col">
            <div class="pu-card">
              <div class="pu-card-title">Cập nhật dự án</div>
              <div class="pu-card-body">
                <form class="pu-form" @submit.prevent>
                  <div class="form-outline mb-1">
                      <label class="form-label" for="form3Example1cg">Mã Dự án:</label>
                      <el-input v-model="dataProject.PROJ_CODE" />
                  </div>
  
                  <div class="form-outline mb-1">
                      <label class="form-label" for="form3Example1cg">Tên Dự án:</label>
                      <el-input v-model="dataProject.PROJ_NAME" />
                  </div>
  
                  <div class="form-outline mb-1">
                      <label class="form-label" for="form3Example3cg">Mã Sản phẩm(P/N):</label>
                      <selectMaterial 
                      @input="getValueMaterialId"
                      :value="dataProject.PART_NUM"
                      />  
                  </div>
                  <div class="form-outline mb-1">
                      <label class="form-label" for="form3Example3cg">CODE Prefix:</label>
                      <el-input v-model="dataProject.CODE_PREFIX" maxlength="100" /> 
                  </div>
                <div class="form-outline mb-3">
                      <label class="form-label" for="form3Example4cdg">Active:</label>
                      <el-checkbox v-model="dataProject.IS_ACTIVE" />
                  </div>
                  <div class="form-outline mb-3">
                      <label class="form-label" for="form3Example4cdg">Ảnh sản phẩm:</label>
                      <el-upload :auto-upload="false" :limit="1" accept="image/*"><el-button>Chọn ảnh</el-button></el-upload>
                  </div>
                 
                  <div class="form-outline mb-1" >
                      <label class="form-label" >Mô tả:</label>
                      <el-input type="textarea" :rows="3" v-model="dataProject.NOTE" />
                      
                  </div>
  
                  <div class="pu-actions">
                    <el-button type="primary" @click="handUpdateProject">Cập nhật</el-button>
                  </div>
                  
                </form>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'

  import { useBomStore } from '@/stores/bom.store'
  import { useProjectStore } from '@/stores/project.store'

  import selectMaterial from '../controls/SelectProject/ControSelectMaterial.vue'
  import type { ProjectDetail } from '@/types/bom'
  

  const projectStore = useProjectStore()
  const props = defineProps<{ PROJ_ID?: number }>()

  const route = useRoute()
  const bomStore = useBomStore()

  const dataProject = ref<ProjectDetail>({})

  async function handUpdateProject() {
    await projectStore.UpdateProject(dataProject.value)
  }

  function getValueMaterialId(value: string) {
    dataProject.value.PART_NUM = value
  }

  onMounted(async () => {
    const queryId = route.query.PROJ_ID
    const res = await bomStore.getProject({
      PROJ_ID: (Array.isArray(queryId) ? queryId[0] : queryId) || props.PROJ_ID,
    })
    dataProject.value = 'dataProject' in res ? res.dataProject : {}
  })
  </script>
  
  <style scoped>
.pu-page {
  min-height: 100%;
  padding: 28px 16px;
  background: #f3f6f3;
}

.pu-container,
.pu-row,
.pu-col {
  width: 100%;
}

.pu-col {
  max-width: 640px;
  margin: 0 auto;
}

.pu-card {
  border: 1px solid #dfe8e2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgb(31 55 42 / 6%);
}

.pu-card-title {
  padding: 14px 20px;
  border-bottom: 1px solid #edf1ee;
  color: #26382e;
  font-size: 16px;
  font-weight: 650;
}

.pu-card-body {
  padding: 18px 20px 20px;
}

.pu-form .form-outline {
  margin-bottom: 14px;
}

.pu-form .form-label {
  display: block;
  margin-bottom: 5px;
  color: #43574a;
  font-size: 12px;
  font-weight: 600;
}

.pu-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 6px;
}
  
  </style>