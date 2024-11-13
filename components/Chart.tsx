import React from 'react'

const Chart = () => {
  return (
    <div className='w-1/2 p-4 bg-blue-900 rounded-lg flex flex-col'>
        <div className='flex justify-between'>
            <div className='flex'>
                <p>SOL</p>
                <p>/</p>
                <p>ETH</p>
            </div>
            <div className='bg-gray-700 flex gap-x-1'>
                <p>15m</p>
                <p>1H</p>
                <p>4H</p>
                <p>1W</p>
            </div>
        </div>
        <div className='h-64 bg-gray-900'>

        </div>
    </div>
  )
}

export default Chart