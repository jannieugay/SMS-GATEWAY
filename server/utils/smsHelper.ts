// GSM 03.38 Basic Character Set Regex
const GSM_7_REGEX = /^[@£$¥èéùìòÇ\r\nØø\r\nÅåΔ_ΦΓΛΩΠΨΣΘΞ\x1bÆæßÉ !\"#¤%&'()*+,\-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà^{}\\[~\]|€]*$/

export function detectEncoding(text: string): 'GSM-7' | 'UCS-2' {
  return GSM_7_REGEX.test(text) ? 'GSM-7' : 'UCS-2'
}

export function calculateSmsSegments(text: string) {
  const encoding = detectEncoding(text)
  const length = text.length

  if (length === 0) {
    return { encoding, segments: 0, length: 0, maxSingle: encoding === 'GSM-7' ? 160 : 70 }
  }

  if (encoding === 'GSM-7') {
    if (length <= 160) {
      return { encoding, segments: 1, length, maxSingle: 160 }
    }
    return { encoding, segments: Math.ceil(length / 153), length, maxSingle: 160 }
  } else {
    if (length <= 70) {
      return { encoding, segments: 1, length, maxSingle: 70 }
    }
    return { encoding, segments: Math.ceil(length / 67), length, maxSingle: 70 }
  }
}

export function detectCarrier(phone: string): string {
  const clean = phone.replace(/[^0-9]/g, '')
  if (clean.startsWith('1')) {
    const prefixes = ['Verizon Wireless', 'AT&T Mobility', 'T-Mobile US', 'Sprint / T-Mobile']
    return prefixes[clean.charCodeAt(clean.length - 1) % prefixes.length]
  } else if (clean.startsWith('44')) {
    return 'Vodafone UK / EE'
  } else if (clean.startsWith('63')) {
    return 'Globe Telecom / Smart'
  } else if (clean.startsWith('49')) {
    return 'Deutsche Telekom / O2'
  } else if (clean.startsWith('61')) {
    return 'Telstra Australia'
  }
  return 'Global Tier-1 SMS Transit'
}
