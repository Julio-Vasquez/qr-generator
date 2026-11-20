import type { ChangeEvent, CSSProperties, MouseEvent } from 'react'
import { useId, useRef, useState } from 'react'

import type { ColorPickerProps, Hsv } from '../../utils'

import { Pad } from './Pad'
import { useDismiss } from '../../hooks/useDismiss'
import { COLOR_PRESETS, DEFAULT_COLOR, HEX_COLOR, clamp, hexToHsv, hsvToHex } from '../../utils'

import './ColorPicker.css'

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(value)
  // hsv is kept locally so hue survives when s or v hit 0 (hex alone loses it)
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(value))
  const ref = useRef<HTMLDivElement>(null)
  const labelId = useId()

  const [prevValue, setPrevValue] = useState(value)

  const handleClose = () => setOpen(false)
  useDismiss(open, ref, handleClose)

  // value changed from outside (preset / hex input): resync the picker while
  // rendering instead of in an effect, so there is no extra render with stale hsv
  if (value !== prevValue) {
    setPrevValue(value)
    if (hsvToHex(hsv) !== value.toLowerCase()) setHsv(hexToHsv(value))
  }

  const update = (next: Hsv) => {
    const hex = hsvToHex(next)
    setHsv(next)
    setDraft(hex)
    onChange(hex)
  }

  const handleToggle = () => {
    setDraft(value)
    setOpen(o => !o)
  }

  const handleAreaMove = (x: number, y: number) =>
    update({ ...hsv, s: x, v: 1 - y })

  const handleAreaStep = (dx: number, dy: number) =>
    update({ ...hsv, s: clamp(hsv.s + dx), v: clamp(hsv.v - dy) })

  const handleHueMove = (x: number) => update({ ...hsv, h: x * 360 })

  const handleHueStep = (dx: number) =>
    update({ ...hsv, h: clamp(hsv.h / 360 + dx) * 360 })

  const handlePresetClick = (e: MouseEvent<HTMLButtonElement>) => {
    const color = e.currentTarget.value
    setDraft(color)
    onChange(color)
  }

  const handleReset = () => {
    setDraft(DEFAULT_COLOR)
    onChange(DEFAULT_COLOR)
  }

  const handleDraftChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    const hex = text.startsWith('#') ? text : `#${text}`
    setDraft(hex)
    if (HEX_COLOR.test(hex)) onChange(hex.toLowerCase())
  }

  return (
    <div className="field" ref={ref}>
      <span id={labelId}>{label}</span>
      <button
        type="button"
        className="color-picker"
        aria-labelledby={labelId}
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span className="color-picker__swatch" style={{ background: value }} />
        <code>{value}</code>
      </button>

      {open && (
        <div className="color-picker__popover" role="dialog" aria-label={label}>
          <Pad
            className="color-picker__area"
            label="Saturation and brightness"
            now={hsv.s * 100}
            onMove={handleAreaMove}
            onStep={handleAreaStep}
          >
            <span
              className="color-picker__area-bg"
              style={{ '--hue': hsv.h } as CSSProperties}
            />
            <span
              className="color-picker__thumb"
              style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }}
            />
          </Pad>

          <Pad
            className="color-picker__hue"
            label="Hue"
            now={hsv.h}
            onMove={handleHueMove}
            onStep={handleHueStep}
          >
            <span
              className="color-picker__thumb color-picker__thumb--hue"
              style={{
                left: `${(hsv.h / 360) * 100}%`,
                top: '50%',
                background: `hsl(${hsv.h} 100% 50%)`,
              }}
            />
          </Pad>

          <div className="color-picker__grid">
            {COLOR_PRESETS.map(c => (
              <button
                key={c}
                type="button"
                value={c}
                className="color-picker__preset"
                style={{ background: c }}
                aria-label={c}
                aria-pressed={c === value}
                onClick={handlePresetClick}
              />
            ))}
          </div>

          <input
            className="color-picker__hex"
            value={draft}
            maxLength={7}
            spellCheck={false}
            aria-label="Hex"
            aria-invalid={!HEX_COLOR.test(draft)}
            onChange={handleDraftChange}
          />

          <div className="color-picker__actions">
            <button
              type="button"
              className="color-picker__reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              className="color-picker__accept"
              onClick={handleClose}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
