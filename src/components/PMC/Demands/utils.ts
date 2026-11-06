// utils.ts
import type { Dayjs } from 'dayjs';

export type MatrixValue = boolean | null | undefined | string | number;
export type Matrix<T = MatrixValue> = T[][];
export type Coord = [number, number];
export type SpanMap = Record<string, string[] | null>;

interface DemandItem {
	SchedurDemands: unknown[];
}

// Các thành phần của component dùng mixin này
interface TimeContext {
	cur_time?: Dayjs[];
	project_lable: string[];
	x_dim: number;
	y_dim: number;
	create2DMatrix: (x_dim: number, y_dim: number, val?: MatrixValue) => Matrix;
	parseSpan: (span: string) => [number, number] | undefined;
	time2index: (time: string) => number | undefined;
}

var util_funcs = {
	methods: {
		// chuyển dữ liệu vào mạng thời gian.
		data2matrix(data: DemandItem[]): void {
			data.forEach(item=>{
				item.SchedurDemands.forEach(()=>{

				})
			})
		},
		isSlotAvailable: function(dom: HTMLElement): boolean {
			return dom.classList.contains('ds-avail');
		},

		// counting from top-left corner
		getCoords: function(slot_dom: HTMLTableCellElement): Coord {
			let x = (slot_dom.parentElement as HTMLTableRowElement).rowIndex - 1;
			let y = slot_dom.cellIndex - 1;
			return [x, y];
		},

		// generate time slot matrix (column major)
		create2DMatrix(x_dim: number, y_dim: number, val: MatrixValue = false): Matrix {
			var mat: Matrix = new Array(y_dim);
			for (var i=0; i<y_dim; i++) {
				mat[i] = new Array(x_dim).fill(val);
			}
			return mat;
		},
		
		// fill a rectangular area with the 2d @matrix with @val.
		updateMatrix(mat: Matrix, rect: [Coord, Coord], val: MatrixValue): boolean {
			var [[x0, y0], [x1, y1]] = rect;
			if (x1<x0) { x0 = [x1, x1=x0][0]; } // swap
			if (y1<y0) { y0 = [y1, y1=y0][0]; } // swap
			if (x0<0 || y0<0 || 
				x1>mat.length-1 || y1>mat[0].length-1) {
				return false; // out of bound coordinates
			}

			for (var i=x0; i<=x1; i++) {
				mat[i].fill(val, y0, y1+1);
			}
			return true;
		},

		// set all values in a matrix
		resetMatrix(mat: Matrix, val: MatrixValue): void {
			mat.forEach((col) => col.fill(val));
		},

		// merge mat2 to mat1
		mergeMatrices(mat1: Matrix, mat2: Matrix): void {
			mat1.forEach(function(row1, rowi) {
				let row2 = mat2[rowi];
				for (let coli=0; coli<row1.length; coli++) {
					if (row2[coli] != null) {
						row1[coli] = row2[coli];
					}
				}
			});
		},

		// generate span data from matrix of current week
		matrix2span(this: TimeContext, mat: Matrix, drop_null: boolean = false): SpanMap | undefined {
			if (!this.cur_time) { return; } // exit if not initialized
			var self = this as TimeContext & { cur_time: Dayjs[] };
			var data: SpanMap = {}; // key is day, value is array of time spans
			mat.forEach(function(row, rowi) {
				let spans: string[] = [];
				let span: string | null = null;
				for (var coli=0; coli<row.length; coli++) {
					if (row[coli]) {// cell
						if (!span) {
							// span starts at green
							span = self.cur_time[coli].format('YYYY-MM-DD')
						}
					} else {
						if (span) {
							// span ends at white
							span += " - "+self.cur_time[coli].format('YYYY-MM-DD');
							spans.push(span);
							span = null;
						}
					}
				} 
				// if (span) {
				// 	// span to very last row
				// 	spans.push(span+" - 12am");
				// }
				let date = self.project_lable[rowi] //.format('YYYY-MM-DD');
				if (spans.length > 0) {
					// day has time spans
					data[date] = spans;
				} else if (!drop_null) {
					data[date] = null;
				}
			});
			return data;
		},

		
		// generate matrix from span data (for current week)
		span2matrix(this: TimeContext, data: SpanMap): Matrix | undefined {
			if (!this.cur_time) { return; } // exit if not initialized
			var self = this as TimeContext & { cur_time: Dayjs[] };
			var mat = self.create2DMatrix(self.x_dim, self.y_dim, false);
			
			self.cur_time.forEach(function(m, mi) {
				let key = m.format('YYYY-MM-DD');
				let list = data[key];
				if (list) {
					list.forEach(function(span) {
						let idx_pair = self.parseSpan(span); // [starti, stopi]
						if (idx_pair) {
							mat[mi].fill(true, idx_pair[0], idx_pair[1]);
						}
					});
				}
			});

			return mat;
		},

		// generate matrix coordinates[start(x,y), end(x,y)] 
		// from span data (for current week)
		span2coords(this: TimeContext, spans: SpanMap): { start: Coord; end: Coord }[] | undefined {
			if (!this.cur_time) { return; } // exit if not initialized
			var self = this as TimeContext & { cur_time: Dayjs[] };
			var coords: { start: Coord; end: Coord }[] = [];

			self.cur_time.forEach(function(m, x) {
				let key = m.format('YYYY-MM-DD');
				let list = spans[key];
				if (list) {
					list.forEach(function(span) {
						let ys = self.parseSpan(span); // [starti, stopi]
						if (!ys) { return; }
						coords.push({
							start: [x, ys[0]],
							end: [x, ys[1]-1],
						});
					}); // end of spans[key].forEach()
				}
			}); // end of cur_time.forEach()

			return coords;
		},

		// text of time span to matrix index
		parseSpan(this: TimeContext, span: string): [number, number] | undefined {
			var time_pair = span.split(' - ');
			var idx_pair = time_pair.map((t) => this.time2index(t));
			if (idx_pair[1] == 0) {
				idx_pair[1] = 48;
			}
			const [start, stop] = idx_pair;
			if ((typeof start != 'number') ||
				(typeof stop != 'number') ||
				(start > stop) || 
				(start < 0) ||
				(stop > 48)) {
				return;
			}
			return [start, stop];
		},

		// time text to matrix index
		time2index(time: string): number | undefined {
			var match = time.match(/(\d+)(?::(\d+))?(am|pm)/i);
			if (match) {
				let hr = parseInt(match[1])
				let min = parseInt((match[2] == undefined) ? '0' : match[2]);
				let ampm = match[3];
				if (hr == 12 && ampm == "am") { hr = 0; }
				let idx = (hr * 2)
						+ (min / 30 >> 0)
						+ ((ampm == "am") ? 0 : 24);
				console.log(idx);
				return idx;
			}
			return;
		},

	}
}

export default util_funcs;
