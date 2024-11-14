'use client';
import Appbar from "@/components/Appbar";
import SwapInterface from "@/components/SwapInterface";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { Toaster } from "sonner";
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
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      <Toaster />
    </div>
  );
}
