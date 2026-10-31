<template>
	<div class="pdf-qoute-page">
		<div class="toolbar no-print">
			<el-button type="primary" class="btn btn-sm mr-2" @click="exportPDF">Export PDF</el-button>
			<el-button type="secondary" class="btn btn-sm" @click="printPage">Print</el-button>
		</div>

		<div id="printToPDF" class="quote-sheet">
			<div class="company-header">
				<div class="logo-wrap">
					<img :src="companyLogoRef" alt="TPS Logo" class="company-logo">
				</div>
				<div class="seller-block">
					<div><strong>CÔNG TY TNHH TIÊN PHONG AURATECH</strong></div>
					<div>37 Tôn Đức Thắng, Phường Sài Gòn, TP. HCM, Việt Nam</div>
					<div>Tel: +84 28 629 26848</div>
					<div>Website: www.tienphongsemi.com</div>
				</div>
			</div>

			<h2 class="title">BẢNG BÁO GIÁ</h2>

			<div class="meta-grid">
				<div><strong>CÔNG TY:</strong> {{ customerName }}</div>
				<div><strong>NGÀY:</strong> {{ quoteDate }}</div>
				<div><strong>ĐỊA CHỈ:</strong> {{ customerAddress }}</div>
				<div><strong>ĐIỆN THOẠI:</strong> {{ customerPhone }}</div>
			</div>

			<div class="intro">Công Ty TNHH Tiên Phong Auratech gửi đến quí khách hàng bảng báo giá:</div>

			<table class="table table-bordered table-sm quote-table">
				<thead>
					<tr>
						<th style="width: 50px;">STT</th>
						<th>Mã hàng</th>
						<th>HSX</th>
						<th style="width: 120px;" class="text-right">Số lượng (cái)</th>
						<th style="width: 160px;" class="text-right">Đơn giá chưa VAT (VND)</th>
						<th style="width: 170px;" class="text-right">Tổng cộng gồm VAT (VND)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in quoteRows" :key="index">
						<td>{{ index + 1 }}</td>
						<td>{{ item.PART_NUM || item.MATERIAL_CODE || '' }}</td>
						<td>{{ item.MANUFACTURER_NAME || item.NAME || '' }}</td>
						<td class="text-right">{{ formatNumber_num(item.PURCHASE_NUM || item.QTY || 0, 0) }}</td>
						<td class="text-right">{{ formatNumber_num(item.UNIT_PRICE || 0, 0) }}</td>
						<td class="text-right">{{ formatNumber_num(lineTotal(item), 0) }}</td>
					</tr>
				</tbody>
			</table>

			<div class="summary-block">
				<div class="summary-row">
					<span>Phải thanh tóan trước thuế (VND)</span>
					<strong>{{ formatNumber_num(subTotal, 0) }}</strong>
				</div>
				<div class="summary-row">
					<span>{{ vatRate }}% VAT (VND)</span>
					<strong>{{ formatNumber_num(vatAmount, 0) }}</strong>
				</div>
				<div class="summary-row total-row">
					<span>Phải thanh toán sau thuế (VND)</span>
					<strong>{{ formatNumber_num(grandTotal, 0) }}</strong>
				</div>
			</div>

			<div class="words"><strong>Bằng chữ:</strong> {{ amountInWords }}</div>

			<div class="terms">
				<div><strong>Hình thức thanh toán:</strong> {{ Qoute_KH && Qoute_KH.PAYMENT_METHOD ? Qoute_KH.PAYMENT_METHOD : '' }}</div>
				<div class="mt-1"><strong>Tài khoản thanh toán:</strong></div>
				<div class="bank-item">Tên tài khoản: CÔNG TY TNHH TIÊN PHONG AURATECH</div>
				<div class="bank-item">Số tài khoản: 19036964133013</div>
				<div class="bank-item">Ngân hàng hưởng: TECHCOMBANK chi nhánh GIA ĐỊNH</div>
				<div class="mt-1"><strong>Thời gian giao hàng:</strong> 2-3 tuần kể từ ngày nhận thanh toán (không bao gồm Thứ 7, Chủ Nhật và Lễ Tết).</div>
				<div><strong>Địa điểm giao hàng:</strong> 53 Tôn Đản, Phường Hồng Bàng, Thành phố Hải Phòng, Việt Nam.</div>
			</div>

			<div class="footer-grid">
				<div>
					<div><strong>Thông tin liên hệ:</strong></div>
					<div>Contact: {{ currentUser?.fullName }} </div>
					<div>Mobile: {{ currentUser?.PHONE }}</div>
					<div>Email: {{ currentUser?.EMAIL }}</div>	
				</div>
				<div class="confirm-block">
					<div>Công ty TNHH Tiên Phong Auratech</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from "vue-router";
