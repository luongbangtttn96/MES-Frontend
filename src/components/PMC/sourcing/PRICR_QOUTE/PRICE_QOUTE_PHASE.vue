<template>
  <div >
    <title-page :titlepage="'Quản lý báo giá'"/>
    <el-tabs v-model="activeTab">
        <el-tab-pane label="Báo giá" name="quote">
            <div class="quote-form-wrapper">
                <div class="quote-form-grid">
                    <div class="form-item">
                        <label class="mb-1">Báo giá</label>
                        <el-input class="form-control" type="text" v-model="NAME_PHASE" placeholder="Nhập tên đợt báo giá">
                        </el-input>
                    </div>

                    <div class="form-item">
                         <label class="mb-1">BOM Dự Án</label>
                        <projectSelect v-model="PROJ_CODE" />
                    </div>

                    <div
                        class="form-item customer-autocomplete"
                        @keydown.down.prevent="highlightNextCustomer"
                        @keydown.up.prevent="highlightPrevCustomer"
                        @keydown.enter.prevent="selectHighlightCustomer"
                        @keydown.esc="closeCustomerDropdown"
                    >
                        <label class="mb-1">Tên khách hàng</label>
                        <el-input
                            class="form-control"
                            type="text"
                            v-model="CUS_NAME"
                            placeholder="Nhập tên khách hàng để tìm"
                            autocomplete="off"
                            @input="handleCustomerInput"
                            @focus="openCustomerDropdownIfNeed"
                            @blur="handleCustomerInputBlur"
                        />

                        <div v-if="showCustomerDropdown" class="customer-dropdown">
                            <div v-if="isLoadingCustomers" class="customer-dropdown-status">Đang tìm khách hàng...</div>
                            <div v-else-if="customerKeyword.trim().length < 2" class="customer-dropdown-status">Nhập ít nhất 2 ký tự để tìm kiếm</div>
                            <div v-else-if="customerSuggestions.length === 0" class="customer-dropdown-status">Không tìm thấy khách hàng phù hợp</div>
                            <template v-else>
                                <button
                                    v-for="(item, index) in customerSuggestions"
                                    :key="`${item.CUS_ID || item.CUS_CODE || item.CUS_NAME}-${index}`"
                                    type="button"
                                    class="customer-option"
                                    :class="{ active: highlightCustomerIndex === index }"
                                    @mousedown.prevent="selectCustomer(item)"
                                >
                                    <span class="customer-name">{{ item.CUS_NUMBER + '-' + item.CUS_NAME  }}</span>
                                    <span class="customer-meta">{{ item.ADDRESS || 'Không có địa chỉ' }}</span>
                                </button>
                            </template>
                        </div>
                    </div>

                    <div class="form-item">
                        <label class="mb-1">Địa chỉ</label>
                        <el-input class="form-control" type="text" v-model="ADDRESS" placeholder="Địa chỉ khách hàng">
                        </el-input>
                    </div>

                    <div class="form-item">
                        <label class="mb-1">Người liên hệ</label>
                        <el-input class="form-control" type="text" v-model="CUS_CONTACT" placeholder="Người liên hệ">
                        </el-input>
                    </div>
                    <div class="form-item">
                        <label class="mb-1">Điện thoại</label>
                        <el-input class="form-control" type="text" v-model="TELEPHONE" placeholder="Điện thoại">
                        </el-input>
                    </div>
                    <div class="form-item">
                        <label class="mb-1">Phương thức thanh toán</label>
                        <el-input class="form-control" type="text" v-model="PTE_NAME" placeholder="Phương thức thanh toán">
                        </el-input>
                    </div>
                    <div class="form-item">
                        <label class="mb-1">Yêu Cầu báo giá</label>
                        <el-input class="form-control" type="text" v-model="REQ_RFQ" placeholder="Yêu cầu báo giá">
                        </el-input>
                    </div>
                    <div class="form-item">
                        <label class="mb-1">Thời hạn BG</label>
                        <el-input class="form-control" type="text" v-model="QUOTE_BEFORE" placeholder="Thời hạn báo giá">
                        </el-input>
                    </div>
                </div>

                <div class="quote-form-actions">
                    <el-button type="primary" class="btn btn-primary" @click="handAddPreiceQoute()">Lưu</el-button>
                </div>
            </div>
            
            <div class="tableFixHead">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th style="width: 50px;">STT</th>
                            <th>Tên</th>
                            <th>Bom Dự án</th>
                            <th>Người tạo</th>
                            <th>Người Thực hiện</th>
                            <th>Cập nhật</th>  
                            <th>Trạng thái</th>                          
                            <th>@</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr v-for="(item, index) in ShowdataQoutePhase"
                        :key="index">
                            <td>{{ index +1 }}</td>
                            <td>{{ item.NAME_PHASE }}</td>
                            <td>{{item.PROJ_NAME}}</td>
                            <td>{{ item.FULL_NAME }}</td>
                            <td @click="handSelectBuyerToQuoter($event,item.PQP_ID)">{{ item.NAME_BUYER }}</td>
                            <td>{{ item.MODIFY_DATE }}</td>
                            <td class="quote-status-cell">
                                <div
                                    class="quote-status"
                                    :class="`quote-status--${getQuoteStatusStep(item.STATUS)}`"
                                    :title="`Trạng thái: ${getQuoteStatusLabel(item.STATUS)}`"
                                >
                                    <div class="quote-status-heading">
                                        <span class="quote-status-index">{{ getQuoteStatusStep(item.STATUS) }}/5</span>
                                        <span class="quote-status-label">{{ getQuoteStatusLabel(item.STATUS) }}</span>
                                    </div>
                                    <div class="quote-status-track" aria-label="Tiến độ yêu cầu báo giá">
                                        <span
                                            v-for="step in quoteStatusSteps"
                                            :key="step.id"
                                            class="quote-status-dot"
                                            :class="{ active: step.id <= getQuoteStatusStep(item.STATUS) }"
                                            :title="`${step.id}. ${step.label}`"
                                        ></span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="groupButton">
                                    <el-button  style="font-size:12px" title="Thiết lập nguyên liệu báo giá"
                                        @click="handSetPriceQoute(item)">
                                        <el-icon><Setting /></el-icon>
                                    </el-button>
                                   
                                    <el-button  style="font-size:12px" title="Tạo báo giá"
                                        @click="handShowQouteCreate(item)">
                                        &#128221;
                                    </el-button>

                                    <el-button  style="font-size:12px" title="Thiết lập giá"
                                        @click="handQouteSoSanhGia(item.PQP_ID)">
                                        <el-icon><EditPen /></el-icon>
                                    </el-button>
                                    
                                     <el-button  style="font-size:12px" title="Xuất file PDF báo giá"
                                        @click="handPdfQouteCreate(item)">
                                        <el-icon style="color: #dc3545;"><Operation /></el-icon>
                                    </el-button>

                                    <el-button type="danger" @click="handDongDotBaoGia(item.PQP_ID)"   style="font-size:12px"  title="Đóng báo giá"
                                        class="btn btn-danger">&#10006;
                                    </el-button> 
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>  
        </el-tab-pane>
        <el-tab-pane label="Báo giã đã chôt" name="quote-closed">
            <div><input type="month" name="" id="" v-model="mouthQoute" @change="handQoutePhase_Month()"></div>
            <table class="table table-sm tableFixHead">
                    <thead>
                        <tr>
                            <th style="width: 50px;">STT</th>
                            <th>Tên</th>
                            <th>BOM dự án</th>
                            <th>Cập nhật</th>
                            <th>@</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataQoutePhase_Month"
                        :key="index">
                            <td>{{ index +1 }}</td>
                            <td>{{ item.NAME_PHASE }}</td>
                            <td>{{item.PROJ_CODE}}</td>
                            <td>{{ item.MODIFY_DATE }}</td>
                            <td>
                                <div class="groupButton">

                                    <el-button  class="btn btn-info" style="font-size:12px" title="So sánh báo giá"
                                        @click="handQouteSoSanhGia(item.PQP_ID)">
                                        <el-icon><Search /></el-icon>
                                    </el-button>

                                 
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
        </el-tab-pane>    
    </el-tabs>
    <!-- <BaseDialog :active.sync="showQoutePhase" :tile="'Thiết lập nguyên liệu báo giá'" :width="'900px'">
        <SetQoute_metarial :NameQoutePhase="NameQoutePhase" />
    </BaseDialog> -->
    <base-dialog v-model:active="showQouteHDR" :tile="'Tạo RFQ'" :width="'800px'">
        <ADD_PRICE_QOUTE_HDR :NameQoutePhase="NameQoutePhase" />
    </base-dialog>
     <div class="menuPopu" id="menuPopu">
        <a @click="handUpdateGiaoviecThucHienBao(item)"
           v-for="(item, index) in dataUserBuyer" :key="index" >{{ item.FULL_NAME }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Setting, Operation, EditPen, Search } from '@element-plus/icons-vue';
