import type { ReactNode } from 'react'

export interface Hsv {
  h: number // 0-360
  s: number // 0-1
  v: number // 0-1
}

export interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export interface PadProps {
  className: string
  label: string
  now: number
  onMove: (x: number, y: number) => void
  onStep: (dx: number, dy: number) => void
  children: ReactNode
}
