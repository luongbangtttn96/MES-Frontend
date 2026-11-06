// router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './routes/auth.routes'
import bom from './routes/BOM.router'
import administrator from './routes/Administrator.routes'
import user from './routes/user.routes'
import sourcing from './routes/sourcing.router'
import pmc from './routes/pmc.router' 

import { useAuthStore } from '@/stores/auth.store'
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresShift?: boolean
    permission?: string
    // true: render the main menu; false: hide it
    hidden_menu?: boolean
  }
}



const router = createRouter({
  history: createWebHistory(),

  routes: [
    ...authRoutes,
    ...bom,
    ...administrator,
    ...user,
    ...sourcing,
    ...pmc,
  ]
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    if (to.name !== 'login') return { name: 'login', query: { redirect: to.fullPath } }
  }

  // if (to.meta.requiresShift && !auth.hasShift) {
  //   const ok = await auth.ensureShift()
  //   if (!ok) return { name: 'shift', query: { redirect: to.fullPath, reason: 'shift' } }
  // }

  if (to.name === 'login' && auth.isLoggedIn) {
    return { name: 'Home' }
  }
})

export default router
