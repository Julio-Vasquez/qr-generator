import type { KeyboardEvent, PointerEvent } from 'react'

import type { PadProps } from '../../utils'

import { ARROWS, clamp } from '../../utils'

// draggable surface: reports pointer position as 0-1 x/y, arrows nudge it
export function Pad({ className, label, now, onMove, onStep, children }: PadProps) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    onMove(clamp((e.clientX - r.left) / r.width), clamp((e.clientY - r.top) / r.height))
  }

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    move(e)
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 1) move(e)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const arrow = ARROWS[e.key]
    if (!arrow) return
    e.preventDefault()
    onStep(...arrow)
  }

  return (
    <div
      className={className}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuenow={Math.round(now)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}
