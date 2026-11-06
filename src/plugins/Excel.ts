import * as XLSX from 'xlsx-js-style'

// Định nghĩa Interface cho định dạng cột
export interface ColumnFormat {
  width: number
  [key: string]: any
}

/**
 * Xuất dữ liệu từ mảng Object ra file Excel / CSV (có style tùy chỉnh)
 */
const exportArrObject = (
  type: string,
  ArrObject: Record<string, any>[] = [],
  formatColumns: ColumnFormat[] = []
): void => {
  const ws = XLSX.utils.json_to_sheet(ArrObject)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  let headers: string[] = []
  if (ArrObject.length > 0) {
    const headerCells = Object.keys(ArrObject[0])
    headerCells.forEach((th) => {
      headers.push(th)
    })
  }

  XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' })

  if (formatColumns.length > 0) {
    ws['!cols'] = formatColumns.map((column) => ({ wch: column.width }))
  }

  if (ws['!ref']) {
    const range = XLSX.utils.decode_range(ws['!ref'])
    const border = {
      top: { style: 'thin', color: { rgb: 'B7C3D0' } },
      bottom: { style: 'thin', color: { rgb: 'B7C3D0' } },
      left: { style: 'thin', color: { rgb: 'B7C3D0' } },
      right: { style: 'thin', color: { rgb: 'B7C3D0' } }
    }

    for (let row = range.s.r; row <= range.e.r; row += 1) {
      for (let column = range.s.c; column <= range.e.c; column += 1) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: column })
        if (!ws[cellAddress]) {
          ws[cellAddress] = { v: '', t: 's' }
        }

        ws[cellAddress].s = {
          border,
          alignment: { vertical: 'center', wrapText: true },
          ...(row === 0
            ? {
                font: { bold: true, color: { rgb: 'FFFFFF' } },
                fill: { fgColor: { rgb: '16324F' } },
                alignment: { horizontal: 'center', vertical: 'center', wrapText: true }
              }
            : {})
        }
      }
    }
  }

  switch (type.toUpperCase()) {
    case 'XLSX':
      XLSX.writeFile(wb, 'Report.xlsx')
      break
    case 'XLS':
      XLSX.writeFile(wb, 'Report.xls')
      break
    case 'CSV':
      XLSX.utils.sheet_to_csv(ws)
      XLSX.writeFile(wb, 'Report.csv')
      break
    default:
      break
  }
}

/**
 * Xuất dữ liệu trực tiếp từ Table HTML ra file Excel / CSV
 */
const exportData = (
  type: string,
  ID_table: string,
  formatColumns: ColumnFormat[] = []
): void => {
  const elt = document.getElementById(ID_table)
  if (!elt) return

  const wb = XLSX.utils.table_to_book(elt, { raw: true })
  const ws = wb.Sheets['Sheet1']

  if (formatColumns.length > 0) {
    ws['!cols'] = formatColumns.map((column) => ({ wch: column.width }))
  }

  let headers: string[] = []
  const headerCells = elt.querySelectorAll('thead th')
  headerCells.forEach((th) => {
    headers.push((th as HTMLElement).innerText)
  })

  XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' })

  switch (type.toUpperCase()) {
    case 'XLSX':
      XLSX.writeFile(wb, 'Report.xlsx')
      break
    case 'XLS':
      XLSX.writeFile(wb, 'Report.xls')
      break
    case 'CSV':
      XLSX.utils.sheet_to_csv(ws)
      XLSX.writeFile(wb, 'Report.csv')
      break
    default:
      break
  }
}

/**
 * Đọc file Excel từ input và trả về mảng Object (hỗ trợ Promise)
 */
export interface ImportExcelOptions {
  /** Định dạng chuỗi ngày xuất ra (dayjs style: YYYY, MM, DD, HH, mm, ss). null = giữ nguyên hiển thị của Excel */
  dateFormat?: string | null
  /** Chuyển cả ô text có dạng ngày (dd/mm/yyyy, dd-mm-yyyy, yyyy-mm-dd, yyyy/mm/dd) về dateFormat */
  parseTextDates?: boolean
  /** Tên hoặc vị trí sheet (mặc định sheet đầu tiên) */
  sheet?: string | number
}

