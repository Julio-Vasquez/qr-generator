import type { Hsv } from './type'

export const clamp = (n: number) => Math.min(1, Math.max(0, n))

export const hsvToHex = ({ h, s, v }: Hsv) => {
  const f = (n: number) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
  }
  return (
    '#' +
    [f(5), f(3), f(1)]
      .map(c => Math.round(c * 255).toString(16).padStart(2, '0'))
      .join('')
  )
}

export const hexToHsv = (hex: string): Hsv => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b)
  const d = max - Math.min(r, g, b)
  let h = 0
  if (d) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
  }
  return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max }
}

// http(s) only, host needs a dot so "https://e" while typing doesn't render a QR
export const isValidUrl = (value: string) => {
  try {
    const { protocol, hostname } = new URL(value)
    return /^https?:$/.test(protocol) && hostname.includes('.')
  } catch {
    return false
  }
}
