<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import {
	Finished,
	Goods,
	Operation,
	SetUp,
	Tools,
	TrendCharts,
} from '@element-plus/icons-vue'

type NavigationLeaf = { id: string; label: string }
type NavigationGroup = { id: string; label: string; items: NavigationLeaf[] }
type NavigationModule = { id: string; label: string; icon: Component; groups: NavigationGroup[] }

const navigation: NavigationModule[] = [
	{
		id: 'production',
		label: 'Sản xuất',
		icon: Operation,
		groups: [
			{
				id: 'planning',
				label: 'Kế hoạch sản xuất',
				items: [
					{ id: 'work-orders', label: 'Lệnh sản xuất' },
					{ id: 'production-schedule', label: 'Lịch sản xuất' },
					{ id: 'dispatching', label: 'Điều độ sản xuất' },
				],
			},
			{
				id: 'execution',
				label: 'Thực thi sản xuất',
				items: [
					{ id: 'shop-floor', label: 'Theo dõi chuyền' },
					{ id: 'output-recording', label: 'Ghi nhận sản lượng' },
					{ id: 'traceability', label: 'Truy xuất sản phẩm' },
				],
			},
		],
	},
	{
		id: 'quality',
		label: 'Chất lượng',
		icon: Finished,
		groups: [
			{
				id: 'inspection',
				label: 'Kiểm soát chất lượng',
				items: [
					{ id: 'inspection-plans', label: 'Kế hoạch kiểm tra' },
					{ id: 'inspection-records', label: 'Phiếu kiểm tra' },
					{ id: 'quality-results', label: 'Kết quả chất lượng' },
				],
			},
			{
				id: 'nonconformance',
				label: 'Xử lý không phù hợp',
				items: [
					{ id: 'defects', label: 'Danh sách lỗi' },
					{ id: 'corrective-actions', label: 'Hành động khắc phục' },
				],
			},
		],
	},
	{
		id: 'materials',
		label: 'Kho & vật tư',
		icon: Goods,
		groups: [
			{
				id: 'inventory',
				label: 'Quản lý kho',
				items: [
					{ id: 'inventory-balance', label: 'Tồn kho' },
					{ id: 'receipts', label: 'Nhập kho' },
					{ id: 'issues', label: 'Xuất kho' },
				],
			},
			{
				id: 'materials-planning',
				label: 'Nhu cầu vật tư',
				items: [
					{ id: 'material-requests', label: 'Yêu cầu vật tư' },
					{ id: 'bill-of-materials', label: 'Định mức nguyên vật liệu' },
				],
			},
		],
	},
	{
		id: 'equipment',
		label: 'Thiết bị',
		icon: Tools,
		groups: [
			{
				id: 'maintenance',
				label: 'Bảo trì',
				items: [
					{ id: 'maintenance-plan', label: 'Kế hoạch bảo trì' },
					{ id: 'maintenance-orders', label: 'Lệnh bảo trì' },
				],
			},
			{
				id: 'equipment-monitoring',
				label: 'Giám sát thiết bị',
				items: [
					{ id: 'equipment-status', label: 'Trạng thái thiết bị' },
					{ id: 'downtime', label: 'Thời gian dừng máy' },
				],
			},
		],
	},
	{
		id: 'reports',
		label: 'Báo cáo',
		icon: TrendCharts,
		groups: [
			{
				id: 'production-reports',
				label: 'Hiệu suất sản xuất',
				items: [
					{ id: 'oee-report', label: 'Hiệu suất OEE' },
					{ id: 'output-report', label: 'Sản lượng theo ca' },
				],
			},
			{
				id: 'quality-reports',
				label: 'Chất lượng',
				items: [
					{ id: 'defect-report', label: 'Tỷ lệ lỗi' },
					{ id: 'yield-report', label: 'Tỷ lệ đạt' },
				],
			},
		],
	},
]

const searchTerm = ref('')
const activeItemId = ref('work-orders')
const expandedModules = ref(new Set(['production']))
const expandedGroups = ref(new Set(['production/planning', 'production/execution']))
const mobileNavigationOpen = ref(false)

const visibleNavigation = computed(() => {
	const term = searchTerm.value.trim().toLocaleLowerCase('vi')
	if (!term) return navigation

	return navigation
		.map((module) => {
			const moduleMatches = module.label.toLocaleLowerCase('vi').includes(term)
			const groups = module.groups
				.map((group) => {
					const groupMatches = group.label.toLocaleLowerCase('vi').includes(term)
					const items = group.items.filter((item) => item.label.toLocaleLowerCase('vi').includes(term))
					return { ...group, items: moduleMatches || groupMatches ? group.items : items }
				})
				.filter((group) => group.items.length > 0)
			return { ...module, groups }
		})
		.filter((module) => module.groups.length > 0)
})

