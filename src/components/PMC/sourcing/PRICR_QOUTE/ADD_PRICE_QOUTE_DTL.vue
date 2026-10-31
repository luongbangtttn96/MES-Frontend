<template>
  <div class="quote-detail-page">
    <title-page :titlepage="'Chi tiết báo giá nhà cung cấp'" />

    <section class="quote-toolbar">
      <div class="quote-toolbar__main">
        <div class="quote-toolbar__title">
          <p class="quote-section-label">Nhà cung cấp</p>
          <h2 class="quote-supplier-name">{{ displayValue(dataQouteSuppliers.SUPPLIERS_NAME) }}</h2>
        </div>
        <div class="quote-toolbar__meta">
          <span class="quote-meta-chip">{{ displayValue(dataQouteSuppliers.QUOTE_TYPE) }}</span>
          <span class="quote-meta-chip">{{ displayValue(dataQouteSuppliers.CUR_CODE) }}</span>
          <span class="quote-meta-chip">{{ dataPriceQoutes_DTL.length }} dòng</span>
          <span class="quote-meta-chip">{{ displayValue(dataQouteSuppliers.TELEPHONE) }}</span>
        </div>
      </div>
      <div class="quote-toolbar__actions">
        <button class="btn quote-btn quote-btn--primary" @click="handUpdateQouteHDR()">Lưu</button>       
        <button class="btn quote-btn quote-btn--accent" @click="handInmportExcel()">Import</button>
        <button class="btn quote-btn quote-btn--accent" @click="handExportExcel()">Export</button>
        <button class="btn quote-btn quote-btn--secondary" @click="handSendMail_QouteSup()">Send Mail</button>
      </div>
    </section>

    <section class="quote-info-card">
      <div class="quote-card-header quote-card-header--compact">
        <div>
          <h3 class="quote-card-title">Thông tin báo giá</h3>
          <p class="quote-card-subtitle">Thu gọn phần nhập liệu, ưu tiên trường cần cập nhật.</p>
        </div>
      </div>

      <div class="quote-info-grid">
        <div class="quote-field quote-field--wide quote-field--compact">
          <label>Địa chỉ</label>
          <div class="quote-static-field">{{ displayValue(dataQouteSuppliers.ADDRESS) }}</div>
        </div>
        <div class="quote-field quote-field--compact">
          <label>Điện thoại</label>
          <div class="quote-static-field">{{ displayValue(dataQouteSuppliers.TELEPHONE) }}</div>
        </div>
        <div class="quote-field quote-field--compact">
          <label>Email</label>
          <div class="quote-static-field">{{ displayValue(dataQouteSuppliers.EMAIL) }}</div>
        </div>
        <div class="quote-field quote-field--wide quote-field--compact">
          <label>Website</label>
          <div class="quote-static-field">{{ displayValue(dataQouteSuppliers.WEB) }}</div>
        </div>
        <div class="quote-field quote-field--compact">
          <label>Loại hóa đơn</label>
          <div class="quote-static-field">{{ displayValue(dataQouteSuppliers.QUOTE_TYPE) }}</div>
        </div>
        <div class="quote-field quote-field--wide quote-field--compact">
          <label>Nơi giao hàng</label>
          <div class="quote-static-field">{{ displayValue(dataQouteSuppliers.SHIPMENT_ADDRESS) }}</div>
        </div>
        <div class="quote-field quote-field--compact">
          <label>Điều khoản thanh toán</label>
          <select v-model="dataQouteSuppliers.PTE_ID" class="quote-input">
            <option v-for="(item, index) in datalistPayTerms" :key="index" :value="item.PTE_ID">
              {{ item.PTE_NAME }}
            </option>
          </select>
        </div>
        <div class="quote-field quote-field--compact">
          <label>Từ ngày</label>
          <input type="date" v-model="dataQouteSuppliers.START_DATE" class="quote-input">
        </div>
        <div class="quote-field quote-field--compact">
          <label>Đến ngày</label>
          <input type="date" v-model="dataQouteSuppliers.EXPIRY_DATE" class="quote-input">
        </div>
        <div class="quote-field quote-field--compact">
          <label>Loại tiền</label>
          <select v-model="dataQouteSuppliers.CUR_CODE" class="quote-input">
            <option v-for="(item, index) in dataCurrency" :key="index" :value="item.CUR_CODE">
              {{ item.CUR_NAME }}
            </option>
          </select>
        </div>
        <div class="quote-field quote-field--compact">
          <label>Tỉ giá</label>
          <input type="number" v-model="dataQouteSuppliers.EXCHANGE_RATE" class="quote-input">
        </div>
        <div class="quote-field quote-field--compact">
          <label>Số ngày giao</label>
          <input type="number" v-model="dataQouteSuppliers.DUE_DATE" class="quote-input">
        </div>
        <div class="quote-field quote-field--compact">
          <label>Phí Vận Chuyển</label>
          <input type="number" v-model="dataQouteSuppliers.TRANSPORT_FEE" class="quote-input">
        </div>
        <div class="quote-field quote-field--compact">
          <label>Điều kiện Báo giá</label>
          <textarea v-model="dataQouteSuppliers.REQ_RFQ" class="quote-input" rows="1"></textarea>
        </div>
        <div class="quote-field quote-field--compact">
          <label>Thời hạn báo giá</label>
          <input type="date" v-model="dataQouteSuppliers.QUOTE_BEFORE" class="quote-input">
        </div>
      </div>
    </section>

    <section class="quote-table-card">
      <div class="quote-card-header quote-card-header--table quote-card-header--compact">
        <div>
          <h3 class="quote-card-title">Nguyên liệu báo giá</h3>
          <p class="quote-card-subtitle">Theo dõi dải số lượng và cập nhật đơn giá.</p>
        </div>
        <div class="quote-summary-chip">{{ dataPriceQoutes_DTL.length }} mục</div>
      </div>
      <chi-thi-mau :list_ChiThiMau="list_ChiThiMau" />
      <div class="tableFixHead quote-table-wrapper">
        
        <table class="table table-sm quote-table">
          <thead>
            <tr>
              <th rowspan="2" class="quote-sticky-head">STT</th>
              <th rowspan="2" class="quote-sticky-head">PART NUM</th>
              <th rowspan="2" class="quote-sticky-head quote-col-description">Mô tả</th>
              <th rowspan="2" class="quote-sticky-head">Part Manufacturer</th>
              <th rowspan="2" class="quote-sticky-head">MFR Name</th>
              <th rowspan="2" class="quote-sticky-head">QTY</th>
              <th rowspan="2" class="quote-sticky-head">UNIT</th>
              <th rowspan="2" class="quote-sticky-head">Đơn Giá</th>
              <th rowspan="2" class="quote-sticky-head">TIỀN</th>
              <th rowspan="2" class="quote-sticky-head">Giá cũ</th>
              <th rowspan="2" class="quote-sticky-head">Giá Min</th>
              <th rowspan="2" class="quote-sticky-head">Date Code</th>
              <th rowspan="2" class="quote-sticky-head">LEADTIME</th>
              <th rowspan="2" class="quote-sticky-head">MOQ</th>
              <th rowspan="2" class="quote-sticky-head">SPQ</th>
              <th rowspan="2" class="quote-sticky-head">Ghi chú</th>
              <th rowspan="2" class="quote-sticky-head">Thời Hạn</th>
              <th rowspan="2" class="quote-sticky-head">NCNR</th>
              <th colspan="3" class="quote-level-head">Mức giá 1</th>
              <th colspan="3" class="quote-level-head">Mức giá 2</th>
              <th colspan="3" class="quote-level-head">Mức giá 3</th>
              <th colspan="3" class="quote-level-head">Mức giá 4</th>
              <th colspan="3" class="quote-level-head">Mức giá 5</th>
              <th rowspan="2" class="quote-sticky-head">Tác vụ</th>
            </tr>
            <tr>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Chiết khấu</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Chiết khấu</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Chiết khấu</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Chiết khấu</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Chiết khấu</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataPriceQoutes_DTL" :key="index">
              <td>{{ item.QMA_SIP || index + 1 }}</td>
              <td class="quote-cell-strong">{{ displayValue(item.PART_NUM) }}</td>
              <td class="quote-col-description">{{ displayValue(item.DESCRIPTION) }}</td>
              <td :style="{ backgroundColor: item.MFR_PN !== item.MATERIAL_CODE ? '#f89734' : 'transparent' }"><input type="text" v-model="item.MATERIAL_CODE" class="quote-table-input quote-table-input--wide"></td>
              <td>{{ displayValue(item.MFR_NAME) }}</td>
              <td>{{ displayValue(item.QTY) }}</td>
              <td>{{ displayValue(item.UNIT) }}</td>
              <td>{{ displayValue(item.UNIT_PRICE) }}</td>
              <td>{{ displayValue(item.CUR_CODE) }}</td>
              <td :style="{ backgroundColor: isUnitPriceHigher(item.UNIT_PRICE, item.LAST_PRICE) ? '#f50707' : 'transparent' }">{{ displayValue(item.LAST_PRICE) }}</td>
              <td>{{ displayValue(item.MIN_PRICE) }}</td>
              <td><input type="text" v-model="item.DATECODE" class="quote-table-input"></td>              
              <td>{{ displayValue(item.LEADTIME) }}</td>
              <td>{{ displayValue(item.MOQ) }}</td>
              <td>{{ displayValue(item.SPQ) }}</td>
              <td><input type="text" v-model="item.NOTES" class="quote-table-input"></td>
              <td>{{ displayValue(item.EXPIRY_DATE) }}</td>
              <td><input type="checkbox" v-model="item.NCNR" ></td>
              <td>
                <div class="quote-range-block">
                  <span>Từ: {{ displayValue(item.LOW_QUANTITY_L1) }}</span>
                  <span>Đến: {{ displayValue(item.HIGH_QUANTITY_L1) }}</span>
                </div>
              </td>
              <td><input type="number" v-model="item.UNIT_PRICE_L1" class="quote-table-input"></td>
              <td><input type="number" v-model="item.INTEREST_RATE_L1" class="quote-table-input"></td>
              <td>
                <div class="quote-range-block">
                  <span>Từ: {{ displayValue(item.LOW_QUANTITY_L2) }}</span>
                  <span>Đến: {{ displayValue(item.HIGH_QUANTITY_L2) }}</span>
                </div>
              </td>
              <td><input type="number" v-model="item.UNIT_PRICE_L2" class="quote-table-input"></td>
              <td><input type="number" v-model="item.INTEREST_RATE_L2" class="quote-table-input"></td>
              <td>
                <div class="quote-range-block">
                  <span>Từ: {{ displayValue(item.LOW_QUANTITY_L3) }}</span>
                  <span>Đến: {{ displayValue(item.HIGH_QUANTITY_L3) }}</span>
                </div>
              </td>
              <td><input type="number" v-model="item.UNIT_PRICE_L3" class="quote-table-input"></td>
              <td><input type="number" v-model="item.INTEREST_RATE_L3" class="quote-table-input"></td>
              <td>
                <div class="quote-range-block">
                  <span>Từ: {{ displayValue(item.LOW_QUANTITY_L4) }}</span>
                  <span>Đến: {{ displayValue(item.HIGH_QUANTITY_L4) }}</span>
                </div>
              </td>
              <td><input type="number" v-model="item.UNIT_PRICE_L4" class="quote-table-input"></td>
              <td><input type="number" v-model="item.INTEREST_RATE_L4" class="quote-table-input"></td>
              <td>
                <div class="quote-range-block">
                  <span>Từ: {{ displayValue(item.LOW_QUANTITY_L5) }}</span>
                  <span>Đến: {{ displayValue(item.HIGH_QUANTITY_L5) }}</span>
                </div>
              </td>
              <td><input type="number" v-model="item.UNIT_PRICE_L5" class="quote-table-input"></td>
              <td><input type="number" v-model="item.INTEREST_RATE_L5" class="quote-table-input"></td>
              <td>
                <div class="quote-row-actions">
                  <button class="btn quote-icon-btn quote-icon-btn--save" title="Lưu báo giá nguyên liệu" @click="handUpDateMaterial_QouteDTL(item)">
                    &#128221;
                  </button>
                  <button class="btn quote-icon-btn quote-icon-btn--delete" title="Hủy báo giá" @click="handDeleteBaoGiaNguyenLieu(item.PQD_ID)">
                    &#10006;
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <BaseDialog v-model:active="showQouteMateral" :tile="'Thiết lập báo giá nguyên liệu '">
      <ADD_QOUTE_Materal :O_Matetrial_Qoute="O_Matetrial_Qoute" @Refrest_PriceQoutes_DTL="Refrest_PriceQoutes_DTL"/>
    </BaseDialog>

    <input
      id="materialQoute_inputExcel"
      ref="fileInput"
      class="input-file"
      type="file"
      @change="exportData"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePOStore } from '@/stores/po.store.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import { useSystemStore } from '@/stores/system.store.ts'
