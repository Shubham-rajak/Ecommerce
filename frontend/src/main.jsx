import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast, { Toaster } from 'react-hot-toast';
import ShopContextProvider, { ShopContext } from './context/ShopContext.jsx';
import CartContextProvider from './context/CartContext.jsx';






createRoot(document.getElementById('root')).render(

  <ShopContextProvider>
    <CartContextProvider>
      <Router>
        <StrictMode>
          <Toaster position="top-center" reverseOrder={false} />

          <App />

        </StrictMode>
      </Router>
    </CartContextProvider>
  </ShopContextProvider>

)