const activeContext = computed(() => {
	for (const module of navigation) {
		for (const group of module.groups) {
			const item = group.items.find((leaf) => leaf.id === activeItemId.value)
			if (item) return { module, group, item }
		}
	}
	return null
})

const relatedItems = computed(() => activeContext.value?.group.items ?? [])

function toggleModule(moduleId: string) {
	const next = new Set(expandedModules.value)
	if (next.has(moduleId)) next.delete(moduleId)
	else next.add(moduleId)
	expandedModules.value = next
}

function toggleGroup(groupKey: string) {
	const next = new Set(expandedGroups.value)
	if (next.has(groupKey)) next.delete(groupKey)
	else next.add(groupKey)
	expandedGroups.value = next
}

function selectItem(itemId: string) {
	activeItemId.value = itemId
	mobileNavigationOpen.value = false
}
</script>

<template>
	<div class="mes-app">
		<button
			v-if="mobileNavigationOpen"
			class="navigation-scrim"
			aria-label="Đóng điều hướng"
			@click="mobileNavigationOpen = false"
		></button>

		<aside class="sidebar" :class="{ 'sidebar--open': mobileNavigationOpen }">
			<a class="brand" href="#" aria-label="MES - Tổng quan">
				<span class="brand-mark"><SetUp /></span>
				<span class="brand-copy">
					<strong>MES</strong>
					<small>MANUFACTURING SYSTEM</small>
				</span>
			</a>

			<label class="search-box">
				<!-- <Search class="search-icon" /> -->
				<input v-model="searchTerm" type="search" placeholder="Tìm danh mục..." />
				<kbd>/</kbd>
			</label>

			<div class="navigation-heading">
				<span>KHÔNG GIAN LÀM VIỆC</span>
				<span class="heading-rule"></span>
			</div>

			<nav class="navigation-tree" aria-label="Điều hướng MES">
				<template v-for="module in visibleNavigation" :key="module.id">
					<button
						class="module-row"
						:class="{ 'module-row--expanded': expandedModules.has(module.id) }"
						:aria-expanded="expandedModules.has(module.id)"
						@click="toggleModule(module.id)"
					>
						<component :is="module.icon" class="module-icon" />
						<span>{{ module.label }}</span>
						<ArrowDown class="chevron" />
					</button>

					<div v-if="expandedModules.has(module.id) || searchTerm" class="module-children">
						<template v-for="group in module.groups" :key="group.id">
							<button
								class="group-row"
								:aria-expanded="expandedGroups.has(`${module.id}/${group.id}`) || Boolean(searchTerm)"
								@click="toggleGroup(`${module.id}/${group.id}`)"
							>
								<span>{{ group.label }}</span>
								<ArrowRight class="group-chevron" />
							</button>
							<div
								v-if="expandedGroups.has(`${module.id}/${group.id}`) || searchTerm"
								class="leaf-list"
							>
								<button
									v-for="item in group.items"
									:key="item.id"
									class="leaf-row"
									:class="{ 'leaf-row--active': activeItemId === item.id }"
									:aria-current="activeItemId === item.id ? 'page' : undefined"
									@click="selectItem(item.id)"
								>
									<span class="leaf-marker"></span>
									<span>{{ item.label }}</span>
								</button>
							</div>
						</template>
					</div>
				</template>
				<p v-if="visibleNavigation.length === 0" class="empty-search">Không tìm thấy danh mục phù hợp.</p>
			</nav>

			<div class="sidebar-footer">
				<span class="status-dot"></span>
				<span>Hệ thống hoạt động</span>
				<span class="version">v1.0</span>
			</div>
		</aside>

		<main class="main-area">
			<header class="topbar">
				<button
					class="mobile-menu-button"
					aria-label="Mở điều hướng"
					@click="mobileNavigationOpen = true"
				>
					<Menu />
				</button>
				<div class="topbar-context">
					<span class="context-label">NHÀ MÁY</span>
					<span class="context-value">Cơ sở sản xuất chính</span>
					<ArrowDown class="context-chevron" />
				</div>
				<div class="topbar-actions">
					<span class="shift-status"><span class="status-dot"></span>Ca 1 đang hoạt động</span>
					<button class="icon-button" aria-label="Thông báo"><Bell /></button>
					<span class="topbar-divider"></span>
					<button class="user-button" aria-label="Tài khoản người dùng">
						<span class="user-avatar"><UserFilled /></span>
						<span class="user-name">Quản trị viên</span>
						<ArrowDown class="context-chevron" />
					</button>
				</div>
			</header>

			<div v-if="activeContext" class="page-content">
				<div class="breadcrumb">
					<span>Không gian làm việc</span>
					<ArrowRight />
					<span>{{ activeContext.module.label }}</span>
					<ArrowRight />
					<span>{{ activeContext.group.label }}</span>
				</div>

				<section class="page-heading">
					<div>
						<div class="eyebrow"><span class="eyebrow-line"></span>{{ activeContext.module.label }}</div>
						<h1>{{ activeContext.item.label }}</h1>
						<p class="page-description">{{ activeContext.group.label }} <span>/</span> {{ activeContext.module.label }}</p>
					</div>
					<div class="heading-tools">
						<span class="hierarchy-badge"><List /> Cấp điều hướng 03</span>
					</div>
				</section>

				<section class="workspace-band" aria-label="Danh mục đang chọn">
					<div class="band-index">{{ String(relatedItems.findIndex((item) => item.id === activeItemId) + 1).padStart(2, '0') }}</div>
					<div class="band-copy">
						<span class="band-kicker">DANH MỤC ĐANG MỞ</span>
						<strong>{{ activeContext.item.label }}</strong>
					</div>
					<div class="band-path">
						<span>{{ activeContext.module.label }}</span>
						<ArrowRight />
						<span>{{ activeContext.group.label }}</span>
						<ArrowRight />
						<strong>{{ activeContext.item.label }}</strong>
					</div>
					<component :is="activeContext.module.icon" class="band-icon" />
				</section>

				<section class="related-section">
					<div class="section-heading">
						<div>
							<span class="section-kicker">CẤU TRÚC ĐIỀU HƯỚNG</span>
							<h2>{{ activeContext.group.label }}</h2>
						</div>
						<span class="item-count">{{ String(relatedItems.length).padStart(2, '0') }} danh mục</span>
					</div>

					<div class="category-list">
						<button
							v-for="(item, index) in relatedItems"
							:key="item.id"
							class="category-item"
							:class="{ 'category-item--active': activeItemId === item.id }"
							@click="selectItem(item.id)"
						>
							<span class="category-number">{{ String(index + 1).padStart(2, '0') }}</span>
							<span class="category-name">{{ item.label }}</span>
							<span class="category-level">CẤP 03</span>
							<ArrowRight class="category-arrow" />
						</button>
					</div>
				</section>

				<footer class="page-footer">
					<span><Document /> Cấu trúc danh mục MES</span>
					<span>Đang hiển thị {{ navigation.reduce((total, module) => total + module.groups.reduce((groupTotal, group) => groupTotal + group.items.length, 0), 0) }} danh mục</span>
				</footer>
			</div>
		</main>
	</div>
