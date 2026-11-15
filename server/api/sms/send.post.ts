import { defineEventHandler, readBody, createError } from 'h3'
import { addSmsRecord, formatDate, type SmsRecord } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const rawRecipient = body?.recipient?.trim() || ''
  const rawMessage = body?.message?.trim() || ''
  const customApiKey = body?.apiKey?.trim() || config.textbeeApiKey || ''
  const customDeviceId = body?.deviceId?.trim() || config.textbeeDeviceId || ''

  // Input Validation
  if (!rawRecipient) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: { field: 'recipient', error: 'Please enter a recipient phone number.' }
    })
  }

  const normalizedPhone = rawRecipient.replace(/[\s\-\(\)]/g, '')
  // Flexible phone validation supporting +63, local 09..., or international E.164
  const phoneRegex = /^(\+?[1-9]\d{6,14}|09\d{9})$/

  if (!phoneRegex.test(normalizedPhone)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: { field: 'recipient', error: 'Please enter a valid phone number (e.g. +63 912 345 6789 or 09123456789).' }
    })
  }

  if (!rawMessage) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: { field: 'message', error: 'Please enter a message to send.' }
    })
  }

  if (rawMessage.length > 1600) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: { field: 'message', error: 'Message cannot exceed 1600 characters.' }
    })
  }

  const messageId = 'tb_' + Math.random().toString(36).substring(2, 10)
  let status: 'sent' | 'failed' = 'sent'
  let errorMessage: string | undefined
  let errorCode: string | undefined

  if (customApiKey) {
    // Live TextBee API call
    try {
      const endpoint = customDeviceId
        ? `https://api.textbee.dev/api/v1/gateway/devices/${customDeviceId}/send-sms`
        : 'https://api.textbee.dev/api/v1/gateway/send-sms'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'x-api-key': customApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipients: [normalizedPhone],
          message: rawMessage,
          ...(customDeviceId ? { deviceId: customDeviceId } : {})
        })
      })

      const data = await response.json()
      if (!response.ok) {
        status = 'failed'
        errorMessage = data?.message || `TextBee returned error status ${response.status}`
        errorCode = data?.code || `HTTP_${response.status}`
      }
    } catch (err: any) {
      status = 'failed'
      errorMessage = err?.message || 'Failed connecting to TextBee API'
      errorCode = 'TEXTBEE_CONNECTION_ERROR'
    }
  } else {
    // Simulated TextBee Gateway (with simulated latency)
    await new Promise((resolve) => setTimeout(resolve, 400))

    if (normalizedPhone.endsWith('0000') || normalizedPhone.endsWith('0100')) {
      status = 'failed'
      errorCode = 'DEVICE_OFFLINE'
      errorMessage = 'TextBee Android device is currently offline or unreachable.'
    } else {
      status = 'sent'
    }
  }

  const now = new Date()
  const record: SmsRecord = {
    id: messageId,
    recipient: rawRecipient,
    message: rawMessage,
    status,
    provider: 'TextBee Gateway',
    formattedDate: formatDate(now),
    createdAt: now.toISOString(),
    errorMessage,
    errorCode
  }

  addSmsRecord(record)

  if (status === 'failed') {
    return {
      success: false,
      record,
      message: errorMessage || 'Failed to dispatch SMS through TextBee.',
      errorCode
    }
  }

  return {
    success: true,
    record,
    message: 'Your SMS has been delivered.'
  }
})
