import './global.css'
import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--fonts-title',
  preload: true,
  display: 'swap'
})

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en" style={{ backgroundColor: '#111827' }}>
    <head />
    <body style={{ backgroundColor: '#111827', margin: 0, padding: 0 }}>
      <div id="__next" style={{ backgroundColor: '#111827' }}>
        <div className={quicksand.variable}>{children}</div>
      </div>
    </body>
  </html>
)

export default RootLayout