</template>

<style scoped>
:global(:root) {
	color-scheme: light;
	font-family: 'Aptos', 'Segoe UI', sans-serif;
	font-size: 14px;
	background: #f3f5f3;
	color: #202a27;
}

:global(body) {
	min-width: 320px;
	margin: 0;
}

:global(#app) {
	width: 100%;
	max-width: none;
	min-height: 100vh;
	margin: 0;
	border: 0;
	text-align: left;
}

* {
	box-sizing: border-box;
}

button,
input {
	font: inherit;
}

button {
	color: inherit;
}

.mes-app {
	--ink: #202a27;
	--muted: #7b8680;
	--line: #e7ebe7;
	--green: #28745b;
	--green-soft: #e8f2ed;
	--sidebar: #f9faf8;
	display: flex;
	min-height: 100vh;
	color: var(--ink);
	background:
		linear-gradient(135deg, rgba(221, 232, 222, 0.25), transparent 36%),
		#f3f5f3;
}

.sidebar {
	position: relative;
	z-index: 5;
	display: flex;
	flex: 0 0 278px;
	flex-direction: column;
	min-height: 100vh;
	padding: 26px 16px 14px;
	border-right: 1px solid #e4e9e4;
	background: var(--sidebar);
}

.brand {
	display: flex;
	align-items: center;
	gap: 11px;
	margin: 0 5px 29px;
	color: inherit;
	text-decoration: none;
}

