export const HEX_COLOR = /^#[0-9a-f]{6}$/i

// one per hue, as dark as the hue allows (contrast on white >= ~3:1) so the QR stays scannable
export const COLOR_PRESETS = [
  '#000000', // black
  '#475569', // gray
  '#dc2626', // red
  '#ea580c', // orange
  '#ca8a04', // yellow
  '#65a30d', // lime
  '#16a34a', // green
  '#0d9488', // teal
  '#0284c7', // sky
  '#2563eb', // blue
  '#7c3aed', // violet
  '#db2777', // pink
]

export const STEP = 0.02

export const ARROWS: Record<string, [number, number]> = {
  ArrowLeft: [-STEP, 0],
  ArrowRight: [STEP, 0],
  ArrowUp: [0, -STEP],
  ArrowDown: [0, STEP],
}

export const GITHUB_URL = 'https://github.com/Julio-Vasquez'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/jv96/'

export const DEFAULT_COLOR = '#000000'

export const THEME_KEY = 'theme'

export const DEFAULT_THEME = 'light'
