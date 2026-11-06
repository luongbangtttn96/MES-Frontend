<template>
  <div class="dynamic-select-wrapper" :style="{ width: width }">
    <el-select
      :model-value="selectedKey"
      filterable
      clearable
      :placeholder="placeholder"
      :filter-method="onFilter"
      no-data-text="Không tìm thấy kết quả"
      fit-input-width
      popper-class="dynamic-select-popper"
      style="width: 100%"
      @update:model-value="onSelect"
      @visible-change="onVisibleChange"
    >
      <el-option
        v-for="(item, index) in results"
        :key="`${item[optionValue]}_${index}`"
        :label="String(item[optionText])"
        :value="item[optionValue]"
      />
      <!-- Giá trị hiện tại (dạng chuỗi) không nằm trong danh sách options -->
      <el-option
        v-if="orphanLabel"
        :key="'__orphan__'"
        :label="orphanLabel"
        :value="orphanLabel"
        style="display: none"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

type Option = Record<string, any>

const props = withDefaults(defineProps<{
  placeholder?: string;
  options: Option[];
  optionValue?: string;
  optionText?: string;
  modelValue?: Option | string | null;
  width?: string;
  height?: string;
  size?: number;
}>(), {
  placeholder: 'search',
  optionValue: 'id',
  optionText: 'name',
  modelValue: null,
  width: '300px',
  height: '38px',
  size: 30,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Option | string | null): void
  (e: 'search', value: string): void
  (e: 'change', value: Option | null): void
}>()

const search = ref('')

// Khóa của lựa chọn hiện tại dùng cho el-select
const selectedKey = computed(() => {
  const v = props.modelValue
  if (v == null || v === '') return undefined
  return typeof v === 'object' ? v[props.optionValue] : v
})

const orphanLabel = computed(() => {
  const v = props.modelValue
  if (typeof v === 'string' && v && !props.options.some((o) => o[props.optionValue] === v)) {
    return v
  }
  return ''
})

const results = computed(() => {
  const kw = search.value.toLowerCase()
  return kw
    ? props.options.filter((i) => String(i[props.optionText]).toLowerCase().includes(kw))
    : props.options
})

const onFilter = (keyword: string) => {
  search.value = keyword
  emit('search', keyword)
}

const onVisibleChange = (visible: boolean) => {
  if (!visible) search.value = ''
}

const onSelect = (key: unknown) => {
  if (key === undefined || key === null || key === '') {
    emit('update:modelValue', null)
    emit('change', null)
    return
  }
  const option = props.options.find((o) => o[props.optionValue] === key) ?? null
  emit('update:modelValue', option)
  emit('change', option)
}

// Tải lại danh sách khi options đổi để bộ lọc không giữ kết quả cũ
watch(() => props.options, () => { search.value = '' })
</script>

<style scoped>
.dynamic-select-wrapper {
  position: relative;
}
</style>

<style>
/* Popper được teleport ra body nên cần style không scoped */
.dynamic-select-popper {
  max-width: 480px;
}
.dynamic-select-popper .el-select-dropdown__item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