.brand-mark {
	display: grid;
	width: 38px;
	height: 38px;
	place-items: center;
	border-radius: 10px 10px 10px 3px;
	background: #28745b;
	color: white;
	font-size: 20px;
}

.brand-copy {
	display: grid;
	gap: 2px;
}

.brand-copy strong {
	font-size: 18px;
	line-height: 1;
}

.brand-copy small {
	color: #78857e;
	font-size: 9px;
	font-weight: 700;
}

.search-box {
	display: flex;
	height: 38px;
	align-items: center;
	gap: 9px;
	padding: 0 10px;
	border: 1px solid #e3e8e3;
	border-radius: 5px;
	background: #fff;
	color: #7e8983;
}

.search-icon {
	flex: none;
	font-size: 15px;
}

.search-box input {
	width: 100%;
	min-width: 0;
	padding: 0;
	border: 0;
	outline: 0;
	background: transparent;
	color: var(--ink);
	font-size: 12px;
}

.search-box input::placeholder {
	color: #929b95;
}

.search-box kbd {
	flex: none;
	padding: 1px 5px;
	border: 1px solid #e6e9e6;
	border-radius: 3px;
	background: #f7f8f6;
	font-size: 10px;
}

.navigation-heading {
	display: flex;
	align-items: center;
	gap: 9px;
	margin: 26px 7px 12px;
	color: #97a19b;
	font-size: 9px;
	font-weight: 700;
}

.heading-rule {
	height: 1px;
	flex: 1;
	background: #e8ece8;
}

.navigation-tree {
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: 3px;
	overflow-y: auto;
	padding-bottom: 12px;
}

.module-row,
.group-row,
.leaf-row {
	display: flex;
	width: 100%;
	align-items: center;
	border: 0;
	background: transparent;
	text-align: left;
	cursor: pointer;
}

.module-row {
	min-height: 39px;
	gap: 10px;
	padding: 0 9px;
	border-radius: 4px;
	color: #495650;
	font-size: 12px;
	font-weight: 650;
	transition: background 150ms ease, color 150ms ease;
}

.module-row:hover,
.module-row--expanded {
	background: #edf3ef;
	color: #24664f;
}

.module-icon {
	font-size: 16px;
}

.module-row > span {
	flex: 1;
}

.chevron {
	color: #909b94;
	font-size: 11px;
	transition: transform 150ms ease;
}

.module-row:not(.module-row--expanded) .chevron {
	transform: rotate(-90deg);
}

.module-children {
	margin: 2px 0 7px 16px;
	padding-left: 10px;
	border-left: 1px solid #dfe7e1;
}

.group-row {
	min-height: 31px;
	justify-content: space-between;
	gap: 6px;
	padding: 0 6px 0 9px;
	color: #64716a;
	font-size: 11px;
	font-weight: 600;
}

.group-row:hover {
	color: #24664f;
}

.group-chevron {
	color: #a0aaa3;
	font-size: 10px;
	transition: transform 150ms ease;
}

.group-row[aria-expanded='true'] .group-chevron {
	transform: rotate(90deg);
}

.leaf-list {
	display: grid;
	gap: 2px;
	padding: 2px 0 7px 7px;
}

.leaf-row {
	min-height: 30px;
	gap: 8px;
	padding: 0 8px;
	border-radius: 3px;
	color: #748078;
	font-size: 11px;
	transition: background 150ms ease, color 150ms ease;
}

.leaf-row:hover {
	background: #f0f4f1;
	color: #286b53;
}

.leaf-row--active {
	background: #e7f1eb;
	color: #23664e;
	font-weight: 650;
}

.leaf-marker {
	width: 5px;
	height: 5px;
	flex: none;
	border: 1px solid #aab5ae;
	border-radius: 50%;
}

.leaf-row--active .leaf-marker {
	border-color: #28745b;
	background: #28745b;
	box-shadow: 0 0 0 3px rgba(40, 116, 91, 0.11);
}

.empty-search {
	padding: 12px 7px;
	color: var(--muted);
	font-size: 11px;
}

.sidebar-footer {
	display: flex;
	min-height: 37px;
	align-items: center;
	gap: 8px;
	padding: 0 5px;
	border-top: 1px solid #e8ece8;
	color: #758178;
	font-size: 10px;
}

.status-dot {
	width: 7px;
	height: 7px;
	flex: none;
	border-radius: 50%;
	background: #54a779;
	box-shadow: 0 0 0 3px rgba(84, 167, 121, 0.12);
}

