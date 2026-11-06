
import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'

import { useAppStore } from '@/stores/app.store'

export const usePMCStore = defineStore('pmc',()=> {   
    const appStore = useAppStore()

    //code 05/01/2025
    //Cập nhật kế hoạch sử dụng nguyên liệu cho Demand
    const UpdatePlan_Material_Demand = async ( data: any ) => {
        appStore.isLoading = true 
        try {

            var result = await axiosInstance.post(`pmc/UpdatePlan_Material_Demand`, data);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_Inventory_PO: result.data.data_Inventory_PO
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


// thiết lập chọn mua nguyên liệu select
// code 31/8/2026
const thietLapSelectedQuote = async ( data:{QMA_ID: string, SELECTED: boolean}) => {
    appStore.isLoading = true
    try {
        var result = await axiosInstance.put('pmc/thietLapSelectedQuote', data);
        appStore.setMessager(result.data.message)
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null
            }
        } else {
            return {
                ok: false,
                error: result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}
    
 // lấy danh sách dự (SO) Demand DTL cho select
// code 21/8/2026
const getDataDemand_DTLSelect = async () => {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('pmc/getDataDemand_DTLSelect');
            //console.log(result)
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataDemand_DTLSelect: result.data.dataDemand_DTLSelect
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

// Gửi mail báo giá    
//13/08/2026 
const SendMail_QouteSup = async ( data: any) => {
    appStore.isLoading = true        
    try {
        let config = {
        }          
        var result = await axiosInstance.put(`pmc/SendMail_QouteSup`, data);
        appStore.setMessager(result.data.message)
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
            }
        } else
        {
            return {
                ok: false,
                error: result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

//Lấy thông tin báo giá cho khách hàng theo PQP_ID 
//05/08/2026 
const getReportBaoGia_KH = async (data: any) => {
    appStore.isLoading = true        
    try {
        let config = {
            params:data,
        }         
        var result = await axiosInstance.get(`pmc/getReportBaoGia_KH`, config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                Qoute_KH: result.data.Qoute_KH,
                Qoute_Material: result.data.Qoute_Material,
            }
        } else
        {
            console.log( result.data.status);                
            return {

                ok: false,
                error: result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}



//code 28/07/2026
//search lấy danh sách khách hàng theo tên khách hàng
const getSearchCustomers = async ( data:{search: string}) => {
    appStore.isLoading = true        
    try {
        let config = {
            params:data,

        }  
        
        var result = await axiosInstance.get(`pmc/getSearchCustomers`, config);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataCustomers: result.data.dataCustomers,
            }
        } else
        {
            console.log( result.data.status);                
            return {

                ok: false,
                error: result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

//cập nhật tính chất không hoàn trả, không hủy (NCNR) cho vật tư  
//26/07/2026  
const setNCNR_REQ_Material_Demand = async (data=null ) => {
    try {
        appStore.isLoading = true            
        //console.log(dataPlanHDR)
        var result = await axiosInstance.put('pmc/setNCNR_REQ_Material_Demand', data); 
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
    } finally {
        appStore.isLoading = false
    }
}        

    // lấy danh sách demand chi tiết forecast theo matrận ngày
    //code 15/01/2025
    const get_FORECAST_days = async ( data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/get_FORECAST_days', config);

            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_FORECAST_days: result.data.data_FORECAST_days,
                    N_Chage:result.data.N_Chage,
                    All_status:result.data.All_status
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}


    // Xóa vật tư khỏi kế hoạch sản xuất
    //18/05/2026
const deleteItemPlanMateral = async ( data=null ) => {
    try {
        appStore.isLoading = true            
        //console.log(dataPlanHDR)
        var result = await axiosInstance.post('pmc/deleteItemPlanMateral', data);
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
    } finally {
        appStore.isLoading = false
    }
}       
// Nạp nguyên liệu vào lệnh sản xuất
    // code 19/05/2026
    const LoadMaterialWO_recceive = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/LoadMaterialWO_recceive', data);
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
        } finally {
            appStore.isLoading = false
        }
    }        

// Reset lại nguyên liêu trong lệnh sản xuất
    // code 12/05/2026
    const resetMaterialWO_recceive = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/resetMaterialWO_recceive', data);
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
        } finally {
            appStore.isLoading = false
        }
    }        

// lấy lệch chuẩn giá mua so với giá kế hoạch
//code 25/02/2026
const getup_PPV_PLAN_SOM = async ( data=null ) => {
    appStore.isLoading = true
    try {
        let config = {
            params:data,
        }
        var result = await axiosInstance.get('pmc/MRP/getup_PPV_PLAN_SOM', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                data_PODTL_PPV: result.data.data_PODTL_PPV,
                UNIT_PRICE: result.data.UNIT_PRICE

            }
        } else
        {
            return {
                ok: false,
                error: result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

// lấy danh chi tiết Thành phẩm xuất của phiếu xuất
//code 25/01/2026
const getThanhPhamXuat_DemandDTL = async ( data=null ) => {
    appStore.isLoading = true
    try {
        let config = {
            params:data,
        }
        var result = await axiosInstance.get('pmc/getThanhPhamXuat_DemandDTL', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataThanhPhamXuat_DemandDTL: result.data.dataThanhPhamXuat_DemandDTL
            }
        } else
        {
            return {
                ok: false,
                error: result.data.error
            }
        }
    } catch(error) {
      throw error
    } finally {
        appStore.isLoading = false
    }
}

    // lấy danh phiếu Xuất trả hàng theo Demand đã xuất trong tháng
    //code 25/01/2026
    const getPhieuXuatDemands_month = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getPhieuXuatDemands_month', config);

            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPhieuXuatDemandsDTLs: result.data.dataPhieuXuatDemandsDTLs
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

     // lấy danh sách Nhu cầu chi tiết theo tháng chưa xuất trả hết
    //code 23/01/2026
    const getXuatDemandDTLs_month = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getXuatDemandDTLs_month', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataXuatDemandsDTLs: result.data.dataXuatDemandsDTLs
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Cập nhật nguyên liêu cho Bán thành phẩn của kế hoạch sản xuất
    // code 14/01/2026
    const UpdateMaterialPlanDTL = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/UpdateMaterialPlanDTL', data);
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
        } finally {
            appStore.isLoading = false
        }
    }    
    // Xóa Bán thành phẩn khỏi kế hoạch sản xuất
    // code 14/01/2026
    const DeletePlanDTL = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/DeletePlanDTL', data);
                
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
        } finally {
            appStore.isLoading = false
        }
    }    
    //Lấy bán thành phẩm thiếu của sản xuất
    // code 12/01/2026 
    const getSemiMis_BOM = async (data=null) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,

            }
            var result = await axiosInstance.get('pmc/getSemiMis_BOM', config)
            //console.log(result)
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPlan: result.data.dataPlan
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    
    // Tạm dừng nhu cầu khách hàng
    // code 29/11/2025
    const PauseDemands = async ( data: any ) => {

        try {
            appStore.isLoading = true
            let config = {
               
            }        
            console.log(data)
            var result = await axiosInstance.post('pmc/PauseDemands', data, config);
              
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
        } finally {
            appStore.isLoading = false
        }
    }
    
     // lấy danh sách Nhu cầu tạm dừng
    //code 03/01/2023
    const getDataDemands_TamDung = async ( data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDataDemands_TamDung', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataDemands_TamDung: result.data.dataDemands_TamDung
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    //Lấy Bom của lệnh sản xuất
    // code 27/10/2025 
    const getBOM_WO = async (data=null) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getBOM_WO', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    dataBomHDRDTL: result.data.dataBomHDRDTL,
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    
    //thiết lập lại line SX cho lịch sản xuất  
    // code 27/10/2025 
    const setChangeLine_PlanSchdure = async (data=null) => {
        appStore.isLoading = true
        try {
            //console.log(config);
            var result = await axiosInstance.post('pmc/setChangeLine_PlanSchdure', data); //?date=' + date
            //console.log(result)
            
            appStore.setMessager(result.data.message)  
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataListPlanSchdure: result.data.dataListPlanSchdure
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

// tạo và thay đổi kế hoạch sản xuất theo nhu cầu (Demain)
    // code 11/10/2025
    const CreaterPlanForDemand = async (dataPlanHDR : any ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/CreaterPlanForDemand', dataPlanHDR);
              
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
        } finally {
            appStore.isLoading = false
        }
    }


// lấy số lớn nhất theo ngày sản xuất ra sản phẩm 
// code 10/09/2025
const getMaxProducDate = async (data=null ) => {
        //appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getMaxProducDate', config);
            //
            if(result.data.status === 200) {
                return {
                    ok: true,
                    ProducQTY: result.data.ProducQTY,
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
           // 
            //console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
// lấy trạng thái nguyên liệu theo BOM_HDR_ID và ngày
// code 03/09/2025
const getStatus_NL = async (data=null ) => {
        //appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getStatus_NL', config);
            //
            if(result.data.status === 200) {
                return {
                    ok: true,
                    Status: result.data.Status,
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
           // 
            //console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
// thiết lập kế hoạch SX chính thức
// code 02/09/2025
const SetSchedu_Plan_day = async (data=null ) => {
        //console.log(data);        
        try {
            appStore.isLoading = true
     
            var result = await axiosInstance.post('pmc/MPS/SetSchedu_Plan_day', data);
              
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {   
                return {
                    ok: true,
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error,                                        
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

// thay đổi ngày sản xuất của lịch sản xuất tạm 
// code 01/09/2025
const ChangeDateSchedu_Plan = async (data=null ) => {
        //console.log(data);        
        try {
            appStore.isLoading = true
             
            var result = await axiosInstance.post('pmc/MPS/ChangeDateSchedu_Plan', data);
              
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {   
                return {
                    ok: true,
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error,                                        
                }
            }
        } catch(error) {
            
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
// lấy thông tin lịch Sx của ngày theo BOM_HDR_ID
// code 31/08/2025
const getDataSchedu_BomHDR_Plan_day = async (data= null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/MPS/getDataSchedu_BomHDR_Plan_day', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    DataSchedu_BomHDR_Plan_day: result.data.DataSchedu_BomHDR_Plan_day,
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            //console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

// lấy thông tinh nguyên liệu có đủ cho sản xuất theo ngày không
// code 17/08/2025
const getInforMaterail_day = async (data= null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/MRP/getInforMaterail_day', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataSum_PlanSOMForecast_now: result.data.dataSum_PlanSOMForecast_now,
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

// Lấy tổng hợp kế Hoạch SX SOM+Forcast
    // code 15/07/2025
    const getSum_PlanSOMForecast_now = async (data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/MRP/getSum_PlanSOMForecast_now', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataSum_PlanSOMForecast_now: result.data.dataSum_PlanSOMForecast_now,
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Ghi nhận hủy số lượng sản xuất của PO
    // code 21/06/2025
     const Confirm_Cancel_PO = async (data=null ) => {
        //console.log(data);        
        try {
            appStore.isLoading = true
            let config = {

            }      
            var result = await axiosInstance.post('pmc/MPS/Confirm_Cancel_PO', data);
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {   
                return {
                    ok: true,
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error,                                        
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // Lấy mã nguyên liêu phải hủy cancel của PO
    // code 04/06/2025
    const getPart_numCancel_PO = async (data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/MRP/getPart_numCancel_PO', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPart_numCancel_PO: result.data.dataPart_numCancel_PO,
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
// Lấy nguyên liệu cancel của PO 
    //code 29/05/2025
    const getMaterialCancel_PO = async (data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/MRP/getMaterialCancel_PO', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMaterialCancel_PO: result.data.dataMaterialCancel_PO,
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy metric Demand theo PO_code 
    //code 28/05/2025
    const get_SOM_PO_CODE_Metricdays = async (data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/MRP/get_SOM_PO_CODE_Metricdays', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_SOM_PO_CODE_Metricdays: result.data.data_SOM_PO_CODE_Metricdays,
                    N_Chage:result.data.N_Chage,
                    All_status:result.data.All_status
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // 07/05/2025
    // Thiết lập lại lịch sản xuất cho các dự án
    const SetSchedu_Plan_now = async (data=null ) => {
        //console.log(data);        
        try {
            appStore.isLoading = true
    
            var result = await axiosInstance.post('pmc/MPS/SetSchedu_Plan_now', data);
              
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {   
                return {
                    ok: true,
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error,                                        
                }
            }
        } catch(error) {
           throw error
        } finally {
            appStore.isLoading = false
        }
    }

     //code 07/05/2025
    //lấy danh sách  lịch sản xuất theo ngày dự kiến
    const get_MPS_days = async (data=null) => {
        appStore.isLoading = true
        
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`pmc/MPS/get_MPS_days`, config);           
            

            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_MPS_days: result.data.data_MPS_days,
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy thông tin danh sách WO chi tiết theo ma trận ngày 
    //code 02/04/2025
    const get_WO_matdays = async (data=null) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/MPS/get_WO_matdays', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_WO_matdays: result.data.data_WO_matdays,
                    All_status:result.data.All_status
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // duyệt thay đổi nhu cầu
    //code 14/02/2025
    const duyetChange_demand = async (data: any) => {
        //console.log(data);        
        try {
            appStore.isLoading = true
            let config = {

            }      
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/duyetChange_demand', data, config);
              
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {   
                return {
                    ok: true,
                }
            } else {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


    // lấy danh sách demand chi tiết SOM theo matrận ngày
    //code 15/01/2025
    const get_SOM_days = async (data: any) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/get_SOM_days', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_SOM_days: result.data.data_SOM_days,
                    N_Chage:result.data.N_Chage,
                    All_status:result.data.All_status
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy danh sách chi tiết line Nhu cầu cho sản xuất
    //code 22/11/2024
    const getDemandDTLs_SanXuat = async (data: any) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDemandDTLs_SanXuat', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataDemandsDTLs_SanXuat: result.data.dataDemandsDTLs_SanXuat
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //Lấy danh sách đề nghị xuất hàng 
    //code 06/11/2024
    const getYC_Xuat_SO = async (data=null) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getYC_Xuat_SO', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataYC_Xuat_SO: result.data.dataYC_Xuat_SO
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

//Lấy danh sách mua nguyên liệu có ngày về
    //code 09/10/2024
    const getMaterial_OnWay_Part = async (data=null) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getMaterial_OnWay_Part', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataMaterialOnWay: result.data.dataMaterialOnWay
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //Lấy danh kết hoạch sử dụng mã nguyên liệu theo ngày của các Project
    //code 08/10/2024
    const getPlanUsePartNum_Porj = async (data=null) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getPlanUsePartNum_Porj', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPlanUsePartNum_Porj: result.data.dataPlanUsePartNum_Porj
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //Lấy danh sách chi tiết mua hàng có Leadtime dài cho đợt giao theo Forecast
    //code 03/10/2024
    const getDateForecastPO_materialLT_Detail = async (data: any) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDateForecastPO_materialLT_Detail', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataDateForecastPO_materialLT_Detail: result.data.dataDateForecastPO_materialLT_Detail
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //Lấy danh sách thời gian mua hàng có Leadtime dài cho đợt giao theo Forecast
    //code 02/10/2024
    const getDateForecastPO_materialLT = async (data: any) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDateForecastPO_materialLT', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataDateForecastPO_materialLT: result.data.dataDateForecastPO_materialLT
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            throw error
        } finally {
            appStore.isLoading = false
        }

    }

     //Lấy danh sách thời gian mua hàng cho đợt giao theo Forecast
    //code 27/08/2024
    const getDateForecastPO_material = async (data: any) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDateForecastPO_material', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataDateForecastPO_material: result.data.dataDateForecastPO_material
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // Khởi tạo lại cho forecast
    //code 26/08/24
    const ini_Forcast = async ( data: any ) => {
        //console.log(data);        
        try {
            appStore.isLoading = true
            // Tác vụ tính toán nặng: nới timeout (0 = không giới hạn)
            let config = {
                timeout: 300000, // 5 phút
            }
            var result = await axiosInstance.post('pmc/ini_Forcast', data, config);
           
            appStore.setMessager(result.data.message)
           
            if(result.data.status === 200) {
                 console.log(result.data);
                return {
                    ok: true,
                }
            } else {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    
    // lấy ma trân forecast
    //code 17/08/2024
    const getdata_Forecast = async ( data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getdata_Forecast', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataforecast: result.data.dataforecast,
                    DATE_FORECAST:result.data.DATE_FORECAST
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


    // Tạo Demand dtl forecast
    // code 16/08/2024
    const saveCelForcast = async ( data: any ) => {
        //console.log(data);
        //appStore.isLoading = true
        try {            
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/saveCelForcast', data, config);
              
            //appStore.setMessager(result.data.message)
            if(result.data.status === 200) {   
                return {
                    ok: true,
                    x:result.data.x,
                    y:result.data.y,
                    err:result.data.err,
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error,  
                    x:result.data.x,
                    y:result.data.y,
                    err:result.data.err,                                      
                }
            }
        } catch(error) {
            throw error
        } finally {
            //appStore.isLoading = false
        }
    }
    // lấy danh sách nguyên liệu mua dư trên đường
    //code 03/08/2024
    const getMateralMuadu_onway = async ( data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
                
            }
            var result = await axiosInstance.get('pmc/getMateralMuadu_onway', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataMateralMuadu_onway: result.data.dataMateralMuadu_onway
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy danh sách Nhu cầu dự báo
    //code 31/07/2024
    const getDemands_forecast = async ( data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDemands_forecast', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataDemands_forecast: result.data.dataDemands_forecast
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

     // Lấy danh sách loại demand
    // code 28/07/2024
    const getDataDemandType = async ( data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDataDemandType', config);
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataDemandType: result.data.dataDemandType
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // Lấy danh sách demand sử dụng nguyên liệu trong Group PO 
    // code 19/07/2024
    const getDemandOfGroupMaterial = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDemandOfGroupMaterial', config);
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataDemandOfGroupMaterial: result.data.dataDemandOfGroupMaterial
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Lấy danh sách demand
    // code 11/07/2024
    const getListDemand = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data
            }
            var result = await axiosInstance.get('pmc/getListDemand', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    datalistDemand: result.data.datalistDemand
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


    // Lấy danh sách nguyên liệu nhóm demand
    // code 10/07/2024
    const getMaterialGroup_PO = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getMaterialGroup_PO', config);
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataMaterialGroup_PO: result.data.dataMaterialGroup_PO
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


    // Tạo nhóm Demand
    // code 07/07/2024
    const TaoNhomDemand = async ( data=null ) => {
        try {
            appStore.isLoading = true
            let config = {

            }
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/TaoNhomDemand', data, config);
              
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {   
                return {
                    ok: true,
                    dataDemand_Group_PO:  result.data.dataDemand_Group_PO
                }
            } else {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Add Demand vào nhóm Demand
    // code 07/07/2024
    const Add_Demand_To_Group = async ( data=null ) => {
        try {
            appStore.isLoading = true
            let config = {

            }
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/Add_Demand_To_Group', data, config);
              
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {   
                return {
                    ok: true,
                }
            } else {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

// lấy danh sách demand của nhóm dự án
    //code 07/07/2024
    const getDemandsDTLOfGroup = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDemandsDTLOfGroup', config);
            
            if(result.data.status === 200) {
                console.log(result.data)
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    dataDemandsDTLOfGroup: result.data.dataDemandsDTLOfGroup
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy danh sách demand của nhóm dự án
    //code 07/07/2024
    const getDemandsOfGroup = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,

            }
            var result = await axiosInstance.get('pmc/getDemandsOfGroup', config);
            
            if(result.data.status === 200) {
                console.log(result.data)
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    dataDemandsOfGroup: result.data.dataDemandsOfGroup,
                    dataDemand_Group_PO:  result.data.dataDemand_Group_PO
                }
            } else
            {
                throw new Error(result.data.error)
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    
    // Mở lại demand đã đóng
    // code 13/06/2024
    const OpenDemand = async ( data: any ) => {
        try {
            appStore.isLoading = true
            let config = {
                
            }
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/OpenDemand', data, config);
              
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
        } finally {
            appStore.isLoading = false
        }
    }

       // lấy thông tin Bom cost Bom giá) project 
    //code 11/06/2024
    const getBomCostDTL_Project = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,

            }
            var result = await axiosInstance.get('pmc/getBomCostDTL_Project', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
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
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    

    // Lấy kế hoạch SX theo line và ngày
    //code 07/04/2024
    const getScheduleDTL_Line = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getScheduleDTL_Line', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataSheduleDTL_Line: result.data.dataSheduleDTL_Line
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Lấy kế hoạch SX theo ngày
    //code 26/03/2024
    const getDays_Pro_Plan = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDays_Pro_Plan', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataDays_Pro_Plan: result.data.dataDays_Pro_Plan
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


    // Xác định thời gian mua hàng và thời gian sản xuất
    // code 14/03/2024
    const LapKeHoachPO_POR = async ( data: any ) => {
        try {
            appStore.isLoading = true
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/LapKeHoachPO_POR', data, config);
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
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy Nhu cầu (demand)
    //code 12/03/2024
    const getDemand = async ( data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDemand', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataGetdemand: result.data.dataGetdemand
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

     // lấy danh sách Nhu cầu chi tiết theo tháng
    //code 05/02/2024
    const getDemandDTLs_month = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDemandDTLs_month', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataDemandsDTLs: result.data.dataDemandsDTLs
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


     // lấy danh sách các dự án phụ thuộc
    //code 12/01/2023
    const getProjecttPhuthuoc = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
               
            }
            var result = await axiosInstance.get('pmc/getProjecttPhuthuoc', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                console.log(result.data)
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
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    
     // lấy danh sách Nhu cầu đã chốt
    //code 03/01/2023
    const getDataDemands_Year = async ( data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
               
            }
            var result = await axiosInstance.get('pmc/getDataDemands_Year', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataDemands_Year: result.data.dataDemands_Year
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy danh sác demand_dtl mới lập nhu cầu chưa thực hiện mua hàng.
    //code 18/11/2023
    const getdataDemands_dtl = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data
            }
            var result = await axiosInstance.get('pmc/getdataDemands_dtl', config);
            
            //console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataDemands_dtl : result.data.dataDemands_dtl   
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
// lấy số liệu cho chart lệnh SX WO
    //code 24/10/2023
    const getDataBIWOMonth = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data
            }
            var result = await axiosInstance.get('pmc/getDataBIWOMonth', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataChatPlan : result.data.dataChatPlan    ,
                    dataDTLPlan : result.data.dataDTLPlan      
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Đóng nhu cầu khách hàng
    // code 31/08/2023
    const DongDemand = async (  data: any = null ) => {

        try {
            appStore.isLoading = true
            let config = {

            }        
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/DongDemand', data, config);
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
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy số liệu cho chart demand
    //code 30/08/2023
    const getDataChartDM_Month = async ( data: any = null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,

            }
            var result = await axiosInstance.get('pmc/getDataChartDM_Month', config);
            
            //console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataChartDM_Month: result.data.dataChartDM_Month
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Cập nhật nguyên liệu từ bom cho Demain PO mua hàng
    // code 02/08/2023
    const UpdateMaterialBomPO = async ( data: any = null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/UpdateMaterialBomPO', data);
              
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
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy nguyên liệu cần cho dự án còn đang SX theo Project
    //code 27/05/2022
    const getMateralChoDuAnDangSX_Proj = async ( data: any ) => {
        console.log(data);
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getMateralChoDuAnDangSX_Proj', config);
            
            //console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMateralChoDuAnDangSX: result.data.dataMateralChoDuAnDangSX
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
// lấy tồn kho nguyên liệu theo dự án
    //code 10/05/2023
    const getTongHopTonKhoMaterial_Proj = async ( data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                timeout: 300000, // 5 phút
                params:data,
            }
            var result = await axiosInstance.get('pmc/getTongHopTonKhoMaterial_Proj', config);
            
            //console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataStocMaterials: result.data.dataStocMaterials
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Xóa  lệnh SX
    // code 25/04/2023
    const HuyPlan = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/HuyPlan', data);
              
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
        } finally {
            appStore.isLoading = false
        }
    }

    // xóa nguyên liệu trong chi tiết kế hoạch SX 
    // code 22/04/2023 
    const XoaMaterial_plan = async ( data=null ) => {
        appStore.isLoading = true
        try {
            //console.log(config);
            var result = await axiosInstance.post('pmc/XoaMaterial_plan',data); //?date=' + date
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } 
            else            
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


// lấy danh sách loại lệnh SX
    //code 14/04/2023
    const getPlanType = async ( data=0 ) => {
        appStore.isLoading = true
        try {
            let config = {
                params: {
                    data: data
                }
            }
            var result = await axiosInstance.get('pmc/getPlanType',config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPlanType: result.data.dataPlanType
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy danh sách Plan mới thiết lập chưa xác nhận
    //code 14/04/2023
    const getListPlanHDR_new = async ( departmenid=0 ) => {
        appStore.isLoading = true
        try {
            let config = {
                params: {
                    departmenid: departmenid
                }
            }
            var result = await axiosInstance.get('pmc/getListPlanHDR_new',config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPlanHDR_new: result.data.dataPlanHDR_new
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Nhu cầu mua hàng sang ERP
    // code 10/04/2023 
    const Create_POERP = async ( data=null ) => {
        appStore.isLoading = true
        try {
            //console.log(config);
            var result = await axiosInstance.post('pmc/Create_POERP',data); //?date=' + date
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } 
            else            
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // Hủy Yêu cầu SX trong Demand
    // code 20/03/2023 
    const HuyYCSanXuat_Demand = async ( data: any = null ) => {
        appStore.isLoading = true
        try {
            //console.log(config);
            var result = await axiosInstance.post('pmc/HuyYCSanXuat_Demand',data); //?date=' + date
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } 
            else            
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //Sửa thời gian lệnh SX
    // code 10/03/2023 
    const SuaPlanOfDemand = async ( data=null ) => {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.post('pmc/SuaPlanOfDemand',data); //?date=' + date
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
     //Lưu kế hoạch lịch sản xuất sản phẩm cho line 
    // code 27/02/2022 
    const SaveSchedure_Produc = async ( data=null ) => {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.post('pmc/SaveSchedure_Produc',data); //?date=' + date
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


    // Lấy danh lịch sản xuất trong khoản thời gian
    // code 23/02/2023   
    const getScheduPro_Duration = async ( data=null ) => {
        appStore.isLoading = true
        try {
            //console.log(data);
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getScheduPro_Duration', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPlanSchdure_Duration: result.data.dataPlanSchdure_Duration
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


    // Lấy danh Nguyên liệu cần đồng bộ của Lệnh SX với BOM
    // code 12/02/2023   
    const getPartnumDeficit_PLAN = async ( data=null ) => {
        appStore.isLoading = true
        try {
            //console.log(data);
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getPartnumDeficit_PLAN', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPartnumDeficit_PLAN: result.data.dataPartnumDeficit_PLAN
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Xác nhận Kỹ thuật lệnh SX
    // code 10/02/2023
    const DongBoLenhSXBOM = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/DongBoLenhSXBOM', data);
             
            //console.log(result.data);       
            appStore.setMessager(result.data.message)     
            if(result.data.status === 200) {                              
                
                return {
                    ok: true,
                }
            } else {
                //dispatch('setMessager',result.data.message)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Xác nhận Kỹ thuật lệnh SX
    // code 03/02/2022
    const ConfirmTECPlanOfDemain = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/ConfirmTECPlanOfDemain', data);
             
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
        } finally {
            appStore.isLoading = false
        }
    }

    // Xác nhận Kho nguyên liệu lệnh SX
    // code 03/02/2022
    const ConfirmWHPlanOfDemain = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/ConfirmWHPlanOfDemain', data);
              
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
        } finally {
            appStore.isLoading = false
        }
    }

     // Xác nhận BOM lệnh SX
    // code 22/12/2022
    const ConfirmBOMPlanOfDemain = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/ConfirmBOMPlanOfDemain', data);
            
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
        } finally {
            appStore.isLoading = false
        }
    }
    // Xác nhận QC lệnh SX
    // code 22/22/2022
    const ConfirmQCPlanOfDemain = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/ConfirmQCPlanOfDemain', data);
              
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
        } finally {
            appStore.isLoading = false
        }
    }

    // Duyệt lệnh SX
    // code 22/22/2022
    const XacNhanPlanOfDemand = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/XacNhanPlanOfDemand', data);
             
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
        } finally {
            appStore.isLoading = false
        }
    }


    // Cập nhật Chi tiết lệnh SX
    // code 21/22/2022
    const UpdatePlanDTL = async ( data=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/UpdatePlanDTL', data);
                
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
        } finally {
            appStore.isLoading = false
        }
    }

// Lấy danh sách bán thành phẩm của Lệnh SX (Demand)
    // code 19/22/2022   
    const getListBomHDROfDemand = async ( data=null ) => {
        appStore.isLoading = true
        try {
            console.log(data);
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getListBomHDROfDemand', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataBomHDRPlan: result.data.dataBomHDRPlan
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

// save kế hoạch mới theo nhu cầu (Demain)
    // code 19/22/2022
    const AddPlanOfDemand = async ( dataPlanHDR=null ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/AddPlanOfDemand', dataPlanHDR);
              
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
        } finally {
            appStore.isLoading = false
        }
    }

     //Lấy thông tin lệnh sản xuất theo nhu cầu (demand) của KH 
    // code 18/12/2022 
    const getWOofDemands = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            //console.log(config);
            var result = await axiosInstance.get('pmc/getWOofDemands', config); //?date=' + date
            //console.log(result)
            
            if(result.data.status === 200) {
                console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPlan: result.data.dataPlan
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

     // Tổng hợp nguyên liệu còn thiếu cho nhu cầu dự án
    //code 13/06/2022
    const GetMaterial_ThieuChoDamends = async ( data=null ) => {
        //console.log(data);
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/GetMaterial_ThieuChoDamends', config);
            
            console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMaterial: result.data.dataMaterial
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    //tính số lượng sản phẩm có thể SX được từ nguyên liệu đáp ứng của nhu cầu Demands
    //11/06/2022
    const MRPuocSoSX = async ( data=null ) => {
        //console.log(data);
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/MRPuocSoSX', config);
            
            console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMRPuocSoSX: result.data.dataMRPuocSoSX
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // Lưu Ql Nhận hàng nguyên liệu mua/KH giao cho (Demands) nhu cầu
    // code 9/06/2022 
    const LuuNhapNLMRP = async ( data=null ) => {
        appStore.isLoading = true
        try {
            //console.log(data);
            var result = await axiosInstance.post('pmc/LuuNhapNLMRP',data);
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } else
            
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // Xác nhận công đoạn đã hoàn thành cho phần nhu cầu kế hoạch nguyên liệu
    // code 9/06/2022 
    const ChyenTrangThaiNhuCauSX = async ( data=null ) => {
        appStore.isLoading = true
        try {
            //console.log(config);
            var result = await axiosInstance.post('pmc/ChyenTrangThaiNhuCauSX',data);
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Lưu tồn kho, số liệu nguyên liệu cần cho dự dán dang dở và tồn kho còn cho nhu cầu
    // code 8/06/2022 
    const saveStocOfDemand = async ( data=null ) => {
        appStore.isLoading = true
        try {
            //console.log(config);
            var result = await axiosInstance.post('pmc/saveStocOfDemand',data);
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } else
            
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy nguyên liệu cần cho dự án còn đang SX
    //code 27/05/2022
    const getMateralChoDuAnDangSX = async ( data=null ) => {
        //console.log(data);
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getMateralChoDuAnDangSX', config);
            
            //console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMateralChoDuAnDangSX: result.data.dataMateralChoDuAnDangSX
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // lấy tồn kho nguyên liệu theo Nhu cầu chi tiết của Kế Hoạch nhu cầu
    //code 25/05/2022
    const getTongHopTonKhoMaterial = async ( data: any) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getTongHopTonKhoMaterial', config);
            
            //console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataStocMaterials: result.data.dataStocMaterials
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy danh sách nguyên liệu theo Nhu cầu chi tiết của Kế Hoạch nhu cầu
    //code 25/05/2022
    const getMateralDemands_IDDemand = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getMateralDemands_IDDemand', config);
            
            console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMaterials: result.data.dataMaterials
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy danh sách Nhu cầu chi tiết của Kế Hoạch theo nhu cầu
    //code 24/05/2022
    const getDemandDTL = async ( data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDemandDTL', config);
            
            console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataDemandsDTL: result.data.dataDemandsDTL
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lập Nhu cầu chi tiết của khách hàng
    // code 23/05/2022 
    const LuuDemandDTL = async ( data: any ) => {
        appStore.isLoading = true
        try {
            //console.log(config);
            var result = await axiosInstance.post('pmc/LuuDemandDTL',data);
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    PDD_ID:result.data.PDD_ID,
                }
            } else
            
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


    // lấy danh sách Nhu cầu chi tiết của Kế Hoạch theo dự án
    //code 15/05/2022
    const getDataDemandDTL_Proj = async ( data: any = null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDataDemandDTL_Proj', config);
            
            console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    DataDemandDTL_Proj: result.data.DataDemandDTL_Proj
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Hủy Nhu cầu khách hàng
    // code 10/05/2022 
    const HuyDemands = async ( data: any ) => {
        appStore.isLoading = true
        try {
            //console.log(config);
            var result = await axiosInstance.post('pmc/HuyDemands',data); //?date=' + date
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } else
            
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // Thêm Nhu cầu khách hàng
    // code 09/05/2022 
    const saveDemands = async ( data: any = null ) => {
        appStore.isLoading = true
        try {
            //console.log(config);
            var result = await axiosInstance.post('pmc/saveDemands',data); //?date=' + date
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } else
            
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


    // lấy danh sách Nhu cầu MPS
    //code 08/05/2022
    const getDemands = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('pmc/getDemands', config);
            
            if(result.data.status === 200) {
                console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataDemands: result.data.dataDemands
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

        // Xóa lịch SX vừa lập chưa tạo lịch thời gian thực hiện theo giờ cho line 
    // code 20/12/2021 
    const DeleteScheduleProduc = async ( id: number) => {
        appStore.isLoading = true
        try {
            let config = {

            }
            //console.log(config);
            var result = await axiosInstance.post('pmc/DeleteScheduleProduc',{PLA_DSP_ID:id}, config); //?date=' + date
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

 // lấy danh sách Plan DTL(BTP/công đoạn)  theo lệnh SX của bộ phận
    //code 14/12/2021
    const getPlaDTL_WO0fDepartmen = async ( data: { DeptId: number, WO_Code: string } ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:{deptId:data.DeptId,
                        NumWo: data.WO_Code},

            }
            var result = await axiosInstance.get('pmc/getPlaDTL_WO0fDepartmen', config);
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)                
                return {
                    ok: true,
                    error: null,
                    dataPlaDTL_WO0fDepartmen: result.data.dataPlaDTL_WO0fDepartmen
                }
            } else
            {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


    // Thực hiện chốt bán thành phẩm lệnh SX
    //code 09/12/2021
    const closeSemiFN = async ( PLADTL_id: number) => {
        appStore.isLoading = true
        let config = {

        }
        try {
            var result = await axiosInstance.post('pmc/closeSemiFN',{PlanDTLID:PLADTL_id}, config );
            //console.log(result.data.message)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {                
                return {
                    ok: true,
                    error: null
                }
            } else
            {
                appStore.setMsgErro(result.data.error);
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }


    // lấy danh sách Plan DTL(BTP/công đoạn) đang thưc hiện theo lệnh SX của bộ phận
    //code 09/12/2021
    const getPlanDTLCurren0fDepartmen = async ( deptId: number ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:{deptId:deptId,},
            }
            var result = await axiosInstance.get('pmc/getPlanDTLCurren0fDepartmen', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                
                appStore.setMessager(result.data.message)  
                return {
                    ok: true,
                    error: null,
                    dataPlanDTLCurren0fDepartmen: result.data.dataPlanDTLCurren0fDepartmen
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

     //Lấy danh sác lệnh sản xuất của line theo kế hoạch SX của báo cáo yêu cầu nguyên liệu
    // code 06/12/2021 
    const getListPlanLine0fRepost = async ( WMRRID: number) => {
        appStore.isLoading = true
        try {
            let config = {
                params:{WMRRID:WMRRID,},

            }
            //console.log(config);
            var result = await axiosInstance.get('pmc/getListPlanLine0fRepost', config); //?date=' + date
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    ObjectRepostRequire: result.data.ObjectRepostRequire
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //Lấy thông tin lệnh sản xuất  
    // code 19/11/2021 
    const getWOReport = async ( WOID: number) => {
        appStore.isLoading = true
        try {
            let config = {
                params:{WOID:WOID,},
            }
            //console.log(config);
            var result = await axiosInstance.get('pmc/getWOReport', config); //?date=' + date
            //console.log(result)
            
            if(result.data.status === 200) {
                console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    ObjectPlan: result.data.ObjectPlan
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // thiết lập kế hoạch, thời gian thực hiện theo giờ cho line 
    // code 10/11/2021 
    const SetScheduleProducLineOnHour = async ( id: number ) => {
        appStore.isLoading = true
        try {
            let config = {
            }
            //console.log(config);
            var result = await axiosInstance.post('pmc/SetScheduleProducLineOnHour',{PLA_DSP_ID:id}, config); //?date=' + date
            //console.log(result)
            
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //Lấy ds kế hoạch đang thực hiện  
    // code 10/11/2021 
    const getPlanlineOnline = async ( DeptId: number) => {
        appStore.isLoading = true
        try {
            let config = {
                params:{DeptId:DeptId,},

            }
            //console.log(config);
            var result = await axiosInstance.get('pmc/getPlanlineOnline', config); //?date=' + date
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataListPlanSchdure: result.data.dataListPlanSchdure
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //Lưu kế hoạch cho line 
    // code 05/11/2021 
    const Save_Planline = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {     }
            //console.log(config);
            var result = await axiosInstance.post('pmc/Save_Planline',data, config); //?date=' + date
            //console.log(result)
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //Lấy ds line của bộ phận phục vụ cho công tác tính toán lịch SX cho S Phẩm (BomHDR)  
    // code 30/10/2021 
    const getListLineOfSetPlanBom = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            //console.log(config);
            var result = await axiosInstance.get('pmc/getListLineOfSetPlanBom', config); //?date=' + date
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataInfoLineOfsetPlanBom: result.data.dataInfoLineOfsetPlanBom
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Thực hiện chốt lệnh SX
    //code 12/09/2021
    const setLotClosing = async ( WOid: number ) => {
        appStore.isLoading = true
        let config = {

        }
        try {
            var result = await axiosInstance.post('pmc/setLotClosing',{PlanHDRID:WOid}, config );
            //console.log(result.data.message)
            
             appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                //console.log(result.data)

                return {
                    ok: true,
                    error: null
                }
            } else
            {
                appStore.setMsgErro(result.data.error);
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //Lấy lịch Sản xuất (Schedure ) theo line, ngày 
    // code 08/09/2021 getPlanScheureProLineDay
    const getPlanScheureProLineDay = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
                
            }
            //console.log(config);
            var result = await axiosInstance.get('pmc/getPlanScheureProLineDay', config); //?date=' + date
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataSchedurProLine: result.data.dataSchedurProLine
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // Thực hiện tính nguyên liệu yêu cầu cho dự án mới thiết đặt
    //code 29/08/2021
    const PlanCalculate_MaterialRequirement = async () => {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.post('pmc/PlanCalculate_MaterialRequirement');
            //console.log(result.data.message)
            
            if(result.data.status === 200) {
                //console.log(result.data)

                return {
                    ok: true,
                    error: null
                }
            } else
            {
                appStore.setMsgErro(result.data.error);
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // thiết lập chế độ tính nguyên liệu yêu cầu cho dự án mới thiết đặt
    //code 29/08/2021
    const SetPlanStatu_CalculatMaterialRequirement = async ( PlanHDRItem=null ) => {
        appStore.isLoading = true
        let config = {

        }
        try {
            var result = await axiosInstance.post('pmc/SetPlanStatu_CalculatMaterialRequirement', PlanHDRItem, config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //'getPlanMaterial'
    // Lấy danh sách NVL cho kế hoạch thực hiện.
    const getListPlanMaterials = async ( PlanHDR: number=0 ) => {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('pmc/getListPlanMaterials?PlanHDRID=' + PlanHDR);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPlanMaterials: result.data.dataPlanMaterials
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy danh sách các  của lệnh SX
   // lấy danh sách Plan DTL(BTP/công đoạn) đang thưc hiện theo lệnh SX
    //code 21/08/2021
    // Update 24/08/2021
    const getListPlanDTL = async ( PlanHDR: number=0 ) => {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('pmc/getListPlanDTL?PlanHDRID=' + PlanHDR);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPlanDTL: result.data.dataPlanDTL
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // code 18/8/2021
    //getWO_suffixes lấy phần duôi của Số Work Order 
    const getWO_suffixes = async () => {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('pmc/getWOsuffixes');
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    WO_suffixes: result.data.WO_suffixes
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // save kế hoạch mới
    // code 15/08/2021
    const savePlanHDR = async ( dataPlanHDR=null ) => {
        try {
            //console.log('DATA:',dataMaterialExist_Stock)
            appStore.isLoading = true
            let config = {

            }
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('pmc/savePlanHDR', dataPlanHDR, config);
            
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
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy danh sách Plan đã thực hiện xong
    const getListPlanHDRCompleted = async ( data=null ) => {
        appStore.isLoading = true
        try {
            let config = {
                params: data,
            }
            var result = await axiosInstance.get('pmc/getListPlanHDRCompleted', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log('dataPlanHDRCompleted',result.data)
                return {
                    ok: true,
                    error: null,
                    dataPlanHDRCompleted: result.data.dataPlanHDRCompleted
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // lấy danh sách Plan đang thưc hiện
    //code 15/08/2021
    const getListPlanHDR = async ( departmenid:number=0 ) => {
        appStore.isLoading = true
        try {
            let config = {
                params: {
                    departmenid: departmenid
                },

            }
            var result = await axiosInstance.get('pmc/getListPlanHDR',config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPlanHDR: result.data.dataPlanHDR
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
   
    const saveListMaterialDeman_plan = async ( dataMaterialDeman_plan=null ) => {
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
            var result = await axiosInstance.post('bom/saveBomHDR', dataMaterialDeman_plan, config);            
            
            if(result.data.status === 200) {                
                //console.log("result comment = ", result.data.ok);

                return {
                    ok: true,
                    comment: result.data.comment
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // Lấy danh sách nguyên liệu còn tồn 
 
const getListMaterialExist = async () => {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('pmc/ListMaterial_Exist');
            //console.log('đât: ',result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    MaterialExist: result.data.MaterialExist
                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

// Lưu số liệu nguyên liệu tồn kho từ file Excel
    const saveMaterialExist_Stock = async ( dataMaterialExist_Stock=null ) => {
        try {
            //console.log('DATA:',dataMaterialExist_Stock)
            appStore.isLoading = true
            let config = {

            }
            //console.log(dataMaterial_Stock)
            var result = await axiosInstance.post('pmc/MaterialExit/save_Stock', dataMaterialExist_Stock, config);
            
            
            if(result.data.status === 200) {                
                return {
                    ok: true,
                    comment: result.data.comment
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
// Lưu số liệu nguyên liệu đang đặt mua về từ file Excel
const saveMaterialExist_OnWay = async ( dataMaterialExist_OnWay=null ) => {
    try {
        //console.log('DATA:',dataMaterialExist_OnWay)
        appStore.isLoading = true
        let config = {
            
        }
        //console.log(dataMaterial_OnWay)
        var result = await axiosInstance.post('pmc/MaterialExit/save_OnWay', dataMaterialExist_OnWay, config);
        
        
        if(result.data.status === 200) {                
            return {
                ok: true,
                comment: result.data.comment
            }
        } else {
            return {
                ok: false,
                error: result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}
// Lưu số liệu nguyên liệu theo lệnh SX Chưa giao cho SX từ file Excel
const saveMaterialExist_WO_NOT_EXPORT = async ( dataMaterialExist_WO_NOT_EXPORT=null ) => {
    try {
        //console.log('DATA:',dataMaterialExist_WO_NOT_EXPORT)
        appStore.isLoading = true
        let config = {

        }
        //console.log(dataMaterial_OnWay)
        var result = await axiosInstance.post('pmc/MaterialExit/save_WO_NOT_EXPORT', dataMaterialExist_WO_NOT_EXPORT, config);
        
        
        if(result.data.status === 200) {                
            return {
                ok: true,
                comment: result.data.comment
            }
        } else {
            return {
                ok: false,
                error: result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

return {
    get_SOM_days,
    getDemandDTLs_SanXuat,
    get_FORECAST_days,
    getMateralMuadu_onway,
    getTongHopTonKhoMaterial_Proj,
    getMateralChoDuAnDangSX_Proj,
    HuyYCSanXuat_Demand,
    UpdateMaterialBomPO,
    UpdatePlan_Material_Demand,
    LapKeHoachPO_POR,
    CreaterPlanForDemand,
    duyetChange_demand,
    LuuDemandDTL,
    getDemandDTL,
    getDateForecastPO_materialLT,
    getDateForecastPO_materialLT_Detail,
    getDateForecastPO_material,
    getdata_Forecast,
    saveCelForcast,
    ini_Forcast,
    getDataChartDM_Month,
    DongDemand,
    saveDemands,
    getDemands_forecast,
    getDataDemands_Year,
    HuyDemands,
    getDataDemandType,
    getDemand,
    OpenDemand,
    getDataDemands_TamDung,
    PauseDemands,
    getDemands,
    getSum_PlanSOMForecast_now,
    getReportBaoGia_KH,
    getTongHopTonKhoMaterial,
    thietLapSelectedQuote,
    SendMail_QouteSup,
    getSearchCustomers,
    getdataDemands_dtl,
    getDataDemandDTL_Proj,
    saveMaterialExist_OnWay,
    saveMaterialExist_WO_NOT_EXPORT
}

})