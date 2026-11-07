import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'

import { useAppStore } from '@/stores/app.store'


export const useInvStore = defineStore('inv',() => {
  const appStore = useAppStore()

//code 27/06/2026
// Danh sách vị trị(Fix Position) của Zone
const getFixPosition_Zone = async ( data=null) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getFixPosition_Zone', config);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataFixPosition: result.data.dataFixPosition
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
    throw error
    } finally {
        appStore.isLoading = false
    }
}

//code 16/04/2026
// trả lại trạng thái chưa giao hàng cho phiếu giao đã được ghi nhận nhưng không giao cho sản xuất
const Return_DeliverStatus = async (data: any) => {
    appStore.isLoading = true 
    let config = {

    }
    try {
        var result = await axiosInstance.post('inv/Return_DeliverStatus', data, config);
        appStore.setMessager(result.data.message)
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                message: result.data.message
            }
        } else
        {            
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

//code 16/03/2026
// lấy danh sách các vùng biến động chưa gắn vị trí cố định
const getPODITION_NULL = async (data=null) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getPODITION_NULL', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataPODITION_NULL: result.data.dataPODITION_NULL
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

//code 16/03/2026
// Cập nhật thông tin vùng kho cố định
const updateFixPosition = async (data: any) => {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        headers: {
            
        }
    }
    try {
        var result = await axiosInstance.post('inv/updateFixPosition',data,config);
        appStore.setMessager(result.data.message)
        if(result.data.status === 200) {
            //console.log(result.data)
            //commit('SET_MESSAGER', result.data.message);
            
            return {
                ok: true,
                error: null,
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
    } catch(error) {
    throw error
    } finally {
        appStore.isLoading = false
    }
}

//code 16/03/2026
// lấy danh sách các vùng kho cố định
const getFixStores = async (data=null) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getFixStores', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataFixStores: result.data.dataFixStores
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}
    // Tạo phiếu hoàn kho nguyên liệu sản xuất
    //code 30/01/2026
const taoPhieuNhapKho = async (data: any) => {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        headers: {
        }
    }
    try {
        var result = await axiosInstance.post('inv/taoPhieuNhapKho',data,config);
        appStore.setMessager(result.data.message)
        if(result.data.status === 200) {
            //console.log(result.data)
            //commit('SET_MESSAGER', result.data.message);
            
            return {
                ok: true,
                error: null,
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
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    //code 30/12/2025
    // lấy danh chi tiết vật tư nhận hàng theo phiếu giao hiện hành
const getItemPhieuNhapMavattu = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getItemPhieuNhapMavattu', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataItemPhieuNhapMavattu: result.data.dataItemPhieuNhapMavattu
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /* Xóa phiếu Nhận khi không có nguyên liệu giao nhân. */
   //code 30/12/2025
const deletePhieuNhap = async (data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post('inv/deletePhieuNhap', data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    } 
}
        // Lấy phiếu nhận vật tư từ ERP
   //code 23/12/2025
const ERPgetRECEIVED = async (IRH_CODE: string) => {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        params:{
            IRH_CODE: IRH_CODE
        },
        headers: {
           }
    }
    try {
        var result = await axiosInstance.get('inv/ERPgetRECEIVED', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                ObRECEIVED: result.data.ObRECEIVED
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

//code 22/12/2025
    // lấy danh Phiếu đề nghị nhận hàng đã xử lý xong
const getReceiveHDR_DaGiao = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
        headers: {
            
        }
    }
    try {
        var result = await axiosInstance.get('inv/getReceiveHDR_DaGiao', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataReceiveHDR_DaGiao: result.data.dataReceiveHDR_DaGiao
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

//code 18/12/2025
    // lấy danh Phiếu nhận hàng đã xử lý xong
const getReceiveHDRs = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
        headers: {
          
        }
    }
    try {
        var result = await axiosInstance.get('inv/getReceiveHDRs', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataReceiveHDRs: result.data.dataReceiveHDRs
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

//code 22/11/2025
// lấy hàng tồn tại vị trí có thay đổi thực xuất
const getQtyItemPosition = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getQtyItemPosition', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                Qty: result.data.Qty
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}
    //code 22/11/2025
    // lấy danh sách vị trí có thay đổi thực nhận
const getPosition_changeThucNhan = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getPosition_changeThucNhan', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                Arr_Position_changeThucXuat: result.data.Arr_Position_changeThucXuat
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

        //code 6/08/2025
    // lấy danh chi tiết vật tư giao hàng theo đề nghị xuất với phiếu giao hiện hành
const getItemPhieuGiaoMavattu_Require = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getItemPhieuGiaoMavattu_Require', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataItemPhieuGiaoMavattu: result.data.dataItemPhieuGiaoMavattu
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

 // Lấp phiếu giao vật tư từ nhiều đề nghị nguyên liệu SX
   //code 31/07/2025
const TaoPhieuXuatNL_SX = async (data: any) => {
    //console.log(IDH_CODE );
    appStore.isLoading = true 
    let config = {
        params:data
    }
    try {
        var result = await axiosInstance.post('inv/TaoPhieuXuatNL_SX', data);
        //console.log(result.data);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                checkPhieuXuat:result.data.checkPhieuXuat, // 0 không có phiếu xuất; 1: đã ghi phiếu xuất
                ObDELIVER: result.data.ObDELIVER
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    // Lấy phiếu giao vật tư 
   //code 26/07/2025
const getObDELIVER = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data
    }
    try {
        var result = await axiosInstance.get('inv/getObDELIVER', config);
        //console.log(result.data);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                checkPhieuXuat:result.data.checkPhieuXuat, // 0 không có phiếu xuất; 1: đã ghi phiếu xuất
                ObDELIVER: result.data.ObDELIVER
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /*Lấy vật tư tồn kho cho VT chọn xuất (đặt hàng xuất) 
     danh sách nguyên liệu này được chọn để xác nhận đặt hàng giao cho phiếu xuất 
    */
   //code 18/07/2025
const getItemINV_PART = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
        headers: {
        }
    }
    try {
        var result = await axiosInstance.get('inv/getItemINV_PART', config);
        //console.log(result.data);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataItemINV:result.data.dataItemINV,
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}


  /* Lấy  phiếu đề nghị xuất */
   //code 016/07/2025
const getHDRDeNghiXuat = async (data: any) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('inv/getHDRDeNghiXuat', config);
            //console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    dataHDRDeNghiXuat: result.data.dataHDRDeNghiXuat
                }
            } else
            {         
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    /* Đồng bộ nguyên liệu giao theo Yêu cầu NL lên ERP.*/
   //code 06/07/2025
const UpNLDeNghiXuatLenERP = async (data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post('inv/UpNLDeNghiXuatLenERP', data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}
     /* Thiết lập trạng thái In của phiếu đề nghị xuất */
   //code 05/07/2025
const setPrintPhieuGiaoNLSX = async (data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post(`inv/setPrintPhieuGiaoNLSX`, data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}
    // Lấy danh sách nguyên liệu cần xuất của nhu cầu  nguyên liệu  cho Sản xuất
    //code 02/07/2025    
const getMaterialDeNghiXuat = async (data: any) => {
        appStore.isLoading = true 
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('inv/getMaterialDeNghiXuat', config);
            //console.log(result.data); 
            if(result.data.status === 200) {
                return {
                    ok: true,
                    dataMaterial_xuat: result.data.dataMaterial_xuat
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

    // Lấy phiếu giao vật tư từ đề nghị nguyên liệu SX
   //code 28/06/2025
const PhieuGiaoVatTu_YCXuatNL = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data
    }
    try {
        var result = await axiosInstance.get('inv/PhieuGiaoVatTu_YCXuatNL', config);
        //console.log(result.data);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                checkPhieuXuat:result.data.checkPhieuXuat, // 0 không có phiếu xuất; 1: đã ghi phiếu xuất
                ObDELIVER: result.data.ObDELIVER
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    //code 04/04/2025
    // lấy loại kho.
const getType_STORE = async (data: any) => {
        appStore.isLoading = true 
    
        try {
            const config = { params: data }; // Khởi tạo config cho request
            const { data: result } = await axiosInstance.get('inv/getType_STORE', config);
        
            if (result.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataType_STORE: result.dataType_STORE,
                };
            }
    
            // Xử lý trường hợp lỗi từ API
            appStore.setMsgErro(result.error || 'Lỗi không xác định');
            return { ok: false };
        } catch (error) {
            // Xử lý lỗi hệ thống
            appStore.setMsgErro('Lỗi hệ thống, vui lòng liên hệ quản trị viên');
            throw error
        } finally {
            appStore.isLoading = false
        }
}
    //code 08/10/2024
    // lấy số tồn kho của nguyên liệu.
const getStoc_PartNum = async (data: any) => {
        appStore.isLoading = true 
        let config = {
            params:data,
            headers: {
                
            }
        }
        try {
            var result = await axiosInstance.get('inv/getStoc_PartNum', config);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataStocPart_num: result.data.dataStocPart_num
                }
            } else
            {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                }
            }
        } catch(error) {
            appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    /* Xác Nhận giao nhận hàng giữa kho và Bên nhân */
   //code 03/07/2024
const PhieuGiao_XacNhanKho = async (data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post(`inv/PhieuGiao_XacNhanKho`, data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
   }   

    /* Trả lại nguyên liệu giao */
   //code 23/04/2024
const SaveReturn_PartNum = async (data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post('inv/SaveReturn_PartNum', data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}   

    //code 23/04/2024
    // lấy số lượng nguyên liệu hoàn trả.
const getReturnNum_PartNum = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
        headers: {
           
        }
    }
    try {
        var result = await axiosInstance.get('inv/getReturnNum_PartNum', config);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                Num_return_partNum: result.data.Num_return_partNum
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

//code 01/02/2024
    // lấy danh Phiếu nhận hàng đã xử lý xong theo tháng
const getReceivedHDR = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
        headers: {
            
        }
    }
    try {
        var result = await axiosInstance.get('inv/getReceivedHDR', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataReceivedHDR: result.data.dataReceivedHDR
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /* Xác nhận nhận nguyên liệu giao */
   //code 16/12/2023
const ReceivedVatu = async (data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post('inv/ReceivedVatu', data);

        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
   }   

      /* Xóa phiếu giao khi không có nguyên liệu giao nhân. */
   //code 08/11/2023
const deletePhieuGiao = async (data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post('inv/deletePhieuGiao', data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}   

    //code 18/10/2023
    // lấy danh Phiếu giao hàng đã xử lý xong
const getDeliverHDR_DaXL = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
        headers: {

        }
    }
    try {
        var result = await axiosInstance.get('inv/getDeliverHDR_DaXL', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataDeliverHDR_DaXL: result.data.dataDeliverHDR_DaXL
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    //code 02/08/2023
    //lấy danh sách nguyên liệu tồn tại kho của dự án
const getMateralPositionProject_INV = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
        headers: {

        }
    }
    try {
        var result = await axiosInstance.get('inv/getMateralPositionProject_INV', config)
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataMateralPositionProject_INV: result.data.dataMateralPositionProject_INV
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

   /* Set Item nguyên liệu lỗi tốt*/
   //code 20/07/2023
const SetErrItem = async (data: any) => {
    //console.log('SetErrItem',data);
    appStore.isLoading = true     
    try {
        let config = {
            headers: {
                
            }
        }
        var result = await axiosInstance.post('inv/SetErrItem',data, config);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                idmessage: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    //code 19/07/2023
    //lấy danh mục hàng trong kho theo Part_num theo vị trí
const getItemLineINVPos = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
        headers: {
         
        }
    }
    try {
        var result = await axiosInstance.get('inv/getItemLineINVPos', config)
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataItemLinePosition: result.data.dataItemLinePosition
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}
    /* Xóa dòng cuối trong thẻ kho*/
   //code 27/06/2023
const XoaLineEndTheKhoPosition = async ( data: any ) => {
    //console.log('XoaLineEndTheKhoPosition',data);
    appStore.isLoading = true     
    try {
        var result = await axiosInstance.post('inv/XoaLineEndTheKhoPosition',data);

        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                idmessage: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}
    //code 20/06/2023
    //lấy danh thông tin nguyên liệu nhà sản xuất theo dự án
const getMaterialOfManufactorer_Proj = async ( data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getMaterialOfManufactorer_Proj', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataMaterialOfManufactorer_Proj: result.data.dataMaterialOfManufactorer_Proj
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

    //code 19/06/2023
    // lấy danh thông tin chi tiết vật tư 
const getPartNum = async ( data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getPartNum', config);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                itemPartNum: result.data.itemPartNum
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //code 16/06/2023
    // lấy danh chi tiết vật tư mua hàng theo PO
const getQtyItemPO = async ( data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getQtyItemPO', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataQtyItemPO: result.data.dataQtyItemPO
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
    }

    //code 6/05/2023
    // lấy danh chi tiết vật tư Phiếu giao hàng
const getItemPhieuGiaoMavattu = async ( data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getItemPhieuGiaoMavattu', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataItemPhieuGiaoMavattu: result.data.dataItemPhieuGiaoMavattu
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

    //code 5/05/2023
    // lấy danh Phiếu giao hàng chưa nhận
const getDeliverHDR = async ( data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getDeliverHDR', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataDeliverHDR: result.data.dataDeliverHDR
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}
    //code 15/04/2023
    // lấy danh sách nguyên liệu tồn kho theo Bom
const getMateralProject_INV = async ( data: any) => {
        appStore.isLoading = true 
        let config = {
            params:data,
        }
        try {
            var result = await axiosInstance.get('inv/getMateralProject_INV', config);

            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataMateralProject_INV: result.data.dataMateralProject_INV
                }
            } else
            {
                appStore.setMsgErro(result.data.error)
                return {
                    ok: false,
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
}

    //code 9/03/2023
    // lấy danh sách 10 dòng mới nhất của thẻ kho
const getThekho10Line = async ( data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getThekho10Line', config);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataINVMaterials: result.data.dataINVMaterials
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}
     /* Chuyển đổi trạng thái của dòng nguyên liệu để có thể sắp xếp lại hoặc chuyển sang đã Sắp xếp*/
   //code 05/12/2022
 const ChangeStatusItemPosition = async ( data: any) => {
    //console.log(data);
    appStore.isLoading = true 
    
    try {
        var result = await axiosInstance.post('inv/ChangeStatusItemPosition',data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                idmessage: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

    /* Xóa dòng nhập sắp Order nguyên liệu 
*/
   //code 02/12/2022
const XoaRowvattuGiao = async ( data: any) => {
    //console.log(data);
    appStore.isLoading = true 
    
    try {
        var result = await axiosInstance.post('inv/XoaRowvattuGiao',data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                idmessage: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

    /* Đồng bộ nguyên liệu nhận lên ERP.
    */
   //code 27/11/2022
const saveDongBoRECEIVED_ERP = async ( data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post('inv/saveDongBoRECEIVED_ERP', data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /* Xác nhận đa nhận nguyên liệu.
    */
   //code 27/11/2022
const saveXacNhanRECEIVED = async ( data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post('inv/saveXacNhanRECEIVED', data);
        if(result.data.status === 200) {
            //console.log(result.data)
            
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /* Đồng bộ nguyên liệu giao lên ERP.
    */
   //code 25/11/2022
const saveDongBoDeliver_ERP = async ( data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post('inv/saveDongBoDeliver_ERP', data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /* Xác nhận đa giao nguyên liệu.
    */
   //code 20/11/2022
const saveXacNhanDeliver = async ( data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post('inv/saveXacNhanDeliver', data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}    

    /* kiểm tra phiếu xuất đã 
    */
   //code 10/11/2022
const CheckPhieuXuatNguyenLieu = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/CheckPhieuXuatNguyenLieu', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                arr_POSITION_CODE: result.data.arr_POSITION_CODE
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
       throw error
        } finally {
            appStore.isLoading = false
        }
}
    
    // đặt lập nguyên liệu giao 
   //code 13/11/2022
const SetVatTuGiaoTheoPhieuGiao = async (data: any) => {
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post('inv/SetVatTuGiaoTheoPhieuGiao',data);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                message: result.data.message,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}    

    //thiết lập xác nhận nguyên liệu đã được sắp xếp trong kho
   //code 12/11/2022
const setXacNhanSapXep = async (data: any) => {
 appStore.isLoading = true 
 try {
     var result = await axiosInstance.post('inv/setXacNhanSapXep',data);
     if(result.data.status === 200) {
         //console.log(result.data)
         appStore.setMessager(result.data.message)
         return {
             ok: true,
             message: result.data.message,
             error: null,
         }
     } else
     {
         appStore.setMsgErro(result.data.message)
         return {
             ok: false,
             error: result.data.error,
             message:result.data.error
         }
     }
 } catch(error) {
     throw error
 } finally {
     appStore.isLoading = false;
 }
}    


    /* lấy danh sách vị trí của nguyên liệu hiện t
    */
   //code 10/11/2022
const getDataPOSITION_CODE_PARTNUM = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getDataPOSITION_CODE_PARTNUM', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                arr_POSITION_CODE: result.data.arr_POSITION_CODE
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

     /* Lấy phiếu nhận vật tư giao
    */
   //code 19/09/2022
const GetDockingVattu = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/GetDockingVattu', config);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataSelectItem: result.data.dataSelectItem
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    }
}

  //Lưu ý: Hàng Nhập kệ kho
   //code 16/9/2022
const LuuNhaphang_OKe = async (data: any) => {
    //console.log(data);
 appStore.isLoading = true 
 try {
     var result = await axiosInstance.post('inv/LuuNhaphang_OKe',data);
     if(result.data.status === 200) {
         //console.log(result.data)
         appStore.setMessager(result.data.message)
         return {
             ok: true,
             message: result.data.message,
             error: null,
         }
     } else
     {
         appStore.setMsgErro(result.data.message)
         return {
             ok: false,
             error: result.data.error,
             message:result.data.error
         }
     }
 } catch(error) {
     throw error
} finally {
    appStore.isLoading = false
}
}

   //Lưu ý: Hàng xuất kho
   //code 16/9/2022
const LuuXuathang_OKe = async (data: any) => {
    //console.log(data);
 appStore.isLoading = true 
 try {
     var result = await axiosInstance.post('inv/LuuXuathang_OKe',data);
     if(result.data.status === 200) {
         //console.log(result.data)
         appStore.setMessager(result.data.message)
         return {
             ok: true,
             message: result.data.message.split(":")[0],
             error: null,
         }
     } else
     {
         appStore.setMsgErro(result.data.message)
         return {
             ok: false,
             error: result.data.error,
             message:result.data.error
         }
     }
 } catch(error) {
     throw error
} finally {
    appStore.isLoading = false
}
}
 

     /* Lấy mã nguyên trên Position vị trí
    */
   //code 4/07/2022
const getItem_IN_Position = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getItem_IN_Position', config);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataSelectItem: result.data.dataSelectItem
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}
    /* Lấy thông tin Thẻ kho
    */
   //code 4/07/2022
const getThekho = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getThekho', config);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataINVMaterials: result.data.dataINVMaterials
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}
    /* Lấy số vật tư đã được chọn giao 
    */
   //code 4/06/2022
const getQUANTITY_VatTuChonGiao = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('inv/getQUANTITY_VatTuChonGiao', config);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataQUANTITY_VatTuChonGiao: result.data.dataQUANTITY_VatTuChonGiao
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /*Lấy danh thông tin mã soạn hàng 
    */
   //code 11/03/2022
const getOderPreparationIVN = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data
    }
    try {
        var result = await axiosInstance.get('inv/getOderPreparationIVN', config);
        //console.log(result.data);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataOrderPreparationINV:result.data.dataOrderPreparationINV,
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

 /* Chuyển vật tư sang  
    Lưu ý: chỉ xóa nếu dòng đó là dòng nhập cuối cùng của vị trí của hiện tại
*/
   //code 09/03/2022
const setChuyenViTriVatTu = async (data: any) => {
       //console.log(data);
    appStore.isLoading = true 
    try {
        var result = await axiosInstance.post('inv/setChuyenViTriVatTu',data);

        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            
            return {
                ok: true,
                message: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}
    
 /*Lấy danh sách vật tư theo khu vực 
     danh sách nguyên liệu này dùng chuyển vị trí 
    */
   //code 9/03/2022
 const getItemINVTheoMaKhuVuc = async (code_area: any) => {
    appStore.isLoading = true 
    let config = {
        params:{
            code_area:code_area
        }
    }
    try {
        var result = await axiosInstance.get('inv/getItemINVTheoMaKhuVuc', config);
        //console.log(result.data);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataItemINV:result.data.dataItemINV,
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

 /* Xóa dòng nhập sắp xếp bị sai 
    Lưu ý: chỉ xóa nếu dòng đó là dòng nhập cuối cùng của vị trí của hiện tại
*/
   //code 22/22/2022
const XoaRowvattuDocking = async (id: any) => {
    console.log(id);
    appStore.isLoading = true 
    
    try {
        var result = await axiosInstance.post('inv/XoaRowvattuDocking',{id:id});
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                idmessage: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /*Lấy vật tư tồn tại các vị trí theo mã 'kho, kệ, tầng Ô) 
    */
   //code 11/02/2022
const searchINVTonTheoMaKhuVuc = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data
    }
    try {
        var result = await axiosInstance.get('inv/searchINVTonTheoMaKhuVuc', config);
        console.log(result.data);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataItemINV:result.data.dataItemINV,
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    // Update mã Phiếu giao ERP cho các Vật tư đặt giao(cập nhật lại mã ERP khi đổi mã giao ERP)
   //code 19/01/2022
const UpdateERPCodeDeliverItemINV_Order = async (dataParaERPCodeDeliverItemINV_Order: any) => {
    //console.log(dataParaERPCodeDeliverItemINV_Order);
    appStore.isLoading = true 
    let config = {
        headers: {
        }
    }
    try {
        var result = await axiosInstance.post('inv/UpdateERPCodeDeliverItemINV_Order',dataParaERPCodeDeliverItemINV_Order, config);
        if(result.data.status === 200) {
            console.log(result.data)
            
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                idmessage: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}


    // Lưu Trạng thái của các vật tư  đã chọn giao sang trạng thái đã Giao
   //code 19/01/2022
const saveDeliverItemINV_Order = async (dataParaDeliverItemINV_Order: any) => {
    //console.log(dataParaDeliverItemINV_Order);
    appStore.isLoading = true 
    let config = {
        headers: {
            
        }
    }
    try {
        var result = await axiosInstance.post('inv/saveDeliverItemINV_Order',dataParaDeliverItemINV_Order, config);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            
            return {
                ok: true,
                idmessage: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

     /*Lấy DS vật tư đã chọn xuất (đặt hàng xuất) 
     danh sách vật tư này đã được chon để xuất kho.
    */
   //code 19/01/2022
const getOrderItemINV = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data
    }
    try {
        var result = await axiosInstance.get('inv/getOrderItemINV', config);
        //console.log(result.data);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataOrderItemINV:result.data.dataOrderItemINV,
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

// Lưu đặt giao vật tư 
   //code 18/01/2022
const setOrderVattu = async (dataOrderVatTu: any) => {
    //console.log(dataOrderVatTu);
    appStore.isLoading = true 
    let config = {
        headers: {
            
        }
    }
    try {
        var result = await axiosInstance.post('inv/setOrderVattu',dataOrderVatTu,config);
        if(result.data.status === 200) {
            console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                idmessage: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /*Lấy vật tư cho chọn xuất (đặt hàng xuất) 
     danh sách nguyên liệu này được chọn để xác nhận đặt hàng giao cho phiếu xuất 
    */
   //code 18/01/2022
const getItemINV = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
        headers: {
            }
    }
    try {
        var result = await axiosInstance.get('inv/getItemINV', config);
        //console.log(result.data);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataItemINV:result.data.dataItemINV,
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}
// Lưu vật tư theo vị trí sắp xếp tại kho
   //code 16/01/2022
const SavevattuDocking = async (dataVatTuDocking: any) => {
   //console.log(dataVatTuDocking);
    appStore.isLoading = true 
    let config = {
        headers: {
            
        }
    }
    try {
        var result = await axiosInstance.post('inv/SavevattuDocking',dataVatTuDocking, config);

        if(result.data.status === 200) {
            console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                idmessage: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /*Lấy danh sác vị trị Kệ, tầng, ô */
   //code 14/01/2022
const getPositionBase = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
        headers: {
            
        }
    }
    try {
        var result = await axiosInstance.get('inv/getPositionBase', config);
        //console.log(result.data);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                datake:result.data.datake,
                datatang:result.data.datatang,
                dataO: result.data.dataO
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /* Lấy vật tư nhập trong kho đã được sắp xếp từ các các tập vật tư được nhận chưa được sắp sếp
         
    */
   //code 14/01/2022
const getItemDocking = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data
    }
    try {
        var result = await axiosInstance.get('inv/getItemDocking', config);
        //console.log(result.data);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataItemDocking: result.data.dataItemDocking
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    /* Lấy vật tư nhập trong kho chưa thực hiện sắp xếp 
         
    */
   //code 14/01/2022
const getItemPositionDocking = async (STO_CODE: string) => {
    appStore.isLoading = true 
    let config = {
        params:{
            STO_CODE:STO_CODE
        },
        headers: {
              }
    }
    try {
        var result = await axiosInstance.get('inv/getItemPositionDocking', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataItemPositionDocking: result.data.dataItemPositionDocking
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}
    /* Lấy số dư vật tư trong kho cho các mã nguyên liệu 
            +( đồng bộ cho mã Vt lấy về từ ERP
    */
   //code 12/01/2022
const getUpdateBALANCE_QUANTITY_Item = async (data: any) => {
    appStore.isLoading = true 
    let config = {
        params:data,
        headers: {
           
        }
    }
    try {
        var result = await axiosInstance.get('inv/getUpdateBALANCE_QUANTITY_Item', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataBALANCE_QUANTITY_Item: result.data.dataBALANCE_QUANTITY_Item
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    // Lưu vật tư giao kho theo hóa đơn
   //code 06/01/2022
const SaveVatTuGiao = async (dataVatTu: any) => {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        headers: {
        }
    }
    try {
        var result = await axiosInstance.post('inv/SaveVatTuGiao',dataVatTu, config);

        if(result.data.status === 200) {
           // console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                idmessage: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

    // Lưu phiếu giao kho theo hóa đơn
   //code 07/01/2022
const SavePhieuGiaoVatTu = async (dataPhieugiao: any) => {
    appStore.isLoading = true 
    let config = {
        headers: {
             }
    }
    try {
        var result = await axiosInstance.post('inv/SavePhieuGiaoVatTu',dataPhieugiao, config);

        if(result.data.status === 200) {
            console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

   // Lấy phiếu giao vật tư từ ERP
   //code 11/01/2022
const ERPgetObDELIVER = async (IDH_CODE: any) => {
    //console.log(IDH_CODE );
    appStore.isLoading = true 
    let config = {
        params:{
            IDH_CODE: IDH_CODE
        }
    }
    try {
        var result = await axiosInstance.get('inv/ERPgetObDELIVER', config);
        //console.log(result.data);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                checkPhieuXuat:result.data.checkPhieuXuat, // 0 không có phiếu xuất; 1: đã ghi phiếu xuất
                ObDELIVER: result.data.ObDELIVER
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}
   // Lấy phiếu Giao vật tư
   //code 10/12/2021
const getObPhieuGiaoMavattu = async (IDH_CODE: any) => {
    appStore.isLoading = true 
    let config = {
        params:{
            IDH_CODE: IDH_CODE
        },
    }
    try {
        var result = await axiosInstance.get('inv/getObPhieuGiaoMavattu', config);
 
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                ObDELIVER: result.data.ObDELIVER
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Lưu phiếu nhập kho theo hóa đơn
   //code 07/01/2022
const SavePhieuNhanVatTu = async (dataPhieunhap: any) => {
    appStore.isLoading = true 
    let config = {
        headers: {
               }
    }
    try {
        const payload = JSON.stringify(dataPhieunhap);
        //console.log(payload.length);
        
        var result = await axiosInstance.post('inv/SavePhieuNhanVatTu',dataPhieunhap, config);
        if(result.data.status === 200) {
            console.log(result.data)
            appStore.setMessager(result.data.message)
            return {
                ok: true,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}


    // Lưu vật tư nhập kho theo hóa đơn
   //code 06/01/2022
const SaveVatTuNhap = async ( dataVatTu: any ) => {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        headers: {
            
        }
    }
    try {
        var result = await axiosInstance.post('inv/SaveVatTuNhap',dataVatTu, config);

        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMessager(result.data.message)
            //console.log(result.data.message.split(":")[0]);
            return {
                ok: true,
                idmessage: result.data.message.split(":")[0],
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message)
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

    // Lấy phiếu nhận vật tư từ ERP
   //code 05/12/2021
const ERPgetObReceived = async ( IRH_CODE: any ) => {
    //console.log(IRH_CODE );
    appStore.isLoading = true 
    let config = {
        params:{
            IRH_CODE: IRH_CODE
        },
    }
    try {
        var result = await axiosInstance.get('inv/ERPgetObReceived', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                ObRECEIVED: result.data.ObRECEIVED
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

    // Lấy phiếu nhận vật tư
   //code 05/12/2021
const getObPhieuNhanMavattu = async ( IRH_CODE: any ) => {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        params:{
            IRH_CODE: IRH_CODE
        },
        headers: {
            }
    }
    try {
        var result = await axiosInstance.get('inv/getObPhieuNhanMavattu', config);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                ObRECEIVED: result.data.ObRECEIVED
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        appStore.setMsgErro('Lỗi Hệ thống xin liên hệ quản trị viên')
        throw error
        } finally {
            appStore.isLoading = false
        }

}

    // Cập nhật kho ERP
   //code 01/01/2022
const ERPUpdateKho = async ( dataStore: any ) => {
    appStore.isLoading = true 
    let config = {
        headers: {
           }
    }
    try {
        var result = await axiosInstance.post('inv/ERPUpdateKho',dataStore, config);
        if(result.data.status === 200) {
            console.log(result.data)

            appStore.setMessager(result.data.message)
            return {
                ok: true,
                error: null,
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
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}
   
    // Lấy danh sách kho từ Store
   //code 31/12/2021
const getStores = async () => {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        headers: {
            }
    }
    try {
        var result = await axiosInstance.get('inv/getStores', config);
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataStores: result.data.dataStores
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {

        throw error
    } finally {
        appStore.isLoading = false
    }
}

   // Lấy danh sách kho từ ERP 
   //code 27/12/2021
const ERPgetStore = async () => {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        headers: {
        }
    }
    try {
        var result = await axiosInstance.get('inv/ERPgetStore', config);

        if(result.data.status === 200) {
            
            return {
                ok: true,
                error: null,
                dataStores: result.data.dataStores
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

// Lấy thông tin quản lý kho của Part Num 
   //code 21/12/2021
const searchPartNum = async (partNum: string ) => {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        params:{
            partNum: partNum
        },
        headers: {
            }
    }
    try {
        var result = await axiosInstance.get('inv/searchPartNum', config);

        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                infoParNum: result.data.infoParNum
            }
        } else
        {
            appStore.setMsgErro(result.data.error)
            return {
                ok: false,
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}
   
     // Lập danh sách chi tiết thẻ giao  
   //code 15/10/2021
const getListDeliverCard_DTL = async (cardId: any )=> {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        params:{
            cardId: cardId
        },
        headers: {
           }
    }
    try {
        var result = await axiosInstance.get('inv/getListDeliverCard_DTL', config);

        if(result.data.status === 200) {
            console.log(result.data)
            appStore.setMsgErro(result.data.message);
            return {
                ok: true,
                error: null,
                deliverCardItems: result.data.deliverCardItems
            }
        } else
        {
            appStore.setMsgErro(result.data.message);
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

    // Lập danh sách thẻ giao đến của bộ phận chưa có người nhận 
   //code 14/10/2021
const getListDeliverCard = async (departMenID: string ) => {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        params:{
            departMenID: departMenID
        },
        headers: {
          }
    }
    try {
        var result = await axiosInstance.get('inv/getListDeliverCard', config);
        if(result.data.status === 200) {
            //console.log(result.data)
            appStore.setMsgErro(result.data.message);
            return {
                ok: true,
                error: null,
                dataListDeliverCard: result.data.dataListDeliverCard
            }
        } else
        {
            appStore.setMsgErro(result.data.message);
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

    // Lập phiếu giao hàng giữa các bộ phận 
   //code 10/10/2021
const saveDeliverItem = async ( dataDeliverDTLItem : any ) => {
    // console.log(dataProductRepair);
    appStore.isLoading = true 
    let config = {
        headers: {
            }
    }
    try {
        var result = await axiosInstance.post('inv/saveDeliverItem',dataDeliverDTLItem, config);

        if(result.data.status === 200) {
            console.log(result.data)
            appStore.setMsgErro(result.data.message);
            return {
                ok: true,
                error: null,
            }
        } else
        {
            appStore.setMsgErro(result.data.message);
            return {
                ok: false,
                error: result.data.error,
                message:result.data.error
            }
        }
    } catch(error) {
        throw error
        } finally {
            appStore.isLoading = false
        }
}

    // Lấy thông tin chi tiết Thùng chứa
    //code 10/10/2021
const getContainerInfo = async ( data : any ) => {
        appStore.isLoading = true 
        let config = {
            params: {
                containerId:data,
            },
            headers: {
                    }
        }
        try {
            var result = await axiosInstance.get('inv/getContainerInfo', config);
            //console.log(result.data.dataSlotLoaderMaterial);

            if(result.data.status === 200) {
                //commit('SET_MESSAGER', result.data.message);
                return {
                    ok: true,
                    error: null,
                    dataContainerInfo: result.data.dataContainerInfo
                }
            } else
            {
                appStore.setMsgErro(result.data.message);
                return {
                    ok: false,
                    error: result.data.error,
                    message:result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
}

     // Lấy thông tin chi tiết vật liệu xuất của thẻ xuất
    //code 10/10/2021
const getDeliverCardDTLInfo = async ( data : any ) => {
        appStore.isLoading = true 
        let config = {
            params: {
                CardCode:data,
            },
            headers: {
                    }
        }
        try {
            var result = await axiosInstance.get('inv/getDeliverCardDTLInfo', config);
            //console.log(result.data.dataSlotLoaderMaterial);

            if(result.data.status === 200) {
                //commit('SET_MESSAGER', result.data.message);
                return {
                    ok: true,
                    error: null,
                    dataCardDTLInv: result.data.dataCardDTLInv
                }
            } else
            {
                appStore.setMsgErro(result.data.message);
                return {
                    ok: false,
                    error: result.data.error,
                    message:result.data.error
                }
            }
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Lấy thông tin của thẻ xuất
    //code 10/10/2021
const getDeliverCardInfo = async ( data : any ) => {
        appStore.isLoading = true 
        let config = {
            params: {
                CardCode:data,
            },
            headers: {
                }
        }
        try {
            var result = await axiosInstance.get('inv/getDeliverCardInfo', config);
            console.log(result.data);

            if(result.data.status === 200) {
                //commit('SET_MESSAGER', result.data.message);
                return {
                    ok: true,
                    error: null,
                    dataCardInv: result.data.dataCardInv
                }
            } else
            {
                appStore.setMsgErro(result.data.message);
                return {
                    ok: false,
                    error: result.data.error,
                    message:result.data.error
                }
            }
        } catch(error) {
            console.log("error: ", error);
            throw error
        } finally {
            appStore.isLoading = false
        }
    }

    // Lập phiếu giao hàng giữa các bộ phận 
   //code 09/10/2021
 const lapChungTuGiao = async ( dataProductRepair : any ) => {
        // console.log(dataProductRepair);
        appStore.isLoading = true 
        let config = {
            headers: {

                 }
        }
        try {
            var result = await axiosInstance.post('inv/lapChungTuGiao',dataProductRepair, config);

            if(result.data.status === 200) {
                //console.log(result.data)
                appStore.setMessager(result.data.message);
                return {
                    ok: true,
                    error: null,
                    dataCardInv: result.data.dataCardInv
                }
            } else
            {
                appStore.setMsgErro(result.data.message);
                return {
                    ok: false,
                    error: result.data.error,
                    message:result.data.error
                }
            }
        } catch(error) {
           throw error
        } finally {
            appStore.isLoading = false
        }
    }

    return {
        ERPgetObReceived,
        getStoc_PartNum,
    }
})