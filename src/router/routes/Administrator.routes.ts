  /// ================================= Administrator
//import changePassword from '../components/USER/ChangePassword.vue'
//import roles from '../components/USER/RolesManage.vue'
//import ConfigFuncSystem from "../components/Menus/ConfigFuncSystem.vue";
//import Change_User_Profile from '../components/USER/Change_User_Profile.vue'
export default [

   {
      path: '/Admin/users',
      name: 'Users', 
      component: () => import('@/components/USER/Users.vue'),
      meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
        }
    },


    // {
    //   path: '/Change_User_Profile',
    //   name: 'Change_User_Profile',
    //   component: () => import('../components/USER/Change_User_Profile.vue'),
    //   meta: {
    //         requiresAuth: true,
    //         permission: 'BOM_VIEW',
    //         hidden_menu: false,
    //     }
    // },

    {
      path: '/ConfigFuncSystem',
      name: 'ConfigFuncSystem',
      component: () => import("@/components/System/ConfigFuncSystem.vue"),
       meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
        }

    },

    {
      path: '/roles',
      name: 'roles',
      component: () => import('@/components/System/RolesManage.vue'),
       meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
        }

    },

    // {
    //   path: '/changePassword',
    //   name: 'changePassword',
    //   component: () => import('../components/USER/ChangePassword.vue'),
    //    meta: {
    //         requiresAuth: true,
    //         permission: 'BOM_VIEW',
    //         hidden_menu: false,
    //     }

    // },

]