<template>
  <div>
    <!-- PQD_ID BigInt Default(NEXT VALUE FOR SEQ_ID_PRICE_QOUTE_DTL) primary key, 
    PQH_ID BigInt foreign key references PRICE_QOUTE_HDR(PQH_ID),
	TME_ID numeric(18,0) , -->
    <div><label >Mô tả:</label><b>{{ material_QouteDTL.DESCRIPTION }}</b> </div> 
    
    <div><label >PART NUM:</label> <b>{{ material_QouteDTL.PART_NUM }}</b></div>
	
	<!-- UNIT NVARCHAR(10), -->
    <div class=" row">
        <div class="col"><label>Mã Nhà SX(Mnf):</label><input type="text" v-model="material_QouteDTL.MATERIAL_CODE"></div>
	    <div class="col"><label>Date Code:</label><input type="text" v-model="material_QouteDTL.DATECODE"></div>
    </div>
	

	<!-- TAXABLE bit NOT NULL default(1),
	TAX_INCLUDE bit default(1),
	TAX_NAME NVARCHAR(30),
	TAX_RATE Numeric(5,2) default(0), -->
    <div class="row border">
        <div style="width: 10px; height: inherit; background: #05b074;">1</div>
        <div class="col">
            <div><label>Số lượng từ:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.LOW_QUANTITY_L1"></div> 
            <div><label>Số lượng đến:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.HIGH_QUANTITY_L1"></div> 
        </div>        
        <div class="col"><label>Đơn giá:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.UNIT_PRICE_L1"></div>
        <div class="col"><label>Chiết khấu:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.INTEREST_RATE_L1"></div>
    </div>
	
    <div class="row border">
        <div style="width: 10px; height: inherit; background: #74b005;">2</div>
        <div class="col">
            <div><label>Số lượng từ:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.LOW_QUANTITY_L2"></div> 
            <div><label>Số lượng đến:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.HIGH_QUANTITY_L2"></div> 
        </div>        
        <div class="col"><label>Đơn giá:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.UNIT_PRICE_L2"></div>
        <div class="col"><label>Chiết khấu:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.INTEREST_RATE_L2"></div>
    </div>

    <div class="row border">
        <div style="width: 10px; height: inherit; background: #8eb005;">3</div>
        <div class="col">
            <div><label>Số lượng từ :</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.LOW_QUANTITY_L3"></div> 
            <div><label>Số lượng đến:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.HIGH_QUANTITY_L3"></div> 
        </div>        
        <div class="col"><label>Đơn giá :</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.UNIT_PRICE_L3"></div>
        <div class="col"><label>Chiết khấu:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.INTEREST_RATE_L3"></div>
    </div>

	<div class="row border">
        <div style="width: 10px; height: inherit; background: #adb005;">4</div>
        <div class="col">
            <div><label>Số lượng từ :</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.LOW_QUANTITY_L4"></div> 
            <div><label>Số lượng đến:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.HIGH_QUANTITY_L4"></div> 
        </div>        
        <div class="col"><label>Đơn giá:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.UNIT_PRICE_L4"></div>
        <div class="col"><label>Chiết khấu:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.INTEREST_RATE_L4"></div>
    </div>

	<div class="row border">
        <div style="width: 10px; height: inherit; background: #0596b0;">5</div>
        <div class="col">
            <div><label>Số lượng từ :</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.LOW_QUANTITY_L5"></div> 
            <div><label>Số lượng đến:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.HIGH_QUANTITY_L5"></div> 
        </div>        
        <div class="col"><label>Đơn giá:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.UNIT_PRICE_L5"></div>
        <div class="col"><label>Chiết khấu:</label><input type="number" style="width: 80px;" v-model="material_QouteDTL.INTEREST_RATE_L5"></div>
    </div>
    <button class="btn btn-info mt-3 p-2" @click="handSeveMaterial_QouteDTL()">Save</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePOStore } from '@/stores/po.store.ts'

const poStore = usePOStore()
const material_QouteDTL = ref<Record<string, any>>({})

const handSeveMaterial_QouteDTL = () => {
    const data = material_QouteDTL.value

    poStore.SeveMaterial_QouteDTL(data).then(() => {
        emit('Refrest_PriceQoutes_DTL')
    })
}

const emit = defineEmits<{
    (e: 'Refrest_PriceQoutes_DTL'): void
}>()

const props = defineProps<{
    O_Matetrial_Qoute: Record<string, any> | null
}>()

const initializeMaterial_QouteDTL = () => {
    material_QouteDTL.value.LOW_QUANTITY_L1 = 0
    material_QouteDTL.value.HIGH_QUANTITY_L1 = 500
    material_QouteDTL.value.UNIT_PRICE_L1 = 0
    material_QouteDTL.value.INTEREST_RATE_L1 = 0

    material_QouteDTL.value.LOW_QUANTITY_L2 = 501
    material_QouteDTL.value.HIGH_QUANTITY_L2 = 5000
    material_QouteDTL.value.UNIT_PRICE_L2 = 0
    material_QouteDTL.value.INTEREST_RATE_L2 = 0

    material_QouteDTL.value.LOW_QUANTITY_L3 = 5001
    material_QouteDTL.value.HIGH_QUANTITY_L3 = 10000
    material_QouteDTL.value.UNIT_PRICE_L3 = 0
    material_QouteDTL.value.INTEREST_RATE_L3 = 0

    material_QouteDTL.value.LOW_QUANTITY_L4 = 10001
    material_QouteDTL.value.HIGH_QUANTITY_L4 = 20000
    material_QouteDTL.value.UNIT_PRICE_L4 = 0
    material_QouteDTL.value.INTEREST_RATE_L4 = 0

    material_QouteDTL.value.LOW_QUANTITY_L5 = 20000
    material_QouteDTL.value.HIGH_QUANTITY_L5 = 100000
    material_QouteDTL.value.UNIT_PRICE_L5 = 0
    material_QouteDTL.value.INTEREST_RATE_L5 = 0
}
onMounted(() => {
    initializeMaterial_QouteDTL()
})
</script>

<style>

</style>