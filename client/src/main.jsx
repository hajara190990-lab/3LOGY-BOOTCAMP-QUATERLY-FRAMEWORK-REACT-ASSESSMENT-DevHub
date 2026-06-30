import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // This is line 3 - it looks for "export default" in App.jsx
import './index.css'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* If you wrapped it here, that's fine, otherwise just <App /> */}
      <App />
    
  </React.StrictMode>,
)