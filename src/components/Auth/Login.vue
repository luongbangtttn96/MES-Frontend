<template>
  <main class="login-screen">
    <section class="login-visual" aria-label="Hệ thống vận hành sản xuất MES">
      <div class="visual-topline">
        <div class="brand" aria-label="MES, hệ thống điều hành sản xuất">
          <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
          <span>MES<span class="brand-divider">/</span>OPS</span>
        </div>
        <span class="visual-index">01 <span></span> 04</span>
      </div>

      <div class="visual-copy">
        <p class="eyebrow">MANUFACTURING EXECUTION SYSTEM</p>
        <h1>Mọi ca sản xuất.<br><span>Một góc nhìn.</span></h1>
        <p class="visual-description">Kết nối con người, quy trình và dữ liệu trên cùng một nền tảng vận hành.</p>
      </div>

      <div class="visual-bottom">
        <span>PRODUCTION <i></i> QUALITY <i></i> OPERATIONS</span>
        <span>BUILT FOR THE FLOOR</span>
      </div>
    </section>

    <section class="login-panel">
      <div class="login-panel-inner">
        <div class="mobile-brand" aria-hidden="true">
          <span class="brand-mark"><span></span><span></span><span></span></span>
          <span>MES<span class="brand-divider">/</span>OPS</span>
        </div>

        <div class="form-heading">
          <p class="eyebrow">CỔNG VẬN HÀNH NHÀ MÁY</p>
          <h2>Chào mừng trở lại</h2>
          <p>Đăng nhập để tiếp tục công việc của bạn.</p>
        </div>

        <form id="UserLoginForm" class="login-form" @submit.prevent="handleSubmitLogin">
          <div class="field-group">
            <label for="username">Tên đăng nhập</label>
            <input
              id="username"
              v-model="user"
              name="username"
              type="text"
              placeholder="Nhập tên đăng nhập"
              autocomplete="username"
              required
              :disabled="isSubmitting"
              @input="errorMessage = ''"
            >
          </div>

          <div class="field-group">
            <div class="field-label-row">
              <label for="password">Mật khẩu</label>
            </div>
            <div class="password-field">
              <input
                id="password"
                v-model="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Nhập mật khẩu"
                autocomplete="current-password"
                required
                :disabled="isSubmitting"
                @input="errorMessage = ''"
              >
              <button
                class="visibility-toggle"
                type="button"
                :aria-label="showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'"
                @click="showPassword = !showPassword"
              >{{ showPassword ? 'ẨN' : 'HIỆN' }}</button>
            </div>
          </div>

          <p v-if="errorMessage" class="login-error" role="alert">{{ errorMessage }}</p>

          <button class="submit-button" type="submit" :disabled="isSubmitting">
            <span>{{ isSubmitting ? 'Đang xác thực...' : 'Đăng nhập' }}</span>
            <span class="submit-arrow" aria-hidden="true">&#8594;</span>
          </button>
        </form>

        <div class="panel-footer">
          <span class="footer-rule"></span>
          <p>Hệ thống quản lý và điều hành sản xuất</p>
        </div>
      </div>
      <span class="panel-corner" aria-hidden="true">MES&nbsp; / &nbsp;01</span>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '../../stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();

const user = ref('');
const password = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);
const showPassword = ref(false);

async function handleSubmitLogin() {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  errorMessage.value = '';
    const data = { user: user.value, password: password.value };
    try {
        const res = await authStore.login(data);
        if (!res.ok) {
      errorMessage.value = res.error || 'Đăng nhập không thành công. Vui lòng thử lại.';
        } else {
            await authStore.checkLogin();
      await router.push('/');
        }
    } catch (error) {
    errorMessage.value = 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
  } finally {
    isSubmitting.value = false;
    }
}

</script>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

.login-screen {
  --ink: #17251f;
  --muted: #748078;
  --line: #e2e7e2;
  --accent: #d8663d;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(420px, 0.88fr);
  min-height: 100svh;
  width: 100%;
  overflow: hidden;
  background: #f8f9f6;
  color: var(--ink);
  font-family: 'DM Sans', 'Avenir Next', sans-serif;
  text-align: left;
}

.login-visual {
  position: relative;
  display: flex;
  min-height: 640px;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: clamp(28px, 4.2vw, 64px);
  color: #fff;
  background-color: #26382f;
  background-image:
    linear-gradient(90deg, rgba(14, 30, 23, 0.82) 0%, rgba(18, 33, 27, 0.44) 56%, rgba(20, 36, 29, 0.1) 100%),
    linear-gradient(0deg, rgba(13, 28, 21, 0.5), transparent 42%),
    url('https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1900&q=85');
  background-position: center;
  background-size: cover;
  isolation: isolate;
  animation: image-reveal 900ms ease-out both;
}

.visual-topline,
.visual-bottom,
.brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  justify-content: flex-start;
  gap: 11px;
  color: inherit;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
}

.brand-mark {
  display: inline-flex;
  height: 26px;
  align-items: flex-end;
  gap: 3px;
  padding: 4px;
  border: 1px solid currentColor;
  border-radius: 4px;
}

.brand-mark span {
  width: 4px;
  background: currentColor;
}

.brand-mark span:nth-child(1) { height: 8px; opacity: 0.55; }
.brand-mark span:nth-child(2) { height: 13px; opacity: 0.78; }
.brand-mark span:nth-child(3) { height: 17px; }
.brand-divider { margin: 0 3px; color: #e88a67; }

.visual-index {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.74);
  font-size: 10px;
  font-weight: 600;
}

