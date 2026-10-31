<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'

import  SelectMaterial  from '../controls/SelectProject/SelectMaterial.vue'

interface NewProject {
  projectCode: string
  projectName: string
  partNum: string
  note: string
}

interface LegacyStore {
  dispatch: (action: string, payload: NewProject) => Promise<unknown>
}

const store = (getCurrentInstance()?.proxy as { $store?: LegacyStore } | null)?.$store

const data = ref<NewProject>({
  projectCode: '',
  projectName: '',
  partNum: '',
  note: '',
})

async function hacdleSaveProject() {
  await store?.dispatch('SaveProject', data.value)
}

function getValueMaterialId(value: string) {
  data.value.partNum = value
}
</script>


<template>
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-60">
      <div class="row d-flex justify-content-center align-items-center h-60">
        <div class="col-12 col-md-9 col-lg-8 col-xl-7">
          <div class="card h-100" style="border-radius: 15px;">
            <div class="card-body p-1">
              <form>
                <div class="form-outline mb-1">
                    <label class="form-label" for="form3Example1cg">Mã Dự án:</label>
                    <input type="text" id="form3Example1cg" class="form-control form-control-sm" v-model="data.projectCode" />
                </div>

                <div class="form-outline mb-1">
                    <label class="form-label" for="form3Example1cg">Tên Dự án:</label>
                    <input type="text" id="form3Example1cg" class="form-control form-control-sm" v-model="data.projectName"/>
                </div>

                <div class="form-outline mb-1">
                    <label class="form-label" for="form3Example3cg">Mã Sản phẩm(P/N):</label>
                    <SelectMaterial 
                    @getValue="getValueMaterialId"
                    />

                </div>

                <div class="form-outline mb-3">
                    <label class="form-label" for="form3Example4cdg">Ảnh sản phẩm:</label>
                    <input type="file" id="form3Example4cdg" class="form-control-file" />
                </div>

                <div class="form-outline mb-1" >
                    <label class="form-label" >Mô tả:</label>
                    <textarea class="form-control" rows="3" v-model="data.note">
                    </textarea>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="button" class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" @click="hacdleSaveProject()">Lưu</button>
                </div>
                
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style >

</style>