import dayjs from 'dayjs';

import { formatNumber, readVietnameseNumber } from '@/helpers/functions';
import companyLogo from '@/assets/BaoGia_TPS_logo.png';
import { useAuthStore } from '@/stores/auth.store';
import { usePMCStore } from '@/stores/PMC.store';

const authStore = useAuthStore();
const currentUser = computed(() => authStore.user)
const route = useRoute();
const pmcStore = usePMCStore();

const companyLogoRef = ref(companyLogo);
const Qoute_KH = ref<Record<string, any> | null>(null);
const Qoute_Material = ref<Record<string, any>[]>([]);


const quoteRows = computed(() => Array.isArray(Qoute_Material.value) ? Qoute_Material.value : []);
const customerName = computed(() => Qoute_KH.value && Qoute_KH.value.CUS_NAME ? Qoute_KH.value.CUS_NAME : '');
const customerAddress = computed(() => Qoute_KH.value && Qoute_KH.value.ADDRESS ? Qoute_KH.value.ADDRESS : '');
const customerPhone = computed(() => Qoute_KH.value && Qoute_KH.value.TELEPHONE ? Qoute_KH.value.TELEPHONE : '');
const quoteDate = computed(() => Qoute_KH.value && Qoute_KH.value.CREATE_DATE ? dayjs(Qoute_KH.value.CREATE_DATE).format('DD/MM/YYYY') : '');
const vatRate = computed(() => Number(route.query.VAT_RATE || 8));
const subTotal = computed(() => quoteRows.value.reduce((sum, item) => sum + lineTotal(item), 0));
const vatAmount = computed(() => subTotal.value * vatRate.value / 100);
const grandTotal = computed(() => subTotal.value + vatAmount.value);
const amountInWords = computed(() => {
	if (!grandTotal.value) {
		return 'Không đồng.';
	}
	const words = readVietnameseNumber(Math.round(grandTotal.value));
	return `${words.charAt(0).toUpperCase()}${words.slice(1)} đồng.`;
});

function lineTotal(item: Record<string, any>): number {
	const qty = Number(item.PURCHASE_NUM || item.QTY || 0);
	const price = Number(item.UNIT_PRICE || 0);
	return qty * price;
}


const formatNumber_num = (value: number | string, decimals = 0) => {
	return formatNumber(Number(value || 0), decimals);
};
const exportPDF = () => {
			const element = document.getElementById('printToPDF');
			if (!element) {
				return;
			}

			const fileName = `BaoGia_${route.query.NAME_PHASE || route.query.PQP_ID || 'TPS'}.pdf`;
			const clone = element.cloneNode(true);
			const container = document.createElement('div');
			container.style.position = 'absolute';
			container.style.left = '-9999px';
			container.style.top = '0';
			container.style.width = '210mm';
			container.style.padding = '0';
			container.style.background = '#ffffff';
			container.appendChild(clone);
			document.body.appendChild(container);

			const loadScript = (src: string): Promise<void> => new Promise((resolve, reject) => {
				if (document.querySelector(`script[src="${src}"]`)) {
					resolve();
					return;
				}
				const script = document.createElement('script');
				script.src = src;
				script.onload = () => resolve();
				script.onerror = () => reject(new Error(`Failed to load ${src}`));
				document.head.appendChild(script);
			});

			const html2canvasSrc = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
			const jspdfSrc = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

			Promise.resolve()
				.then(() => loadScript(html2canvasSrc))
				.then(() => (window as any).html2canvas(container, {
					scale: 2,
					useCORS: true,
					logging: false,
					backgroundColor: '#ffffff'
				}))
				.then((canvas) => loadScript(jspdfSrc).then(() => canvas))
				.then((canvas) => {
					const jsPDFClass = ((window as any).jspdf && (window as any).jspdf.jsPDF) ? (window as any).jspdf.jsPDF : ((window as any).jsPDF || null);
					if (!jsPDFClass) {
						throw new Error('jsPDF chua duoc load');
					}

					let pdf;
					try {
						pdf = new jsPDFClass({ orientation: 'portrait', unit: 'mm', format: 'a4' });
					} catch (err) {
						pdf = new jsPDFClass('portrait', 'mm', 'a4');
					}

					const pageWidth = pdf.internal.pageSize.getWidth();
					const pageHeight = pdf.internal.pageSize.getHeight();
					const margin = 8;
					const imgWidth = pageWidth - (margin * 2);
					const scaleRatio = imgWidth / canvas.width;
					const sliceHeightPx = Math.floor((pageHeight - margin * 2) / scaleRatio);

					let sourceY = 0;
					let pageIndex = 0;
					while (sourceY < canvas.height) {
						const remaining = canvas.height - sourceY;
						const currentSliceHeight = Math.min(sliceHeightPx, remaining);

						const sliceCanvas = document.createElement('canvas');
						sliceCanvas.width = canvas.width;
						sliceCanvas.height = currentSliceHeight;
						const ctx = sliceCanvas.getContext('2d') as CanvasRenderingContext2D;
						ctx.fillStyle = '#ffffff';
						ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
						ctx.drawImage(canvas, 0, sourceY, canvas.width, currentSliceHeight, 0, 0, canvas.width, currentSliceHeight);

						if (pageIndex > 0) {
							pdf.addPage();
						}

						const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.98);
						const targetHeight = currentSliceHeight * scaleRatio;
						pdf.addImage(sliceData, 'JPEG', margin, margin, imgWidth, targetHeight);

						sourceY += currentSliceHeight;
						pageIndex += 1;
					}

					pdf.save(fileName);
				})
				.catch((error) => {
					console.error('Export PDF error:', error);
					alert(`Loi khi xuat PDF: ${error && error.message ? error.message : error}`);
				})
				.finally(() => {
					if (container && container.parentNode) {
						container.parentNode.removeChild(container);
					}
				});
		}
