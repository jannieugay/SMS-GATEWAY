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

function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  const formattedHours = hours.toString().padStart(2, '0')

  return `${month} ${day}, ${year} \u2022 ${formattedHours}:${minutes} ${ampm}`
}

const initialHistory: SmsRecord[] = [
  {
    id: 'msg_sample_1',
    recipient: '+63 912 345 6789',
    message: 'Hello from our Django SMS App!',
    status: 'sent',
    provider: 'TextBee Gateway',
    formattedDate: 'Nov 6, 2026 \u2022 03:15 PM',
    createdAt: new Date('2026-11-06T15:15:00').toISOString()
  }
]

let smsLogs: SmsRecord[] = [...initialHistory]

export function getSmsLogs(): SmsRecord[] {
  return smsLogs
}

export function addSmsRecord(record: SmsRecord): SmsRecord {
  smsLogs.unshift(record)
  if (smsLogs.length > 100) {
    smsLogs = smsLogs.slice(0, 100)
  }
  return record
}

export function clearSmsLogs(): void {
  smsLogs = []
}

export { formatDate }
