"use client";
import React from "react";
import { Connection, VersionedTransaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

const connection = new Connection("https://api.devnet.solana.com");

const Card = () => {
  const { publicKey, sendTransaction } = useWallet();
  
  const handleSwap = async () => {
    if (!publicKey) return;

    const quote = await fetch(
      "https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&slippageBps=50"
    );

    const quoteResponse = await quote.json();

    // get serialized transactions for the swap
    const res = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey: publicKey.toString(),
        wrapAndUnwrapSol: true,
      }),
    });

    const response = await res.json();
    const swapTransaction = response.swapTransaction;
    console.log(" swap : ", swapTransaction);

    // deserialize the transaction
    const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
    const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
    console.log(transaction);

    await sendTransaction(transaction, connection);

    // get the latest block hash
    const latestBlockHash = await connection.getLatestBlockhash();

    // Execute the transaction
    const rawTransaction = transaction.serialize();
    const txid = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      maxRetries: 2,
    });
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txid,
    });
    console.log(`https://solscan.io/tx/${txid}`);
  };

  return (
    <div>
      <button onClick={handleSwap} className="p-2 bg-blue-400">
        Click me
      </button>
    </div>
  );
};

export default Card;