.version {
	margin-left: auto;
	color: #9ba59e;
}

.main-area {
	display: flex;
	min-width: 0;
	flex: 1;
	flex-direction: column;
}

.topbar {
	display: flex;
	min-height: 62px;
	align-items: center;
	justify-content: space-between;
	gap: 18px;
	padding: 0 34px;
	border-bottom: 1px solid #e6eae6;
	background: rgba(250, 251, 249, 0.88);
}

.topbar-context,
.topbar-actions,
.user-button {
	display: flex;
	align-items: center;
}

.topbar-context {
	gap: 10px;
}

.context-label {
	color: #98a29c;
	font-size: 9px;
	font-weight: 700;
}

.context-value {
	font-size: 11px;
	font-weight: 650;
}

.context-chevron {
	color: #8d9991;
	font-size: 10px;
}

.topbar-actions {
	gap: 17px;
}

.shift-status {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #637068;
	font-size: 10px;
}

.shift-status .status-dot {
	width: 6px;
	height: 6px;
}

.icon-button,
.mobile-menu-button {
	display: grid;
	width: 32px;
	height: 32px;
	place-items: center;
	border: 0;
	border-radius: 4px;
	background: transparent;
	color: #6e7b73;
	cursor: pointer;
}

.icon-button:hover,
.mobile-menu-button:hover {
	background: #edf2ee;
}

.topbar-divider {
	width: 1px;
	height: 25px;
	background: #e2e7e2;
}

.user-button {
	gap: 8px;
	padding: 0;
	border: 0;
	background: transparent;
	cursor: pointer;
}

.user-avatar {
	display: grid;
	width: 29px;
	height: 29px;
	place-items: center;
	border-radius: 50%;
	background: #e8eee9;
	color: #48715c;
	font-size: 13px;
}

.user-name {
	font-size: 10px;
	font-weight: 600;
}

.mobile-menu-button {
	display: none;
}

.page-content {
	width: min(1120px, 100%);
	margin: 0 auto;
	padding: 25px 42px 22px;
}

.breadcrumb {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #929d95;
	font-size: 10px;
}

.breadcrumb svg {
	font-size: 9px;
}

.breadcrumb span:last-child {
	color: #5b6c61;
}

.page-heading {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 20px;
	padding: 29px 0 24px;
}

.eyebrow,
.section-kicker,
.band-kicker {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #6d8979;
	font-size: 9px;
	font-weight: 750;
}

.eyebrow-line {
	width: 17px;
	height: 2px;
	background: #59a17b;
}

.page-heading h1 {
	margin: 8px 0 4px;
	color: #202a27;
	font-size: 29px;
	font-weight: 650;
	line-height: 1.2;
}

.page-description {
	margin: 0;
	color: #859088;
	font-size: 11px;
}

.page-description span {
	padding: 0 5px;
	color: #bec6c0;
}

.heading-tools {
	padding-bottom: 2px;
}

.hierarchy-badge {
	display: inline-flex;
	align-items: center;
	gap: 7px;
	padding: 7px 10px;
	border: 1px solid #e1e8e2;
	border-radius: 4px;
	background: #fafbf9;
	color: #617067;
	font-size: 10px;
}

.hierarchy-badge svg {
	color: #4c8467;
}

.workspace-band {
	position: relative;
	display: flex;
	min-height: 115px;
	align-items: center;
	gap: 18px;
	overflow: hidden;
	padding: 20px 25px;
	border: 1px solid #dbe6dd;
	border-left: 3px solid #4b9b70;
	background:
		linear-gradient(105deg, rgba(230, 241, 233, 0.94), rgba(246, 249, 246, 0.94) 68%),
		#eaf2ec;
}

.band-index {
	display: grid;
	width: 48px;
	height: 48px;
	flex: none;
	place-items: center;
	border: 1px solid rgba(67, 132, 92, 0.22);
	border-radius: 50%;
	color: #317151;
	font-size: 16px;
	font-weight: 650;
}

.band-copy {
	display: grid;
	gap: 7px;
}

.band-kicker {
	color: #658371;
	font-size: 8px;
}

.band-copy strong {
	color: #284b38;
	font-size: 16px;
	font-weight: 650;
}

.band-path {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-left: auto;
	color: #7c8e82;
	font-size: 9px;
}

.band-path svg {
	font-size: 9px;
}

.band-path strong {
	color: #456d54;
	font-weight: 650;
}

