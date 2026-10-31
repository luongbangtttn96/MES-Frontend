
export default [

        {
      path: '/pmc/po/PDFQouter',
      name: 'PDFQouter',
      component: () => import('@/components/PMC/sourcing/Baocao/PDFQouter.vue'),
      meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

    {
      path: '/pmc/po/Report_Qoute',
      name: 'Report_Qoute',
      component:() => import('@/components/PMC/sourcing/PRICR_QOUTE/Report_Qoute.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

    {
        path: '/pmc/po/PRICE_COMPARING',
        name: 'PRICE_COMPARING',
        component: ()=> import('@/components/PMC/sourcing/PRICR_QOUTE/PRICE_COMPARING.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

    {
      path: '/pmc/po/SetQoute_metarial',
      name: 'SetQoute_metarial',
      component: () => import('@/components/PMC/sourcing/PRICR_QOUTE/SetQoute_metarial.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },

    {
        path: '/pmc/po/ADD_PRICE_QOUTE_DTL',
        name: 'ADD_PRICE_QOUTE_DTL',
        component: () => import('@/components/PMC/sourcing/PRICR_QOUTE/ADD_PRICE_QOUTE_DTL.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }

    },

  // Define your sourcing routes here
      {
        path: '/pmc/sourcing/PRICEQOUTEPHASE',
        name: 'PRICEQOUTEPHASE',
        component: () => import('@/components/PMC/sourcing/PRICR_QOUTE/PRICE_QOUTE_PHASE.vue'),
        meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
        }
    },
]