<template>
    <div  style="padding:0 0 0 0px">
        <SelectText 
            :options="dataSuppliers"
            v-model="selectedObject"
        />
    </div>
</template>

<script setup lang="ts">

import { ref, watch, onMounted } from 'vue'
import { usePOStore } from '@/stores/po.store' 

import SelectText from './SelectProject/DynamicSelect.vue';

interface SupplierOption {
  id: number
  name: string
}

const props = withDefaults(defineProps<{
  modelValue?: number | string | null
  selectedText?: string
}>(), {
  modelValue: null,
  selectedText: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
  (e: 'selectedText', value: string | null): void
}>()

const poStore = usePOStore()


/* ===================== STATE ===================== */
const dataSuppliers = ref<SupplierOption[]>([])
const selectedObject = ref<SupplierOption | null>(null)

/* ===================== WATCH ===================== */
watch(selectedObject, (val) => {
  if (val) {
    emit('update:modelValue', val.id)
    emit('selectedText', val.name)
  } else {
    emit('update:modelValue', null)
    emit('selectedText', null)
  }
})
 
watch(
  () => props.modelValue,
  (newVal) => {
    // So sánh lỏng (==) như bản gốc để chấp nhận cả "5" và 5
    const found = dataSuppliers.value.find((element) => element.id == newVal)
    selectedObject.value = found || null
  }
)
 
/* ===================== METHODS ===================== */
// DynamicSelect trả về Record<string, any> | string | null nên ép kiểu về SupplierOption
const handleSelect = (value: Record<string, any> | string | null) => {
  selectedObject.value = value && typeof value === 'object' ? (value as SupplierOption) : null
}
 
const Pro_getListSuppliers = async () => {
  const res = await poStore.getListSuppliers()
  dataSuppliers.value = res.dataSuppliers.map((element: any) => ({
    id: element.SUP_ID,
    name: element.NAME,
  }))
}

/* ===================== LIFECYCLE ===================== */
onMounted(() => {
  Pro_getListSuppliers()
})

</script>

<style>

</style>