import day from 'dayjs';
import { usePMCStore } from '@/stores/PMC.store'
import { usePOStore,  type QoutePhaseItem, type QoutePhaseMountItem } from '@/stores/po.store'


import TitlePage from '@/components/controls/TitlePage.vue';
import BaseDialog from '@/components/controls/BaseDialog.vue';
import ADD_PRICE_QOUTE_HDR from '@/components/PMC/sourcing/PRICR_QOUTE/ADD_PRICE_QOUTE_HDR.vue';

import projectSelect from "@/components/controls/SelectProject/SelectProJect.vue";

interface Buyer {
    FULL_NAME: string
    USER_NAME: string
}

const poStore = usePOStore()
const pmcStore = usePMCStore()

/* ===================== STATE ===================== */
// Form báo giá

const NAME_PHASE = ref('')
const PROJ_CODE = ref('')
const CUS_NAME = ref('')
const ADDRESS = ref('')
const CUS_CONTACT = ref('')
const TELEPHONE = ref('')
const PTE_NAME = ref('')
const QUOTE_BEFORE = ref('')
const REQ_RFQ = ref('')
const PQP_ID = ref<(number)>(0)

const activeTab = ref('quote')

const seachQoutePhase = ref('')
const NameQoutePhase = ref<any>({})
const showQouteHDR = ref(false)
const mouthQoute =  ref(day().format('YYYY-MM'))

