"use client";
import React from "react";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import bs58 from "bs58";
import axios from "axios";
import { Wallet } from "@project-serum/anchor";

const connection = new Connection("https://api.devnet.solana.com");

const wallet = new Wallet(
    Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || ""))
  );

const Card = () => {
  

  const handleSwap = async () => {
    const quoteResponse = await axios(
      "https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&slippageBps=50"
    );
    console.log(" quote response : ", quoteResponse);
    console.log({ quoteResponse });

    // get serialized transactions for the swap
    const { data: { swapTransaction } } = await (
        await axios.post('https://quote-api.jup.ag/v6/swap', {
            quoteResponse,
            userPublicKey: wallet.publicKey.toString(),
        })
    );

    // deserialize the transaction
    const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
    const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
    console.log(transaction);

    // sign the transaction
    transaction.sign([wallet.payer]);

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
