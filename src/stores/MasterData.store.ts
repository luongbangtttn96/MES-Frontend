import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'

import { useAppStore } from '@/stores/app.store'

export const useMasterDataStore = defineStore('masterData',()=> {
    const appStore = useAppStore()
    // lấy danh sách Deliver class
    //code 30/05/2026
    const getDeliver_class = async ( data: any ) => {
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('masterdata/getDeliver_class', config);
            //console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataDeliver_class: result.data.dataDeliver_class
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
   // lấy danh sách Đơn vị đo (Unit)
    //code 09/05/2022
    const getUnit = async ( ) => {
        //appStore.isLoading = true
        try {
            var result = await axiosInstance.get('masterdata/getUnit');
            console.log(result)
            
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataUnits: result.data.dataUnits
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
        getDeliver_class,
        getUnit
    }
})