const printPage = () => {
			window.print();
		};
const loadData = async () => {
	const data = {
		PQP_ID: route.query.PQP_ID
	};
	const res = await pmcStore.getReportBaoGia_KH(data);
	console.log('getReportBaoGia_KH res:', res.Qoute_KH);
	if (res && res.ok) {
		Qoute_KH.value = res.Qoute_KH;
		Qoute_Material.value = res.Qoute_Material;
	}
}

onMounted(loadData);

</script>

<style scoped>
.pdf-qoute-page {
	background: #f3f5f8;
	min-height: 100vh;
	padding: 16px;
}

.toolbar {
	margin-bottom: 12px;
}

.quote-sheet {
	width: 210mm;
	min-height: 297mm;
	margin: 0 auto;
	background: #ffffff;
	color: #111111;
	padding: 14mm 12mm;
	font-size: 14px;
	line-height: 1.35;
	box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.buyer-line {
	margin-bottom: 8px;
}

.seller-block {
	margin-bottom: 12px;
}

.company-header {
	display: flex;
	align-items: center;
	gap: 14px;
	margin-bottom: 12px;
}

.logo-wrap {
	width: 105px;
	min-width: 105px;
}

.company-logo {
	width: 100%;
	height: auto;
	display: block;
}

.title {
	text-align: center;
	font-size: 24px;
	margin: 8px 0 14px;
}

.meta-grid > div {
	margin-bottom: 4px;
}

.intro {
	margin: 10px 0 10px;
}

.quote-table {
	margin-bottom: 10px;
}

.quote-table th,
.quote-table td {
	vertical-align: middle;
	font-size: 13px;
}

.summary-block {
	margin-left: auto;
	max-width: 420px;
	border: 1px solid #d9dee7;
}

.summary-row {
	display: flex;
	justify-content: space-between;
	padding: 6px 10px;
	border-bottom: 1px solid #e5e9ef;
}

.summary-row:last-child {
	border-bottom: none;
}

.total-row {
	background: #f6f8fb;
}

.words {
	margin-top: 8px;
}

.terms {
	margin-top: 10px;
}

.bank-item {
	margin-left: 14px;
}

.footer-grid {
	margin-top: 22px;
	display: flex;
	justify-content: space-between;
	gap: 12px;
}

	@media (max-width: 768px) {
		.company-header {
			align-items: flex-start;
		}

		.logo-wrap {
			width: 90px;
			min-width: 90px;
		}
	}

.confirm-block {
	text-align: right;
}

@media print {
	.no-print {
		display: none !important;
	}

	.pdf-qoute-page {
		background: #ffffff;
		padding: 0;
	}

	.quote-sheet {
		box-shadow: none;
		width: 100%;
		min-height: auto;
		padding: 10mm;
	}
}
</style>