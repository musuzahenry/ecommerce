import { useState, useEffect } from 'react'
import api from '../api'


function useCartData(){
  const [cartItems, setCartItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0.00)
  const [loading, setLoading] = useState(false)
const tax = 4.00
  
  const cart_code = localStorage.getItem("cart_code")

  useEffect(function(){
    setLoading(true)
    api.get(`get-cart?cart-code=${cart_code}`).then((res)=>{
      setCartItems(res.data.items)
      setLoading(false)
      setCartTotal(res.data.sum_total)
    }).catch((error)=>{
      setLoading(false)
      console.log(error.message)
    })
  }, [cart_code])



  return { cartItems, setCartItems, cartTotal, setCartTotal, loading, tax }
}


export default useCartData
