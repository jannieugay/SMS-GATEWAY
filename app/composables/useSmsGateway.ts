import { ref, reactive, computed, onMounted } from 'vue'
import type { SmsRecord } from '../types/sms'
import { analyzeSms } from '../utils/smsCalc'

export interface ToastItem {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  duration?: number
}

export function useSmsGateway() {
  const form = reactive({
    recipient: '',
    message: '',
    provider: 'mock'
  })

  const errors = reactive({
    recipient: '',
    message: ''
  })

  const isSending = ref(false)
  const logs = ref<SmsRecord[]>([])
  const isLoadingHistory = ref(false)
  const searchQuery = ref('')
  const statusFilter = ref<'all' | 'delivered' | 'failed'>('all')
  const selectedLog = ref<SmsRecord | null>(null)
  const isDetailsOpen = ref(false)
  const toasts = ref<ToastItem[]>([])
  const lastSubmission = ref<{
    success: boolean
    message: string
    record?: SmsRecord
    errorCode?: string
  } | null>(null)

  // Real-time SMS Character & Segment Analysis
  const smsAnalysis = computed(() => {
    return analyzeSms(form.message)
  })

  // Toasts
  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9)
    const newToast: ToastItem = { ...toast, id }
    toasts.value.push(newToast)
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  // Input Validation
  const validateRecipient = (): boolean => {
    errors.recipient = ''
    const val = form.recipient.trim()
    if (!val) {
      errors.recipient = 'Recipient phone number is required.'
      return false
    }

    const normalized = val.replace(/[\s\-\(\)]/g, '')
    // E.164 pattern: standard international phone format
    const phoneRegex = /^\+?[1-9]\d{6,14}$/

    if (!phoneRegex.test(normalized)) {
      if (!val.startsWith('+')) {
        errors.recipient = 'Phone number should include country code in E.164 format (e.g. +1 555 123 4567).'
      } else {
        errors.recipient = 'Invalid phone number format. Must contain 7 to 15 numeric digits.'
      }
      return false
    }

    return true
  }

  const validateMessage = (): boolean => {
    errors.message = ''
    const val = form.message.trim()
    if (!val) {
      errors.message = 'Message content cannot be blank.'
      return false
    }

    if (val.length > 1600) {
      errors.message = 'Message exceeds maximum limit of 1600 characters (10 SMS segments).'
      return false
    }

    return true
  }

  const validateForm = (): boolean => {
    const isRecipientValid = validateRecipient()
    const isMessageValid = validateMessage()
    return isRecipientValid && isMessageValid
  }

  // Fetch Transmission Logs
  const fetchLogs = async () => {
    isLoadingHistory.value = true
    try {
      const data = await $fetch<{ success: boolean; logs: SmsRecord[] }>('/api/sms/history')
      if (data && data.logs) {
        logs.value = data.logs
      }
    } catch (err: any) {
      console.error('Failed to fetch history:', err)
    } finally {
      isLoadingHistory.value = false
    }
  }

  // Clear Logs
  const clearLogs = async () => {
    try {
      await $fetch('/api/sms/clear', { method: 'POST' })
      logs.value = []
      addToast({
        type: 'info',
        title: 'Logs Cleared',
        message: 'All previous sending attempts have been reset.'
      })
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Action Failed',
        message: 'Could not clear history logs from server.'
      })
    }
  }

  // Submit SMS Message
  const sendSms = async () => {
    if (!validateForm()) {
      addToast({
        type: 'warning',
        title: 'Incomplete Form',
        message: 'Please resolve input validation errors before dispatching.'
      })
      return
    }

    isSending.value = true
    lastSubmission.value = null

    try {
      const response = await $fetch<{
        success: boolean
        record: SmsRecord
        message: string
        errorCode?: string
      }>('/api/sms/send', {
        method: 'POST',
        body: {
          recipient: form.recipient.trim(),
          message: form.message.trim(),
          provider: form.provider
        }
      })

      if (response.success) {
        lastSubmission.value = {
          success: true,
          message: response.message,
          record: response.record
        }

        // Prepend new record to local list
        logs.value.unshift(response.record)

        addToast({
          type: 'success',
          title: 'SMS Dispatched',
          message: `Delivered to ${response.record.recipient} in ${response.record.latencyMs}ms.`
        })

        // Reset message field upon successful send (preserve recipient for convenience)
        form.message = ''
      } else {
        lastSubmission.value = {
          success: false,
          message: response.message,
          record: response.record,
          errorCode: response.errorCode
        }

        if (response.record) {
          logs.value.unshift(response.record)
        }

        addToast({
          type: 'error',
          title: 'Dispatch Failed',
          message: response.message
        })
      }
    } catch (err: any) {
      const errMsg = err?.data?.data?.error || err?.statusMessage || err?.message || 'Transmission failed.'
      const code = err?.statusCode ? `HTTP_${err.statusCode}` : 'CLIENT_DISPATCH_ERROR'

      lastSubmission.value = {
        success: false,
        message: errMsg,
        errorCode: code
      }

      addToast({
        type: 'error',
        title: 'Transmission Error',
        message: errMsg
      })
    } finally {
      isSending.value = false
    }
  }

  // Prefill helper
  const applyPreset = (preset: { recipient?: string; message: string }) => {
    if (preset.recipient) form.recipient = preset.recipient
    form.message = preset.message
    validateRecipient()
    validateMessage()
  }

  // Inspect record
  const inspectLog = (record: SmsRecord) => {
    selectedLog.value = record
    isDetailsOpen.value = true
  }

  // Export CSV
  const exportCsv = () => {
    if (logs.value.length === 0) {
      addToast({
        type: 'info',
        title: 'No Data',
        message: 'There are no transmission records to export.'
      })
      return
    }

    const headers = ['ID', 'Recipient', 'Status', 'Carrier', 'Provider', 'Encoding', 'Segments', 'Latency(ms)', 'Cost($)', 'Timestamp', 'Message', 'Error']
    const rows = logs.value.map(l => [
      l.id,
      `"${l.recipient}"`,
      l.status,
      `"${l.carrier || ''}"`,
      `"${l.provider}"`,
      l.encoding,
      l.segments,
      l.latencyMs || 0,
      l.costEstimate || 0,
      `"${l.createdAt}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      `"${(l.errorMessage || '').replace(/"/g, '""')}"`
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `sms-gateway-history-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    addToast({
      type: 'success',
      title: 'Export Complete',
      message: 'Transmission logs exported as CSV.'
    })
  }

  // Computed Dashboard Analytics
  const stats = computed(() => {
    const total = logs.value.length
    const delivered = logs.value.filter(l => l.status === 'delivered').length
    const failed = logs.value.filter(l => l.status === 'failed').length
    const rate = total > 0 ? Math.round((delivered / total) * 100) : 100
    const totalSegments = logs.value.reduce((acc, curr) => acc + (curr.segments || 1), 0)
    const totalCost = logs.value.reduce((acc, curr) => acc + (curr.costEstimate || 0), 0)
    const latencies = logs.value.filter(l => l.latencyMs && l.latencyMs > 0).map(l => l.latencyMs as number)
    const avgLatency = latencies.length > 0 ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0

    return {
      total,
      delivered,
      failed,
      rate,
      totalSegments,
      totalCost: Number(totalCost.toFixed(4)),
      avgLatency
    }
  })

  // Filtered logs
  const filteredLogs = computed(() => {
    let result = logs.value

    if (statusFilter.value !== 'all') {
      result = result.filter(l => l.status === statusFilter.value)
    }

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      result = result.filter(l =>
        l.recipient.toLowerCase().includes(q) ||
        l.message.toLowerCase().includes(q) ||
        (l.carrier && l.carrier.toLowerCase().includes(q)) ||
        (l.id && l.id.toLowerCase().includes(q))
      )
    }

    return result
  })

  onMounted(() => {
    fetchLogs()
  })

  return {
    form,
    errors,
    isSending,
    logs,
    isLoadingHistory,
    searchQuery,
    statusFilter,
    selectedLog,
    isDetailsOpen,
    toasts,
    lastSubmission,
    smsAnalysis,
    stats,
    filteredLogs,
    validateRecipient,
    validateMessage,
    validateForm,
    sendSms,
    fetchLogs,
    clearLogs,
    applyPreset,
    inspectLog,
    exportCsv,
    addToast,
    removeToast
  }
}
