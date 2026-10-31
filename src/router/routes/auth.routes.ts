export default [
    {
        path: '/login',
        name: 'login',
        component:() => import('@/components/Auth/Login.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },
  
]