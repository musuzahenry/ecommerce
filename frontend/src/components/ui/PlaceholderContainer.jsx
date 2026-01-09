import React from 'react'
import Placeholder from "./Placeholder"

const PlaceholderContainer = () => {

    const placeNumbers = [...Array(8).keys()]
  return (
    <div className='row g-3'>

        { placeNumbers.map((num) => <Placeholder key={num} />) }
    </div>
  )
}

export default PlaceholderContainer