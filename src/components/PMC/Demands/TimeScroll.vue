// calender.vue

<template>
<div class="container-fluid" id="calender" ref="root">

	<div class='ds-control'>
		<table>
			<thead>			
				<tr class='ds-nav'>
					<th class='ds-nav-btn' @click='navigateToDate(cur_time[0], -7)'>&#10158;</th>
					<th class='ds-nav-info'>
						<p>{{ cur_time[0].format('L') + " - " + cur_time[cur_time.length - 1].format('L') }}</p>
						<!-- <calender-dropdown
						:today="today"
						:nav_week="cur_time[0]"
						@nav="navigateToDate">
						</calender-dropdown> -->
					</th>
					<th class='ds-nav-btn' @click='navigateToDate(cur_time[0], 7)'>>></th>
				</tr>
			</thead>
		</table>
	</div>
	<div class="ds-calender">
		<table ref='table'>
			<thead>
				<tr class='ds-row-header'>
					<th class='placeholder'></th>
					<th 
					scope='col' 
					v-for="(time, i) in cur_time" 
					:class="{ 'ds-today': today.isSame(cur_time[i], 'day') }"
					:key="i" 
					:col-index="i">
						<span>{{ time.format('DD/MM')}}</span>
					</th>
				</tr>	
			</thead>
			
			<!-- 
			<calender-overlay
			:cur_time="cur_time"
			@pull_overlay="(...args) => { $emit('pull_overlay', ...args); }"
			></calender-overlay> -->
			<tbody>
				<tr 
				v-for="(project, i) in project_lable" 
				:class="{ 'ds-minor': (project.indexOf(':') != -1) }" 
				:key="i" 
				:row-index="i">
					<td scope='row'>{{ (project.indexOf(':30')==-1 || display_half_hour_labels) ? project : "" }}</td>
					<td 
					class="ds-slot" 
					v-for="(_slot, j) in day_labels" 
					:key="j" 
					:col-index="j"
					:class="{ 'ds-avail':(mat_overlay[i][j]!=null) ? mat_overlay[i][j] : mat[i][j] }"
					
					></td>
				</tr>
			</tbody>
		</table>
	</div>
</div> <!-- calendar :title="matTitle[i][j]"-->
</template>

<style scoped>
#calender {
	margin: auto;
	width: 100%;
	height: 100%;
	min-width: 500px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

.ds-calender {
	box-sizing: border-box;
	overflow: auto;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
	width: 100%;
	border-color: #ddd;
	border-width: 1px;
	table-layout: fixed;
	box-sizing: border-box;
	height: 100%;
}

th {
	min-height: 20px;
	padding: 0;
	margin: 0;
	border: 1px solid #ddd;
	box-sizing: border-box;
	padding: 5px;
}

td {
	height: 20px;
	min-height: 20px;
	padding: 0;
	margin: 0;
	border-color: inherit;
	border-width: 1px;
	border-style: none solid;
	box-sizing: border-box;
}

tr [scope="row"], .placeholder {
	width: 50px;
	text-align: center;
	overflow: hidden;
}

tr {
	border: none;
	border-style: none solid none solid;
	border-color: inherit;
	border-width: 1px;
	box-sizing: border-box;
}

tr.ds-minor {
	border-width: 1px;
	border-style: dotted solid solid solid;
}

.ds-slot {
	user-select: none;
}

.ds-avail {
	background-color: green;
}

.ds-today {
	background-color: #cde5ff87;
}

.ds-nav {
	margin: 0;
	padding: 0;

}

.ds-nav > th {
	padding: 0;
	font-weight: normal;
}

.ds-control {
	flex: 1 0;
}

.ds-nav-btn {
	width: 10%;
	user-select: none;
	cursor: pointer;
	text-align: center
}

.ds-nav-btn:hover {
	background-color: #57a3f3;
	color: white;
}

.ds-nav-btn:active {
	background-color: #2b85e4;
	color: white;
}

.ds-nav-info {
	position: relative;
	cursor: pointer;
}