.visual-index span {
  width: 34px;
  height: 1px;
  background: rgba(255, 255, 255, 0.55);
}

.visual-copy {
  max-width: 570px;
  margin: auto 0;
  padding: 72px 0;
  animation: copy-rise 700ms 120ms ease-out both;
}

.eyebrow {
  margin: 0 0 18px;
  color: var(--accent);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.4px;
}

.visual-copy .eyebrow { color: #ffad8c; }

.visual-copy h1 {
  margin: 0;
  color: #fff;
  font-family: 'Manrope', 'Avenir Next', sans-serif;
  font-size: clamp(40px, 5.2vw, 72px);
  font-weight: 600;
  line-height: 1.08;
}

.visual-copy h1 span { color: #f39a76; }

.visual-description {
  max-width: 400px;
  margin: 22px 0 0;
  color: rgba(255, 255, 255, 0.76);
  font-size: 15px;
  line-height: 1.75;
}

.visual-bottom {
  gap: 20px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1px;
}

.visual-bottom > span:first-child {
  display: flex;
  align-items: center;
  gap: 10px;
}

.visual-bottom i {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #f39a76;
}

.login-panel {
  position: relative;
  display: grid;
  min-height: 640px;
  place-items: center;
  padding: 64px clamp(34px, 6vw, 96px);
  background-color: #f8f9f6;
}

.login-panel-inner {
  width: min(100%, 390px);
  animation: copy-rise 650ms 100ms ease-out both;
}

.mobile-brand { display: none; }

.form-heading { margin-bottom: 38px; }

.form-heading .eyebrow { margin-bottom: 14px; }

.form-heading h2 {
  margin: 0;
  color: var(--ink);
  font-family: 'Manrope', 'Avenir Next', sans-serif;
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 600;
  line-height: 1.2;
}

.form-heading > p:last-child {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 14px;
}

.login-form { display: grid; gap: 23px; }

.field-group { display: grid; gap: 9px; }

.field-group label {
  color: #354139;
  font-size: 12px;
  font-weight: 700;
}

.field-group input {
  width: 100%;
  height: 54px;
  padding: 0 15px;
  border: 1px solid #dce2dc;
  border-radius: 5px;
  outline: none;
  background: #fff;
  color: var(--ink);
  font: inherit;
  font-size: 14px;
  text-align: left;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.field-group input::placeholder { color: #a2aaa4; }

.field-group input:focus {
  border-color: #527461;
  box-shadow: 0 0 0 3px rgba(82, 116, 97, 0.12);
}

.field-group input:disabled { background: #f0f2ef; }

.password-field { position: relative; }
.password-field input { padding-right: 62px; }

.visibility-toggle {
  position: absolute;
  top: 0;
  right: 0;
  height: 54px;
  padding: 0 15px;
  border: 0;
  background: transparent;
  color: #68766d;
  cursor: pointer;
  font: inherit;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.7px;
}

.visibility-toggle:focus-visible,
.submit-button:focus-visible {
  outline: 3px solid rgba(216, 102, 61, 0.4);
  outline-offset: 3px;
}

.login-error {
  margin: -7px 0 0;
  color: #b33f32;
  font-size: 12px;
  line-height: 1.5;
}

.submit-button {
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  padding: 0 18px;
  border: 0;
  border-radius: 5px;
  background: #26382f;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  transition: background-color 160ms ease, transform 160ms ease;
}

.submit-button:hover:not(:disabled) { transform: translateY(-1px); background: #354d40; }
.submit-button:disabled { cursor: wait; opacity: 0.72; }
.submit-arrow { color: #f39a76; font-size: 20px; font-weight: 400; }

.panel-footer { margin-top: 54px; }
.footer-rule { display: block; width: 38px; height: 2px; background: var(--accent); }
.panel-footer p { margin: 13px 0 0; color: #8a948d; font-size: 11px; }

.panel-corner {
  position: absolute;
  right: 27px;
  bottom: 22px;
  color: #a2aaa4;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.7px;
}

@keyframes image-reveal {
  from { opacity: 0.7; transform: scale(1.015); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes copy-rise {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .login-screen { grid-template-columns: minmax(0, 0.95fr) minmax(390px, 1.05fr); }
  .visual-bottom > span:last-child { display: none; }
  .login-panel { padding-inline: 42px; }
}

@media (max-width: 680px) {
  .login-screen { display: block; min-height: 100svh; background: #f8f9f6; }
  .login-visual { min-height: 250px; padding: 24px 25px 28px; }
  .visual-index, .visual-bottom { display: none; }
  .visual-copy { padding: 34px 0 4px; }
  .visual-copy .eyebrow { margin-bottom: 11px; font-size: 9px; }
  .visual-copy h1 { font-size: clamp(34px, 9vw, 48px); }
  .visual-description { max-width: 340px; margin-top: 12px; font-size: 12px; }
  .login-panel { min-height: calc(100svh - 250px); display: block; padding: 0 25px 68px; }
  .login-panel-inner { width: 100%; max-width: 430px; margin: 0 auto; padding-top: 34px; }
  .mobile-brand { display: none; }
  .form-heading { margin-bottom: 28px; }
  .form-heading h2 { font-size: 29px; }
  .login-form { gap: 19px; }
  .panel-footer { margin-top: 38px; }
  .panel-corner { right: 25px; bottom: 17px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
</style>