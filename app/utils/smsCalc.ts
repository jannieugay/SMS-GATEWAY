// GSM 03.38 Basic Character Set
const GSM_7_REGEX = /^[@£$¥èéùìòÇ\r\nØø\r\nÅåΔ_ΦΓΛΩΠΨΣΘΞ\x1bÆæßÉ !\"#¤%&'()*+,\-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà^{}\\[~\]|€]*$/

export interface SmsCalculationResult {
  encoding: 'GSM-7' | 'UCS-2'
  length: number
  segments: number
  remainingInSegment: number
  maxSingle: number
  maxMultipart: number
  nonGsmChars: string[]
}

export function analyzeSms(text: string): SmsCalculationResult {
  const isGsm = GSM_7_REGEX.test(text)
  const encoding = isGsm ? 'GSM-7' : 'UCS-2'
  const length = text.length

  const nonGsmChars: string[] = []
  if (!isGsm) {
    for (const char of text) {
      if (!GSM_7_REGEX.test(char) && !nonGsmChars.includes(char)) {
        nonGsmChars.push(char)
      }
    }
  }

  const maxSingle = encoding === 'GSM-7' ? 160 : 70
  const maxMultipart = encoding === 'GSM-7' ? 153 : 67

  if (length === 0) {
    return {
      encoding,
      length: 0,
      segments: 0,
      remainingInSegment: maxSingle,
      maxSingle,
      maxMultipart,
      nonGsmChars
    }
  }

  if (length <= maxSingle) {
    return {
      encoding,
      length,
      segments: 1,
      remainingInSegment: maxSingle - length,
      maxSingle,
      maxMultipart,
      nonGsmChars
    }
  }

  const segments = Math.ceil(length / maxMultipart)
  const totalCapacity = segments * maxMultipart
  const remainingInSegment = totalCapacity - length

  return {
    encoding,
    length,
    segments,
    remainingInSegment,
    maxSingle,
    maxMultipart,
    nonGsmChars
  }
}
