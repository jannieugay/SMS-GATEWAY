export interface SmsRecord {
  id: string
  recipient: string
  message: string
  status: 'sent' | 'delivered' | 'failed'
  provider: string
  formattedDate: string
  createdAt: string
  errorMessage?: string
  errorCode?: string
}

export interface SendSmsResponse {
  success: boolean
  record: SmsRecord
  message: string
  errorCode?: string
}
