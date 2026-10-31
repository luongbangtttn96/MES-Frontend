<template>
  <el-row >  
      <label class="le_giua" style="padding-top: 5px;">Hiện Thị:</label> 
      <select v-model="currentSize" style="height: 32px;">
          <option v-for="(item) in ArrSizePages" :key="item" :value="item">{{ item }}</option>
      </select>
      
      <el-button @click="handPrePagePNOnWay()">&laquo;</el-button> 
      <input type="text" v-model="currentPage" size="1" class="Page_Number center" maxlength="3" @change="handChangePage()" >
        <b>:</b>
      <input type="text" v-model="props.totalPages" size="1" class="Page_Number center" maxlength="3" disabled >
      <el-button  @click="handNextPageOnWay()"> &raquo;</el-button>
  </el-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// 1. Định nghĩa Interfaces cho Props và Emit
interface PageValue {
  page: number
  size: number
}

// Định nghĩa Interface Props đầy đủ
interface Props {
  ArrSizePages?: number[]
  totalPages: number
  modelValue: PageValue
}

// 2. Khai báo Props với giá trị mặc định
const props = withDefaults(defineProps<Props>(), {
  ArrSizePages: () => [20, 50, 100],
  modelValue: () => ({ page: 1, size: 50 }),
  totalPages: Number
})

// 3. Khai báo Emits (thay thế cho this.$emit)
const emit = defineEmits<{
  (e: 'update:modelValue', value: PageValue): void
}>()

// 4. Reactive States
const currentPage = ref<number>(props.modelValue.page ?? 1)
const currentSize = ref<number>(props.modelValue.size ?? 50)

// 5. Watchers (Đồng bộ dữ liệu khi props thay đổi và phát sự kiện khi state thay đổi)
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      currentPage.value = newVal.page
      currentSize.value = newVal.size
    }
  },
  { deep: true }
)

watch(currentPage, (newVal) => {
  emit('update:modelValue', { page: newVal, size: currentSize.value })
})

watch(currentSize, (newVal) => {
  emit('update:modelValue', { page: currentPage.value, size: newVal })
})

// 6. Methods
const handChangePage = () => {
  console.log(currentPage.value > props.totalPages)
  if (currentPage.value > props.totalPages) {
    currentPage.value = props.totalPages
  }
  if (currentPage.value < 1) {
    currentPage.value = 1
  }
}

const handPrePagePNOnWay = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handNextPageOnWay = () => {
  if (currentPage.value < props.totalPages) {
    currentPage.value++
  }
}
</script>

<style>
.center {
       text-align: center;
    }
</style>