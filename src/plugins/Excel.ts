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
const exportDataExcel_to_Arr = (xlsxfile: File): Promise<Record<string, any>[]> => {
  return new Promise((resolve, reject) => {
    if (xlsxfile) {
      const fileReader = new FileReader()
      fileReader.readAsBinaryString(xlsxfile)
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result
        if (!data) {
          reject('Không thể đọc dữ liệu file')
          return
        }
        const workbook = XLSX.read(data, {
          type: 'binary',
          cellDates: true
        })
        const wb = workbook.SheetNames[0]
        const rowObject = XLSX.utils.sheet_to_json<Record<string, any>>(workbook.Sheets[wb], {
          raw: false,
          dateNF: 'YYYY-MM-DD'
        })
        resolve(rowObject)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    } else {
      reject('No file provided')
    }
  })
}

export { exportData, exportDataExcel_to_Arr, exportArrObject }