// Dữ liệu bảng
const dataQoutePhase = ref<(QoutePhaseItem[])>([])
const dataQoutePhase_Month = ref<(QoutePhaseMountItem[])>([])
const dataUserBuyer = ref<(Buyer[])>([])

// Autocomplete khách hàng
const customerSuggestions = ref<any[]>([])
const customerKeyword = ref('')
const selectedCustomer = ref<any | null>(null)
const showCustomerDropdown = ref(false)
const isLoadingCustomers = ref(false)
const highlightCustomerIndex = ref(-1)

// Biến thường (không cần reactive)
let customerSearchTimer: ReturnType<typeof setTimeout> | null = null
let activeBuyerCell: HTMLElement | null = null

/* ===================== COMPUTED ===================== */
const ShowdataQoutePhase = computed(() => {
    if (!seachQoutePhase.value) {
        return dataQoutePhase.value
    }
        let data= dataQoutePhase.value.filter(item=>{ return item.NAME_PHASE?.includes(seachQoutePhase.value)})
        return data
    })

const quoteStatusSteps= computed(() => {
        return [
            { id: 1, label: 'Tạo' },
            { id: 2, label: 'Đã lập báo giá' },
            { id: 3, label: 'Lấy báo giá NCC' },
            { id: 4, label: 'Duyệt báo giá' },
            { id: 5, label: 'Xác nhận nguyên liệu mua' },
            // { id: 6, label: 'Lập đề nghị mua hàng (SO) + PO' }
        ]
    })

    /* ===================== TRẠNG THÁI BÁO GIÁ ===================== */
const getQuoteStatusStep = (status: string | number | null) => {
        const normalizedStatus = String(status === null || status === undefined ? '' : status)
            .trim()
            .toLowerCase()

        //console.log('normalizedStatus:',status, normalizedStatus)

        const numericStatus = Number(normalizedStatus)
        if (numericStatus >= 1 && numericStatus <= 5) {
            return numericStatus
        }

        const statusKeywords = [
            ['tạo'],
            ['đã lập báo giá'],
            ['lấy báo giá ncc'],
            ['duyệt báo giá'],
            ['xác nhận nguyên liệu mua'],
        ]

        const matchedIndex = statusKeywords.findIndex(keywords =>
            keywords.some(keyword => normalizedStatus.includes(keyword))
        )
        return matchedIndex < 0 ? 0 : matchedIndex + 1
    }

const getQuoteStatusLabel = (status: string | number | null) => {
        const statusStep = getQuoteStatusStep(status)
        const statusLabel = quoteStatusSteps.value.find(step => step.id === statusStep)
        return statusLabel ? statusLabel.label : 'Chưa xác định'
    }
 
/* ===================== MENU CHỌN NGƯỜI THỰC HIỆN ===================== */
const hideBuyerMenu = () => {
    const menuPopu = document.getElementById("menuPopu");
    if (menuPopu) {
        menuPopu.classList.remove("hienMenuPopu");
    }
    activeBuyerCell = null;
}

