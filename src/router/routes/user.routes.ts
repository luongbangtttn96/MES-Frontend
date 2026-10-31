export default [
    
    {
      path: '/Change_User_Profile',
      name: 'Change_User_Profile',
      component: () => import('@/components/USER/Change_User_Profile.vue'),
      meta: {
        requiresAuth: true,
        permission: 'BOM_VIEW',
      }
    },

    {
        path: '/formSetRole',
        name: 'formSetRole',      
        component: () => import('@/components/USER/SetRole.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },
]