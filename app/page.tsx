'use client';
import Appbar from "@/components/Appbar";
import Card from "@/components/Card";
import Swap from "@/components/Home";
import SwapInterface from "@/components/SwapInterface";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';
export default function Home() {
  return (
    <div>
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[]}>
          <WalletModalProvider>
          <Appbar />
            <div className="bg-gray-900 h-screen">
              <SwapInterface />
              {/* <Swap /> */}
            </div>
            
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
