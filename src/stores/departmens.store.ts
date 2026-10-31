import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'
import { useAppStore } from '@/stores/app.store'
import { ref, type Ref } from 'vue'

export interface departmenItem {
    DEPT_ID?: string | number
    DEPT_NAME?: string 
    DESCRIPTION?: string | null
    IS_ACTIVE?: boolean
    DELETE_AT?: string | Date
    DELETED_BY?: string
    CREATED_AT?: string | Date
    CREATED_BY?: string
    UPDATED_AT?: string | Date
    UPDATED_BY?: string
    TYPE_DEPT?: string | number
  [key: string]: unknown
}


export const useDepartmensStore = defineStore('departmens', ()=>{
    
    const appStore = useAppStore();
    const dataDepartmens: Ref<departmenItem[]> = ref([])

    // thêm bô phận 
    // code 28/09/2025    
    async function AddDepartmen( data=null ) {
        try {
            appStore.isLoading = true;
            //console.log(dataBomHDR)
            var result = await axiosInstance.post('departmens/AddDepartmen', data);         
            if(result.data.status === 200) {                
                appStore.setMessager(result.data.message)
                return {
                    ok: true
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

    //code 12/10/2022
    // lấy danh bộ sản xuất 
    async function getDepartProduc() {
        appStore.isLoading = true;
        try {
            var result = await axiosInstance.get('departmens/getDepartProduc');           
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataDepartmens: result.data.dataDepartmens
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
    //code 03/09/2021
    // lấy danh thiết bị của bộ Phận Phòng Ban getListDeviceInDepartmen
    async function getListDeviceInDepartmen(departmenID=null) {
        //console.log(departmenID);
        appStore.isLoading = true;
        try {
            var result = await axiosInstance.get(`departmens/getListDeviceInDepartmen?id= ${departmenID}`);           
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    divices: result.data.divices
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
    //code 03/09/2021
    // lấy danh bộ Phận Phòng Ban getListDepartmens
    async function getListDepartmens( data = null) {
        appStore.isLoading = true;
        try {
            let config = {
                params: data,
            }
            var result = await axiosInstance.get('departmens/getListDepartmens', config);           
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataDepartmens: result.data.dataDepartmens
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
        dataDepartmens,
        AddDepartmen,
        getDepartProduc,
        getListDeviceInDepartmen,
        getListDepartmens
    }
})