const positionBuyerMenu = () => {
    if (!activeBuyerCell)  return;

    const menuPopu = document.getElementById("menuPopu");
    if (!menuPopu)  return;

    const targetRect = activeBuyerCell.getBoundingClientRect();
    const menuHeight = menuPopu.offsetHeight;
    const menuWidth = menuPopu.offsetWidth;
    const top = targetRect.bottom + 4;
    const left = Math.min(targetRect.left, window.innerWidth - menuWidth - 8);

    menuPopu.style.top = `${Math.max(8, top)}px`;
    menuPopu.style.left = `${Math.max(8, left)}px`;
    if (top + menuHeight > window.innerHeight - 8) {
        menuPopu.style.top = `${Math.max(8, targetRect.top - menuHeight - 4)}px`;
    }
}

const handSelectBuyerToQuoter = (event: MouseEvent, ID?: number) => {
    if (ID === undefined || ID === null) return

    PQP_ID.value = ID;
    event.stopPropagation();
    const menuPopu = document.getElementById("menuPopu");
    if (!menuPopu) return

    const isSameCell = activeBuyerCell === event.currentTarget &&
        menuPopu.classList.contains("hienMenuPopu");

    if (isSameCell) {
        hideBuyerMenu();
        return;
    }

    activeBuyerCell = event.currentTarget as HTMLElement;
    positionBuyerMenu();
    menuPopu.classList.add("hienMenuPopu");
    positionBuyerMenu();
}

const handleBuyerMenuDocumentClick = (event: MouseEvent) => {
        const menuPopu = document.getElementById("menuPopu");
        if (!menuPopu || !menuPopu.classList.contains("hienMenuPopu"))  return;

        const target = event.target as Node;
        const clickedInsideMenu = menuPopu.contains(target);
        const clickedBuyerCell = activeBuyerCell && activeBuyerCell.contains(target);

        if (!clickedInsideMenu && !clickedBuyerCell) {
            hideBuyerMenu();
        }
    }

const handUpdateGiaoviecThucHienBao = async (item: Buyer) => {
        if (!PQP_ID.value || PQP_ID.value===0 ) return;
        
        const data={ PQP_ID: PQP_ID.value, ...item } ;
        await poStore.updateGiaoviecThucHienBao(data);
        await Pro_getDotbaogia()
        hideBuyerMenu();
    }

/* ===================== AUTOCOMPLETE KHÁCH HÀNG ===================== */
const closeCustomerDropdown = () => {
        showCustomerDropdown.value = false;
        highlightCustomerIndex.value = -1;
    }
const fetchCustomerSuggestions = async () => {
        isLoadingCustomers.value = true;
        highlightCustomerIndex.value = -1;

        try {
            const payload = {
                search: customerKeyword.value
            };

            const res = await pmcStore.getSearchCustomers(payload);
            if (res && res.ok === true && Array.isArray(res.dataCustomers)) {
                customerSuggestions.value = res.dataCustomers;
            } else {
                customerSuggestions.value = [];
            }
        } catch (error) {
            customerSuggestions.value = [];
        } finally {
            isLoadingCustomers.value = false;
        }
    }

const handleCustomerInput = () => {
    customerKeyword.value = CUS_NAME.value || '';

    if (selectedCustomer.value && customerKeyword.value !== (selectedCustomer.value.CUS_NAME || '')) {
        ADDRESS.value = '';
        CUS_CONTACT.value = '';
    }

    selectedCustomer.value = null;

    if (customerSearchTimer) {
        clearTimeout(customerSearchTimer);
    }

    if (customerKeyword.value.trim().length < 2) {
        customerSuggestions.value = [];
        highlightCustomerIndex.value = -1;
        showCustomerDropdown.value = true;
        return;
    }

    showCustomerDropdown.value = true;
    customerSearchTimer = setTimeout(() => {
        fetchCustomerSuggestions();
    }, 300);
}

const selectCustomer = (item: any) => {
    selectedCustomer.value = item;
    CUS_NAME.value = item.CUS_NAME || '';
    ADDRESS.value = item.ADDRESS || item.CUS_ADDRESS || '';
    CUS_CONTACT.value = item.CUS_CONTACT || '';
    TELEPHONE.value = item.TELEPHONE  || '';
    PTE_NAME.value = item.PTE_NAME || '';
    closeCustomerDropdown();
}

