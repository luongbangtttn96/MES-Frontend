import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'
import { useAppStore} from '@/stores/app.store'
import type { MesUser } from '@/stores/auth.store'

export interface registerData {
    USER_NAME?: string;
    PASSWORD?: string;
    CONFIRM_PASSWORD?: string;
    FULL_NAME?: string;
    EMAIL?: string;
    PHONE?: string;
    EMP_CODE?: string;
    ROLES?: number[];
    DEPT_ID?: number;
}

export interface userItem {
  USER_ID?: number;
  USER_NAME?: string;
  EMP_CODE?: string;
  FULL_NAME?: string;
  EMAIL?: string;
  IS_ACTIVE?: boolean;
  STATUS?: string;
  EMP_ID?: number;
  DEPT_NAME?: string;
  DESCRIPTION?: string;
  DEPT_ID?: number;
  PHONE?: string;
}

export interface Role {
    ROLE_ID?: number;
    ROLE_NAME?: string;
    USER_NAME?: string;
    DESCRIPTION?: string;  
    is_role?: boolean | number | null;
}

export interface roleItem {
  id?: number;
  name?: string;
  parentId?: string | null;
  MENU_ID?: number;
  MENU_NAME?: string | null; 
  MENU_LABLE?: string;
  FUNTION?: number | boolean | string;  
  MENU_ID_PARENT?: string | null;
  IS_VIEW?: boolean;
  IS_INSERT?: boolean;
  IS_UPDATE?: boolean;
  IS_DELETE?: boolean;  
  P_MENU?: number;
  ROLE_ID?: number;
}