import { usePMCStore } from '@/stores/PMC.store.ts'

import { exportDataExcel_to_Arr,  exportArrObject } from '@/plugins/Excel.js'
import TitlePage from '@/components/controls/TitlePage.vue'; 
import BaseDialog from '@/components/controls/BaseDialog.vue';
import ADD_QOUTE_Materal from './ADD_QOUTE_Materal.vue';
import ChiThiMau from '@/components/controls/ChiThiMau.vue';

interface ChiThiMauItem {
  text: string
  color: string
}

const route = useRoute()
const poStore = usePOStore()
const authStore = useAuthStore()
const systemStore = useSystemStore()
const pmcStore = usePMCStore()


const dataQouteSuppliers = ref<Record<string, any>>({});
const datalistPayTerms = ref<any[]>([]);
const showQouteMateral = ref<boolean>(false);
const O_Matetrial_Qoute = ref<Record<string, any>>({});

const dataPriceQoutes_DTL = ref<any[]>([]);
const dataPriceQoutes_EXCEL_DTL = ref<any[]>([]);
const AddExcel = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const dataCurrency = ref<any[]>([]);
const list_ChiThiMau: ChiThiMauItem[] = [
      { text: "Mã MRF Không khớp", color: "#f89734" },
      { text: "Giá cũ thấp hơn", color: "#f50707" },
];