const openCustomerDropdownIfNeed = () => {
        if (customerSuggestions.value.length > 0 || customerKeyword.value.trim().length < 2) {
            showCustomerDropdown.value = true;
        }
    }

const handleCustomerInputBlur = () => {
        setTimeout(() => {
            closeCustomerDropdown();
        }, 120);
    }

const highlightNextCustomer = () => {
        if (!showCustomerDropdown.value || customerSuggestions.value.length === 0) {
            return;
        }

        if (highlightCustomerIndex.value < customerSuggestions.value.length - 1) {
            highlightCustomerIndex.value += 1;
        }
    }

const highlightPrevCustomer = () => {
        if (!showCustomerDropdown.value || customerSuggestions.value.length === 0) {
            return;
        }
        if (highlightCustomerIndex.value > 0) {
            highlightCustomerIndex.value -= 1;
        }
    }

const selectHighlightCustomer = () => {
        if (!showCustomerDropdown.value || highlightCustomerIndex.value < 0) {
            return;
        }
        const item = customerSuggestions.value[highlightCustomerIndex.value];
        if (item) {
            selectCustomer(item);
        }
    }

/* ===================== MỞ TRANG / DIALOG ===================== */

const handPdfQouteCreate = (item: any) => {
        const params = {
            PQP_ID: item.PQP_ID,
            NAME_PHASE: item.NAME_PHASE || '',
            CUS_NAME: item.CUS_NAME || '',
            ADDRESS: item.ADDRESS || '',
            TELEPHONE: item.TELEPHONE || ''
        }
        const query = Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value??'')}`)
            .join('&')
        const src = `/pmc/po/PDFQouter?${query}`
        window.open(src, 'newWin', 'fullscreen=yes, scrollbars=auto')
    }

const handShowQouteCreate = (item: any) => {
        NameQoutePhase.value={
            PQP_ID:item.PQP_ID,
            PDD_ID: item.PDD_ID,
            NAME_PHASE:item.NAME_PHASE
        }
        //console.log(NameQoutePhase);
        showQouteHDR.value=!showQouteHDR.value
        
    }

const handSetPriceQoute = (item: any) => {
        NameQoutePhase.value={
            PQP_ID: item.PQP_ID ?? '',
            PDD_ID: item.PDD_ID,
            NAME_PHASE:item.NAME_PHASE
        }
        //console.log(NameQoutePhase);
        let src='/pmc/po/SetQoute_metarial?PQP_ID=' + (NameQoutePhase.value.PQP_ID ?? '') + '&PDD_ID=' + NameQoutePhase.value.PDD_ID + '&NAME_PHASE=' + NameQoutePhase.value.NAME_PHASE
        window.open(src, 'SetQoute', 'fullscreen=yes, scrollbars=auto')
        
        //showQoutePhase=!showQoutePhase
    }

const handQouteSoSanhGia = (PQP_ID?: number) => {
    if (PQP_ID === undefined || PQP_ID === null) return

    let src=''
        src='/pmc/po/PRICE_COMPARING?PQP_ID=' + PQP_ID 
        window.open(src, 'newWin', 'fullscreen=yes, scrollbars=auto')
}
    
/* ===================== GỌI API ===================== */

const Pro_getDotbaogia = async () => {
    const res = await poStore.getDotbaogia()
    dataQoutePhase.value = res.dataQoutePhase
}

const Pro_getUserBuyer = async () => {
    const res = await poStore.getUserBuyer();
    dataUserBuyer.value=res.dataUserBuyer
}

const handQoutePhase_Month = () => {
        let data = {
                mouthQoute: mouthQoute.value
            }
            poStore.getQoutePhase_Month(data).then(res=>{
                dataQoutePhase_Month.value=res.dataQoutePhase_Month
            })
    }

const handDongDotBaoGia = async (ID?: number) => {
        if (ID === undefined || ID === null) return
        if (confirm('Bạn có chắc chắn muốn xóa báo giá này không?')) {
            let data = {
                PQP_ID: ID
            };
            await poStore.deleteDotbaogia(data);
            Pro_getDotbaogia()
        }
    }

const handAddPreiceQoute = async () => {
        let data={
            NAME_PHASE:NAME_PHASE.value,
            PROJ_CODE:PROJ_CODE.value,
            CUS_NAME:CUS_NAME.value,
            ADDRESS:ADDRESS.value,
            CUS_CONTACT:CUS_CONTACT.value,
            TELEPHONE:TELEPHONE.value,
            PTE_NAME:PTE_NAME.value,
            CUS_ID:selectedCustomer.value ? selectedCustomer.value.CUS_ID : null,
            QUOTE_BEFORE:QUOTE_BEFORE.value,
            REQ_RFQ:REQ_RFQ.value
        }
        const res = await poStore.AddPreiceQoute(data);
        if (res && res.ok === true) {
            NAME_PHASE.value=''
            PROJ_CODE.value=''
            CUS_NAME.value=''
            ADDRESS.value=''
            CUS_CONTACT.value=''
            TELEPHONE.value=''
            PTE_NAME.value=''
            QUOTE_BEFORE.value=''
            REQ_RFQ.value=''
            customerKeyword.value=''
            customerSuggestions.value=[]
            selectedCustomer.value=null
            
            Pro_getDotbaogia()
        }
    }


onBeforeUnmount(() => {
    if (customerSearchTimer) {
        clearTimeout(customerSearchTimer);
    }
    document.removeEventListener('click', handleBuyerMenuDocumentClick);
    window.removeEventListener('scroll', positionBuyerMenu, true);
    window.removeEventListener('resize', positionBuyerMenu);
})

onMounted(async () => {
    
    // const res= await pmcStore.getdataDemands_dtl()
    //     dataDemands_dtl=res.dataDemands_dtl

    Pro_getDotbaogia()
    handQoutePhase_Month()
    Pro_getUserBuyer()

    document.addEventListener('click', handleBuyerMenuDocumentClick);
    window.addEventListener('scroll', positionBuyerMenu, true);
    window.addEventListener('resize', positionBuyerMenu);
})


</script>

<style scoped>
.groupButton {
  display: flex;
  align-items: center;
  gap: 3px; /* khoảng cách giữa các nút, đổi 0 nếu muốn dính hẳn */
}

.groupButton .el-button + .el-button {
  margin-left: 0; /* bỏ khoảng cách mặc định 12px của Element Plus */
}

.groupButton .el-button--small {
  padding: 5px 8px; /* thu nhỏ đệm bên trong để nút gọn hơn */
}

.quote-form-wrapper {
    border: 1px solid #dbe5ef;
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 12px;
    background: linear-gradient(180deg, #ffffff 0%, #f6f9fc 100%);
}

.quote-form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 10px 12px;
}

.form-item {
    min-width: 0;
}

.quote-form-actions {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
}

.customer-autocomplete {
    position: relative;
}

.customer-dropdown {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    right: 0;
    z-index: 40;
    border: 1px solid #cdd9e5;
    border-radius: 8px;
    background: #ffffff;
    max-height: 260px;
    overflow-y: auto;
    box-shadow: 0 10px 24px rgba(26, 43, 61, 0.15);
}

.customer-dropdown-status {
    padding: 10px 12px;
    color: #667085;
    font-size: 13px;
}

.customer-option {
    width: 100%;
    border: 0;
    background: transparent;
    text-align: left;
    display: block;
    padding: 8px 12px;
}

.customer-option:hover,
.customer-option.active {
    background: #eff6ff;
}

.customer-name {
    display: block;
    color: #0f172a;
    font-weight: 600;
    font-size: 13px;
}

.customer-meta {
    display: block;
    color: #667085;
    font-size: 12px;
    margin-top: 2px;
}

.quote-status-cell {
    min-width: 210px;
    vertical-align: middle;
}

.quote-status {
    min-width: 190px;
}

.quote-status-heading {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 7px;
    line-height: 1.2;
}

.quote-status-index {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 31px;
    height: 22px;
    padding: 0 6px;
    border-radius: 11px;
    background: #e8eef5;
    color: #536477;
    font-size: 11px;
    font-weight: 700;
}

.quote-status-label {
    color: #344054;
    font-size: 12px;
    font-weight: 600;
    white-space: normal;
}

.quote-status-track {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
}

.quote-status-dot {
    position: relative;
    flex: 1 1 0;
    height: 5px;
    border-radius: 3px;
    background: #e2e8f0;
}

.quote-status-dot.active {
    background: #16a394;
}

.quote-status--0 .quote-status-index {
    background: #f1f3f5;
    color: #98a2b3;
}

@media (max-width: 768px) {
    .quote-status-cell {
        min-width: 180px;
    }

    .quote-status {
        min-width: 160px;
    }
}

</style>