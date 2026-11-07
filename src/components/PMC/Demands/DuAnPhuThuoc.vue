<template>
  <div class="border">
    <ul>
        <li v-for="item in Projects" :key="item.NUM_WO">{{ item.NUM_WO }}</li>
    </ul>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { usePMCStore } from '@/stores/PMC.store';

const pmcStore = usePMCStore();
const Projects = ref<Record<string, any>[]>([]);

const props = defineProps({
    Demand_PART:{
        type:Object,
        default: null
    }
});

const route = useRoute();
watch(() => props.Demand_PART, async (newVal) => {
    if (newVal) {
        let data={
            PDD_ID: newVal.PDD_ID || route.query.id,
            PART_NUM: newVal.PART_NUM || route.query.PART_NUM
        }
        const res = await pmcStore.getProjecttPhuthuoc(data)
        Projects.value = res.Projects
    }
});
   
</script>

<style>

</style>