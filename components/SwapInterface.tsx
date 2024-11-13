import React from 'react'
import Chart from './Chart'
import SwapCard from './SwapCard'

const SwapInterface = () => {
  return (
    <div className='w-full bg-gray-900 flex gap-x-2 justify-center  px-12'>
        <Chart />
        <SwapCard />
    </div>
  )
}

export default SwapInterface