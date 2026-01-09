import React from 'react'
import { Link } from "react-router-dom"
import { BsCartCheck } from 'react-icons/bs'

const CartSummary = ({cartTotal, tax}) => {

  const subTotal = cartTotal.toFixed(2)
  const cartTax = tax.toFixed(2)
  const total = (cartTotal + tax).toFixed(2)
  return (
    <div>
      
    <h4>CartSummary</h4>  

    <table className='table table-striped table-bordered'>
      <tbody>
          <tr><td>Sub Total</td><td><b>${subTotal}</b></td></tr>
          <tr><td>Tax</td><td><b>${cartTax}</b></td></tr>
          <tr><td>Total</td><td><b>${total}</b></td></tr>

          <tr><td></td><td><b>
            <Link to="/checkout" className='btn btn-primary'> <BsCartCheck /> Proceed To Checkout</Link>
            </b></td></tr>
        </tbody>
    </table>
    </div>
  )
}

export default CartSummary