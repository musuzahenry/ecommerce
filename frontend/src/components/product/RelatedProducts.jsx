import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from "../../api";


const RelatedProducts = ({products}) => {
    //console.log("Related objects: "+JSON.stringify(products))
  return (
    <div className="row gap-2 d-flex justify-content-center">
        {
          products && products.map((product)=>(
              <div className="col-md-4 card" key={product.id}>
                <img className="card-img-top" height='250' src= {`${BASE_URL}${product.image}`} />
                    <div className='card-body'>
                        <h3 className='card-title'>{product.name}</h3>
                    <div className='card-text'>
                        <p>{ product.description && (product.description.slice(0,100)) }</p>
                        <p><b><em>{ ` $${product.price} `}</em></b></p>
                        <p className="py-1">
                            <Link to={ `/products/${product.slug}` } className="btn btn-success color-white mx-1">Details</Link>
                        </p>
                    </div>

                    </div>
              </div>
                ))
        }
    </div>
  )
}

export default RelatedProducts