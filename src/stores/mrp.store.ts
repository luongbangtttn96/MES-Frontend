import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'

import { useAppStore } from '@/stores/app.store'

export const useMRPStore = defineStore('pmc',()=> {   
    const appStore = useAppStore()
//tính số lượng sản phẩm có thể SX được từ nguyên liệu đáp ứng của nhu cầu Demands
    //11/06/2022
    const MRPuocSoSX = async ( data: any ) => {
        //console.log(data);
        appStore.isLoading = true
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('mrp/MRPuocSoSX', config);
            
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
    return {
        MRPuocSoSX
    }
})