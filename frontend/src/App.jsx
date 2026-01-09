import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import MainLayOut from './LayOut/MainLayOut'
import HomePage from './components/home/HomePage'
import NotFoundPage from './components/ui/NotFoundPage'
import ProductPage from './components/product/ProductPage'
import CartPage from './components/Cart/CartPage'
import CheckOutPage from './components/checkout/CheckOutPage'
import api from "./api"
import LoginPage from './components/user/LoginPage'
import ProtectedRoutes from './components/ui/ProtectedRoutes'
import { AuthProvider } from './context/AuthContext'
import UserProfilePage from './components/user/UserProfilePage'
import PaymentStatusPage from './components/payments/PaymentStatusPage'
import Contact from './components/Contact/Contact'
import About from './components/About/About'

const App = () => {

  const [numCartItems, setNumCartItems] = useState(0)
  const cart_code = localStorage.getItem("cart_code")

  useEffect(function(){
    if(cart_code){
      api.get(`get-cart?cart-code=${cart_code}`).then(res =>{
        setNumCartItems(res.data.num_of_items)
        console.log(res.data)
      }).catch(error=>{
        console.log(error.message)
      })
    }  
  },[numCartItems])


  return (
  
  <AuthProvider>
    <BrowserRouter>
      <div className="container">
        <Routes>
            { /* This route will wrap up everything */}
            <Route path="/" element={ <MainLayOut numCartItems={numCartItems} />} >
                { /* This routes are wrapped up  */ }
                <Route index element ={ <HomePage />} />
                <Route path="products/:slug" element={ <ProductPage setNumCartItems = {setNumCartItems} />} />
                <Route path="cart" element = { <CartPage setNumCartItems ={setNumCartItems} /> } />
                <Route path="checkout" element = { <ProtectedRoutes> <CheckOutPage /> </ProtectedRoutes> }  />
                <Route path = "profile" element = { <ProtectedRoutes> <UserProfilePage /> </ProtectedRoutes> } />
                <Route path="login" element = { <LoginPage /> }  />
                <Route path="contact" element = { <Contact /> }  />
                <Route path="about" element = { <About /> }  />
                <Route path = 'payment-status' element = { <PaymentStatusPage /> } />,
                <Route path="*" element={ <NotFoundPage />} />
          </Route>
          
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
  )
}

export default App