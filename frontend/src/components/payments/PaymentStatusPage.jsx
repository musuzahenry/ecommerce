import React from 'react'
import { Link } from 'react-router-dom'

const PaymentStatusPage = () => {
  return (
    <div className='row '>
        <div className='col-12 card bg-primary text-center p-5 text-white'>

          <div className='card-header bg-primary'>
           <h1>Verify Payments</h1>
           <p>Give us a moment we are verifying your payment</p>
          </div>


           <div className='card-body'>
           <Link to = "#" className='btn btn-primary my-1 border-white'>View Order Details</Link>
           <Link to = "/" className='btn btn-primary m-1 border-white'>Continue Shoppings</Link>
           </div>

        </div>
    </div>
  )
}

export default PaymentStatusPage