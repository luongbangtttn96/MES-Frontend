import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'
import { useAppStore } from '@/stores/app.store'

export interface MenuItem {
  MENU_ID?: number;
  MENU_ID_PARENT?: string | null;
  MENU_NAME?: string;
  MENU_LABLE?: string;
  LINK?: string;
  ISSHOW_MENU?: boolean | number | string;
  FUNTION?: boolean | number | string;
  MENU_DESCRIPTION?: string;
  SORTORDER?: number;
}


export const useSystemStore = defineStore('system',() => {

    const appStore = useAppStore();


    /* lấy danh sách các loại tiền*/
   //code 07/12/2023
   async function getdataCurrency( data=null) {
    appStore.isLoading = true
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('system/getdataCurrency', config);
       
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataCurrency: result.data.dataCurrency
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
    /* lấy danh sách các chức năng */
    /* lấy danh sách các chức năng */
   //code 16/02/2023
   async function getFunctionSys_DTL( data = null) {
    appStore.isLoading = true
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('system/getFunctionSys_DTL', config);
       
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                dataFunctionSys_DTL: result.data.dataFunctionSys_DTL
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
 
    // khai báo cấu hình chức năng hệ thống menu 
    // code 15/02/2023
    async function LuuConfigFuncSystem( data: MenuItem ) {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('system/LuuConfigFuncSystem', data);
            
            console.log(result.data);            
            if(result.data.status === 200) { 
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                }
            } else {
                appStore.setMessager(result.data.message)
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

  /* lấy danh các chức năng menu cha*/
   //code 15/02/2023
   async function getFunctionSys( data = null) {
    appStore.isLoading = true
    let config = {
        params:data,
    }
    try {
        var result = await axiosInstance.get('system/getFunctionSys', config);
       
        if(result.data.status === 200) {
            return {
                ok: true,
                error: null,
                SelectFunctionSys: result.data.SelectFunctionSys
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
    return {
        getdataCurrency,
        getFunctionSys_DTL,
        LuuConfigFuncSystem,
        getFunctionSys
    }
})