.ds-nav-info:hover {
	background-color: #f1f1f1;
}

.ds-nav-info p {
	padding: 5px 0;
}
</style>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import util_funcs from './utils.ts'
import type { Matrix, Coord, SpanMap } from './utils'
import { usePMCStore } from '@/stores/PMC.store'

const emit = defineEmits<{
	(e: 'push', spans: SpanMap | undefined): void
	(e: 'pull', from: Dayjs, to: Dayjs, resolve: (spans: SpanMap) => void, reject: (reason?: unknown) => void): void
}>()

const pmcStore = usePMCStore()
const utils = util_funcs.methods

const root = ref<HTMLElement | null>(null)
const dragging = ref(false) // is curently dragging
const set_avail = ref(false) // current selection is to set slot available or not
const from_slot = ref<HTMLTableCellElement | null>(null) // drag from slot
const to_slot = ref<HTMLTableCellElement | null>(null) // drag to slot
const day_labels = ref<string[]>(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])
const cur_time = ref<Dayjs[]>([])
const col_numb = 31

const project_lable = ref<string[]>(["12am", "1am", '2am'])
const display_half_hour_labels = ref(false) // show half-hour label name
const x_dim = ref(0) // x dimension of the grid/matrix
const y_dim = ref(0) // y dimension of the grid/matrix
const dmat = ref<Record<string, unknown> | undefined>()
const mat = ref<Matrix>([]) // actual timeslot fulfillment grid
const mat_overlay = ref<Matrix>([]) // section box over the grid
const today = dayjs()
const data: SpanMap = {} // date time spans
const DataDemandDTL_Proj = ref<any[]>([])

// Ngữ cảnh `this` cho các hàm dùng chung trong utils
const ctx = {
	get cur_time() { return cur_time.value },
	get project_lable() { return project_lable.value },
	get x_dim() { return x_dim.value },
	get y_dim() { return y_dim.value },
	create2DMatrix: utils.create2DMatrix,
	time2index: utils.time2index,
	parseSpan(span: string) { return utils.parseSpan.call(ctx, span) },
}
const matrix2span = (m: Matrix) => utils.matrix2span.call(ctx, m)
const span2matrix = (spans: SpanMap) => utils.span2matrix.call(ctx, spans)

// render current week from input date
function navigateToDate(date?: Dayjs, offest = 0) {
	const start = dayjs(date).add(offest, "day")
	const labels: string[] = []
	const lbdate: Dayjs[] = []
	for (let index = 0; index < col_numb; index++) {
		const day = start.add(index, "d")
		labels.push(day.format('DD/MM'))
		lbdate.push(day)
	}
	day_labels.value = labels
	cur_time.value = lbdate
}

// tạo bảng ô từ dữ liệu ( dữ liệu nhu cầu chi tiết)
function data2Datamatrix(list: any[]) {
	if (!cur_time.value.length) { return }
	const result: Record<string, unknown> = {}
	list.forEach((element) => {
		element.SchedurDemands.forEach((elm: any) => {
			const [from, to] = String(elm.TIME_DEMANDS).split(' - ')
			let day1 = dayjs(from)
			const duration = dayjs(to).diff(day1, 'days')
			for (let j = 0; j < duration; j++) {
				day1 = day1.add(1, 'day')
			}
		})
	})
	return result
}

// Convert current view to span data and then save it
// to caldendar's internal(cached) storage while push to remote.
function saveData() {
	const spans = matrix2span(mat.value)
	if (!spans) { return }
	Object.entries(spans).forEach(([key, val]) => {
		if (val != null) {
			data[key] = val
		} else if (key in data) {
			delete data[key] // remove on null val
		}
	})
	emit('push', spans)
}

async function ProgetDataDemandDTL_Proj(start_date: string) {
	const res: any = await pmcStore.getDataDemandDTL_Proj({ start_date })
	DataDemandDTL_Proj.value = res.DataDemandDTL_Proj
	dmat.value = data2Datamatrix(DataDemandDTL_Proj.value)
}

