export default [
     // =============== Customer ================
    {
        path: '/cus/QLCustomers',
        name: 'QLCustomers',
        component: () => import('@/components/PMC/Customers/QL_Customers.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
        }
    },

    // =============== Demands ================
    {
      path: '/pmc/ReportXuattraDemand',
      name: 'ReportXuattraDemand',
      component:()=> import('@/components/PMC/Demands/ReportXuattraDemand.vue'),
        meta: {
                requiresAuth: true,
                permission: 'BOM_VIEW',
                hidden_menu: false,
            }
    },
      {
          path: '/pmc/DanhSach_AllDemand_DTL',
          name: 'DanhSach_AllDemand_DTL',
          component:() => import('@/components/PMC/Demands/DanhSach_ALLDemand_DTL.vue'),
            meta: {
                requiresAuth: true,
                permission: 'BOM_VIEW',
                hidden_menu: false,
            }
        },
    {
      path: '/pmc/DanhSach_FOR_Demand_DTL',
      name: 'DanhSach_FOR_Demand_DTL',
      component: () => import('@/components/PMC/Demands/Forecast/DanhSach_FOR_Demand_DTL.vue'),
      meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

        // 09/05/2023
    {
      path: '/pmc/CountCalculationMaterial',
      name: 'CountCalculationMaterial',
      component: () => import('@/components/PMC/Demands/CountCalculationMaterial.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },
        {
            path: '/pmc/DemandsDTL',
            name: 'DemandsDTL',
            component:() => import('@/components/PMC/Demands/Demands_DTL.vue'),
            meta: {
                requiresAuth: true,
                permission: 'BOM_VIEW',
                hidden_menu: false,
            }
        },

        {
            path: '/pmc/MaterialLT_Forecast',
            name: 'MaterialLT_Forecast',
            component:()=> import('@/components/PMC/Demands/Forecast/MaterialLT_Forecast.vue'),
            meta: {
                    requiresAuth: true,
                    permission: 'BOM_VIEW',
                    hidden_menu: false,
                }
        },

       {
          path: '/pmc/Form_DateForecastPO_material',
          name: 'Form_DateForecastPO_material',
          component: () => import('@/components/PMC/Demands/Forecast/Form_DateForecastPO_material.vue'),
           meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

    {
      path: '/pmc/Demands',
      name: 'Demands',
      component: () => import('@/components/PMC/Demands/Demands.vue'),
       meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
        }
    },

    {
      path: '/pmc/ShowSumForecast',
      name: 'ShowSumForecast',
      component: () => import('@/components/PMC/Demands/Forecast/ShowSumForecast.vue'),
      meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

]