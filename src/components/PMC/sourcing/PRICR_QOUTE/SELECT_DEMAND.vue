<template>
    <div class="demand-picker">
        <div class="picker-header">
            <h6 class="picker-title">Chon Demand</h6>
            <span class="picker-count">{{ PDD_IDs.length }}/{{ filteredDemands.length }}</span>
        </div>

        <div class="picker-toolbar">
            <input
                v-model.trim="searchText"
                type="text"
                class="form-control form-control-sm"
                placeholder="Tim theo ma PO hoac ten du an"
            >
            <div class="toolbar-actions">
                <button type="button" class="btn btn-sm btn-light" @click="selectAllVisible">Chon tat ca</button>
                <button type="button" class="btn btn-sm btn-outline-secondary" @click="clearSelection">Bo chon</button>
            </div>
        </div>
        
        <div class="picker-list" v-if="filteredDemands.length">
            <div class="grid_demands">    
                <label class="demand-item" v-for="item in filteredDemands" :key="item.DEMAND_ID">
                    <input
                        type="checkbox"
                        class="demand-check"
                        :value="item.PDD_ID"
                        v-model="PDD_IDs"
                        @change="handGetMaterialReqDemands_dtl()"
                    >
                    <span class="demand-content">
                        <strong class="demand-po">{{ item.PO_CODE }}</strong>
                        <small class="demand-proj">{{ item.PROJ_NAME }}</small>
                    </span>
                </label>
            </div>
        </div>
        <div class="picker-empty" v-else>
        Khong tim thay demand phu hop.
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
data(){
    return{
        dataQoute_Demands_dtl:[],
        PDD_IDs: [],
        searchText: ''
    }   
},
props:{
    sPDD_ID:{
        type: Array,
        default: () => []
    }
},
computed: {
    filteredDemands() {
        if (!this.searchText) {
            return this.dataQoute_Demands_dtl;
        }
        const keyword = this.searchText.toLowerCase();
        return this.dataQoute_Demands_dtl.filter((item) => {
            const poCode = (item.PO_CODE || '').toLowerCase();
            const projName = (item.PROJ_NAME || '').toLowerCase();
            return poCode.includes(keyword) || projName.includes(keyword);
        });
    }
},
methods:{
    ...mapActions([
        'getQoute_Demands_dtl'
    ]),
    handGetMaterialReqDemands_dtl(){
        this.$emit('handGetMaterialReqDemands_dtl', this.PDD_IDs);
    },
    selectAllVisible() {
        const selectedMap = new Map(this.PDD_IDs.map(item => [item.DEMAND_ID, item]));
        this.filteredDemands.forEach((item) => {
            if (!selectedMap.has(item.DEMAND_ID)) {
                this.PDD_IDs.push(item.PDD_ID);
            }
        });
        this.handGetMaterialReqDemands_dtl();
    },
    clearSelection() {
        this.PDD_IDs = [];
        this.handGetMaterialReqDemands_dtl();
    }
},
async created(){
    const result = await this.getQoute_Demands_dtl();
    this.PDD_IDs = Array.from(this.sPDD_ID);
    if(result.ok) {
        this.dataQoute_Demands_dtl = result.dataQoute_Demands_dtl;
    }
}
}
</script>

<style>
.grid_demands {
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 10px;
}
.demand-picker {
    border: 1px solid #d9dee7;
    border-radius: 10px;
    padding: 10px;
    background: linear-gradient(180deg, #fdfefe 0%, #f5f9ff 100%);
}

.picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}

.picker-title {
    margin: 0;
    font-weight: 700;
    color: #1d3557;
}

.picker-count {
    font-size: 12px;
    color: #4f5d75;
    background: #e9f2ff;
    padding: 2px 8px;
    border-radius: 999px;
}

.picker-toolbar {
    display: grid;
    gap: 8px;
    margin-bottom: 8px;
}

.toolbar-actions {
    display: flex;
    gap: 6px;
}

.picker-list {
    max-height: 320px;
    overflow-y: auto;
    border: 1px solid #e5eaf2;
    border-radius: 8px;
    background: #ffffff;
}

.demand-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 0;
    padding: 8px 10px;
    cursor: pointer;
    border-bottom: 1px dashed #edf2f7;
}

.demand-item:last-child {
    border-bottom: none;
}

.demand-item:hover {
    background: #f8fbff;
}

.demand-check {
    margin-top: 3px;
}

.demand-content {
    display: grid;
    line-height: 1.2;
}

.demand-po {
    color: #0b3c5d;
}

.demand-proj {
    color: #5a6778;
}

.picker-empty {
    border: 1px dashed #c9d4e5;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    color: #5f6f86;
    background: #fafcff;
}

@media (max-width: 576px) {
    .picker-list {
        max-height: 260px;
    }
}

</style>