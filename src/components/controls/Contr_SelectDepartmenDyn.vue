<template>
    <div class="form-group" style="padding:0 0 0 0px">
        <select class="selec_dept col-12" 
        id="DepatmenControlSelect1"
        v-model="selectedID"
        >
            <option v-for="item in ShowdataDepartmens"
                :key="item.DEPT_ID" 
                :value="item.DEPT_ID"> {{item.DEPT_NAME}} </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useDepartmensStore, type departmenItem } from '@/stores/departmens.store'

const props = withDefaults(
    defineProps<{
        modelValue?: string | number | null
        Type_dept?: number | null
    }>(),
    { modelValue: null, Type_dept: null },
)

const emit = defineEmits<{
    (event: 'update:modelValue', value: string | number): void
}>()

const departmensStore = useDepartmensStore()
const dataDepartmens = ref<departmenItem[]>([])

const selectedID = computed({
    get: () => props.modelValue ?? '',
    set: (value: string | number) => emit('update:modelValue', value),
})

const ShowdataDepartmens = computed(() =>
    props.Type_dept
        ? dataDepartmens.value.filter((element) => element.DEPT_ID == props.Type_dept)
        : dataDepartmens.value,
)

onMounted(async () => {
    const res = await departmensStore.getListDepartmens()
    dataDepartmens.value = 'dataDepartmens' in res ? [...res.dataDepartmens] : []
})
</script>
          


<style scoped>
    .selec_dept{
        height:28px;
        width: 95%;
    }
</style>