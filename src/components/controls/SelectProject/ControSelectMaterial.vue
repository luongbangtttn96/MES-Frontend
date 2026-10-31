<template>

    <div>
         <div class="material-select">
            <el-input v-model="content" list="browsers" placeholder="Chọn hoặc nhập mã" clearable @change="Change" /> 
            <div class="material-select__action"> 
                <el-button :icon="Plus" aria-label="Thêm mã nguyên liệu" title="Thêm mã nguyên liệu" @click="Openform" />
            </div>
         </div>
            <datalist id="browsers">
                <option v-for="item in dataAllMaterial"
                :key="item.TME_ID" 
                :value="item.PART_NUM">{{item.DESCRIPTION}}</option>
            </datalist>
           
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import { useControlStore } from '@/stores/control.store'

interface MaterialOption {
    TME_ID: string | number
    PART_NUM: string
    DESCRIPTION: string
}

const props = withDefaults(defineProps<{ value?: string | null }>(), { value: null })

const emit = defineEmits<{
    (event: 'input', value: string): void
}>()

const controlStore = useControlStore()
const dataAllMaterial = ref<MaterialOption[]>([])
const content = ref(props.value)

watch(() => props.value, (value) => {
    content.value = value
})

function Change(value: string) {
    emit('input', value)
}

function Openform() {
    window.open(
        '/#/formAddTypeMaterial',
        'formAddTypeMaterial',
        'fullscreen=yes, scrollbars=auto,width=600,height=450, titlebar=no',
    )
}

onMounted(async () => {
    const res = await controlStore.getMaterialControl()
    dataAllMaterial.value = 'dataAllMaterial' in res ? res.dataAllMaterial : []
})
</script>

<style scoped>
.material-select {
    display: flex;
    gap: 8px;
}

.material-select .el-input {
    flex: 1;
}
</style>

<style>

</style>