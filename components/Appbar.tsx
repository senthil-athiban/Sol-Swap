'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react'

const Appbar = () => {
    const {connected} = useWallet();
  return (
    <div className='flex justify-between p-2 w-full bg-gray-900 items-center'>
        <div className='flex '>
            <h2 className='text-xl text-white'>SWAP</h2>
        </div>
        <div className='p-2'>
            {connected ? <WalletDisconnectButton /> : <WalletMultiButton />}
        </div>
    </div>
  )
}

export default Appbar