.band-icon {
	position: absolute;
	right: 18px;
	bottom: -22px;
	color: rgba(52, 115, 76, 0.07);
	font-size: 104px;
	transform: rotate(-13deg);
}

.related-section {
	margin-top: 35px;
}

.section-heading {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	padding-bottom: 13px;
	border-bottom: 1px solid #e1e7e1;
}

.section-kicker {
	color: #929d95;
	font-size: 8px;
}

.section-heading h2 {
	margin: 5px 0 0;
	color: #2a3530;
	font-size: 15px;
	font-weight: 650;
}

.item-count {
	color: #859188;
	font-size: 10px;
}

.category-list {
	display: grid;
}

.category-item {
	display: grid;
	min-height: 52px;
	grid-template-columns: 42px minmax(0, 1fr) 80px 18px;
	align-items: center;
	gap: 12px;
	padding: 0 9px;
	border: 0;
	border-bottom: 1px solid #e5eae5;
	background: transparent;
	text-align: left;
	cursor: pointer;
	transition: background 140ms ease;
}

.category-item:hover,
.category-item--active {
	background: rgba(233, 241, 235, 0.72);
}

.category-number {
	color: #a3ada5;
	font-size: 10px;
	font-variant-numeric: tabular-nums;
}

.category-name {
	color: #39463f;
	font-size: 11px;
	font-weight: 550;
}

.category-item--active .category-name {
	color: #286b50;
	font-weight: 700;
}

.category-level {
	color: #98a49b;
	font-size: 8px;
	font-weight: 700;
}

.category-arrow {
	color: #92a096;
	font-size: 12px;
	transition: transform 140ms ease;
}

.category-item:hover .category-arrow,
.category-item--active .category-arrow {
	color: #317452;
	transform: translateX(3px);
}

.page-footer {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	margin-top: 42px;
	padding-top: 13px;
	border-top: 1px solid #e4e9e4;
	color: #98a29b;
	font-size: 9px;
}

.page-footer span {
	display: flex;
	align-items: center;
	gap: 6px;
}

.navigation-scrim {
	display: none;
}

@media (max-width: 900px) {
	.sidebar {
		flex-basis: 250px;
	}

	.page-content {
		padding-right: 28px;
		padding-left: 28px;
	}

	.topbar {
		padding: 0 25px;
	}

	.band-path {
		display: none;
	}
}

@media (max-width: 680px) {
	.sidebar {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: min(290px, calc(100vw - 48px));
		min-height: 0;
		transform: translateX(-102%);
		transition: transform 180ms ease;
	}

	.sidebar--open {
		transform: translateX(0);
	}

	.navigation-scrim {
		position: fixed;
		z-index: 4;
		inset: 0;
		display: block;
		border: 0;
		background: rgba(23, 34, 28, 0.32);
	}

	.topbar {
		min-height: 56px;
		gap: 9px;
		padding: 0 14px;
	}

	.mobile-menu-button {
		display: grid;
		flex: none;
	}

	.topbar-context {
		min-width: 0;
		gap: 6px;
	}

	.context-label {
		display: none;
	}

	.context-value {
		overflow: hidden;
		font-size: 10px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.topbar-actions {
		gap: 7px;
	}

	.shift-status,
	.topbar-divider,
	.user-name,
	.user-button > .context-chevron {
		display: none;
	}

	.page-content {
		padding: 20px 17px 22px;
	}

	.breadcrumb {
		flex-wrap: wrap;
		gap: 6px;
		font-size: 9px;
	}

	.page-heading {
		align-items: flex-start;
		padding: 25px 0 20px;
	}

	.page-heading h1 {
		font-size: 24px;
	}

	.heading-tools {
		padding-top: 2px;
	}

	.hierarchy-badge {
		gap: 5px;
		padding: 6px;
		font-size: 8px;
		white-space: nowrap;
	}

	.workspace-band {
		min-height: 100px;
		gap: 12px;
		padding: 16px;
	}

	.band-index {
		width: 40px;
		height: 40px;
		font-size: 14px;
	}

	.band-copy strong {
		font-size: 14px;
	}

	.related-section {
		margin-top: 29px;
	}

	.category-item {
		min-height: 49px;
		grid-template-columns: 28px minmax(0, 1fr) 52px 14px;
		gap: 8px;
		padding: 0 5px;
	}

	.category-name {
		font-size: 10px;
	}

	.category-level {
		font-size: 7px;
	}

	.page-footer {
		margin-top: 34px;
		font-size: 8px;
	}
}
</style>
