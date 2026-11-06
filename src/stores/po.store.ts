import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'

import { useAppStore } from '@/stores/app.store'

export interface QoutePhaseMountItem {
    CUS_CONTACT?: string
    CUS_NAME?: string
    MODIFY_DATE?: Date
    NAME_PHASE?: string
    PQP_ID: number
    PROJ_CODE?: string
    PROJ_ID?: number
    PROJ_NAME?: string
    TELEPHONE?: string
}

export interface DotbaogiaItem extends QoutePhaseMountItem {
    CUS_ID?: number | null
    ADDRESS?: string
    PTE_NAME?: string    
    QUOTE_BEFORE?: string
    REQ_RFQ?: string
}

export interface QoutePhaseItem extends QoutePhaseMountItem {
    CREATED_BY?: string
    FULL_NAME?: string
    NAME_BUYER?: string | null
    NBSTATUS?: boolean
    STATUS: string
}

export const usePOStore = defineStore('po',()=> {
  
    const appStore = useAppStore()
    
    // danh sách báo giá đã được duyệt chưa lập Hợp đồng   
    //09/08/2026 
    const getPQP_LIST = async (data=null) => {
        appStore.isLoading = true        
        try {
            let config = {     
            }  
            
            var result = await axiosInstance.get(`po/getPQP_LIST`, config);

            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPQP_LIST: result.data.dataPQP_LIST,
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

    // cập nhật giao việc thực hiện báo giá
    // code 28/08/2026
    const updateGiaoviecThucHienBao = async ( data: Record<string, any> ) => {
        try {
            //console.log(data);
            appStore.isLoading = true 
            let config = {
                // headers: {
                //     'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                // }
            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.put('po/updateGiaoviecThucHienBao', data, config);
        
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
    // Gửi mail báo giá cho NCC
    // code 13/08/2026
    // const SendMail_QouteSup = async ( data: any ) => {
    //     try {
    //         appStore.isLoading = true        
         
    //         var result = await axiosInstance.put(`po/SendMail_QouteSup`, data);
    //         appStore.setMessager(result.data.message)
    //         if(result.data.status === 200) {
    //             return {
    //                 ok: true,
    //                 error: null,
    //             }
    //         } else
    //         {
    //             return {
    //                 ok: false,
    //                 error: result.data.error
    //             }
    //         }
    //     } catch(error) {
    //         throw error
    //     } finally {
    //         appStore.isLoading = false
    //     }
    // }
    // Lấy danh nhân viên mua hàng
    // code 28/08/2026
const getUserBuyer = async ( data=null ) => {
        try {
            //console.log(data);
            appStore.isLoading = true 
             let config = {
                params:data,
            }
            //console.log(dataPlanHDR)
            var result = await axiosInstance.get('po/getUserBuyer', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataUserBuyer: result.data.dataUserBuyer
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

    // Lấy danh sách nguyên liệu chung từ báo giá để thiết lập PO mua hàng
    // code 24/08/2026
    const getPO_PriceQuoteDataPoDT = async ( data=null ) => {
        try {
            //console.log(data);
            appStore.isLoading = true 
             let config = {
                params:data,
            }
            //console.log(dataPlanHDR)
            var result = await axiosInstance.get('po/getPO_PriceQuoteDataPoDT', config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMaterialsQuote: result.data.dataMaterialsQuote
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

    // Lưu chọn báo giá của các NCC cho danh sách báo giá
    // code 04/08/2026
    const LuuChonBaoGia = async ( data: any ) => {
        try {
            //console.log(data);
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.put('po/LuuChonBaoGia', data, config);
                
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

    // sách nguyên liệu lập giá của phiếu báo giá
    //code 03/08/2026
    const getQoute_Material_Price = async ( data: any ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params: data,
            }
            var result = await axiosInstance.get('po/getQoute_Material_Price', config);
            
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

    // danh sách báo giá nguyên liệu của nhà cung cấp chưa hết hạn
    //02/08/2026
    const getAllDTLQoute = async ( data : any ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params: data,
            }
            var result = await axiosInstance.get(`po/getAllDTLQoute`, config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataAllDTLQoute: result.data.dataAllDTLQoute,
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
    
    // Cập nhật báo giá nguyên liệu của nhà cung cấp theo file excel
    // code 31/07/2026
    const UpdateQouteDTLFromExcel = async ( data: Record<string, any> ) => {
        try {
            appStore.isLoading = true 
            let config = {
                // headers: {
                //     'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                // }
            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.put('po/UpdateQouteDTLFromExcel', data, config);
                
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

    // Lấy danh sách nguyên liệu của các demand 
    // code 24/07/2026
    const getMaterialReqDemands_dtl = async ( data: any ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params: data,
            }
            var result = await axiosInstance.get(`po/getMaterialReqDemands_dtl`, config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMaterialReqDemands_dtl: result.data.dataMaterialReqDemands_dtl
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
    
    // Lấy danh sách các demand chưa lập báo giá
    // code 23/07/2026
    const getQoute_Demands_dtl = async ( data = null ) => {
         appStore.isLoading = true 
        try {
            let config = {
                params: data,
            }
            var result = await axiosInstance.get(`po/getQoute_Demands_dtl`, config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataQoute_Demands_dtl: result.data.dataQoute_Demands_dtl
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
        //Xóa đợt báo giá 
//28/07/2026  

const deleteDotbaogia = async ( data: { PQP_ID: number } ) => {
    try {
        appStore.isLoading = true            
        //console.log(dataPlanHDR)
        var result = await axiosInstance.delete('pmc/dotbaogia', { data: data });
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

    // Lấy danh sách lô vận chuyển
    const getShipmentLots = async ( params: { status?: string, dateFrom?: string, dateTo?: string, page?: number | undefined, pageSize?: number | null | undefined } ) => {
        appStore.isLoading = true 
        try {
            let config = {
 
            };

            const queryParams = new URLSearchParams();
            if (params.status) queryParams.append('status', params.status);
            if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
            if (params.dateTo) queryParams.append('dateTo', params.dateTo);
            if (params.page !== undefined) queryParams.append('page', params.page.toString());
            if (params.pageSize !== undefined && params.pageSize !== null) queryParams.append('pageSize', params.pageSize.toString());

            const url = `/api/po/shipment-lots${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

            let result = await axiosInstance.get(url, config);

            if(result.data.status === 200) {
                
                return {
                    ok: true,
                    error: null,
                    shipmentLots: result.data.data.shipmentLots || [],
                    totalRecords: result.data.data.totalRecords || 0,
                    totalLots: result.data.data.totalLots || 0,
                    pendingLots: result.data.data.pendingLots || 0,
                    inTransitLots: result.data.data.inTransitLots || 0,
                    deliveredLots: result.data.data.deliveredLots || 0
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

    // Upload file Excel cho lô vận chuyển
    const uploadShipmentExcel = async ( formData=null ) => {
        appStore.isLoading = true 
        try {
            let config = {

            };

            let result = await axiosInstance.post('/api/po/shipment-lots/upload-excel', formData, config);

            if(result.data.status === 200) {
                
                return {
                    ok: true,
                    error: null,
                    message: result.data.message
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

    // Lưu lô vận chuyển (tạo mới hoặc cập nhật)
    const saveShipmentLot = async ( lotData=null ) => {
        appStore.isLoading = true 
        try {
            let config = {

            };

            let result = await axiosInstance.post('/api/po/shipment-lots', lotData, config);

            if(result.data.status === 200) {
                
                return {
                    ok: true,
                    error: null,
                    message: result.data.message,
                    lotId: result.data.data.lotId
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

    // Cập nhật trạng thái lô vận chuyển
    const updateShipmentLotStatus = async (  LOT_ID: string | number, STATUS: string ) => {
        appStore.isLoading = true 
        try {
            let config = {

            };

            let result = await axiosInstance.put(`/api/po/shipment-lots/${LOT_ID}/status`, { STATUS }, config);
            if(result.data.status === 200) {
                
                return {
                    ok: true,
                    error: null,
                    message: result.data.message
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
    
    // Lấy danh sách PO sẵn sàng vận chuyển với các trạng thái
    // code 12/05/2026
    const getReadyPOList = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params: data,

            }
            var result = await axiosInstance.get(`po/getReadyPOList`, config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataReadyPOList: result.data.dataReadyPOList,
                    totalReady: result.data.totalReady,
                    totalShipped: result.data.totalShipped,
                    totalUnshipped: result.data.totalUnshipped,
                    totalOverdue: result.data.totalOverdue
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

    // Lấy dữ liệu biểu đồ PO sẵn sàng vận chuyển theo tháng
    // code 13/05/2026
    const getReadyPOChart = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params: data,

            }
            var result = await axiosInstance.get(`po/getReadyPOChart`, config);
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    chartDataReadyPOChart: result.data.chartDataReadyPOChart
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
// Lấy danh sách PO có mua nguyên liệu theo mã vật tư
    // code 26/04/2026
    const getPOofPART_NUM = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getPOofPART_NUM', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    data_POofPART_NUM:result.data.data_POofPART_NUM
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

// Lưu sửa chi tiết hàng mua trong PO
//code 26/01/2026
const SaveVatTuMuaDTL = async ( data=null ) => {
    try {
        appStore.isLoading = true 
        let config = {

        }          
        //console.log(dataPlanHDR)
        var result = await axiosInstance.post('po/SaveVatTuMuaDTL', data, config);
            
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

// Lấy danh sách đơn vận chuyển theo nhà cung cấp
    // code 26/12/2025
    const getShipHDR_NCC = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getShipHDR_NCC', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataShipHDR_NCC:result.data.dataShipHDR_NCC
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

// Cập nhật PO đã vận chuyển về
//17/12/2025
const TickPO_DaVC = async ( data=null ) => {
    try {
        appStore.isLoading = true           
        //console.log(dataPlanHDR)
        var result = await axiosInstance.post('po/TickPO_DaVC', data);
                    
        if(result.data.status === 200) {                
            appStore.setMessager(result.data.message)
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
// lấy danh sách nguyên liệu của nhà cung cấp chưa vận chuyển về
// code 17/12/2025
const getMaterialNCC_ChuaVC = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }  
            var result = await axiosInstance.get(`po/getMaterialNCC_ChuaVC`, config);           
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMaterialNCC_ChuaVC: result.data.dataMaterialNCC_ChuaVC,
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

// lấy danh sách nhà cung cấp có nguyên liệu mua chưa giao
// code 15/12/2025
const getNCC_Chua_giaoDu = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }  
            var result = await axiosInstance.get(`po/getNCC_Chua_giaoDu`, config);           
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataNCC_Chua_giaoDu: result.data.dataNCC_Chua_giaoDu,
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
// Lưu nhiều đơn mua hàng
// code 10/12/2025
const saveExcelPOs_DTL = async ( data=null ) => {
    try {
        appStore.isLoading = true           
        //console.log(dataPlanHDR)
        var result = await axiosInstance.post('po/saveExcelPOs_DTL', data);
                    
        if(result.data.status === 200) {                
            appStore.setMessager(result.data.message)
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

    //code 09/12/2025
    //lấy danh sách nhà cung cấp có tâp mã SUPPLIERS_CODE
    const getSupplines_ForSupplines_Code = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }  
            
            var result = await axiosInstance.get(`po/getSupplines_ForSupplines_Code`, config);           
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    DataSupplines: result.data.DataSupplines,
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

    // Lưu nhà cung cấp 
    //conde 08/10/2025
    const LuuAddSuppliers = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {
            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/LuuAddSuppliers', data, config);
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

    // đóng Open PO đã giao hàng xong
    //conde 23/09/2025
    const DongOPEN_PO_CODE = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/DongOPEN_PO_CODE', data, config);
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
    // xóa Open PO 
    //conde 23/09/2025
    const XoaOPEN_PO_CODE = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/XoaOPEN_PO_CODE', data, config);
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

    //code 12305/2025
    //lấy thông tin PO_CODE, OPEN_PO của cancel nguyên liệu
    const getPO_CODE_OPEN_PO_of_Cancel = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getPO_CODE_OPEN_PO_of_Cancel`, config);           
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPO_CODE_OPEN_PO: result.data.dataPO_CODE_OPEN_PO,
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

    //code 20/03/2025
    //lấy thông tin WIP của mã liệu 
    const getInforMateriaWIP = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getInforMateriaWIP`, config);           
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataInforMateriaWIP: result.data.dataInforMateriaWIP,
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
                    
    //code 08/03/2025
    //lấy danh sách PO mua hàng theo ngày tới nhà cung cấp 
    const getPOs_HDR_SUPday = async ( data=null ) => {
        appStore.isLoading = true       
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getPOs_HDR_SUPday`, config);           
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPOs_HDR_SUPday: result.data.dataPOs_HDR_SUPday,
                    dataPOs_DTL_SUPday:result.data.dataPOs_DTL_SUPday
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
       //code 06/03/2025
    //cập nhật lại mã khách hàng cho đơn mua hàng
    const UpdateCUS_POH = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UpdateCUS_POH', data, config);
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

    //code 06/03/2025
    //lấy danh sách khách hàng SX XK 
    const getCustomers_SXXK = async ( data=null ) => {
        appStore.isLoading = true       
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getCustomers_SXXK`, config);           
            
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

         //code 05/03/2025
    //lấy danh sách chi tiết PPV hàng mua của PO 
    const getPO_PPV_DTL = async ( data=null ) => {
        appStore.isLoading = true       
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getPO_PPV_DTL`, config);           
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_PODTL_PPV: result.data.data_PODTL_PPV,
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

    //code 04/03/2025
    //lấy danh sách khách hàng có mua nguyên liệu
    const getSuppliers_PPV = async ( data=null ) => {
        appStore.isLoading = true       
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getSuppliers_PPV`, config);           
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataSuppliers_PPV: result.data.dataSuppliers_PPV,
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
    
     //code 03/03/2025
    //lấy danh sách chi tiết hàng mua của PO 
    const getPO_HDR_PO_DTL = async ( data=null ) => {
        appStore.isLoading = true       
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getPO_HDR_PO_DTL`, config);           
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPO_HDR_PO_DTL: result.data.dataPO_HDR_PO_DTL,
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

    //code 03/03/2025
    //Cập nhật mã PO_CODE của ERP
    const UpdatePO_PO_CODE = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UpdatePO_PO_CODE', data, config);
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

    //code 27/02/2025
    //lấy danh sách PO mua hàng hiện tại
    const getPO_HDR_Curent = async ( data=null ) => {
        appStore.isLoading = true       
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getPO_HDR_Curent`, config);           
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_POHDR_curent: result.data.data_POHDR_curent,
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

    //code 25/02/2025
    //Cập nhật tỷ giá ngoại tệ từ 
    const UpdateCurrenceRates = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UpdateCurrenceRates', data, config);
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

    //code 25/02/2025
    //lấy bảng tỷ giá
    const getCURENCY_RATES = async ( data=null ) => {
        appStore.isLoading = true       
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getCURENCY_RATES`, config);           
            
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_CURENCY_RATES: result.data.data_CURENCY_RATES,
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

    // Lưu Kế hoạch Báo giá năm
    //code 23/02/2022
    const Save_Plan_Prices_Year = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/Save_Plan_Prices_Year', data, config);
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

    //code 22/02/2025
    //lấy bảng kế hoạch giá theo năm
    const get_Plan_Prices_Year = async ( data=null ) => {
        appStore.isLoading = true       
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/get_Plan_Prices_Year`, config);           
            

            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_Plan_Prices_Year: result.data.data_Plan_Prices_Year,
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

    //code 22/02/2025
    //lấy tỷ giá USD-VND
    const get_tyGiaUSD = async ( data=null ) => {
        appStore.isLoading = true       
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/get_tyGiaUSD`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    tyGiaUSD: result.data.tyGiaUSD,
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

      // Cập nhật thông tin nhà cung cấp 
    // code 20/02/2025
    const UpdateSuppline_item = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UpdateSuppline_item', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                    data_supplier_item:result.data.data_supplier_item
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

    //code 15/02/2025
    //lấy danh sách sử dụng nguyên liệu cho SX
    const getPlan_Use_Material_Week = async ( data=null ) => {
        appStore.isLoading = true       
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getPlan_Use_Material_Week`, config);           

            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_Plan_Use_Material_Week: result.data.data_Plan_Use_Material_Week,
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

    //code 12/02/2025
    //Lấy nhà cung cấp theo tên rút gọn
    const getNCC_ShortName = async ( data=null ) => {
        appStore.isLoading = true 
        
        try {
            let config = {
                params:data,
            }  
            
            var result = await axiosInstance.get(`po/getNCC_ShortName`, config);           

            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    NCC: result.data.NCC,
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

    //code 12/02/2025
    //kết hoạch nhận nguyên liệu mua.
    const get_dataOnWay = async ( data=null ) => {
        appStore.isLoading = true 
        
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/get_dataOnWay`, config);           
            

            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataonWay: result.data.dataonWay,
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


    // Tạo yêu cầu Chuyển hàng cho tổng hợp theo này nhận của nhà cung cấp
    // code 26/02/2025
    const TaoYeuCauShipping = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/TaoYeuCauShipping', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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

    //code 23/01/2025
    //lấy danh nguyên liệu mua chưa giao của nhà cung cấp
    const getDataPartNum_Ncc = async ( data=null ) => {
        appStore.isLoading = true 
        
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getDataPartNum_Ncc`, config);           
            

            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPartNum_Ncc: result.data.dataPartNum_Ncc,
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

    //code 18/01/2025
    //lấy danh sách nhà cung cấp
    const getSupplines = async ( data=null ) => {
        appStore.isLoading = true 
        
        try {
            let config = {
                params:data,
            }  
            
            var result = await axiosInstance.get(`po/getSupplines`, config);           
            

            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    Data_Suppliers: result.data.Data_Suppliers,
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


    // Tạo PO Mua hàng theo tuần cho SUM 
    // code 25/12/2024
    const SaveMuaHang_SUM_WEEK = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/SaveMuaHang_SUM_WEEK', data);
                
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
    
    //code 23/12/2024
    //lấy danh sách sử dụng nguyên liệu theo Sx và mua hàng theo tuấn của Schumacher
    const getSum_Plan_Use_Material_now_Schumacher = async ( data=null ) => {
        appStore.isLoading = true 
        
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getSum_Plan_Use_Material_now_Schumacher`, config);           
            

            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataSum_Plan_Use_Material_now: result.data.dataSum_Plan_Use_Material_now,
                    dataonWay:result.data.dataonWay
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
    
      // Cập nhật ngày về cho nguyên liệu PO
    // code 17/12/2024
    const UpdateNgayVe_Materia_PO = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UpdateNgayVe_Materia_PO', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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

    // Lưu mua hàng theo Tổng hợp nguyên liệu SUM
    // code 17/12/2024
    const SaveMuaHang_SUM = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/SaveMuaHang_SUM', data);
               
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

    //code 14/12/2024
    // lấy danh sách deman dự kiến cho mua hàng
    const getList_PDD_of_Order_PartNum = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }              
            var result = await axiosInstance.get(`po/getList_PDD_of_Order_PartNum`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataList_PDD_of_Order_PartNum: result.data.dataList_PDD_of_Order_PartNum
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

    //code 14/12/2024
    // lấy dữ liệu lịch sử giá
    const getPrices_history_PN = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }              
            var result = await axiosInstance.get(`po/getPrices_history_PN`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPrices_history_PN: result.data.dataPrices_history_PN
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

    //code 13/12/2024
    // lấy số mã nhà cung cấp qua Short Name
    const get_Sup_code_fr_ShortName = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/get_Sup_code_fr_ShortName`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_SUP_codes: result.data.data_SUP_codes
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

    //code 11/12/2024
    // lấy số lượng nguyên liệu cần mua, đơn giá, các Demand 
    const getPlan_Po_Partnum = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }  
            
            var result = await axiosInstance.get(`po/getPlan_Po_Partnum`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPlan_Po_Partnum: result.data.dataPlan_Po_Partnum
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

    //code 06/12/2024
    //lấy danh sách sử dụng nguyên liệu theo Sx và mua hàng
    const getSum_Plan_Use_Material_now = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            
            var result = await axiosInstance.get(`po/getSum_Plan_Use_Material_now`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataSum_Plan_Use_Material_now: result.data.dataSum_Plan_Use_Material_now,
                    dataonWay:result.data.dataonWay
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

    //code 01/12/2024
    //lấy danh sách PO Mua hàng theo nhà cung cấp
    const get_PO_Suppliers = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/get_PO_Suppliers`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_PO_Suppliers: result.data.data_PO_Suppliers,
                    data_PO_CQ:result.data.data_PO_CQ
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

    //code 01/12/2024
    //lấy danh sách nguyên liệu cần mua PO tại thời điểm hiện tại
    const setPO_Plan_Material_now = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/setPO_Plan_Material_now`, config);           
            
            appStore.setMessager(result.data.message)    
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
    //code 26/11/2024
    //lấy danh sách nguyên liệu tồn cho PO 
    const get_Inventory_PO = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/get_Inventory_PO`, config);           
            
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

    // Lưu Báo giá Mới
    //code 24/11/2024
    const Save_New_Prices = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/Save_New_Prices', data, config);
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

    //code 21/11/2024
    //lấy danh sách báo giá nguyên liệu mới nhất
    const getNew_Prices = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/getNew_Prices`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    data_New_Prices: result.data.data_New_Prices
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

     // Xóa chi tiết hàng mua trong PO
    //code 16/10/2024
    const deletePODTL = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/deletePODTL', data, config);
                
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
    //code 10/10/2024
    //Lấy chi tiết mua hàng PO (Open PO).
    const getMaterialOpenPO = async ( data: any ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/getMaterialOpenPO`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMaterialOpenPO: result.data.dataMaterialOpenPO,
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

     //code 23/6/2024
    //Lấy chi tiết mua hàng vận chuyển.
    const getChitiet_POfoDemanDTL = async ( data: any ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/getChitiet_POfoDemanDTL`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataGetChitiet_POfoDemanDTL: result.data.dataGetChitiet_POfoDemanDTL,
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

    // UD số ngày mua hàng
    //code 12/04/2024
    const UpdatePO_Material_day = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UpdatePO_Material_day', data, config);
                
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

    //code 09/4/2024
    //Lấy kế hoạch mua hàng theo 
    const getPO_Plan_shedule = async ( data: any ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/getPO_Plan_shedule`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPO_Plan_shedule: result.data.dataPO_Plan_shedule,
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
    
    // UP Yêu cầu xuất hàng cho khách hàn lên ERP
    //code 29/02/2024
    const UPDeNghiGiaoHang_ERP = async ( data: any ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UPDeNghiGiaoHang_ERP', data, config);
                
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
    
    // Hủy nghị giao hàng cho khách hàng
    // code 28/02/2024
    const huyDeNghiGiaoHang = async ( data: any ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/huyDeNghiGiaoHang', data, config);
                
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

    //code 28/2/2024
    //danh sách đề nghị xuất hàng của demand
    const getDeNghiXuatHang = async ( data: any ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/getDeNghiXuatHang`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataDelivers: result.data.dataDelivers,
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
    
    // Lập đề nghị giao hàng cho khách hàng
    // code 04/02/2024
    const DeNghiXuatHang = async ( data: any ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/DeNghiXuatHang', data, config);
                
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

    //code 08/2/2024
    //danh sách thành phẩm tồn kho
    const getThanhPham_Kho = async ( data: any) => {
        try {
            appStore.isLoading = true 
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/getThanhPham_Kho`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataThanhPham_Kho: result.data.dataThanhPham_Kho,
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

    //code 03/01/2024
    //lấy báo cáo báo giá của các nhà cung cấp
    const getReportBaoGia = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {
                params:data,
                
            }  
            var result = await axiosInstance.get(`po/getReportBaoGia`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataReportBaoGia: result.data.dataReportBaoGia,
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

    //code 01/02/2024
    //lấy danh sách báo giá cũ
    const getQoutePhase_Month = async ( data:{mouthQoute: string} ) => {
        try {
            appStore.isLoading = true 
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/getQoutePhase_Month`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataQoutePhase_Month: result.data.dataQoutePhase_Month
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
     // Duyệt Báo giá 
    // code 02/01/2024
    const duyetBaoGia = async ( data:any=null ) => {
        try {
            appStore.isLoading = true 
            let config = {
            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/duyetBaoGia', data, config);
                
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
    // Nghi nhận chọn giá nguyên liếu 
    // code 01/01/2024
    const setSelectQouteMaterial = async ( data:any=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/setSelectQouteMaterial', data, config);
                
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
    //code 28/12/2023
    //lấy thông tin so sánh giá của các nhà cung cấp
    const getCompairBaoGia = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {
                params:data,
            }  
            var result = await axiosInstance.get(`po/getCompairBaoGia`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataCompairBaoGia: result.data.dataCompairBaoGia,
                    ArrStrSupp:result.data.ArrStrSupp
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

    // Tạo Báo giá nguyên liếu theo nguyên liệu báo giá cũ 
    // code 26/12/2023
    const SetMaterials_QouteOld = async ( data: any) => {
        try {
            appStore.isLoading = true 
            let config = {
                // headers: {
                //     'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                // }
            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/SetMaterials_QouteOld', data, config);
                
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

    // Xóa báo giá nguyên liệu của nhà cung cấp
    // code 21/12/2023
    const DeleteBaoGiaNguyenLieu = async ( data: any ) => {
        try {
            appStore.isLoading = true 
            let config = {
                // headers: {
                //     'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                // }
            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/DeleteBaoGiaNguyenLieu', data, config);
                
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

    // Cập nhật báo giá nguyên liệu của nhà cung cấp
    // code 21/12/2023
    const UpDateMaterial_QouteDTL = async ( data: any ) => {
        try {
            appStore.isLoading = true 
            let config = {
                // headers: {
                //     'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                // }
            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UpDateMaterial_QouteDTL', data, config);
                
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

    // Chuyên trạng thái vận chuyên gói hàng từ hợp đồng về tạo gói vận chuyển
    // code 19/12/2023
    const UndoShipState_LapVeTao = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {
                // headers: {
                //     'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                // }
            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UndoShipState_LapVeTao', data, config);
                
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


    //code 19/12/2023
    //lấy chi tiết phiếu báo giá nhà cung cấp
    const getPriceQoutes_DTL = async ( data : any ) => {
        try {
            appStore.isLoading = true 
            let config = {
                params:data,
                // headers: {
                //     'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                // }
            }  
            var result = await axiosInstance.get(`po/getPriceQoutes_DTL`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPriceQoutes_DTL: result.data.dataPriceQoutes_DTL
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

      // Thêm báo giá nguyên liệu của nhà cung cấp
    // code 11/12/2023
    const SeveMaterial_QouteDTL = async ( data: any ) => {
        try {
            //console.log(data);
            appStore.isLoading = true 
            let config = {
                // headers: {
                //     'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                // }
            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/SeveMaterial_QouteDTL', data, config);
                
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

    //code 10/12/2023
    //lấy danh sách nguyên liệu cần báo giá
    const getMaterial_Qoute = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/getMaterial_Qoute`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMaterial_Qoute: result.data.dataMaterial_Qoute
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

     // Update Header báo giá của nhà cung cấp khi nhà cung cấp điền đầy dủ thông tin cho báo giá của mình
    // code 10/12/2023
    const UpdateQouteHDR = async ( data: any ) => {
        try {
            //console.log(data);
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.put('po/UpdateQouteHDR', data, config);
                
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

    //code 27/11/2023
    //lấy phương thức thanh toán
    const getdatalistPayTerms = async () => {
        try {
            appStore.isLoading = true 
            let config = {
                //params:data,
                // headers: {
                //     'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                // }
            }  
            var result = await axiosInstance.get(`po/getdatalistPayTerms`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    datalistPayTerms: result.data.datalistPayTerms
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


    //code 27/11/2023
    //lấy báo giá theo đợt báo giá theo nhà cung cấp
    const getdataQouteSuppliers = async ( data: any ) => {
        try {
            appStore.isLoading = true 
            let config = {
                params:data,
                // headers: {
                //     'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                // }
            }  
            var result = await axiosInstance.get(`po/getdataQouteSuppliers`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataQouteSuppliers: result.data.dataQouteSuppliers
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

    //code 26/11/2023
    //lấy danh sách báo giá theo đợt báo giá
    const getDataQouteHDRs = async ( data: any ) => {
        try {
            appStore.isLoading = true 
            let config = {
                params:data,

            }  
            var result = await axiosInstance.get(`po/getDataQouteHDRs`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPriceQoute_HDR: result.data.dataPriceQoute_HDR
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

     // tạo Header báo giá của nhà cung cấp
    // code 25/11/2023
    const addQouteCreateHDR = async ( data: any ) => {
        try {
            //console.log(data);
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/addQouteCreateHDR', data, config);
                
            appStore.setMessager(result.data.message)           
            if(result.data.status === 200) {     
                return {
                    ok: true,
                    PQH_ID: result.data.PQH_ID
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

        //code 17/01/2023
    //lấy danh sách nhà cung cấp nhà cung cấp
    const getListSuppliers = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }  
            var result = await axiosInstance.get(`po/getListSuppliers`, config);           
            
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataSuppliers: result.data.dataSuppliers
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


     // xóa linh kiện báo giáo chọn
    // code 24/11/2023
    const dele_Material_qoute = async ( data: any ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/dele_Material_qoute', data, config);
                
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

    // lưu nguyên liệu thiết lập
    // code 22/11/2023
    const SaveSetMaterial_Qoute = async ( data: any ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/SaveSetMaterial_Qoute', data, config);
                
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

     //lấy mô tả nguyên liệu theo mã nguyên liệu
    //code 21/11/2023
    const getPart_Description = async ( data: { PART_NUM: string } ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }
            var result = await axiosInstance.get('po/getPart_Description', config);
            
            //console.log(result.data); 
            
            let dataPart_Description:{ PART_NUM?: string }={}
            dataPart_Description.PART_NUM=data.PART_NUM
            if (result.data.dataPart_Description) {
                dataPart_Description= result.data.dataPart_Description[0]
                
            }
             //console.log(dataPart_Description, result.data.dataPart_Description);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataPart_Description: dataPart_Description
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
    // lấy danh sách nguyên liệu thiết lập phiếu báo giá
    //code 20/11/2023
    const getPDDMaterial_Qoute = async ( data:any) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getPDDMaterial_Qoute', config);
            
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
            
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

     // lưu nhà đợt báo giá
    // code 19/11/2023
    const AddPreiceQoute = async ( data: any ) => {
        appStore.isLoading = true 
        try {
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/AddPreiceQoute', data, config);
                
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

     // Lấy danh sách báo giá
    // code 19/11/2023
    const getDotbaogia = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getDotbaogia', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataQoutePhase: result.data.dataQoutePhase,
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

    // lưu nhà cung cấp
    // code 16/11/2023
    const SaveSupplie = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/SaveSupplie', data, config);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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
     // Lấy danh sách nhà cung cấp từ ERP
    // code 14/11/2023
    const getdataERPSuppliers = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getdataERPSuppliers', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataERPSuppliers: result.data.dataERPSuppliers,
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

     // Lấy danh sách nhà cung cấp
    // code 14/11/2023
    const getdataSuppliers = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getdataSuppliers', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataSuppliers: result.data.dataSuppliers,
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
     // đóng đợt vận chuyển
    // code 06/11/2023
    const DongShipHDR = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/DongShipHDR', data, config);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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

     // Lưu danh thông tin cho dòng nguyên liệu Detacode, lot.no theo Line PO 
    // code 30/09/2023
    const UpdateInforMaterial_IrlId = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UpdateInforMaterial_IrlId', data, config);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                    dataPrint: result.data.dataPrint,
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

     // Lấy thông tin in nhãn nguyên liệu 
    // code 10/8/2023
    const getInfoPrintLableMaterial = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getInfoPrintLableMaterial', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPrint: result.data.dataPrint,
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

    // Lấy thông tin về hợp đồng mua hàng theo Mã khách hàng
    // code 25/12/2022
    const getPOSuppl = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getPOSuppl', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPO_HDR: result.data.dataPO_HDR,
                    dataPO_DTL:result.data.dataPO_DTL
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

    // Lấy thông tin về hợp đồng mua hàng từ ERP theo Mã khách hàng
    // code 25/12/2022
    const getERPgetPOSuppl = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getERPgetPOSuppl', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPO_HDR: result.data.dataPO_HDR,
                    dataPO_DTL:result.data.dataPO_DTL
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

     // Lưu danh sác nguyên liệu excel theo PO 
    // code 13/07/2023
    const saveExcelPoDTL = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/saveExcelPoDTL', data, config);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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
    //Danh sách đợt vận chuyển đã nhận hàng cho   
    // code 04/07/2023
    const getShipHDR_Month = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }
            var result = await axiosInstance.get('po/getShipHDR_Month', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataShipHDR_Month:result.data.dataShipHDR_Month,

                }
            } else
            {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {

            throw 'getShipHDR_Month ' + error
        } finally {
            appStore.isLoading = false
        }
    }

     // Xóa đợt vận chuyển
    // code 25/06/2023
    const XoaShipHDR = async ( data=null ) => {
        try {
            appStore.isLoading = true 
            let config = {

            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/XoaShipHDR', data, config);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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
     // Danh sách nguyện liệu nhận vận chuyển  
    // code 16/06/2023
    const getRecItemPOShip = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,

            }
            var result = await axiosInstance.get('po/getRecItemPOShip', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataRecItemPOShip:result.data.dataRecItemPOShip,

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

     // cập nhật nhận nguyên liệu theo PO hàng mua
    // code 08/06/2023
    const UpdateNhanNL_PO = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UpdateNhanNL_PO', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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
    // cập nhật mã nguyên liệu SX cho hàng mua
    // code 05/06/2023
    const UpdateMATERIAL_CODE = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UpdateMATERIAL_CODE', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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
// bổ Sung tách số nguyên liệu vận chuyển của lô mua
    // code 05/06/2023
    const SeparationItemShipDTL = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/SeparationItemShipDTL', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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

    // Câp nhật thông tin Hai Quan cho vận chuyển 
    // code 27/03/2023
    const UpdateShipmentCustomInf = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/UpdateShipmentCustomInf', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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
    // bổ Sung tách Đợt vận chuyển
    // code 27/03/2023
    const SeparationShipHDL = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/SeparationShipHDL', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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

    // Xác nhận vận chuyển 
    // code 26/03/2023
    const XacNhanShipmentHDR = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/XacNhanShipmentHDR', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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

    // Câp nhật nguyên liệu cho vận chuyển 
    // code 26/03/2023
    const SetItem_POShip = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/SetItem_POShip', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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
    // Lấy danh sách nguyện liệu vận chuyển  
    // code 25/03/2023
    const getItemPOShip = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getItemPOShip', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataItemPOShip:result.data.dataItemPOShip,

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
    // Câp nhật nhận gói hàng
    // code 8/01/2023
    const SaveDeliverShipGoiHang = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/SaveDeliverShipGoiHang', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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
    // Câp nhật thông tin vận chuyển
    // code 30/12/2022
    const UpdateShipmentHDR = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.put('po/UpdateShipmentHDR', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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
    // Lưu vận đơn vận chuyển
    // code 30/12/2022
    const AddShipmentDTL = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/AddShipmentDTL', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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
     // Lấy danh sách vận đơn vận chuyển 
    // code 30/12/2022
    const getShipDTL = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getShipDTL', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,


                    error: null,
                    dataShipDTL:result.data.dataShipDTL,

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

    // Lấy danh sách đơn vận chuyển
    // code 29/12/2022
    const getShipHDR = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getShipHDR', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataShipHDRnew:result.data.dataShipHDRnew,
                    dataShipHDR:result.data.dataShipHDR
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
    // Lưu Chuyển hàng mua sang vận chuyển
    // code 29/12/2022
    const YeuCauVanChuyenHang = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/YeuCauVanChuyenHang', data);
                        
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
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

    // Lấy danh sách phiếu mua hàng cho nhu cầu của đợt SX
    // code 28/12/2022
    const getPhieuMuaHangOfDemand = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getPhieuMuaHangOfDemand', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPO_HDRs: result.data.dataPO_HDRs,
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
    // Lưu mua hàng
    // code 26/12/2022
    const SaveMuaHang = async ( data=null ) => {
        try {
            appStore.isLoading = true           
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('po/SaveMuaHang', data);
                        
            if(result.data.status === 200) {       
                appStore.setMessager(result.data.message)
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

    // Lấy thông tin về hợp đồng mua hàng từ ERP
    // code 25/12/2022
    const getERPgetPOMuaHang = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getERPgetPOMuaHang', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPO_HDR: result.data.dataPO_HDR,
                    dataPO_DTL:result.data.dataPO_DTL
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

    // Lấy thông tin về hợp đồng mua hàng
    // code 25/12/2022
    const getPOMuahang = async ( data=null ) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('po/getPOMuahang', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataPO_HDR: result.data.dataPO_HDR,
                    dataPO_DTL:result.data.dataPO_DTL
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
       

    return {
        getPO_Plan_shedule,
        getMaterialOpenPO,
        getThanhPham_Kho,
        DeNghiXuatHang,
        getDeNghiXuatHang,
        huyDeNghiGiaoHang,
        UPDeNghiGiaoHang_ERP,
        getPQP_LIST,
        getChitiet_POfoDemanDTL,
        duyetBaoGia,
        getAllDTLQoute,
        getQoute_Material_Price,
        LuuChonBaoGia,
        SeveMaterial_QouteDTL,
        SetMaterials_QouteOld,
        DeleteBaoGiaNguyenLieu,
        UpDateMaterial_QouteDTL,
        getdatalistPayTerms,
        getdataQouteSuppliers,
        UpdateQouteDTLFromExcel,
        // SendMail_QouteSup,
        getPriceQoutes_DTL,
        getMaterialReqDemands_dtl,
        dele_Material_qoute,
        SaveSetMaterial_Qoute,
        getPart_Description,
        getPDDMaterial_Qoute,
        getListSuppliers,
        getDataQouteHDRs,
        addQouteCreateHDR,
        UpdateQouteHDR,
        updateGiaoviecThucHienBao,
        getUserBuyer,
        deleteDotbaogia,
        getQoutePhase_Month,
        AddPreiceQoute,
        getDotbaogia,
        getERPgetPOMuaHang,
        getPOMuahang
    }
})