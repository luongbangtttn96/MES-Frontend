export interface BomMaterialItem {
  BOM_DTL_ID: string | number
  BOM_HDR_ID?: string | number
  PART_NUM?: string
  DESCRIPTION?: string
  QTY?: number | string
  UNIT?: string
  PART_NUM_REPLACE?: string
  NOTE?: string
  IS_SIME?: boolean
  IS_ACTIVE?: boolean
  UPDATED?: string
  CUSTOMER_PART?: string
  [key: string]: unknown
}

export interface BomHeaderItem {
  BOM_HDR_ID: string | number
  PROJ_ID?: string | number
  PROJ_NAME?: string
  BOM_CODE?: string
  BOM_NAME?: string
  PART_NUM?: string
  DESCRIPTION?: string
  QTY?: number | string
  SORT?: number | string
  COST?: number | string
  LABOR_QTY?: number | string
  PRODUC_EVERY_HOUR?: number | string
  DEPT_ID?: number | string
  DEPT_NAME?: string
  IS_ACTIVE?: boolean
  AQL?: string
  LEVEL_AQL?: string
  NOTE?: string
  UPDATED?: string
  [key: string]: unknown
}

export interface BomMaterialExcelRow {
  BOM_DTL_ID?: string | number
  PART_NUM?: string
  DESCRIPTION?: string
  QTY?: number | string
  UNIT?: string
  PART_NUM_REPLACE?: string
  NOTE?: string
  IS_SIME?: boolean
  IS_ACTIVE?: boolean
  UPDATED?: string
  CUSTOMER_PART?: string
  dataExists?: boolean
  [key: string]: unknown
}

export interface SemiProduct {
  BOM_HDR_ID: string | number
  [key: string]: unknown
}

export interface ProjectItem {
  id?: number | string
  code_project?: string
  PROJ_NAME?: string
  PART_NUM?: string
  discription?: string
  IS_ACTIVE?: string | number | boolean
  NOTE?: string
  Update?: string
  [key: string]: unknown
}

export interface ProjectDetail {
    PROJ_CODE?: string
    PROJ_NAME?: string
    PART_NUM?: string
    CODE_PREFIX?: string
    IS_ACTIVE?: boolean | number
    NOTE?: string
    [key: string]: unknown
  }