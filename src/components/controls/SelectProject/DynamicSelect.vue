<template>
  <div class="dynamic-select-wrapper" :style="{ width: width }">
    <div tabindex="0"  @focusin="hasFocus = true" class="vue-dynamic-select" 
      :class="{ 'is-focused': hasFocus }" 
      :style="{ height:height /* Fixed height */}">
      <div class="select-input-wrapper">
        <input
          type="search"
          style="padding: 0px;"
          @focus="hasFocus = true"
          autocomplete="off"
          class="search"
          ref="searchInput"
          :placeholder="placeholder"
          :size="size"
          v-model="search"
          @keyup="moveToResults"
          @keydown="removeOption"
        />
        <i class="dropdown" :class="{ 'is-open': showResultList }" />
      </div>

      <transition name="fade">
        <div v-if="showResultList" ref="resultList" class="result-list">
          <div
            tabindex="0"
            ref="result"
            class="result"
            v-for="(result, index) in results"
            :key="`${result[optionValue]}_${index}`"
            :class="{ 'is-selected': index === selectedResult }"
            v-html="highlight(result[optionText])"
            @click="selectOption(result)"
            @keyup.prevent="navigateResults(result, $event)"
          />
          <div v-if="results.length === 0" class="no-results">
            Không tìm thấy kết quả
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch,onMounted,onBeforeUnmount } from "vue";

type Option = Record<string, any>

const props =withDefaults(defineProps<{
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

/* ===================== STATE ===================== */
const rootEl = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)
const resultList = ref<HTMLElement | null>(null)
 
const hasFocus = ref(false)
const search = ref('')
const selectedOption = ref<Option | string | null>(null)
const selectedResult = ref(0)


/* ===================== COMPUTED ===================== */
const results = computed(() => {
  return search.value
    ? props.options.filter(
        (i) =>
          String(i[props.optionText])
            .toLowerCase()
            .indexOf(search.value.toLowerCase()) > -1
      )
    : props.options
})

const showResultList = computed(() => {
  return hasFocus.value && results.value.length > 0
})

 
/* ===================== WATCH ===================== */
watch(hasFocus, (focused) => {
  window.removeEventListener('keydown', stopScroll)
  if (focused) {
    window.addEventListener('keydown', stopScroll)
    searchInput.value?.focus()
  } else {
    selectedResult.value = 0
    searchInput.value?.blur()
  }
})
 
// Nạp giá trị đã chọn khi prop modelValue thay đổi
watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      search.value = ''
      selectedOption.value = null
      return
    }
    const displayText =
      typeof newVal === 'object' ? (newVal[props.optionText] || '') : newVal
 
    search.value = displayText
    selectedOption.value = newVal
  },
  { immediate: true }
)
 
watch(selectedOption, (val) => {
  // Trả giá trị đã chọn cho component cha (v-model)
  emit('update:modelValue', val)
})
 
watch(search, (newVal) => {
  emit('search', newVal)
  handleSearchChange()
})


/* ===================== METHODS ===================== */
const handleSearchChange = () => {
  if (!search.value) {
    emit('update:modelValue', null)
    emit('change', null)
  }
}
 
const selectOption = (option: Option) => {
  selectedOption.value = option
  search.value = option[props.optionText]
  hasFocus.value = false
}
 
const removeOption = (event: KeyboardEvent) => {
  // Xóa lựa chọn nếu nhấn Backspace khi ô tìm kiếm đang trống
  if (event.keyCode === 8 && (search.value == null || search.value == '')) {
    selectedOption.value = null
    hasFocus.value = false
    event.preventDefault()
  }
}
 
const moveToResults = (event: KeyboardEvent) => {
  // Nhấn mũi tên xuống để chuyển xuống kết quả đầu tiên
  if (event.keyCode === 40) {
    if (results.value.length > 0) {
      (resultList.value?.children.item(0) as HTMLElement | null)?.focus()
    }
  }
}
 
const navigateResults = (option: Option, event: KeyboardEvent) => {
  if (event.keyCode === 13) {
    selectOption(option)
  } else if (event.keyCode === 40 || event.keyCode === 38) {
    if (event.keyCode === 40) {
      selectedResult.value++
    } else {
      selectedResult.value--
    }
    const next = resultList.value?.children.item(selectedResult.value) as HTMLElement | null
    if (next) {
      next.focus()
    } else {
      selectedResult.value = 0
      searchInput.value?.focus()
    }
  }
}
 
const highlight = (value: any) => {
  // Tô đậm phần khớp với text tìm kiếm
  if (search.value) {
    const matchPos = String(value).toLowerCase().indexOf(search.value.toLowerCase())
    if (matchPos > -1) {
      const matchStr = String(value).substr(matchPos, search.value.length)
      value = String(value).replace(
        matchStr,
        '<span style="font-weight: bold; background-color: #efefef;">' + matchStr + '</span>'
      )
    }
  }
  return value
}
 
function stopScroll(event: KeyboardEvent) {
  if (event.keyCode === 40 || event.keyCode === 38) {
    event.preventDefault()
  }
}
 
const loseFocus = (event: MouseEvent) => {
  if (rootEl.value && !rootEl.value.contains(event.target as Node)) {
    hasFocus.value = false
  }
}

/* ===================== LIFECYCLE ===================== */
onMounted(() => {
  // Ẩn danh sách kết quả khi click ra ngoài component
  window.addEventListener('click', loseFocus)
})
 
onBeforeUnmount(() => {
  window.removeEventListener('click', loseFocus)
  window.removeEventListener('keydown', stopScroll)
})

</script>

<style scoped>
.dynamic-select-wrapper {
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.vue-dynamic-select {
  border: 1px solid #dee2e6;
  position: relative;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  cursor: text;
  background: #fff;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.vue-dynamic-select.is-focused {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.select-input-wrapper {
  display: flex;
  align-items: center;
  height: 100%; /* Full height */
  width: 100%;
}

.search {
  border: none;
  padding: 0.375rem 0;
  width: 100%;
  font-size: 0.9rem;
  color: #495057;
  height: 36px; /* Fixed height accounting for border */
  line-height: 36px;
}

.search:focus {
  outline: none;
}

.search::placeholder {
  color: #adb5bd;
}

.dropdown {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #6c757d;
  margin-left: 8px;
  transition: transform 0.2s ease;
  flex-shrink: 0; /* Prevent arrow from shrinking */
}

.dropdown.is-open {
  transform: rotate(180deg);
}

.result-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  max-height: 250px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

.result {
  padding: 0.5rem 0.75rem;
  color: #495057;
  transition: all 0.15s ease;
}

.result:hover,
.result:focus,
.result.is-selected {
  background-color: #f8f9fa;
  outline: none;
}

.result.is-selected {
  background-color: #e9ecef;
}

.no-results {
  padding: 0.75rem;
  text-align: center;
  color: #6c757d;
  font-style: italic;
}

/* Scrollbar styling */
.result-list::-webkit-scrollbar {
  width: 6px;
}

.result-list::-webkit-scrollbar-track {
  background: #f8f9fa;
}

.result-list::-webkit-scrollbar-thumb {
  background: #dee2e6;
  border-radius: 3px;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