export const useUserStore = defineStore('user', () => {
    const appStore = useAppStore();
     // lưu thông tin cá nhân người dùng
    //11/02/26
    const updateUser = async ( data: registerData) => {
    //console.log('DATA:',dataMaterialExist_Stock)
    appStore.isLoading = true;
    try {
        let config = {
           
        }
        //console.log(dataPlanHDR)
        var result = await axiosInstance.put('users/user', data, config);

        appStore.setMessager(result.data.message);
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

    // lưu thông tin cá nhân người dùng
    //11/02/26
    const SaveUser_Profile = async ( data: MesUser) => {
        appStore.isLoading = true;
        try {
        return axiosInstance.post('/users/SaveUser_Profile', data)
            .then(response => { 
                appStore.setMessager(response.data.message)
                return response.data;
            })
            .catch(error => {
                throw error
            })
        } catch(error) {
            throw error
        } finally {
            appStore.isLoading = false
        }
    }
    // set mật khẩu 123456 cho User
    // 07/03/2024
    const DongBoUser_Nhansu_erp = async ( data=null) => {
        appStore.isLoading = true;
        try {
            let result = await axiosInstance.post('/users/DongBoUser_Nhansu_erp', data);
  
            if(result.data.status === 200) {
                appStore.setMessager(result.data.message);
                return {
                    ok: true,
                    message: result.data.message
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

    // set mật khẩu 123456 cho User
    // 14/06/2023
    const SetPassword = async ( data:{ userName: string }) => {
        appStore.isLoading = true;
        try {
            let result = await axiosInstance.post('/users/SetPassword', data);
            appStore.setMessager(result.data.message)
            if(result.data.status === 200) {
                return {
                    ok: true,
                    message: result.data.message
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
    // Cập nhận quyền cho nhóm quyền
    // 16/09/2022
    const UpdatePermission = async ( data : roleItem) => {
        appStore.isLoading = true;
        try {
            let result = await axiosInstance.post('/users/UpdatePermission', data);
            //console.log('result.data');

            if(result.data.status === 200) {
                return {
                    ok: true,
                    message: result.data.message
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

     // lấy danh sách chi tiết quyền chức năng theo nhóm quyền
    // code 14/09/2022
const getSelectRoleDTL = async ( data:{ ROLE_ID: number }) => {
    try {
        appStore.isLoading = true;
        let config = {
            params:data
        }
        let result = await axiosInstance.get('users/getSelectRoleDTL', config);
        if(result.data.status === 200) {            
            return {
                ok: true,
                datarolesDTL: result.data.datarolesDTL,
                error: null
            }
        }
        return {
            ok: false,
            error: null
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}
    // Thêm Nhóm quyền
    // 13/09/2022
    const AddRole = async ( data:{ ROLE_NAME: string, DESCRIPTION: string }) => {
        appStore.isLoading = true;
        try {
            let result = await axiosInstance.post('/users/AddRole', data);
            //console.log('result.data');
            if(result.data.status === 200) {
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                    message: result.data.message
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
    // Chuyển bộ phận làm việc của nhân viên
    // 26/07/2022
    const ChuyenBoPhanChoNhanVien = async ( data=null) => {
        appStore.isLoading = true;
        console.log('1');
        try {
            let result = await axiosInstance.post('/users/ChuyenBoPhanChoNhanVien', data);

            if(result.data.status === 200) {
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                    message: result.data.message
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

    // đổi password
    // 07/05/2022
    const changePassword = async ( data=null) => {
        appStore.isLoading = true;
        console.log('1');
        try {
            let result = await axiosInstance.post('/users/changePassword', data);
            console.log('result.data');

            if(result.data.status === 200) {
                appStore.setMessager(result.data.message)
                return {
                    ok: true,
                    message: result.data.message
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

    // Thiết lập nhóm quyền cho User
    // code: 30/11/2021
const setRoleUser = async (rolesUser: Role[]) => {
    appStore.isLoading = true;
    try {
        let config = {
           
        }
        //console.log(dataPlanHDR)
        var result = await axiosInstance.post('users/setRoleUser', {rolesUser:rolesUser}, config);

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

    // lấy danh sách nhóm quyền
    // code 29/11/2021
const getRoles = async ( Username: string| null = null) => {
    try {
        appStore.isLoading = true;
        let config = {
            params:{
                user:Username
            },
        }
        let result = await axiosInstance.get('users/getRoles', config);

        console.log(result.data);
        if(result.data.status === 200) {            
            return {
                ok: true,
                dataroles: result.data.dataroles,
                error: null
            }
        }
        return {
            ok: false,
            error: null
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}
// lấy danh sách User
// code 28/11/2021
const getdataUser = async () => {
    try {
        appStore.isLoading = true;
        let config = {
         }
        let result = await axiosInstance.get('users/getdataUser', config);
        if(result.data.status === 200) {            
            return {
                ok: true,
                dataListUserItem: result.data.dataListUserItem,
                error: null
            }
        }
        return {
            ok: false,
            error: null
        }
    } catch(error) {
        throw error
    } finally {
        appStore.isLoading = false
    }
}

// Đăng ký User
// code: 27/11/2021

const register = async ( data: registerData) => {
    //console.log('DATA:',dataMaterialExist_Stock)
    appStore.isLoading = true;

    try {
        let config = {
           
        }
        //console.log(dataPlanHDR)
        var result = await axiosInstance.post('users/signup', data, config);

        appStore.setMessager(result.data.message);
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
    
    const updateProfile = async ( { fullname = '', description = '', gender = '', objFile = null }) => {
        appStore.isLoading = true;
        try {
            let bodyFormData = new FormData();

            bodyFormData.append('gender', gender);
            bodyFormData.append('fullname', fullname);
            bodyFormData.append('description', description);

            // For avatar
            if(objFile) {
                bodyFormData.append('avatar', objFile); 
            }

            let config = {
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                //     'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                // }
            }

            let result = await axiosInstance.post('/member/update.php', bodyFormData, config);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    user: result.data.user
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
        updateUser,
        SaveUser_Profile,
        DongBoUser_Nhansu_erp,
        SetPassword,
        UpdatePermission,
        getSelectRoleDTL,
        AddRole,
        ChuyenBoPhanChoNhanVien,
        changePassword,
        setRoleUser,
        getRoles,
        getdataUser,
        register,
        updateProfile
    }
});