const pad = (n: number, len = 2) => String(n).padStart(len, '0')

const formatDateParts = (
  p: { y: number; m: number; d: number; H?: number; M?: number; S?: number },
  fmt: string
): string =>
  fmt
    .replace(/YYYY/g, pad(p.y, 4))
    .replace(/MM/g, pad(p.m))
    .replace(/DD/g, pad(p.d))
    .replace(/HH/g, pad(p.H ?? 0))
    .replace(/mm/g, pad(p.M ?? 0))
    .replace(/ss/g, pad(Math.floor(p.S ?? 0)))

const TEXT_DATE_PATTERNS: { re: RegExp; pick: (m: RegExpMatchArray) => [number, number, number] }[] = [
  { re: /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/, pick: (m) => [+m[1], +m[2], +m[3]] },
  { re: /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/, pick: (m) => [+m[3], +m[2], +m[1]] }
]

const parseTextDate = (text: string): { y: number; m: number; d: number } | null => {
  const s = text.trim()
  for (const { re, pick } of TEXT_DATE_PATTERNS) {
    const m = s.match(re)
    if (!m) continue
    const [y, mo, d] = pick(m)
    const dt = new Date(y, mo - 1, d)
    if (dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d) {
      return { y, m: mo, d }
    }
  }
  return null
}

/**
 * Đọc file Excel và trả về mảng Object.
 * Ô ngày (dù Excel định dạng dd/mm/yyyy, mm-dd-yy, d-mmm... ) đều được chuẩn hóa về options.dateFormat.
 */
const exportDataExcel_to_Arr = (
  xlsxfile: File,
  options: ImportExcelOptions = {}
): Promise<Record<string, any>[]> => {
  const { dateFormat = 'YYYY-MM-DD', parseTextDates = false, sheet = 0 } = options

  return new Promise((resolve, reject) => {
    if (!xlsxfile) {
      reject('No file provided')
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = e.target?.result
        if (!data) {
          reject('Không thể đọc dữ liệu file')
          return
        }
        const workbook = XLSX.read(data, { type: 'binary', cellNF: true })
        const sheetName =
          typeof sheet === 'number' ? workbook.SheetNames[sheet] : sheet
        const ws = workbook.Sheets[sheetName]
        if (!ws) {
          reject('Không tìm thấy sheet trong file')
          return
        }

        if (dateFormat && ws['!ref']) {
          const range = XLSX.utils.decode_range(ws['!ref'])
          // Bỏ qua dòng tiêu đề để không đổi tên cột
          for (let r = range.s.r + 1; r <= range.e.r; r += 1) {
            for (let c = range.s.c; c <= range.e.c; c += 1) {
              const cell = ws[XLSX.utils.encode_cell({ r, c })]
              if (!cell) continue

              let text: string | null = null
              if (cell.t === 'n' && typeof cell.z === 'string' && XLSX.SSF.is_date(cell.z)) {
                const p = XLSX.SSF.parse_date_code(cell.v as number)
                if (p) text = formatDateParts(p, dateFormat)
              } else if (parseTextDates && cell.t === 's' && typeof cell.v === 'string') {
                const p = parseTextDate(cell.v)
                if (p) text = formatDateParts(p, dateFormat)
              }

              if (text !== null) {
                cell.t = 's'
                cell.v = text
                cell.w = text
              }
            }
          }
        }

        // raw:true giữ số là number; ngày đã được đổi thành chuỗi ở trên
        resolve(XLSX.utils.sheet_to_json<Record<string, any>>(ws, { raw: dateFormat !== null }))
      } catch (error) {
        reject(error)
      }
    }
    fileReader.onerror = () => reject(fileReader.error)
    fileReader.readAsBinaryString(xlsxfile)
  })
}

export { exportData, exportDataExcel_to_Arr, exportArrObject }