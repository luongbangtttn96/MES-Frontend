import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'
import { useAppStore } from '@/stores/app.store'

export const useCustomerStore = defineStore('customer',()=> {
    const appStore = useAppStore()
    //Lưu thêm khách hàng  
    //09/07/2026  
    const LuuAddCustomer = async ( data: any ) => {
        try {
            appStore.isLoading = true            
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('cus/LuuAddCustomer', data);
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

    // lưu khách hàng
    // code 04/06/2024
    const SaveCustomer = async ( data: any ) => {
        try {
            appStore.isLoading = true;
            let config = {
              
            }          
            //console.log(dataPlanHDR)
            var result = await axiosInstance.post('cus/SaveCustomer', data, config);         
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

     // Lấy danh sách khách hàng từ ERP
    // code 03/06/2024
    const getdataERPCustomers = async ( data: any ) => {
        appStore.isLoading = true;
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('cus/getdataERPCustomers', config);
            //console.log(result)
  
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true, 
                    error: null,
                    dataERPCustomers: result.data.dataERPCustomers,
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


     // Lấy danh sách khách hàng
    // code 03/06/2024
    const getdataCustomers = async ( data: any ) => {
        appStore.isLoading = true;
        try {
            let config = {
                params:data,
            }
            var result = await axiosInstance.get('cus/getdataCustomers', config);
            //console.log(result)
            if(result.data.status === 200) {
                //console.log(result.data)
                return {
                    ok: true,
                    error: null,
                    dataCustomers: result.data.dataCustomers,
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
        LuuAddCustomer,
        SaveCustomer,
        getdataCustomers,
        getdataERPCustomers,
    }
})