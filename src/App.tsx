import { useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import type { ChangeEvent, SyntheticEvent } from 'react'


import { DEFAULT_COLOR, isValidUrl } from './utils'
import ColorPicker from './components/ColorPicker'
import Footer from './components/Footer'

import './App.css'

export default function App() {
  const [value, setValue] = useState('')
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [logo, setLogo] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const url = value.trim()
  const isValid = isValidUrl(url)

  const configQR = {
    bgColor: '#ffffff',
    fgColor: color,
    size: 256,
    marginSize: 4,
    value: isValid ? url : '',
    // ponytail: H = 30% error correction so the logo doesn't break scanning
    level: 'H' as const,
    imageSettings: logo
      ? { src: logo, width: 56, height: 56, excavate: true }
      : undefined,
  }

  const handleSubmit = (e: SyntheticEvent) => e.preventDefault()

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const handleLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (logo) URL.revokeObjectURL(logo)
    setLogo(file ? URL.createObjectURL(file) : '')
  }

  const handleRemoveLogo = () => {
    URL.revokeObjectURL(logo)
    setLogo('')
    // clear the native input too, otherwise re-picking the same file won't fire onChange
    if (logoInputRef.current) logoInputRef.current.value = ''
  }

  const handleDownloadQR = () => {
    const canvas = ref.current?.querySelector('canvas')
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = 'qr.png'
    a.click()
  }

  return (
    <>
    <main className="app">
      <h1>QR Generator</h1>

      <section className="card">
        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>URL</span>
            <input
              type="url"
              placeholder="https://example.com"
              value={value}
              aria-invalid={!!url && !isValid}
              onChange={handleUrlChange}
            />
            {url && !isValid && (
              <span className="error" role="alert">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
                </svg>
                Ingresá una URL válida, por ejemplo https://example.com
              </span>
            )}
          </label>

          <div className="row">
            <ColorPicker label="Color" value={color} onChange={setColor} />

            <label className="field grow">
              <span>Logo (opcional)</span>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogo}
              />
            </label>
          </div>
        </form>

        <div className="preview">
          <div ref={ref} className="qr">
            {isValid ? (
              <QRCodeCanvas {...configQR} />
            ) : (
              <p className="empty">Tu QR aparece acá</p>
            )}
            {isValid && logo && (
              <button
                type="button"
                className="qr-remove"
                aria-label="Quitar logo"
                onClick={handleRemoveLogo}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            )}
          </div>
          <button
            className="download"
            disabled={!isValid}
            onClick={handleDownloadQR}
          >
            Download QR
          </button>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}
