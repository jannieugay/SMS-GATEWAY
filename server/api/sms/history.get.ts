import { defineEventHandler } from 'h3'
import { getSmsLogs } from '../../utils/storage'

export default defineEventHandler(async () => {
  const logs = getSmsLogs()
  return {
    success: true,
    logs
  }
})
