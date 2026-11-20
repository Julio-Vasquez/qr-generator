# QR Generator

Turn any URL into a QR code. Custom colors, optional logo, PNG download. No account needed.

**Live:** https://qr-generator-no-account.netlify.app/

Everything runs in the browser: there is no backend and nothing you type leaves your machine.

## Features

- **URL validation**: the QR only renders for a valid `http(s)` URL, so you never download a QR that points nowhere.
- **Custom color**: color picker with saturation/brightness area, hue slider, 12 presets, hex input and reset.
- **Optional logo**: upload an image and it is placed at the center of the QR. Remove it with the small `x` on the logo.
- **PNG download**: exports the QR exactly as previewed.
- **Scan-safe by default**: error correction level `H` (30%), so the logo does not break scanning.

> Pick colors with good contrast against the white background. Very light colors (yellow, lime) may not scan on every camera.

## Stack

React 19, TypeScript, Vite, [`qrcode.react`](https://github.com/zpao/qrcode.react), Oxlint. Package manager: Bun.

## Requirements

- [Bun](https://bun.sh) 1.3+
- Node.js `^20.19.0 || >=22.12.0` (Vite 8 requirement). Node 24+ recommended.

## Getting started

```bash
bun install
bun run dev
```

## Scripts

| Script            | What it does                         |
| ----------------- | ------------------------------------ |
| `bun run dev`     | Start the dev server with HMR        |
| `bun run build`   | Type-check and build for production  |
| `bun run preview` | Preview the production build locally |
| `bun run lint`    | Lint with Oxlint                     |

## Project structure

```
src/
  App.tsx              form, QR preview and download
  components/
    ColorPicker/       popover picker (Pad = draggable area/hue surface)
    Footer/            author links
  hooks/useDismiss.ts  close on outside click / Escape
  utils/
    constants.ts       presets, regex, keyboard steps, links
    helpers.ts         color conversion, clamp, URL validation
    type.ts            shared types
    index.ts           barrel
```

## Author

Julio Alfredo Vásquez Lievano — [GitHub](https://github.com/Julio-Vasquez) · [LinkedIn](https://www.linkedin.com/in/jv96/)

## License

MIT
