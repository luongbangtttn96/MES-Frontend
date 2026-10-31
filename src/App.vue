/// <reference types="vite/client" />
<template>
  <div class="app-shell" :class="{ 'app-shell--with-navigation': isRenderMenu }">
    <Menus
      v-if="isRenderMenu"
      :mobile-open="mobileNavigationOpen"
      @close="mobileNavigationOpen = false"
    />

    <section class="app-main">
      <header v-if="isRenderMenu" class="app-topbar">
        <button
          class="mobile-navigation-toggle"
          type="button"
          aria-label="Mở điều hướng"
          @click="mobileNavigationOpen = true"
        >
          <span></span><span></span><span></span>
        </button>
        <div class="topbar-heading">
          <span>MES <i>/</i> WORKSPACE</span>
          <strong>Hệ thống điều hành sản xuất</strong>
        </div>
        <div class="topbar-account">
          <span class="account-status"><i></i> Hệ thống hoạt động</span>
          <span class="account-divider"></span>
          <span class="account-avatar">{{ accountInitial }}</span>
          <span class="account-name">{{ authStore.user?.fullName || authStore.user?.USER_NAME || 'Người dùng' }}
            <el-dropdown>
              <el-icon><ArrowDownBold /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item  @click="handUpdateProfile()">Thông tin tài khoản</el-dropdown-item>
                  <el-dropdown-item @click="handlogout()">Đăng xuất</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </div>
      </header>

      <main class="page-stage">
        <div v-if="!isInitialized" class="initial-state">
          <span class="loading-indicator"></span>
          <p>Đang tải dữ liệu, vui lòng chờ...</p>
        </div>
        <RouterView v-else />
      </main>
    </section>
  </div>

  <GlobalLoading :class="{ show: appStore.isLoading }" />
  <GlobalNotification />
  <GlobalAlarm :class="{ show: appStore.isAlam }" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { ArrowDownBold } from '@element-plus/icons-vue'


import { notify } from '@/utils/notification'

import GlobalLoading from '@/components/common/GlobalLoading.vue'
import GlobalNotification from '@/components/common/GlobalNotification.vue'
import GlobalAlarm from '@/components/common/GlobalAlarm.vue'
import Menus from '@/components/menus/menu.vue'

import { useAppStore } from '@/stores'
import { useAuthStore } from '@/stores/auth.store'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()
const isInitialized = ref(false)
const mobileNavigationOpen = ref(false)
// Routes without meta.hidden_menu fall back to this legacy list.

const isRenderMenu = ref(false)

// Later navigations (e.g. login -> home) must update the menu flag too.
watch(
  () => route.meta.hidden_menu,
  (hidden_menu) => {
    isRenderMenu.value = hidden_menu ?? true
  },
)

const accountInitial = computed(() => {
  const name = authStore.user?.fullName || authStore.user?.USER_NAME || 'U'
  return name.trim().charAt(0).toLocaleUpperCase('vi')
})

watch(
  () => appStore.messager,
  (message) => {
    if (message) {
      notify.success(message)
    }
  }
)

watch(
  () => appStore.error,
  (message) => {
    if (message) {
      notify.error(message)
    }
  }
)

const handUpdateProfile = () => {
  router.push("/Change_User_Profile")
}

const handlogout = () => {
  authStore.logout()
  router.push("/login");
}

async function initialize() {
  try {
    // route.meta is empty until the first navigation has resolved.
    await router.isReady()
    isRenderMenu.value = route.meta.hidden_menu ?? true
    // console.log('isRenderMenu:', route.meta)
    const result = await authStore.checkLogin()
 
    if (!result.ok) {
      isInitialized.value = true
      if (route.name !== 'login') {
        await router.replace({ name: 'login' })
      }
      return
    }

    // await authStore.ensureShift()
    isInitialized.value = true
  } catch (error) {
    console.error('MES initialization failed:', error)
    await router.replace({ name: 'login' })
  }
}

onMounted(initialize)
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  width: 100%;
  max-width: none;
  min-height: 100vh;
  margin: 0;
  border: 0;
  color: #26342c;
  font-family: 'Aptos', 'Segoe UI', sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}

body {
  min-width: 320px;
  margin: 0;
}

.profile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 8px 0;
  margin: 4px 0 0 0;
  min-width: 160px;
  z-index: 10;
}

.profile-menu li {
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.profile-menu li:hover {
  background: #f3f6f3;
}
button,
input {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
  width: 100%;
  background: #f3f6f3;
}

.app-shell--with-navigation {
  display: flex;
}

.app-main {
  display: flex;
  min-width: 0;
  min-height: 100vh;
  flex: 1;
  flex-direction: column;
}

.app-topbar {
  position: sticky;
  z-index: 3;
  top: 0;
  display: flex;
  min-height: 62px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 30px;
  border-bottom: 1px solid #e4e9e4;
  background: rgb(251 252 250 / 94%);
  backdrop-filter: blur(14px);
}

.topbar-heading {
  display: grid;
  gap: 3px;
}

.topbar-heading > span {
  color: #98a29b;
  font-size: 8px;
  font-weight: 750;
  letter-spacing: .7px;
}

.topbar-heading > span i {
  padding: 0 4px;
  color: #d77952;
  font-style: normal;
}

.topbar-heading strong {
  color: #35433a;
  font-size: 11px;
  font-weight: 650;
}

.topbar-account {
  display: flex;
  align-items: center;
  gap: 11px;
  color: #66736a;
  font-size: 10px;
}

.account-status {
  display: flex;
  align-items: center;
  gap: 7px;
  white-space: nowrap;
}

.account-status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #55a779;
  box-shadow: 0 0 0 3px rgb(85 167 121 / 12%);
}

.account-divider {
  width: 1px;
  height: 24px;
  margin: 0 3px;
  background: #e2e7e2;
}

.account-avatar {
  display: grid;
  width: 29px;
  height: 29px;
  place-items: center;
  border-radius: 50%;
  background: #e6eee8;
  color: #347454;
  font-size: 11px;
  font-weight: 700;
}

.account-name {
  max-width: 180px;
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-navigation-toggle {
  display: none;
}

.page-stage {
  min-width: 0;
  min-height: 0;
  flex: 1;
}

.initial-state {
  display: flex;
  min-height: 55vh;
  align-items: center;
  justify-content: center;
  gap: 11px;
  color: #7c8980;
  font-size: 12px;
}

.initial-state p {
  margin: 0;
}

.loading-indicator {
  width: 15px;
  height: 15px;
  border: 2px solid #dce7de;
  border-top-color: #347454;
  border-radius: 50%;
  animation: app-spin 700ms linear infinite;
}

@keyframes app-spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 900px) {
  .app-topbar { padding: 0 22px; }
}

@media (max-width: 680px) {
  .app-topbar { min-height: 57px; justify-content: flex-start; gap: 11px; padding: 0 14px; }
  .mobile-navigation-toggle { display: grid; width: 32px; height: 32px; flex: none; align-content: center; justify-items: center; gap: 4px; padding: 0; border: 0; border-radius: 4px; background: transparent; cursor: pointer; }
  .mobile-navigation-toggle:hover { background: #eaf0eb; }
  .mobile-navigation-toggle span { width: 16px; height: 1.5px; border-radius: 2px; background: #526158; }
  .topbar-heading { min-width: 0; }
  .topbar-heading strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .topbar-account { gap: 7px; margin-left: auto; }
  .account-status, .account-divider, .account-name { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; }
}

.text_red {
  color: red;
}

.color_m2 {
  background-color: #f89734;
}
</style>