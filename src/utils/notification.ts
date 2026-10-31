// utils/notification.ts

import { ElMessage } from 'element-plus'

export const notify = {

  success(message: string) {
    ElMessage.success(message)
  },

  error(message: string) {
    ElMessage.error(message)
  },

  warning(message: string) {
    ElMessage.warning(message)
  }

}