<template>
  <div class="price-comparing-page">
    <title-page :titlepage="'Thiết lập giá cho báo giá khách hàng'" />

    <div class="page-shell">
      <header class="page-header">
        <div>
          <p class="section-label"> Create a price list</p>
          <h2 class="page-title">Lập báo giá mua nguyên liệu</h2>
        </div>
        <div class="header-summary">
          <div class="summary-box">
            <span class="summary-label">Tổng dòng</span>
            <strong>{{ dataMaterials.length }}</strong>
          </div>
          <div class="summary-box">
            <span class="summary-label">Báo giá NCC</span>
            <strong>{{ showdataAllDTLQoute.length }}</strong>
          </div>
        </div>
      </header>

      <el-tabs v-model="activeTab" class="comparison-tabs">
        <el-tab-pane label="Lập giá mua nguyên liệu" name="first">
          <div class="tab-panel">
            <div class="toolbar">
              <div class="toolbar-group">
                <el-button type="primary" class="action-btn" @click="handLayBaoGia()">Chọn báo giá</el-button>
                <el-button type="success" class="action-btn" @click="handLuuChonBaoGia()">Lưu chọn báo giá</el-button>
                <el-button type="warning" class="action-btn" @click="handDuyetBaoGia()">Duyệt báo giá</el-button>
                <el-button type="info" class="action-btn" @click="handReportBaogia()">Báo giá KH</el-button>
              </div>
              <el-button type="primary" class="btn btn-outline-secondary action-btn action-btn--small" @click="handgetTongHopTonKhoMaterial()">
                <i class="fa fa-download mr-1"></i> INV
              </el-button>
            </div>
            <chi-thi-mau :list_ChiThiMau="list_ChiThiMau" />
            <div class="table-wrapper">              
              <table class="table price-table">
                <thead>
                  <tr>
                    <th rowspan="2">STT</th>
                    <th rowspan="2">PART NUM</th>
                    <th rowspan="2">MÔ TẢ</th>
                    <th rowspan="2">SỐ ĐẶT</th>
                    <th>INV</th>
                    <th>Nhà Cung cấp</th>
                    <th>MFR Name</th>
                    <th>Giá</th>
                    <th>Giá cũ</th>
                    <th>Giá Min</th>
                    <th>DATECODE</th>
                    <th>Leadtime</th>
                    <th>MOQ</th>
                    <th>SPQ</th>
                    <th>NCNR</th>
                    <th>Lấy Min Time</th>
                    <th>Chọn mua</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in dataMaterials" :key="index">
                    <td>{{ item.QMA_SIP }}</td>
                    <td class="cell-strong" :style="{ backgroundColor: !item.TME_ID?'#dfe4ea' : 'transparent' }">{{ item.PART_NUM }}</td>
                    <td>{{ item.DESCRIPTION }}</td>
                    <td>{{ item.PURCHASE_NUM }}</td>
                    <td>{{ item.QTY_INV }}</td>
                    <td>{{ item.NAME }}</td>
                    <td>{{ item.MFR_NAME }}</td>
                    <td>{{ item.UNIT_COST }}</td>
                    <td :style="{ backgroundColor: item.PRICE_LAST<item.UNIT_COST?'#f50707' : 'transparent' }">{{ item.PRICE_LAST }}</td>
                    <td>{{ item.PRICE_MIN }}</td>
                    <td>{{ item.DATECODE }}</td>
                    <td>{{ item.LEADTIME }}</td>
                    <td>{{ item.MOQ }}</td>
                    <td>{{ item.SPQ }}</td>
                    <td>
                        <input
                            type="checkbox"
                            :name="'ncNR' + index"
                            :id="'ncNR' + index"
                            v-model="item.NCNR"
                            disabled
                            @change="handThietLapBaogiaMintime(item)"
                        >
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        :name="'minTime' + index"
                        :id="'minTime' + index"
                        v-model="item.MinTime"
                        @change="handThietLapBaogiaMintime(item)"
                      >
                    </td>
                    <td>
                        <input
                            type="checkbox"
                            :name="'selected' + index"
                            :id="'selected' + index"
                            v-model="item.SELECTED"
                            @change="handThietLapSelectedquote(item)"
                        >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Báo giá NCC" name="second">
          <div class="tab-panel">
            <div class="search-panel">
              <div class="search-wrap">
                <i class="fa fa-search search-icon"></i>
                <input
                  type="search"
                  v-model="search"
                  placeholder="Lập điều kiện: LT:42d, DC:3Y, PN:ERT-J1VG103JA, SPQ:x"
                  class="form-control search-input"
                >
              </div>
            </div>

            <div class="table-wrapper">
                
              <table class="table price-table price-table--secondary">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>PART NUM</th>
                    <th>MÔ TẢ</th>
                    <th>SỐ ĐẶT</th>
                    <th>MFR Name</th>
                    <th>NCC</th>
                    <th>Giá</th>
                    <th>Đơn vị</th>
                    <th>Ngày Hết Hạn</th>
                    <th>DATECODE</th>
                    <th>Leadtime</th>
                    <th>MOQ</th>
                    <th>SPQ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in showdataAllDTLQoute" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td class="cell-strong">{{ item.PART_NUM }}</td>
                    <td>{{ item.DESCRIPTION }}</td>
                    <td>{{ item.QTY }}</td>
                    <td>{{ item.MFR_NAME }}</td>
                    <td>{{ item.SUPPLIERS_NAME }}</td>
                    <td>{{ item.UNIT_PRICE }}</td>
                    <td>{{ item.UNIT }}</td>
                    <td>{{ item.EXPIRY_DATE }}</td>
                    <td>{{ item.DATECODE }}</td>
                    <td>{{ item.LEADTIME === 0 ? 'in stock' : item.LEADTIME }}</td>
                    <td>{{ item.MOQ }}</td>
                    <td>{{ item.SPQ }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs';

import TitlePage from '@/components/controls/TitlePage.vue'
import { giaiBaiToanMuaHang_min } from '@/plugins/BaiToanMuaHang.js'
import ChiThiMau from '@/components/controls/ChiThiMau.vue';

import { useRoute } from 'vue-router'
import { usePOStore } from '@/stores/po.store'
import { usePMCStore } from '@/stores/PMC.store'

const route = useRoute()
const poStore = usePOStore()
const pmcStore = usePMCStore()

const dataCompairBaoGia= ref<any[]>([])
const tileClos= ref<any[]>([])
const ArrStrSupp= ref<any[]>([])
const colNumDau= ref(7)
const dataAllDTLQoute= ref<any[]>([])
const dataMaterials= ref<any[]>([])
const search= ref('')
const activeTab = ref('first');

const list_ChiThiMau= ref([
    { text: "Chưa có mã ", color: "#dfe4ea" },
    { text: "Giá cũ thấp hơn", color: "#f50707" }
]);
    
const showdataAllDTLQoute = computed(() => {
      if (!search.value || !search.value.trim()) {
          return dataAllDTLQoute.value;
  }

  const ADK = search.value.split(',').reduce((acc: Record<string, string>, pair) => {
      const [key, value] = pair.split(':');
      if (key && value !== undefined) {
          acc[key.trim().toUpperCase()] = value.trim();
      }
      return acc;
  }, {});
          
  const parseDatecode = (rawValue: any) => {
      if (rawValue === null || rawValue === undefined) return null;

      const text = String(rawValue).trim().toUpperCase();
      if (!text) return null;

      let match = text.match(/(\d+)\s?(\+)?/);
    
      let amount;
      if (!match){
          match = text.match(/WITHIN\s(\d+)/);
          if (!match) return null;
          amount = Number(match[1]);
      }else{
          amount = Number(match[1]);
      }
      if (!match) return null;

      //console.log('parseDatecode:', rawValue, '=>', amount);
      return Number.isFinite(amount) ? amount : null
  };

  const parseLeadtime = (rawValue: any) => {
      if (rawValue === null || rawValue === undefined) return null;

      const text = String(rawValue).trim().toUpperCase();
      if (!text) return null;

      const match = text.match(/(-?\d+(?:\.\d+)?)\s*([A-Z]+)?/);
      if (!match) return null;

      const amount = Number(match[1]);
      if (!Number.isFinite(amount)) return null;

      const unit= match[2] || 'D';
      const unitMap: Record<string, number> = {
          D: 1,
          DAY: 1,
          DAYS: 1,
          W: 7,
          WK: 7,
          WEEK: 7,
          WEEKS: 7,
          M: 30,
          MON: 30,
          MONTH: 30,
          MONTHS: 30,
          Y: 365,
          YR: 365,
          YEAR: 365,
          YEARS: 365
      };

      const factor = unitMap[unit] || 1;
      return amount * factor;
  };

        const leadtimeLimit = parseLeadtime(ADK.LT);
        const datecodeLimit = !ADK.DC? null: dayjs().year() % 100 - Number(ADK.DC); // Assuming ADK.DC is a number representing years
        const partNumKeyword = ADK.PN ? ADK.PN.toUpperCase() : '';
        const noSPQ = ADK.SPQ.toUpperCase() === 'X' ? true : null;

        return dataAllDTLQoute.value.filter((item) => {
            
            const itemLeadtime = item.LEADTIME;
        
            const itemDatecode = parseDatecode(item.DATECODE);
          
            const itemPartNum = (item.PART_NUM || '').toString().toUpperCase();

            const matchSPQ = !noSPQ ? true : item.SPQ === noSPQ;

            const matchLeadtime = leadtimeLimit === null
                ? true
                : (itemLeadtime !== null && itemLeadtime <= leadtimeLimit);

            const matchDatecode = datecodeLimit === null
                ? true
                : (itemDatecode !== null && datecodeLimit < itemDatecode );
            //console.log(item.DATECODE, 'itemDatecode:', itemDatecode, 'datecodeLimit:', datecodeLimit, matchDatecode);
            const matchPartNum = !partNumKeyword
                ? true
                : itemPartNum.includes(partNumKeyword);

            return matchLeadtime && matchDatecode && matchPartNum && matchSPQ;
        });
    })


  
            // 'getCompairBaoGia',
            // 'setSelectQouteMaterial',
            // 'duyetBaoGia',
            // 'getAllDTLQoute',
            // 'getQoute_Material_Price',
            // 'LuuChonBaoGia',
            // 'getTongHopTonKhoMaterial',
            // 'thietLapSelectedQuote',

const handThietLapSelectedquote = async (item: any) => {
    await pmcStore.thietLapSelectedQuote({QMA_ID: item.QMA_ID, SELECTED: item.SELECTED });
}

const handgetTongHopTonKhoMaterial = async () => {
      const data = {PQP_ID: route.query.PQP_ID};
      const dataInv= await pmcStore.getTongHopTonKhoMaterial(data);
      dataMaterials.value = dataInv.dataStocMaterials;
  }

const handLuuChonBaoGia = async () => {
    await poStore.LuuChonBaoGia(dataMaterials.value);
}
const handLayBaoGia = async () => {
            // áp dụng tạm để chờ nâng cấp chức năng tính giá mua hàng tối ưu ở dưới
            console.log('Data Materials after applying Min Time:', dataMaterials.value, showdataAllDTLQoute.value);
            dataMaterials.value=giaiBaiToanMuaHang_min(dataMaterials.value, showdataAllDTLQoute.value);
             
            let demand: Record<string, number> = {
                // Mã_A: 100,
                // Mã_B: 150,
                // Mã_C: 200,
                // Mã_D: 80
            };
            let suppliers: Record<string, any> =  {
                // NCC_HaNoi: {
                // freight: 500,
                // prices: { Mã_A: 10, Mã_B: 12, Mã_D: 25 } // Mã_C không cung cấp
                // },
                // NCC_DaNang: {
                // freight: 1200,
                // prices: { Mã_A: 12, Mã_B: 14, Mã_C: 15, Mã_D: 20 }
                // },
                // NCC_HCM: {
                // freight: 300,
                // prices: { Mã_A: 8, Mã_C: 16, Mã_D: 22 } // Mã_B không cung cấp
                // }
            }
            let ignorePartNums = []; // Danh sách các PART_NUM cần bỏ qua

            dataMaterials.value.forEach((item) => {
                const purchaseNum = Number(item.PURCHASE_NUM);
                if (!item.MinTime && Number.isFinite(purchaseNum) && purchaseNum > 0) {
                    demand[item.PART_NUM] = purchaseNum;
                } else {
                    ignorePartNums.push(item.PART_NUM);
                }
            });

            showdataAllDTLQoute.value.forEach((item) => {
                if (!Object.prototype.hasOwnProperty.call(demand, item.PART_NUM)) {
                    return;
                }

                const unitPrice = Number(item.UNIT_PRICE);
                if (!Number.isFinite(unitPrice) || unitPrice < 0) {
                    return;
                }

                if (!suppliers[item.SUP_ID]) {
                    suppliers[item.SUP_ID] = {
                        freight: Number(item.TRANSPORT_FEE) || 0,
                        prices: {}
                    };
                }

                const currentPrice = suppliers[item.SUP_ID].prices[item.PART_NUM];
                if (currentPrice === undefined || unitPrice < currentPrice) {
                    suppliers[item.SUP_ID].prices[item.PART_NUM] = unitPrice;
                }
            });



            // const optimizeResult = giaiBaiToanMuaHang(demand, suppliers);
            // if (!optimizeResult || !optimizeResult.feasible) {
            //     console.warn('Khong tim thay phuong an mua hang toi uu', optimizeResult);
            //     return;
            // }

            // optimizeResult.allocation.forEach((allocationItem) => {

            //     const selectedQuote = showdataAllDTLQoute.value.find((quote) => {
            //         return quote.PART_NUM === allocationItem.partNum
            //             && quote.SUP_ID === allocationItem.supplierId
            //             && Number(quote.UNIT_PRICE) === Number(allocationItem.unitPrice);
            //     });

            //     if (!selectedQuote) {
            //         return;
            //     }

            //     const material = dataMaterials.value.find((materialItem) => materialItem.PART_NUM === allocationItem.partNum);
            //     if (!material) {
            //         return;
            //     }

            //     material.PQD_ID = selectedQuote.PQD_ID;
            //     material.EXPIRY_DATE = selectedQuote.EXPIRY_DATE;
            //     material.MFR_NAME = selectedQuote.MFR_NAME;
            //     material.DATECODE = selectedQuote.DATECODE;
            //     material.MOQ = selectedQuote.MOQ;
            //     material.SPQ = selectedQuote.SPQ;
            //     material.LEADTIME = selectedQuote.LEADTIME;
            //     material.NCNR = selectedQuote.NCNR;
            //     material.SUP_ID = selectedQuote.SUP_ID;
            //     material.NAME = selectedQuote.NAME || material.NAME;
            //     material.UNIT_COST = selectedQuote.UNIT_PRICE;
            //     material.CUR_CODE = selectedQuote.CUR_CODE;
            // });

            //console.log('Ket qua toi uu:', optimizeResult);
        }
const handThietLapBaogiaMintime = (item: any) => {
            const dataDTLQoute_PART_NUM = showdataAllDTLQoute.value.filter(element => element.PART_NUM === item.PART_NUM && element.LEADTIME);
            console.log('dataDTLQoute_PART_NUM: ', dataDTLQoute_PART_NUM);
            if(dataDTLQoute_PART_NUM.length === 0) {
                console.error(`No matching PART_NUM found for ${item.PART_NUM}`);
                return;
            }
            let data={
                PQD_ID:dataDTLQoute_PART_NUM[0].PQD_ID,
                EXPIRY_DATE:dataDTLQoute_PART_NUM[0].EXPIRY_DATE,
                MinTime:item.MinTime,
                MFR_NAME:dataDTLQoute_PART_NUM[0].MFR_NAME,
                DATECODE:dataDTLQoute_PART_NUM[0].DATECODE,
                MOQ:dataDTLQoute_PART_NUM[0].MOQ,
                SPQ:dataDTLQoute_PART_NUM[0].SPQ,
                LEADTIME:dataDTLQoute_PART_NUM[0].LEADTIME,
                NCNR: dataDTLQoute_PART_NUM[0].NCNR,               
                SUP_ID: dataDTLQoute_PART_NUM[0].SUP_ID,
                UNIT_COST: dataDTLQoute_PART_NUM[0].UNIT_PRICE,
                CUR_CODE: dataDTLQoute_PART_NUM[0].CUR_CODE
            }
            dataDTLQoute_PART_NUM.forEach((element, index) => {
                if(element.LEADTIME < item.LEADTIME){
                    data.PQD_ID = element.PQD_ID;
                    data.EXPIRY_DATE = element.EXPIRY_DATE;
                    data.MinTime = item.MinTime;
                    data.MFR_NAME = element.MFR_NAME;
                    data.DATECODE = element.DATECODE;
                    data.MOQ = element.MOQ;
                    data.SPQ = element.SPQ;
                    data.LEADTIME = element.LEADTIME;
                    data.NCNR = element.NCNR;               
                    data.SUP_ID = element.SUP_ID;
                    data.UNIT_COST = element.UNIT_PRICE;
                    data.CUR_CODE = element.CUR_CODE;
                }
            });
            item.PQD_ID = data.PQD_ID
            item.EXPIRY_DATE = data.EXPIRY_DATE
            item.MinTime = data.MinTime
            item.MFR_NAME = data.MFR_NAME
            item.DATECODE = data.DATECODE
            item.MOQ = data.MOQ
            item.SPQ = data.SPQ
            item.LEADTIME = data.LEADTIME
            item.NCNR = data.NCNR
            item.SUP_ID = data.SUP_ID
            item.UNIT_COST = data.UNIT_COST
            item.CUR_CODE = data.CUR_CODE

            console.log('Updated item:', item);
        }
const Pro_getQoute_Material_Price = async () => {
            //if(this.NameQoutePhase.PDD_ID){
                let data={ PQP_ID:route.query.PQP_ID}
                const res= await poStore.getQoute_Material_Price(data)
                dataMaterials.value=res.dataMaterials
           //}
        }
const handReportBaogia = () => {
          let src=''
          src='/pmc/po/Report_Qoute?PQP_ID=' + route.query.PQP_ID 
          window.open(src, 'newWin', 'fullscreen=yes, scrollbars=auto')
          
      }
const handDuyetBaoGia = () => {
            let data={ PQP_ID:route.query.PQP_ID} 
            poStore.duyetBaoGia(data)
        }
// const handUpdateSmallQoute = (item: any)=>{
//             if (item.PURCHASE_NUM>0){
//                 // kiểm tra đã có chọn giá 
//                 // chọn giá nhỏ nhất
//                 let PriceMin=900000000000000
//                 let Muc_SelectPurchase=1
//                 let QMA_ID,col

//                 ArrStrSupp.value.forEach((element,id) => {
//                     let price=900000000000000
//                     let QMA_IDT,colT
//                     if(item.PURCHASE_NUM >= item[tileClos[(id*27)+3+colNumDau]] && item.PURCHASE_NUM <= item[tileClos[(id*27)+3 +1 + colNumDau]]){
//                         price=item[tileClos[(id*27)+5+colNumDau]]
//                         QMA_IDT=item.QMA_ID
//                         colT=tileClos[(id*27)+3+colNumDau]
//                         console.log('1',price);
//                     } 
//                     if(item.PURCHASE_NUM >= item[tileClos[(id*27)+8+colNumDau]] && item.PURCHASE_NUM <= item[tileClos[(id*27)+8 +1 + colNumDau]]){
//                         price=item[tileClos[(id*27)+10+colNumDau]]
//                         QMA_IDT=item.QMA_ID
//                         colT=tileClos[(id*27)+8+colNumDau]

//                         console.log('2',price);
//                     }   
//                     if(item.PURCHASE_NUM >= item[tileClos[(id*27)+13+colNumDau]] && item.PURCHASE_NUM <= item[tileClos[(id*27)+13 +1 + colNumDau]]){
//                         price=item[tileClos[(id*27)+15+colNumDau]]
//                         QMA_IDT=item.QMA_ID
//                         colT=tileClos[(id*27)+13+colNumDau]

//                         console.log('3',price);
//                     }
//                     if(item.PURCHASE_NUM >= item[tileClos[(id*27)+18+colNumDau]] && item.PURCHASE_NUM <= item[tileClos[(id*27)+18 +1 + colNumDau]]){
//                         price=item[tileClos[(id*27)+20+colNumDau]]
//                         QMA_IDT=item.QMA_ID
//                         colT=tileClos[(id*27)+18+colNumDau]

//                         console.log('4',price);
//                     } 
//                     if(item[tileClos[(id*27)+23+colNumDau]] && item.PURCHASE_NUM >= item[tileClos[(id*27)+23+colNumDau]]){
//                         price=item[tileClos[(id*27)+25+colNumDau]]
//                         QMA_IDT=item.QMA_ID
//                         colT=tileClos[(id*27)+23+colNumDau]

//                         console.log('5',price,item.PURCHASE_NUM ,item[tileClos[(id*27)+23+colNumDau]]);
//                     } 
//                     if (PriceMin > price)  {
//                         PriceMin=price ;
//                         QMA_ID=QMA_IDT;
//                         col=colT  ;                       
//                     }     
//                 });
//                 this.handSetSelectQouteMaterial(QMA_ID,col,PriceMin,item.PURCHASE_NUM); 
//             }

            
//         }
// const handSetSelectQouteMaterial = (id,col,UNIT_PRICE,PURCHASE_NUM )=>{
            
//             let data={
//                 QMA_ID:id,
// 	            col: col,
// 	            UNIT_PRICE:UNIT_PRICE,
// 	            PURCHASE_NUM:PURCHASE_NUM
//             }
//             //console.log(data);
//             setSelectQouteMaterial(data).then(res=>{                
//                 Pro_getCompairBaoGia()
//             })
//         }
// const mau = (item, id, idx)=>{            
//             let ArrSUP_ID=this.tileClos[(id*27)+idx+this.colNumDau].split('_')

//             let SUP_ID=ArrSUP_ID[ArrSUP_ID.length-1]

//             //console.log(this.tileClos[(id*27)+idx+this.this.colNumDau],item.SUP_ID);
//             if(SUP_ID==item.SUP_ID && item.PURCHASE_NUM >= item[this.tileClos[(id*27)+idx+this.colNumDau]] && item.PURCHASE_NUM <= item[this.tileClos[(id*27)+idx+1+this.colNumDau]] ) return 'mauNenXanh'

//             if(!item[this.tileClos[(id*27)+idx+this.colNumDau]] && !item[this.tileClos[(id*27)+idx+1+this.colNumDau]] ) return ''

//             if(item.PURCHASE_NUM >= item[this.tileClos[(id*27)+idx+this.colNumDau]] && item[this.tileClos[(id*27)+idx+this.colNumDau]] && !item[this.tileClos[(id*27)+idx+1+this.colNumDau]] ) return ''
//             //console.log(item.PURCHASE_NUM >= item[this.tileClos[(id*27)+idx+this.colNumDau]], item.PURCHASE_NUM <= item[this.tileClos[(id*27)+idx+7]]);
//             if (item.PURCHASE_NUM >= item[this.tileClos[(id*27)+idx+this.colNumDau]] && item.PURCHASE_NUM <= item[this.tileClos[(id*27)+idx +1 + this.colNumDau]]) return 'mauNenXanhnGoc'
//             else return ''
//         }
// const Pro_getCompairBaoGia = async ()=>{
//             let data={ PQP_ID:this.$route.query.PQP_ID} 
//             getCompairBaoGia.getCompairBaoGia(data).then(res=>{
//                 this.dataCompairBaoGia=res.dataCompairBaoGia
//                 this.ArrStrSupp=res.ArrStrSupp
//                 this.Pro_tileCols()
//             })
//         }
// const Pro_tileCols = ()=>{
//             if(this.dataCompairBaoGia.length>0){
//                this.tileClos= Object.keys(this.dataCompairBaoGia[0])
//                //console.log(this.tileClos);
//             }
            
//         }
onMounted(()=>{
    Pro_getQoute_Material_Price()
    let data={ PQP_ID:route.query.PQP_ID}
    poStore.getAllDTLQoute(data).then(res=>{
        dataAllDTLQoute.value=res.dataAllDTLQoute
    })
})
</script>

<style scoped>
.price-comparing-page {
  padding: 0 16px 28px;
  background: linear-gradient(180deg, #f4f7fb 0%, #edf3f8 100%);
}

.page-shell {
  background: #ffffff;
  border: 1px solid #dfe9f3;
  border-radius: 16px;
  box-shadow: 0 10px 28px rgba(30, 60, 90, 0.06);
  padding: 18px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid #edf2f8;
}

.section-label {
  margin: 0 0 5px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6d7f92;
}

.page-title {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: #16324f;
}

.header-summary {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.summary-box {
  min-width: 118px;
  padding: 10px 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, #edf6ff 0%, #effaf7 100%);
  border: 1px solid #dfeaf7;
  text-align: center;
}

.summary-label {
  display: block;
  font-size: 11px;
  color: #567089;
  font-weight: 700;
  text-transform: uppercase;
}

.summary-box strong {
  display: block;
  font-size: 20px;
  color: #16324f;
  margin-top: 3px;
}

.tab-panel {
  padding-top: 16px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.toolbar-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.action-btn {
  min-width: 128px;
  border-radius: 10px;
  font-weight: 700;
  padding: 8px 14px;
}

.action-btn--small {
  min-width: auto;
}

.search-panel {
  margin-bottom: 14px;
}

.search-wrap {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #738aa0;
}

.search-input {
  width: 100%;
  min-height: 42px;
  padding-left: 38px;
  border-radius: 12px;
  border: 1px solid #d3dfeb;
  background: #f8fbfe;
}

.table-wrapper {
  overflow: auto;
  border: 1px solid #dfe9f3;
  border-radius: 12px;
  background: #fff;
}

.price-table {
  margin-bottom: 0;
  min-width: 1200px;
  font-size: 12px;
}

.price-table thead th {
  background: #16324f;
  color: #fff;
  border-color: #264a69;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 2;
}

.price-table tbody td {
  vertical-align: middle;
  border-color: #ebf0f5;
  background: #ffffff;
}

.price-table tbody tr:nth-child(even) td {
  background: #f9fbfd;
}

.price-table--secondary thead th {
  background: #1d4f78;
}

.cell-strong {
  font-weight: 700;
  color: #16324f;
}

@media (max-width: 992px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-summary {
    width: 100%;
  }

  .summary-box {
    flex: 1;
  }

  .toolbar {
    align-items: stretch;
  }

  .toolbar-group {
    width: 100%;
  }

  .action-btn {
    flex: 1 1 180px;
  }
}
</style>