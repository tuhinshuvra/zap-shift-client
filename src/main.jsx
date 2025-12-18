import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import './index.css'
import Aos from 'aos'
import AuthProvider from './context/AuthContext/AuthProvider.jsx'

Aos.init()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </div>
  </StrictMode>,
)