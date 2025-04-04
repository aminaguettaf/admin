import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminContextProvider from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <AdminContextProvider>
    <App />
  </AdminContextProvider>
)
