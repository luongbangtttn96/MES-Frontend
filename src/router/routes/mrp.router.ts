export default [


      {
      path: '/mrp/DamendsCaculationMaterial',
      name: 'DamendsCaculationMaterial',
      component:() => import('@/components/PMC/Demands/DemandsCalculationMaterial.vue'),
      meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

      {
      path: '/mrp/BaoCaoTheoGioiKiemSoat_NLSX',
      name: 'BaoCaoTheoGioiKiemSoat_NLSX',
      component: () => import('@/components/PMC/MPS/BaoCaoTheoDoiKiemSoat_NLSX.vue'),
      meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },
{
      path: '/pmc/po/PO_Plan_Shedule',
      name: 'PO_Plan_Shedule',
      component:() => import('@/components/PMC/MRP/PO_Plan_Shedule.vue'),
      meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },
]