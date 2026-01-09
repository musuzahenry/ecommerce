import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import Spinner from '../ui/Spinner'
import useCartData from '../../hooks/useCartData'

const CartPage = ({setNumCartItems}) => {

   
 const  { cartItems, setCartItems, cartTotal, setCartTotal, loading, tax } = useCartData()


//check wether cart is empty
  if (cartItems.length < 1){
    return(
      <div className='alert alert-primary' role='alert'>
         <p>You haven't added any items to your cart</p>
      </div>
    )
  }


//return spinner for loadin
  if (loading){
    return (<Spinner loading={loading} /> )
  }


  return (
    <div className='row'>
        <div className='col-md-8 col-12'>

         { 
          cartItems && cartItems.map(
                     item =><CartItem 
                     key={item.id} 
                     item={item} 
                     setCartTotal ={ setCartTotal }
                     cartItems={cartItems} 
                     setNumCartItems = {setNumCartItems}
                     setCartItems = {setCartItems}
                     />)
          }
            
        </div>
        
        <div className='col-md-4 col-12'>
           {
            cartItems  && (
              <CartSummary  
                  cartTotal = {cartTotal} 
                  tax = { tax } 
              />)
           } 

        </div>
    </div>
  )
}

export default CartPage