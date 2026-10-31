import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'
import { useAppStore } from '@/stores/app.store'

export const useControlStore = defineStore('control',()=>{
    const appStore = useAppStore()

    //code 17/01/2023
    //lấy danh nhà máy sản xuất nguyên liệu 
    async function getManufacturer_Material() {
        let config = {
           
        }
        try {
            appStore.isLoading = true
            var result = await axiosInstance.get(`material/getManufacturer_Material`, config);
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataManufacturer_Material: result.data.dataManufacturer_Material
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

    //code 09/01/2022
    //lấy danh sách Kho cho control
    async function getStoresControlSelec() {
        let config = {
        }
        try {
            appStore.isLoading = true
            var result = await axiosInstance.get(`inv/getStoresControlSelec`, config);           
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataControlStores: result.data.dataControlStores
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

    //code 12/12/2021
    //lấy danh sách mã lệnh SX cho control
    async function getListWOControl() {

        let config = {

        }
        try {
            appStore.isLoading = true
            var result = await axiosInstance.get(`pmc/getListWOControl`, config);           
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataWOControl: result.data.dataWOControl
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

    //code 30/11/2021
    //lấy danh sách material cho control
    async function getMaterialControl() {
        appStore.isLoading = true
        let config = {
           
        }
        try {
            var result = await axiosInstance.get(`material/getAllMaterial`, config);           
            //console.log('mater',result.data);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    error: null,
                    dataAllMaterial: result.data.dataAllMaterial
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
        getManufacturer_Material,
        getStoresControlSelec,
        getListWOControl,
        getMaterialControl
    }
})