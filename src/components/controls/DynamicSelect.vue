<template>
  <el-select
    v-model="selectedKey"
    filterable
    clearable
    :fit-input-width="true"
    :filter-method="onFilter"
    :placeholder="placeholder"
    @visible-change="onVisibleChange"
  >
    <el-option
      v-for="item in results"
      :key="item[optionValue]"
      :label="String(item[optionText])"
      :value="item[optionValue]"
    >
      <!-- Highlight phần khớp, tự escape HTML để tránh XSS -->
      <template v-for="(part, i) in highlight(item[optionText])" :key="i">
        <b v-if="part.match" class="hl">{{ part.text }}</b>
        <span v-else>{{ part.text }}</span>
      </template>
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type Option = Record<string, any>

const props = withDefaults(
  defineProps<{
    options: Option[]
    modelValue?: Option | null
    optionValue?: string
    optionText?: string
    placeholder?: string
    width?: string
  }>(),
  {
    modelValue: null,
    optionValue: 'id',
    optionText: 'name',
    placeholder: 'search',
    width: '300px',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: Option | null): void
  (e: 'search', value: string): void
}>()

const search = ref('')

// v-model: object <-> key
const selectedKey = computed({
  get: () => props.modelValue?.[props.optionValue] ?? null,
  set: (key) => {
    const opt = props.options.find((o) => o[props.optionValue] === key) ?? null
    emit('update:modelValue', opt)
  },
})

// Lọc không phân biệt hoa thường
const results = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return props.options
  return props.options.filter((o) =>
    String(o[props.optionText]).toLowerCase().includes(q)
  )
})

function onFilter(query: string) {
  search.value = query
  emit('search', query)
}

function onVisibleChange(visible: boolean) {
  if (!visible) search.value = '' // đóng dropdown thì reset ô tìm kiếm
}

function highlight(value: unknown) {
  const text = String(value ?? '')
  const q = search.value.trim()
  if (!q) return [{ text, match: false }]
  const pos = text.toLowerCase().indexOf(q.toLowerCase())
  if (pos === -1) return [{ text, match: false }]
  return [
    { text: text.slice(0, pos), match: false },
    { text: text.slice(pos, pos + q.length), match: true },
    { text: text.slice(pos + q.length), match: false },
  ].filter((p) => p.text)
}
</script>

<style scoped>
.hl {
  font-weight: 700;
  background-color: #efefef;
}
</style>