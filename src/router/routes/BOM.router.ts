//======================BOM===========
export default [
 
     {
      path: '/bom/SearchMaterial',
      name: 'SearchMaterial',
      component:() => import('@/components/BaseMaterial/SearchMaterial.vue'),
       meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW'
        }
    },

    {
        path: '/bom/Material',
        name: 'Material',
        component:() => import('@/components/BaseMaterial/Materals.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW'
        }
    },
    // {
    //   path: '/bom/Create_BOMHDR',
    //   name: 'Create_BOMHDR',
    //    component:() => import('@/components/bom/Bom_New/Create_BOMHDR.vue'),
    //     meta: {
    //         requiresAuth: true,
    //         permission: 'BOM_VIEW'
    //     }
    // },

    {
      path: '/bom/AddBom_whole',
      name: 'AddBom_whole',
    component:() => import('@/components/bom/Bom_New/AddBom_whole.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

    {
      path: '/bom/BomAll_DTL_Project',
      name: 'BomAll_DTL_Project',
       component:() => import('@/components/bom/BomAll_DTL_Project.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

    {
      path: '/bom/ShowUpdateProject',
      name: 'ShowUpdateProject',
       component:() => import('@/components/bom/ProjectItemUpdate.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

    {
      path: '/bom/BOMHDR_ItemUpdate',
      name: 'BOMHDR_ItemUpdate',
       component:() => import('@/components/bom/BOMHDR_ItemUpdate.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

    // {
    //   path: '/bom/BOMDTL_ItemUpdate',
    //   name: 'BOMDTL_ItemUpdate',
    //    component:() => import('@/components/bom/BOMDTL_ItemUpdate.vue'),
    //     meta: {
    //         requiresAuth: true,
    //         permission: 'BOM_VIEW'
    //     }
    // },

    {
        path: '/bom',
        name: 'Bom',
        component:() => import('@/components/bom/bom.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW'
        }
    },
]