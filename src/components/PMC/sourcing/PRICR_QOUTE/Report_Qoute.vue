<template>
    <section class="quote-report">
        <div class="report-head">
            <div>
                <div class="eyebrow">PURCHASE • QUOTATION</div>
                <h1>Báo cáo báo giá</h1>
                <p>Kiểm tra chi tiết đơn giá, thành tiền và biến động so với lần báo giá trước.</p>
            </div>
            <div class="report-badge">
                <span class="badge-dot"></span>
                {{ dataReportBaoGia.length }} mặt hàng
            </div>
            <button class="export-btn" type="button" @click="handdataReportBaoGia()">
                <i class="fa fa-file-excel-o" aria-hidden="true"></i>
                <span>Export Excel</span>
            </button>
        </div>

        <div class="summary-grid">
            <div class="summary-card summary-card--blue">
                <span class="summary-label">Tổng mặt hàng</span>
                <strong>{{ dataReportBaoGia.length }}</strong>
                <span class="summary-note">Dòng báo giá</span>
            </div>
            <div class="summary-card summary-card--mint">
                <span class="summary-label">Tổng số lượng</span>
                <strong>{{ formatNumber(totalQuantity) }}</strong>
                <span class="summary-note">Theo yêu cầu mua</span>
            </div>
            <div class="summary-card summary-card--amber">
                <span class="summary-label">Giá trị báo giá</span>
                <strong>{{ formatNumber(totalAmount) }}</strong>
                <span class="summary-note">USD</span>
            </div>
            <div class="summary-card summary-card--rose">
                <span class="summary-label">Giá tăng</span>
                <strong>{{ increasedItems }}</strong>
                <span class="summary-note">Cần lưu ý</span>
            </div>
        </div>

        <div class="table-panel">
            <div class="table-toolbar">
                <div>
                    <h2>Chi tiết mặt hàng</h2>
                    <span>Đơn vị tiền tệ: <b>VND</b></span>
                </div>
                <chi-thi-mau :list_ChiThiMau="list_ChiThiMau" />
            </div>

            <div v-if="dataReportBaoGia.length" class="table-scroll">
                <table class="quote-table" id="quote-table">
                    <thead>
                        <tr>
                            <th class="index-col">#</th>
                            <th>Mô tả</th>
                            <th>MFR CODE</th>                            
                            <th class="number-col">Số lượng</th>
                            <th>Cost</th>
                            <th class="number-col">Đơn giá</th>
                            <th class="number-col">Thành tiền</th>
                            <th class="number-col">Giá cũ</th>
                            <th>Giá Min</th>
                            <th>MRF Name</th>
                            <th>MOQ</th>
                            <th>SPQ</th>
                            <th>DATECODE</th>
                            <th>Leadtime</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataReportBaoGia" :key="index" :class="mau(item.UNIT_PRICE, item.UNIT_PRICE_OLD)">
                            <td class="index-col">{{ index + 1 }}</td>
                            <td class="description">{{ item.DESCRIPTION || '—' }}</td>
                            <td class="part-number">{{ item.MATERIAL_CODE || '—' }}</td>                            
                            <td class="number-col">{{ formatNumber(item.PURCHASE_NUM) }}</td>
                            <td class="number-col">{{ formatNumber(item.UNIT_COST) }}</td>
                            <td class="number-col">{{ formatNumber(item.UNIT_PRICE) }}</td>
                            <td class="number-col amount">{{ formatNumber(item.UNIT_PRICE * item.PURCHASE_NUM) }}</td>
                            <td class="number-col old-price">{{ formatNumber(item.UNIT_PRICE_OLD) }}</td>
                            <td class="min-price">{{ formatNumber(item.MIN_PRICE) }}</td>
                            <td class="mrf-name">{{ item.MFR_NAME  }}</td>
                            <td class="moq">{{ item.MOQ }}</td>
                            <td class="spq">{{ item.SPQ }}</td>
                            <td class="datecode">{{ item.DATECODE }}</td>
                            <td class="leadtime">{{ item.LEADTIME  }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="empty-state">
                <div class="empty-icon">∅</div>
                <strong>Chưa có dữ liệu báo giá</strong>
                <span>Danh sách mặt hàng sẽ hiển thị tại đây.</span>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { formatNumber as formatNumberValue } from '@/helpers/functions';
import ChiThiMau from '@/components/controls/ChiThiMau.vue';
import { exportArrObject } from '@/plugins/Excel.js';

import { usePMCStore } from '@/stores/PMC.store';

const pmcStore = usePMCStore()
const route = useRoute()

const dataReportBaoGia = ref<any[]>([])
const list_ChiThiMau = ref([
    { text: "Giá tăng", color: "#f50707" }
])

const totalQuantity = computed(() => {
    return dataReportBaoGia.value.reduce((total, item) => total + Number(item.PURCHASE_NUM || 0), 0)
})

const totalAmount = computed(() => {
    return dataReportBaoGia.value.reduce((total, item) => total + (Number(item.UNIT_PRICE || 0) * Number(item.PURCHASE_NUM || 0)), 0)
})

const increasedItems = computed(() => {
    return dataReportBaoGia.value.filter(item => Number(item.UNIT_PRICE || 0) > Number(item.UNIT_PRICE_OLD || 0) && Number(item.UNIT_PRICE_OLD || 0) > 0).length
})

const handdataReportBaoGia = () => {

            const dataexport = dataReportBaoGia.value.map((item, index) => ({
                No: item.QMA_SIP || index + 1,       
                DESCRIPTION: item.DESCRIPTION,       
                QUANTITY: item.PURCHASE_NUM,
                UNIT: item.UNIT, 
                'PN QUOTE': item.MATERIAL_CODE,
                'MFR QUOTE': item.MFR_NAME,
                'UNIT PRICE': item.UNIT_PRICE,
                'CURRENCY CODE':item.CUR_CODE,
                LEADTIME: item.LEADTIME,
                SPQ: item.SPQ,
                MOQ: item.MOQ,
                DATECODE: item.DATECODE,
                'EXPIRY DATE': item.EXPIRY_DATE,
                'Non Cancellable Non Returnable': item.NCNR,
                NOTES: ''
            }));
            const formatColumns = [
                { key: 'No', width: 8 },        
                { key: 'DESCRIPTION', width: 30 },        
                { key: 'QUANTITY', width: 12 },
                { key: 'UNIT', width: 15 },
                { key: 'PN QUOTE', width: 18 },
                { key: 'MFR QUOTE', width: 15 },
                { key: 'UNIT PRICE', width: 15 },
                { key: 'CURRENCY CODE', width: 15 },
                { key: 'LEADTIME', width: 15 },
                { key: 'SPQ', width: 15 },
                { key: 'MOQ', width: 15 },
                { key: 'DATECODE', width: 15 },
                { key: 'EXPIRY DATE', width: 15 },
                { key: 'Non Cancellable Non Returnable', width: 15 },
                { key: 'NOTES', width: 35 },
            ];

            exportArrObject('Xlsx', dataexport, formatColumns)
        }
const formatNumber = (value: number) => {
    return formatNumberValue(value, 2)
}

const mau = (unit_price: number,unit_price_old: number) => {
    if(unit_price>unit_price_old && unit_price_old>0){
        return 'mayNenDo'
    }else {
        return ''
    }
}
onMounted(() => {
        let data={
            PQP_ID: route.query.PQP_ID
        }
        pmcStore.getReportBaoGia_KH(data).then(res=>{
            dataReportBaoGia.value = res.Qoute_Material
        })
    })

</script>

<style scoped>
.quote-report {
    min-height: 100%;
    padding: 28px;
    color: #1e293b;
    background: #f4f7fb;
    font-family: "Segoe UI", Arial, sans-serif;
}
.report-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 24px; }
.export-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 38px; padding: 9px 14px; border: 1px solid #1d4ed8; border-radius: 8px; background: #2563eb; color: #fff; font-size: 12px; font-weight: 800; white-space: nowrap; cursor: pointer; box-shadow: 0 5px 12px rgba(37, 99, 235, .18); transition: background .18s ease, border-color .18s ease, box-shadow .18s ease, transform .18s ease; }
.export-btn:hover { border-color: #1e40af; background: #1d4ed8; box-shadow: 0 7px 16px rgba(37, 99, 235, .24); transform: translateY(-1px); }
.export-btn:focus { outline: none; box-shadow: 0 0 0 3px rgba(37, 99, 235, .18), 0 5px 12px rgba(37, 99, 235, .18); }
.export-btn:active { transform: translateY(0); }
.export-btn i { color: #bbf7d0; font-size: 15px; }
.eyebrow { color: #2563eb; font-size: 11px; font-weight: 800; letter-spacing: 1.6px; }
h1 { margin: 7px 0 5px; color: #12233f; font-size: 30px; font-weight: 750; }
.report-head p { margin: 0; color: #64748b; font-size: 14px; }
.report-badge { display: flex; align-items: center; gap: 8px; padding: 9px 13px; border: 1px solid #dbe5f0; border-radius: 20px; background: #fff; color: #475569; font-size: 13px; font-weight: 700; white-space: nowrap; }
.badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 4px #dcfce7; }
.summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 22px; }
.summary-card { position: relative; overflow: hidden; min-height: 112px; padding: 18px 20px; border: 1px solid #e5eaf1; border-radius: 10px; background: #fff; box-shadow: 0 5px 16px rgba(30, 52, 82, .045); }
.summary-card:after { position: absolute; right: -22px; bottom: -32px; width: 86px; height: 86px; border-radius: 50%; content: ""; opacity: .5; }
.summary-card--blue:after { background: #dbeafe; }.summary-card--mint:after { background: #d1fae5; }.summary-card--amber:after { background: #fef3c7; }.summary-card--rose:after { background: #ffe4e6; }
.summary-label, .summary-note { display: block; color: #64748b; font-size: 12px; }
.summary-card strong { display: block; margin: 7px 0 4px; color: #12233f; font-size: 24px; font-weight: 750; }
.table-panel { overflow: hidden; border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; box-shadow: 0 8px 24px rgba(30, 52, 82, .055); }
.table-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 20px; border-bottom: 1px solid #edf1f5; }
.table-toolbar h2 { margin: 0 0 4px; color: #172b4d; font-size: 17px; font-weight: 750; }.table-toolbar span { color: #94a3b8; font-size: 12px; }
.table-scroll { overflow-x: auto; }.quote-table { width: 100%; min-width: 900px; border-collapse: collapse; font-size: 13px; }
.quote-table th { position: sticky; top: 0; padding: 13px 14px; background: #f8fafc; color: #64748b; font-size: 11px; font-weight: 800; letter-spacing: .6px; text-align: left; text-transform: uppercase; white-space: nowrap; }
.quote-table td { padding: 15px 14px; border-top: 1px solid #eef2f6; color: #334155; vertical-align: middle; }.quote-table tbody tr { transition: background .15s ease; }.quote-table tbody tr:hover { background: #f8fbff; }
.index-col { width: 48px; color: #94a3b8 !important; text-align: center; }.number-col { text-align: right; white-space: nowrap; }.part-number { color: #1d4ed8 !important; font-weight: 750; }.description { max-width: 240px; color: #475569 !important; }.amount { color: #172b4d !important; font-weight: 750; }.old-price { color: #94a3b8 !important; }.supplier { min-width: 150px; }
.mayNenDo { background: #fff5f5; }.mayNenDo .amount, .mayNenDo .part-number { color: #dc2626 !important; }.mayNenDo .old-price { color: #64748b !important; }
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 260px; color: #64748b; }.empty-icon { margin-bottom: 10px; color: #94a3b8; font-size: 34px; }.empty-state strong { color: #334155; font-size: 15px; }.empty-state span { margin-top: 5px; font-size: 13px; }
@media (max-width: 900px) { .quote-report { padding: 20px; }.summary-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .quote-report { padding: 14px; }.report-head { align-items: stretch; flex-direction: column; gap: 12px; } h1 { font-size: 25px; }.summary-grid { gap: 10px; }.summary-card { min-height: 100px; padding: 14px; }.summary-card strong { font-size: 20px; }.table-toolbar { align-items: flex-start; flex-direction: column; padding: 15px; }.export-btn { align-self: flex-start; } }
</style>