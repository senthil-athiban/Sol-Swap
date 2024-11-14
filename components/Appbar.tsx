'use client';
import React, { useEffect, useRef, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { toast } from 'sonner';

const Appbar = () => {
    const {connected} = useWallet();
    const initialMount = useRef(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);  
      if(initialMount.current) {
        if(connected) toast.success('Wallet has been connected succesfully');
      } else {
        initialMount.current = false;
      }
    }, [connected]);

  return (
    <div className='flex justify-between p-2 w-full bg-gray-900 items-center'>
        <div className='flex '>
            <h2 className='text-xl text-white'>SWAP</h2>
        </div>
        <div className='p-2'>
            {mounted && (connected ? <WalletDisconnectButton /> : <WalletMultiButton />)}
        </div>
    </div>
  )
}

export default Appbar