const currentUser = computed(() => authStore.user)
/** Khóa cột cho từng mức giá, dùng để render bảng bằng v-for */
const PRICE_LEVELS = [1, 2, 3, 4, 5] as const
const levels = PRICE_LEVELS.map((n) => ({
  n,
  low: `LOW_QUANTITY_L${n}` as const,
  high: `HIGH_QUANTITY_L${n}` as const,
  price: `UNIT_PRICE_L${n}` as const,
  rate: `INTEREST_RATE_L${n}` as const,
}))

  // ...mapActions([
  //   'getdataQouteSuppliers',
  //   'getdatalistPayTerms',
  //   'getdataCurrency',
  //   'UpdateQouteHDR',
  //   'getMaterial_Qoute',
  //   'getPriceQoutes_DTL',
  //   'UpDateMaterial_QouteDTL',
  //   'DeleteBaoGiaNguyenLieu',
  //   'SetMaterials_QouteOld',
  //   'UpdateQouteDTLFromExcel',
  //   'SendMail_QouteSup',
  // ]),

const handUpdateQouteHDR = async () => {
    await poStore.UpdateQouteHDR(dataQouteSuppliers.value)     
}

const handExportExcel = () => {
    const dataexport = dataPriceQoutes_DTL.value.map((item, index) => ({
       No: item.QMA_SIP || index + 1,       
       DESCRIPTION: item.DESCRIPTION,       
       QUANTITY: item.QTY,
       UNIT: item.UNIT, 
       'PN QUOTE': item.MATERIAL_CODE,
       'MFR QUOTE': '',
       'UNIT PRICE': '',
       'CURRENCY CODE':'',
       LEADTIME: '',
       SPQ: '',
       MOQ: '',
       DATECODE: '',
       'EXPIRY DATE': '',
       'Non Cancellable Non Returnable': '',
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
const handSendMail_QouteSup = () => {
    let pass = prompt(`Dùng mail ${currentUser.value?.EMAIL} nhập pass email cá nhân:`, '')
    // if(pass === null) {
    //   alert('Pass không được để trống.');
    //   return;
    // }
    let data={
      PQH_ID: route.query.PQH_ID,
      SUP_ID: route.query.SUP_ID,
      pass: pass
    }
    pmcStore.SendMail_QouteSup(data)
  }
const handInmportExcel = async () => {
    fileInput.value?.click()
  }
const exportData = async (event: Event) => {
  const target = event.target as HTMLInputElement;
    dataPriceQoutes_EXCEL_DTL.value=[]
    let xlsxfile = target.files ? target.files[0] : null;
    if(xlsxfile){
        let dataFromExcel = await exportDataExcel_to_Arr(xlsxfile)

        let dataPriceQoutes=dataFromExcel.filter(item=>{return item['UNIT PRICE'] && item['UNIT PRICE']>0})
        dataPriceQoutes_EXCEL_DTL.value=dataPriceQoutes.map(item=>{
          return {
            QMA_SIP: item.No,
            DESCRIPTION: item.DESCRIPTION,
            QTY: item.QUANTITY,
            UNIT: item.UNIT,
            MATERIAL_CODE: item['PN QUOTE'],
            MFR_NAME: item['MFR QUOTE'],
            UNIT_PRICE: item['UNIT PRICE'],
            CUR_CODE: item['CURRENCY CODE'],
            LEADTIME: item.LEADTIME,
            SPQ: item.SPQ,
            MOQ: item.MOQ,
            DATECODE: item.DATECODE,
            EXPIRY_DATE: item['EXPIRY DATE'],
            NCNR: item['Non Cancellable Non Returnable'],
            NOTES: item.NOTES
          }
        })
        console.log('dataPriceQoutes_EXCEL_DTL: ',dataFromExcel, dataPriceQoutes_EXCEL_DTL);

        await Pro_UpdateQouteDTLFromExcel({PQH_ID:route.query.PQH_ID, dataPriceQoutes: dataPriceQoutes_EXCEL_DTL.value}).then(()=>{
            if(dataFromExcel){ AddExcel.value=!AddExcel.value};
        })
      }
}
const  Pro_UpdateQouteDTLFromExcel = async (dataPriceQoutes_EXCEL_DTL: Record<string, any>) => {
   //console.log('dataPriceQoutes_EXCEL_DTL: ', dataPriceQoutes_EXCEL_DTL);

      // cập nhật thông tin báo giá nhà cung cấp từ file excel
    await poStore.UpdateQouteDTLFromExcel(dataPriceQoutes_EXCEL_DTL)
    Pro_getPriceQoutes_DTL()
  }

const  handSetMaterials_QouteOld = () => {
    let data={
      PQH_ID: route.query.PQH_ID,
      SUP_ID:route.query.SUP_ID
    }
    poStore.SetMaterials_QouteOld(data).then(()=>{
      Pro_getPriceQoutes_DTL()
    })
}
const  handDeleteBaoGiaNguyenLieu = (PQD_ID: number) => {
    let data={PQD_ID:PQD_ID}
    poStore.DeleteBaoGiaNguyenLieu(data).then(()=>{
      Pro_getPriceQoutes_DTL()
    })
  }
const  handUpDateMaterial_QouteDTL = (item: Record<string, any>) => {
    poStore.UpDateMaterial_QouteDTL(item)
  }
  
const  handQoute_Materal = (O_Matetrial_Qoute: Record<string, any>) => {
    O_Matetrial_Qoute.value=O_Matetrial_Qoute
    O_Matetrial_Qoute.value.PQH_ID= route.query.PQH_ID
    showQouteMateral.value=!showQouteMateral.value
  }

const  isUnitPriceHigher = (unitPrice: any, lastPrice: any) => {
    const currentPrice = Number(unitPrice)
    const previousPrice = Number(lastPrice)
    return Number.isFinite(currentPrice) && Number.isFinite(previousPrice) && currentPrice > previousPrice
  }
const  displayValue = (value: any) => {
    return value || '--'
  }

const  Refrest_PriceQoutes_DTL = () => {
    Pro_getPriceQoutes_DTL()
    showQouteMateral.value=!showQouteMateral.value
  }
const  Pro_getPriceQoutes_DTL = async () => {
  let data={
    PQH_ID: route.query.PQH_ID
  }
const res= await poStore.getPriceQoutes_DTL(data)
  dataPriceQoutes_DTL.value=res.dataPriceQoutes_DTL
}
const loadPageData = async () => {
  const payload = { PQH_ID: route.query.PQH_ID }
  const [supplierRes, payTermsRes, currencyRes] = await Promise.all([
    poStore.getdataQouteSuppliers(payload),
    poStore.getdatalistPayTerms(),
    systemStore.getdataCurrency(),
  ])
  dataQouteSuppliers.value = supplierRes?.dataQouteSuppliers ?? {}
  datalistPayTerms.value = payTermsRes?.datalistPayTerms ?? []
  dataCurrency.value = currencyRes?.dataCurrency ?? []
  await Pro_getPriceQoutes_DTL()
}

onMounted(loadPageData)

</script>

<style scoped>
.quote-detail-page {
  padding: 0 16px 24px;
  background: linear-gradient(180deg, #f4f7fb 0%, #edf3f8 100%);
}

.quote-toolbar,
.quote-info-card,
.quote-table-card {
  background: #ffffff;
  border: 1px solid #d8e3ef;
  border-radius: 14px;
  box-shadow: 0 10px 28px rgba(30, 60, 90, 0.06);
}

.quote-toolbar {
  margin: 14px 0;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  color: #16324f;
}

.quote-toolbar__main {
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
  flex-wrap: wrap;
}

.quote-toolbar__title {
  min-width: 0;
}

.quote-toolbar__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quote-section-label {
  margin: 0 0 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6a7f93;
}

.quote-supplier-name {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}

.quote-meta-chip {
  padding: 6px 10px;
  border-radius: 999px;
  background: #f1f6fb;
  color: #30506b;
  font-size: 12px;
  font-weight: 600;
}

.quote-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.quote-btn {
  min-width: 88px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 0;
  font-weight: 600;
}

.quote-btn--primary {
  background: #ffb703;
  color: #1d1d1d;
}

.quote-btn--secondary {
  background: rgba(219, 217, 217, 0.916);
  color: #0647ea;
}

.quote-btn--accent {
  background: #59c3c3;
  color: #12344d;
}

.quote-info-card,
.quote-table-card {
  padding: 16px 18px;
  margin-bottom: 14px;
}

.quote-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.quote-card-header--table {
  margin-bottom: 10px;
}

.quote-card-header--compact {
  align-items: flex-end;
}

.quote-card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #16324f;
}

.quote-card-subtitle {
  margin: 4px 0 0;
  font-size: 13px;
  color: #5f7286;
}

.quote-summary-chip {
  padding: 6px 10px;
  border-radius: 999px;
  background: #edf6ff;
  color: #1c5278;
  font-weight: 700;
  font-size: 12px;
}

.quote-info-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 10px;
}

.quote-field {
  grid-column: span 4;
}

.quote-field--wide {
  grid-column: span 6;
}

.quote-field--compact {
  grid-column: span 3;
}

.quote-field label {
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #5a6f84;
}

.quote-static-field,
.quote-input {
  width: 100%;
  min-height: 36px;
  padding: 7px 10px;
  border-radius: 10px;
  border: 1px solid #cfdbe7;
  background: #f8fbfe;
  color: #16324f;
  font-size: 13px;
}

.quote-static-field {
  display: flex;
  align-items: center;
}

.quote-input:focus,
.quote-table-input:focus {
  outline: none;
  border-color: #3b82a8;
  box-shadow: 0 0 0 3px rgba(89, 195, 195, 0.18);
}

.quote-table-wrapper {
  max-height: 68vh;
  overflow: auto;
  border-radius: 12px;
  border: 1px solid #dbe5ef;
}

.quote-table {
  margin-bottom: 0;
  min-width: 1760px;
  background: #ffffff;
  font-size: 12px;
}

.quote-table thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  vertical-align: middle;
  background: #16324f;
  color: #ffffff;
  border-color: #224767;
  text-align: center;
  white-space: nowrap;
}

.quote-level-head {
  background: #21557e !important;
}

.quote-table tbody td {
  vertical-align: middle;
  border-color: #e4ecf3;
  background: #ffffff;
}

.quote-table tbody tr:nth-child(even) td {
  background: #f9fbfd;
}

.quote-table tbody td.mauNenDo {
  background-color: #f50707;
  color: #ffffff;
}

.quote-col-description {
  min-width: 220px;
}

.quote-cell-strong {
  font-weight: 700;
  color: #16324f;
}

.quote-table-input {
  width: 76px;
  min-height: 32px;
  padding: 4px 8px;
  border: 1px solid #d1dde8;
  border-radius: 8px;
  background: #ffffff;
  font-size: 12px;
}

.quote-table-input--wide {
  width: 150px;
}

.quote-range-block {
  display: flex;
  flex-direction: column;
  min-width: 84px;
  font-size: 11px;
  line-height: 1.35;
  color: #516678;
}

.quote-row-actions {
  display: flex;
  gap: 6px;
}

.quote-icon-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 8px;
  border: 0;
  font-size: 12px;
}

.quote-icon-btn--save {
  background: #59c3c3;
  color: #103b51;
}

.quote-icon-btn--delete {
  background: #ef6f6c;
  color: #ffffff;
}

.input-file {
  display: none;
}

@media (max-width: 992px) {
  .quote-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .quote-toolbar__main {
    flex-direction: column;
    align-items: flex-start;
  }

  .quote-toolbar__actions {
    width: 100%;
    justify-content: flex-start;
  }

  .quote-field,
  .quote-field--compact,
  .quote-field--wide {
    grid-column: span 12;
  }
}
</style>