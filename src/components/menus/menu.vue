<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import { RouterLink } from 'vue-router'
import {
	ArrowDown,
	ArrowRight,
	Bell,
	Document,
	ElementPlus,
	Expand,
	Finished,
	Goods,
	List,
	Menu,
	Sell,
	Operation,
	Search,
	SetUp,
	Tools,
	TrendCharts,
	UserFilled,
	ShoppingCart,
	Calendar,
} from '@element-plus/icons-vue'

import { useAuthStore, type MenuItem } from '../../stores/auth.store'

defineProps<{ mobileOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const authStore = useAuthStore()

type MenuGroup = MenuItem & { items: MenuItem[] }
type MenuSection = MenuItem & { groups: MenuGroup[] }

const sections = computed<MenuItem[]>(() => authStore.menus ?? [])

const searchTerm = ref('')
const selectedItemId = ref('work-orders')
const expandedSections = ref(new Set(['production']))
const expandedGroups = ref(new Set(['production/planning', 'production/execution']))

const isSearching = computed(() => searchTerm.value.trim().length > 0)

const labelOf = (item: MenuItem) => item.MENU_LABLE ?? item.MENU_NAME ?? ''
const normalize = (text: string) => text.toLocaleLowerCase('vi')

/**
 * Luôn trả về cấu trúc thống nhất: section -> groups -> items
 * (kể cả khi không tìm kiếm) để template chỉ cần lặp một kiểu dữ liệu.
 */
const visibleSections = computed<MenuSection[]>(() => {
	const term = normalize(searchTerm.value.trim())

	const result: MenuSection[] = []

	for (const section of sections.value) {
		const sectionMatches = !term || normalize(labelOf(section)).includes(term)
		const groups: MenuGroup[] = []

		for (const group of section.Menu_children ?? []) {
			const groupMatches = !term || normalize(labelOf(group)).includes(term)
			const children = group.Menu_children ?? []
			const items = sectionMatches || groupMatches
				? children
				: children.filter((item) => normalize(labelOf(item)).includes(term))

			const isLeafGroupMatched = children.length === 0 && (sectionMatches || groupMatches)
			if (items.length > 0 || isLeafGroupMatched) {
				groups.push({ ...group, items })
			}
		}

		const isLeafSectionMatched = (section.Menu_children ?? []).length === 0 && sectionMatches
		if (groups.length > 0 || isLeafSectionMatched) {
			result.push({ ...section, groups })
		}
	}

	return result
})

const iconMap: Record<string, Component> = {
	operation: Operation,
	finished: Finished,
	goods: Goods,
	tools: Tools,
	trendcharts: TrendCharts,
	document: Document,
	search: Search,
	bell: Bell,
	userfilled: UserFilled,
	menu: Menu,
	sell: Sell,
	list: List,
	setup: SetUp,
	expand: Expand,
	arrowdown: ArrowDown,
	arrowright: ArrowRight,
	elementplus: ElementPlus,
	shoppingcart: ShoppingCart,
	calendar: Calendar,
}

function resolveMenuIcon(icon?: string) {
	if (!icon) return Menu
	return iconMap[String(icon).trim().toLowerCase()] ?? Menu
}

function resolveMenuLink(link?: string) {
	if (!link) return '#'
	if (link.startsWith('/') || link.startsWith('#') || link.startsWith('http')) return link
	return { name: link }
}

const groupKey = (section: MenuItem, group: MenuItem) => `${section.MENU_NAME}/${group.MENU_NAME}`

const isSectionOpen = (section: MenuItem) =>
	isSearching.value || expandedSections.value.has(section.MENU_NAME)

const isGroupOpen = (section: MenuItem, group: MenuItem) =>
	isSearching.value || expandedGroups.value.has(groupKey(section, group))

function toggleSection(id: string) {
	const next = new Set(expandedSections.value)
	if (next.has(id)) next.delete(id)
	else next.add(id)
	expandedSections.value = next
}

function toggleGroup(sectionName: string, groupName: string) {
	const key = `${sectionName}/${groupName}`
	const next = new Set(expandedGroups.value)
	if (next.has(key)) next.delete(key)
	else next.add(key)
	expandedGroups.value = next
}

function selectItem(id: string) {
	selectedItemId.value = id
	emit('close')
}
</script>

<template>
	<button
		v-if="mobileOpen"
		class="navigation-scrim"
		type="button"
		aria-label="Đóng điều hướng"
		@click="emit('close')"
	></button>

	<aside class="sidebar" :class="{ 'sidebar--open': mobileOpen }">
		<div class="brand" aria-label="MES Manufacturing System">
			<span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
			<span class="brand-copy"><strong>MES<span>/</span>OPS</strong><small>MANUFACTURING SYSTEM</small></span>
		</div>

		<label class="search-box">
			<span class="search-symbol" aria-hidden="true"></span>
			<input v-model="searchTerm" type="search" placeholder="Tìm danh mục..." aria-label="Tìm danh mục" />
			<kbd>/</kbd>
		</label>

		<div class="nav-heading"><span>KHÔNG GIAN LÀM VIỆC</span><i></i></div>

		<nav class="navigation-tree" aria-label="Điều hướng MES">
			<template v-for="section in visibleSections" :key="section.MENU_NAME">
				<!-- Cấp 1: section -->
				<div
					class="section-row"
					:class="{ 'section-row--open': isSectionOpen(section) }"
					@click="section.groups.length > 0 && toggleSection(section.MENU_NAME)"
				>
					<router-link v-if="section.LINK" :to="resolveMenuLink(section.LINK)" class="section-link">
						<component :is="resolveMenuIcon(section.ICON)" class="module-icon" />
						<span class="section-label">{{ labelOf(section) }}</span>
					</router-link>
					<span v-else class="section-link">
						<component :is="resolveMenuIcon(section.ICON)" class="module-icon" />
						<span class="section-label">{{ labelOf(section) }}</span>
					</span>

					<button
						v-if="section.groups.length > 0"
						type="button"
						class="row-toggle"
						:aria-expanded="isSectionOpen(section)"
						:aria-label="`Mở/đóng ${labelOf(section)}`"
						@click.stop="toggleSection(section.MENU_NAME)"
					>
						<span class="chevron" aria-hidden="true"></span>
					</button>
				</div>

				<div v-if="isSectionOpen(section)" class="section-children">
					<template v-for="group in section.groups" :key="groupKey(section, group)">
						<!-- Cấp 2: group -->
						<div
							class="group-row"
							:class="{ 'group-row--open': isGroupOpen(section, group) }"
							@click="group.items.length > 0 && toggleGroup(section.MENU_NAME, group.MENU_NAME)"
						>
							<router-link v-if="group.LINK" :to="resolveMenuLink(group.LINK)" class="section-link">
								<span>{{ labelOf(group) }}</span>
							</router-link>
							<span v-else class="section-label">{{ labelOf(group) }}</span>

							<button
								v-if="group.items.length > 0"
								type="button"
								class="row-toggle"
								:aria-expanded="isGroupOpen(section, group)"
								:aria-label="`Mở/đóng ${labelOf(group)}`"
								@click.stop="toggleGroup(section.MENU_NAME, group.MENU_NAME)"
							>
								<span class="group-chevron" aria-hidden="true"></span>
							</button>
						</div>

						<!-- Cấp 3: item -->
						<div v-if="isGroupOpen(section, group)" class="item-list">
							<router-link
								v-for="item in group.items"
								:key="item.MENU_NAME"
								:to="resolveMenuLink(item.LINK ?? item.MENU_NAME)"
								custom
								v-slot="{ navigate }"
							>
								<button
									type="button"
									class="item-row"
									:class="{ 'item-row--active': selectedItemId === item.MENU_NAME }"
									:aria-current="selectedItemId === item.MENU_NAME ? 'page' : undefined"
									@click="() => { selectItem(item.MENU_NAME); navigate() }"
								>
									<span class="item-marker"></span><span>{{ labelOf(item) }}</span>
								</button>
							</router-link>
						</div>
					</template>
				</div>
			</template>

			<p v-if="visibleSections.length === 0" class="empty-search">Không tìm thấy danh mục phù hợp.</p>
		</nav>

		<footer class="sidebar-footer">
			<span class="online-dot"></span><span>Hệ thống hoạt động</span><span class="version">v1.0</span>
		</footer>
	</aside>
</template>

<style scoped>
.sidebar {
	position: sticky;
	top: 0;
	z-index: 5;
	display: flex;
	width: 278px;
	height: 100vh;
	flex: 0 0 278px;
	flex-direction: column;
	padding: 24px 15px 12px;
	border-right: 1px solid #e3e8e3;
	background: #fafbf9;
	color: #25332b;
}

.brand { display: flex; align-items: center; gap: 11px; margin: 2px 5px 27px; }
.brand-mark { display: flex; width: 37px; height: 37px; align-items: flex-end; justify-content: center; gap: 3px; padding: 8px 7px; border-radius: 8px 8px 8px 3px; background: #2d7054; }
.brand-mark i { width: 4px; border-radius: 1px 1px 0 0; background: #fff; }
.brand-mark i:nth-child(1) { height: 9px; opacity: .58; }
.brand-mark i:nth-child(2) { height: 14px; opacity: .78; }
.brand-mark i:nth-child(3) { height: 19px; }
.brand-copy { display: grid; gap: 3px; }
.brand-copy strong { font-size: 16px; line-height: 1; }
.brand-copy strong span { padding: 0 3px; color: #d77952; }
.brand-copy small { color: #859188; font-size: 8px; font-weight: 700; letter-spacing: .5px; }

.search-box { display: flex; height: 38px; flex: none; align-items: center; gap: 9px; padding: 0 10px; border: 1px solid #e1e7e1; border-radius: 4px; background: #fff; }
.search-symbol { position: relative; width: 13px; height: 13px; flex: none; border: 1.5px solid #89958d; border-radius: 50%; }
.search-symbol::after { position: absolute; right: -4px; bottom: -2px; width: 6px; height: 1.5px; background: #89958d; content: ''; transform: rotate(45deg); }
.search-box input { width: 100%; min-width: 0; padding: 0; border: 0; outline: 0; background: transparent; color: #25332b; font: inherit; font-size: 11px; }
.search-box input::placeholder { color: #9aa39c; }
.search-box kbd { padding: 1px 5px; border: 1px solid #e6eae6; border-radius: 3px; background: #f7f8f6; color: #7b877f; font-size: 9px; }

.nav-heading { display: flex; align-items: center; gap: 8px; margin: 25px 6px 11px; color: #98a29b; font-size: 8px; font-weight: 750; letter-spacing: .5px; white-space: nowrap; }
.nav-heading i { height: 1px; flex: 1; background: #e7ebe7; }
.navigation-tree { display: flex; min-height: 0; flex: 1; flex-direction: column; gap: 3px; overflow: auto; padding-bottom: 12px; scrollbar-color: #d6ded7 transparent; scrollbar-width: thin; }
.section-row, .group-row, .item-row { display: flex; width: 100%; align-items: center; border: 0; background: transparent; text-align: left; cursor: pointer; }
.section-link,
.group-row,
.item-row {
	text-decoration: none;
}
.section-row { min-height: 39px; gap: 10px; padding: 0 9px; border-radius: 4px; color: #4c5a51; font-size: 11px; font-weight: 650; transition: color 140ms ease, background 140ms ease; }
.section-row:hover, .section-row--open { background: #eaf1ec; color: #28694d; }
.section-code { display: grid; width: 23px; height: 23px; flex: none; place-items: center; border: 1px solid #e2e8e2; border-radius: 4px; background: #fff; color: #77857a; font-size: 8px; font-weight: 750; }
.section-row--open .section-code { border-color: #d7e5da; background: #f6faf6; color: #327253; }
.section-link,
.section-label { display: flex; align-items: center; gap: 8px; flex: 1; }
.module-icon {
	display: inline-flex;
	width: 14px;
	height: 14px;
	flex: 0 0 14px;
	color: currentColor;
}

/* Nút mở/đóng tách riêng khỏi link (tránh lồng <a> trong <button>) */
.row-toggle { display: flex; flex: none; align-items: center; justify-content: center; padding: 6px 0 6px 6px; border: 0; background: transparent; color: inherit; cursor: pointer; }

.chevron, .group-chevron { width: 7px; height: 7px; flex: none; border-top: 1.5px solid #929e95; border-right: 1.5px solid #929e95; transform: rotate(45deg); transition: transform 140ms ease; }
.section-row .chevron { transform: rotate(135deg); }
.section-row--open .chevron { transform: rotate(135deg); }
.section-row:not(.section-row--open) .chevron { transform: rotate(45deg); }
.section-children { margin: 2px 0 8px 19px; padding-left: 9px; border-left: 1px solid #dfe6e0; }
.group-row { min-height: 30px; justify-content: space-between; gap: 7px; padding: 0 8px; color: #69766d; font-size: 10px; font-weight: 600; }
.group-row:hover { color: #28694d; }
.group-chevron { width: 6px; height: 6px; border-color: #a3ada5; transform: rotate(45deg); }
.group-row--open .group-chevron { transform: rotate(135deg); }
.item-list { display: grid; gap: 2px; padding: 2px 0 7px 7px; }
.item-row { min-height: 29px; gap: 8px; padding: 0 8px; border-radius: 3px; color: #758078; font-size: 10px; transition: color 120ms ease, background 120ms ease; }
.item-row:hover { background: #f0f4f0; color: #28694d; }
.item-row--active { background: #e5efe8; color: #246748; font-weight: 650; }
.item-marker { width: 5px; height: 5px; flex: none; border: 1px solid #aab5ac; border-radius: 50%; }
.item-row--active .item-marker { border-color: #347856; background: #347856; box-shadow: 0 0 0 3px rgb(52 120 86 / 12%); }
.empty-search { padding: 10px 7px; color: #858f88; font-size: 10px; }
.sidebar-footer { display: flex; min-height: 36px; flex: none; align-items: center; gap: 8px; padding: 0 5px; border-top: 1px solid #e8ece8; color: #77837a; font-size: 9px; }
.online-dot { width: 7px; height: 7px; flex: none; border-radius: 50%; background: #55a779; box-shadow: 0 0 0 3px rgb(85 167 121 / 12%); }
.version { margin-left: auto; color: #9ca69e; }
.navigation-scrim { display: none; }

@media (max-width: 900px) {
	.sidebar { width: 248px; flex-basis: 248px; }
}

@media (max-width: 680px) {
	.sidebar { position: fixed; top: 0; bottom: 0; left: 0; width: min(290px, calc(100vw - 48px)); height: auto; min-height: 0; transform: translateX(-102%); transition: transform 180ms ease; }
	.sidebar--open { transform: translateX(0); }
	.navigation-scrim { position: fixed; z-index: 4; inset: 0; display: block; border: 0; background: rgb(23 34 28 / 34%); }
}

@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after { transition-duration: .01ms !important; }
}
</style>