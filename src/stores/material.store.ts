//// Material =========///////
import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'
import { useAppStore } from '@/stores/app.store'
import { CONFIG_ACCESS_TOKEN } from '@/constants'

export interface Material {
  PART_NUM: string
  PART_NAME?: string
  DESCRIPTION?: string
  DEFINE_BY?: string
  TYPE?: string
  LEADTIME?: number
  MOQ?: number
  POQ?: number
  measure?: string
  IS_SIME?: number
  isSEC_MATERIAL?: number
  UNIT?: string
  IMAGE?: string
  VALUE_MIN?: number
  VALUE_MAX?: number
  WASTAGE_100?: number
  WASTAGE_1000?: number
  WASTAGE_10000?: number
  WASTAGE_RATE?: number | null
  VAL_INT?: boolean
  Sync_ERP?: any
}

export const useMaterialStore = defineStore('material',() => {

    const appStore = useAppStore()

    // Search description of material 
    //code 27/08/2026
const getDescription_Material = async (ArrDescription: any) => {
        appStore.isLoading = true;
        try {
            var result = await axiosInstance.post('material/getDescription_Material', ArrDescription);
            //console.log(result)
            if (result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    Materials: result.data.Materials
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
             throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Search nguyên liệu theo mô tả
    // 28/08/2026
    async function Search_material( data: { DESCRIPTION: string }) {
        //console.log('Search_material');s
        try {
            appStore.isLoading = true
            let config = {
                params:data
            }
            var result = await axiosInstance.get('typeMaterial/Search_material', config);
           
            if(result.data.status === 200) {
                //console.log(PART_NUM,result.data.dataMaterals);                
                return {
                    ok: true,
                    dataMaterals: result.data.dataMaterals,
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Danh sách mã nguyên liệu
    // 29/09/2025
    async function getMaterials( data:{Search_PART_NUM: string,
        page: number,
        size: number}) {
        //console.log('getMaterials');s
        try {
            appStore.isLoading = true
            let config = {
                params:data
            }
            var result = await axiosInstance.get('typeMaterial/getMaterials', config);         
            if(result.data.status === 200) {
                //console.log(PART_NUM,result.data.dataMaterals);                
                return {
                    ok: true,
                    dataMaterals: result.data.dataMaterals,
                    Tota_PN:result.data.Tota_PN
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Cập nhật tính chất nguyên liệu/bán thành phẩm (F/T)
    // code 23/10/2024
    async function CheckPartNum_Semi( data=null ) {
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('typeMaterial/CheckPartNum_Semi', data, config);
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {   
                return {
                    ok: true,
                    IS_SIME: result.data.IS_SIME
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Lấy loại nguyên liệu chưa đồng bộ với ERP
    //22/10/2024
    async function getMaterials_Can_U_ERP( PART_NUM: string) {
        //console.log('getMaterials_Can_U_ERP');
        try {
            appStore.isLoading = true
            let config = {
                params:{
                    partNum:PART_NUM,
                }
            }
            var result = await axiosInstance.get('typeMaterial/getMaterials_Can_U_ERP', config);          
            if(result.data.status === 200) {
                //console.log(PART_NUM,result.data.dataTypeMaterial);                
                return {
                    ok: true,
                    dataMaterials_Can_U_ERP: result.data.dataMaterials_Can_U_ERP
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }


    // Cập nhật MOQ và SPQ
    // code 12/07/2024
    async function UpdateMOQ_SPQ( data: { data: Record<string, any>[] } ) {
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('typeMaterial/UpdateMOQ_SPQ', data, config);
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {   
                return {
                    ok: true,
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
        throw error
        }finally {

            appStore.isLoading = false

        }
    }


     // Cập nhật thông tin file ảnh nguyên liệu
    //17/03/2022
    async function UpdataTypeMaterialImage( data_typeMaterialImage=null ) {
        try {
            appStore.isLoading = true
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            var result = await axiosInstance.post('typeMaterial/UpdataTypeMaterialImage', data_typeMaterialImage, config);           
            if(result.data.status === 200) { 
                if(result.data.message) {
                    
                }       
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                    error: null
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
           throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Lấy loại nguyên liệu theo mã trên ERP
    //29/11/2021
    async function ERPgetTypeBaseMaterial( PART_NUM: string) {
        try {
            appStore.isLoading = true
            let config = {
                params:{
                    partNum:PART_NUM,
                }
            }
            //console.log("ERPgetTypeBaseMaterial");
            var result = await axiosInstance.get('typeMaterial/ERPgetTypeBaseMaterial', config);   
            console.log(result.data);
                   
            if(result.data.status === 200) {
                return {
                    ok: true,
                    dataTypeMaterial: result.data.dataTypeMaterial
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Lấy loại nguyên liệu theo mã
    //29/11/2021
    async function getTypeBaseMaterial( PART_NUM: string) {
        //console.log('getTypeBaseMaterial');
        try {
            appStore.isLoading = true
            let config = {
                params:{
                    partNum:PART_NUM,
                }
            }
            var result = await axiosInstance.get('typeMaterial/getTypeBaseMaterial', config);          
            if(result.data.status === 200) {
                //console.log(PART_NUM,result.data.dataTypeMaterial);                
                return {
                    ok: true,
                    dataTypeMaterial: result.data.dataTypeMaterial
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }


    // thêm Nguyên liệu vào danh mục nguyên liệu
    //29/11/2021
    async function addTypeMaterial( data_typeMaterial: Material ) {
        try {
//console.log('data_typeMaterial',data_typeMaterial);
            appStore.isLoading = true
            let config = {
            }
            var result = await axiosInstance.post('typeMaterial/addTypeMaterial', data_typeMaterial, config);

            if(result.data.status === 200) {    
                appStore.setMessager(result.data.message)            
                return {
                    ok: true,
                    error: null
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
           throw error
        }finally {

            appStore.isLoading = false

        }
    }


    // Đồng bộ thông tin property từ cho Part_num nguyên liệu 
    //code 01/04/2026
    async function UpdatePropertyMateria( data = null) {
        appStore.isLoading = true
        try {
            let config = {

             }
            var result = await axiosInstance.post('material/UpdatePropertyMateria', data, config);
            if (result.data.status === 200) {
                //console.log(result.data)
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                    error: null,
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error,
                    message: result.data.error
                }
            }
        } catch (error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    //code 09/12/2025
    //lấy danh sách nhà Sản xuất có tâp mã SUPPLIERS_CODE
    async function getManufacturers_FroManufacturers_code(data = null) {
        appStore.isLoading = true
        let config = {
            params: data,
        }
        try {
            var result = await axiosInstance.get('material/getManufacturers_FroManufacturers_code', config);
            if (result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    DataManufacturers: result.data.DataManufacturers
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                }
            }
        } catch (error) {
             throw error
        }finally {

            appStore.isLoading = false

        }
    }
    //code 10/10/2025
    //lấy danh sách mã Marking code theo PartNum
    async function getMarkingCode_Part(data = null) {
        appStore.isLoading = true
        let config = {
            params: data,
        }
        try {
            var result = await axiosInstance.get('material/getMarkingCode_Part', config);
            if (result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMarkingCode_Part: result.data.dataMarkingCode_Part
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                }
            }
        } catch (error) {
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
            throw error
        }finally {

            appStore.isLoading = false

        }
    }
    // Đồng bộ mã liệu với mã ERP
    // code 24/10/2024
    async function SyncMaterialERP( data = null) {
        try {
            let config = {
               
            }
            appStore.isLoading = true
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('material/SyncMaterialERP', data, config);
            appStore.setMessager(result.data.message)
            if (result.data.status === 200) {
                return {
                    ok: true,
                    Sync_ERP: result.data.Sync_ERP
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Lưu nhà sản xuất nguyên liệu
    // 17/04/24
    async function saveManufacturer(data = null) {
        try {

            appStore.isLoading = true
            let config = {
              
            }
            //console.log(dataBomHDR)
            var result = await axiosInstance.post('material/saveManufacturer', data, config);


            if (result.data.status === 200) {
                //console.log("result comment = ", result.data.ok);
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                }
            } else {
                appStore.setMsgErro(result.data.message)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
             throw error
        }finally {

            appStore.isLoading = false

        }
    }

    //code 12/04/2024
    //lấy Mã nguyên liệu dự án
    async function getMateria_PROJ(data=null) {
        appStore.isLoading = true
        let config = {
            params: data,
        }
        try {
            var result = await axiosInstance.get('material/getMateria_PROJ', config);
            if (result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMateria_PROJ: result.data.dataMateria_PROJ
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                }
            }
        } catch (error) {
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
            throw error
        }finally {

            appStore.isLoading = false

        }
    }
    //code 31/03/2024
    //lấy thông tin mã nhà Sx cho mà nguyên liệu PART
    async function getManufacturerMaterialOfPART(data=null) {
        appStore.isLoading = true
        let config = {
            params: data,
        }
        try {
            var result = await axiosInstance.get('material/getManufacturerMaterialOfPART', config);
            if (result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataManufacturerMaterialOfPART: result.data.dataManufacturerMaterialOfPART
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                }
            }
        } catch (error) {
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
            throw error
        }finally {

            appStore.isLoading = false

        }
    }
 
    //code 21/01/2024
    //lấy thông tin mã linh kiện của nhà SX
    async function getManufacturerMaterial(data = null) {
        appStore.isLoading = true
        let config = {
            params: data,
    
        }
        try {
            var result = await axiosInstance.get('material/GetManufacturerMaterial', config);

            if (result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataManufacturerMaterial: result.data.dataManufacturerMaterial
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                }
            }
        } catch (error) {
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
             throw error
        }finally {

            appStore.isLoading = false

        }
    }
    //code 21/01/2024
    //lấy kiểm tra mã nhà SX 
    async function check_MfrPart( data=null) {
        appStore.isLoading = true
        let config = {
            params: data,
        }
        try {
            var result = await axiosInstance.get('material/check_MfrPart', config);

            appStore.setMessager(result.data.message)
            if (result.data.status === 200) {
                return {
                    ok: result.data.ok
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                }
            }
        } catch (error) {
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
             throw error
        }finally {

            appStore.isLoading = false

        }
    }

    //code 20/01/2024
    //lấy Mã danh sách nhà sản xuất nguyên liệu
    async function getDataMamufaturer({  data=null }) {
        appStore.isLoading = true
        let config = {
            params: data,
        }
        try {
            var result = await axiosInstance.get('material/getDataMamufaturer', config);
            if (result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataManufacturer: result.data.dataManufacturer
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                }
            }
        } catch (error) {
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
            throw error
        }finally {

            appStore.isLoading = false

        }
    }
    // thiết lập thất thoát cho nguyên liệu
    // 23/07/23
    async function updateWastage(data = null) {
        try {

            appStore.isLoading = true
            let config = {
            
            }
            //console.log(dataBomHDR)
            var result = await axiosInstance.post('material/updateWastage', data, config);

            if (result.data.status === 200) {
                //console.log("result comment = ", result.data.ok);
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    //code 22/06/2023
    //lấy danh sách nhà sản xuất có mã PartNum
    async function getMfr_Part({  data=null }) {
        appStore.isLoading = true
        let config = {
            params: data,
        }
        try {
            var result = await axiosInstance.get('material/getMfr_Part', config);
 
            if (result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMfr_Part: result.data.dataMfr_Part
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                }
            }
        } catch (error) {
            
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
             throw error
        }finally {

            appStore.isLoading = false

        }
    }
    //code 20/06/2023
    //lấy Mã nguyên liệu của nhà sản xuất
    async function getMaterialCodeManufactory(data=null) {
        appStore.isLoading = true
        let config = {
            params: data,
        }
        try {
            var result = await axiosInstance.get('material/getMaterialCodeManufactory', config);
            if (result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    MATERIAL_CODE: result.data.MATERIAL_CODE
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                }
            }
        } catch (error) {
            
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
            throw error
        }finally {

            appStore.isLoading = false

        }
    }
    /* Lưu mã nguyên liệu nhà sản xuất */
    //code 20/06/2026
    async function SaveMaterialManufactoryItem( data=null) {
        //console.log(data);
        appStore.isLoading = true

        try {
            var result = await axiosInstance.post('material/SaveMaterialManufactoryItem', data);
            if (result.data.status === 200) {
                //console.log(result.data)
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                    message: result.data.message,
                    error: null,
                }
            } else {
                appStore.setMsgErro(result.data.message)
                return {
                    ok: false,
                    error: result.data.error,
                    message: result.data.error
                }
            }
        } catch (error) {
            
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
             throw error
        }finally {

            appStore.isLoading = false

        }
    }
    // Lưu thông số nguyên lệu của nhà SX
    //code 24/01/2023

    async function SaveMaterialManufactory( data = null) {
        try {
            appStore.isLoading = true

            //console.log(dataBomHDR)
            var result = await axiosInstance.post('material/SaveMaterialManufactory', data);

            if (result.data.status === 200) {
                //console.log("result comment = ", result.data.ok);
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                    message: result.data.message
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Lấy danh sách material của nhà sản xuất
    // Code 21/01/2023
    async function getMaterialOfManufactorer( data=null) {
        appStore.isLoading = true
        let config = {
            params: data
        }
        try {
            var result = await axiosInstance.get('material/getMaterialOfManufactorer', config);

            if (result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMaterialOfManufactorer: result.data.dataMaterialOfManufactorer
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
             throw error
        }finally {

            appStore.isLoading = false

        }
    }


    // Lưu nguyên lệu cho phiếu Nhận Nguyên liệu SX
    //code 15/12/2021

    async function saveMaterialRecipt( ObDeliveryNoteCurren = null) {
        try {
            appStore.isLoading = true
            let config = {
    
            }
            //console.log(dataBomHDR)
            var result = await axiosInstance.post('material/saveMaterialRecipt', ObDeliveryNoteCurren, config);

            if (result.data.status === 200) {
                //console.log("result comment = ", result.data.ok);
                appStore.setMessager(result.data.message)

                return {
                    ok: true,
                    message: result.data.message
                }
            } else {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Lấy danh sách material nhận nguyên liệu Dispatch 
    // Code 14/12/2021
    async function getMaterialDispatch(dispatchCode=null) {
        appStore.isLoading = true
        let config = {
            params: {
                dispatchCode: dispatchCode,
            },
        }
        try {
            var result = await axiosInstance.get('material/getMaterialDispatch', config);

            if (result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    ObDeliveryNote: result.data.ObDeliveryNote
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
             throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Lấy danh sách material đã đưa vào sử dụng SX BTP theo lệnh 
    // Code 9/12/2021
    async function getMaterialCloseSemi(PlaDTLId=null) {
        appStore.isLoading = true
        let config = {
            params: {
                PLA_DTL_ID: PlaDTLId,
            }
        }
        try {
            var result = await axiosInstance.get('material/getMaterialCloseSemi', config);

            if (result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    ObjectSemiProject: result.data.ObjectSemiProject
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
             throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Lấy danh sách material đã nạp cho các Máy Device của line SX
    // Code 22/09/2021
    async function getMaterialDeviceOfLine(infoLine?:{ LineId: string, BomId: string }|null) {
        appStore.isLoading = true
        let config = {
            params: {
                lineId: infoLine?.LineId,
                BOMId: infoLine?.BomId
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
            }
        }
        try {
            var result = await axiosInstance.get('material/getMaterialDeviceOfLine', config);
   
            if (result.data.status === 200) {
                // console.log('mateDv:',result.data.dataMaterialDevice)
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    materialDeviceOfLine: result.data.dataMaterialDevice
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }
    // Lấy danh sác material nạp cho Máy Device SX
    // Code 20/09/2021
    async function getMaterialDevice(infoDevice?:{ DeviceID: string, BomHDRId: string }|null) {
        appStore.isLoading = true
        let config = {
            params: {
                DeviceId: infoDevice?.DeviceID,
                BOMId: infoDevice?.BomHDRId
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
            }
        }
        try {
            var result = await axiosInstance.get('material/getMaterialDevice', config);

            if (result.data.status === 200) {
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    dataMaterialDevice: result.data.dataMaterialDevice
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
             throw error
        }finally {

            appStore.isLoading = false

        }
    }

    // Lấy danh sác material của bom để thiết lập Devie SX
    // Code 20/09/2021
    async function getMaterialOfBOM(BOM_HDR_ID=null) {
        appStore.isLoading = true
        let config = {
            params: {
                BOM_HDR_ID: BOM_HDR_ID
            }
        }
        try {
            var result = await axiosInstance.get('material/semiPro/getMaterialOfBOM', config);
            if (result.data.status === 200) {
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    dataMaterialBom: result.data.dataMaterialBom
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    //code 29/08/2021
    // lấy số liệu nguyên liệu đồng bộ cần cho các lệnh sản xuất với số liệu nguyên liệu còn có (tồn kho + đang mua - SX giở dang)
    async function getNhuCauNguyenLieuDuAnTonKho() {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('material/getNhuCauNguyenLieuDuAn-tonKho');

            if (result.data.status === 200) {
                //console.log(result.data.DataMaterialRequirements)
                return {
                    ok: true,
                    error: null,
                    DataMaterialRequirements: result.data.DataMaterialRequirements
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    async function getTypeMaterial(strParts: string| null = null) {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('material/type?strParts=' + strParts);
            //console.log(result)
            if (result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    parts_type: result.data.parts_type
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    async function getListMateral_SemiPro(semiPro_Id=null) {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('material/list?semiProId=' + semiPro_Id);
            //console.log(result)
            if (result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    listMaterial: result.data.listMaterial
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }
    async function saveListMaterial_semi(DataMateriallist = null) {
        try {
            // let data={
            //     semiPro_ID: semiPro_ID,
            //     Materiallist_semi: this.listMaterialExce,
            //   }
            //console.log('sv project:',DataMateriallist)
            appStore.isLoading = true
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            //console.log(dataBomHDR)
            var result = await axiosInstance.post('material/saveListMaterialSemi', DataMateriallist, config);

            if (result.data.status === 200) {
                //console.log("result comment = ", result.data.ok);

                return {
                    ok: true,
                    comment: result.data
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            throw error
        }finally {

            appStore.isLoading = false

        }
    }

    return {
        // define reactive state and actions here if needed
        getDescription_Material,
        Search_material,
        getMaterials,
        CheckPartNum_Semi,
        getMaterials_Can_U_ERP,
        UpdateMOQ_SPQ,
        UpdataTypeMaterialImage,
        ERPgetTypeBaseMaterial,
        getTypeBaseMaterial,
        addTypeMaterial,
        UpdatePropertyMateria,
        getManufacturers_FroManufacturers_code,
        getMarkingCode_Part,
        SyncMaterialERP,
        saveManufacturer,
        getMateria_PROJ,
        getManufacturerMaterialOfPART,
        getManufacturerMaterial,
        check_MfrPart,
        getDataMamufaturer,
        updateWastage,
        getMfr_Part,
        getMaterialCodeManufactory,
        SaveMaterialManufactoryItem,
        SaveMaterialManufactory,
        getMaterialOfManufactorer,
        saveMaterialRecipt,
        getMaterialDispatch,
        getMaterialCloseSemi,
        getMaterialDeviceOfLine,
        getMaterialDevice,
        getMaterialOfBOM,
        getNhuCauNguyenLieuDuAnTonKho,
        getTypeMaterial,
        getListMateral_SemiPro,
        saveListMaterial_semi,
    }
})
