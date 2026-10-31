<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue'

defineOptions({
  name: 'SelectMaterial',
})

interface MaterialOption {
    TME_ID: string | number
    PART_NUM: string
    DESCRIPTION: string
}

interface MaterialResponse {
    dataAllMaterial?: MaterialOption[]
}

interface LegacyStore {
    dispatch: (action: string) => Promise<MaterialResponse>
}

const emit = defineEmits<{
    (event: 'getValue', value: string): void
}>()

const store = (getCurrentInstance()?.proxy as { $store?: LegacyStore } | null)?.$store
const dataAllMaterial = ref<MaterialOption[]>([])

function handleChange(event: Event) {
    emit('getValue', (event.target as HTMLInputElement).value)
}

function openForm() {
    window.open(
        '/#/formAddTypeMaterial',
        'formAddTypeMaterial',
        'fullscreen=yes, scrollbars=auto,width=600,height=450, titlebar=no',
    )
}

onMounted(async () => {
    if (!store) return

    const response = await store.dispatch('getMaterialControl')
    dataAllMaterial.value = response.dataAllMaterial ?? []
})
</script>

<template>
    <div>
         <div class="input-group input-group-sm">
            <input list="browsers" id="form3Example3cg" class="form-control form-control-sm" @change="handleChange"/> 
            <div class="input-group-btn"> 
                <a class="btn btn-default" @click="openForm">...</a>
            </div>
         </div>
            <datalist id="browsers">
                <option v-for="item in dataAllMaterial"
                :key="item.TME_ID" 
                :value="item.PART_NUM">{{item.DESCRIPTION}}</option>
            </datalist>
           
    </div>
</template>


<style>

</style>