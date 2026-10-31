import {computed, ref} from 'vue'
import { defineStore } from 'pinia'
import { axiosInstance } from '@/api/axios'

import { CONFIG_ACCESS_TOKEN } from '@/constants'

export interface MenuItem {
  MENU_ID?: number | string
  MENU_ID_PARENT?: string | number | null
  MENU_NAME: string
  MENU_LABLE?: string
  LINK?: string
  ICON?: string
  id?: string
  label?: string
  [key: string]: unknown
  Menu_children?: MenuItem[]
}

export interface MesUser {
  USER_ID: number
  USER_NAME:string | null
  fullName:string
  PRO_ADMIN? : boolean
  EMP_ID?:number
  IS_ACTIVE?: boolean
  DEPT_NAME?: string
  DESCRIPTION?:string
  DEPT_ID?:number
  PHONE?:string
  EMP_CODE?:string
  EMAIL?:string
}
export const useAuthStore = defineStore('auth',() => {

  const token = ref<string>(
    localStorage.getItem(CONFIG_ACCESS_TOKEN) ?? ''   
  )
  const user = ref<MesUser | null>(null)
  //const permissions = ref<string[]>([])
  const department = ref<Record<string, any> | null>(null)
  const menus = ref<MenuItem[]>([])
  //const hasShift = ref(false)
  const isLoading = ref(false)

  const isLoggedIn = computed(() => {
    return !!token.value
  })

  //const currentUser = computed(() => {
  //   return user.value
  // })

   // =====================================================
  // LOGIN
  // =====================================================

  async function login(
    payload: {
      user?: string
      password?: string
    }
  ) {

    isLoading.value = true

    try {

      const data = {
        user: payload.user || '',
        password: payload.password || ''
      }

      const result = await axiosInstance.post('auth/signin',data)

      if (result.status === 200) {

        // ---------------------------------------------
        // 1. User
        // ---------------------------------------------

        user.value = result.data.user

        // ---------------------------------------------
        // 2. Token
        // ---------------------------------------------

        const accessToken = result.data.accessToken || ''

        setToken(accessToken)
       
        // ---------------------------------------------
        // 3. Department
        // ---------------------------------------------

        department.value = result.data.user

        // ---------------------------------------------
        // 4. Axios Authorization
        // ---------------------------------------------

        // axiosInstance.defaults.headers.Authorization =
        //   'Bearer ' + accessToken

        return {
          ok: true,
          error: null,
          data: result.data
        }
      }

      return {
        ok: false,
        error: result.data?.error || 'Đăng nhập không thành công'
      }

    } catch (error: any) {

      return {
        ok: false,
        error:
          error?.response?.data?.message ||
          error?.message ||
          'Đăng nhập không thành công'
      }

    } finally {

      isLoading.value = false

    }
  }

  // =====================================================
  // GET USER BY TOKEN
  // =====================================================

  async function getUserByToken() {
    try {
      const result = await axiosInstance.get('auth/getUserBytoken')

      if (result.data.status === 200) {

        user.value = result.data.user
        department.value = result.data.user

        const menuRows: MenuItem[] = Array.isArray(result.data.menus) ? result.data.menus : []

        menuRows.forEach((element: MenuItem) => {
          if (element.MENU_ID_PARENT !== null && element.MENU_ID_PARENT !== undefined && element.MENU_NAME === String(element.MENU_ID_PARENT)) {
            element.MENU_ID_PARENT = null
          }
        })

        menus.value = buildMenuTree(menuRows)

        return {
          ok: true,
          data: result.data.user,
          menus: menus.value,
          error: null
        }
      }

      return {
        ok: false,
        error: result.data?.message
      }

    } catch (error: any) {

      return {
        ok: false,
        error: error?.message
      }
    }
  }

  // =====================================================
  // CHECK LOGIN
  // =====================================================

  async function checkLogin() {
    //console.log('checkLogin')
    if (!token.value) {
      return {
        ok: false
      }
    }

    const result =
      await getUserByToken()

    return {
      ok: result.ok,
      error: result.error
    }
  }

  // =====================================================
  // LOGOUT
  // =====================================================
 const logout = () => {
    setToken('')
    user.value = null
    menus.value = []
    department.value = null
    //hasShift.value = false
    delete axiosInstance.defaults
      .headers.Authorization
  }
//===================================================
// thiết lập lại biến Menu
//===================================================

function buildMenuTree(arrMenu: MenuItem[]): MenuItem[] {
  const menuById = new Map<string, MenuItem>()

  const menuTree = arrMenu.map((item) => {
    const normalizedItem: MenuItem = {
      ...item,
      id: String(item.MENU_ID ?? item.MENU_NAME),
      label: item.MENU_LABLE ?? item.MENU_NAME ?? 'Menu',
      MENU_LABLE: item.MENU_LABLE ?? item.MENU_NAME ?? 'Menu',
      Menu_children: [],
    }

    menuById.set(String(item.MENU_ID ?? item.MENU_NAME), normalizedItem)
    menuById.set(item.MENU_NAME, normalizedItem)

    return normalizedItem
  })

  const rootMenus: MenuItem[] = []

  for (const item of menuTree) {
    const parentKey = item.MENU_ID_PARENT === null || item.MENU_ID_PARENT === undefined ? null : String(item.MENU_ID_PARENT)

    if (parentKey) {
      const parent = menuById.get(parentKey)
      if (parent) {
        parent.Menu_children = parent.Menu_children ?? []
        parent.Menu_children.push(item)
      } else {
        rootMenus.push(item)
      }
    } else {
      rootMenus.push(item)
    }
  }

  return rootMenus
}


  const setToken = (value: string) => {
    token.value = value
    if (value) localStorage.setItem(CONFIG_ACCESS_TOKEN, value)
    else localStorage.removeItem(CONFIG_ACCESS_TOKEN)
  }

  const setUser = (value: MesUser | null) => {
    user.value = value
  }
  

  return {
      token,
      user,
      //permissions,
      department,
      menus,
      //hasShift,
      isLoggedIn,

      login,
      setToken,
      setUser,
      buildMenuTree,
      logout,
      checkLogin,
      getUserByToken,
  }

})


