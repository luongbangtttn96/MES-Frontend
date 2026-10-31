<template>
  <div class="signup-container">
    <div class="background-decoration"></div>
    
    <div class="signup-card">
      <!-- Header Section -->
      <div class="card-header">
        <div class="header-icon">
          <el-icon :icon="UserFilled"  scale="2"></el-icon>
        </div>
        <h2 class="card-title">Cập Nhật Thông Tin Người Dùng</h2>
      </div>

      <!-- Form Section -->
      <form class="signup-form">
        <!-- Row 1: Full Name & Phone -->
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Họ và Tên</label>
            <div class="input-wrapper">
              <el-icon class="input-icon"><Female/></el-icon>
              <input 
                type="text" 
                class="form-input" 
                placeholder="Nguyễn Văn A"
                v-model="dataUser.FULL_NAME" 
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Số Điện Thoại</label>
            <div class="input-wrapper">
              <el-icon class="input-icon"><Phone/></el-icon>
              <input 
                type="text" 
                class="form-input" 
                placeholder="0987654321"
                v-model="dataUser.PHONE"
              />
            </div>
          </div>
        </div>

        <!-- Row 2: Employee Code & Username -->
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Mã Nhân Viên</label>
            <div class="input-wrapper">
              <el-icon icon="hash" class="input-icon"></el-icon>
              <input 
                type="text" 
                class="form-input" 
                placeholder="NV001"
                v-model="dataUser.EMP_CODE"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Tên Đăng Nhập</label>
            <div class="input-wrapper">
              <el-icon icon="at" class="input-icon"></el-icon>
              <input 
                type="text" 
                class="form-input" 
                placeholder="username"
                v-model="dataUser.USER_NAME" 
              />
            </div>
          </div>
        </div>

        <!-- Row 3: Email -->
        <div class="form-group">
          <label class="form-label">Email</label>
          <div class="input-wrapper">
            <el-icon icon="envelope" class="input-icon"></el-icon>
            <input 
              type="email" 
              class="form-input" 
              placeholder="example@email.com"
              v-model="dataUser.EMAIL"
            />
          </div>
        </div>

        <!-- Row 5: Department Selection -->
        <div class="form-group">
          <label class="form-label">Phòng Ban</label>
          <selectDepatmen v-model="dataUser.DEPT_ID" @getValue="getValue" />
        </div>

        <!-- Submit Button -->
        <button 
          type="button" 
          class="btn-submit" 
          @click="Pro_UpdateUser()"
        >
          <el-icon icon="check-circle-fill"></el-icon>
          Cập Nhật
        </button>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { UserFilled, Female, Phone } from "@element-plus/icons-vue";
import {useUserStore, type registerData} from "@/stores/user.store"

import selectDepatmen from "@/components/controls/Contr_SelectDepartmen.vue"

const userStore = useUserStore();

const dataUser = ref<registerData>({
  USER_NAME: "",
  PASSWORD: "",
  CONFIRM_PASSWORD: "",
  FULL_NAME: "",
  EMAIL: "",
  PHONE: "",
  EMP_CODE: "",
  ROLES: [],
  DEPT_ID: 0
});

const props = defineProps<{
  userData: registerData | null
}>();

// defineProps<{
//    userData: registerData 
// }>()

watch(() => props.userData, (newVal) => {
  console.log('props.userData changed:', newVal);
  if (newVal) {
    dataUser.value = { ...newVal };
  }
})

const getValue = (value: number) => {
  dataUser.value.DEPT_ID = value;
};


const Pro_UpdateUser = () => {
  if (!dataUser.value.FULL_NAME || !dataUser.value.USER_NAME || !dataUser.value.EMAIL) {
    alert('Vui lòng điền đầy đủ các trường thông tin');
    return;
  }
  userStore.updateUser(dataUser.value);
};

onMounted(() => {
  dataUser.value = { ...props.userData };
  console.log('SingupUpdate component mounted',dataUser.value);
});
</script>


<style scoped>
/* ========== Main Container ========== */
.signup-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
}

.background-decoration {
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -100px;
  right: -100px;
  animation: float 6s ease-in-out infinite;
}

/* ========== Card ========== */
.signup-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  padding: 45px;
  width: 100%;
  max-width: 500px;
  animation: slideUp 0.6s ease-out;
  position: relative;
  z-index: 1;
}

/* ========== Header ========== */
.card-header {
  text-align: center;
  margin-bottom: 35px;
}

.header-icon {
  color: #667eea;
  margin-bottom: 12px;
  display: inline-block;
  animation: bounce 0.6s ease-out;
}

.card-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a202c;
  margin: 12px 0 8px 0;
  letter-spacing: -0.5px;
}

.card-subtitle {
  font-size: 13px;
  color: #718096;
  margin: 0;
  font-weight: 400;
}

/* ========== Form ========== */
.signup-form {
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 12px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

/* ========== Input Wrapper ========== */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #cbd5e0;
  pointer-events: none;
  font-size: 16px;
}

.form-input {
  width: 100%;
  height: 44px;
  padding: 11px 45px 11px 40px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  color: #2d3748;
  background: #f7fafc;
  transition: all 0.25s ease;
  font-weight: 500;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.08);
}

.form-input::placeholder {
  color: #a0aec0;
  font-weight: 400;
}

/* ========== Toggle Password Button ========== */

/* ========== Submit Button ========== */
.btn-submit {
  width: 100%;
  height: 46px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 25px;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.28);
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(102, 126, 234, 0.35);
}

.btn-submit:active {
  transform: translateY(0);
}

/* ========== Footer ========== */


/* ========== Animations ========== */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

/* ========== Responsive Design ========== */
@media (max-width: 768px) {
  .signup-card {
    padding: 35px 25px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .card-title {
    font-size: 22px;
  }

  .form-input {
    height: 42px;
    font-size: 13px;
  }

  .btn-submit {
    height: 44px;
    margin-top: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .card-header {
    margin-bottom: 28px;
  }
}

@media (max-width: 480px) {
  .signup-container {
    padding: 15px;
  }

  .signup-card {
    padding: 28px 18px;
    border-radius: 12px;
  }

  .card-title {
    font-size: 20px;
  }

  .card-subtitle {
    font-size: 12px;
  }

  .form-label {
    font-size: 11px;
  }

  .form-input {
    height: 40px;
    padding: 10px 14px 10px 36px;
  }

  .input-icon {
    left: 10px;
    font-size: 14px;
  }

  .btn-submit {
    height: 42px;
    font-size: 13px;
  }
}
</style>