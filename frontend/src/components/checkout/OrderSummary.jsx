import React from 'react'
import OrderItem from './OrderItem'
import styles from "./OrderSummary.module.css"


const OrderSummary = ({ cartItems, cartTotal, tax }) => {

  const total = (cartTotal + tax).toFixed(2)

  return (
      <div className='row'>
        <div className={`col-12 card mb-4 ${styles.card} p-3`}  >
        
        <table className='table table-striped table-bordered p-4'>
          <thead>
            <tr>
              <td className='bg-info text-white'>Product name</td>
              <td className='bg-info text-white'>Qty</td>
              <td className='bg-info text-white'>U/Price</td>
              <td className='bg-info text-white'>Price</td>
            </tr>
          </thead>
          <tbody>
           { cartItems.map((cartitem) =>  <OrderItem key={ cartitem.id } cartitem = {cartitem} /> )}
        </tbody>

        <tfoot className='text-end'>
          <tr>
            <td colSpan='4'> Total: ${cartTotal.toFixed(2)} </td>
          </tr>
           <tr>
            <td colSpan='4'> Tax: ${tax.toFixed(2)} </td>
          </tr>
          <tr>
            <td colSpan='4'> Grand Total: $<b>{ total }</b> </td> 
          </tr>
        </tfoot>
        </table>



        </div>  
    </div>
  )
}

export default OrderSummary

