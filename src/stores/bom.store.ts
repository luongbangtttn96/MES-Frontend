import {computed, ref} from 'vue'
import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'
import { useAppStore } from '@/stores/app.store'

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
  BOM_HDR_ID?: string | number
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

export const useBomStore  = defineStore('bom',()=>{
    const appStore = useAppStore()
    
    const listProject= ref([])
    const ProjectDetail = ref(null)

    const getBomList = computed(()=> listProject.value)
    const getProjectDetail= computed(()=> ProjectDetail.value)

     // Part Num Không thuộc Bom
    // 29/06/2025
    async function getPart_num_not_PROJECT(data = null) {

        appStore.isLoading = true

        try {

            const config = {
            params: data,
            }

            const result = await axiosInstance.get(
            'bom/getPart_num_not_PROJECT',
            config
            )

            if (result.data.status === 200) {

            return {
                ok: true,
                error: null,
                dataPart_num_not_PROJECT:
                result.data.dataPart_num_not_PROJECT
            }

            } else {

            return {
                ok: false,
                error: result.data.error
            }

            }

        } catch (error: any) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    
     // Thêm bán thành phẩn cho sản phẩm
    // 02/02/2025
    async function Add_BOMsemi( data=null ) {
        try {
            appStore.isLoading = true
            //console.log(data)
            var result = await axiosInstance.post('bom/Add_BOMsemi', data);         
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {  
                if (result.data.ok){
                  return {
                    ok: true,
                    dataBOM_HDR:{}
                }  
                }else {
                   return {
                        ok: false,
                        dataBOM_HDR:null
                    }  
                }
                
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error: any) {

            console.log(error);
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }
    // Loại Bán thành phẩm khải sản phẩm
    // 02/02/2025
    async function RemoveBOMSemi( data=null ) {
        try {
            appStore.isLoading = true
            //console.log(data)
            var result = await axiosInstance.post('bom/RemoveBOMSemi', data);
            appStore.setMsgErro(result.data.message)          
            if(result.data.status === 200) {  
                if (result.data.ok){
                  return {
                    ok: true,
                }  
                }else {
                   return {
                        ok: false,
                        dataBOM_HDR:{}
                    }  
                }
                
            } else {
                return {
                    ok: false,
                    error: result.data.error,
                    dataBOM_HDR:null
                }
            }
        } catch(error:any) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // lấy danh sách tất cả các Bán thành phẩm/thành phẩm
    //code 01/02/2025
    async function getAllSemiProduc( data= null) {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('bom/getAllSemiProduc', config);
            //console.log(result)
            if(result.data.status === 200) {
                //console.log(result.data)
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    All_BOMSemi: result.data.All_BOMSemi
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error:any) {
            console.log("error: ", error);
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }

    // Lưu nạp BOM Schumacher từ file excel
    // 19/10/2024
    async function saveAllBom_Schumacher(data: { Project: object; Semis: object[] } | null = null) {
        try {
            appStore.isLoading = true
            //console.log(data)
            var result = await axiosInstance.post('bom/saveAllBom_Schumacher', data);
            appStore.setMessager(result.data.message)       
            if(result.data.status === 200) {  
                if (result.data.ok){
                  return {
                    ok: true,
                }  
                }else {
                   return {
                        ok: false,
                    }  
                }
                
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error:any) {
            console.log(error);
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }

    // lấy thông tin Bom nguyên liệu project 
    //code 27/04/2024
    async function getBomHDRDTL_Project(data: { PROJ_ID?: string | null } | null = null) {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('bom/getBomHDRDTL_Project', config);
            //console.log(result)
            if(result.data.status === 200) {
                console.log(result.data)
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    dataBomHDRDTL: result.data.dataBomHDRDTL
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error: any) {
            console.log("error: ", error);
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }

     // Cập nhật Mã Nguyên liệu KH từ file excel
    // 29/03/2024
    async function saveListCustomer_PARExcel( data=null ) {
        try {
            appStore.isLoading = true
            //console.log(data)
            var result = await axiosInstance.post('bom/saveListCustomer_PARExcel', data);
            if(result.data.status === 200) {   
                appStore.setMessager(result.data.message)             
                if (result.data.ok){
                  return {
                    ok: true,
                }  
                }else {
                   return {
                        ok: false,
                    }  
                }
                
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error:any) {
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }

    // lấy thông tin Project inActive
    //code 07/01/2024
    async function getListProjectHasPagingInActive() {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('project/getListProjectHasPagingInActive');
            //console.log(result)
            if(result.data.status === 200) {
                //console.log(result.data)
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    dataprojectsInActive: result.data.dataprojectsInActive
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error:any) {
            console.log("error: ", error);
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }

    // lấy thông tin Project
    //code 06/08/2023
    async function getProject(data: { PROJ_ID?: string | number | null } | null = null) {
        appStore.isLoading = true
        try {
            //console.log(data);
            let config = {
                params:data,        
            }
            var result = await axiosInstance.get('bom/getProject',config);
            //console.log(result)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataProject: result.data.dataProject
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error:any) {
            appStore.setMsgErro(error.Error) 
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }

    // lấy danh sách nguyên liệu của Project
    //code 23/07/2023
    async function getListMaterialProject( data= null ) {
        appStore.isLoading = true
        try {
            console.log(data);
            let config = {
                params:data,              
            }
            var result = await axiosInstance.get('bom/getListMaterialProject',config);
            //console.log(result)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataMaterialProject: result.data.dataMaterialProject
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
             throw error;
            // appStore.setMsgErro(result.data.message) 
            // dispatch('httplogin',error.Error) 
            // console.log("error: ", error);
            // return {
            //     ok: false,
            //     error: error.message
            // }
        }finally {

            appStore.isLoading = false

        }
    }

       // lấy danh sách đối tượng BOM của Project
    //code 09/05/2023
    async function getdataBomObjectProject( data=null ) {
        appStore.isLoading = true
        try {
            console.log(data);
            let config = {
                params:data,               
            }
            var result = await axiosInstance.get('bom/getdataBomObjectProject',config);
            //console.log(result)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataBomObjectProject: result.data.dataBomObjectProject
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error:any) {
            console.error("error",error.message);
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }

    // Cập nhật thông tin Item Bom_HDR 
    // 30/04/2023
    async function UpdateItemBOMHDR( data: BomHeaderItem | null = null ) {
        try {
            appStore.isLoading = true
            //console.log(data)
            var result = await axiosInstance.post('bom/UpdateItemBOMHDR', data);
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {     
                if (result.data.ok){
                  return {
                    ok: true,
                }  
                }else {
                   return {
                        ok: false,
                    }  
                }
                
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error: any) {
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }
    // lấy Item bom HDR (dòng bán thành phẩm) 
   //Code 27/04/2023
    async function getItem_BOMHDR(data: { id: string | number; PROJ_ID: string | number } | null)  {
        // console.log(dataProductRepair);
        appStore.isLoading = true
        let config = {
            params:data
        }
        try {
            var result = await axiosInstance.get('bom/getItem_BOMHDR', config);
            if(result.data.status === 200) {
                //console.log('getItem_BOMDTL',result.data);
                return {
                    ok: true,
                    error: null,
                    dataBOMHDR: result.data.dataBOMHDR
                }
            } else
            {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error,
                    message:result.data.error
                }
            }
        } catch(error:any) {

            console.log("error ", error.mesage);
            return {
                ok: false,
                error: error.message,
                message:''
            }
        }finally {

                appStore.isLoading = false

            }
    }
     // Xóa nguyên liệu không sử dụng trên BOM
    // 07/11/2022
    async function deleteMaterialOfBom(data: { BOM_DTL_ID: string | number } | null = null) {
        try {
            appStore.isLoading = true
            //console.log(data)
            var result = await axiosInstance.post('bom/deleteMaterialOfBom', data);
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {  
                if (result.data.ok){
                  return {
                    ok: true,
                }  
                }else {
                   return {
                        ok: false,
                    }  
                }                
            } else if(result.data.status === 401) {   
                appStore.setMsgErro(result.data.message)  
                if (result.data.ok){
                  return {
                    ok: true,
                }  
                }else {
                   return {
                        ok: false,
                    }  
                }
                
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error: any) {
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }

    // Cập nhật thông tin Item Bom_DTL 
    // 30/06/2022
    async function UpdateItemBOMDTL( data=null ) {
        try {
            appStore.isLoading = true
            //console.log(data)
            var result = await axiosInstance.post('bom/UpdateItemBOMDTL', data);
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {                
                
                if (result.data.ok){
                  return {
                    ok: true,
                }  
                }else {
                   return {
                        ok: false,
                    }  
                }
                
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error:any) {

            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }
    // lấy Item bom DTL (dòng nguyên liệu) 
   //Code 29/06/2022
   async function getItem_BOMDTL( data: null)  {
    // console.log(dataProductRepair);
    appStore.isLoading = true
    let config = {
        params:data
    }
    try {
        var result = await axiosInstance.get('bom/getItem_BOMDTL', config);
        if(result.data.status === 200) {
            //console.log('getItem_BOMDTL',result.data.dataMaterial);
            return {
                ok: true,
                error: null,
                dataMaterial: result.data.dataMaterial
            }
        } else
        {
            appStore.setMsgErro(result.data.error) 
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error: any) {

        console.log("error ", error);
        return {
            ok: false,
            error: error.message,
            message:''
        }
    }finally {

            appStore.isLoading = false

        }
}
    // thay đổi trạng thái active nguyên liệu của bom
    // 18/06/2022
    async function SetActiveMaterialOfBom(data: { BOM_DTL_ID: string | number } | null = null) {
        try {
            appStore.isLoading = true
            //console.log(data)
            var result = await axiosInstance.post('bom/SetActiveMaterialOfBom', data);
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {                
                
                if (result.data.ok){
                  return {
                    ok: true,
                }  
                }else {
                   return {
                        ok: false,
                    }  
                }
                
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error: any) {

            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }
   //====================================
   
   // lấy danh sác Bom của thuộc phòng ban và dự án
   //Code 27/10/2021
   async function getBomHDRListOfDepPro(data:{
        departMenID: number,
        PlanID: number,
        PROJ_CODE: String
    })  {
    // console.log(dataProductRepair);
    appStore.isLoading = true
    let config = {
        params:{
            departMenID: data.departMenID,
            PlanID: data.PlanID,
            CodeProj: data.PROJ_CODE
        },
    }
    try {
        var result = await axiosInstance.get('bom/getBomHDRListOfDepPro', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                BOMList: result.data.BOMList
            }
        } else
        {
            appStore.setMsgErro(result.data.error) 
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error:any) {
        console.log("error: ", error);
        return {
            ok: false,
            error: error.message,
            message:error.message
        }
    }finally {

            appStore.isLoading = false

        }
    }

    async function getListProjectHasPaging() {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('project/lists');
            //console.log(result)
            if(result.data.status === 200) {
                //console.log(result.data)
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    Projects: result.data.Projects
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error:any) {
            console.log("error: ", error);
            return {
                ok: false,
                error: error.message
            }
        }finally {

                appStore.isLoading = false

            }
    }

    async function getListBomHDR(Codeproject: string | null = null) {
        appStore.isLoading = true
        let config = {
            params:{
                codeproject: Codeproject,
            },
        }
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('bom/ListCompone', config);
            //console.log(result)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    BomHDR: result.data.componens
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error:any) {
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }
    async function saveListBomHDR( dataBomHDR:{}|null =null ) {
        try {
            // let data={
            //     PROJ_ID: 1,
            //     BomHDR: this.BomExcel,
            // }
            //console.log('sv project:',dataBomHDR)
            appStore.isLoading = true
            let config = {
                
            }
            //console.log(dataBomHDR)
            var result = await axiosInstance.post('bom/saveBomHDR', dataBomHDR, config);
            
            if(result.data.status === 200) {                
                console.log("result comment = ", result.data.ok);
                return {
                    ok: true,
                    BomHDR: result.data.BomHDR ?? [],
                    comment: result.data
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error: any) {
            return {
                ok: false,
                error: error.message
            }
        }finally {

            appStore.isLoading = false

        }
    }

    async function getSemiPro_ListMateral( semiProductID:string | number | null = null) {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('bom/semiPro/listMtaterial?semiProductID=' + semiProductID);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    listMaterialSemi: result.data.listMaterialSemi
                }
            }
        } catch(error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

     //=============================================================


    return {
        listProject,
        ProjectDetail,

        getBomList,
        getProjectDetail,
        
        getPart_num_not_PROJECT,
        Add_BOMsemi,

        RemoveBOMSemi,
        getAllSemiProduc,
        saveAllBom_Schumacher,
        getBomHDRDTL_Project,
        saveListCustomer_PARExcel,
        getListProjectHasPagingInActive,
        getProject,
        getListMaterialProject,
        getdataBomObjectProject,
        UpdateItemBOMHDR,
        getItem_BOMHDR,
        deleteMaterialOfBom,
        UpdateItemBOMDTL,
        getItem_BOMDTL,
        SetActiveMaterialOfBom,
        getBomHDRListOfDepPro,
        getListProjectHasPaging,
        getListBomHDR,
        saveListBomHDR,
        getSemiPro_ListMateral

    }
})

