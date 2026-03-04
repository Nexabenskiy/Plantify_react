// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
// import { GoogleOAuthProvider } from '@react-oauth/google'
import { DataProvider } from './context/dataContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ToastContainer } from 'react-toastify'

// import { DataContextProvider } from './context/DataContext.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <DataProvider>
    <CartProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
        <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop={true} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </ClerkProvider>
    </CartProvider>
  </DataProvider>,
  // </StrictMode>
)
