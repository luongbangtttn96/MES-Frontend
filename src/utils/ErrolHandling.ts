import axios from 'axios'
import router from '@/router'
import { useAppStore } from '@/stores'
import { useAuthStore } from '@/stores/auth.store'

const ERROR_TYPES = {
  API: 'API_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
} as const

type ErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES]

type ErrorWithDetails = Error & {
  response?: {
    status?: number
    data?: {
      message?: string
      [key: string]: unknown
    }
    Error?: string
  }
  request?: unknown
  code?: string | number
  stack?: string
}

function getErrorType(error: unknown): ErrorType {
  const err = error as ErrorWithDetails

  if (err?.response) {
    if (err.response.status === 401 || err.response.status === 403) {
      return ERROR_TYPES.AUTH
    }
    return ERROR_TYPES.API
  }

  if (err?.request) {
    return ERROR_TYPES.NETWORK
  }

  return ERROR_TYPES.UNKNOWN
}

function getResponseMessage(error: ErrorWithDetails, fallback: string): string {
  const data = error?.response?.data

  if (typeof data?.message === 'string') {
    return data.message
  }

  if (typeof data === 'string') {
    return data
  }

  if (typeof error?.response?.Error === 'string') {
    return error.response.Error
  }

  return fallback
}

function formatError(error: unknown) {
  const err = error as ErrorWithDetails
  return {
    message: err?.message ?? 'Không xác định được lỗi',
    stack: err?.stack ?? null,
    timestamp: new Date().toISOString(),
    type: err?.name ?? 'Error',
    code: err?.code ?? null,
    statusCode: err?.response?.status ?? null,
  }
}

function showErrorNotification(message: string): void {
  const appStore = useAppStore()
  appStore.messager = message
  appStore.error = message
}

function logError(error: unknown, context: Record<string, unknown> = {}): void {
  const formattedError = formatError(error)
  console.error('Error logged:', {
    ...formattedError,
    context,
    environment: import.meta.env.VITE_APP_ENV ?? 'development',
  })
}

function sendToErrorTrackingService(
  error: unknown,
  componentInfo: { name?: string } | null = null,
  additionalInfo: Record<string, unknown> | null = null,
): void {
  const errorType = getErrorType(error)
  const errorData = {
    ...formatError(error),
    errorType,
    component: componentInfo?.name ?? 'Unknown',
    additionalInfo,
    userInfo: useAuthStore().user ?? null,
    environment: import.meta.env.VITE_APP_ENV ?? 'development',
    url: window.location.href,
    timestamp: new Date().toISOString(),
  }

  if (import.meta.env.VITE_APP_ENV === 'production') {
    console.error('Error tracked:', errorData)
  }

  logError(error, errorData)
}

export const apiErrorHandler = async (error: unknown): Promise<never> => {
  const err = error as ErrorWithDetails
  const errorType = getErrorType(error)

  if (err?.response) {
    switch (err.response.status) {
      case 401: {
        const authStore = useAuthStore()
        authStore.logout()
        showErrorNotification('Phiên làm việc đã hết hạn')
        void router.push({ name: 'login' })
        break
      }
      case 403:
        showErrorNotification('Bạn không có quyền thực hiện thao tác này')
        break
      case 404:
        showErrorNotification('Không tìm thấy tài nguyên yêu cầu')
        break
      case 422:
        showErrorNotification(getResponseMessage(err, 'Dữ liệu không hợp lệ'))
        break
      case 500:
        showErrorNotification('Lỗi hệ thống, vui lòng liên hệ quản trị viên')
        break
      default:
        showErrorNotification(getResponseMessage(err, 'Đã có lỗi xảy ra'))
    }
  } else if (err?.request) {
    showErrorNotification('Không thể kết nối đến server')
  } else {
    showErrorNotification('Đã có lỗi xảy ra')
  }

  logError(error, { type: errorType })
  return Promise.reject(error)
}

function initializeErrorHandlers(): void {
  axios.interceptors.response.use(
    (response) => response,
    (error: unknown) => apiErrorHandler(error),
  )

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    console.error('Unhandled Promise Rejection:', event.reason)
    sendToErrorTrackingService(event.reason)
  })

  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Global Error:', {
      message,
      source,
      lineno,
      colno,
      error,
    })
    sendToErrorTrackingService(error ?? message)
    return true
  }
}

export default {
  init: initializeErrorHandlers,
  formatError,
  showErrorNotification,
  logError,
  sendToErrorTrackingService,
  apiErrorHandler,
  ERROR_TYPES,
}