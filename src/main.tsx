import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StudioProvider } from './lib/store'
import './styles.css'

createRoot(document.getElementById('root')!).render(<StrictMode><StudioProvider><App /></StudioProvider></StrictMode>)

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(error => {
    console.error('离线缓存注册失败。', error)
  })
}