// Load internal(cached) span data and render view, also fetch span data
// from server to decide whether view needs to be updated.
function loadData() {
	let cached: string | null = null

	function updateView(spans: SpanMap) {
		const current = JSON.stringify(spans)
		if (cached == current) { return false }
		cached = current
		mat.value = span2matrix(spans) ?? []
		return true
	}

	// filter current week data from internal(cached) data
	const spans_local: SpanMap = {}
	project_lable.value.forEach((key) => {
		if (key in data) { spans_local[key] = data[key] }
	})
	updateView(spans_local)

	// make parent fetch current week's data
	new Promise<SpanMap>((resolve, reject) => {
		emit('pull', cur_time.value[0], cur_time.value[cur_time.value.length - 1], resolve, reject)
	}).then(
		(spans_remote) => {
			if (updateView(spans_remote)) { saveData() }
		},
		(reason) => {
			console.error(`Failed to fetch: ${reason}`)
		}
	)
}

function isLeftButton(evt: MouseEvent) {
	return !('which' in evt) || evt.which == 1
}

function slotOf(evt: Event) {
	return evt.target as HTMLTableCellElement
}

// start dragging
function dragBegin(evt: MouseEvent) {
	evt.stopPropagation()
	if (!isLeftButton(evt)) { return }
	dragging.value = true
	set_avail.value = !utils.isSlotAvailable(slotOf(evt))
	from_slot.value = slotOf(evt)
	const [x, y] = utils.getCoords(from_slot.value)
	mat.value[x][y] = set_avail.value
}

// during dragging
function dragAt(evt: MouseEvent) {
	evt.stopPropagation()
	if (dragging.value && from_slot.value) {
		to_slot.value = slotOf(evt)
		const rect: [Coord, Coord] = [
			utils.getCoords(from_slot.value),
			utils.getCoords(to_slot.value)
		]
		utils.resetMatrix(mat_overlay.value, null)
		utils.updateMatrix(mat_overlay.value, rect, set_avail.value)
	}
}

function finishDrag() {
	dragging.value = false
	utils.mergeMatrices(mat.value, mat_overlay.value)
	utils.resetMatrix(mat_overlay.value, null)
	saveData()
}

// stop dragging
function dragEnd(evt: MouseEvent) {
	evt.stopPropagation()
	if (!isLeftButton(evt)) { return }
	if (dragging.value) {
		to_slot.value = slotOf(evt)
		finishDrag()
	}
}

// mouse up outside of table
function dragOut(evt: MouseEvent) {
	if (!isLeftButton(evt)) { return }
	if (dragging.value) {
		to_slot.value = null
		finishDrag()
	}
}

navigateToDate() // today
x_dim.value = day_labels.value.length
y_dim.value = project_lable.value.length
mat.value = utils.create2DMatrix(x_dim.value, y_dim.value, false)
mat_overlay.value = utils.create2DMatrix(x_dim.value, y_dim.value, null)
// lấy số liệu demands của dự án
ProgetDataDemandDTL_Proj(cur_time.value[0].format('YYYY/MM/DD'))

onMounted(() => {
	// register drag events
	root.value?.querySelectorAll('.ds-slot').forEach((el) => {
		el.addEventListener('mousedown', dragBegin as EventListener)
		el.addEventListener('mouseup', dragEnd as EventListener)
		el.addEventListener('mouseover', dragAt as EventListener)
	})
	document.addEventListener('mouseup', dragOut)
})

onBeforeUnmount(() => {
	// un-register drag events
	root.value?.querySelectorAll('.ds-slot').forEach((el) => {
		el.removeEventListener('mousedown', dragBegin as EventListener)
		el.removeEventListener('mouseup', dragEnd as EventListener)
		el.removeEventListener('mouseover', dragAt as EventListener)
	})
	document.removeEventListener('mouseup', dragOut)
})

defineExpose({ loadData, navigateToDate, saveData })
</script>
