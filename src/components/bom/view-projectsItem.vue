<template>
  <tr class="true active">
    <!----><!----><!----><!---->
    <td style="padding: 3px" v-if="!showCompone" class="text-truncate">
      <div class="container row padding: 2px;">
        <div class="bom-row-actions">
          <el-button link :icon="EditPen" aria-label="Cập nhật dự án" title="Cập nhật dự án" @click="handShowUpdateProject(project?.id)" />
          <el-button link type="primary" :icon="Operation" aria-label="Mã lỗi" title="Mã lỗi" @click="handSetDefectCode(project?.id)" />
          <el-button link type="warning" :icon="WarningFilled" aria-label="Nhà sản xuất nguyên liệu" title="Nhà sản xuất nguyên liệu" @click="handSetMfrOfMaterial(project?.id)" />
          <el-button link :icon="Document" aria-label="Chi tiết BOM" title="Chi tiết BOM" @click="handShowBomHDRDTL(project?.id)" />
        </div>
      </div>
    </td>

    <!---->
    <td class="expand-column" v-if="!showCompone">
      <div style="padding-left: 0px">
        <span>
          <el-button link class="bom-expand-button" :icon="CaretRight" aria-label="Mở chi tiết BOM" title="Mở chi tiết BOM" @click="showBomHDR" @mouseenter="onChange" />
        </span>
        <span> {{ project?.id }} </span>
      </div>
    </td>

    <td v-if="!showCompone">
      <div style="padding-left: 0px">
        <span> {{ project?.code_project }} </span>
      </div>
    </td>

    <td v-if="!showCompone">
      <div style="padding-left: 0px">
        {{ project?.PROJ_NAME }}
      </div>
    </td>

    <td v-if="!showCompone">
      <div style="padding-left: 0px">
        {{ project?.PART_NUM }}
      </div>
    </td>

    <td v-if="!showCompone">
      <div class="no-padding" style="padding-left: 0px">
        <span> {{ project?.discription }} </span>
      </div>
    </td>

    <td v-if="!showCompone">
      <div class="no-padding" style="padding-left: 0px">
        <span> {{ project?.IS_ACTIVE }} </span>
      </div>
    </td>

    <td v-if="!showCompone">
      <div class="no-padding" style="padding-left: 0px">
        <span> {{ project?.NOTE }} </span>
      </div>
    </td>
    <td v-if="!showCompone">
      <div class="no-padding" style="padding-left: 0px">
        <span> {{ project?.Update }} </span>
      </div>
    </td>

    <td style="padding: 3px" v-if="showCompone" colspan="9">
      <div style="overflow: auto">
        <componensProject
          :showCompone="showCompone"
          :project="project"
          :BomHDR="BomHDR"
          @show-BomHDR="showBomHDR"
        />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, toRef } from 'vue'
import { CaretRight, Document, EditPen, Operation, WarningFilled } from '@element-plus/icons-vue'

import componensProject from './ComponesProject.vue'
import type { ProjectItem } from '@/types/bom'


const props = withDefaults(
  defineProps<{
    project?: ProjectItem | null
    code_project?: string
  }>(),
  {
    project: null,
    code_project: '',
  },
)

const showCompone = ref(false)
const BomHDR = ref<any[]>([])

const project = toRef(props, 'project')
const app = getCurrentInstance()
const store = (app?.proxy as any)?.$store

async function showBomHDR() {
  showCompone.value = !showCompone.value

  if (showCompone.value) {
    console.log(props.project?.code_project)

    if (store && typeof store.dispatch === 'function') {
      const res = await store.dispatch('getListBomHDR', props.project?.code_project)
      BomHDR.value = res?.Projects ?? []
    } else {
      BomHDR.value = []
    }
  } else {
    BomHDR.value = []
  }
}

function onChange() {
  console.log('Đang triển khai')
}

function handShowBomHDRDTL(id?: number | string) {
  const value = id ?? ''
  const src = `/bom/BomAll_DTL_Project?PROJ_ID=${value}`
  window.open(src, 'newWin', 'fullscreen=yes, scrollbars=auto, titlebar=no')
}

function handSetMfrOfMaterial(id?: number | string) {
  const value = id ?? ''
  const src = `/inv/SetMfrOfMaterial?PROJ_ID=${value}`
  window.open(src, 'newWin', 'fullscreen=yes, scrollbars=auto, titlebar=no')
}

function handShowUpdateProject(id?: number | string) {
  const value = id ?? ''
  const src = `/bom/ShowUpdateProject?PROJ_ID=${value}`
  window.open(src, 'newWin', 'fullscreen=yes, scrollbars=auto, titlebar=no')
}

function handSetDefectCode(id?: number | string) {
  const value = id ?? ''
  const src = `/qc/Code_Defect_Project?PROJ_ID=${value}`
  window.open(src, '', 'fullscreen=yes, scrollbars=auto, titlebar=no')
}

// keep same template variable names:
// showCompone, BomHDR, project, showBomHDR, handShowUpdateProject, handSetDefectCode,
// handSetMfrOfMaterial, handShowBomHDRDTL, onChange
</script>

<style>
.bom-row-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
}

.bom-row-actions .el-button,
.bom-expand-button {
  width: 28px;
  height: 28px;
  margin: 0;
  font-size: 15px;
}
</style>