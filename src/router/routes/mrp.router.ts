export default [
{
      path: '/pmc/mrp/PO_Plan_Shedule',
      name: 'PO_Plan_Shedule',
      component:() => import('@/components/PMC/MRP/PO_Plan_Shedule.vue'),
      meta: {
            requiresAuth: true,
            permission: 'BOM_VIEW',
            hidden_menu: false,
        }
    },
]