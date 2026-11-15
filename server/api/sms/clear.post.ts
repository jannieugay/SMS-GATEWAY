import { defineEventHandler } from 'h3'
import { clearSmsLogs } from '../../utils/storage'

export default defineEventHandler(async () => {
  clearSmsLogs()
  return {
    success: true,
    message: 'Logs cleared successfully'
  }
})
