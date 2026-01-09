import React from 'react'
import OrderSummary from './OrderSummary'
import PaymentSection from './PaymentSection'
import useCartData from '../../hooks/useCartData'
import Spinner from '../ui/Spinner'

const CheckOutPage = () => {


  const  { cartItems, setCartItems, cartTotal, setCartTotal, loading, tax } = useCartData()

  if(loading){
    return(
      <Spinner />
    )
  } 

  return (
    <div className='row'>
        <div className='col-md-8 col-12' > 
            <OrderSummary cartItems = {cartItems} cartTotal = { cartTotal } tax = { tax } />
        </div>

        <div className='col-md-4 col-12' > 
            <PaymentSection cartTotal = {cartTotal} />
        </div>

    </div>
  )
}

export default CheckOutPage