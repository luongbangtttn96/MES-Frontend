import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'
import { useAppStore } from '@/stores/app.store'
import type { ProjectDetail } from '@/types/bom'

export interface ProjectOption {
  id: string
  name: string
  value: string
}
export const useProjectStore = defineStore('project',()=> {
    const appStore = useAppStore()
    // lấy danh sách dự án Projects đang sản xuất
     // code 07/9/2025
    async function getDataProjectSelect_SX() {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('project/getDataProjectSelect_SX');
            //console.log(result)
            if(result.data.status === 200) {
                //console.log(result.data)
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    ProjectSelected: result.data.ProjectSelected
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

    // cập nhật  dự án mới Projects
    //code 07/08/2023 
    async function UpdateProject(data: ProjectDetail) {
        appStore.isLoading = true
        //console.log(data);
        try {
            let result = await axiosInstance.post('project/UpdateProject', data);
            
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
        } finally {

            appStore.isLoading = false

        }
    }


     // tao  dự án mới Project
    //code 02/12/2021 
    async function SaveProject(data=null) {
        appStore.isLoading = true
        //console.log(data);
        try {
            let result = await axiosInstance.post('project/SaveProject', data);
            
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
        } finally {

            appStore.isLoading = false

        }
    }

    // code 21/8/2021
    async function getDataProjectSelect() {
        appStore.isLoading = true
        try {
            var result = await axiosInstance.get('project/listsSelect');
            //console.log(result)
            if(result.data.status === 200) {
                //console.log(result.data)
                //commit('SET_LIST_PROJECT', result.data.Projects);
                return {
                    ok: true,
                    error: null,
                    ProjectSelected: result.data.ProjectSelected
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
        getDataProjectSelect_SX,
        UpdateProject,
        SaveProject,
        getDataProjectSelect
    }
})