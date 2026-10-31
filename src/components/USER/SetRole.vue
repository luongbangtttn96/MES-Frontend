<template>
  <div class="role-setup-page">
    <div class="page-card">
      <div class="page-card__header">
        <div>
          <h4>Thiết lập quyền cho người dùng</h4>
          <p>Chọn các nhóm quyền phù hợp cho tài khoản.</p>
        </div>
        <button class="btn btn-primary" @click="handeLuu()">Lưu thay đổi</button>
      </div>

      <div class="user-summary">
        <span class="label">Người dùng:</span>
        <strong>{{ $route.query.UserName }}</strong>
      </div>

      <div class="role-list">
        <div class="role-item" v-for="(item, index) in dataroles" :key="index">
          <label class="role-check">
            <input class="form-check-input" type="checkbox" v-model="dataroles[index].is_role" />
            <span class="role-text">
              <strong>{{ item.ROLE_NAME }}</strong>
              <small>{{ item.DESCRIPTION }}</small>
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore, type Role } from '@/stores/user.store';



const route = useRoute();
const userStore = useUserStore();
const dataroles = ref<Role[]>([]);

const props = defineProps<{
  dataUser: Record<string, any> | null
}>();

const handeLuu = () => {
  userStore.setRoleUser(dataroles.value);
};
  onMounted(() => {
    const userName = route.query.UserName as string;
    userStore.getRoles(userName).then((res) => {
      dataroles.value = res.dataroles.map((role: Role) => ({ 
        ROLE_ID: role.ROLE_ID,
         ROLE_NAME: role.ROLE_NAME, 
         DESCRIPTION: role.DESCRIPTION, 
         USER_NAME: role.USER_NAME, 
         is_role: role.is_role ? true : false 
        }))   || [];
    });
  });

</script>

<style scoped>
.role-setup-page {
  padding: 8px 0 24px;
}

.page-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  padding: 20px;
}

.page-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.page-card__header h4 {
  margin-bottom: 4px;
  font-weight: 700;
  color: #111827;
}

.page-card__header p {
  margin: 0;
  color: #6b7280;
  font-size: 13px;
}

.user-summary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #f8fafc;
  color: #334155;
  margin-bottom: 16px;
}

.user-summary .label {
  color: #64748b;
}

.role-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.role-item {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 14px;
  background: #fcfdff;
}

.role-check {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.role-text {
  display: flex;
  flex-direction: column;
}

.role-text small {
  color: #6b7280;
}

.btn-primary {
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .page-card__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .role-list {
    grid-template-columns: 1fr;
  }
}
</style>